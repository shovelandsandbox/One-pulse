import { StyleSheet, Dimensions } from "react-native";

const window = Dimensions.get("window");
const width = window.width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    borderBottomColor: "rgba(200, 200, 200, 0.8)"
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
    color: "#737579",
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
    backgroundColor: "#06CF9B",
    position: 'absolute',
    top: "80%",
    right: 5,
    borderWidth: 2,
    borderColor: "#fff"
  },

  backImageStyle: {
    width: 20,
    height: 15
  },
  headerStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#737579"
  },

  docNameStyle: {
    color: "#34495E",
    fontSize: 17,
    fontWeight: "400",
    maxWidth: width * 0.6,
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
    color: "#34495E",
    marginTop: 10
  },

  touchable: {
    width: 76,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  bottomView: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    marginVertical: 5,
    justifyContent: 'space-between'
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
    color: "rgb(170, 170, 170)",
    fontSize: 13,
    fontWeight: "400",
    maxWidth: width * 0.6,
    marginTop: 2
  },

  bottomText: {
    color: "rgb(170, 170, 170)",
    fontSize: 13,
    fontWeight: "400",
    maxWidth: width * 0.7,
    marginTop: 2,
    color: "#34495E",
    marginLeft: 4
  },

  bottomRpText: {
    color: "rgb(170, 170, 170)",
    fontSize: 15,
    fontWeight: "700",
    color: "#34495E"
  },

  bottomRightImage: {
    height: 12,
    width: 12,
    marginTop: 4,
    marginLeft: 10
  },

  docRpStyle: {
    color: "rgb(170, 170, 170)",
    fontSize: 19,
    fontWeight: "400",
    marginTop: 2,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },

  docRpFreeStyle: {
    color: "rgb(83,86,90)",
    fontSize: 19,
    fontWeight: "600",
    marginTop: 2,
    marginLeft: 10
  },

  docStampStyle: {
    marginLeft: 5,
    color: "rgb(46,229,166)",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 2,
    borderColor: "rgb(46,229,166)",
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
    backgroundColor: "rgb(212, 1, 73)",
    padding: 4,
    borderRadius: 10,
    width: 150,
    alignSelf: "flex-end",
    marginTop: 10
  },

  inactiveChatButtonStyle: {
    backgroundColor: "rgb(240, 240, 240)"
  },

  chatTextStyle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "200",
    alignSelf: "center"
  },

  inactiveChatTextStyle: {
    color: "rgb(162, 162, 162)"
  },

  searchIconStyle: {
    height: 20,
    width: 20
  },

  actionBarRightContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 120
  },
  haloDocImageContainerStyle: {
    width: 76,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -5
  },
  haloDocImageStyle: {
    width: 60,
    height: 30,
  },
  cardViewStyle: {
    margin: 10,
    backgroundColor: "white",
  },

  disabledOverLay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 100
  }
});
