import axios from "axios";

export const getWebPage = async ({ url }) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};
