/* eslint-disable */
import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const window = Dimensions.get("window");

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
    footerView: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: Colors.white,
        position: "absolute",
        bottom: 0,
        shadowColor: Colors.black,
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
    headerView: {
        backgroundColor: Colors.whitef4f7fc,
        marginHorizontal: 0,
        marginVertical: 4,
    },
    headerText: {
        fontSize: 16,
        color: Colors.grey525a60,
        marginLeft: 13,
        marginTop: 14.3,
        marginBottom: 10.3,
        marginRight: 13,
    },
    itemStyle: {
        marginBottom: 6.7,
        fontSize: 14,
    },
    ItemViewStyle: {
        flexDirection: "row",
        marginLeft: 13,
        marginRight: 13,
    },
    deliveryTextName: {
        fontSize: 16,
        color: Colors.grey525a60,
        paddingBottom: 5,
    },
    deliveryTextAddress: {
        fontSize: 16,
        color: Colors.grey525a60,
    },
    deliveryDetailsView: {
        marginLeft: 13,
        marginRight: 13,
        marginBottom: 10,
        marginTop: 2,
    },
    paddingHorizontal: {
        paddingHorizontal: 5,
    },
    couponViewMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
    },
    couponView: {
        flexDirection: "row",
        alignItems: "center"
    },
    couponText: {
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 6
    },
    couponRemoveText: {
        fontSize: 16,
        color: "red"
    },
    couponTextInputView: {
        flex: 1
    },
    couponTextInput: {
        height: 30,
        padding: 6,
        marginVertical: 14,
        marginHorizontal: 6,
        backgroundColor: Colors.greyf8f8f8,
        borderRadius: 1,
    },
    promoError: {
        fontSize: 13,
        color: "red",
        paddingBottom: 6
    },
    noCoupon: {
        fontSize: 13,
        color: "red",
        paddingBottom: 6
    },
    applyButton: {
        justifyContent: "center",
        marginLeft: 30
    },
    applyText: {
        color: Colors.redec1c2e,
        textAlign: "center"
    },
    container: {
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
    backButton: {
        height: 64,
        alignItems: "center",
        flexDirection: "row",
    },
    backImage: {
        width: 20,
        height: 20,
        left: 0,
    },
    summaryLabel: {
        marginLeft: 10,
        color: Colors.grey525a60,
        fontSize: 18,
    },
    justifyContent: {
        justifyContent: "space-between"
    },
    color: {
        color: Colors.green2ba751
    },
    fontWeight: {
        fontWeight: "bold"
    },
    cardDiscountText: {
        fontSize: 14,
        color: Colors.green,
        marginHorizontal: 8
    },
    deliveryView: {
        flex: 0.6,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    }
});

export default styles;
