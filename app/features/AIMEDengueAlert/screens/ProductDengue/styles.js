/* eslint-disable */
import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");
const screenWidth = Dimensions.get('window').width

export const ProductDengueContainerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: 15
  },
  modalStyle: {
    backgroundColor: "rgba(0,0,0,0.7)",
    margin: 0
  },
  genderContainer: {
    flexDirection: "row"
  },
  gender: {
    flex: 1,
    marginRight: 24
  },
  dob: {
    flex: 2
  },
  nricViewContainer: {
    flex: 1,
    paddingRight: 10
  },
  editProfileButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  editProfileButtonText: {
    color: "#ED1B2E",
    fontFamily: "Avenir",
    textDecorationLine: "underline"
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ED1B2E",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 200,
    marginBottom: 30
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Avenir"
  },
  phoneView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneViewText: {
    width: "40%",
    color: "#A7A8AA"
  },
  phoneViewContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  phoneVerifyText: {
    color: colors.crimson
  },
  verifyBtn: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 100,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.crimson,
    position: "relative",
    right: 0,
  },
  country: {
    color: colors.deepGrey,
    height: 32,
    width: window.width - 10
  },
  countryContainer: {
    marginBottom: 10
  },
  datePickerBox: {
    borderBottomWidth: 1,
    borderColor: colors.silver,
    height: 30,
    justifyContent: "center",
    marginBottom: window.height / 34,
    marginTop: 2,
    padding: 0
  },
  datePickerText: {
    borderWidth: 0,
    color: colors.deepGrey,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    marginLeft: 5
  },
  dropDownIcon: {
    position: "absolute",
    right: 10
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
    width: Dimensions.get("window").width - 30
  },
  dropdownStyle: Platform.select({
    ios: {
      width: Dimensions.get("window").width - 35,
      backgroundColor: colors.concrete,
      marginTop: 10,
      marginLeft: -12,
      height: 80
    },
    android: {
      width: Dimensions.get("window").width - 35,
      backgroundColor: colors.concrete,
      marginTop: -15,
      marginLeft: -12,
      height: 80
    }
  }),
  dropdownTextStyle: {
    backgroundColor: colors.concrete,
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 13.3,
    letterSpacing: 0,
    lineHeight: 18.3,
    paddingLeft: 15,
    textAlign: "left"
  },
  errorColor: {
    borderColor: colors.crimson
  },
  nonEditable: {
    color: colors.nevada,
  },
  editable: {
    color: "#000",
  },

  errorDefaultText: {
    color: colors.nevada,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    fontSize: 15,
    lineHeight: 18,
    paddingBottom: 8
  },
  errorText: {
    color: colors.crimson,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 15,
    lineHeight: 18,
    paddingBottom: 8
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  flx_rw: {
    flexDirection: "row"
  },
  formSection: {
    paddingTop: 20
  }
});