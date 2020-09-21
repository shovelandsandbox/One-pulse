import { StyleSheet, Platform, Dimensions  } from "react-native";
import { Theme } from "../../../themes";
const { Colors } = Theme;

const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
};

const otpModalHeight = 229.3;
const otpModalWidth = 319;

const fontFamily =
  Platform.OS === "ios"
    ? {
      bold: "PruSansNormal-Demi",
      normal: "PruSansNormal",
    }
    : {
      bold: "pru-bold",
      normal: "pru-regular",
    };

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    scrollContainer: {
        
    },
    backContainer: {
        borderBottomWidth: 1,
        shadowColor: "#e2e2e2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        backgroundColor: "#fff"
    },
    offerContainer: {
        borderBottomWidth: 0.2,
        shadowColor: "#e2e2e2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    tncContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    activateOrIgnoreContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    regnUserContainer: {
        marginVertical: 15,
        marginHorizontal: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey525a60,
        borderRadius: 10
    },
    textAlignCenter: {
        textAlign: "center"
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 18,
    },
    mainContainer: {
        backgroundColor: Colors.white,
        position: "absolute",
        top: (dimensions.fullHeight - otpModalHeight) / 2,
        left: (dimensions.fullWidth - 41.2 - otpModalWidth) / 2,
        height: otpModalHeight,
        width: otpModalWidth,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flex: 1,
      },
      otpHeading: {
        paddingTop: 12.3,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        fontSize: 21.7,
        color: Colors.nevada,
      },
      otpInput: {
        borderBottomWidth: 1,
        borderColor: Colors.white,
        borderBottomColor: Colors.nevada,
        color: Colors.nevada,
        backgroundColor: Colors.white,
        fontSize: 30,
        fontWeight: "700",
        fontFamily: fontFamily.bold,
        marginLeft: 5,
        height: 60,
      },
      otpInputContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      otpInputNotEmpty: {
        backgroundColor: Colors.white,
      },
      resendOTPContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      resendOTPLink: {
        // textAlign: "center",
        fontSize: 14,
        color: Colors.crimson,
        fontFamily: fontFamily.bold,
      },
      cancelOTPContainer: {
        flex: 1,
        position: 'absolute',
        top: 12,
        right: 12,
      },
      cancelOTP: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        lineHeight: 20,
        fontFamily: fontFamily.bold,
      },
      error: {
        color: Colors.crimson,
        fontFamily: fontFamily.normal,
        fontSize: 13.3,
        lineHeight: 18.3,
        textAlign: "left",
        padding: 20,
      },
      errorText: {
        fontSize: 15,
        lineHeight: 18,
        color: Colors.red,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
        paddingBottom: 8,
      },
      errorPadding: {
        paddingTop: 5,
        textAlign: "center",
      },
});

export default styles;