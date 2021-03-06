import { generatePayload } from "../../helpers/index.js";
import { addPage, getPage, updatePage } from "../../notion/page.js";
import { uniqueArrValues } from "../../utils/utils.js";

export const getCourse = async ({ coursePageId }) => {
  try {
    const response = await getPage({ pageId: coursePageId });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addCourse = async ({ databaseId, course }) => {
  try {
    const payload = generatePayload(course);
    const response = await addPage({ databaseId, payload });
    console.log(`${course.title} added.`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async ({ coursePageId, course }) => {
  try {
    const courseData = await getCourse({ coursePageId });
    const prevRoutesIds = courseData.properties.Routes.relation.map(
      (e) => e.id
    );
    course.routes = uniqueArrValues([...prevRoutesIds, ...course.routes]);
    const payload = generatePayload(course);
    const response = await updatePage({ pageId: coursePageId, payload });
    console.log(`${course.title} updated.`);
    return response;
  } catch (error) {
    throw error;
  }
};
