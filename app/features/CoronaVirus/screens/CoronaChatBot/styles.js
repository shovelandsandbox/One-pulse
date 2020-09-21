/* eslint-disable */
import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");
const width = window.width;
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    webviewContainer: {
        height: window.height - 52,
        width: window.width,
        overflow: "hidden",
    },
    header: {
        height: 44,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    button: {
        width: 60,
        padding: 15
    },
    closeImage: {
        flex: 1,
        alignSelf: "center"
    },
    activityIdicator: {
        alignSelf: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
});

export default styles;
