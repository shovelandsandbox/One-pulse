/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "auto",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: 15,
  },
  skipText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Roman",
    fontSize: 13,
    lineHeight: getLineHeight(13),
  },
  skipView: {
    position: "absolute",
    right: 15,
    top: 17,
  },
  title: {
    color: "#393939",
    fontFamily: "Avenir-Black",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: getLineHeight(14),
  },
});
