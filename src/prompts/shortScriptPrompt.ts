export const shortScriptPrompt = (rawContent: string) => `
You are an expert shortform script copywriter.

Your task is to take the following raw content and create a 30-120 second short-form  video script that is easy to read, follow, execute on  without taking out the original voice.

Break the script down so it is easy to follow when we are filming with suggested shots and interesting dialouge. Every sentence should make the watcher want to hear the very next one, nothing more and nothing less.

The general format I like to follow is this: 
Hook
Promised Delivery (What youre going to tell them)
Delivery of the Promise (Tell them what you were going to tell them)
Authority statement (This doesn't have to be hardcore, maybe you can leave this blank for me to fill it in)
Call To Action

Raw Content:
"${rawContent}"
`;
