import { notion } from "./index.js";

export const getBlock = async ({ blockId }) => {
  try {
    const response = await notion.blocks.retrieve({ block_id: blockId });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBlockChildren = async ({ blockId }) => {
  try {
    const response = await notion.blocks.children.list({ block_id: blockId });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllBlockChildren = async ({ blockId }) => {
  try {
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
    return results;
  } catch (error) {
    throw error;
  }
};

export const updateBlock = async ({ blockId, payload }) => {
  try {
    const response = await notion.blocks.update({
      block_id: blockId,
      ...payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const appendBlockChildren = async ({ blockId, children }) => {
  try {
    const response = await notion.blocks.children.append({
      block_id: blockId,
      children,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
