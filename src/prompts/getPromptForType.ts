import { newsletterPrompt } from "./newsletterPrompt";
import { articlePrompt } from "./articlePrompt";
import { longScriptPrompt } from "./longScriptPrompt";
import { shortScriptPrompt } from "./shortScriptPrompt";
import { threadsPrompt } from "./threadsPrompt";

export const getPromptForType = (type: string, rawContent: string): string => {
  switch (type) {
    case "Newsletter":
      return newsletterPrompt(rawContent);
    case "Article":
      return articlePrompt(rawContent);
    case "LongScript":
      return longScriptPrompt(rawContent);
    case "ShortScript":
      return shortScriptPrompt(rawContent);
    case "Threads":
      return threadsPrompt(rawContent);
    default:
      throw new Error(`Unknown content type: ${type}`);
  }
};
