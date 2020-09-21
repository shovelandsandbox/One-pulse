import { StyleSheet,Platform } from 'react-native';

const styles = StyleSheet.create({
    label: {
        paddingTop: 6,
        lineHeight: 20,
        fontWeight: "500",
        fontFamily: "Avenir"
    },

    input: {
        marginTop: 6,
        flex: 1,
        padding: 0
    },
    lineStyle: {
        borderWidth: 0.2,
        borderColor: '#8b8b8f',
        marginVertical: 0,
    },
    modalStyle: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#676868",
        borderRadius: 7,
        borderWidth: 1,
        height: 170,
        padding: 10,
    },
    modalLabel: {
        paddingBottom: 5,
    },
    modalButtonContainer: {
        flexDirection: "row",
    },
    modalLeftButton: {
        alignItems: "center",
        flex: 0.45,
        padding: 8,
        paddingTop: 15,
        paddingBottom: 15,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: "#717171",
        borderRadius: 5,
    }, modalButtonLabel: {
        fontSize: 13.3,
        lineHeight: 14.3,
        paddingTop: 10,
        textAlign: "center",
    },
    modalRightButton: {
        alignItems: "center",
        flex: 0.45,
        padding: 8,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: "#717171",
        borderRadius: 5,
    },
})


export default styles;