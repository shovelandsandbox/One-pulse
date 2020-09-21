import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

export default StyleSheet.create({
    checked: {
        height: Dimensions.get('window').height / 6,
        width: Dimensions.get('window').width / 5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#ed1b2c',
        backgroundColor: '#ed1b2c',
    },
    unchecked: {
        height: Dimensions.get('window').height / 6,
        width: Dimensions.get('window').width / 5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        backgroundColor: '#ffffff'
    },
    dayNumberText: {
        fontSize: 24,
        fontWeight: 'normal',
        fontStyle: 'normal',
        marginTop: 15,
        marginLeft: 20
    },
    topchecked: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: "normal",
        marginTop: 5,
        marginLeft: 20
    },
    topunchecked: {
        fontSize: 14,
        color: 'gray',
        fontWeight: "normal",
        marginTop: 5,
        marginLeft: 20
    },

})