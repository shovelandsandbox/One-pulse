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


})
