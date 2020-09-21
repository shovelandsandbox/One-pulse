import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const window = Dimensions.get("window");

export default StyleSheet.create({
    labelStyle: {
        color: Colors.white,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "pru-regular",
        lineHeight: 22,
        fontSize: 16,
        fontWeight: "500",
    },
    textInput: {
        color: Colors.deepGrey,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
        fontSize: 14,
        lineHeight: 15,
    },
    imgBox: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
    },

    ImageStyle:{
        height: 24,
        marginLeft: 5,
        width: 24,
        borderRadius: 12
    },

    undoButtonStyle: {
        justifyContent: "center",
        marginRight: 10,
    },
    userMessage: {
        backgroundColor: Colors.FiordRGB1,
        lineHeight: 20,
        paddingTop: 9,
        paddingBottom: 9,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderBottomRightRadius: 5,
        maxWidth: window.width - 120
    },
    userMessageContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 7.5,
        flex: 1,
    },

});

