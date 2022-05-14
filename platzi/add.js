import { getWebPage } from "../api/index.js";
import { getFullDataBaseContent } from "../notion/database.js";
import { addDomain, getJsonBetween } from "../utils/utils.js";
import { addCourse, updateCourse } from "./course.js";
import { addRoute, updateRoute } from "./route.js";

const UPDATE = true;

export const addCoursesFromRoutes = async ({ routes, coursesDBId }) => {
  for (const route of routes) {
    const routeUrl = route.properties.Url.url;
    const routeId = route.id;

    const result = await getWebPage({ url: routeUrl });
    const html = result.data;

    const courses = await getFullDataBaseContent({
      databaseId: coursesDBId,
    });
    const courseIds = courses.map((e) => e.properties.Id.number);
    const pageIds = courses.map((e) => e.id);

    try {
      const steps = getJsonBetween(html, 'steps": ', '\\, "count_items"');

      for (const step of steps) {
        for (const course of step.courses) {
          const courseToAdd = {
            ...course,
            routes: [routeId],
            url: addDomain(course.url),
          };
          if (courseIds.includes(courseToAdd.id)) {
            if (UPDATE) {
              await updateCourse({
                coursePageId: pageIds[courseIds.indexOf(courseToAdd.id)],
                course: courseToAdd,
              });
            }
          } else {
            await addCourse({
              databaseId: coursesDBId,
              course: courseToAdd,
            });
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
};

export const addRoutesFromCategories = async ({ categories, routesDBId }) => {
  for (const category of categories) {
    const categoryUrl = category.properties.Url.url;
    const categoryId = category.id;

    const routes = await getFullDataBaseContent({ databaseId: routesDBId });
    const routeNames = routes.map(
      (e) => e.properties.Route.title[0]?.plain_text
    );
    const pageIds = routes.map((e) => e.id);
    const result = await getWebPage({ url: categoryUrl });
    const html = result.data;

    try {
      let list = [];
      if (categoryUrl !== "https://platzi.com/categorias/english/") {
        list = getJsonBetween(
          html,
          'learningPathsCategories": ',
          '\\, "plans"'
        );
      } else {
        list = [
          {
            name: "Platzi English Academy",
            badge:
              "https://static.platzi.com/media/learningpath/badges/309b9cf8-fb52-41df-bd9e-25aa978a18f2.jpg",
            slug: "idioma-ingles",
            color: "#E32020",
          },
        ];
      }
      for (const route of list) {
        const routeToAdd = {
          ...route,
          categories: [categoryId],
          title: route.name,
          badge_url: route.badge,
          url: addDomain(`/${route.slug}/`),
        };
        if (routeNames.includes(routeToAdd.name)) {
          if (UPDATE) {
            await updateRoute({
              routePageId: pageIds[routeNames.indexOf(routeToAdd.name)],
              route: routeToAdd,
            });
          }
        } else {
          await addRoute({
            databaseId: routesDBId,
            route: routeToAdd,
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }
};
