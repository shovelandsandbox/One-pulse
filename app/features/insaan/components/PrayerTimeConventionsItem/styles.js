/* eslint-disable */
import { StyleSheet } from "react-native";

export const ConventionItemStyle = StyleSheet.create({
    labelText: {
        width: "100%",
        height: "auto",
        borderColor: "#E9E9EA",
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 15
    },
    container1: {
        width: "100%",
        flex: 1
    },
    label: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 16,
        color: "#515B61",
        textAlign: "left",
        width: "100%",
        height: 22,
    },
    prayerInfo: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 12,
        color: "#515B61",
        textAlign: "left",
        width: "100%",
        height: 21,
        marginTop: 7,
    },
    checkboxActive: {
        width: 25,
        height: 25,
        flexShrink: 0
    },
    checkboxInactive: {
        width: 25,
        height: 25,
        borderRadius: 25,
        tintColor: '#E9E9EA',
        flexShrink: 0
    }
});