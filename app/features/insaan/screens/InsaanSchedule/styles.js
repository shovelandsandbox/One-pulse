/* eslint-disable */
import { StyleSheet } from "react-native";

export const InsaanScheduleStyle = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: 'row'
    },
    backgroundImage: {
        height: 175,
        width: "100%",
        paddingTop: 50
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    date: {
        color: "#ffffff",
        fontFamily: "Avenir",
        fontSize: 30,
        fontWeight: "normal",
    },
    islamDate: {
        color: "#ffffff",
        fontFamily: "Avenir",
        fontSize: 16,
        fontWeight: "normal"
    },
    nextPrayer: {
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#00000090',
        padding: 10,
    },
    nextPrayerText: {
        color: '#ffffff',
        fontSize: 15,
        fontFamily: 'Avenir'
    },
    countdown: {
        color: "#ffffff",
        fontSize: 18,
        textAlign: "center"
    },
    container3: {
        justifyContent: 'flex-end',
        flex: 1
    },
    authority: {
        flexDirection: "row",
        backgroundColor: "#00000050",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 5
    },
    showAuthority: {
        color: "#ffffff",
        fontSize: 13,
        textAlign: 'center'
    },
    icon: {
        height: 20,
        width: 20
    },
    onMute: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    confirmButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopColor: '#a9a9a9',
        borderTopWidth: 0.5
    },
    confirm: {
        color: "#ffffff",
        fontFamily: "Avenir",
        fontSize: 16,
        fontWeight: "300",
        textAlign: 'center',
    },
    muteIcon: {
        height: 16,
        width: 16,
        marginRight: 5,
        tintColor: '#a9a9a9'
    }
});