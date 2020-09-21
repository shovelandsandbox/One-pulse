/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { Theme } from "../../../../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  closeImage: {
    height: 8,
    width: 8,
  },
  code: {
    color: "#8a8a8a",
    fontFamily: "Avenir-Roman",
    fontSize: 9,
    marginTop: 5,
  },
  container: {
    alignItems: "center",
    borderColor: Colors.pulseRed,
    borderRadius: 7,
    borderWidth: 0.5,
    flexDirection: "row",
    height: 80,
    width: "100%",
    paddingLeft: 10
  },
  contentView: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  desc: {
    fontFamily: "Avenir-Black",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 3
  },
  removeStyle: {
    color: "#e63140",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    marginLeft: 5,
    textAlign: "center",
  },
  removeView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
