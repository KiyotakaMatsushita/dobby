import { AIModelName, llmModel } from "./llm_model.ts";
import { systemMessage } from "./ChatCompletion/message.ts";

export function ai_fn(
  { model = "gpt-3.5-turbo", temperature = 0, maxTokens = 1000 }: {
    model?: AIModelName;
    temperature?: number;
    maxTokens?: number;
  } = {},
): (
  // deno-lint-ignore no-explicit-any
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => void {
  console.log("ai_fn(): factory evaluated");

  return function (
    // deno-lint-ignore no-explicit-any
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log("ai_f(): called");

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: string[]) {
      const prompt = originalMethod.apply(this, args);

      if (prompt === "") {
        console.log("ai_fn(): prompt is empty");
        return "";
      }

      const completion = await llmModel({ model, temperature, maxTokens }).chat(
        [systemMessage(prompt)],
      );

      const response = completion.choices[0].message.content.trim();

      console.log("ai_fn(): response", response);
      return response;
    };
  };
}
