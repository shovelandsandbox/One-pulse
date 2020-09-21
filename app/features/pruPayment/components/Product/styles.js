/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  contentView: {
    marginLeft: 10,
  },
  description: {
    color: "#a4a4a4",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: 13,
    marginTop: 5,
    width: "35%",
  },
  heading: {
    color: "#4a4a4a",
    fontFamily: "Avenir-Heavy",
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    height: 100,
    width: 100,
  },
  price: {
    color: "#7e7e7e",
    fontFamily: "Avenir-Black",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
});
