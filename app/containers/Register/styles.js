/* eslint-disable */
import { StyleSheet } from "react-native";

export default notificationRequestStyles = StyleSheet.create({
  tipMessage: {
    marginTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
    color: "#222529",
    fontFamily: "Avenir",
    fontSize: 12,
    lineHeight: 16,
  },
  tncPrivacyTextStyle: {
    color: "#222529",
    fontFamily: "Avenir",
    fontSize: 12,
    lineHeight: 22,
  },
  tncPrivacyContainer: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tncPrivacyTextSpacing: {paddingRight: 5},
  sendCodeBtnRect: {
    alignSelf: "center",
    marginTop: 24,
    height: 40,
    width: 260,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ED1B2E",
  },
  sendCodeBtnTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 28,
    fontFamily: "Avenir"
  }
});
