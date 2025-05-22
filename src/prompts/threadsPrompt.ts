export const threadsPrompt = (rawContent: string) => `
You are an expert twitter/x threads copywriter.

Your task is to take the following raw content and transform it into x/twitter threads posts. Every single thread should make the reader want to read the very next one, no more no less. 

Use short paragraphs, include relatable examples, and end with a clear call-to-action. Alsoinclude real stats if they are available.

Raw Content:
"${rawContent}"
`;
