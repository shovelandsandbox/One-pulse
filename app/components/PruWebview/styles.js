import { StyleSheet, Dimensions } from "react-native";
export default StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  postVideo: {
    alignSelf: "center",
    aspectRatio: 1.77,
    width: Dimensions.get("screen").width,
  },
});
