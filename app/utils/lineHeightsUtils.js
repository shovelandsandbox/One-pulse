import { Platform } from "react-native";
import { metaHelpers as helpers } from "@pru-rt-internal/pulse-common";

const lineHeightsConfigScreenKey = "lineHeightsConfig";
const lineHeightsConfigElementKey = "lineHeights";

const lineHeightsDefaultValues = [
  { "fontSize": 11, "lineHeightAnd": 17.5, "lineHeightIos": 20 },
  { "fontSize": 12, "lineHeightAnd": 19, "lineHeightIos": 22 },
  { "fontSize": 13, "lineHeightAnd": 20.5, "lineHeightIos": 24 },
  { "fontSize": 14, "lineHeightAnd": 22, "lineHeightIos": 26 },
  { "fontSize": 15, "lineHeightAnd": 23.5, "lineHeightIos": 28 },
  { "fontSize": 16, "lineHeightAnd": 25, "lineHeightIos": 30 },
  { "fontSize": 18, "lineHeightAnd": 28, "lineHeightIos": 31 },
  { "fontSize": 20, "lineHeightAnd": 31, "lineHeightIos": 34 },
  { "fontSize": 22, "lineHeightAnd": 34, "lineHeightIos": 38 },
  { "fontSize": 24, "lineHeightAnd": 36, "lineHeightIos": 40 }
];

const fetchLabel = (value, elementKey, defaultValue) =>
  value && value.label !== elementKey ? value.label : defaultValue;

const getLineHeights = () => {
  const lineHeights = fetchLabel(
    helpers.findElement(
      lineHeightsConfigScreenKey,
      lineHeightsConfigElementKey
    ),
    lineHeightsConfigElementKey,
    []
  );
  // format lineHeights
  let lineHeightsObj = {};

  lineHeights.map(obj => {
    lineHeightsObj[obj.fontSize] = Platform.OS === "ios" ? obj.lineHeightIos : obj.lineHeightAnd;
  });
  return lineHeightsObj;
};

export const configureLineHeight = (size) => {
  const lineHeights = getLineHeights() || {};
  if (lineHeights[size]) {
    return { lineHeight: lineHeights[size] }
  }
  else {
    return {}
  }
}

