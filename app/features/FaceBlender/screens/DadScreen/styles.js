import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get('window').width

export const DadScreenStyles = StyleSheet.create({
    safeViewTop: {
        backgroundColor: Colors.alizarin,
        flex: 0,
    },

    safeViewBottom: {
        backgroundColor: Colors.white,
        flex: 1,
    },

    main: {
        backgroundColor: Colors.white,
        padding: 15
    },

    faceimg: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: Colors.white,
        elevation: 10,
        borderRadius: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 30
    },

    camera: {
        width: 30,
        height: 26,
        position: "absolute",
        top: 15,
        right: 15
    },

    selfieIcon: {
        width: 66,
        height: 66,
        borderRadius: 10
    },

    btn: {
        backgroundColor: Colors.alizarin,
        borderRadius: 20,
        width: screenWidth / 2.5,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10
    },

    btntexts: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Avenir",
        lineHeight: 20
    },

    dadText: {
        fontSize: 16,
        color: Colors.pulseDarkGrey,
        textAlign: "center",
        paddingTop: 15,
        paddingBottom: 5,
        fontWeight: "bold",
        fontFamily: "Avenir",
    },

    greatBabyText: {
        fontWeight: "bold",
        fontFamily: "Avenir",
        fontSize: 16,
        color: Colors.text333333
    },

    chooseSelfiesText: {
        fontWeight: "bold",
        fontFamily: "Avenir",
        fontSize: 12,
        color: Colors.color999,
        paddingTop: 10,
        paddingBottom: 20,
        textAlign: "center",
        paddingHorizontal: 20
    }

});
