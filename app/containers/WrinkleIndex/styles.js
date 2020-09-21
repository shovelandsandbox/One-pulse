import { StyleSheet, Platform } from "react-native";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { height, width } = CoreConfig;
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        alignItems: "flex-start",
        flex: 1
    },
    shareButtonStyle: {
        flexDirection: "row",
        height: 35,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.hkShade,
        width: 200,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    viewMoreTipsButton: {
        flexDirection: "row",
        height: 35,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.hkShade,
        width: 200,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    vieMoreTipsText: {
        color: Colors.white,
        fontSize: 17
    },
    avatarContainer: {
        flex: 3,
        width: "80%",
        backgroundColor: Colors.white,
        elevation: 10,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        alignItems: "center",
        justifyContent: "center"
    },
    infoText: {
        fontSize: 17,
        textAlign: "left",
        margin: 20,
        paddingLeft: 30,
        paddingRight: 10,
        fontFamily: Fonts.AvenirRoman
    },
    infoTextContainer: {
        flex: 2,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    wrinkleIndexText: {
        color: Colors.green,
        fontSize: 18,
        fontFamily: Fonts.AvenirRoman
    }
});
