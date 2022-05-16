import dotenv from "dotenv";
import { getAllDataBaseItems } from "./notion/database.js";
import {
  addRoutesToCategoryNotion,
  addCoursesToRouteNotion,
  addMaterialsToCourseNotion,
} from "./platzi/add.js";

dotenv.config();

const CATEGORIES_DB_ID = process.env.NOTION_CATEGORIES_DB_ID;
const ROUTES_DB_ID = process.env.NOTION_ROUTES_DB_ID;
const COURSES_DB_ID = process.env.NOTION_COURSES_DB_ID;

try {
  const categories = await getAllDataBaseItems({
    databaseId: CATEGORIES_DB_ID,
  });

  for (const category of categories) {
    const categoryUrl = category.properties.Url.url;
    const categoryNotionId = category.id;
    await addRoutesToCategoryNotion({
      routesDBId: ROUTES_DB_ID,
      categoryUrl,
      categoryNotionId,
    });
  }

  const routes = await getAllDataBaseItems({
    databaseId: ROUTES_DB_ID,
  });
  for (const route of routes) {
    const routeUrl = route.properties.Url.url;
    const routeNotionId = route.id;
    const responses = await addCoursesToRouteNotion({
      coursesDBId: COURSES_DB_ID,
      routeUrl,
      routeNotionId,
    });
    for (const response of responses) {
      const courseUrl = response.properties.Url.url;
      const pageNotionId = response.id;
      await addMaterialsToCourseNotion({ courseUrl, pageNotionId });
    }
  }
} catch (error) {
  console.log(error);
}
