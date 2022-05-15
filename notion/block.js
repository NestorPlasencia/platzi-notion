import { notion } from "./index.js";

export const getBlock = async ({ blockId }) => {
  const response = await notion.blocks.retrieve({ block_id: blockId });
  return response;
};

export const getBlockChildren = async ({ blockId }) => {
  const response = await notion.blocks.children.list({ block_id: blockId });
  return response;
};

export const getAllBlockChildren = async ({ blockId }) => {
  let results = [];
  let hasMore = true;
  let cursor = undefined;
  while (hasMore) {
    const data = await getBlockChildren({
      blockId,
      cursor,
    });
    results.push(...data.results);
    cursor = data.next_cursor;
    hasMore = data.has_more;
  }
  console.log("Success! Blocks consulted.");
  return results;
};

export const updateBlock = async ({ blockId, payload }) => {
  const response = await notion.blocks.update({ block_id: blockId, ...payload });
  return response;
};

export const appendBlockChildren = async ({ blockId, children }) => {
  const response = await notion.blocks.children.append({ block_id: blockId, children });
  return response;
};
