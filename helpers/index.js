export const generatePayload = (element) => {
  const properties = {};
  let icon = "";

  if (!!element?.badge_url) {
    icon = {
      type: "external",
      external: {
        url: element.badge_url,
      },
    };
  }

  if (!!element?.title) {
    properties.title = {
      title: [
        {
          text: {
            content: element.title,
          },
        },
      ],
    };
  }

  if (!!element?.id) {
    properties.Id = {
      type: "number",
      number: element.id,
    };
  }

  if (!!element?.url) {
    properties.Url = {
      type: "url",
      url: element.url,
    };
  }

  if (!!element?.materials_count) {
    properties.Materials = {
      type: "number",
      number: element.materials_count,
    };
  }

  if (!!element?.color && element.color !== "") {
    properties.Color = {
      type: "select",
      select: {
        name: element.color,
      },
    };
  }

  if (!!element?.status) {
    properties.Active = {
      type: "checkbox",
      checkbox: element.status === "active",
    };
  }

  if (!!element?.launch_date) {
    properties["Lunch Date"] = {
      type: "date",
      date: {
        start: element.launch_date,
        end: null,
        time_zone: null,
      },
    };
  }

  if (!!element?.routes) {
    properties.Routes = {
      type: "relation",
      relation: element.routes.map((e) => {
        return { id: e };
      }),
    };
  }

  if (!!element?.categories) {
    properties.Categories = {
      type: "relation",
      relation: element.categories.map((e) => {
        return { id: e };
      }),
    };
  }

  if (icon !== "") {
    return {
      properties,
      icon,
    };
  }

  return { properties };
};
