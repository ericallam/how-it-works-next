import { task, logger } from "@trigger.dev/sdk/v3";
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "node:stream";
import type { ReadableStream } from "node:stream/web";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { sendEmail } from "../email.js";
import { getVideo, UserSchema } from "../db.js";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.S3_ENDPOINT,
});

export const processVideo = task({
  id: "process-video",
  run: async ({ videoId }: { videoId: string }) => {
    UserSchema.safeParse({ videoId });

    const { url } = await getVideo(videoId);

    const outputPath = path.join("/tmp", `output_${videoId}.mp4`);
    const response = await fetch(url);

    await logger.trace("ffmpeg", async (span) => {
      span.setAttribute("payload.videoId", videoId);
      span.setAttribute("payload.videoUrl", url);
      span.setAttribute("payload.outputPath", outputPath);
      span.setAttribute("ffmpeg.filters", "scale=iw/2:ih/2");
      span.setAttribute("$style.icon", "video");

      await new Promise((resolve, reject) => {
        if (!response.body) {
          return reject(new Error("Failed to fetch video"));
        }

        ffmpeg(Readable.fromWeb(response.body as ReadableStream))
          .videoFilters("scale=iw/2:ih/2")
          .output(outputPath)
          .on("end", resolve)
          .on("error", reject)
          .run();
      });
    });

    const processedContent = await fs.readFile(outputPath);

    await fs.unlink(outputPath); // Clean up the temporary file

    return { processedContent: processedContent.toString("base64") };
  },
});

export const uploadToS3 = task({
  id: "upload-to-s3",
  run: async (payload: { processedContent: string; videoId: string }) => {
    const { processedContent, videoId } = payload;

    const s3Key = `processed-videos/output_${videoId}.mp4`;

    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: s3Key,
      Body: Buffer.from(processedContent, "base64"),
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const s3Url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${s3Key}`;

    return { s3Url };
  },
});

export const sendUserEmail = task({
  id: "send-user-email",
  run: async ({ videoId, s3Url }: { videoId: string; s3Url: string }) => {
    const { userId } = await getVideo(videoId);

    return await sendEmail(
      userId,
      "Video Processing Complete",
      `Your video has been processed and is available at: ${s3Url}`
    );
  },
});
