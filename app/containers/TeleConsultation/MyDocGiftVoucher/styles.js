import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    scrollContainer: {

    },
    backContainer: {
        borderBottomWidth: 0.2,
        shadowColor: "#e2e2e2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        backgroundColor: "#fff"
    },
    backgroundImage: { 
        width: '100%',
        height: '100%'
    },
    shareButton: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 60,
    },
    closeButton: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: 10
    },
    giftCloseImage: {
        height: 40,
        width: 40
    }
});

export default styles;