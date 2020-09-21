import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  footerView: {
    flex: 1,
    position: "absolute",
    bottom: 95,
    justifyContent: "center",
    marginLeft: 40,
  },
  imgStyle: {
    marginTop: 15,
    marginRight: 7.3,
  },
  healthCheckIcon: {
    height: 25,
    width: 25,
  },
  flx_rw: {
    flexDirection: "row",
  },
  flx_column: {
    flexDirection: "column",
  },
  backgroundImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.1,
    left: 0,
    top: 200,
  },
  headerText: {
    textAlign: "left",
    color: "#ed1b2e",
    letterSpacing: 0,
    fontSize: 21.7,
    lineHeight: 25,
    marginTop: 20,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingLeft: 20.8,
    paddingBottom: 10,
  },
  textStyle: {
    textAlign: "left",
    color: "#6b6a6d",
    letterSpacing: 0,
    fontSize: 13.3,
    lineHeight: 15,
    marginTop: 10,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    paddingLeft: 20.8,
    paddingRight: 60,
  },
  textheaderStyle: {
    textAlign: "left",
    color: "#6b6a6d",
    letterSpacing: 0,
    fontSize: 13.3,
    lineHeight: 15,
    marginTop: 10,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  arrowImage: {
    marginTop: 15,
    width: 7,
    height: 10,
    position: "absolute",
    left: 150.9,
  },
  contentView: {
    marginLeft: 20,
    marginRight: 20
  },
  footerText: {
    textAlign: "center",
    color: "#6b6a6d",
    letterSpacing: 0,
    fontSize: 11.7,
    lineHeight: 15,
    marginTop: 10,
    paddingLeft: 20,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  headerLogo: { display: 'none' },
});
