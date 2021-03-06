import { StyleSheet } from "react-native";
import {
    colors,
    CoreConfig,
} from "@pru-rt-internal/pulse-common";
const { width } = CoreConfig;
const styles = StyleSheet.create({
    chatBotMessage: {
        alignItems: "center",
        maxWidth: width - 110,
        padding: 10,
        paddingBottom: 15,
        borderBottomLeftRadius: 0,
        borderRadius: 20,
        shadowColor: "#343A40",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        justifyContent: "center",
        borderColor: "rgb(244,244,244)",
        borderWidth: 3,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    chatBotTowMessage: {
        alignItems: "center",
        backgroundColor: colors.white,
        maxWidth: width - 110,
        borderBottomLeftRadius: 0,
        borderRadius: 20,
        shadowColor: "#343A40",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        justifyContent: "center",
        borderColor: "rgb(244,244,244)",
        borderWidth: 3,
    },
    chatBot: {
        alignItems: "center",
        backgroundColor: colors.white,
        maxWidth: width - 110,
        padding: 10,
        paddingBottom: 15,
        borderBottomLeftRadius: 0,
        borderRadius: 20,
        shadowColor: "#343A40",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        width: "70%",
        justifyContent: "center",
        borderColor: "rgb(244,244,244)",
        borderWidth: 3,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    chatBotMessageContainer: {
        flexDirection: "row",
        margin: 7.5,
        width: width,
    },
    chatbotIcon: {
        height: 42,
        marginRight: 5,
        width: 42,
    },
    labelStyle: {
        lineHeight: 22,
        color: '#210000',
        fontSize: 14,
        fontFamily: 'Avenir-Heavy',
    },
    submitButtonStyle: {
        alignItems: "center",
        backgroundColor: "#ED1B2E",
        borderRadius: 6,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 26,
        paddingRight: 26,
        justifyContent: "center",
        marginBottom: 0,
        marginTop: 20,
    },
    submitButtonText: {
        color: colors.white,
        fontFamily: "Avenir-Medium",
        fontSize: 12,
        letterSpacing: 1.07,
        lineHeight: 15,
    },
    triangle: {},
    triangleLeft: {},
});

export default styles;