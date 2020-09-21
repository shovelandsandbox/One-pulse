import { StyleSheet, Platform, Dimensions } from "react-native";
import { CoreConfig, colors } from "@pru-rt-internal/pulse-common";
import { Theme } from "./../../../themes";
const { width, height, iosDevice } = CoreConfig;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  VideoCallPayment: {
    flex: 1,
  },

  VideoCallPaymentabovemiddleView: {
    flex: 2.0,
    justifyContent: "flex-start",
  },

  VideoCallPaymentbacktyle: {
    height: 22,
    marginLeft: 10,
    width: 22,
  },
  VideoCallPaymentbottomView: {
    alignItems: "center",
    flex: 1.5,
    justifyContent: "center",
    marginBottom: 10,
  },

  VideoCallPaymentbottombuttonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  VideoCallPaymentbottombuttonText: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 16,
    fontWeight: "200",
    fontWeight: "bold",
    textAlign: "center",
  },

  VideoCallPaymentlowerbottomButtonContainer: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderColor: colors.red,
    borderRadius: 10,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    width: 160,
  },

  VideoCallPaymentlowersbottomButtonContainer: {
    alignItems: "center",
    backgroundColor: colors.nevada,
    borderColor: colors.nevada,
    borderRadius: 10,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    width: 160,
  },

  VideoCallPaymentmiddleView: {
    alignItems: "center",
    flex: 4.0,
    justifyContent: "flex-start",
  },

  VideoCallPaymentnameText: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },

  VideoCallPaymentnameTexts: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 22,
    marginLeft: 12,
  },

  VideoCallPaymentprice: {
    color: colors.lightwhite,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 16,
    fontWeight: "200",
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
  },

  VideoCallPaymentpriceButton: {
    color: colors.red,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 18,
    fontWeight: "200",
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },

  VideoCallPaymentpriceContainer: {
    alignItems: "center",
    backgroundColor: colors.whites,
    borderColor: colors.nevada,
    borderRadius: 10,
    borderWidth: 1,
    height: 210,
    justifyContent: "center",
    width: 180,
  },

  VideoCallPaymentspaceingbottom: {
    width: 25,
  },
  VideoCallPaymenttermsAndConditionLink: {
    marginTop: 6,
    textDecorationLine: "underline",
  },
  VideoCallPaymenttermtext: {
    marginTop: 6,
  },

  VideoCallPaymenttopView: {
    flex: 1.0,
    justifyContent: "center",
  },

  VideoCallPaymentupdatebottombuttonText: {
    color: colors.whites,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 16,
    fontWeight: "200",
    fontWeight: "bold",
    textAlign: "center",
  },

  VideoCallPaymentupperbottomview: {
    flex: 1.5,
    justifyContent: "center",
  },
  VideoCallPaymentupperbottomviewCheckbox: {
    marginBottom: 15,
  },
  VideoCallPaymentupperbottomviewText: {
    flexDirection: "row",
    fontSize: 18,
    marginLeft: 10,
  },
  VideoCallPaymentvideoText: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 16,
    fontWeight: "200",
    fontWeight: "bold",
    textAlign: "center",
  },
  alergyTextInput: {
    borderColor: colors.nevada,
    borderRadius: 3,
    borderWidth: 1,
    color: colors.nevada,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15.3,
    height: 80,
    lineHeight: 18.3,
    marginBottom: 4,
    paddingLeft: 12,
    textAlignVertical: "top",
  },
  bottomView: {
    backgroundColor: colors.sliver,
    flex: 7.1,
    marginBottom: 10,
  },

  buttonStyle: {
    backgroundColor: colors.white,
    paddingTop: 20,
    justifyContent: "center",
    borderColor: "rgb(244,244,244)",
    borderTopWidth: 1,
  },

  buttonText: {
    color: colors.whites,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  chatText: {
    alignItems: "center",
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 15,
    justifyContent: "center",
  },

  chatbox: {
    alignItems: "center",
    backgroundColor: colors.whites,
    borderColor: colors.whites,
    justifyContent: "center",
    marginTop: 40,
    width: 260,
  },

  crossstyle: {
    height: 22,
    marginLeft: 10,
    width: 22,
  },

  gapView: {
    flex: 0.1,
  },

  inputBox: {
    borderWidth: 1,
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15.3,
    lineHeight: 18.3,
    marginBottom: iosDevice ? 0 : 5,
    marginLeft: 0,
    padding: Platform.OS === "ios" ? 10 : 5,
    width: "100%",
    paddingLeft: 12,
  },

  labelTitle: {
    color: colors.silver,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
    lineHeight: 15.3,
    paddingLeft: 5,
    paddingTop: 12,
  },

  errorMsg: {
    color: colors.red,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
  },

  middleButtonContainer: {
    alignItems: "center",
    backgroundColor: colors.whites,
    borderColor: colors.greyColor,
    borderRadius: 20,
    borderWidth: 1,
    height: 33,
    justifyContent: "center",
    margin: 2,
    width: 110,
  },

  middleView: {
    // alignItems: "center",
    backgroundColor: colors.sliver,
    flex: 1,
    justifyContent: "flex-start",
  },

  middlebuttonText: {
    color: colors.silver,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 12,
    fontWeight: "200",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    left: "10%",
    padding: 15,
    position: "absolute",
    right: "10%",
    top: deviceHeight * 0.2,
    width: "70%",
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

  nameText: {
    alignItems: "center",
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 70,
  },
  nameTexts: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pruSansBold",
    fontSize: 22,
    fontWeight: "bold",
  },
  optionText: {
    color: "#210000",
    fontSize: 12,
    fontFamily: "Avenir-Heavy",
  },
  queryContainer: {
    alignItems: "center",
    borderColor: colors.whites,
    height: 70,
    justifyContent: "center",
    width: 360,
  },
  selectButton: {
    alignItems: "center",
    backgroundColor: colors.lighterRed,
    borderRadius: 13.3,
    height: 26,
    justifyContent: "center",
    padding: 2,
    width: 100,
  },
  selectButtonText: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13.3,
  },
  selectContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  submitButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.crimson,
    borderColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 20,
    width: width - 20,
  },
  topView: {
    backgroundColor: colors.red,
    flex: 1.0,
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },

  userResponseOptionButton: {
    paddingHorizontal: 20,
    backgroundColor: "#F1F3F5",
    borderRadius: 6,
    marginBottom: 10,
    justifyContent: "center",
  },
  userResponseOptionText: {
    color: "#515B61",
    fontSize: 14,
    lineHeight: 38,
    fontFamily: Theme.Fonts.AvenirHeavy,
  },
  emergencyConditionSubTitleText: {
    marginBottom: 10,
    color: "#210000",
    fontSize: 14,
    fontFamily: Theme.Fonts.AvenirHeavy,
  },
  chatUserMessageResponse: {
    fontSize: 14,
    fontFamily: Theme.Fonts.AvenirMedium
  },
  chatBotQuestionaire: {
    marginBottom: 20,
    paddingLeft: 20,
    color: "#515B61",
    fontSize: 14,
    fontFamily: Theme.Fonts.AvenirHeavy,
  },
  userResponseOptionContainer: {
    justifyContent: "center",
    marginHorizontal: 20
  }
});

export default styles;
