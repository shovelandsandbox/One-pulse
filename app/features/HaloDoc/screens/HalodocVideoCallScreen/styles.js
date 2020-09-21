import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.zambeziRGB
  },
  outerView: {
    justifyContent: "center",
    marginTop: 50
  },
  voiceText: {
    fontSize: 17,
    color: Colors.gray
  },
  connectionView: {
    alignSelf: "center",
    marginTop: 10
  },
  connectionText: {
    fontSize: 22,
    color: Colors.white,
    fontFamily: 'Avenir',
    fontWeight: "500",
    lineHeight: 30
  },
  imgView: {
    alignSelf: "center",
    marginTop: 50
  },
  imgStyle: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  buttonsStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 60,
    marginRight: 60,
    marginTop: 100
  },
  docView: {
    marginTop: 15,
    alignItems: "center",
    zIndex: 10
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36
  },
  vdoView: {
    backgroundColor: "red",
    height: 150,
    width: 100,
    alignSelf: "flex-end",
    marginRight: 20,
    borderRadius: 10
  },
  bottomBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center"
  },
  docNameText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "900",
    fontFamily: 'Avenir',
    lineHeight: 30
  },
  connectionStatus: {
    alignItems: "center",
    marginTop: 10,
    zIndex: 10
  },
  remoteView: {
    alignItems: "center",
    position: "absolute",
    height: height,
    width: width
  },
  cancelBtn: {
    padding: 18,
    borderRadius: 32,
    backgroundColor: Colors.torchRedRGB
  },
  touchableButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.spunPearlRGB,
    alignItems: "center",
    justifyContent: "center"
  },
  docName: {
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center"
  },
  docFirstName: {
    fontSize: 25,
    color: Colors.white
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
    borderBottomColor: Colors.veryLightGreyRGB
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
    color: Colors.cello,
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

  cardText: {
    fontSize: 23,
    fontWeight: "400",
    color: Colors.cello,
    marginTop: 10
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
    color: Colors.darkgrayRGB,
    fontSize: 13,
    fontWeight: "400",
    maxWidth: width * 0.6,
    marginTop: 2
  },

  bottomText: {
    color: Colors.darkgrayRGB,
    fontSize: 13,
    fontWeight: "400",
    maxWidth: width * 0.7,
    marginTop: 2,
    color: Colors.cello,
    marginLeft: 4
  },

  bottomRpText: {
    color: Colors.darkgrayRGB,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.cello,
  },

  bottomRightImage: {
    height: 12,
    width: 15,
    marginTop: 4,
    marginLeft: 10
  },

  docRpStyle: {
    color: Colors.darkgrayRGB,
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
    backgroundColor: Colors.RazzmatazzRGB,
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
    margin: 10
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
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Colors.tutu,
    alignSelf: "center"
  },

  videoView: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  videoText: {
    fontSize: 16,
    color: Colors.pulseRed,
    marginLeft: 5
  },
  audioView: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    // marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // borderLeftWidth: 1,
    // borderLeftColor: Colors.pulseRed
  },
  audioText: {
    fontSize: 16,
    color: Colors.pulseRed,
    marginLeft: 5
  },
  haloDoc_camOff: {
    height: 22,
    width: 22
  },
  haloDoc_flipCamera: {
    height: 23,
    width: 25
  },
  haloDoc_Speaker: {
    height: 22,
    width: 26
  },
  renderVideoCallView: {
    width: "100%",
    height: "100%"
  },
  renderVideoCallContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36
  },
  renderVideoCallContainer2:{
    height: 150,
    width: 100,
    alignSelf: "flex-end",
    marginRight: 20,
    borderRadius: 10
  },
  camOff:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    zIndex: 10
  }

});
