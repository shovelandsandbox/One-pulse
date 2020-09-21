import { StyleSheet, Dimensions, Platform } from "react-native";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { colors, width, iosDevice } = CoreConfig;

const window = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  backIcn: {
    width: 20,
    height: 19.7,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 21.7,
    lineHeight: 25,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    alignSelf: "flex-start",
    color: colors.nevada,
  },
  userView: {
    alignItems: "center",
    padding: 10,
  },
  userPic: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  username: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18.3,
    lineHeight: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: colors.nevada,
  },
  labelTitle: {
    fontSize: 13.3,
    lineHeight: 15.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    color: colors.silver,
    paddingTop: 12,
    paddingLeft: 5,
  },
  inputBox: {
    marginBottom: iosDevice ? 0 : 5,
    fontSize: 13.3,
    lineHeight: 16.7,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: colors.nevada,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.silver,
    padding: Platform.OS === "ios" ? 10 : 5,
    paddingLeft: 0,
    marginLeft: 0,
  },
  flx_rw: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  genderView: {
    width: 91.3,
    height: 26.7,
    borderColor: colors.silver,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  gender: {
    fontSize: 10.7,
    lineHeight: 18.3,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  countryCode: {
    fontSize: 13.3,
    lineHeight: 16.7,
    padding: 5,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    marginRight: 10,
    color: colors.nevada,
  },
  phoneDetail: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.silver,
    alignItems: "center",
    marginBottom: 5,
  },
  userDetailView: {
    marginBottom: 20,
    paddingBottom: 30,
  },
  errorText: {
    fontSize: 15,
    lineHeight: 18,
    color: "#ed1b2e",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    paddingBottom: 8,
  },
  picker: {
    borderBottomColor: colors.silver,
    borderBottomWidth: 1,
  },
  countryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#a8a8a8",
  },
  country: {
    width: width - 10,
    height: 32,
    color: "#6b6a6d",
  },
  save: {
    width: "100%",
    height: 40,
    backgroundColor: colors.crimson,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  saveText: {
    color: colors.white,
    marginTop: 2,
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  datePickerText: {
    fontSize: 13.3,
    lineHeight: 16.7,
    borderWidth: 0,
    color: "#6b6a6d",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    paddingLeft: 5,
  },
  datePickerBox: {
    marginTop: 2,
    borderColor: "#a8a8a8",
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingRight: 5,
    justifyContent: "center",
  },
  errorBorderColor: {
    borderColor: "#ed1b2e",
  },
  errorLabelColor: {
    color: "#ed1b2e",
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
  button: {
    alignItems: "center",
    backgroundColor: "#ed1b2e",
    borderColor: "#ed1b2e",
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    margin: 15,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 13,
    lineHeight: 15,
    color: "#ffffff",
    letterSpacing: 1.07,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  loaderContainer: {
    flex: 1,
  },
  loader: {
    width: window.width,
    height: window.height,
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "#404040",
    zIndex: 9,
  },
  dropDownButton: {
    marginTop: 10,
    //fontFamily: Platform.OS === 'ios' ? 'PruSansNormal' : 'pru-regular',
    marginBottom: 5,
    width: Dimensions.get("window").width * 0.9,
    paddingLeft: 5,
  },
  dropDownIcon: {
    position: "absolute",
    right: 10,
  },
  textStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 26.7,
    letterSpacing: 0,
    textAlign: "left",
    color: "#68737a",
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
  relationDropdownStyle: Platform.select({
    ios: {
      width: Dimensions.get("window").width * 0.9,
      backgroundColor: "#f2f2f2",
      marginTop: 10,
      height: 320,
    },
    android: {
      width: Dimensions.get("window").width * 0.9,
      backgroundColor: "#f2f2f2",
      marginTop: -15,
      height: 320,
    },
  }),
  dropDownLabel: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
    lineHeight: 15.3,
    letterSpacing: 0,
    textAlign: "left",
    color: "#a8a8a8",
  },
  dropdownTextStyle: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 18.3,
    letterSpacing: 0,
    textAlign: "left",
    paddingLeft: 15,
    backgroundColor: "#f2f2f2",
    color: "#68737a",
  },
  dropbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loaderProfile: {
    width: window.width,
    height: window.height,
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "#404040",
    zIndex: 9,
  },
  profileModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  relationDetail: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.silver,
    marginBottom: 5,
  },
  pickerStyle: {
    height: 30,
    width: "100%",
    zIndex: 99,
    padding: 0,
    margin: 0,
    color: "#6b6a6d",
  },
  pickerItemStyle: {
    padding: 10,
    margin: 10,
    fontSize: 13.3,
    lineHeight: 15,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: "#6b6a6d",
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  noBorderBottom: {
    borderBottomWidth: 0,
  },
  noUserPic: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  addressCheckboxLabel: {
    fontSize: 13.3,
    lineHeight: 20,
    fontFamily: Platform.OS == "ios" ? "PruSansNormal-Demi" : "pruBold",
    color: colors.silver,
    paddingLeft: 5,
    paddingTop: 2,
  },
  checkboxContainer: {
    justifyContent: "center",
    paddingTop: 10,
  },
});


