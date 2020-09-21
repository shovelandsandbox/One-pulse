/* eslint-disable */
import { StyleSheet} from "react-native";

export const ZoneItemStyle = StyleSheet.create({
    container1: {
        width: "100%",
        height: 77,
        borderBottomColor: "#E9E9EA",
        borderBottomWidth: 1,
    },
    container2: {
        height: 77,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    labelText: {
        width: 235,
        justifyContent: "center",
        fontFamily: "Avenir-Heavy",
        fontSize: 16,
        color: "#515B61",
        textAlign: "left",
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