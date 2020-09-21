/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Platform, Dimensions } from "react-native";

const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");
  return Platform.OS === "ios" && (height >= 812 || width >= 812);
};

export default StyleSheet.create({
  commentInputContainer: {
    bottom: 2,
    position: "absolute",
    width: "100%",
    zIndex: 99,
  },
  commentInputContainerUp: {
    bottom: Platform.OS === "ios" ? (isIphoneX() ? 345 : 260) : 15,
    position: "absolute",
    width: "100%",
    zIndex: 99,
  },
  container: {
    backgroundColor: "#FFFF",
    flex: 1,
  },
  customStyles: {
    flex: 0.6,
  },
  flatListView: {
    flex: 1,
  },
  flatListViewWithSpace: {
    flex: 1,
    marginBottom: 60,
  },
  header: {
    flexDirection: "row",
    shadowColor: "#e2e2e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: "100%",
  },
});
