/* eslint-disable */
import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#0006",
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        margin: 0,
    },
    container: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        paddingTop: 16,
        paddingBottom: 7.3,
        width: "100%",
        paddingHorizontal: 5,
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    closeIcon: {
        width: 16,
        height: 16,
    },
    medicineDetailsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    medicineTextContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    medicineName: {
        fontSize: 12,
        lineHeight: 17.3,
    },
    medicineQuantity: {
        paddingTop: 2,
        fontFamily: "SegoeUI",
        fontSize: 10,
        lineHeight: 13.3,
    },
    image: {
        width: 20,
        height: 20,
    },
    button: {
        alignItems: "flex-end",
        height: 40
    },
    containerView: {
        flex: 1,
        marginRight: 17
    }
});

export default styles;
