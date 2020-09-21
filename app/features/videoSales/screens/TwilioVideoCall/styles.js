/* eslint-disable react-native/sort-styles */
import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";
const window = Dimensions.get("window");
const fontFamily = Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold";
export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  permissionsContainer: {
    paddingLeft: 15,
  },
  heading: {
    fontSize: 22,
    lineHeight: 25,
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    //paddingBottom: 22,
    paddingRight: 22,
  },
  closeIcon: {
    alignItems: "flex-start",
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 65,
    paddingLeft: 11,
    paddingRight: 11,
    width: window.width,
    // marginBottom:10
  },
  headerSection: {
    flex: 0.5,
    paddingBottom: 3,
    paddingLeft: 14,
    paddingTop: 3,
  },
  ///
  icons: {
    height: 40,
    width: 40,
  },
  modalStyle: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.nevada,
    borderRadius: 7,
    borderWidth: 1,
    height: window.height * 0.5,
    padding: 10,
    width: window.width * 0.9,
    marginLeft: window.width * 0.05,
    marginTop: window.height * 0.25,
  },
  modalLabel: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    lineHeight: 17,
    padding: 20,
    paddingLeft: 27,
    paddingRight: 30,
    letterSpacing: 0.5,
  },
  //////
  modalButton: {
    padding: 8,
    paddingTop: 15,
    paddingLeft: 0,
    paddingBottom: 15,
    flexDirection: "row",
  },
  ////
  modalButtonLabel: {
    flexWrap: "wrap",
    fontFamily,
    fontSize: 13.3,
    letterSpacing: 0.5,
    lineHeight: 16.7,
    paddingLeft: 20,
    paddingRight: 10,
  },
  labelBold: {
    fontFamily,
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  ////
  contentCenter: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  modalFooterBtnContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    padding: 15,
  },
  modalFooterBtn: {
    flex: 0.5,
    height: 40,
    backgroundColor: "#ec1c2e",
    borderRadius: 10,
  },
  modalFooterBtnCancel: {
    flex: 0.5,
    height: 40,
    borderRadius: 10,
  },
  whiteText: {
    color: "#ffffff",
    alignSelf: "center",
    justifyContent: "center",
  },
  normalText: {
    marginTop: 10,
  },
  symptomsModalFooterBtn: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  modalFooterLabel: {
    fontSize: 13.3,
    lineHeight: 15.3,
  },
  symptomsTextInput: {
    borderColor: colors.nevada,
    borderRadius: 3,
    borderWidth: 1,
    color: colors.nevada,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15.3,
    height: 130,
    lineHeight: 18.3,
    marginBottom: 4,
    textAlignVertical: "top",
  },
  //Button
  btn: {
    alignItems: "center",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    margin: 10,
    width: 160,
  },
  btnTextStyle: {
    color: "#ffffff",
  },
  audioTextStyle: {
    color: "#68737a",
  },
  primary: {
    alignItems: "center",
    backgroundColor: "#68737a",
    height: 40,
    justifyContent: "center",
    margin: 10,
    width: 160,
  },
  default: {
    backgroundColor: "#ed1b2e",
    borderColor: "#ed1b2e",
    borderWidth: 0.7,
  },
  audioStyle: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#a8a8a8",
    borderWidth: 0.7,
    height: 40,
    justifyContent: "center",
    margin: 10,
    width: 160,
  },
  radioButtonTextStyle: {
    color: "#6b6a6d",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingBottom: 20,
    textAlign: "left",
  },
  selctedRowStyle: {
    borderColor: "#68737a",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    padding: 8,
    width: 160,
  },
  page0: {
    backgroundColor: "#f2f2f2",
    opacity: 0.6,
    padding: 8,
    width: 160,
  },
  page1: {
    backgroundColor: "#f2f2f2",
    opacity: 0.6,
    padding: 8,
    width: 160,
  },
  //payment options
  topView: {
    flexDirection: "column",
    flex: 0.5,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 40,
  },
  boostImageStyle: {
    height: 50,
    width: 150,
  },
  pricingTextStyle: {
    color: "#a7a7a7",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    marginBottom: 10,
    textAlign: "center",
  },
  amountStyle: {
    color: "#ed1b2e",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  descritionStyle: {
    color: "#6b6a6d",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    marginBottom: 10,
    textAlign: "center",
  },
  bottomViewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  paymetOptionbottomView: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
