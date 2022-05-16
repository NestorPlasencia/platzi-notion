import axios from "axios";
import * as cheerio from "cheerio";
import { getJsonBetween } from "../../utils/utils.js";

export const getRoutesInfoFromCategoryUrl = async ({ categoryUrl }) => {
  try {
    if (categoryUrl !== "https://platzi.com/categorias/english/") {
      const response = await axios.get(categoryUrl);
      const routes = getJsonBetween(
        response.data,
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
    const response = await axios.get(routeUrl);
    const steps = getJsonBetween(
      response.data,
      'steps": ',
      '\\, "count_items"'
    );
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

export const getMaterialsInfoFromCourseUrl = async ({ courseUrl }) => {
  try {
    const response = await axios.get(courseUrl);
    const doc = cheerio.load(response.data);
    const data = [];
    doc(".Tabs-content .ContentBlock").each((_, b) => {
      const block = cheerio.load(b.children);
      const dataBlock = {
        name: block(".ContentBlock-head-title").text(),
      };
      const materials = [];
      block(".ContentClass").each((_, i) => {
        const item = cheerio.load(i.children);
        const dataItem = {
          name: item(".ContentClass-content-title").text(),
          url: item("a").attr("href"),
          id: item("a").attr("href").split("/")[3].split("-")[0],
        };
        materials.push(dataItem);
      });
      dataBlock.materials = materials;
      data.push(dataBlock);
    });
    return data;
  } catch (error) {
    throw error;
  }
};
