import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get('window').width

export const ResultScreenStyles = StyleSheet.create({
    safeViewTop: {
        backgroundColor: Colors.alizarin,
        flex: 0,
    },

    safeViewBottom: {
        backgroundColor: Colors.white,
        flex: 1,
    },

    mainView: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
    },

    scroll: {
        flexGrow: 1
    },

    babyImgView: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    babyImg: {
        width: screenWidth / 1.5,
        aspectRatio: 1,
    },

    dadMumImgView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 40
    },

    dadMumImgSubView: {
        justifyContent: "center",
        alignItems: "center"
    },

    dadMumImg: {
        width: screenWidth / 5,
        height: screenWidth / 5,
        borderRadius: 10,
        marginHorizontal: 12.5
    },

    dadMumText: {
        color: Colors.charcoal,
        fontSize: 15,
        lineHeight: 19,
        fontFamily: "Avenir",
        fontWeight: "normal",
        fontStyle: "normal",
        marginTop: 5
    },

    btnView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    btnBg: {
        backgroundColor: Colors.alizarin,
        width: screenWidth / 2.4,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        paddingVertical: 10,
    },

    btnText: {
        color: Colors.white,
        fontSize: 15,
        lineHeight: 19,
        fontFamily: "Avenir",
        fontWeight: "bold",
        fontStyle: "normal"
    },

});