import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: Colors.white
    },
    viewStyle: {
        margin: 20
    },
    welcomeStyle: {
        width: "100%",
        height: 40,
        borderRadius: 19.7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.pulseRed
    },
    welcomeText: {
        color: Colors.white,
        fontSize: 15
    },
    backgroundImage: {
        width: "100%",
        height: "65%",
    },
    imageStyle: {
        width: "100%",
        height: "100%",
    },
    imgView: {
        padding: 15
    },
    imgStyle: {
        height: 16.7,
        width: 22,
    },
    textView: {
        paddingTop: 15,
        // justifyContent: "flex-end",
        // alignItems: "center",
    },
    headingText: {
        fontSize: 16,
        lineHeight: 20,
        color: Colors.grey393939,
        fontFamily: "Avenir-Black",
        fontWeight: "600",
        alignSelf: "center"
    },
    contextText: {
        fontSize: 10,
        lineHeight: 15,
        color: Colors.grey707070,
        fontFamily: "Avenir-Book",
    },
    contextView: {
        paddingTop: 10,
        marginHorizontal: 70,
    },
    PaginationDotStyle: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: Colors.pulseDarkGrey
    },

    PaginationInactiveDotStyle: {
        width: 19,
        height: 19,
        borderRadius: 10,
        backgroundColor: Colors.heather
    },
    skipText: {
        color: Colors.white
    },
    skipTextBlack: {
        color: Colors.black
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})