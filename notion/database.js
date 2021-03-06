import { notion } from "./index.js";

export const getDataBaseItems = async ({
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

export const getAllDataBaseItems = async ({ databaseId }) => {
  try {
    let results = [];
    let hasMore = true;
    let cursor = undefined;
    while (hasMore) {
      const data = await getDataBaseItems({
        databaseId,
        cursor,
      });
      results.push(...data.results);
      cursor = data.next_cursor;
      hasMore = data.has_more;
    }
    return results;
  } catch (error) {
    throw error;
  }
};
