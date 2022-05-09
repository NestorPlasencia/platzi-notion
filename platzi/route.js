import { generatePayload } from "../helpers/index.js";
import { addPage, getPage, updatePage } from "../notion/page.js";
import { uniqueArrValues } from "../utils/utils.js";

export const getRoute = async ({ routePageId }) => {
  try {
    const response = await getPage({ pageId: routePageId });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addRoute = async ({ databaseId, route }) => {
  const payload = generatePayload(route);
  try {
    const response = await addPage({ databaseId, payload });
    console.log("Success! Route added.");
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateRoute = async ({ routePageId, route }) => {
  const courseData = await getRoute({ routePageId });
  const prevCategoryIds = courseData.properties.Categories.relation.map(
    (e) => e.id
  );
  route.categories = uniqueArrValues([...prevCategoryIds, ...route.categories]);
  const payload = generatePayload(route);
  try {
    const response = await updatePage({ pageId: routePageId, payload });
    console.log("Success! Route updated.");
    return response;
  } catch (error) {
    throw error;
  }
};
