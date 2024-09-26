import { logger, task, metadata } from "@trigger.dev/sdk/v3";
import { updateVideoUrl } from "../db.js";
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "node:stream";
import type { ReadableStream } from "node:stream/web";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { sendEmail } from "../email.js";
import { getVideo } from "../db.js";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.S3_ENDPOINT,
});

export const convertVideo = task({
  id: "convert-video-all",
  retry: {
    maxAttempts: 5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
    factor: 2,
  },
  run: async ({ videoId }: { videoId: string }) => {
    const { url, userId } = await getVideo(videoId);

    await metadata.set("videoUrl", url);

    const outputPath = path.join("/tmp", `output_${videoId}.mp4`);

    await metadata.set("state", { name: "fetching-video", progress: 0.1 });

    const response = await fetch(url);

    await metadata.set("state", { name: "converting-ffmpeg", progress: 0.2 });

    await new Promise((resolve, reject) => {
      ffmpeg(Readable.fromWeb(response.body as ReadableStream))
        .videoFilters("scale=iw/2:ih/2")
        .output(outputPath)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    await metadata.set("state", { name: "uploading-r2", progress: 0.5 });

    const processedContent = await fs.readFile(outputPath);

    // Upload to S3
    const s3Key = `processed-videos/output_${videoId}.mp4`;

    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: s3Key,
      Body: processedContent,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const s3Url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${s3Key}`;

    await metadata.set("processedVideoUrl", s3Url);
    await metadata.set("state", { name: "updating-video-url", progress: 0.7 });

    logger.info("Video converted", { videoId, s3Url });

    // Update database
    await updateVideoUrl(videoId, s3Url);

    await metadata.set("state", { name: "sending-email", progress: 0.9 });

    await sendEmail(
      userId,
      "Video Processing Complete",
      `Your video has been processed and is available at: ${s3Url}`
    );

    await metadata.set("state", { name: "done", progress: 1 });

    return { success: true, s3Url };
  },
});
