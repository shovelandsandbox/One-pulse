/*
 * @Description:
 * @Author: BinBin
 * @Date: 2019-08-07 11:38:27
 * @LastEditors: BinBin
 * @LastEditTime: 2019-08-19 14:32:42
 */
import { StyleSheet, Dimensions } from "react-native";
// import colors from "./config";
const window = Dimensions.get("window");
export default StyleSheet.create({
    All: {
        width: window.width,
        height: window.height,
        backgroundColor: "#ffffff"
    },
    imageBackground: {
        width: "100%",
    },
    imageMyDoc: {
        width: 60,
        height: 45,
        backgroundColor: "yellow",
        top: 10,
        left: "80%"
    },
    medical: {
        width: 335,
        height: 132,
        borderRadius: 15,
        top: "15%",
        left: "5%",
        borderWidth: 0,
    },
    functionList: {
        width: "95%",
        height: "70%",
        marginTop: 50,
        left: "2.5%"
    },
    listDetail: {
        flex: 1,
        marginHorizontal: 40,
        flexDirection: "column"
    },
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 0,
        marginBottom: 20,
    },
    header: {
        width: "100%",
        height: 52,
        backgroundColor: "#ffffff",
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
    backImage: {
        width: 20,
        height: 20,
        left: 0,
    },
    haloDocImage: {
        width: 76,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    haloDocIcon: {
        width: 60,
        height: 30,
    },
    medicalImage: {
        width: "100%",
        height: "100%",
        // borderRadius: 115,
    },
    medicalProfileText: {
        height: 25,
        width: 257,
        color: "#FFFFFF",
        fontFamily: "Avenir",
        fontSize: 18,
        fontWeight: "900",
        lineHeight: 25,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 58,
        marginBottom: 8,
    },
    description: {
        height: 60,
        width: 190,
        color: "#FFFFFF",
        fontFamily: "Avenir",
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 20,
        marginLeft: 21,
        marginRight: 124,
        marginBottom: 19,
    }
})
