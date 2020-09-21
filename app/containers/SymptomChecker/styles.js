import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");

// CHAT HOME STYLE
export const ChatHomeStyle = StyleSheet.create({
  babylonHeader: {
    height: 50,
    position: "absolute",
    right: 10,
    top: 10,
    width: 100,
    zIndex: 1,
  },
  babylonImage: {
    height: 40,
    marginBottom: 10,
    width: Platform.select === "ios" ? 80 : 100,
  },
  babylonHeader: {
    width: 100,
    height: 50,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  backCloseBtnWrapper: {
    alignItems: "flex-start",
    height: 35,
    justifyContent: "flex-start",
    width: 35,
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  bottomContainer: {
    // height: window.height / 2,
    flex: 1,
    width: window.width,
    backgroundColor: colors.lightGray,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 20,
  },
  chatBackground: {
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  chatBotWithBack: {
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    position: "relative",
  },
  chatHistoryIcon: {
    height: 20,
    marginRight: 10,
    width: 20,
  },
  chatHistoryTouch: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  chatHomeBabylonHeader: {
    display: "none",
  },
  chatbotContainer: {
    marginTop: window.height / 25 - 25,
    paddingLeft: 10,
  },
  chatbotIcon: {
    height: 91,
    marginBottom: 15,
    width: 91,
  },
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  error: {
    borderColor: colors.crimson,
    borderWidth: 2,
  },
  errorMessage: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
    margin: 10,
    textAlign: "center",
  },
  headText: {
    color: "#ed1b2e",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 22,
    lineHeight: 25,
    maxWidth: 150,
    paddingBottom: 4,
  },
  label: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
    lineHeight: 15.6,
  },
  textMaxWidth: {
    maxWidth: 220,
  },
  textinput: {
    backgroundColor: colors.white,
    borderColor: colors.warmGray,
    borderRadius: 5,
    borderWidth: 0.3,
    color: colors.doveGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    lineHeight: Platform.OS === "ios" ? 25 : 15,
    textAlign: "center",
  },
  topContainer: {
    backgroundColor: colors.transparent,
    height: window.height / 2 - 50,
    width: window.width,
  },
});

// CHAT ONBOARD STYLE
export const ChatOnboardStyle = StyleSheet.create({
  activeGenderText: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    textAlign: "center",
  },
  babylonHeader: {
    height: 50,
    marginRight: 10,
    width: 100,
  },
  backIcnWrapper: {
    height: 42,
    width: 50,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.crimson,
    borderColor: colors.crimson,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    // margin:window.height/61.5,
    marginBottom: 0,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13,
    letterSpacing: 1.07,
    lineHeight: 15,
  },
  close: {
    height: 30,
    marginBottom: 10,
    marginLeft: 10,
    width: 30,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    // height: window.height,
    backgroundColor: colors.white,
  },
  contentContainer: {
    // height: window.height-105
    paddingHorizontal: 10,
  },
  country: {
    color: colors.deepGrey,
    height: 32,
    width: window.width - 10,
  },
  countryContainer: {
    marginBottom: 10,
  },
  datePickerBox: {
    borderBottomWidth: 1,
    borderColor: colors.silver,
    height: 30,
    justifyContent: "center",
    marginBottom: window.height / 34,
    marginTop: 2,
    padding: 0,
  },
  datePickerBtn: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 16,
    letterSpacing: 1.07,
    lineHeight: 17.3,
    textAlign: "center",
  },
  datePickerLabelWrapper: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 10,
  },
  datePickerText: {
    borderWidth: 0,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    marginLeft: 5,
  },
  dropDownButton: {
    color: colors.alto,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    height: 31,
    letterSpacing: 0,
    lineHeight: 18.3,
    paddingLeft: 15,
    paddingTop: 8,
    textAlign: "left",
    width: Dimensions.get("window").width - 30,
  },
  dropDownIcon: {
    position: "absolute",
    right: 10,
  },
  dropbox: {
    alignItems: "center",
    borderColor: colors.silver,
    borderRadius: 6.7,
    borderStyle: "solid",
    borderWidth: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: Dimensions.get("window").width - 30,
  },
  dropdownStyle: Platform.select({
    ios: {
      width: Dimensions.get("window").width - 35,
      backgroundColor: colors.concrete,
      marginTop: 10,
      marginLeft: -12,
      height: 80,
    },
    android: {
      width: Dimensions.get("window").width - 35,
      backgroundColor: colors.concrete,
      marginTop: -15,
      marginLeft: -12,
      height: 80,
    },
  }),
  dropdownTextStyle: {
    backgroundColor: colors.concrete,
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    letterSpacing: 0,
    lineHeight: 18.3,
    paddingLeft: 15,
    textAlign: "left",
  },
  errorColor: {
    borderColor: colors.crimson,
  },
  errorDefaultText: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 18,
    paddingBottom: 8,
  },
  errorText: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    lineHeight: 18,
    paddingBottom: 8,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  flx_rw: {
    flexDirection: "row",
  },
  formSection: {
    paddingLeft: 7,
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: window.height / 34,
    marginTop: window.height / 60,
    width: 200,
  },
  genderOptionContainer: {
    borderColor: colors.silver,
    borderWidth: 1,
    height: 27,
    justifyContent: "center",
    marginRight: 3,
    width: 120,
  },
  genderText: {
    color: colors.silver,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    textAlign: "center",
  },
  headerSection: {
    paddingLeft: 7,
  },
  heading: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 22,
    lineHeight: 25,
    paddingBottom: 22,
    paddingRight: 22,
  },
  label: {
    color: colors.silver,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14,
    lineHeight: 16,
  },
  labelTitle: {
    color: colors.silver,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
    lineHeight: 15.3,
  },
  loader: {
    backgroundColor: colors.tundoraDark,
    height: window.height,
    justifyContent: "center",
    left: 0,
    opacity: 0.5,
    position: "absolute",
    top: 0,
    width: window.width,
    zIndex: 9,
  },
  loaderUI: {
    alignItems: "center",
    justifyContent: "center",
  },
  subhead: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    lineHeight: 18,
    paddingBottom: 8,
  },
  textCenter: {
    textAlign: "center",
  },
  textStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 18.3,
    textAlign: "left",
  },
  textinput: {
    borderBottomWidth: 1,
    borderColor: colors.silver,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    height: 38,
    lineHeight: 20,
    marginBottom: window.height / 61.5,
  },
  wrapper: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
});

