/*
 * @Description:
 * @Author: BinBin
 * @Date: 2019-08-13 15:13:42
 * @LastEditors: BinBin
 * @LastEditTime: 2019-08-19 10:40:03
 */
import {
    StyleSheet,
    Platform,
    Dimensions
} from "react-native";
const window = Dimensions.get("window");
export default StyleSheet.create({
    All: {
        width: window.width,
        height: window.height,
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff"
    },
    titleImage: {
        width: "100%",
        height: 80,
    },
    imageMyDoc: {
        width: 60,
        height: 45,
        backgroundColor: "yellow",
        top: 10,
        left: "80%"
    },
    medicalTitle: {
        // left: "5%"
        width: "100%"
    },
    medicalText: {
        height: 30,
        width: "100%",
        color: "#515B61",
        fontFamily: "Avenir",
        fontSize: 22,
        fontWeight: "900",
        lineHeight: 30,
        textAlign: "center"
    },
    detail: {
        marginTop: 20,
        width: "80%",
        left: "10%"
    },
    fin: {
        width: "90%",
        left: "5%",
        fontSize: 16,
        fontWeight: "bold"
    },
    nricNum: {
        width: "90%",
        left: "5%",
        marginTop: 10,
    },
    input: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        left: "5%",
        marginTop: 6,
    },
    upload: {
        height: window.height - 350,
        width: "90%"
    },
    uploadTitle: {
        height: 16,
        width: 127,
        left: "10%",
        color: "#515B61",
        fontFamily: "Avenir",
        fontSize: 12,
        fontWeight: "900",
        lineHeight: 16,
    },
    add: {
        textAlign: "center",
        lineHeight: 60,
        fontWeight: "800"
    },
    nricPhoto: {
        padding: 20,
        flex: 1,
        flexDirection: "column",

    },
    nricImage: {
        // borderWidth: 1,
        width: "100%",
        height: 200,
        borderRadius: 15,
    },
    changeBtu: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: 10,
    },
    touchChange: {
        height: 36,
        width: 116,
        borderRadius: 18,
        backgroundColor: "#ffffff",
        top: "10%",
    },
    changeText: {
        textAlign: "center",
        lineHeight: 36,
        color: "#ED1B2E"
    },
    removeText: {
        textAlign: "right",
        top: "50%",
        fontWeight: "700",
    },
    next: {
        width: "100%",
        height: 200,
        flexDirection: "row",
        justifyContent: "center",
    },
    touchNext: {
        width: 215,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#F3F3F3"

    },
    nextText: {
        textAlign: "center",
        lineHeight: 44,
        fontSize: 20,
        color: "#BDBEC0"
    },

    touchNextSuccess: {
        width: 215,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#ED1B2E"

    },
    nextTextSuccess: {
        textAlign: "center",
        lineHeight: 44,
        fontSize: 20,
        color: "#fff"
    },
})
