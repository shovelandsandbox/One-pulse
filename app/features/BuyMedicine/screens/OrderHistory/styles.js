/* eslint-disable */
import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const styles = StyleSheet.create({
    orderDescriptionContainer: {
        width: "65%"
    },
    orderDescriptionStatusContainer: {
        flexDirection: "row",
        marginBottom: 10.7
    },
    orderItemContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10,
        paddingHorizontal: 20,
    },
    backHandlerText: {
        marginLeft: 10,
        color: Colors.grey525a60,
        fontSize: 16,
    },
    backHandlerContainer: {
        width: "100%",
        height: 64,
        backgroundColor: Colors.white,
        alignItems: "center",
        paddingLeft: 11,
        paddingRight: 11,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    backIcon: {
        width: 185,
        height: 55,
        flexDirection: "row",
        alignItems: "center",
    },
    backIconImage: {
        width: 20,
        height: 20,
        left: 0,
    },
    medicineText: {
        fontFamily: "SegoeUI",
        fontSize: 10,
        lineHeight: 13.3,
        color: Colors.grey858c94,
    },
    orderHistoryHeaderContainer: {
        marginTop: 0,
        flexDirection: "row",
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderBottomStartRadius: 1,
        height: 64,
        alignItems: "center",
    },
    orderIdText: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14,
        color: Colors.grey525a60,
        lineHeight: 17.3,
    },
    ordersTitle: {},
    ordersHeaderContainer: {
        backgroundColor: Colors.greyf2f2f2,
        padding: 10
    },
    orderListContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    rmIdText: {
        fontFamily: "SegoeUI-Bold",
        fontSize: 10,
        lineHeight: 13.3,
        fontWeight: "bold",
        color: "#060606",
    },
    statusView: {
        width: "35%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    statusText: {
        fontFamily: "SegoeUI",
        fontSize: 14,
    },
    noHistoryText: {
        marginTop: 30,
        fontFamily: "SegoeUI",
        lineHeight: 18.3,
        fontSize: 16,
        padding: 10,
    },
    listSeperator: {
        height: 0.5,
        width: "100%",
        backgroundColor: Colors.greyc8c8c8
    }
});


export default styles;
