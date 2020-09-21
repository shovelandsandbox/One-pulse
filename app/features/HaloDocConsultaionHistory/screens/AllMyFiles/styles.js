import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
    All: {
        width: window.width,
        height: window.height,
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.white
    },
    medicalTitle: {
        width: "100%"
    },
    medicalText: {
        height: 30,
        width: "100%",
        color: Colors.grey515B61,
        fontFamily: "Avenir",
        fontSize: 22,
        fontWeight: "900",
        lineHeight: 30,
        marginBottom: 20,
        textAlign: "center"
    },
    date: {
        height: 19,
        width: "100%",
        color: Colors.greyadb5bd,
        fontFamily: "Avenir",
        fontSize: 14,
        fontWeight: "900",
        lineHeight: 19,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10
    },
    listFile: {
        width: "100%",
        marginVertical: 5
    },
    ListFileDetail: {
        height: 100,
        width: 360,
        borderRadius: 10,
        backgroundColor: Colors.ghostWhite,
        alignSelf: "center",
        justifyContent: "center"
    },
    detailFile: {
        flexDirection: "row",
        alignItems: "center"
    },
    bitmap: {
        width: 40,
        height: 40,
        marginRight: 20,
        marginLeft: 10
    },
    fileTitle: {
        width: 250,
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    titleText: {
        width: "100%",
        color: Colors.black222529,
        fontFamily: "Avenir",
        fontSize: 14,
        fontWeight: "900",
        lineHeight: 20
    },
    fileTime: {
        height: 16,
        width: 255,
        color: Colors.pulseDarkGrey,
        fontFamily: "Avenir",
        fontSize: 12,
        lineHeight: 16
    },
    fileType: {
        height: 16,
        width: 255,
        color: Colors.pulseDarkGrey,
        fontFamily: "Avenir",
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 20
    },

    cardViewStyle: {
        margin: 10,
        minWidth: 200,
        alignSelf: "center",
        paddingHorizontal: 30,
        alignItems: "center",
        marginTop: 100
    },

    retryContainer: {
        padding: 20
    },

    retryView: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    videoText: {
        fontSize: 16,
        color: Colors.pulseRed,
        marginLeft: 5
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 0,
    },
    header: {
        width: "100%",
        height: 52,
        backgroundColor: Colors.offwhite,
        alignItems: "center",
        paddingLeft: 11,
        paddingRight: 11,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    backButton: {
        width: 55,
        height: 55,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    backIcon: {
        width: 20,
        height: 20,
        left: 0,
    },
    haloDoc: {
        width: 76,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    haloDocIcon: {
        width: 60,
        height: 30,
    },
    modalMainView: {
        position: "absolute",
        backgroundColor: Colors.white,
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        padding: 0,
        margin: 0,
    },
    modalView: {
        width: 38,
        height: 55,
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        right: 0,
        zIndex: 999,
    },
    closeIcon: {
        width: 28,
        height: 28,
    },
    imageView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    onlineImage: {
        width: 400,
        height: 400,
        marginTop: 50,
        resizeMode: "contain",
    }
});
