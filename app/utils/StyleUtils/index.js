import { Dimensions, Platform, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = width / 320;

const goldenRatio = 1.68;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export function getLineHeight(size) {
  return size * goldenRatio;
}
