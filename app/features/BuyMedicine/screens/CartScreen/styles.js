/* eslint-disable */
import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");
import { Theme } from "../../../../themes";
const { Colors } = Theme;


const styles = StyleSheet.create({
    All: {
        width: window.width,
        height: window.height,
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.white,
    },

    cartBackground: {
        backgroundColor: Colors.whitef4f7fc,
        flex: 1,
        //  margin:10
    },
    cartBackgroundList: {
        backgroundColor: Colors.whitef4f7fc,
    },
    footerView: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: Colors.white,
        position: "absolute",
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
    },
    primary: {
        backgroundColor: Colors.pulseRed,
    },
    btn: {
        borderRadius: 10,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    cardViewStyle: {
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: Colors.white,
    },

    deliveringTo: {
        color: Colors.grey525a60,
    },
    doctorPrescribed: {
        color: Colors.grey525a60,
        marginLeft: 5,
    },
    deliveringOpcity: {
        color: Colors.grey525a60,
        opacity: 0.5,
        marginLeft: 20,
    },
    deliveringToLeft: {
        color: Colors.grey525a60,
        fontSize: 16,
        marginLeft: 10,
    },
    medInStockTrue: {
        flexDirection: "row",
        padding: 5,
        opacity: 0.5
    },
    medInStockFalse: {
        flexDirection: "row",
        padding: 5
    },
    cardTouch: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    medImage: {
        width: 50,
        height: 50,
    },
    medTextView: {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: 5,
    },
    medPrice: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    outOfStockText: {
        color: Colors.redec1c2e,
        marginTop: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    iconsView: {
        flexDirection: "row",
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 20,
        height: 20,
        left: 0
    },
    iconText: {
        paddingHorizontal: 10
    },
    headerView: {
        marginTop: 0,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderBottomStartRadius: 1,
    },
    header: {
        width: "100%",
        height: 64,
        backgroundColor: Colors.white,
        alignItems: "center",
        paddingLeft: 11,
        paddingRight: 11,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerButton: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    back: {
        width: 20,
        height: 20,
        left: 0,
    },
    headerText: {
        marginLeft: 10,
        color: Colors.grey525a60,
        fontSize: 18,
    },
    mainView: {
        flex: 1,
        paddingBottom: 60
    },
    mainView2: {
        flexDirection: "row",
        padding: 5,
        marginLeft: 14,
        marginTop: 10,
    },
    docImage: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        left: 0,
    },
    resetView: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 14,
    },
    resetButton: {
        borderWidth: 2,
        borderColor: Colors.warmGray,
        borderRadius: 20,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: Colors.white,
    },
    resetText: {
        color: Colors.grey525a60
    },
    alertView: {
        height: 60,
        padding: 5,
        margin: 5,
        borderRadius: 1,
    },
    alertText: {
        color: Colors.redec1c2e
    },
    list: {
        width: "100%",
        height: 1,
        backgroundColor: Colors.greyc2c2c2,
    },
    addressView: {
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    notes: {
        height: 60,
        padding: 8,
        margin: 5,
        backgroundColor: Colors.greyf8f8f8,
        borderRadius: 1,
        width: "100%",
        flex: 1,
        fontSize: 12,
    },
    footer: {
        flex: 0.6,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    footerButtonView: {
        flex: 0.4,
        justifyContent: "center",
        marginHorizontal: 20,
    }
});

export default styles;