// CHAT ONBOARDCONFIRM STYLE
export const ChatOnboardConfirmStyle = StyleSheet.create({
  backCloseBtnWrapper: {
    alignItems: "flex-start",
    height: 35,
    justifyContent: "flex-start",
    width: 35,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.warmGray,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
    width: window.width / 2 - 20,
  },
  buttonActive: {
    backgroundColor: colors.crimson,
    borderColor: colors.crimson,
  },
  buttonActiveText: {
    color: colors.white,
  },
  buttonText: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13,
    letterSpacing: 1.07,
    lineHeight: 15,
  },
  chatbotContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 11,
    zIndex: 9,
  },
  chatbotIcon: {
    height: 90,
    width: 90,
  },
  close: {
    height: 28,
    width: 28,
  },
  closeBtn: {
    marginLeft: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    // padding: 10,
    height: window.height,
    backgroundColor: colors.white,
  },
  content: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 16,
    lineHeight: 18,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  contentContainer: {
    height: window.height - 90,
  },
  contentSection: {
    backgroundColor: colors.solidGray,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginTop: -30,
    paddingBottom: 30,
    paddingTop: 50,
  },
  contentSectionBaseFontstyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  contentSectionContainerStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    margin: 15,
  },
  fontBold: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  footerSection: {
    flexDirection: "row",
    height: 50,
    marginBottom: 5,
    padding: 10,
  },
  headerSection: {
    marginLeft: 10,
    paddingLeft: 7,
  },
  heading: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 22,
    lineHeight: 25,
    paddingBottom: 5,
    paddingRight: 22,
  },
  subhead: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 16,
    lineHeight: 18,
    paddingBottom: 10,
    paddingLeft: 10,
    textAlign: "center",
  },
});

