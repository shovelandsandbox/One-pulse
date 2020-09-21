import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
import { ClipPath } from "react-native-svg";
const { Colors } = Theme;
const window = Dimensions.get("window");

const { width, height } = Dimensions.get("window");

const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width
};

const modalHeight = 100;
const modalWidth = 319;

const styles = StyleSheet.create({
  mainContainer1: {
    flex: 1,
    backgroundColor: Colors.white
  },
  visibleModalView: {
    position: "absolute",
    backgroundColor: Colors.blackOpacity,
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    padding: 0,
    margin: 0
  },
  modalStyle: {
    backgroundColor: Colors.white,
    alignItems: "center",
    height: 300,
    width: "88%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.nevada,
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  modalView: {
    width: "100%",
    padding: 10,
    marginBottom: 10
  },
  imgStyle: {
    width: 18,
    height: 18
  },
  touchStyle: {
    flexDirection: "row-reverse"
  },
  selectPicStyle: {
    paddingBottom: 20,
    fontSize: 17,
    fontWeight: "500",
    color: Colors.grey515B61,
    fontFamily:
      Platform.OS === "ios" ? "PruSansNormal" : "pru-regular"
  },
  cameraStyle: {
    flexDirection: "row",
    marginTop: 10
  },
  cameraView: {
    flex: 1,
    height: 150,
    width: 150
  },
  onCameraStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: 10,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 10
  },
  cameraPicTouch: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  cameraPic: {
    width: 50,
    height: 50
  },
  cameraText: {
    fontFamily:
      Platform.OS === "ios"
        ? "PruSansNormal"
        : "pru-regular",
    fontSize: 17,
    textAlign: "center",
    paddingTop: 10,
    color: Colors.pulseRed,
    fontWeight: "400"
  },
  galleryContainer: {
    flex: 1,
    height: 150,
    width: 150
  },
  galleryBtn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 10
  },
  galleryView: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  galleryImg: {
    width: 50,
    height: 50
  },
  gallerytext: {
    fontFamily:
      Platform.OS === "ios"
        ? "PruSansNormal"
        : "pru-regular",
    fontSize: 17,
    textAlign: "center",
    paddingTop: 10,
    color: Colors.pulseRed,
    fontWeight: "400"
  },
  documentContainer: {
    position: "absolute",
    backgroundColor: Colors.white,
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    padding: 0,
    margin: 0
  },
  documentView: {
    width: 38,
    height: 55,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    zIndex: 999
  },
  documentImg: {
    width: 28,
    height: 28
  },
  documentView1: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  pdfview: {
    height: height,
    width: width,
    backgroundColor: Colors.white
  },
  pdfImg: {
    width: 400,
    height: 400,
    marginTop: 50,
    resizeMode: "contain"
  },
  permissionListView: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 5,
    paddingHorizontal: 20
  },
  viewStyle: {
    height: 80
  },
  chatContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  chatView: {
    width: "70%",
    borderRadius: 19,
    height: 38,
    backgroundColor: Colors.Gainsboro
  },
  chatText: {
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    color: Colors.white,
    textAlign: "center",
    lineHeight: 38
  },
  chatMsgStyle: {
    fontSize: 14,
    fontFamily: "Avenir-Medium"
  },
  pdfStyle: {
    height: 120,
    width: 120,
    backgroundColor: Colors.white
  },

  arrowRedMarker: {
    marginLeft: 10,
    marginRight: -2,
    marginTop: 5,
    width: 8
  },
  chatContainer1: {
    height: height - 68
  },
  chatMsgStyle: {
    backgroundColor: Colors.white,
    height: height - 200
  },
  questionStyle: {
    backgroundColor: Colors.white,
    height: height - 115
  },

  bottomButtonContainer: {
    alignItems: "center",
    backgroundColor: Colors.red,
    borderRadius: 21,
    height: 42,
    justifyContent: "center",
    // marginLeft: 20,
    // marginTop: 10,
    width: "70%"
  },
  flexStyle: {
    flex: 1,
    backgroundColor: Colors.white
  },
  bottomView: {
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 68,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: Colors.gainsboroD9D9D9
  },

  buttonText: {
    color: Colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },

  chatContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5
  },

  chatInsertBox: {
    // borderColor: Colors.black,
    borderRadius: 4,
    // borderWidth: 1,
    height: 32,
    // marginLeft: 10,
    // marginTop: 7,
    width: "70%",
    backgroundColor: Colors.whiteSmoke,
    paddingHorizontal: 12,
    paddingVertical: 0
  },

  chatText: {
    alignItems: "center",
    color: Colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 15,
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },

  chatbox: {
    alignItems: "flex-start",
    backgroundColor: Colors.whites,
    borderColor: Colors.whites,
    justifyContent: "center",
    margin: 0,
    maxWidth: 280
  },

  crossstyle: {
    height: 22,
    marginLeft: 10,
    width: 22
  },

  enterButton: {
    height: 32,
    // marginLeft: 10,
    // marginTop: 5,
    width: 32
    // borderRadius:Platform.OS === "ios" ? 20 : 40
  },
  linestyle: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  middleView: {
    backgroundColor: Colors.white
  },
  optionBox: {
    // backgroundColor: Colors.whites,
  },
  optionText: {
    color: Colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10
  },
  redMarker: {
    height: "100%",
    width: 5
  },

  redMarkerContainer: {
    flexDirection: "row",
    marginLeft: 10,
    overflow: "hidden"
  },

  topView: {
    flex: 1.0,
    justifyContent: "center"
  },

  wrapper: {
    flex: 1,
    height: height - 55
  },

  border: {
    width: "100%",
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    marginBottom: 10,
    paddingBottom: 10
  },
  profileModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: Colors.redRGB,
  },

  modalLabel: {
    paddingBottom: 5
  },
  modalButtonContainer: {
    flexDirection: "row"
  },
  modalLeftButton: {
    alignItems: "center",
    flex: 0.45,
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: Colors.dimGray717171,
    borderRadius: 5
  },
  modalRightButton: {
    alignItems: "center",
    flex: 0.45,
    padding: 8,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: Colors.dimGray717171,
    borderRadius: 5
  },
  modalButtonLabel: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 14.3,
    textAlign: "center",
    paddingTop: 10
  },
  link: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: Colors.pulseRed
    // backgroundColor: Colors.pulseRed,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  gridViewStyle: {
    marginTop: 20,
    flex: 1,
    display: "flex",
    marginLeft: -(width * 0.025),
    alignSelf: "center"
  },
  tileContainerStyle: {
    display: "flex",
    padding: 10,
    margin: 10,
    zIndex: 1
  },

  tileContainerPart1Style: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: Colors.redRGB
  },

  tileImageStyle: {
    width: width * 0.16,
    height: width * 0.16,
    alignSelf: "center",
    borderRadius: 40
  },

  tileTextStyle: {
    fontSize: 12,
    fontWeight: "200",
    marginTop: 10,
    color: Colors.stormGrey,
    textAlign: "center"
  },

  actionBarStyle: {
    flexDirection: "row",
    height: 54,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 5
  },

  circle: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: Colors.caribbeanGreen,
    position: "absolute",
    top: "67%",
    right: -3,
    borderWidth: 2,
    borderColor: Colors.white
  },

  backImageStyle: {
    width: 20,
    height: 15
  },
  headerStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.stormGrey
  },

  docNameStyle: {
    color:Colors.cello,
    fontSize: 17,
    fontWeight: "400",
    maxWidth: width * 0.7,
    marginTop: 5
  },

  cardImage: {
    height: 50,
    width: 50,
    marginLeft: 5
  },
  cardImage1: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  cardText: {
    fontSize: 23,
    fontWeight: "400",
    color: Colors.cello,
    marginTop: 10
  },

  cardText1: {
    fontSize: 22,
    fontWeight: "400",
    marginTop: 15
  },
  cardText2: {
    fontSize: 16,
    fontWeight: "400"
  },

  touchable: {
    width: 76,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  bottomImage: {
    height: 12,
    width: 15,
    marginTop: 4
  },

  headerStyle1: {
    height: 100,
    width: "100%",
    marginLeft: 20,
    marginTop: 10
  },

  docSpeStyle: {
    color: Colors.gray,
    fontSize: 13,
    fontWeight: "400",
    maxWidth: width * 0.6,
    marginTop: 2
  },

  bottomText: {
    color: Colors.gray,
    fontSize: 13,
    fontWeight: "400",
    maxWidth: width * 0.7,
    marginTop: 2,
    color: Colors.cello,
    marginLeft: 4
  },

  bottomRpText: {
    color: Colors.gray,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.cello
  },

  bottomRightImage: {
    height: 12,
    width: 15,
    marginTop: 4,
    marginLeft: 10
  },

  docRpStyle: {
    color: Colors.gray,
    fontSize: 19,
    fontWeight: "400",
    marginTop: 2,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },

  docRpFreeStyle: {
    color: Colors.brightGrey,
    fontSize: 19,
    fontWeight: "600",
    marginTop: 2,
    marginLeft: 10
  },

  docStampStyle: {
    marginLeft: 5,
    color: Colors.cyanBright,
    fontSize: 15,
    fontWeight: "400",
    marginTop: 2,
    borderColor: Colors.cyanBright,
    borderStyle: "dotted",
    borderWidth: 2,
    borderRadius: 5,
    position: "relative",
    paddingHorizontal: 5,
    paddingTop: 2
  },

  dataContainer: {
    marginLeft: 20
  },

  rowWise: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  bottomBarImageStyle: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  ratingStyle: {
    marginRight: width * 0.1
  },
  bottomContainerStyle: {
    marginTop: 10,
    justifyContent: "space-between"
  },

  chatButtonStyle: {
    backgroundColor: Colors.Tenne,
    padding: 4,
    borderRadius: 10,
    width: 150,
    alignSelf: "flex-end",
    marginTop: 10
  },

  inactiveChatButtonStyle: {
    backgroundColor: Colors.gallery
  },

  chatTextStyle: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "200",
    alignSelf: "center"
  },

  inactiveChatTextStyle: {
    color: Colors.cyan
  },

  searchIconStyle: {
    height: 20,
    width: 20
  },

  actionBarRightContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // width: 120
  },
  haloDocImageContainerStyle: {
    width: 76,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  haloDocImageStyle: {
    width: 60,
    height: 30
  },
  cardViewStyle: {
    margin: 10,
    height: 320,
    alignSelf: "center",
    paddingHorizontal: 30,
    alignItems: "center"
  },

  disabledOverLay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: Colors.whiteOpacity,
    zIndex: 100
  },

  imgContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Colors.tutu,
    alignSelf: "center",
    marginTop: 40,
    position: "absolute",
    bottom: 10
  },

  videoView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 120,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  joinCallView: {
    borderBottomEndRadius: 8,
    width: "100%",
    height: 46,
    borderTopWidth: 1,
    borderTopColor: Colors.greyEEEEEE,
    justifyContent: "center"
  },

  joinCallTextStyle: {
    color: Colors.pulseRed,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },

  videoText: {
    fontSize: 16,
    color: Colors.pulseRed,
    marginLeft: 10
  },
  audioView: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    width: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  audioText: {
    fontSize: 16,
    color: Colors.pulseRed,
    marginLeft: 10
  },

  icons: {
    height: 40,
    width: 40
  },

  modalButtonContainer: {
    flexDirection: "row"
    // paddingLeft: 10,
  },

  contentCenter: {
    justifyContent: "center",
    alignItems: "flex-start"
  },

  modalButtonLabel: {
    flexWrap: "wrap",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    letterSpacing: 0.5,
    lineHeight: 16.7,
    paddingLeft: 10,
    paddingRight: 10
  },

  profileModalContent: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blackOp01
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

  labelBold: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
  },

  modalFooterBtnContainer: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    padding: 15
  },

  modalFooterBtn: {
    flex: 0.5
  },

  modalFooterLabel: {
    fontSize: 13.3,
    lineHeight: 15.3
  },

  textLeft: {
    textAlign: "left"
  },

  textRight: {
    textAlign: "right"
  },
  profileModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: Colors.redRGB",
  },
  modalStyle: {
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    borderColor: Colors.nevada,
    borderRadius: 7,
    borderWidth: 1,
    height: window.height * 0.5,
    padding: 10,
    width: window.width * 0.9
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
  labelBold: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
  },

  modalFooterBtnContainer: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    padding: 15
  },
  modalFooterBtn: {
    flex: 0.5
  },
  modalFooterLabel: {
    fontSize: 13.3,
    lineHeight: 15.3
  },
  cardView1: {
    borderWidth: 10,
    borderColor: Colors.sunDown,
    borderRadius: 70,
    marginTop: 10
  },

  docOnChatContainerStyle: {
    backgroundColor: Colors.azureRGB,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
  },

  docOnChatDashStyle: {
    width: 10,
    height: 1,
    backgroundColor: Colors.lightGreyRGB,
    marginHorizontal: 10
  },

  audioVideoContainerStyle: {
    backgroundColor: Colors.tutu,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10
  },

  audioVideoLineStyle: {
    height: "65%",
    backgroundColor: Colors.pulseRed,
    width: 1
  },

  joinCallContainer: {
    width: width - 110,
    height: 158,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 8,
    alignSelf: "center",
    borderColor: Colors.whiteSmokeRGB,
    borderWidth: 3
  },

  joinCallTimeStyle: {
    color: Colors.grey515B61,
    fontSize: 12
  },

  joinCallDocNameStyle: {
    color: Colors.grey515B61,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  },

  joinCallDocImageStyle: {
    width: "100%",
    height: "100%"
  },

  joinCallContainer1: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },

  joinCallImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10
  },

  chatbotIcon: {
    height: 24,
    marginRight: 5,
    width: 24,
    borderRadius: 12
  },

  mainContainer: {
    backgroundColor: Colors.white,
    position: "absolute",
    top: (dimensions.fullHeight - dimensions.fullHeight / 2) / 2,
    left: (dimensions.fullWidth - 41.2 - modalWidth) / 2,
    width: modalWidth,
    minHeight: modalHeight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1
  },
});

export default styles;
