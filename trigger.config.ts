import { defineConfig } from "@trigger.dev/sdk/v3";
import { ffmpeg } from "@trigger.dev/build/extensions/core";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";

export default defineConfig({
  project: "proj_vofrhoemudrxlzlxihju",
  logLevel: "log",
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  build: {
    extensions: [ffmpeg()],
  },
  instrumentations: [
    new PrismaInstrumentation(),
    new AwsInstrumentation({
      preRequestHook: (span, request) => {
        span.setAttribute("$style.icon", "aws");
      },
    }),
  ],
});
