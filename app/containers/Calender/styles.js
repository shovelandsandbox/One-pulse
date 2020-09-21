/* eslint-disable */
import { StyleSheet } from "react-native";
import {
    colors,
    CoreStyles,
} from "@pru-rt-internal/pulse-common";

const styles = StyleSheet.create({
    contain: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        flex: 1,
        // paddingTop: 90,
        alignItems: "center"
    },
    alignWithAbove: {
        marginLeft: 5.1,
    },
    closeImage: {
        height: 28.3,
        width: 28.3,
    },
    closeImageEncloser: {
        alignItems: "flex-start",
        height: 35,
        justifyContent: "flex-start",
        width: 35,
    },
    container: CoreStyles.defaultContainerStyle,
    heading: {
        color: "#565B61",
        fontFamily: CoreStyles.fontFamily.bold,
        fontSize: 22,
        // height: 25,
        // lineHeight: 25,
        marginBottom: 16.7,
        marginLeft: 10.3,
        marginTop: 16.7,
        textAlign: "left",
    },
    radioBtnTop: {
        borderTopColor: colors.silver,
        borderTopWidth: 2,
        marginLeft: 5.1,
        marginTop: 23.7,
    },
    radioButton: {
        borderBottomColor: colors.silver,
        borderBottomWidth: 2,
        height: 55,
        marginLeft: 10.3,
        marginRight: 10.3,
    },
    text: {
        alignSelf: "flex-start",
        color: colors.nevada,
        fontFamily: CoreStyles.fontFamily.normal,
        fontSize: 15.3,
        height: 20,
        justifyContent: "flex-start",
        lineHeight: 18.3,
        marginLeft: 13.3,
        marginVertical: 23.7,
        textAlign: "left",
    },
});

export default styles;
