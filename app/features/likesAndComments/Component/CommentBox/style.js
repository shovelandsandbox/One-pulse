/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  childView: {
    marginLeft: 25,
  },
  container: {
    flex: 1,
    padding: 3,
  },
  containerStyle: {
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
  },
  imageContainerStyle: {
    alignItems: "flex-start",
    flex: 0.2,
    justifyContent: "flex-start",
  },
  imageSize: {
    height: 27,
    marginTop: 5,
    resizeMode: "contain",
    width: 27,
  },
  likeContainer: { flexDirection: "row", marginTop: 10 },
  likeStyle: {
    borderColor: "#c9c9c9",
    borderRadius: 11,
    borderWidth: 0.3,
    color: "#393e46",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
    paddingHorizontal: 10,
  },
  marginStyle: { flex: 2 },
  messageStyle: {
    color: "#838383",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
  },
  name: {
    color: "#393e46",
    fontFamily: "Avenir-Heavy",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: getLineHeight(12),
  },
  nameContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  replyStyle: {
    borderColor: "#c9c9c9",
    borderRadius: 11,
    borderWidth: 0.3,
    color: "#393e46",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
    marginLeft: 15,
    paddingHorizontal: 10,
  },
  textStyle: {
    color: "black",
    paddingLeft: 5,
  },
  time: {
    color: "#393e46",
    fontFamily: "Avenir-Roman",
    fontSize: 9,
    opacity: 0.8,
    lineHeight: getLineHeight(9),
  },
  viewAllContainer: { flexDirection: "row", justifyContent: "flex-end" },
  viewAlltextStyle: {
    color: "#393e46",
    fontFamily: "Avenir-Roman",
    textDecorationLine: "underline",
  },
});
