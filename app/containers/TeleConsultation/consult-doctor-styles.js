import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";
const window = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  counterContainer: {
    alignItems:"flex-end",
    justifyContent: "flex-end",
    width: window.width * 0.75,
  },
  textContainer: {
    textAlign: "right",
  },
  counter: {
    color: colors.silver,
    fontFamily: Platform.OS === 'ios' ? 'PruSansNormal-Demi' : 'pru-bold',
    fontSize: 12.3,
    //textAlign: 'right'
  },
  heading: {
    fontSize: 22,
    lineHeight: 25,
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    //paddingBottom: 22,
    paddingRight: 22,
  },
  timing: {
    color: colors.black,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14,
    fontStyle: "italic",
  },
  appointmentType: {
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14,
  },
  publicHoidayText: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 14,
    fontStyle: "italic",
    paddingBottom: 10,
  },
  closeIcon: {
    alignItems: "flex-start",
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    height: 65,
    paddingLeft: 11,
    paddingRight: 11,
    width: window.width,
    // marginBottom:10
  },
  headerIconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  doclogo: {
    paddingTop: 5,
    /*width: 100,
    height: 60,*/
    width: 50,
    height: 30,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: "center",
    paddingBottom: 2,
    resizeMode: "contain",
  },
  headerSection: {
    flex: 0.5,
    paddingBottom: 3,
    paddingLeft: 14,
    paddingTop: 3,
  },
  consultationSubhead: {
    color: colors.darkGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 15,
    padding: 2,
    paddingBottom: 0,
  },
  titleContainer: {
    flexDirection: "column",
    flex: 0.95,
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    color: colors.darkGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 17,
    paddingBottom: 5,
    paddingRight: 22,
  },
  consultationBtnContainerTop: {
    alignItems: "center",
    marginLeft: 15,
    marginRight: 10,
  },
  consultationBtnContainer: {
    alignItems: "center",
    flex: 1.5,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 10,
    marginTop: 40
  },
  extraCondItemContainer: {
    borderLeftColor: colors.nevada,
    borderLeftWidth: 3.5,
    marginTop: 10,
  },
  consultationDataContainer: {
    backgroundColor: colors.solidGray,
    borderColor: colors.solidGray,
    borderRadius: 5,
    borderWidth: 0.7,
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 5,
  },
  icons: {
    height: 40,
    width: 40,
  },
  access_icons: {
    height: 18,
    marginRight: 3.4,
    width: 18,
  },
  info: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  footerNotes: {
    marginLeft: 10,
    marginRight: 10,
  },
  profileModalContent: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalStyle: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.nevada,
    borderRadius: 7,
    borderWidth: 1,
    height: window.height * 0.5,
    padding: 10,
    width: window.width * 0.90,
  },
  modalButtonContainer: {
    flexDirection: "row",
    // paddingLeft: 10,
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
  modalButton: {
    padding: 8,
    paddingTop: 15,
    paddingLeft: 0,
    paddingBottom: 15,
    flexDirection: "row",
  },
  modalButtonLabel: {
    flexWrap: "wrap",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    letterSpacing: 0.5,
    lineHeight: 16.7,
    paddingLeft: 10,
    paddingRight:10,
  },
  mic: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  labelBold: {
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalFooterBtnContainer: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    padding: 15,
  },
  modalFooterBtn: {
    flex: 0.5,
  },
  symptomsModalFooterBtn: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  modalFooterLabel: {
    fontSize: 13.3,
    lineHeight: 15.3,
  },
  symptomsTextInput: {
    borderColor: colors.nevada,
    borderRadius: 3,
    borderWidth: 1,
    color: colors.nevada,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15.3,
    height: 130,
    lineHeight: 18.3,
    marginBottom: 4,
    textAlignVertical: "top",
  },
  //Button
  btn: {
    alignItems: "center",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    margin: 10,
    width: 160,
  },
  btnTextStyle: {
    color: "#ffffff",
  },
  audioTextStyle: {
    color: "#68737a",
  },
  primary: {
    alignItems: "center",
    backgroundColor: "#68737a",
    height: 40,
    justifyContent: "center",
    margin: 10,
    width: 160,
  },
  default: {
    backgroundColor: "#ed1b2e",
    borderColor: "#ed1b2e",
    borderWidth: 0.7,
  },
  audioStyle: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#a8a8a8",
    borderWidth: 0.7,
    height: 40,
    justifyContent: "center",
    margin: 10,
    width: 160,
  },
  radioButtonTextStyle: {
    color: "#6b6a6d",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    paddingBottom:20,
    textAlign: "left",
  },
  selctedRowStyle: {
    borderColor:"#68737a", 
    borderRadius:10,
    borderWidth:2,
    margin:10,
    padding: 8,
    width: 160
  },
  page0: {
    backgroundColor:"#f2f2f2", 
    opacity:0.6,
    padding: 8,
    width: 160,
  },
  page1: {
    backgroundColor:"#f2f2f2", 
    opacity:0.6,
    padding: 8,
    width: 160,
  },
  //payment options
  topView: {
    flexDirection: "column",
    flex:0.5,
    justifyContent: 'flex-start',
    marginLeft:20,
    marginTop: 40,
  },
  boostImageStyle: {
    height: 50,
    width: 150,
  },
  pricingTextStyle: {
    color:"#a7a7a7",
    fontFamily :Platform.OS === 'ios' ? 'PruSansNormal-Demi' : 'pru-bold', 
    marginBottom: 10,
    textAlign:"center"
  },
  amountStyle: {
    color:"#ed1b2e",
    fontFamily :Platform.OS === 'ios' ? 'PruSansNormal-Demi' : 'pru-bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign:"center"
  },
  descritionStyle: {
    color:"#6b6a6d",
    fontFamily :Platform.OS === 'ios' ? 'PruSansNormal-Demi' : 'pru-bold',
    marginBottom: 10,
    textAlign:"center"
  },
  bottomViewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  paymetOptionbottomView: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
