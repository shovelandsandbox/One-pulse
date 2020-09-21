import {
    StyleSheet,
    Platform,
    Dimensions
} from "react-native";
const window = Dimensions.get("window");
import { Theme } from "../../../../themes";
const { Colors } = Theme;
export default StyleSheet.create({
    All: {
        width: window.width,
        height: window.height,
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.white
    },
    medicalTitle: {
        width: "100%",
        marginBottom: 25
    },
    medicalText: {
        height: 30,
        width: "100%",
        color: Colors.grey515B61,
        fontFamily: "Avenir",
        fontSize: 22,
        fontWeight: "900",
        lineHeight: 30,
        textAlign: "center"
    },
    touchableLoadMore: {
        alignItems: 'center',
        padding: 5
    },
    loadMoreText: {
        fontSize: 16,
        color: Colors.pulseRed
    },
    container: {
        height: 52,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 0,
    },
    header: {
        width: "100%",
        height: 52,
        backgroundColor: Colors.offwhite,
        alignItems: "center",
        paddingLeft: 11,
        paddingRight: 11,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    backButton: {
        width: 55,
        height: 55,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    backImage: {
        width: 20,
        height: 20,
        left: 0,
    },
    haloDoc: {
        width: 76,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    haloDocImage: {
        width: 60,
        height: 30,
    }
})
