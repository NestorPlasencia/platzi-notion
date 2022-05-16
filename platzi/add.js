import { generateHeading1, generateHeading2 } from "../helpers/index.js";
import { getBlockChildren, appendBlockChildren } from "../notion/block.js";
import { getAllDataBaseItems } from "../notion/database.js";
import { addDomain } from "../utils/utils.js";
import { addCourse, updateCourse } from "./notion/course.js";
import { addRoute, updateRoute } from "./notion/route.js";
import {
  getCoursesInfoFromRouteUrl,
  getMaterialsInfoFromCourseUrl,
  getRoutesInfoFromCategoryUrl,
} from "./web/index.js";

export const addRoutesToCategoryNotion = async ({
  routesDBId,
  categoryUrl,
  categoryNotionId,
}) => {
  try {
    const routesNotion = await getAllDataBaseItems({
      databaseId: routesDBId,
    });
    const routeNames = routesNotion.map(
      (e) => e.properties.Route.title[0]?.plain_text
    );
    const routeNotionPageIds = routesNotion.map((e) => e.id);
    let routesWeb = await getRoutesInfoFromCategoryUrl({ categoryUrl });
    for (const route of routesWeb) {
      const routeToAdd = {
        ...route,
        categories: [categoryNotionId],
        title: route.name,
        badge_url: route.badge,
        url: addDomain(`/${route.slug}/`),
      };
      if (routeNames.includes(routeToAdd.name)) {
        await updateRoute({
          routePageId: routeNotionPageIds[routeNames.indexOf(routeToAdd.name)],
          route: routeToAdd,
        });
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
};

export const addCoursesToRouteNotion = async ({
  coursesDBId,
  routeUrl,
  routeNotionId,
}) => {
  try {
    const coursesWeb = await getCoursesInfoFromRouteUrl({ routeUrl });
    const coursesNotion = await getAllDataBaseItems({
      databaseId: coursesDBId,
    });
    const courseNotionIds = coursesNotion.map((e) => e.properties.Id.number);
    const courseNotionPageIds = coursesNotion.map((e) => e.id);
    const responses = [];
    for (const course of coursesWeb) {
      const courseToAdd = {
        ...course,
        routes: [routeNotionId],
        url: addDomain(course.url),
      };
      if (courseNotionIds.includes(courseToAdd.id)) {
        const response = await updateCourse({
          coursePageId:
            courseNotionPageIds[courseNotionIds.indexOf(courseToAdd.id)],
          course: courseToAdd,
        });
        responses.push(response);
      } else {
        const response = await addCourse({
          databaseId: coursesDBId,
          course: courseToAdd,
        });
        responses.push(response);
      }
    }
    return responses;
  } catch (error) {
    throw error;
  }
};

export const addMaterialsToCourseNotion = async ({
  courseUrl,
  pageNotionId,
}) => {
  try {
    const response = await getBlockChildren({ blockId: pageNotionId });
    if (response.results.length === 0) {
      const materials = await getMaterialsInfoFromCourseUrl({ courseUrl });
      const children = [];
      for (const step of materials) {
        children.push(generateHeading1(step.name));
        for (const material of step.materials) {
          children.push(generateHeading2(material.name));
        }
      }
      const response = await appendBlockChildren({
        blockId: pageNotionId,
        children: children,
      });
      console.log(`Materials from ${courseUrl} added.`);
      return response;
    }
  } catch (error) {
    throw error;
  }
};
