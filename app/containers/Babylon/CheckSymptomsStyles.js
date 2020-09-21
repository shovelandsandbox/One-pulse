import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");

export const ChatOnboardStyle = StyleSheet.create({
  backButton: {
    height: 15.6,
    marginLeft: 14,
    width: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.crimson,
    borderColor: colors.crimson,
    borderRadius: 22,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    marginBottom: 50,
    marginLeft: 65,
    marginRight: 65,
  },
  buttonText: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 13,
    letterSpacing: 1.07,
    lineHeight: 15,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  contentContainer: {
    // height: window.height-105
    paddingHorizontal: 40,
  },
  country: {
    color: colors.deepGrey,
    height: 32,
    width: window.width - 10,
  },
  countryContainer: {
    marginBottom: 10,
  },
  datePickerBox: {
    borderBottomWidth: 1,
    borderColor: colors.silver,
    height: 30,
    justifyContent: "center",
    marginBottom: window.height / 34,
    marginTop: 2,
    padding: 0,
  },
  datePickerText: {
    borderWidth: 0,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    marginLeft: 5,
  },
  dropDownIcon: {
    position: "absolute",
    right: 10,
  },
  dropbox: {
    alignItems: "center",
    borderColor: colors.silver,
    borderRadius: 6.7,
    borderStyle: "solid",
    borderWidth: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: Dimensions.get("window").width - 30,
  },
  dropdownStyle: Platform.select({
    ios: {
      width: Dimensions.get("window").width - 35,
      backgroundColor: colors.concrete,
      marginTop: 10,
      marginLeft: -12,
      height: 80,
    },
    android: {
      width: Dimensions.get("window").width - 35,
      backgroundColor: colors.concrete,
      marginTop: -15,
      marginLeft: -12,
      height: 80,
    },
  }),
  dropdownTextStyle: {
    backgroundColor: colors.concrete,
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    letterSpacing: 0,
    lineHeight: 18.3,
    paddingLeft: 15,
    textAlign: "left",
  },
  errorColor: {
    borderColor: colors.crimson,
  },
  errorDefaultText: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 18,
    paddingBottom: 8,
  },
  errorText: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    lineHeight: 18,
    paddingBottom: 8,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  flx_rw: {
    flexDirection: "row",
  },
  formSection: {
    paddingLeft: 7,
  },
  genderModalContainer: {
    flex: 1,
    position: "relative",
  },
  genderModalDoneContainer: {
    alignItems: "flex-end",
    backgroundColor: "#FAFAF8",
    height: 44,
    justifyContent: "center",
    paddingRight: 10,
    width: "100%",
  },
  genderModalListContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    bottom: 0,
    height: 260,
    position: "absolute",
    width: "100%",
  },
  headerBackButton: {
    flexShrink: 0,
    height: 36,
    marginLeft: 14,
    marginTop: 20,
    width: 235,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerLogo: {
    alignSelf: "center",
    marginRight: 22,
  },
  headerLogoContainer: {
    flex: 1,
  },
  modalStyle: {
    backgroundColor: "rgba(0,0,0,0.7)",
    margin: 0,
  },
});
