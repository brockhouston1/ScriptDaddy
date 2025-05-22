# ScriptDaddy

A tool for generating multiple content formats from raw content using various LLM providers via OpenRouter.

## What is ScriptDaddy?

ScriptDaddy is a content repurposing automation tool that takes raw content from a Notion database and transforms it into various formats:

- **Newsletter** - Formatted email content optimized for newsletters
- **Article** - Blog-style content with proper structure and formatting
- **LongScript** - Detailed script suitable for long-form video content
- **ShortScript** - Condensed script for short-form videos
- **Threads** - Content formatted for social media thread posts

It uses AI language models through OpenRouter to generate these different content types from a single source, saving you hours of manual repurposing work.

## How It Works

1. ScriptDaddy connects to your Notion database to find content marked as "Ready for Repurpose"
2. For each piece of content, it generates all five formats using the selected AI model
3. Each generated format is saved back to Notion as a sub-page of the original content
4. The original content is then marked as "Done"

This workflow allows you to:
- Write content once in Notion
- Have multiple formats automatically generated
- Review and use these formats for your various channels
- Track what has been processed

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or if you prefer pnpm:
   ```
   pnpm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```
   # Notion credentials
   NOTION_API_KEY=your_notion_api_key_here
   NOTION_DATABASE_ID=your_notion_database_id_here
   
   # OpenRouter settings
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   
   # Optional: Override the default model
   # OPENROUTER_MODEL=anthropic/claude-3-opus
   ```

4. Get your API keys:
   - [OpenRouter](https://openrouter.ai/keys)
   - [Notion](https://www.notion.so/my-integrations)

## Notion Database Setup

Your Notion database should have the following properties:
- **RawForm** (Text) - Contains the original content to be repurposed
- **Status** (Select) - Should have at least two options: "Ready for Repurpose" and "Done"

## Usage

Run the script:
```
npm start
```
or
```
pnpm start
```

You can also run in dry-run mode to see what would be generated without making any changes:
```
npm start -- --dry-run
```

### Running with a specific model

You can specify which model to use by setting the `OPENROUTER_MODEL` environment variable:

```
OPENROUTER_MODEL=anthropic/claude-3-opus npm start
```

## Available Models

Some popular models available through OpenRouter:
- `google/gemini-2.5-flash-preview` (default)
- `anthropic/claude-3-opus`
- `anthropic/claude-3-sonnet`
- `openai/gpt-4o`
- `mistral/mistral-large`
- `meta/llama-3-70b-instruct`

Check [OpenRouter's documentation](https://openrouter.ai/docs) for the most up-to-date list of available models.

## Scheduling with Cron

To run this script automatically, you can set up a cron job:

1. Create a shell script (e.g., `run.sh`) with:
   ```bash
   #!/bin/bash
   
   # Set up environment - adjust paths based on your system
   export PATH="/opt/homebrew/bin:$PATH"
   
   # Navigate to the project directory - change to your actual path
   cd /path/to/ScriptDaddy || { echo "Failed to change directory"; exit 1; }
   
   # Run the script using your preferred package manager
   pnpm start || npm start
   ```

2. Make it executable:
   ```
   chmod +x run.sh
   ```

3. Add to crontab:
   ```
   crontab -e
   ```
   
   Add a line like:
   ```
   0 * * * * /path/to/ScriptDaddy/run.sh >> /path/to/ScriptDaddy/cron.log 2>&1
   ``` 