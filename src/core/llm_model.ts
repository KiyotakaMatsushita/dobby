import { OpenAI } from "./provider/openai.ts";

export type AIModelName =
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-0301"
  | "gpt-3.5-turbo-0613"
  | "gpt-3.5-turbo-16k"
  | "gpt-3.5-turbo-16k-0613"
  | "gpt-4"
  | "gpt-4-0314"
  | "gpt-4-0613";

export function llmModel(
  { model = OpenAI.MODELS.GPT35TURBO, maxTokens = 2000, temperature = 0 }: {
    model?: AIModelName;
    maxTokens?: number;
    temperature?: number;
  } = {},
) {
  return new OpenAI({
    model,
    maxTokens,
    temperature,
  });
}
