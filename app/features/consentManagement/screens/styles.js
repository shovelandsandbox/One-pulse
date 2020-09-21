/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ED1B2E",
    borderRadius: 22,
    bottom: 0,
    height: 44,
    justifyContent: "center",
    width: 180,
  },
  buttonTextStyle: {
    color: "#fff",
    fontFamily: "Avenir",
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 30,
    textAlign: "center",
  },
  consentText: {
    color: "#515B61",
    fontFamily: "Avenir-Roman",
    fontSize: 13,
    letterSpacing: 1,
    lineHeight: 15,
    textAlign: "left",
  },
  consentTextStyle: {
    letterSpacing: 1,
    marginTop: 20,
    textAlign: "center",
  },
  containerStyle: {
    marginBottom: 15,
    marginTop: 10,
    width: "100%",
  },
  pageContainerStyle: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 40,
    margin: 10,
  },
  textStyle: {
    color: "#515B61",
    fontFamily: "Avenir-Roman",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
    lineHeight: 30,
    textAlign: "center",
  },
  subHeading: {
    color: "#515B61",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    fontWeight: "900",
  },
  pulsePersonalisedContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    padding: 20
  },
  pulsePersonalisedTitle: {
    height: "auto",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 30,
    textAlign: "left"
  },
  pulsePersonalisedDesc: {
    height: "auto",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    textAlign: "left",
    justifyContent: "space-evenly",
    marginTop: 15
  },
  pulsePersonalisedImage: {
    height: 325,
    marginTop: 25
  },
  pulsePersonalisedNegativeBtn: {
    width: 150,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  pulsePersonalisedPositiveBtn: {
    width: 170,
    height: 48,
    borderRadius: 22
  },
  pulsePersonalisedPositiveBtnGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 130.3,
    width: 160,
    height: 48,
  },
  pulsePersonalisedNegativeBtnText: {
    fontSize: 16,
    color: "black",
    fontFamily: "Avenir",
    textAlign: "center",
  },
  pulsePersonalisedPositiveBtnText: {
    fontFamily: "Open Sans",
    lineHeight: 14.7,
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold"
  }
});
