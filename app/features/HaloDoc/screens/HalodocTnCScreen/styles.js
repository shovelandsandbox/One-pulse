import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;

export default StyleSheet.create({
    scroll: {
        backgroundColor: Colors.white,
        width: "100%",
        height: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    firstView: {
        height: 44,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    closeBtn: {
        width: 60, 
        padding: 15
    },
    closeImg: {
        flex: 1, 
        alignSelf: "center"
    },
    headerView: {
        backgroundColor: Colors.white,
        marginBottom: 24
    },
    headerImg: {
        height: sh * 0.357,
        alignSelf: "center",
        resizeMode: "contain"
    },
    tileView: {
        marginHorizontal: 40,
        backgroundColor: Colors.white
    },
    confirmTiletext: {
        alignSelf: "center",
        color: Colors.grey515B61,
        fontFamily: "Avenir",
        fontSize: 22,
        fontWeight: "900",
        textAlign: "center"
    },

    descriptionText: {
        color: Colors.black222529,
        fontFamily: "Avenir",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        marginTop: 15
    },
    iconView: {
        marginTop: 24,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        height: 70
    },
    AIME_STYLE: {
        color: Colors.black222529,
        fontFamily: "Avenir",
        fontSize: 14,
        fontWeight: "300",
        textAlign: "center"
    },
    wheneverView: {
        justifyContent: "center",
        height: 32,
        width: 60,
        lineHeight: 20,
        marginTop: -6
    },
    logoImg: {
        height: 32,
        width: 50,
        resizeMode: "contain",
        alignSelf: "center",
        paddingHorizontal: 8
    },
    termView: {
        paddingHorizontal: 40,
        fontSize: 12,
        fontWeight: "300",
        flexDirection: 'row'
    },
    checkBox: {
        paddingBottom: 10,
    },
    rightText: {
        color: Colors.red
    },
    checkColor: {
        color: Colors.red
    },
    byClickText: {
        color: Colors.grey515B61,
        fontFamily: "Avenir",
        fontSize: 12,
        fontWeight: "300",
        textAlign: "center",
        lineHeight: 20
    },
    tncStyle: {
        color: Colors.grey515B61,
        fontFamily: "Avenir",
        fontSize: 13,
        fontWeight: "300",
        textAlign: "center",
        textDecorationLine: "underline"
    },
    privacyText: {
        color: Colors.grey515B61,
        fontFamily: "Avenir",
        fontSize: 12,
        fontWeight: "300",
        textAlign: "center",
        textDecorationLine: "underline"
    },
    iAgreeBtn: {
        marginTop: 14,
        alignSelf: "center",
        height: 44,
        width: "58.67%",
        borderRadius: 255,
        justifyContent: "center"
    },
    iAgreeText: {
        color: Colors.white,
        fontFamily: "Avenir",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center"
    },
    



});
