import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
    bgImage: { width: 50, height: 50 },
    noCouponContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        height: 150,
    },
    noObjectText: {
        color: "#242424",
        fontFamily: "Avenir-Roman",
        fontSize: 16,
        lineHeight: getLineHeight(16),
    },
    topView: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});
