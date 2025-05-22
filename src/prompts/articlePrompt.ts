export const articlePrompt = (rawContent: string) => `
You are an expert Article copywriter, for content for linkedIn or hakcernews ro indiehackers.

Your task is to take the following raw content and create a 5 minute article that is easy to read without taking out the original voice.

Use short paragraphs. Give short relatable examples. The main goal is just to format, organize, and revise the raw content you have been given. 
Also If applicable use the AIDA method to keep readers reading.


Raw Content:
"${rawContent}"
`;
