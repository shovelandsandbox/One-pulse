/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";
export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 7,
    elevation: 3,
    height: 124,
    margin: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    width: 100,
  },
  contentText: {
    color: "#505050",
    fontFamily: "Avenir-Roman",
    fontSize: 9,
    lineHeight: getLineHeight(9),
    marginTop: 5,
  },
  titleText: {
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
    marginTop: 5,
  },
});
