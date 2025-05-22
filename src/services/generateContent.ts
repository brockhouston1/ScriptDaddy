import { openrouter } from "../clients/openrouterClient";

/**
 * Sends the provided prompt to OpenRouter and returns the generated content.
 * @param prompt - The formatted prompt text to send.
 * @param model - The specific OpenRouter model to use (optional).
 * @returns The generated content as a string.
 */
export const generateContent = async (
  prompt: string,
  model?: string // Make it optional
): Promise<string> => {
  const selectedModel = model || "google/gemini-2.5-flash-preview"; // Default if not provided
  
  const completion = await openrouter.chat.completions.create({
    model: selectedModel,
    messages: [{ role: "user", content: prompt }],
  });
  
  return completion.choices[0].message.content?.trim() || "";
};