// CHAT CONVERSATION STYLE
export const ChatConversationStyle = StyleSheet.create({
  getStartTopBox: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    height: 154,
    alignItems: 'center'
  },
  startPageGobackBtn: {
    width: 235,
    height: 36,
    marginTop: 20,
    marginLeft: 14,
    flexShrink: 0
  },
  btn: {
    borderColor: "#707070",
    borderWidth: 0.7,
    height: 30,
    marginRight: 20,
  },
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  dateContainer: {
    flex: 0.97,
  },
  dateOpacity: {
    opacity: 0.3,
  },
  datePickerBox: {
    marginTop: 2,
    // borderColor: '#a8a8a8',
    // borderBottomWidth: 1,
    padding: 15,
    height: 50,
    justifyContent: "center",
  },
  datePickerText: {
    borderWidth: 0,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    marginLeft: 5,
  },
  digitalTwinStyle: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    lineHeight: 20,
  },
  digitalTwinViewStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContainer: {
    backgroundColor: "#401f1f",
  },
  babylonHeader: {
    width: 100,
    height: 50,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headView: {
    flex: 1,
    backgroundColor: "#EFEDF8",
  },
  multiselectItemStyle: {
    // borderBottomColor: colors.silver,
    // borderBottomWidth: 0.5,
    backgroundColor: "#F1F3F5"
  },
  multiselectViewStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8
  },
  newChatBtn: {
    borderColor: "#707070",
    borderWidth: 0.7,
    height: 40,
    width: 320,
  },
  newChatBtnText: {
    color: "#68737a",
    fontFamily: "PruSansNormal-Demi",
    fontSize: 13.3,
    fontWeight: "bold",
    letterSpacing: 1.07,
    lineHeight: 15.3,
    margin: 10,
    textAlign: "center",
  },
  newChatContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 83,
    justifyContent: "center",
    width: "100%",
  },
  selectStyle: {
    padding: 13,
    paddingLeft: 35,
    backgroundColor: colors.white,
    borderBottomWidth: 0.3,
    borderColor: colors.silver,
  },
  selectStyleDigitalTwin: {
    padding: 13,
    paddingLeft: 35,
    backgroundColor: "#ed1b2e",
    borderBottomWidth: 0.3,
    borderColor: colors.silver,
  },
  sendBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  singleSelectText: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    lineHeight: 20,
  },
  submitButtonStyle: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.warmGray,
    borderRadius: 8,
    borderWidth: 0.5,
    height: 40,
    justifyContent: "center",
    margin: 10,
  },
  submitButtonText: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13,
    letterSpacing: 1.07,
    lineHeight: 15,
  },
  textinput: {
    backgroundColor: colors.white,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginLeft: 10,
    marginRight: 10,
  },
  viewResultBtnText: {
    color: "#68737a",
    fontFamily: "PruSansNormal-Demi",
    fontSize: 13.3,
    letterSpacing: 1.07,
    lineHeight: 15.3,
    margin: 5,
    textAlign: "center",
  },
});

// CHAT QUICKSTART STYLE
export const ChatQuickstartStyle = StyleSheet.create({
  babylonHeader: {
    height: 50,
    marginRight: 10,
    width: 100,
  },
  babylonImage: {
    height: 25,
    marginLeft: 2,
    marginRight: 2,
    width: 50,
  },
  chatBackground: {
    height: "100%",
    left: 0,
    opacity: 0.24,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  chatbotContainer: {
    backgroundColor: "#fff",
    flex: 1,
    marginBottom: 20,
    marginTop: window.height / 60,
    paddingLeft: 20,
    position: "relative",
  },
  chatbotIcon: {
    height: (window.width * 2) / 4,
    width: (window.width * 2) / 4,
  },
  checkBox: {
    flex: 1,
    paddingBottom: 10,
  },
  close: {
    height: 30,
    marginLeft: 10,
    marginTop: 10,
    width: 30,
  },
  closeBtn: {
    height: 40,
    width: 40,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  contentStyle: {
    backgroundColor: colors.transparent,
    color: colors.tundora,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
    paddingLeft: window.width / 20,
    paddingRight: window.width / 8,
    textAlign: "left",
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  getStart: {
    alignSelf: "center",
    backgroundColor: colors.crimson,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 8,
    width: "100%",
  },
  getStartedTextStyle: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 18.6,
    textAlign: "center",
  },
  headStyle: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 22,
    lineHeight: 25,
    paddingBottom: 11,
    paddingLeft: window.width / 20,
    paddingRight: window.width / 20,
    paddingTop: 11,
  },
  iAccept: { color: colors.nevada, marginBottom: 22 },
  iAcceptText: {
    color: colors.nevada,
  },
  navViewContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 60,
    width: "100%",
  },
  poweredByText: {
    color: colors.doveGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 11,
    lineHeight: 11,
    textAlign: "left",
  },
  sendBtn: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  termsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 17,
  },
  termsWrapper: {
    flex: 0.2,
    justifyContent: "center",
    paddingLeft: 0,
  },
  textLogo: {
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
    width: window.width,
  },
  topContainer: {
    backgroundColor: colors.transparent,
    height: window.height - 25,
    width: window.width,
  },
});

