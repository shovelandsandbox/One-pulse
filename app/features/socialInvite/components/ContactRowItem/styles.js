/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  contactName: {
    color: "#2d2d2d",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
    marginLeft: 16,
  },
  contactView: {
    alignContent: "center",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  emailText: {
    color: "#9a9a9a",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    marginLeft: 16,
    width: 170,
    lineHeight: getLineHeight(10),
  },
  imageView: {
    borderRadius: 33 / 2,
    height: 33,
    marginLeft: 10,
    width: 33,
  },
  imgstyle: {
    borderRadius: 33 / 2,
    height: 33,
    width: 33,
  },
  inviteText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
  },
  inviteView: {
    backgroundColor: "#ffffff",
    borderColor: "#ec1c2e",
    borderRadius: 110,
    borderWidth: 0.3,
    paddingHorizontal: 20,
    position: "absolute",
    right: 10,
  },
  selectedView: {
    backgroundColor: "#ec1c2e",
    borderColor: "#ec1c2e",
    borderWidth: 0.3,
    height: 10,
    width: 10,
  },
  unSelectedView: {
    borderColor: "#ec1c2e",
    borderWidth: 0.3,
    height: 10,
    width: 10,
  },
});
