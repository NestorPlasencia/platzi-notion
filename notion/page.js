import { notion } from "./index.js";

export const getPage = async ({ pageId }) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const addPage = async ({ databaseId, payload }) => {
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    ...payload,
  });
  return response;
};

export const updatePage = async ({ pageId, payload }) => {
  const response = await notion.pages.update({ page_id: pageId, ...payload });
  return response;
};
