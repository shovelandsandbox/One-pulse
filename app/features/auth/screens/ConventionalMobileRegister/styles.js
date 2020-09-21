import { StyleSheet, Platform, Dimensions } from "react-native";

import { CoreConfig } from "@pru-rt-internal/pulse-common";

const { colors, width } = CoreConfig;

export default StyleSheet.create({
  subContainers: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subContainer3: {
    flex: 0.50,
    marginLeft:20,
    marginRight:20,
    justifyContent: "flex-start",
  },
  subContainer2: {
    flex: 0.30,
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    justifyContent: 'flex-end',
  },
  subContainer1: {
    paddingTop: 20,
    flex: 0.2,
    marginLeft:20,
    marginRight:20,
  },
  orDivider: {
    ...Platform.select({
      android: {
        marginTop: 0,
      },
    }),
  },
  brandImage: {
    flex: 3,
    alignSelf: "flex-start",
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "visible",
    backgroundColor: colors.white,
  },
  mg_bt10: {
    marginBottom: 10,
  },
  logText: {
    fontSize: 12.7,
    // letterSpacing: 1.01,
    lineHeight: 14.3,
  },
  rightText: {
    textAlign: "right",
  },
  login: {
    paddingRight: 20,
    paddingTop: 20,
    fontSize: 12.7,
    // letterSpacing: 1.01,
    lineHeight: 14.3,
    textAlign: "right",
    color: colors.nevada,
  },
  wrapper: {
    padding: 20,
  },
  midContent: {
    width: width,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
  },
  logo: {
    width: 85.3,
    height: 89.3,
    marginBottom: 20,
  },
  or: {
    flexDirection: "row",
    marginVertical: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  err: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 10,
    lineHeight: 26.7,
    textAlign: "left",
    color: colors.crimson,
  },
  horizontalLine: {
    backgroundColor: "black",
    height: 0.7,
    flex: 1,
    alignSelf: "center",
  },
  dividerText: {
    alignSelf: "center",
    paddingHorizontal: 20,
    fontSize: 10.7,
    color: colors.nevada,
  },
  register: {
    backgroundColor: colors.crimson,
    width: "90%",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  registerText: {
    marginTop: 10,
    color: colors.white,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 13.3,
    lineHeight: 15.3,
    color: colors.silver,
    paddingLeft: 5,
  },
  msgSent: {
    fontSize: 15.3,
    lineHeight: 18.3,
    marginTop: 20,
    marginBottom: 20,
  },
  emailText: {
    color: "#2880b9",
    fontSize: 15.3,
    lineHeight: 18.3,
  },
  textInput: {
    color: colors.nevada,
    fontSize: 13.3,
    lineHeight: 16.7,
    paddingRight: 10,
    paddingLeft: Platform.OS == "ios" ? 20 : 5,
    paddingTop: 10,
    paddingBottom: 10,
    // marginTop: Platform.OS == "ios" ? 5 : 0,
    borderBottomWidth: Platform.OS == "ios" ? 1 : 0,
    borderBottomColor: colors.lightGray,
  },
  inputView: {
    width: width - 25,
  },
  VerifyContainer: {
    flex: 1,
  },
  VerifyContent: {
    alignItems: "center",
  },
  verifyFooter: {
    backgroundColor: colors.solidGray,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  alerts: {
    fontSize: 15.3,
    lineHeight: 18.3,
  },
  warn: {
    backgroundColor: colors.solidGray,
    padding: 15,
    marginTop: 25,
  },
  footerTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  warnTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    fontSize: 15.3,
    lineHeight: 18.3,
    paddingTop: 5,
    paddingBottom: 5,
  },
  warnMsg: {
    fontSize: 13.3,
    lineHeight: 16.7,
  },
  warnMsgLink: {
    fontSize: 13.3,
    lineHeight: 16.7,
    color: colors.crimson,
  },
  allMsg: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    fontSize: 13.3,
    lineHeight: 16.7,
  },
  loading: {
    fontSize: 10.7,
    lineHeight: 12,
    color: colors.nevada,
  },
  mg_10: {
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: colors.silver,
    borderRadius: 50,
    margin: 5,
  },
  flx_rw: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  errorText: {
    fontSize: 15,
    lineHeight: 18,
    color: "#ed1b2e",
    paddingBottom: 8,
  },
  errorPadding: {
    paddingTop: 10,
  },
  screenSwitch: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButtonText: {
    fontSize: 13.3,
    lineHeight: 15.6,
    // letterSpacing: 1.01,
    textAlign: "left",
    color: "#68737a",
  },
  emailRegisterText: {
    fontSize: 13.3,
    lineHeight: 15.6,
    // letterSpacing: 1.01,
  },
  headerButton: {
    justifyContent: "center",
    marginLeft: Platform.OS == "ios" ? 2 : 2,
  },
  registerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    bottom: -5,
    left:20,
    right:20,
  },
  regBtnTextStyle: {
    alignSelf: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#6b6a6d",
  },
  resendText: {
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: colors.crimson,
    color: colors.crimson,
    fontSize: 13.3,
    lineHeight: 15.6,
  },
  toastContainer:{
    flex:1,
    backgroundColor: colors.transparent
  },
  modalContent: {
    padding: 10,
  },
  modalTitle: {
    fontSize: 21.7,
    lineHeight: 25,
    textAlign: "left",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10,
  },
  popContent: {
    padding: 0,
  },
  modalContent: {
    padding: 10,
  },
  modalStyle: {
    backgroundColor: colors.white,
    alignItems: "center",
    height: 170,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.nevada,
    padding: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
  },
  modalLabel: {
    paddingBottom: 5,
  },
  modalLeftButton: {
    alignItems: "center",
    flex: 0.45,
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: "#717171",
    borderRadius: 5,
  },
  modalRightButton: {
    alignItems: "center",
    flex: 0.45,
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: "#717171",
    borderRadius: 5,
  },
  modalButton: {
    flex: 0.5,
    padding: 8,
  },
  modalButtonLabel: {
    fontSize: 13.3,
    lineHeight: 14.3,
    textAlign: "center",
    paddingTop: 10,
  },
  inputLabelText: {
    color: "#515B61",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 20,
    fontFamily: "Avenir",
  },
});
