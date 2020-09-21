import { Platform, Dimensions } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";

export default {
  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 10
  },

  fullScreen: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  },

  isAndroid: Platform.OS !== "ios",
  isIphoneX: isIphoneX()
};
