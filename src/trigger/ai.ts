import { task, logger, metadata } from "@trigger.dev/sdk/v3";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

async function analyzeText({ text }: { text: string }) {
  return {
    sentiment: Math.random() > 0.5 ? "positive" : "negative",
    keywords: text
      .split(" ")
      .filter((word) => word.length > 5)
      .slice(0, 3),
  };
}

export const analyzeTextTask = task({
  id: "analyze-text",
  run: async ({
    prompt,
    modelName = "gpt-4-turbo",
  }: {
    prompt: string;
    modelName: string;
  }) => {
    const result = await streamText({
      model: openai(modelName),
      tools: {
        textAnalyzer: {
          parameters: z.object({ text: z.string() }),
          execute: analyzeText,
        },
      },
      prompt,
    });

    let buffer = "";

    for await (const part of result.fullStream) {
      switch (part.type) {
        case "text-delta": {
          buffer += part.textDelta;

          await metadata.set("output", { text: buffer });

          break;
        }
        case "tool-call": {
          if (part.toolName === "textAnalyzer") {
            await metadata.set("status", {
              state: "analyzing",
              text: part.args.text,
            });
          }

          break;
        }
        case "tool-result": {
          if (part.toolName === "textAnalyzer") {
            await metadata.set("status", {
              state: "analyzed",
              result: part.result,
            });
          }

          break;
        }
        case "finish": {
          const finalAnalysis = await analyzeText({ text: buffer });

          await metadata.set("status", {
            state: "complete",
            result: finalAnalysis,
          });

          break;
        }
        case "error": {
          break;
        }
      }
    }

    return {
      result: buffer,
    };
  },
});
