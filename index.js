import dotenv from "dotenv";
import { getAllDataBaseItems } from "./notion/database.js";
import {
  addCoursesToRouteNotion,
  addRoutesToCategoryNotion,
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
    await addCoursesToRouteNotion({
      coursesDBId: COURSES_DB_ID,
      routeUrl,
      routeNotionId,
    });
  }

  const pageId = "2de70f1664b44aa886e99e5967a87ccf";
  const url = "https://platzi.com/cursos/notion/";

  // const response = await getBlockChildren({ blockId: 'd394c812ecbf4237928f35f01b9cfa7e' })
  // for (const block of response.results) {
  //   console.log(block.id)
  //   const richText = block[block.type].rich_text
  //   if (richText?.length > 0) {
  //     for (const r of richText) {
  //       console.log(r?.plain_text)
  //     }
  //   }
  // }

  // appendBlockChildren({
  //   blockId: '9f58ceba-c0c0-4476-982f-c2a1005d1b44', children: [
  //     {
  //       object: 'block',
  //       type: 'heading_2',
  //       heading_2: {
  //         rich_text: [
  //           {
  //             type: 'text',
  //             text: {
  //               content: 'Lacinato kale',
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       object: 'block',
  //       type: 'paragraph',
  //       paragraph: {
  //         rich_text: [
  //           {
  //             type: 'text',
  //             text: {
  //               content: 'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
  //               link: {
  //                 url: 'https://en.wikipedia.org/wiki/Lacinato_kale',
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ]
  // })
} catch (error) {
  console.log(error);
}
