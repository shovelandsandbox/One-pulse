/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  continueButton: {
    backgroundColor: "transparent",
    borderRadius: 22,
    width: "90%",
  },
  buttonStyle: {
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "Avenir" : "pru-regular",
    fontSize: 16,
    letterSpacing: 1,
  },
  previousButtonStyle: {
    color: "white",
    justifyContent: "center",
    left: 10,
    position: "absolute",
    top: 20,
  },
  skipButtonStyle: {
    color: "white",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontFamily: "sans-serif",
    fontSize: 16,
    lineHeight: 22,
    textTransform: "uppercase",
  },
  backBtn: {
    backgroundColor: "#FFF",
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateContactContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  updateContact: {
    color: "#0000EE",
    fontSize: 15,
    fontWeight: "normal",
    letterSpacing: 0,
    lineHeight: 16,
    textDecorationLine: "underline",
  },

  headerWrapper: {
    // backgroundColor: "#ed1b2e",
    elevation: 5,
    flexDirection: "row",
    height: 56,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  wizardContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
  },
  wizardHeader: {
    backgroundColor: "#FFF",
  },
  continueButtonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  wizardHeader: {
    backgroundColor: "#FFF",
  },
});
