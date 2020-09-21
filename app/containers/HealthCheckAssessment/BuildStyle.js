import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(239, 235, 250, 1.0)",
  },
  imgBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.2,
    left: 0,
    top: 200,
  },
  headerText: {
    textAlign: "left",
    color: "rgba(229,0,0,1.0)",
    letterSpacing: 0,
    fontSize: 22,
    lineHeight: 25,
    marginTop: 20,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingLeft: 30,
    paddingBottom: 10,
  },
  textStyle: {
    textAlign: "left",
    color: "#6b6a6d",
    letterSpacing: 0,
    fontSize: 14,
    lineHeight: 15,
    marginTop: 10,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    paddingLeft: 30,
    paddingRight: 60,
  },
  headerLogo: {},
});
