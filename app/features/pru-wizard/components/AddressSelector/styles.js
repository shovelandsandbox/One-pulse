/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Platform } from "react-native";
import theme from "../../../../themes/default";

const fontFamily = Platform.OS === "ios" ? "Avenir" : "pru-regular";

export default StyleSheet.create({
  addressContainerStyle: {
    fontSize: 13,
    marginVertical: 10,
  },
  addressMapContainer: {
    marginTop: 30,
  },
  addressTxtStyle: {
    color: "#5b6770",
    fontFamily,
    fontSize: 16,
  },
  aptSuiteContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    position: "relative",
  },
  aptSuiteStyle: {
    color: "black",
    fontSize: 13,
    fontWeight: "900",
  },
  bodyStyle: {},
  buttonContainer: {
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
  buttonText: {
    color: "#fff",
    fontFamily,
    fontSize: 16,
    letterSpacing: 1,
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "space-between",
  },
  continueContainerStyle: {
    alignSelf: "center",
    marginTop: 80,
  },
  continueTxtStyle: {
    alignItems: "center",
    backgroundColor: "#ed1b2e",
    borderColor: "#d00016",
    borderRadius: 17.7,
    elevation: 1,
    flexDirection: "row",
    height: 46.5,
    justifyContent: "center",
    paddingRight: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    width: 307.6,
  },
  exception: {
    color: theme.Colors.redEE172A,
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  inputBoxStyle: {
    marginLeft: 20,
    width: 100,
  },
  mapContainer: {
    height: 175,
  },
  mapStyle: {
    height: 175,
  },
  subAddressContainer: {
    flexDirection: "column",
    height: 53.5,
    marginTop: 27.5,
    position: "relative",
  },
  subAddressHeaderStyle: {
    color: "#5b6770",
    fontFamily,
    fontSize: 17.7,
    fontWeight: "bold",
  },
  subAddressStyle: {
    color: "#5b6770",
    fontFamily,
    fontSize: 16,
  },
  textHeaderStyle: {
    color: "#475662",
    fontFamily,
    fontSize: 21.3,
    fontWeight: "bold",
  },
  textInputStyle: {
    borderBottomColor: "#999999",
    borderBottomWidth: 1,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  textStyle: {
    color: "#5b6770",
    fontFamily,
    fontSize: 14,
    marginTop: 6.7,
  },
});
