import { Dimensions, StyleSheet, Platform } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    agentNameStyle: {
        color: "#ffffff",
        marginLeft: 10,
        fontFamily: "Avenir-Book",
        fontSize: 16,
    },
    agentNameViewStyle: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    bigVideoScreen: {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        right: 0,
        zIndex: 999,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    chatClose: {
        width: 28,
        height: 28,
    },
    chatHeaderText: {
        color: "#000",
        fontSize: 14,
        lineHeight: 16,
        fontFamily: "Avenir-Regular"
    },
    chatMainHeader: {
        flexDirection: 'row',
        height: 50,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    closedownloadstyle: {
        height: 50,
        marginTop: 40,
        justifyContent: "flex-end",
        flexDirection: 'row'
    },
    container: {
        flex: 1,
    },
    customMenuStyle: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    defaultProduct: {
        color: "#414141",
        fontSize: 18,
        marginTop: 2,
        fontFamily: "Avenir-Black",
    },
    dropDownButton: {
        marginTop: 10,
        //fontFamily: Platform.OS === 'ios' ? 'PruSansNormal' : 'pru-regular',
        marginBottom: 5,
        paddingLeft: 5,
        width: "90%",
    },
    dropDownIcon: {
        position: "absolute",
        left: "34%",
        //right: 10,
    },
    dropDownLabel: {
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        fontSize: 13.3,
        lineHeight: 15.3,
        textAlign: "left",
        color: "#a8a8a8",
    },
    dropbox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownStyle: Platform.select({
        ios: {
            width: Dimensions.get("window").width * 0.22,
            backgroundColor: "#f2f2f2",
            marginTop: 10,
            height: 320,
        },
        android: {
            width: Dimensions.get("window").width * 0.22,
            backgroundColor: "#f2f2f2",
            marginTop: -15,
            height: 320,
        },
    }),
    dropdownTextStyle: {
        fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
        fontSize: 13.3,
        lineHeight: 18.3,
        textAlign: "left",
        paddingLeft: 15,
        backgroundColor: "#f2f2f2",
        color: "#6b6a6d",
    },
    giftedCustomStylesBubbleRight: {
        marginLeft: 50,
        marginTop: 5,
        backgroundColor: "#007aff",
    },
    headerContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: "center",
        shadowRadius: 2,
        backgroundColor: "#ec1c2e",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 4,
    },
    icon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        marginRight: 20,
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
        height: 65,
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        right: 80,
        zIndex: 999,
    },
    imgModalContentClose: {
        width: 38,
        height: 65,
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        right: 20,
        zIndex: 999,
    },
    modalView: {
        backgroundColor: "white",
        marginTop: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3.84,
        elevation: 5,
        width: "90%",
        height: 400,
        marginBottom: 45,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    productName: {
        color: "#ec1c2e",
        fontSize: 16,
        marginTop: 3,
        marginLeft: 10,
        fontFamily: "Avenir-Book",
    },
    profile: {
        height: 42,
        width: 42,
        flex: 4,
        overflow: "hidden",
        borderRadius: 42 / 2,
    },
    profileContainer: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        borderWidth: 0.7,
        borderColor: "#FFFFFF",
        marginRight: 8,
    },
    selectedProductStyle: {
        color: "#ec1c2e",
        fontSize: 18,
        marginTop: 2,
        marginLeft: 8,
        fontFamily: "Avenir-Black",
    },
    smallVideoScreen: {
        position: "absolute",
        height: screenHeight * 0.26,
        width: screenWidth * 0.4,
        top: 30,
        bottom: 0,
        left: screenWidth * 0.3,
        zIndex: 999,
        elevation: 5,
        padding: 5,
    },
    spacer: {
        marginLeft: 5,
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        backgroundColor: "#d8d8d8",
    },
    statusText: {
        marginLeft: 10,
        color: "#333333",
        lineHeight: 15,
    },
    textStyle: {
        fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
        fontSize: 13.3,
        lineHeight: 26.7,
        textAlign: "left",
        color: "#6b6a6d",
        width: 120,
    },
    selectedDocStyle: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    selectedDocPress: {
        flexDirection: "row",
        alignItems: "center",
    },
    leftArrow: { width: 10, height: 10, resizeMode: "contain" },
    selectedDocValue: {
        color: "#414141",
        marginLeft: 8,
        fontFamily: "Avenir-Black",
    },
    uploadDocText: { color: "#858c94", fontSize: 18 },
    rednerItemTopView: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#000",
        height: 1,
    },
    renderItemArrowView: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    rightArrow:
        { height: 10, width: 10, resizeMode: "contain" },
    itemTextStyle: {
        fontFamily: "Avenir-Book",
        color: "#555555",
    },
    productClickView: { flexDirection: "row", flex: 1, margin: 10 },
    productBackView: {
        marginTop: 5,
        alignItems: "flex-start",
    }
});
