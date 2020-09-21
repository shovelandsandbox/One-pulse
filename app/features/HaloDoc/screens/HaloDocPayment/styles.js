import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const window = Dimensions.get("window");


export default StyleSheet.create({
    doctorProfession: {
        color: Colors.lightSlateGrey858c94,
        lineHeight: 17.3,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        fontSize: 14,
        marginTop: 5,
        letterSpacing: 1
    },
    doctorName: {
        color: Colors.grey525a60,
        lineHeight: 17.3,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        fontSize: 16,
        textTransform: 'capitalize',
        letterSpacing: 1
    },

    applyTexts: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    payAndConfirmText: {
        color: Colors.black,
        paddingVertical: 10
    },
    payAndConfirmButton: {
        backgroundColor: Colors.whiteSmokef2f2f2,
        borderRadius: 40,
        width: 262,
        height: 20.3,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        marginTop: 16.7
    },
    moreOptionsText: { alignSelf: "flex-start", paddingHorizontal: 5 },
    moreOptionsContainer: {
        flexDirection: "column",
        marginHorizontal: 10,
        marginTop: 16.7,
        paddingHorizontal: 5,
        paddingVertical: 10,
        justifyContent: "space-between",
        backgroundColor: Colors.white,
        elevation: 5
    },
    goPayContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    halloDocWalletContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 10.7,
        paddingHorizontal: 5
    },
    paymentOptionsText: {
        color: Colors.grey525a60,
        fontSize: 12,
        lineHeight: 17.3,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        paddingHorizontal: 5
    },
    ItemViewStyle: {
        flexDirection: "row",
        marginLeft: 13,
        marginRight: 13,
    },
    paymentOptionsContainer: {
        flexDirection: "column",
        backgroundColor: Colors.white,
        marginTop: 16.7,
        marginHorizontal: 10,
        borderRadius: 3.3,
        paddingHorizontal: 5,
        elevation: 5
    },
    CouponDiscountContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    sessionFee: {
        alignSelf: "flex-end",
        color: Colors.lightSlateGrey858c94,
        fontSize: 14,
        lineHeight: 17.3,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
    },
    sessionFeeText: {
        alignSelf: "flex-start",
        color: Colors.lightSlateGrey858c94,
        fontSize: 14,
        lineHeight: 17.3,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    summarySubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    paymentSummaryText: {
        color: Colors.grey525a60,
        lineHeight: 17.3,
        fontSize: 12.3,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        paddingHorizontal: 5
    },
    paymentSummaryContainer: {
        flexDirection: "column",
        backgroundColor: Colors.white,
        marginTop: 16.7,
        marginHorizontal: 10,
        borderRadius: 3.3,
        elevation: 5
    },
    applyButtonText: {
        color: Colors.alizarin,
        textAlign: "center"
    },
    applyButtom: {
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: Colors.aliceBlue,
        paddingHorizontal: 5
    },
    applyPromoCodeContainer: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 16.7,
        borderRadius: 20,
        paddingHorizontal: 5,
        justifyContent: "space-between",
        backgroundColor: Colors.white,
        elevation: 5
    },
    doctorDescription: {
        flexDirection: "column",
        justifyContent: "center",
        marginHorizontal: 10,
        width: "100%",
        flex: 1
    },
    doctorInformation: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        borderRadius: 3.3,
        elevation: 5,
    },
    incompleteProfile: {
        flexDirection: "column",
        backgroundColor: Colors.white,
        borderRadius: 3.3,
        elevation: 5,
        paddingHorizontal: 10
    },
    cardView: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        elevation: 4,
        padding: 15,
        marginVertical: 7,
        marginHorizontal: 10
    },
    docImageStyle: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    cardTitleText: {
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        color: Colors.grey525a60,
        fontSize: 16,
        lineHeight: 17.3,
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    promoCodeText: {
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Colors.greyECECEC,
        borderRadius: 5
    },
    couponTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'uppercase'
    },
    couponDiscountSaveText: {
        color: Colors.green,
        fontSize: 15,
        marginVertical: 5
    },
    flatOffStyle: {
        fontSize: 14,
        color: Colors.gray
    },
    promoCardViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    promoCodeView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    promoCodeText2: {
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 6
    },
    applyText: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    promoCodeErrorText: {
        marginTop: 3,
        fontFamily: "Avenir",
        fontSize: 10,
        lineHeight: 16,
        color: true ? Colors.tahitiGold : Colors.grey515B61
    },
    renderPromoCardView: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    disclaimerText: {
        fontSize: 14,
        color: Colors.green,
        marginHorizontal: 8
    },
    proceedButton: {
        backgroundColor: Colors.red,
        margin: 10,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }


});

