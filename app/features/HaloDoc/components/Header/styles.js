import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");
const width = window.width;

export default StyleSheet.create({

    headerStyle1: {
        height: 100,
        width: "100%",
        marginLeft: 20,
        marginTop: 10
    },

    cardImage: {
        height: 50,
        width: 50,
        marginLeft: 5
    },
    cardText: {
        fontSize: 23,
        fontWeight: "400",
        color: "#34495E",
        marginTop: 10
    },

});
