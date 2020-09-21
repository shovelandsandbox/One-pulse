/*
 * @Description:
 * @Author: BinBin
 * @Date: 2019-08-13 15:15:31
 * @LastEditors: BinBin
 * @LastEditTime: 2019-08-19 19:09:58
 */
import {
    StyleSheet,
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
        marginBottom: 20,
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
    date: {
        height: 19,
        width: "100%",
        color: "#ADB5BD",
        fontFamily: "Avenir",
        fontSize: 14,
        fontWeight: "900",
        lineHeight: 19,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    listFile: {
        width: "100%",
        marginVertical: 6,
        // height: 300,
    },
    ListFileDetail: {
        height: 80,
        width: 335,
        borderRadius: 10,
        backgroundColor: "#FAFAFB",
        alignSelf: "center",
        justifyContent: "center",
    },
    detailFile: {
        flexDirection: "row",
        alignItems: "center",
    },
    bitmap: {
        width: 40,
        height: 40,
        marginRight: 20,
        marginLeft: 10,
    },
    fileTitle: {
        width: 250,
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    titleText: {
        // height: 20,
        width: "100%",
        color: "#222529",
        fontFamily: "Avenir",
        fontSize: 14,
        fontWeight: "900",
        lineHeight: 20,
    },
    fileTime: {
        height: 16,
        width: 255,
        color: "#68737A",
        fontFamily: "Avenir",
        fontSize: 12,
        lineHeight: 16,
    },
    imgModalContainer: {
        position: "absolute",
        backgroundColor: "#FFF",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        padding: 0,
        margin: 0
    },
    imgModalContent: {
        width: 38,
        height: 55,
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        right: 50,
        zIndex: 999,
    },
    closeButton: {
        width: 38,
        height: 55,
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        right: 10,
        zIndex: 999,
    },

})
