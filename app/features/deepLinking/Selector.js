import _ from "lodash";
export const DeeplinkSelector = {
  getScreenFromUrl: url => {
    let routeName = null;
    if (url) {
      const route = url.replace(/.*?:\/\//g, "");
      routeName = route.split("/")[2];
    }
    return routeName;
  },
  getParamsFromUrl: url => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  },
  getFormattedParams: params => {
    const dataTobeModified = `${params}`;
    const keyValueArray = dataTobeModified.split(",");
    const paramsObject = {};
    for (let i = 0; i < keyValueArray.length; i++) {
      const split = keyValueArray[i].split(":");
      paramsObject[split[0].trim()] = split[1].trim();
    }
    return paramsObject;
  },
  getFormattedParamsWebView: params => {
    const dataTobeModified = `${params}`;
    const keyValueArray = dataTobeModified.split(",");
    const paramsObject = {};
    for (let i = 0; i < keyValueArray.length; i++) {
      const split = keyValueArray[i].split("@");
      paramsObject[split[0]] = split[1] ? split[1].replace("%3D", "=") : "";
    }
    return paramsObject;
  },
  getSearchParams: searchParam => {
    const screenParamList = searchParam.split("|");
    const paramObj = {};
    _.forEach(screenParamList, (screenParam) => {
      paramObj[screenParam.split("^")[0]] = screenParam.split("^")[1];
    });
    return paramObj;
  }
};
