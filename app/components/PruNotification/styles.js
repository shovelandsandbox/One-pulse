/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Platform } from "react-native";

const fontFamily = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";

export const htmlStyles = {
  classesStyles: {},
};

export default StyleSheet.create({
  baseFontStyle: {
    fontFamily,
  },
  containerStyle: {
    margin: 0,
    padding: 0,
  },
  instructions: {
    color: "#68737a",
    fontFamily,
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 5,
    marginLeft: 16,
    marginRight: 16,
    textAlign: "left",
  },
  longContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 30,
  },
  shortContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 60,
  },
  redButton: { 
    width: "70%", 
    backgroundColor: "#ec1c2e", 
    height: 36, 
    borderRadius: 10, 
    justifyContent: "center", 
    alignSelf: "center",
    marginTop: 10, 
  },
  closeButton: {
    flex: 0.3,
    zIndex: 200,
  },
  redButtonText: { 
    color: "#ffffff", 
    fontSize: 14, 
    lineHeight: 18, 
    textAlign: "center",
  },
});
