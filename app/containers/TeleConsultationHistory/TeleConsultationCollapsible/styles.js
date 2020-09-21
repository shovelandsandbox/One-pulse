import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
        marginBottom: 20
    },
    box: {
        marginTop: -10,
        // width: 350
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 15,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    press: {
        width: 350,
        backgroundColor: "#FAFAFB",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        height: 100
    },
    docName: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        marginBottom: 10,
        justifyContent: "space-around",
    },
    docImage: {
        width: 40,
        height: 40,
        backgroundColor: "red",
        borderRadius: 20,
    }, docText: {
        height: 44,
        width: 209,
        color: "#515B61",
        fontFamily: "Avenir",
        fontSize: 16,
        fontWeight: "900",
        lineHeight: 22,
        flexWrap: "wrap",
    },
    chevron: {
        width: 20,
        height: 10,
    },
    funcList: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-around",
        marginLeft: 60,
    },
    funcList1: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    videoIcon: {
        width: 15,
        height: 12,
        marginRight: 5,
    },
    funcList1Text: {
        height: 16,
        width: 52,
        color: "#68737A",
        fontFamily: "Avenir",
        fontSize: 12,
        lineHeight: 16,
    },
    boxDetail: {
        backgroundColor: "#fafafb",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: 350,
        marginTop: -10
    },
    detailArrow: {
        marginLeft: 20,
        marginRight: 20,
    },
    attach: {
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20,
    },
    attachTitle: {
        flexDirection: "row",
        marginTop: 17,
    },
    attachTitleImage: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    attachTitleText: {
        width: 189,
        color: "#515B61",
        fontFamily: "Avenir",
        fontSize: 16,
        fontWeight: "900",
        lineHeight: 22,

    },
    attachList: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    listDetail: {
        width: "33%",
        // height: 60,
        // marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    badge: {
        position: "absolute",
        top: -10,
        left: 16,
        backgroundColor: "red"
    },
    badgeImage: {
        width: 60,
        height: 60,
        // backgroundColor: "#e3e3e3",
        borderRadius: 30,

    },
    caseModalContainer: { paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#000" },
    caseModalContent: { flexDirection: "row", marginBottom: 10, },
    caseModalText: { marginRight: 10, width: 120 },
    closeStyle: {
        flex: 1
    },
    notesText: { fontSize: 13, width: width - 160, textAlign: "left", paddingTop: 2 }
});

export default styles;