import { StyleSheet, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors, Sizes, Fonts } = Theme;


export default loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emailRegister: {
    marginBottom: 10
  },
  subContainers: {
    flex: 1,
    paddingHorizontal: 20
  },
  subContainer3: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 40
  },
  subContainer4: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "red"
  },
  subContainer2: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  subContainer1: {
    paddingTop: 20,

    height: 240,
    alignItems: "center"
  },
  orDivider: {
    ...Platform.select({
      android: {
        marginTop: 0
      }
    }),
    margin: 100,
    marginTop: 10,
    marginBottom: 10
  },
  brandImage: {
    flex: 3,
    alignSelf: "flex-start",
    width: Sizes.fullScreen / 3,
    height: Sizes.fullScreen / 3
  },
  emailRegisterText: {
    fontSize: 13.3,
    lineHeight: 15.6,
    letterSpacing: 1.01,
    fontFamily: Fonts.fontFamilyRegular,
  },
  forgotPassword: {
    marginTop: Platform.OS === "ios" ? 0 : 10,
    marginBottom: 20,
    width: 100
  },
  forgotPasswordText: {
    fontSize: 16,
    fontFamily: Fonts.fontFamilyRegular,
    color: Colors.pulseRed,
    textAlign: "left"
  },
  errorText: {
    fontSize: 15,
    lineHeight: 18,
    color: Colors.pulseRed,
    fontFamily: Fonts.fontFamilyRegular,
    paddingBottom: 8
  },
  errorPadding: {
    paddingTop: 10
  },
  headerButton: {
    justifyContent: "center",
    marginLeft: Platform.OS == "ios" ? 2 : 2
  },
  loginLableTextStyle: {
    color: Colors.white,
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 28,
  },
  headerButtonText: {
    fontFamily: Fonts.fontFamilyBold,
    fontSize: 13.3,
    lineHeight: 15.6,
    letterSpacing: 1.01,
    textAlign: "left",
    color: Colors.pulseDarkGrey
    //justifyContent:'center',
  },
  screenSwitch: {
    flexDirection: "row",
    alignItems: "center"
  },
  registerContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
    left: 20,
    right: 20
  },
  newText: {
    fontFamily: Fonts.fontFamilyRegular,
    fontSize: 13.3,
    lineHeight: 15.6,
    letterSpacing: 1.01,
    textAlign: "left",
    color: Colors.grey707070,
    justifyContent: "center"
  },
  fingerprintContainer: {
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  fingerPrintModalWraper: {
    backgroundColor: Colors.modalBackground,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  fingerPrintModalInner: {
    width: 325,
    height: 407,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 29,
    paddingVertical: 30,
    alignItems: "center"
  },
  fingerSingIn: {
    fontSize: 22,
    color: Colors.grey515B61,
    fontWeight: "900",
    textAlign: "center"
  },
  fingerDesc: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.black222529,
    marginTop: 10,
    marginBottom: 32
  },
  fingerConfirm: {
    fontSize: 16,
    color: Colors.black222529,
    fontWeight: "900",
    marginTop: 32
  },
  fingerCancel: {
    color: Colors.pulseRed,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 36
  },
  singInBtn: {
    height: 44,
    width: 180,
    borderRadius: 22,
    backgroundColor: Colors.pulseRed
  },
  goRegisterBtn: {
    backgroundColor: Colors.white,
    height: 44,
    width: 296,
    borderRadius: 22,
    borderColor: Colors.pulseRed,
    borderWidth: 1,
    borderStyle: "solid"
  },
  goRegisterBtnText: {
    color: Colors.pulseRed
  },
  languageItem: {
    width: 52,
    height: 36,
    borderBottomWidth: 2,
    borderStyle: "solid"
  },
  languageText: {
    textAlign: "center",
    lineHeight: 36,
    fontSize: 14
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20
  },
  scrollContainer: {
    flex: 1,
    // paddingBottom: 50
  },
  imageContainer: {
    width: Sizes.fullScreen * 0.8,
    height: "100%",
    resizeMode: "contain"
  },
  biometricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10
  }
});
