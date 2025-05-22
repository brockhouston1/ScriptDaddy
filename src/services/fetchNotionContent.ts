import { notion } from "../clients/notionClient";

export const fetchReadyContent = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: { equals: "Ready" },
    },
  });

  return response.results;
};
