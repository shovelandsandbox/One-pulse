/* eslint-disable */
import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    mainView: {
        height: 44,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    webviewContainer: {
        height: window.height - 52,
        width: window.width,
        overflow: "hidden",
    },
    closeButton: {
        width: 60,
        padding: 15
    },
    closeImage: {
        flex: 1,
        alignSelf: "center"
    },
});

export default styles;
