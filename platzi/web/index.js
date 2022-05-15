import { getWebPage } from "../../api/index.js";
import { getJsonBetween } from "../../utils/utils.js";

export const getRoutesInfoFromCategoryUrl = async ({ categoryUrl }) => {
  try {
    if (categoryUrl !== "https://platzi.com/categorias/english/") {
      const result = await getWebPage({ url: categoryUrl });
      const html = result.data;
      const routes = getJsonBetween(
        html,
        'learningPathsCategories": ',
        '\\, "plans"'
      );
      return routes;
    } else {
      return [
        {
          name: "Platzi English Academy",
          badge:
            "https://static.platzi.com/media/learningpath/badges/309b9cf8-fb52-41df-bd9e-25aa978a18f2.jpg",
          slug: "idioma-ingles",
          color: "#E32020",
        },
      ];
    }
  } catch (error) {
    throw error;
  }
};

export const getCoursesInfoFromRouteUrl = async ({ routeUrl }) => {
  try {
    const result = await getWebPage({ url: routeUrl });
    const html = result.data;
    const steps = getJsonBetween(html, 'steps": ', '\\, "count_items"');
    const courses = [];
    for (const step of steps) {
      for (const course of step.courses) {
        courses.push(course);
      }
    }
    return courses;
  } catch (error) {
    throw error;
  }
};
