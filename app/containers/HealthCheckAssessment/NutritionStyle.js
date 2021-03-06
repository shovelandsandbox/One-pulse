import { StyleSheet, Platform } from "react-native";
import {
  CoreConfig,
  colors,
} from "@pru-rt-internal/pulse-common";
const { width } = CoreConfig;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1.0)",
  },
  acivityIndicator: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  pieChartWrapper: {
    flex: 1,
    marginTop: 10,
    // borderRadius: 10,
    // backgroundColor: "#fff",
  },
  headCell: {
    flexDirection: "row",
    marginHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.nevada,
  },
  noDataText: {
    color: colors.warmGray,
  },
  headerText: {
    textAlign: "left",
    color: "#68737a",
    letterSpacing: 0,
    fontSize: 21.7,
    lineHeight: 30,
    marginTop: 20,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingLeft: 20,
  },
  peiChatHeader: {
    textAlign: "center",
    color: "#68737a",
    letterSpacing: 0,
    fontSize: 21.7,
    lineHeight: 32,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  peiChatTextStyle: {
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: "#6b6a6d",
    fontSize: 15,
    lineHeight: 22.3,
  },
  textStyle: {
    // textAlign: "left",
    color: "black",
    letterSpacing: 0,
    fontSize: 14,
    lineHeight: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    // paddingBottom: 10,
  },
  iconText: {
    marginRight: 8,
  },
  dataStyle: {
    textAlign: "right",
    color: "#6b6a6d",
    letterSpacing: 0,
    fontSize: 14,
    lineHeight: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    // paddingRight: 20,
  },
  image: {
    width: 23.9,
    height: 36.7,
    marginRight: 10,
  },
  imgStyle: {
    marginTop: 15,
    marginRight: 7.3,
  },
  healthCheckIcon: {
    height: 25,
    width: 25,
  },
  footerView: {
    backgroundColor: "rgba(235,235,235,1)",
    borderTopWidth: 1.2,
    borderColor: "#ee3d48",
    flexDirection: "column",
    // marginTop: 20,
    padding: 10,
  },
  footerContainerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
  },
  footertext: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-regular",
    textAlign: "center",
    color: "#68737a",
    fontSize: 15,
  },
  minText: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    textAlign: "left",
    color: "#68737a",
    fontSize: 13.3,
    // lineHeight: 15.6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight:10,
  },
  overView: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginLeft: 5,
    color: "#6b6a6d",
    fontSize: 13.3,
    lineHeight: 15.6,
    flex: 1,
    flexWrap: "wrap"
  },
  btn: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    width: "80%",
  },
  primary: {
    backgroundColor: "crimson",
  },
  footerTime: {
    flex: 1,
    marginBottom: 20,
  },
  arrowImage: {
    width: 6.6,
    height: 9.8,
  },
  flxRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightText: {
    textAlign: "right",
  },
  split: {
    flex: 0.5,
  },
  goodLine: {
    borderBottomWidth: 2,
    marginTop: 17.2,
    borderBottomColor: colors.green,
  },
  cautionLine: {
    borderBottomWidth: 2,
    marginTop: 17.2,
    borderBottomColor: colors.orange,
  },
  alertLine: {
    borderBottomWidth: 2,
    marginTop: 17.2,
    borderBottomColor: colors.red,
  },
  wrapper: {
    padding: 10,
  },
  headerTextStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: "#68737a",
    fontSize: 15,
    lineHeight: 17.3,
  },
  subHeaderTextStyle: {
    marginLeft: 5,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: "#68737a",
    fontSize: 15,
    lineHeight: 17.3,
  },
  healthReportStyle: {
    marginTop: 30,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: "#68737a",
    letterSpacing: 0,
    fontSize: 15,
    lineHeight: 17.3,
  },
  healthreportSub: {
    color: "#6b6a6d",
    fontSize: 15,
    lineHeight: 17.3,
  },
  healthreportMain: {
    color: "#68737a",
    letterSpacing: 0,
    fontSize: 15,
    lineHeight: 17.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    marginBottom: 10,
  },
  normalTex: {
    color: "#6b6a6d",
    fontSize: 13.3,
    lineHeight: 15.6,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  textLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  babylonImage: {
    width: 85,
    height: 55,
  },
  organsDetailsHeader: { display: 'none'},
  nutritionHeader: { display: 'none'},
});
