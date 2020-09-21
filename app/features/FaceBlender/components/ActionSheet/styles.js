import { StyleSheet, Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export const ActionSheetStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: Colors.charcoalOpacity
    },

    modalView: {
        backgroundColor: Colors.white,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        alignItems: "center",
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cancelModalView: {
        backgroundColor: Colors.white,
        alignItems: "center",
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 2,
        paddingBottom: (DeviceInfo.hasNotch() && Platform.OS == "ios") ? 15 : 0,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    modalOptionsTextStyle: {
        color: Colors.charcoal,
        fontSize: 20,
        fontWeight: "normal",
        textAlign: "center",
        marginVertical: 10,
    },

    modalCancelTextStyle: {
        color: Colors.charcoal,
        fontSize: 20,
        fontWeight: "normal",
        textAlign: "center",
        marginVertical: 10,
    },

    modalOptionDivider: {
        height: 0.5,
        width: "85%",
        backgroundColor: Colors.greyb5b5b5,
    },

    modalButtonBg: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
});