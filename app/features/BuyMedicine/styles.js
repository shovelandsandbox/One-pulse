/* eslint-disable */
import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");
import { Theme } from "../../themes";
const { Colors } = Theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    backgroundImage: {
        width: "100%",
        height: 140,
    },
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    back: {
        width: 30,
        height: 55,
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: 20,
    },
    backImage: {
        width: 20,
        height: 20,
        left: 0,
    },
    mainContainer: {
        paddingHorizontal: 20,
        marginBottom: 5
    },
    mainContainerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    prescriptionView: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    prescriptionText: {
        color: Colors.grey858c94,
        fontSize: 16,
    },

    prescriptionTextDoc: {
        color: Colors.redec1c2e,
        fontSize: 16,
    },
    noValidView: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    noValidText: {
        color: Colors.grey858c94,
        fontSize: 16,
    },
    noValidTextProfile: {
        color: Colors.redec1c2e,
        fontSize: 16,
    },
    noAddressView: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    noAddressText: {
        color: Colors.grey858c94,
        fontSize: 16,
    },
    noAddressTextProfile: {
        color: Colors.redec1c2e,
        fontSize: 16,
    },
    cardViewStyle: {
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: Colors.white,
    },
    cardViewStyleDoc: {
        minWidth: 200,
        height: 80,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: Colors.white,
    },
    cardViewTouchabelStyle: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10,
    },
    cardViewMainView: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
    },
    cardViewImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        overflow: "hidden",
        marginLeft: 10,
    },
    cardViewTextView: {
        paddingLeft: 10,
        flex: 1
    },
    docName: {
        color: Colors.grey525a60,
        fontSize: 16
    },
    orderProcessingView: {
        backgroundColor: "#000A",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        justifyContent: "center",
        alignItems: "center",
    },
    orderProcessingText: {
        paddingHorizontal: 30,
        paddingTop: 30,
        fontSize: 18,
        color: Colors.white,
        textAlign: "center",
        lineHeight: 24,
    },
    modal: {
        margin: 0,
        justifyContent: "flex-end"
    },
    modalView: {
        backgroundColor: Colors.white,
        padding: 20,
        alignSelf: "flex-end",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    modalText: {
        fontSize: 18,
        textAlign: "center"
    },
    modalButton: {
        backgroundColor: Colors.red,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 6,
        marginTop: 30,
        marginHorizontal: 30,
    },
    modalButtonText: {
        color: Colors.white,
        fontSize: 16,
        textAlign: "center"
    },
    consultationTime: {
        color: Colors.grey525a60,
        opacity: 0.5,
    },
    purchaseheader: {
        color: Colors.white,
        fontSize: 18,
        textAlign: "center",
    },
    cunsultationheading: {
        color: Colors.grey525a60,
        fontSize: 18,
        paddingVertical: 15,
    },
    listOrderHeading: {
        color: Colors.redec1c2e,
        fontSize: 16,
        paddingVertical: 15,
    },
});

export default styles;