// CHATBOT REPORT PAGE STYLE
export const ChatReportStyle = StyleSheet.create({
  ChatReportDetailHeader: { display: "none" },
  answerStyle: {},
  babylonImage: {
    height: 50,
    marginLeft: 24,
    width: 100,
  },
  bookAppCard: {
    backgroundColor: colors.lightGray,
    flexDirection: "column",
    padding: 15,
  },
  bookAppContentCard: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 30,
  },
  bookAppContentLeftCard: {
    flex: 0.95,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.crimson,
    borderColor: colors.crimson,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    // margin:window.height/61.5,
    marginBottom: 12,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13,
    letterSpacing: 1.07,
    lineHeight: 15,
  },
  causesStyle: {
    padding: 8,
    paddingLeft: 20,
    fontSize: 13.5,
    lineHeight: 15.5,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingBottom: 10,
    paddingRight: 22,
  },
  consultationHead: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 19,
    lineHeight: 21,
    padding: 5,
    paddingBottom: 5,
    paddingRight: 22,
  },
  consultationSubhead: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
    padding: 2,
    paddingBottom: 0,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 10,
  },
  extraCondContainer: { margin: 15, marginRight: 30, marginBottom: 10 },
  extraCondItemContainer: {
    borderLeftColor: colors.nevada,
    borderLeftWidth: 3.5,
    marginTop: 10,
  },
  headerSection: {
    // paddingLeft: 14,
  },
  heading: {
    // color: colors.nevada,
    color: '#515B61',
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 22,
    lineHeight: 25,
    paddingBottom: 20,
    alignSelf: 'center'
  },
  possibleCauses: { borderLeftColor: colors.nevada, borderLeftWidth: 3.5 },
  possibleCondLabelContainer: {
    // borderBottomColor: colors.silver,
    // borderBottomWidth: 0.7,
    flex: 1,
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 10,
  },
  possibleNum: {
    height: 22,
    width: 22,
    backgroundColor: '#ED1B2E',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  potentialCausePadding: { paddingBottom: 10 },
  quesContainer: {
    margin: 15,
    marginTop: 25,
    marginRight: 30,
    marginBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#858585',
    paddingBottom: 16
  },
  questionStyle: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 17,
    paddingBottom: 10,
    paddingRight: 22,
  },
  ratingContainer: { flexDirection: "row", paddingBottom: 20 },
  ratingLabel: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
    padding: 2,
    paddingRight: 0,
    width: 80,
  },
  reportCondContainer: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 10,
  },
  reportDataContainer: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 0.7,
    flexDirection: "row",
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 11,
  },
});

// CHATBOT MESSAGE STYLE
export const ChatBotMessageStyle = StyleSheet.create({
  chatBotMessage: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderLeftWidth: 4.6,
    borderLeftColor: "#ee3d48",
  },
  chatBotMessageContainer: {
    flexDirection: "row",
    margin: 7.5,
    width: (window.width * 3) / 4,
  },
  chatbotIcon: {
    height: 42,
    marginRight: 5,
    width: 42,
  },
  labelStyle: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    lineHeight: 20,
  },
  submitButtonStyle: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.warmGray,
    borderRadius: 8,
    borderWidth: 0.5,
    height: 40,
    justifyContent: "center",
    margin: 10,
    marginBottom: 0,
    marginTop: 20,
  },
  submitButtonText: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
    letterSpacing: 1.07,
    lineHeight: 15,
    padding: 10,
  },
  triangle: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    borderBottomColor: "#ee3d48",
    borderBottomWidth: 5,
    borderLeftColor: "transparent",
    borderLeftWidth: 5,
    borderRightColor: "transparent",
    borderRightWidth: 5,
    borderStyle: "solid",
    height: 0,
    left: 40,
    position: "absolute",
    top: 5,
    width: 0,
    zIndex: 99,
  },
  triangleLeft: {
    transform: [{ rotate: "-90deg" }],
  },
});

