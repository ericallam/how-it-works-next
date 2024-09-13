import { setTimeout } from "timers/promises";

export async function sendEmail(userId: string, subject: string, body: string) {
  await setTimeout(550);

  return {
    sent: true,
  };
}