// CHAT HOME STYLE
export const ChatHomeStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 16
  },
  bottomPart: {
    paddingTop: 20,
    paddingBottom: 36,
    paddingHorizontal: 24,
    backgroundColor: '#fff'
  },
  heading: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 22,
    color: '#515B61',
    marginBottom: 8
  },
  desc: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 12,
    color: '#899AA4',
    marginBottom: 22
  },
  searchBox: {
    flexDirection: 'row',
    alignItems:"center"
  },
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
    color: '#DADADA',
    fontFamily: Platform.OS === "ios" ? "Avenir-Heavy" : "pru-regular",
    lineHeight: Platform.OS === "ios" ? 25 : 15,
  },
  topContainer: {
    backgroundColor: colors.transparent,
    height: window.height / 2 - 50,
    width: window.width,
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

// Suggestion Style
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
    backgroundColor: '#fff',
  },
  queryHeading: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 22,
    color: '#515B61',
  },
  queryDesc: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 12,
    color: '#899AA4',
  },
  contentCenter: {
    height: 35,
    justifyContent: "center",
    width: 35,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems:"center"
  },
  suggestionCard: {},
  suggestionContainer: {
    margin: 20,
    marginTop: 10,
  },
  suggestionDescription: {
    paddingBottom: 15,
    fontSize: 14,
    lineHeight: 15,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  },
  suggestionHead: {
    paddingTop: 15,
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

  },
  textFlex: {
    flex: 0.95,
  },
  textinput: {
    backgroundColor: colors.white,
    // borderColor: colors.warmGray,
    // borderRadius: 5,
    // borderWidth: 0.3,
    color: '#434E54',
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    paddingBottom: 10
  },
});

// CHAT CONVERSATION STYLE
export const ChatConversationStyle = StyleSheet.create({
  btn: {
    borderColor: "#707070",
    borderWidth: 0.7,
    height: 30,
    marginRight: 20,
  },
  container: {
    // backgroundColor: colors.lightGray,
    backgroundColor: '#fff',
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
    marginHorizontal: 10,
    marginVertical: 5,
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
    lineHeight: 24,
  },
  submitButtonStyle: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.warmGray,
    borderRadius: 8,
    borderWidth: 0.5,
    // height: 40,
    paddingVertical: 5,
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
  submitLabelStyle: {
    color: "#4E4E4E",
    fontFamily:
      Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14,
    lineHeight: 15
  }
});

// ChatHeader STYLE
export const ChatHeader = StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    height: 54,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    alignItems: 'flex-end',
    paddingBottom: 14,
    paddingHorizontal: 20
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
    // color: colors.deepGrey,
    color: '#222529',
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
    paddingTop: 16,
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
    marginTop: 25,
    marginBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#858585',
    paddingBottom: 16
  },
  questionStyle: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 22,
    paddingBottom: 10,
    paddingRight: 5,
    width: 200
  },
  ratingContainer: { flexDirection: "row", paddingBottom: 20 },
  ratingLabel: {
    // color: colors.deepGrey,
    color: '#222529',
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
    padding: 2,
    paddingRight: 0,
    width: 80,
  },
  reportCondContainer: {
    // marginBottom: 15,
  },
  reportDataContainer: {
    paddingBottom: 22,
    paddingTop: 20,
    marginTop: 11,
    marginLeft: 14,
    marginRight: 18
  },
  itemLine: {
    flexDirection: "row",
    justifyContent: 'space-between',
    borderBottomColor: '#979797',
    borderBottomWidth: 1,
    paddingBottom: 7,
    marginBottom: 17
  }
});

// CHATBOT MESSAGE STYLE
export const ChatUserMessageStyle = StyleSheet.create({
  labelStyle: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "pru-regular",
    lineHeight: 22,
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
    paddingTop: 9,
    paddingBottom: 9,
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


// CHATBOT REPORT_detail PAGE STYLE
export const ChatReportDetailStyle = StyleSheet.create({
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
    // color: colors.deepGrey,
    color: '#222529',
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
    paddingTop: 16,
    paddingHorizontal: 24
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
    marginTop: 25,
    marginBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#858585',
    paddingBottom: 16
  },
  questionStyle: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 22,
    paddingBottom: 10,
    paddingRight: 5,
    width: 200
  },
  ratingContainer: { flexDirection: "row", paddingBottom: 20 },
  ratingLabel: {
    // color: colors.deepGrey,
    color: '#222529',
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
    padding: 2,
    paddingRight: 0,
    width: 80,
  },
  reportCondContainer: {
    // marginBottom: 15,
  },
  reportDataContainer: {
    paddingBottom: 22,
    paddingTop: 20,
    marginTop: 11,
    marginLeft: 14,
    marginRight: 18
  },
  itemLine: {
    flexDirection: "row",
    justifyContent: 'space-between',
    borderBottomColor: '#979797',
    borderBottomWidth: 1,
    paddingBottom: 7,
    marginBottom: 17
  }
});

// CHAT_HISTORY_style
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
    // height: 60,
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