
import { StyleSheet, Platform, Dimensions } from "react-native";

const window = Dimensions.get("window");
const width = window.width;

export default StyleSheet.create({
    tileContainerStyle: {
        width: width * 0.35,
        display: "flex",
        height: 150,
        paddingHorizontal: 5,
        paddingVertical: 15,
        alignSelf: "center"
    },

    tileImageStyle: {
        width: 50,
        height: 50
    },
    cardViewStyle: {
        marginTop: 5,
        backgroundColor: "white"
    },

    tileTextStyle: {
        fontSize: 16,
        fontWeight: "900",
        lineHeight: 22,
        marginTop: 10,
        color: "#515B61",
        fontFamily: 'Avenir'
    }
});
