import { defineConfig } from "@trigger.dev/sdk/v3";
import { ffmpeg, additionalPackages } from "@trigger.dev/build/extensions/core";
import { prismaExtension } from "@trigger.dev/build/extensions/prisma";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";

export default defineConfig({
  // project: "proj_vofrhoemudrxlzlxihju", // local project ref
  project: "proj_missagfptgwvuslikfcp", // test cloud project ref
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
    extensions: [
      ffmpeg(),
      prismaExtension({
        schema: "./prisma/schema.prisma",
        migrate: true,
      }),
      additionalPackages({
        packages: ["zod-prisma-types"],
      }),
    ],
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
