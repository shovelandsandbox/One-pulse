/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";

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
    borderColor: "#e63140",
    borderRadius: 7,
    borderWidth: 0.5,
    flexDirection: "row",
    height: 80,
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  contentView: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  desc: {
    color: "#e63140",
    fontFamily: "Avenir-Black",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
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
