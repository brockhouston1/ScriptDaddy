import { fetchReadyContent } from "./services/fetchNotionContent";
import { generateContent } from "./services/generateContent";
import { pushLargeContentAsPage } from "./services/pushLargeContentAsPage";
import { getPromptForType } from "./prompts/getPromptForType";
import { updateNotionPage } from "./services/pushToNotion";
import dotenv from "dotenv";

dotenv.config();

// Get model from environment
const MODEL = process.env.OPENROUTER_MODEL;

// Handle CLI flags
const isDryRun = process.argv.includes("--dry-run");

(async () => {
  // Get the actual model that will be used (environment variable or default from generateContent)
  const actualModel = MODEL || "google/gemini-2.5-flash-preview";
  
  console.log(isDryRun ? "🟡 Running in DRY RUN mode. No changes will be made." : "🟢 Running in LIVE mode.");
  console.log(`🤖 Using model: ${actualModel}`);

  const pages = await fetchReadyContent();

  if (pages.length === 0) {
    console.log("No pages marked as Ready for Repurpose.");
    return;
  }

  for (const page of pages) {
    const pageId = page.id;
    const rawFormProperty = (page as any).properties.RawForm;

    if (!rawFormProperty || rawFormProperty.rich_text.length === 0) {
      console.log(`⚠️ No RawForm content found for page: ${pageId}`);
      continue;
    }

    const rawContent = rawFormProperty.rich_text[0].plain_text;
    console.log(`🚀 Processing page: ${pageId}`);

    const contentTypes = ["Newsletter", "Article", "LongScript", "ShortScript", "Threads"];

    for (const type of contentTypes) {
      console.log(`📝 Generating ${type}...`);
      const prompt = getPromptForType(type, rawContent);
      const generatedOutput = await generateContent(prompt, MODEL);

      if (isDryRun) {
        console.log(`📄 [DRY RUN] Would create sub-page for ${type}:`);
        console.log(generatedOutput);
      } else {
        console.log(`📄 Creating sub-page for ${type}...`);
        await pushLargeContentAsPage(pageId, `Generated ${type}`, generatedOutput);
      }
    }

    if (!isDryRun) {
      console.log(`✅ Marking page as Done...`);
      await updateNotionPage(pageId);
    } else {
      console.log(`🟡 [DRY RUN] Would mark page as Done`);
    }

    console.log(`✅ Finished processing page: ${pageId}`);
  }
})();
