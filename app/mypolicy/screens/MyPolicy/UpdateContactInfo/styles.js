import { StyleSheet,Dimensions } from "react-native";
import { Colors } from "../../../configs";

export default StyleSheet.create({
  btn: {
    alignItems: "center",
    borderColor: Colors.main.baseBlack,
    borderRadius: 20,
    borderWidth: 0.5,
    height: 30,
    justifyContent: "center",
    marginRight: 5,
    width: 80,
  },
  btnClose: {
    alignItems: "center",
    borderRadius: 20,
    height: 30,
    justifyContent: "center",
    marginBottom: 20,
    width: 80,
  },
  btnContinue: {
    alignItems: "center",
    borderRadius: 20,
    height: 30,
    justifyContent: "center",
    marginLeft: 5,
    width: 80,
  },
  cancelButtonText: {
    color: Colors.main.darkGray,
    fontSize: 12,
  },
  continueButtonText: {
    fontSize: 12,
  },
  disclaimerContainer: {
    borderColor: Colors.main.borderGray,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 25,
    marginBottom: 20,
    marginTop: 10,
    padding: 15,
    position: "relative",
    backgroundColor: '#F9F9F9'
  },
  disclaimerText: {
    color: Colors.main.inactiveGray,
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 20,
    fontFamily: 'Avenir-Roman'
  },
  disclaimerTextContainer: {
    alignContent: "stretch",
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
  },
  disclaimerWarningText: {
    color: '#836A27',
    fontSize: 12,
    letterSpacing: 0,
    // lineHeight: 20,
    fontFamily: 'Avenir-Heavy'
  },
  failureIcon: {
    borderRadius: 60,
    color: Colors.main.errorRed,
    height: 120,
    width: 120,
  },
  headerText: {
    color: Colors.main.darkGray,
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: "center",
  },
  modalStyle: {
    margin: 0,
    padding: 0,
  },
  otpButtonView: {
    flexDirection: "row",
    width: "100%",
  },
  otpMarginTop: {
    justifyContent: "center",
    width: "85%",
  },
  otpMessageText: {
    color: Colors.main.darkGray,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: "center",
  },
  otpModalView: {
    alignItems: "center",
    backgroundColor: Colors.main.baseWhite,
    borderRadius: 10,
    flexDirection: "column",
    height: 300,
    justifyContent: "space-around",
    margin: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  otpNotReceivedText: {
    color: Colors.main.darkGray,
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: "center",
  },
  otpStyle: {
    height: 50,
    width: "85%",
  },
  primary: {
    backgroundColor: Colors.main.baseRed,
    color: Colors.main.baseWhite,
  },
  primaryCancel: {
    backgroundColor: Colors.main.baseWhite,
    color: Colors.main.baseBlack,
  },
  primaryText: {
    color: Colors.main.darkGray,
  },
  resendTextStyle: {
    color: Colors.main.baseRed,
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 16,
  },
  successModalContainer: {
    alignItems: "center",
    backgroundColor: Colors.main.transparentBlack,
    flex: 1,
    justifyContent: "center",
  },
  successModalIcon: {
    height: 40,
    width: 40,
  },
  successModalMargin: { marginTop: 20 },
  successModalMsg: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    width: "85%",
  },
  successModalText: {
    color: Colors.main.darkGray,
    textAlign: "center",
  },
  successModalView: {
    alignItems: "center",
    backgroundColor: Colors.main.baseWhite,
    borderRadius: 10,
    flexDirection: "column",
    height: 200,
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 20,
    width: "85%",
  },
  title: {
    marginBottom: 40,
  },
  underlineStyleBase: {
    borderBottomWidth: 1,
    borderWidth: 0,
    color: Colors.main.baseRed,
    height: 45,
    width: 30,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.main.baseBlack,
    borderRadius: 1,
  },
  titleText: {
    textAlign: 'left',
    color: '#2F2F2F',
    fontSize: 16,
    fontFamily: 'Avenir-Black',
    fontWeight: 'bold',
    letterSpacing: .3
  },
  titleTextContainer: {
    paddingHorizontal: 17,
    paddingBottom: 17
  },
  disclaimerContainerIcon: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  updateContactInfoContainer: {

    width: Dimensions.get("window").width,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
  },
  leftHeaderContent: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  },
  headerBody: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  titleStyle: {
    marginLeft: 10,
    fontFamily: "Avenir-Heavy",
    fontSize: 14,
    fontWeight: "bold",
  },
  disclaimerView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: '#F7F9FB',
    width: '100%'
  },
  safeAreaContainer:{ flex: 1, 
    backgroundColor: '#F7F9FB'
   },
   welcomeWraper: {
    width: Dimensions.get("window").width,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
  },
});
