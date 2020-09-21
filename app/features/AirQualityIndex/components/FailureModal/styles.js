import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export const styles = StyleSheet.create({
    okayButtonContainer: {
        height: 33.3,
        width: 272,
        borderRadius: 19.3,
        backgroundColor: Colors.pulseRed,
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        paddingTop: 15
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 0,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.offwhite,
        borderRadius: 10,
        padding: 20,
    },
    modalContainer: {
        backgroundColor: Colors.offwhite,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: (Dimensions.get("window").height - 350) / 2,
        height: 350,
        width: 300,
        flex: 0,
        borderRadius: 10,
        elevation: 10,
    },
    okay: {
        fontSize: 13.3,
        lineHeight: 25,
        fontFamily: "Avenir",
        color: Colors.offwhite,
    },
    title: {
        fontSize: 20,
        fontFamily: "Avenir",
        fontWeight: "600",
        color: Colors.descText,
        alignSelf: "center",
    },
    description: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: "Avenir",
        color: Colors.descText,
        textAlign: "center",
        alignSelf: "center",
        marginBottom: 16.3,
    },
    imgStyle: {
        width: 100,
        height: 120
    }

})