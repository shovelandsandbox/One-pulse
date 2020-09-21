import { StyleSheet, Platform } from "react-native";

import { CoreConfig } from "@pru-rt-internal/pulse-common";

const { colors } = CoreConfig;

export default (fpstyles = StyleSheet.create({
  grayBox: {
    backgroundColor: colors.solidGray,
    padding: 13,
    marginTop: 50,
  },
  fpContainer: {
    paddingVertical: 9,

  },
  fpContainer1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10
  },
  contentView: {
    paddingHorizontal: 20,
  },
  contentView1: {
    paddingHorizontal: 20,
    marginTop: 88,
    alignItems: "center"

  },
  contentView2: {
    paddingHorizontal: 20,
    // marginTop:88,
    alignItems: "center"
  },
  grayBoxTitle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15.3,
    lineHeight: 18.3,
    marginTop: 7,
    marginBottom: 20,
  },
  grayBoxDescriptionTitle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
    lineHeight: 18.3,
    textAlign: "left",
    color: colors.nevada,
    marginBottom: 6.7,
  },
  grayBoxContent: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 16.7,
    textAlign: "left",
    color: colors.nevada,
    marginBottom: 13.3,
  },
  redBlock: {
    color: colors.red,
  },
  wrapper: {
    padding: 10,
    backgroundColor: colors.white,
  },
  login: {
    width: 50,
    height: 42,
  },
  verify: {
    marginBottom: 22,
    marginTop: Platform.OS === "ios" ? 35 : 15,
  },
  forgotcloseBtn: {
    width: 28.3,
    height: 28.3,
    marginLeft: 15,
  },
  screenTitle: {
    textAlign: "left",
    fontSize: 22,
    lineHeight: 25,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: colors.nevada,
    marginBottom: 10,
    textAlign: "center",
    color: "rgba(81,91,97,1)"
  },
  screenDescriptionWraper: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  screenDescription: {
    fontSize: 16,
    textAlign: "center",
    color: "rgba(34,37,41,1)"

  },
  screenDescriptionWraper1: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
  },
  screenDescription1: {
    width: 315,
    fontSize: 16,
    textAlign: "center",
    color: "rgba(34,37,41,1)",
  },
  emailContainerStyle: {
    marginTop: 54,
    marginBottom: 72,
    width: 295,
  },
  header: { display: "none" },
  touchableBack: {},
  btn: {
    borderRadius: 22,
    height: 44,
    width: 220,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  resendOTPDesc: {
    color: "#222529",
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 28,
    fontFamily: "Avenir",
  },
  resendOTPText: {
    textAlign: "center",
    color: "#ed1b2e",
    fontFamily: "Avenir",
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "500",
  },
}));
