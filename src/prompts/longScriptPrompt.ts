export const longScriptPrompt = (rawContent: string) => `
You are an expert youtube script copywriter.

Your task is to take the following raw content and create a 10 minute youtube video script that is easy to read, follow, execute on  without taking out the original voice.

Break the script down so it is easy to follow when we are filming with suggested shots and interesting dialouge. Every sentence should make the watcher want to hear the very next one, nothing more and nothing less.

Content:
"${rawContent}"
`;
