import { notion } from "./index.js";

export const getPage = async ({ pageId }) => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addPage = async ({ databaseId, payload }) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      ...payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePage = async ({ pageId, payload }) => {
  try {
    const response = await notion.pages.update({ page_id: pageId, ...payload });
    return response;
  } catch (error) {
    throw error;
  }
};
