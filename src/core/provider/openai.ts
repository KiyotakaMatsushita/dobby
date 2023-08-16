import { OPENAI_API_KEY } from "../../config.ts";

export interface OpenAIChatMessage {
  role: string;
  name?: string;
  content: string;
}

export interface OpenAIChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    message: OpenAIChatMessage;
    finish_reason: string;
    index: number;
  }[];
}

export class OpenAI {
  static MODELS = {
    GPT35TURBO: "gpt-3.5-turbo",
    GPT4: "gpt-4",
    GPT4_0613: "gpt-4-0613",
  } as const;

  static ROLES = {
    SYSTEM: "system",
    ASSISTANT: "assistant",
    USER: "user",
    Function: "function",
  } as const;

  secretKey: string;
  model: string;
  maxTokens: number; // max token of answer. question and answer takes 4097 tokens at most.
  temperature: number; // 0.0 ~ 1.0

  // constructor
  constructor(params: {
    model: string;
    maxTokens: number;
    temperature: number;
  }) {
    this.secretKey = OPENAI_API_KEY;
    this.model = params.model;
    this.maxTokens = params.maxTokens;
    this.temperature = params.temperature;
  }

  // chat
  chat(messages: OpenAIChatMessage[]): OpenAIChatResponse {
    const url = "https://api.openai.com/v1/chat/completions";
    const payload = {
      model: this.model,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
      messages: messages,
    };
    console.log(JSON.stringify(payload, null, 2));

    const options = {
      contentType: "application/json",
      headers: { Authorization: "Bearer " + this.secretKey },
      payload: JSON.stringify(payload),
    };

    const txt = UrlFetchApp.fetch(url, options).getContentText();
    const result = JSON.parse(txt);
    console.log(JSON.stringify(result, null, 2));
    return result;
  }
}
