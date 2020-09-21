import { StyleSheet, Platform, Dimensions } from "react-native";

import { Theme } from "../../../../themes";
const { Sizes, Colors } = Theme;
const width = Sizes.fullScreen

const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width
};

const otpModalHeight = 250;
const otpModalWidth = 319;
const fontFamily =
  Platform.OS === "ios"
    ? {
      bold: "PruSansNormal-Demi",
      normal: "PruSansNormal"
    }
    : {
      bold: "pru-bold",
      normal: "pru-regular"
    };

const styles = StyleSheet.create({
  firstView: {
    flex: 1,
    backgroundColor: Colors.white
  },
  scroll: {
    paddingHorizontal: 20
  },
  secondView: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  inputRectStyle: {
    color: Colors.Mischka
  },

  genderView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  genderContainer: {
    width: "30%"
  },
  dateView: {
    width: "65%"
  },
  mobileView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  countrycodeView:
    { width: "30%" },

  countryNo: {
    width: "65%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  phoneNoView:
  {
    flex: 1,
    marginRight: 15
  },


  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 10.3,
    paddingVertical: 9
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10.3,
    paddingVertical: 9
  },
  closeIcon: {
    width: 28.3,
    height: 28.3,
    marginBottom: 16.7
  },
  doclogo: {
    paddingTop: 5,
    width: 100,
    height: 60,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: "center",
    paddingBottom: 2,
    resizeMode: "contain"
  },
  doctorImage: {
    height: 197,
    width: "100%"
  },
  title: {
    fontSize: 16.7,
    textAlign: "center",
    color: Colors.warmGray,
    lineHeight: 22.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
  },
  subTitle: {
    fontSize: 13.3,
    textAlign: "center",
    color: Colors.warmGray,
    lineHeight: 17.7,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginTop: 13.3
  },
  btn: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  primary: {
    backgroundColor: Colors.crimson
  },
  flexRow: {
    flex: 1,
    flexDirection: "row"
    // flexWrap: "wrap",
  },
  headerContainer: {
    flexDirection: "row"
  },
  headerIconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  phoneField: {
    flex: 1,
    flexDirection: "row"
  },
  profileLink: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20
  },
  doctorImgaeWrapper: {
    flex: 0.3,
    justifyContent: "center"
  },
  textWrapper: {
    flex: 0.4,
    marginBottom: 40
  },
  termsWrapper: {
    flex: 0.35,
    justifyContent: "center"
  },
  checkBox: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 22,
    lineHeight: 25,
    color: Colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingBottom: 22,
    paddingRight: 22
  },
  subhead: {
    fontSize: 15,
    lineHeight: 18,
    color: Colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    paddingBottom: 8
  },
  label: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.silver,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
  },
  textinput: {
    fontSize: 14,
    lineHeight: 20,
    height: 38,
    marginBottom: 20.2,
    color: Colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  },
  phone: {
    width: "100%"
  },
  headerSection: {
    paddingLeft: 7,
    marginLeft: 10
  },
  formSection: {
    paddingLeft: 7,
    marginLeft: 10,
    paddingRight: 7,
    paddingTop: 20
  },
  contentContainer: {
    backgroundColor: Colors.white
  },

  pickerView: {
    height: 90, width: "100%"
  },

  verifyBtn: {
    backgroundColor: Colors.pulseRed,
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    paddingHorizontal: 8,
    // width: 100,
    borderRadius: 10,
    position: "relative",
    right: 0
  },
  verifiedIcon: {
    alignItems: "center",
    justifyContent: "center"
  },
  verifyText: {
    // right: 100,
    fontFamily: fontFamily.normal,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.white
  },
  iAccept: {
    marginBottom: 22,
    color: Colors.nevada
  },
  iAcceptText: {
    color: Colors.nevada
  },
  mainContainer: {
    backgroundColor: Colors.white,
    position: "absolute",
    top: (dimensions.fullHeight - dimensions.fullHeight / 2) / 2,
    left: (dimensions.fullWidth - 41.2 - otpModalWidth) / 2,
    width: otpModalWidth,
    minHeight: otpModalHeight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1
  },
  otpHeading: {
    paddingTop: 12.3,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 21.7,
    color: Colors.nevada
  },
  otpSubHeading: {
    paddingTop: 12.3,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.bunker
  },
  otpInput: {
    borderBottomWidth: 1,
    borderColor: Colors.white,
    borderBottomColor: Colors.nevada,
    color: Colors.nevada,
    backgroundColor: Colors.white,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: fontFamily.bold,
    marginLeft: 5,
    height: 60
  },
  otpInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  otpInputNotEmpty: {
    backgroundColor: Colors.white
  },
  resendOTPContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  resendOTPLink: {
    textAlign: "center",
    fontSize: 14,
    // color: Colors.crimson,
    color: Colors.CodGrey,
    fontFamily: fontFamily.normal
  },
  resendOTPLinkRed: {
    color: Colors.crimson
  },

  cancelOTPContainer: {
    backgroundColor: Colors.pulseRed,
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 100,
    borderRadius: 8,
    position: "relative",
    right: 0,
    marginBottom: 8
  },
  cancelOTP: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fontFamily.bold
  },

  countryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    marginBottom: 20.2
  },
  country: {
    width: width - 10,
    height: 32,
    color: Colors.deepGrey
  },
  labelTitle: {
    fontSize: 13.3,
    lineHeight: 15.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: Colors.silver,
    paddingTop: 12,
    paddingLeft: 5
  },
  dropbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 26.7,
    letterSpacing: 0,
    textAlign: "left",
    color: Colors.nevada
  },
  dropDownButton: {
    marginTop: 10,
    //fontFamily: Platform.OS === 'ios' ? 'PruSansNormal' : 'pru-regular',
    marginBottom: 5,
    width: Dimensions.get("window").width * 0.9,
    paddingLeft: 5
  },
  countryDropdownStyle: Platform.select({
    ios: {
      width: Dimensions.get("window").width * 0.9,
      backgroundColor: Colors.whiteSmokef2f2f2,
      marginTop: 10,
      height: 80
    },
    android: {
      width: Dimensions.get("window").width * 0.9,
      backgroundColor: Colors.whiteSmokef2f2f2,
      marginTop: -15,
      height: 80
    }
  }),
  dropdownTextStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 18.3,
    letterSpacing: 0,
    textAlign: "left",
    paddingLeft: 15,
    backgroundColor: Colors.concrete,
    color: Colors.nevada
  },
  dropDownIcon: {
    position: "absolute",
    right: 10
  },
  error: {
    color: Colors.crimson,
    fontFamily: fontFamily.normal,
    fontSize: 13.3,
    lineHeight: 18.3,
    textAlign: "left",
    padding: 20
  },
  errorText: {
    fontSize: 15,
    lineHeight: 18,
    color: Colors.red,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    paddingBottom: 8
  },
  errorPadding: {
    paddingTop: 5,
    textAlign: "center"
  },
  countryCode: {
    fontSize: 13.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: Colors.nevada
  },
  phoneText: {
    paddingLeft: 20,
    flex: 0.8
  },
  textLogo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5
  },
  docOnCallImage: {
    width: 36,
    height: 18,
    marginLeft: 2,
    marginRight: 2
  },
  poweredByText: {
    textAlign: "left",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: Colors.dimGray6d6d6d,
    fontSize: 11
  },
  termsconditions: {
    color: Colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular"
  },
  termsconditionslink: {
    color: Colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular"
  },
  updateText: {
    color: Colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular"
  },
  updateLink: {
    color: Colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular"
  },

  modalStyle: {
    backgroundColor: Colors.blackOpacity,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },

  modalContainerStyle: {
    flex: 1,
    position: "relative"
  },

  modalDoneButtonStyle: {
    height: 44,
    justifyContent: "center"
  },

  modalDoneTextStyle: {
    fontSize: 15,
    color: Colors.dodgerBlue
  },

  modalDoneButtonContainerStyle: {
    height: 44,
    backgroundColor: Colors.ivory,
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    paddingRight: 10
  },

  modalWrapperStyle: {
    height: 260,
    width: "100%",
    backgroundColor: Colors.white,
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },

  termsConditionMsgContainerStyle: {
    paddingHorizontal: 20,
    marginTop: 50,
    fontSize: 12,
    fontWeight: "300"
  },
  conditionNoticeClickableTextStyle: {
    color: Colors.grey515B61,
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
    textDecorationLine: "underline"
  },
  conditionNoticeNotClickableTextStyle: {
    color: Colors.grey515B61,
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
    lineHeight: 20
  },

  confirmButtonContainerStyle: {
    width: 260,
    height: 45,
    borderRadius: 45,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colors.frolyRGB,
    marginBottom: 54,
    marginTop: 20
  },
  confirmTextStyle: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16
  }
});

export default styles;
