import { StyleSheet, Platform, Dimensions } from "react-native";

import { CoreConfig } from "@pru-rt-internal/pulse-common";

const { colors, width } = CoreConfig;
const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
};

const otpModalHeight = 229.3;
const otpModalWidth = 319;
const fontFamily =
  Platform.OS === "ios"
    ? {
      bold: "PruSansNormal-Demi",
      normal: "PruSansNormal",
    }
    : {
      bold: "pru-bold",
      normal: "pru-regular",
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 10.3,
    paddingVertical: 9,
  },
  scrollContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10.3,
    paddingVertical: 9,
  },
  closeIcon: {
    width: 28.3,
    height: 28.3,
    marginBottom: 16.7,
  },
  doclogo: {
    paddingTop: 5,
    width: 100,
    height: 60,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: "center",
    paddingBottom: 2,
    resizeMode: "contain",
  },
  doctorImage: {
    height: 197,
    width: "100%",
  },
  title: {
    fontSize: 16.7,
    textAlign: "center",
    color: colors.warmGray,
    lineHeight: 22.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  subTitle: {
    fontSize: 13.3,
    textAlign: "center",
    color: colors.warmGray,
    lineHeight: 17.7,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginTop: 13.3,
  },
  btn: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: colors.crimson,
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    // flexWrap: "wrap",
  },
  headerContainer: {
    flexDirection: "row",
  },
  headerIconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  phoneField: {
    flex: 1,
    flexDirection: "row",
  },
  profileLink: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20,
  },
  doctorImgaeWrapper: {
    flex: 0.3,
    justifyContent: "center",
  },
  textWrapper: {
    flex: 0.4,
    marginBottom: 40,
  },
  termsWrapper: {
    flex: 0.35,
    justifyContent: "center",
  },
  checkBox: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 22,
    lineHeight: 25,
    color: '#515B61',
    fontFamily: Platform.OS === "ios" ? "Avenir-Heavy" : "Avenir-Heavy",
    paddingBottom: 22,
    paddingTop: 20,
    alignSelf: 'center',
    // paddingRight: 22,
  },
  subhead: {
    fontSize: 14,
    lineHeight: 18,
    color: '#515B61',
    fontFamily: Platform.OS === "ios" ? "Avenir-Medium" : "Avenir-Medium",
    // paddingBottom: 8,
  },
  label: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.silver,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  textinput: {
    fontSize: 14,
    // lineHeight: 38,
    // height: 38,
    // marginBottom: 20.2,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    // borderBottomWidth: 1,
    // borderBottomColor: colors.white,
  },
  phone: {
    width: "100%",
  },
  headerSection: {
    marginTop: 10,
    paddingHorizontal: 6,
    marginHorizontal: 10,
  },
  formSection: {
    paddingLeft: 7,
    marginLeft: 10,
    paddingRight: 7,
    paddingTop: 20,
  },
  contentContainer: {
    backgroundColor: colors.white,
  },
  verifyBtn: {
    backgroundColor: "#ED1B2E",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 100,
    borderRadius: 8,
    position: "relative",
    right: 0,
  },
  verifiedIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  verifyText: {
    // right: 100,
    fontFamily: fontFamily.normal,
    color: colors.nevada,
    fontSize: 16,
    lineHeight: 20,
    color: "#fff",
  },
  iAccept: {
    marginBottom: 22,
    // color: colors.nevada,
    // fontFamily: Platform.OS === "ios" ? "Avenir-Medium" : "Avenir-Medium",
  },
  iAcceptText: {
    fontSize: 12,
    color: '#858585',
    // color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "Avenir-Medium" : "Avenir-Medium",
    paddingRight: 20,
  },
  mainContainer: {
    backgroundColor: colors.white,
    position: "absolute",
    top: (dimensions.fullHeight - otpModalHeight) / 2,
    left: (dimensions.fullWidth - 41.2 - otpModalWidth) / 2,
    height: otpModalHeight,
    width: otpModalWidth,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
  },
  otpHeading: {
    paddingTop: 12.3,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 21.7,
    color: colors.nevada,
  },
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  otpInput: {
    borderBottomWidth: 1,
    borderColor: colors.white,
    borderBottomColor: colors.nevada,
    color: colors.nevada,
    backgroundColor: colors.white,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: fontFamily.bold,
    marginLeft: 5,
    height: 60,
  },
  otpInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  otpInputNotEmpty: {
    backgroundColor: colors.white,
  },
  resendOTPContainer: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  resendOTPLink: {
    // textAlign: "center",
    fontSize: 14,
    color: colors.crimson,
    fontFamily: fontFamily.bold,
  },
  cancelOTPContainer: {
    flex: 1,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  cancelOTP: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fontFamily.bold,
  },
  countryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.silver,
    marginBottom: 20.2,
  },
  country: {
    width: width - 10,
    height: 32,
    color: colors.deepGrey,
  },
  labelTitle: {
    fontSize: 13.3,
    lineHeight: 15.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    // color: colors.silver,
    color: "#515B61",
    // paddingTop: 12,
    // paddingLeft: 5,
  },
  dropbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 26.7,
    letterSpacing: 0,
    textAlign: "left",
    color: colors.nevada,
  },
  dropDownButton: {
    marginTop: 10,
    //fontFamily: Platform.OS === 'ios' ? 'PruSansNormal' : 'pru-regular',
    marginBottom: 5,
    width: Dimensions.get("window").width * 0.9,
    paddingLeft: 5,
  },
  countryDropdownStyle: Platform.select({
    ios: {
      width: Dimensions.get("window").width * 0.9,
      backgroundColor: "#f2f2f2",
      marginTop: 10,
      height: 80,
    },
    android: {
      width: Dimensions.get("window").width * 0.9,
      backgroundColor: "#f2f2f2",
      marginTop: -15,
      height: 80,
    },
  }),
  dropdownTextStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 18.3,
    letterSpacing: 0,
    textAlign: "left",
    paddingLeft: 15,
    backgroundColor: colors.concrete,
    color: colors.nevada,
  },
  dropDownIcon: {
    position: "absolute",
    right: 10,
  },
  error: {
    color: colors.crimson,
    fontFamily: fontFamily.normal,
    fontSize: 13.3,
    lineHeight: 18.3,
    textAlign: "left",
    padding: 20,
  },
  errorText: {
    fontSize: 15,
    lineHeight: 18,
    color: colors.red,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    paddingBottom: 8,
  },
  errorPadding: {
    paddingTop: 5,
    textAlign: "center",
  },
  countryCode: {
    fontSize: 13.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: colors.nevada,
  },
  phoneText: {
    paddingLeft: 20,
    flex: 0.8,
  },
  textLogo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  docOnCallImage: {
    width: 36,
    height: 18,
    marginLeft: 2,
    marginRight: 2,
  },
  poweredByText: {
    textAlign: "left",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: "#6d6d6d",
    fontSize: 11,
  },
  termsconditions: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  termsconditionslink: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  updateText: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  updateLink: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  profileModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.8)",

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
  modalLabel: {
    paddingBottom: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
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
  modalButtonLabel: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 14.3,
    textAlign: "center",
    paddingTop: 10,
  },
  link: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#ed1b2e",
    // backgroundColor: '#ed1b2e',
  },
  aimeStyle: {
    color: '#222529',
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
  termsconditions: {
    color: '#515B61',
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    textDecorationLine: "underline",
  },
  myDocTncCloseContainer: {
    width: 38,
    height: 55,
    alignItems: "flex-start",
    justifyContent: "center",
    position: 'absolute',
    right: 0,
  },
  myDocTnCContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tncAgreeAndContinueButton: {
    position: "absolute",
    bottom: "3%",
    alignSelf: "center",
    height: 44,
    width: "58.67%",
    borderRadius: 255,
    backgroundColor: "#ED1B2E",
    justifyContent: "center",
  },
  tncAgreeContinueText: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  byContinueText: {
    color: '#515B61',
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 20,
  },
  talkToDoctorTextContainer: {
    paddingHorizontal: 18,
    marginTop: 10,
  },
  docLogo: {
    height: 26,
    width: 58,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  docLogoPosition: {
    justifyContent: 'center',
    height: 26,
    width: 60,
    lineHeight: 20,
    marginTop: -4,
  },
  consultWithQualifiedText: {
    marginVertical: 10,
    color: '#222529',
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  wheneverContainer: {
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  talktoDoctorLabelText: {
    alignSelf: 'center',
    color: '#515B61',
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 6
  },
  talkToDocContainer: {
    marginHorizontal: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
