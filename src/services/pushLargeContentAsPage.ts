import { notion } from "../clients/notionClient";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";

/**
 * Creates a sub-page with long content as page blocks.
 */
export const pushLargeContentAsPage = async (
  parentPageId: string,
  title: string,
  content: string
) => {
  const chunks = content.match(/[\s\S]{1,2000}/g) || [];

  const blocks: BlockObjectRequest[] = chunks.map((chunk) => ({
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: { content: chunk },
        },
      ],
    },
  }));

  const response = await notion.pages.create({
    parent: { page_id: parentPageId },
    properties: {
      title: { title: [{ type: "text", text: { content: title } }] },
    },
    children: blocks,
  });

  return response;
};
