import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const { Colors } = Theme;
const fontFamily = Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold";

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    borderRadius: 100 / 2,
    flex: 1,
    height: 50,
    justifyContent: "center",
    marginRight: 10,
    position: "absolute",
    right: 0,
    top: 0,
    width: 50,
  },
  androidShareIcon: {
    height: 30,
    width: 30,
  },
  broadcastButton: {
    borderRadius: 50,
    height: 50,
    width: 50,
    zIndex: 10,
  },
  broadcastButtonImg: {
    height: 35,
    width: 35,
  },
  broadcastButtonImgView: {
    alignItems: "center",
    borderColor: Colors.white,
    borderRadius: 25.15,
    borderWidth: 1,
    height: 50.3,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: 50.3,
  },
  broadcastButtonView: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  btnBar: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: 60,
    justifyContent: "space-evenly",
    marginBottom: 5,
    width: "89%",
  },
  button: {
    marginTop: 100,
  },
  callButton: {
    alignItems: "center",
    borderRadius: 75,
    height: 75,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    width: 75,
  },
  callContainer: {
    backgroundColor: Colors.black,
    bottom: 0,
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  container: {
    flex: 1,
  },
  controlIcon: {
    height: 60,
    width: 60,
  },
  displayStatus: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  displayStatusText: {
    color: Colors.white,
  },
  fillUpParentView: {
    flex: 1,
  },
  optionButton: {
    alignItems: "center",
    borderRadius: 100 / 2,
    flex: 1,
    height: 50,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    width: 50,
  },
  optionsContainer: {
    alignItems: "center",
    bottom: 0,
    height: 200,
    left: 0,
    position: "absolute",
    right: 0,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
  },
  shareButtonView: {
    borderRadius: 50,
    height: 50,
    marginLeft: 5,
    width: 50,
  },
  topOptionsContainer: {
    alignItems: "center",
    height: 200,
    marginTop: 5,
    position: "absolute",
    right: 0,
    top: 0,
  },
  windowedVideo: {
    flex: 1,
    height: 150,
    left: 10,
    position: "absolute",
    top: 10,
    width: 100,
  },
  backHeaderText: {
    color: "#fff",
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    lineHeight: 16,
  },
  backIcon: { width: 20, height: 20 },
  contentCenter: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerBox: {
    flexDirection: "row",
    height: 54,
    paddingBottom: 14,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: "#ec1c2e",
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "row",
    height: 65,
    paddingLeft: 11,
    paddingRight: 11,
    width: screenWidth,
    // marginBottom:10
  },
  headerLayout: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.2,
    shadowColor: "#e2e2e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  headerSection: {
    flex: 0.5,
    paddingBottom: 3,
    paddingLeft: 14,
    paddingTop: 3,
  },
  heading: { color: "white", fontSize: 17, marginLeft: 10 },
  icons: {
    height: 40,
    width: 40,
  },
  labelBold: {
    color: "white",
  },
  modalButton: {
    padding: 8,
    paddingTop: 15,
    paddingLeft: 0,
    paddingBottom: 15,
    flexDirection: "row",
  },
  modalButtonLabel: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    lineHeight: 14.3,
    paddingTop: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  modalFooterBtn: {
    backgroundColor: "#ec1c2e",
    borderRadius: 10,
    height: 35,
  },
  modalFooterBtnCancel: {
    borderRadius: 10,
    flex: 0.5,
    height: 40,
  },
  modalFooterBtnContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
  modalFooterLabel: {
    fontSize: 13.3,
    lineHeight: 15.3,
    padding: 10,
  },
  modalLabel: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    lineHeight: 17,
    padding: 20,
    paddingLeft: 27,
    paddingRight: 30,
    letterSpacing: 0.5,
  },
  modalStyle: {
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    borderColor: Colors.nevada,
    borderRadius: 7,
    borderWidth: 1,
    height: screenHeight * 0.5,
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.25,
    padding: 10,
    width: screenWidth * 0.9,
  },
  normalText: {
    marginTop: 10,
  },
  permissionsContainer: {
    paddingLeft: 15,
  },
  symptomsModalFooterBtn: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
  whiteText: {
    alignSelf: "center",
    color: "#ffffff",
    justifyContent: "center",
  },
  btnClose: {
    padding: 15,
  },
  icoClose: {
    width: 20,
    height: 20,
  },
  btnLive: {
    backgroundColor: "red",
    borderRadius: 10,
    height: 30,
    margin: 10,
  },
  btnNext: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    paddingHorizontal: 35,
  },
  likesAndCommentsContainer: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "row",
    width: "100%",
    height: 56,
    alignItems: "center",
    paddingHorizontal: 14,
  },
  commentWrapper: {
    borderRadius: 20,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#DEDEDE",
    marginHorizontal: 14,
  },
});
export default styles;
