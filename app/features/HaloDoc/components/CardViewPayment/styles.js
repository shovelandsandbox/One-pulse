import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;

export default StyleSheet.create({
    cardView: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        elevation: 4,
        padding: 15,
        marginVertical: 7,
        marginHorizontal: 10
    },
   
    cardTitleText: {
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        color: "#525a60",
        fontSize: 16,
        lineHeight: 17.3,
        textTransform: 'uppercase',
        letterSpacing: 1
    },
});
