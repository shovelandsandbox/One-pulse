import { StyleSheet, Platform } from "react-native";
import { colors, CoreConfig } from "@pru-rt-internal/pulse-common";
const { height, width } = CoreConfig;

export default StyleSheet.create({
  about: {
    color: "#68737a",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 17.3,
  },
  aboutDesc: {
    color: "#6b6a6d",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 15.6,
    marginTop: 8.7,
    textAlign: "left",
  },
  backIcnWrapper: {
    alignItems: "flex-end",
  },
  backIcnWrapper1: {
    marginBottom: 10,
    position: "absolute",
    right: 10,
    top: 0,
  },
  blueCircle: {
    backgroundColor: colors.bondiBlue,
    borderRadius: 20 / 2,
    height: 20,
    width: 20,
  },
  nevadaCircle: {
    backgroundColor: colors.nevada,
    borderRadius: 20 / 2,
    height: 20,
    width: 20,
  },
  borderBottom: {
    borderBottomColor: "#a8a8a8",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  close: {
    fontSize: 19,
    textAlign: "right",
  },
  closeBtn: {
    height: 28.3,
    paddingTop: 10,
    width: 28.3,
  },
  defaultCircle: {
    backgroundColor: colors.white,
    borderRadius: 20 / 2,
    height: 20,
    width: 20,
  },
  diseaseTitle: {
    alignContent: "center",
    flex: 0.9,
  },
  diseaseTitleIcon: {
    height: 9.8,
    width: 6.6,
  },
  diseaseTitleIconWrapper: {
    alignItems: "flex-end",
    flex: 0.1,
    textAlign: "right",
  },
  greenCircle: {
    backgroundColor: colors.green,
    borderRadius: 20 / 2,
    height: 20,
    width: 20,
  },

  greyCircle: {
    backgroundColor: colors.greyColor,
    borderRadius: 20 / 2,
    height: 20,
    width: 20,
  },
  horizontalLine: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
    marginTop: 17.2,
  },
  marginTop10: {
    marginTop: 10,
  },
  menuIcon: {
    alignSelf: "center",
    height: 18,
    width: 21,
  },
  menuIconWrapper: {
    alignItems: "center",
    flex: 0.25,
    paddingTop: 15.3,
  },
  menuText: {
    flexWrap: "wrap",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 11.7,
    marginTop: 9.2,
    // width: 50,
  },
  mg_bt22: {
    marginBottom: 22,
  },
  mg_tp17: {
    marginTop: 17.2,
  },
  mg_tp19: {
    marginTop: 19.2,
  },
  mg_tp27: {
    marginTop: 27.5,
  },
  mg_tp37: {
    marginTop: 37.2,
  },
  orangeCircle: {
    backgroundColor: colors.orange,
    borderRadius: 20 / 2,
    height: 20,
    width: 20,
  },
  organ: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 18.3,
    lineHeight: 21,
    marginBottom: 8.7,
  },
  pruRegular: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  redCircle: {
    backgroundColor: colors.red,
    borderRadius: 20 / 2,
    height: 20,
    width: 20,
  },
  reportDescTitle: {
    color: "#68737a",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 17.3,
  },
  reportIcon: {
    alignSelf: "center",
    height: 50,
    width: 50,
  },
  reportText: {
    color: colors.nevada,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 15,
    textAlign: "justify",
  },
  reportTime: {
    color: "#68737a",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    lineHeight: 17.3,
  },
  reportWrapper: {
    paddingLeft: 24.3,
    paddingRight: 24.3,
    paddingTop: 9.7,
  },
  rowFlex: {
    flex: 1,
    flexDirection: "column",
  },
  rowFlexMt: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
  },
  swipeableArea: {
    alignSelf: "center",
    backgroundColor: "#d6d6d6",
    borderRadius: 5,
    height: 5.3,
    marginTop: 7,
    position: "absolute",
    width: 72,
  },
  title: {
    flex: 0.7,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 21.7,
    lineHeight: 25,
    paddingLeft: 14,
    textAlign: "left",
  },
  titleRight: {
    flex: 0.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 21.7,
    lineHeight: 25,
    textAlign: "left",
  },
  twinImage: {
    backgroundColor: "#efefef",
    height: height * 0.6,
    resizeMode: "contain",
    width: width,
  },
  wrapper: {
    //flex: 1,
    flexDirection: "row",
  },
});
