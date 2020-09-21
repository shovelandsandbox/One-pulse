import { isEmpty, isNil } from "ramda";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

// const groupByType = (components, key) => {
//   const groupedComponent = components.reduce(function(groupedComponent, value) {
//     (groupedComponent[value[key]] = groupedComponent[value[key]] || []).push(
//       value
//     );
//     return groupedComponent;
//   }, {});
//   return groupedComponent;
// };

const isList = component => {
  return component.components && component.components.length;
};

const whichMapper = (component, screenKey) => {
  if (isList(component)) {
    return listMapper(component, screenKey);
  }
  return componentMapper(component, screenKey);
};

const layoutMapper = (screenConfig, screenKey) => {
  if (isEmpty(screenConfig) || isNil(screenConfig)) return null;

  const { layout, name, containers } = screenConfig;
  let mappedScreenConfig = {
    layout: layout,
    name: name,
    numCols: 1,
    components: [],
  };

  const components = containers.map(component =>
    whichMapper(component, screenKey)
  );
  mappedScreenConfig = { ...mappedScreenConfig, components };
  return mappedScreenConfig;
};

const listMapper = (component, screenKey) => {
  const {
    id,
    title,
    horizontal,
    itemsPerRow,
    aspectRatio = 2.4,
    category,
    components,
    showIndicator = true,
    widthOffset = 0.15,
    screenOffset,
    showSeparator,
  } = component;

  let autoCalculate = true;
  if (category === "DoNotAutoCalculate") {
    autoCalculate = false;
  }

  return {
    id,
    type: "list",
    title: title,
    properties: {
      category,
      horizontal,
      itemsPerRow,
      showIndicator,
      showSeparator,
    },
    display: {
      autoCalculate,
      aspectRatio,
      widthOffset,
      screenOffset,
    },
    components: components.map(whichMapper),
  };
};

const getType = component => {
  if (component.clickAction === "play_video") {
    return "video";
  }
  return component.type || "image";
};

const componentMapper = component => {
  const {
    id,
    type,
    borderRadius,
    url,
    clickAction,
    screenId,
    tileId,
    clickUrl,
    cmsId,
    screenParams = {},
    thumb,
    context,
    actionType,
    payload = {},
    style = {},
    title,
    readMore,
    groupId,
    desc,
    showSeparator,
    screenName,
  } = component;
  let mappedComponent = {
    id,
    cmsId,
    type: getType(component),
    style: {
      ...style,
      borderRadius,
    },
    properties: {
      uri: url,
      thumb,
      title,
      readMore,
      desc,
      groupId,
      showSeparator,
      screenName,
      screenId,
      tileId,
    },
  };

  if (mappedComponent.type === "video") {
    mappedComponent = {
      ...mappedComponent,
      properties: {
        ...mappedComponent.properties,
        uri: clickUrl,
        thumb: url,
      },
    };
  }

  const actions = [];
  if (clickAction) {
    let action;
    switch (clickAction) {
      case "open_webview":
        action = {
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: "WebView",
          payload: {
            params: {
              uri: clickUrl,
              groupId: groupId,
              imageUrl: url,
              desc: desc,
              title: title,
            },
          },
        };
        break;
      case "open_screen":
        action = {
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screenId,
          payload: {
            params: screenParams,
          },
        };
        break;
      case "dispatch_action":
        action = {
          context: context,
          type: actionType,
          payload: {
            params: screenParams,
            ...payload,
          },
        };
    }
    actions.push({ on: "click", actionsToDispatch: [action] });
  }

  mappedComponent = { ...mappedComponent, actions };
  return mappedComponent;
};

export const gridResponseMapper = (screenConfig, screenKey) => {
  // const groupedScreenConfig = groupByType(screenConfig.components, "title");
  const modifiedScreenConfig = layoutMapper(screenConfig, screenKey);
  return {
    version: screenConfig.version,
    ...modifiedScreenConfig,
  };
};
