import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    backCloseBtnWrapper: {
        width: 35,
        height: 35,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    headerContainer: {
        width: window.width,
        height: 52,
        backgroundColor: "#ffffff",
        alignItems: "center",
        paddingLeft: 11,
        paddingRight: 11,
        flexDirection: "row",
    },
    leftIconStyle: { width: 20, height: 20, left: 0 },
    rightIconBtnStyle: { position: "absolute", right: 15 },
    rightIconStyle: { width: 24, height: 24 },
    docLogoContainer: {
        position: "absolute",
        right: 15
    }
});

export default styles;
