/* eslint-disable */
import { StyleSheet, Platform } from "react-native";

export const ProductBriefingStyle = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1
    },
    backIcon: {
        width: 20,
        height: 15.6,
        marginTop: 14,
        marginLeft: 10
    },
    mainHeading: {
        color: "#515B61",
        fontSize: 18,
        paddingHorizontal: 10,
        paddingTop: 10,
        fontSize: 14,
        fontWeight: '900',
        lineHeight: 16,
        fontFamily: 'Avenir',
        textAlign: 'justify'
    },
    subHeading: {
        color: "#515B61",
        paddingTop: 20,
        paddingHorizontal: 10,
        fontSize: 14,
        fontWeight: '900',
        lineHeight: 16,
        fontFamily: 'Avenir',
        textAlign: 'justify'
    },
    viewContent: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 20,
        fontSize: 14,
        lineHeight: 16,
        color: "#222529",
        fontFamily: 'Avenir',
        flexShrink: 1,
    },
    content: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 20,
        fontSize: 14,
        lineHeight: 16,
        color: "#222529",
        fontFamily: 'Avenir',
    },
    button: {
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#ED1B2E",
        borderRadius: 22,
        height: 44,
        justifyContent: "center",
        width: 200,
        marginBottom: 30
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Avenir',
    },
    imageBackground: {
        height: 240
    },
    imageTileWrapper: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageTile: {
        height: 120,
        width: 140
    },
});