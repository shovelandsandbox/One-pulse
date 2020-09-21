/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "auto",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  continueButton: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 26,
    height: 53,
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 27,
    width: "100%",
  },
  continueButtonText: {
    color: "#ffffff",
    fontFamily: "Avenir-Black",
    fontSize: 14,
    lineHeight: 25,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    height: 22,
    width: 30,
  },
  midImage1: {
    height: 121,
    marginTop: 36,
    opacity: 0.6,
    width: 121,
  },
  midImage2: {
    height: 155,
    marginTop: 25,
    width: 155,
  },
  skipButton: {
    marginTop: 36,
  },
  skipButtonText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Black",
    fontSize: 13,
    lineHeight: 25,
  },
  subtext: {
    color: "#575757",
    fontFamily: "Avenir-Black",
    fontSize: 13,
    lineHeight: 17,
    marginTop: 40,
    textAlign: "center",
  },
  title1: {
    color: "#393939",
    fontFamily: "Avenir-Black",
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 25,
    paddingLeft: 8,
  },
  title2: {
    color: "#575757",
    fontFamily: "Avenir-Black",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
  },
});
