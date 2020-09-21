import { StyleSheet, Platform, Dimensions } from "react-native";

import { Theme } from "../../../../themes";
const { Sizes, Colors } = Theme;
const width = Sizes.fullScreen

const dimensions = {
    fullHeight: Dimensions.get("window").height,
    fullWidth: Dimensions.get("window").width
};

const otpModalHeight = 250;
const otpModalWidth = 319;
const fontFamily =
    Platform.OS === "ios"
        ? {
            bold: "PruSansNormal-Demi",
            normal: "PruSansNormal"
        }
        : {
            bold: "pru-bold",
            normal: "pru-regular"
        };

const styles = StyleSheet.create({

    modalStyle: {
        backgroundColor: "rgba(0,0,0,0.7)",
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    },

    modalContainerStyle: {
        flex: 1,
        position: "relative"
    },

    modalDoneButtonStyle: {
        height: 44,
        justifyContent: "center"
    },

    modalDoneTextStyle: {
        fontSize: 15,
        color: "#007AFF"
    },

    modalDoneButtonContainerStyle: {
        height: 44,
        backgroundColor: "#FAFAF8",
        alignItems: "flex-end",
        width: "100%",
        justifyContent: "center",
        paddingRight: 10
    },

    modalWrapperStyle: {
        height: 260,
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        position: "absolute",
        bottom: 0
    },

});

export default styles;