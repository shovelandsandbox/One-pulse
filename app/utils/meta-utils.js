import { metaHelpers } from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";

const metaFinder = (metaModule, key, propertyName = "label") => {
  if (metaModule == null || key == null || metaModule === "" || key === "") {
    return { [propertyName]: "Invalid Module Name or Key." };
  }
  const metaResult = metaHelpers.findElement(metaModule, key);

  if (metaResult) {
    if (metaResult[propertyName]) {
      return metaResult;
    }
    return {
      ...metaResult,
      [propertyName]: key,
    };
  }
  return {
    [propertyName]: key,
  };
};

const propertyLabelType = "label";

export const metaLabelFinder = (screen, key) =>
  metaFinder(screen, key, propertyLabelType)[propertyLabelType];
export const myPolicyMetaLabelFinder = (screen, key) =>
  metaFinder(screen, key, propertyLabelType)[propertyLabelType];

export const safeMetaLabelFinder = (screen, key) =>
  metaFinder(screen, key, "label")["label"];

export const metaLabelOrNil = (screen, key) => {
  const metaResult = metaHelpers.findElement(screen, key);
  if (metaResult) {
    return metaResult.label;
  }
};

export const safeObjectFinder = (screen, key) => {
  const screenElement = metaHelpers.findScreen(screen);
  if (!screenElement) {
    return [];
  }
  const elementData = screenElement.elements.find(
    element => element.key == key
  );
  return pathOr([], ["data"], elementData);
};

export const safeMetaContextLabelFinder = (context, screen, key) => {
  const screenElement = metaHelpers.findScreen(screen);
  if (!screenElement) {
    return key;
  }
  let elementData = screenElement.elements.filter(
    element => element.key == key
  );
  if (elementData) {
    elementData = elementData.find(element => element.context == context);
  }

  return elementData ? elementData.label : key;
};
