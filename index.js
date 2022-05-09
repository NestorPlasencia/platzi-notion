import dotenv from "dotenv";
import { getFullDataBaseContent } from "./notion/database.js";
import { addRoutesFromCategories, addCoursesFromRoutes } from "./platzi/add.js";

dotenv.config();

const CATEGORIES_DB_ID = process.env.NOTION_CATEGORIES_DB_ID;
const ROUTES_DB_ID = process.env.NOTION_ROUTES_DB_ID;
const COURSES_DB_ID = process.env.NOTION_COURSES_DB_ID;

const categories = await getFullDataBaseContent({
  databaseId: CATEGORIES_DB_ID,
});

await addRoutesFromCategories({ categories, routesDBId: ROUTES_DB_ID });

const routes = await getFullDataBaseContent({
  databaseId: ROUTES_DB_ID,
});

await addCoursesFromRoutes({ routes, coursesDBId: COURSES_DB_ID });
