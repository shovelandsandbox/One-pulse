import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  arrowRedMarker: {
    marginLeft: 10,
    marginRight: -2,
    marginTop: 5,
    width: 8
  },
  emptyConversationTextStyle: {
    color: Colors.grey3a3a3a,
    fontFamily: "Avenir",
    fontSize: 22,
    textAlign: "center",
  },
  bottomButtonContainer: {
    alignItems: "center",
    backgroundColor: Colors.red,
    borderRadius: 21,
    height: 42,
    justifyContent: "center",
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
    borderColor: Colors.gainsboroD9D9D
  },

  bottomViewNext: {
    backgroundColor: Colors.white,
    height: 68,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: Colors.gainsboroD9D9D9,
    justifyContent: "center",
    alignItems: "center"
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
    borderRadius: 4,
    height: 32,
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
    backgroundColor: Colors.offwhite,
    borderColor: Colors.offwhite,
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
    width: 32
  },
  linestyle: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  middleView: {
    backgroundColor: Colors.white
  },
  optionBox: {
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
    borderBottomColor: "#000",
    marginBottom: 10,
    paddingBottom: 10
  },
  profileModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalStyle: {
    backgroundColor: Colors.white,
    alignItems: "center",
    height: 170,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.nevada,
    padding: 10
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
  },
  loadBtn: {
    alignSelf: "center"
  },
  loadText: {
    fontSize: 16,
    color: Colors.pulseRed
  },
  imgBack: {
    width: 20,
    height: 20,
    left: 0
  },
  imgHaloDoc: {
    width: 80,
    height: 24
  },
  viewStyle: {
    width: "100%",
    height: 52,
    alignItems: "center",
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  touchableStyle: {
    width: 55,
    height: 55,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  touchableView: {
    width: 90,
    height: 55,
    alignItems: "center",
    justifyContent: "center"
  },

  retryContainer: {
    padding: 20
  },

  retryView: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  cardViewStyle: {
    margin: 10,
    minWidth: 200,
    alignSelf: "center",
    paddingHorizontal: 30,
    alignItems: "center",
    marginTop: 100
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  modalMainView: {
    position: "absolute",
    backgroundColor: Colors.white,
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    padding: 0,
    margin: 0
  },
  modalView: {
    width: 38,
    height: 55,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    zIndex: 999
  },
  closeIcon: {
    width: 28,
    height: 28
  },
  pdfView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  pdf: {
    height: height,
    width: width,
    backgroundColor: Colors.white
  },
  onlineImage: {
    width: 400,
    height: 400,
    marginTop: 50,
    resizeMode: "contain"
  },
  noConversationText: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  pdfStyle: {
    height: 120,
    width: 120,
    backgroundColor: Colors.white
  },
  chatHistoryView: {
    backgroundColor: Colors.white,
    height: height - 140
  },
  chatHistory: {
    backgroundColor: Colors.white,
    height: height - 55
  }
});

export default styles;