// CHATBOT MESSAGE STYLE
export const ChatUserMessageStyle = StyleSheet.create({
  labelStyle: {
    flex: 1,
    flexWrap: "wrap",
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "pru-regular",
    lineHeight: Platform.OS === "ios" ? 24 : 22,
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
  },
  undoButtonStyle: {
    justifyContent: "center",
    marginRight: 10,
  },
  userMessage: {
    backgroundColor: "#ED1B2E",
    lineHeight: 20,
    paddingTop: Platform.OS === "ios" ? 4 : 9,
    paddingBottom: Platform.OS === "ios" ? 4 : 9,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderBottomRightRadius: 5,
    maxWidth: window.width - 120
    // shadowColor: "rgba(52, 58, 64, 0.1)",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0,
    // shadowRadius: 12,
  },
  userMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 7.5,
    flex: 1,
  },
});

export const ChatSuggestionStyle = StyleSheet.create({
  chatDescription: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 16,
    lineHeight: 18,
    padding: 10,
  },
  clearImage: {
    height: 28,
    width: 28,
  },
  container: {
    flex: 1,
  },
  contentCenter: {
    height: 35,
    justifyContent: "center",
    width: 35,
  },
  contentContainer: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  suggestionCard: {},
  suggestionContainer: {
    margin: 20,
    marginTop: 10,
  },
  suggestionDescription: {
    padding: 10,
    paddingBottom: 15,
    fontSize: 14,
    lineHeight: 15,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  suggestionHead: {
    padding: 10,
    paddingTop: 15,
    paddingBottom: 0,
    fontSize: 14,
    lineHeight: 15,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  symptomCard: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 0.5,
  },
  symptomContainer: {
    margin: 20,
  },
  textFlex: {
    flex: 0.95,
  },
  textinput: {
    backgroundColor: colors.white,
    borderColor: colors.warmGray,
    borderRadius: 5,
    borderWidth: 0.3,
    color: colors.doveGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
    textAlign: "center",
  },
});
export const ChatHistoryStyle = StyleSheet.create({
  backButtonImage: {
    height: 28,
    left: 0,
    width: 28,
  },
  backCloseBtnWrapper: {
    alignItems: "flex-start",
    height: 35,
    justifyContent: "flex-start",
    margin: 10,
    width: 35,
  },
  chatHistoryDateLabel: {
    color: "#6b6a6d",
    fontFamily: "PruSansNormal-Demi",
    fontSize: 12,
    lineHeight: 14,
    marginRight: 5,
    textAlign: "center",
  },
  chatHistoryItem: {
    alignItems: "center",
    borderBottomColor: "#707070",
    borderBottomWidth: 0.3,
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  chatHistoryItemContentContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 21,
  },
  chatHistoryItemDateContainer: {
    alignItems: "center",
    backgroundColor: colors.gallery,
    borderColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    height: 60,
    justifyContent: "center",
    width: 60,
  },
  chatHistoryLabel: {
    color: colors.nevada,
    fontSize: 22,
    lineHeight: 25,
    marginBottom: 20,
    marginLeft: 15,
    marginTop: 20,
  },
  chatHistoryMessage: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14,
    lineHeight: 20,
    marginRight: 20,
    paddingRight: 40,
  },
  chatHistoryTime: {
    color: colors.emperor,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 12,
    lineHeight: 14,
    paddingTop: 5,
  },
  close: {
    height: 30,
    margin: 10,
    marginBottom: 20,
    width: 30,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  deleteConfirmBtn: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 12.7,
    letterSpacing: 1.01,
    lineHeight: 14.3,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  deleteConfirmModalContainer: {
    backgroundColor: colors.white,
    borderRadius: 6.7,
    flexDirection: "column",
    padding: 16,
  },
  deleteConfirmationModalBtns: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteConfirmationModalMsg: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 20,
    marginLeft: 16,
    marginRight: 30,
  },
  deleteConfirmationModalMsgUserName: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
    fontWeight: "bold",
    lineHeight: 20,
  },
  deleteConfirmationModalTop: {
    flexDirection: "row",
  },
  phonebookIcon: {
    height: 43.3,
    width: 27.1,
  },
});