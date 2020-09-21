import { StyleSheet, Platform, Dimensions } from "react-native";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { colors } = CoreConfig;
const window = Dimensions.get("window");
const regular = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";
const bold = Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold";
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white
  },
  ActivityIndicatorStyle: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center"
  },
  paymentWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10.5
  },
  box: {
    padding: 8,
    borderWidth: 2,
    margin: 10,
    borderColor: "#68737a",
    borderRadius: 10
  },
  btn: {
    margin: 10,
    borderRadius: 10,
    height: 40,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  btnTextStyle: {
    color: "#ffffff"
  },
  audioTextStyle: {
    color: "#68737a"
  },
  primary: {
    margin: 10,
    height: 40,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#68737a"
  },
  cancelBtn: {
    borderColor: "#68737a",
    backgroundColor: "#68737a",
    borderWidth: 0.7,
    width: 106
  },
  default: {
    borderColor: "#ed1b2e",
    backgroundColor: "#ed1b2e",
    borderWidth: 0.7
  },
  title: {
    fontSize: 16.3,
    lineHeight: 18.8,
    color: colors.nevada,
    fontFamily: bold
  },
  subtitle: {
    fontSize: 11.3,
    lineHeight: 13,
    color: colors.nevada,
    fontFamily: bold
  },
  titleWrapper: {
    marginBottom: 46.3
  },
  status: {
    fontSize: 11.3,
    lineHeight: 12.5,
    color: "#6b6a6d",
    fontFamily: regular
  },
  mode: {
    fontSize: 13.8,
    lineHeight: 15.8,
    color: colors.nevada,
    fontFamily: bold
  },
  statusWrapper: {
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  counterContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: window.width * 0.75
  },
  textContainer: {
    textAlign: "right"
  },
  counter: {
    color: colors.silver,
    fontSize: 12.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    //textAlign: 'right'
  },
  modalStyle: {
    backgroundColor: colors.white,
    alignItems: "flex-start",
    height: window.height * 0.4,
    width: window.width * 0.85,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.nevada,
    padding: 10
  },
  modalButtonContainer: {
    flexDirection: "row"
    // paddingLeft: 10,
  },
  modalLabel: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    lineHeight: 17,
    padding: 20,
    paddingLeft: 27,
    paddingRight: 30,
    letterSpacing: 0.5
  },
  modalButton: {
    padding: 8,
    paddingTop: 15,
    paddingLeft: 0,
    paddingBottom: 15,
    flexDirection: "row"
  },
  modalButtonLabel: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 16.7,
    paddingLeft: 10,
    letterSpacing: 0.5,
    flexWrap: "wrap"
  },
  modalFooterBtnContainer: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  modalFooterBtn: {
    flex: 0.5
  },
  symptomsModalFooterBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalFooterLabel: {
    fontSize: 13.3,
    lineHeight: 15.3
  },
  symptomsTextInput: {
    color: colors.nevada,
    fontSize: 15.3,
    lineHeight: 18.3,
    textAlignVertical: "top",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.nevada,
    borderRadius: 3,
    height: 130,
    flex: 1
  }
});
