import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;

export default StyleSheet.create({
    chatBotMessage: {
        alignItems: "center",
        // backgroundColor: Colors.white,
        maxWidth: width - 110,
        // flex: 1,
        padding: 10,
        paddingBottom: 15,
        borderBottomLeftRadius: 0,
        borderRadius: 20,
        shadowColor: Colors.grey343A40,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        // width: "70%",
        // height: 40,
        justifyContent: "center",
        borderColor: Colors.whiteSmokeRGB,
        borderWidth: 3,
        paddingVertical: 12,
        paddingHorizontal: 12
        // borderRadius: 20,
        // borderBottomLeftRadius: 0
        // alignItems: "center",
    },
    chatBotTowMessage: {
        alignItems: "center",
        backgroundColor: Colors.white,
        maxWidth: width - 110,
        borderBottomLeftRadius: 0,
        borderRadius: 20,
        shadowColor: Colors.grey343A40,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        justifyContent: "center",
        borderColor: Colors.whiteSmokeRGB,
        borderWidth: 3
    },
    chatBot: {
        alignItems: "center",
        backgroundColor: Colors.white,
        maxWidth: width - 110,
        // flex: 1,
        padding: 10,
        paddingBottom: 15,
        borderBottomLeftRadius: 0,
        borderRadius: 20,
        shadowColor: Colors.grey343A40,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        width: "70%",
        // height: 40,
        justifyContent: "center",
        borderColor: Colors.whiteSmokeRGB,
        borderWidth: 3,
        paddingVertical: 12,
        paddingHorizontal: 12
        // borderRadius: 20,
        // borderBottomLeftRadius: 0
        // alignItems: "center",
    },
    chatBotMessageContainer: {
        flexDirection: "row",
        margin: 7.5,
        width: width
    },
    chatbotIcon: {
        height: 24,
        marginRight: 5,
        width: 24,
        borderRadius: 10,
    },
    labelStyle: {
        lineHeight: 22,
        color: Colors.sealBrown,
        fontSize: 14,
        fontFamily: "Avenir-Heavy"
    },
    submitButtonStyle: {
        alignItems: "center",
        backgroundColor: Colors.pulseRed,
        // borderColor: Colors.warmGray,
        borderRadius: 6,
        // borderWidth: 0.5,
        // height: 40,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 26,
        paddingRight: 26,
        justifyContent: "center",
        // margin: 10,
        marginBottom: 0,
        marginTop: 20
        // width: 102
    },
    submitButtonText: {
        color: Colors.white,
        fontFamily: "Avenir-Medium",
        fontSize: 12,
        letterSpacing: 1.07,
        lineHeight: 15
    },
    triangle: {},
    triangleLeft: {},
    imageBase: {
        height: 60,
        width: 60,
        resizeMode: "contain"
    },
    View1: {
        alignItems: "center",
        maxWidth: width - 110,
        padding: 10,
        paddingBottom: 15,
        borderBottomLeftRadius: 0,
        borderRadius: 20,
        shadowColor: Colors.grey343A40,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        justifyContent: "center",
        borderColor: Colors.whiteSmokeRGB,
        borderWidth: 3,
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    propsValueText1:{
        lineHeight: 22,
        color: Colors.sealBrown,
        textDecorationLine: "underline",
        fontSize: 14,
        fontFamily: "Avenir-Heavy"
      },
      propsValueText2:{
        lineHeight: 22,
        color: Colors.sealBrown,
        fontSize: 14,
        fontFamily: "Avenir-Heavy"
      }

});
