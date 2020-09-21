/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Platform, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const fontFamily = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";

export const htmlStyles = {
  classesStyles: {
    setpbuttonStyle: {
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: "#fff2cf",
      width: 190,
      height: 100,
      borderRadius: 90,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "26px 33px 13px -15px rgba(0,0,0,1)",
      elevation: 1,
    },
    stepButtonConatiner: {
      top: 20,
    },
  },
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
  text: {
    color: "#836a27",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
