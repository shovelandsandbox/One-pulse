import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  arrowRedMarker: {
    marginLeft: 10,
    marginRight: -2,
    marginTop: 5,
    width: 8,
  },

  bottomButtonContainer: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderRadius: 21,
    height: 42,
    justifyContent: "center",
    // marginLeft: 20,
    // marginTop: 10,
    width: "70%",
  },
  flexStyle: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  bottomView: {
    backgroundColor: "#fff",
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: 'center',
    height: 68,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
  },

  bottomViewNext: {
    backgroundColor: "#fff",
    height: 68,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: "center",
  },

  buttonText: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  chatContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
  },

  chatInsertBox: {
    // borderColor: colors.black,
    borderRadius: 4,
    borderWidth: 0,
    // borderWidth: 1,
    height: 32,
    // marginLeft: 10,
    // marginTop: 7,
    width: "70%",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 12,
    paddingVertical: 0,
  },

  chatText: {
    alignItems: "center",
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 15,
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  chatbox: {
    alignItems: "flex-start",
    backgroundColor: colors.whites,
    borderColor: colors.whites,
    justifyContent: "center",
    margin: 0,
    maxWidth: 280,
  },

  crossstyle: {
    height: 22,
    marginLeft: 10,
    width: 22,
  },

  enterButton: {
    height: 32,
    // marginLeft: 10,
    // marginTop: 5,
    width: 32,
    // borderRadius:Platform.OS === "ios" ? 20 : 40
  },
  linestyle: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  middleView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  optionBox: {
    // backgroundColor: colors.whites,
  },
  optionText: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
  redMarker: {
    height: "100%",
    width: 5,
  },

  redMarkerContainer: {
    flexDirection: "row",
    marginLeft: 10,
    overflow: "hidden",
  },

  topView: {
    flex: 1.0,
    justifyContent: "center",
  },

  wrapper: {
    height: height - 55,
  },

  border: {
    width: "100%",
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    paddingBottom: 10,
  },
  profileModalContent: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
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
  modalBackground: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    padding: 0,
    margin: 0
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
  },
  pleaseNoteText: {
    color: "#210000",
    fontSize: 14,
    fontFamily: "Avenir-Heavy",
    lineHeight: 22
  }
});

export default styles;
