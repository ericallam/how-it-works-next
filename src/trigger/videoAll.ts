import { logger, task } from "@trigger.dev/sdk/v3";
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
  run: async ({ videoId }: { videoId: string }, { ctx }) => {
    const { url, userId } = await getVideo(videoId);

    const outputPath = path.join("/tmp", `output_${videoId}.mp4`);

    const response = await fetch(url);

    await new Promise((resolve, reject) => {
      ffmpeg(Readable.fromWeb(response.body as ReadableStream))
        .videoFilters("scale=iw/2:ih/2")
        .output(outputPath)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

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

    logger.info("Video converted", { videoId, s3Url });

    // Update database
    await updateVideoUrl(videoId, s3Url);

    await sendEmail(
      userId,
      "Video Processing Complete",
      `Your video has been processed and is available at: ${s3Url}`
    );

    return { success: true, s3Url };
  },
});
