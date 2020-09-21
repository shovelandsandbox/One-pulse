import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get('window').width

export const HeaderStyles = StyleSheet.create({
    headerImgBg: {
        width: screenWidth,
        aspectRatio: 2.6,
        paddingHorizontal: 20,
        padding: 15,
        justifyContent: "space-between",
        backgroundColor: Colors.offwhite
    },

    headerBackImgView: {
        width: 35,
        height: 30,
        justifyContent: "center",
    },

    headerBackImg: {
        width: 25,
        height: 18
    },

    headerText: {
        color: Colors.offwhite,
        fontSize: 24,
        fontFamily: "Avenir",
        fontWeight: "bold",
        flex: 0.75,
    },
})