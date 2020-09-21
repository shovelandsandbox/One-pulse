/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  buttonView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  container: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "auto",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  continueButton: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 20,
    justifyContent: "center",
    marginLeft: 25,
    paddingHorizontal: 40,
  },
  continueButtonText: {
    color: "#ffffff",
    fontFamily: "Avenir-Black",
    fontSize: 14,
    lineHeight: getLineHeight(14),
  },
  skipButton: {
    marginTop: 0,
  },
  skipButtonText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Black",
    fontSize: 13,
    lineHeight: getLineHeight(13),
  },
  subtext: {
    color: "#575757",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
    marginTop: 20,
    paddingRight: 52,
  },
  title: {
    color: "#393939",
    fontFamily: "Avenir-Black",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: getLineHeight(14),
  },
});
