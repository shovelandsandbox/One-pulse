/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
    margin: 5,
    paddingVertical: 10,
    borderColor: "red",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  customStyles: {
    color: "#000000",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  descrptionColor: {
    color: "#9399a3",
    fontFamily: "Avenir-Light",
    fontSize: 10,
    lineHeight: getLineHeight(10),
  },
  expiryColor: {
    color: "#cf1e43",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    textAlign: "center",
    lineHeight: getLineHeight(10),
  },
  expiryContiner: {
    backgroundColor: "rgba(207, 30, 67, 0.1)",
    borderRadius: 5,
    height: 19,
    justifyContent: "center",
    marginLeft: 10,
    paddingHorizontal: 10,
    width: "auto",
  },
  flex: {
    flex: 3,
  },

  imgstyle: { height: 38, width: 38 },
  logo: { alignItems: "center", flex: 1, justifyContent: "center" },
  paddingStyle: {
    padding: 5,
  },
  ratingColor: {
    color: "#1d262c",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    marginLeft: 2,
    lineHeight: getLineHeight(10),
  },
  ratingContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 196, 4, 0.1)",
    borderRadius: 5,
    flexDirection: "row",
    height: 19,
    paddingHorizontal: 10,
    width: "auto",
  },
  ratingImage: {
    height: 10,
    width: 10,
  },
  textColor: {
    color: "#1d262c",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
  },

  textContainer: {
    flexDirection: "row",
    padding: 5,
  },
  typeColor: {
    color: "#0074e4",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    textAlign: "center",
    lineHeight: getLineHeight(10),
  },
  typeContiner: {
    backgroundColor: "rgba(0, 118, 228, 0.1)",
    borderRadius: 5,
    height: 19,
    justifyContent: "center",
    paddingHorizontal: 10,
    width: "auto",
  },
});
