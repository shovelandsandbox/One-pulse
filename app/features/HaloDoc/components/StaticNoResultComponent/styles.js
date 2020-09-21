import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");
const width = window.width;

export default StyleSheet.create({
    searchResultTextStyle: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,
        color: "black"
    },
    mainView: {
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
    },
    icon: {
        height: 60,
        width: 60
    }
});
