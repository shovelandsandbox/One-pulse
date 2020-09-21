import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  groupName: {
    color: "#2d2d2d",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
    marginLeft: 16,
  },
  groupView: {
    alignContent: "center",
    flex: 1,
  },
  imageView: {
    borderRadius: 33 / 2,
    height: 33,
    width: 33,
  },
  imgStyle: {
    borderRadius: 33 / 2,
    height: 33,
    width: 33,
  },
});
