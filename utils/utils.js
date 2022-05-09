export const getStringBetween = (str, start, end) => {
  const result = str.match(new RegExp(start + "(.*)" + end));
  return result[1];
};

export const getJsonBetween = (str, start, end) => {
  try {
    const text = getStringBetween(str, start, end);
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    throw error;
  }
};

export const addDomainToUrl = (url, domain) => {
  if (url.includes(domain)) {
    return url;
  }
  return domain + url;
};

export const addDomain = (url) => {
  return addDomainToUrl(url, "https://platzi.com");
};

export const uniqueArrValues = (arr) => {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
};
