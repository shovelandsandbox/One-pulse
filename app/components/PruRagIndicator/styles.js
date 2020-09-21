import { StyleSheet } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;

const pruRagIndicatorStyle = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        width: "90%",
        height: 8
    },
    absoluteSubContainer: {
        position: "absolute",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        width: "100%",
        height: 8,
        zIndex: 1,
        paddingLeft: 20,
        paddingRight: 10
    },
    indicatorContainer: { 
        position: "absolute",
        top: -13,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        width: "100%",
        zIndex: 1,
        marginLeft: -3,
    },
    bigTicks: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: "100"
    },
    smallTicks: {
        color: Colors.white,
        fontSize: 10
    },
    indicatorTick: {
        color: Colors.pruRagIndicator,
        fontSize: 22
    },
    roundupStartingBox: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    roundupEndingBox: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default pruRagIndicatorStyle;