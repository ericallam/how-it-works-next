import { PrismaClient } from "@prisma/client";
export { UserSchema } from "../prisma/generated/zod";

export const prisma = new PrismaClient();

export async function updateVideoUrl(videoId: string, s3Url: string) {
  return await prisma.video.update({
    where: { id: videoId },
    data: { processedUrl: s3Url },
  });
}

export async function getVideo(videoId: string) {
  return await prisma.video.findUniqueOrThrow({
    where: { id: videoId },
  });
}
