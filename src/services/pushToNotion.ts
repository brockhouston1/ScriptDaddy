import { notion } from "../clients/notionClient";

export const updateNotionPage = async (pageId: string, updates: Record<string, string> = {}) => {
  const properties: Record<string, any> = {};

  properties["Status"] = { status: { name: "Done" } };

  const response = await notion.pages.update({
    page_id: pageId,
    properties,
  });

  return response;
};
