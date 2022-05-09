import { notion } from "./index.js";

export const getDataBaseContent = async ({
  databaseId,
  page_size = 100,
  cursor = undefined,
}) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: page_size,
      start_cursor: cursor,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFullDataBaseContent = async ({ databaseId }) => {
  let results = [];
  let hasMore = true;
  let cursor = undefined;
  while (hasMore) {
    const data = await getDataBaseContent({
      databaseId,
      cursor,
    });
    results.push(...data.results);
    cursor = data.next_cursor;
    hasMore = data.has_more;
  }
  console.log("Success! Database consulted.");
  return results;
};
