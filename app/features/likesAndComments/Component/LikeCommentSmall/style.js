/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
    paddingRight: 5,
  },
  containerStyle: {
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
  },
  imageSize: {
    height: 15,
    resizeMode: "contain",
    width: 15,
  },
  textStyle: {
    color: "#393e46",
    fontFamily: "Avenir-Regular",
    fontSize: 9,
    opacity: 0.5,
    paddingLeft: 5,
    lineHeight: getLineHeight(9),
  },
});
