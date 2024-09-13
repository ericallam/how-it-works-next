import { updateVideoUrl } from "../db.js";
import { idempotencyKeys, logger, task } from "@trigger.dev/sdk/v3";
import { processVideo, sendUserEmail, uploadToS3 } from "./tasks.js";

export const convertVideo = task({
  id: "convert-video",
  retry: {
    maxAttempts: 5,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
    factor: 2,
  },
  run: async ({ videoId }: { videoId: string }) => {
    const idempotencyKey = await idempotencyKeys.create(videoId);

    // Process video
    const { processedContent } = await processVideo
      .triggerAndWait({ videoId }, { idempotencyKey })
      .unwrap(); // Calling unwrap will return the output of the subtask, or throw an error if the subtask failed

    logger.info("Video processed", { videoId });

    // Upload to S3
    const { s3Url } = await uploadToS3
      .triggerAndWait({ processedContent, videoId }, { idempotencyKey })
      .unwrap();

    logger.info("Video converted", { videoId, s3Url });

    // Update database
    await updateVideoUrl(videoId, s3Url);

    // Send email, we don't need to wait for this to finish
    await sendUserEmail.trigger({ videoId, s3Url }, { idempotencyKey });

    return { success: true, s3Url };
  },
});
