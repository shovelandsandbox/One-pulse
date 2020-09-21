import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  headView: {
    flex: 1,
    backgroundColor: "#EFEDF8",
  },
  headerText: {
    marginTop: 20,
    textAlign: "left",
    color: "#68737a",
    letterSpacing: 0,
    fontSize: 20,
    zIndex: 1,
    lineHeight: 19,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingLeft: 20,
  },
  poweredByText: {
    textAlign: "left",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: "#6b6a6d",
    lineHeight: 11,
    fontSize: 11,
  },
  getMostOfLife: {
    textAlign: "left",
    color: "#6b6a6d",
    letterSpacing: 0,
    fontSize: 20,
    lineHeight: 19,
    marginTop: 5,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingLeft: 20,
  },
  betaText: {
    textAlign: "left",
    color: "rgba(76,88,95,1.0)",
    letterSpacing: 0,
    fontSize: 16,
    marginTop: 30,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingLeft: 20,
  },
  detailText: {
    textAlign: "left",
    color: "#6b6a6d",
    letterSpacing: 0,
    fontSize: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    paddingLeft: 20,
    marginTop: 3,
  },
  imgBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // opacity:0.1,
    left: 0,
    top: 30,
  },
  btn: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    //marginTop: 20,
    marginBottom: 10,
    width: "80%",
  },
  primary: {
    backgroundColor: colors.crimson,
  },
  healthCheckText: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(255,255,255, 0.3)",
  },
  textLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  babylonImage: {
    width: 50,
    height: 25,
    marginLeft: 2,
    marginRight: 2,
  },
  babylonHeader: {
    width: 100,
    height: 50,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  termsWrapper: {
    flex: 0.2,
    justifyContent: "center",
    paddingLeft: 0,
    backgroundColor: "rgba(255,255,255, 0.3)",
  },
  checkBox: {
    flex: 1,
    paddingBottom: 10,
  },
  iAccept: { marginBottom: 22, color: colors.nevada },
  iAcceptText: {
    color: colors.nevada,
  },
  termsWrap: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginRight: 17,
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  chatbotContainer: {
    flex: 1,
    marginTop: "70%",
    position: "relative",
  },
});
