import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get("window").width

export const SplashScreenStyles = StyleSheet.create({
    safeView: {
        flex: 1
    },

    MainContainer: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        paddingVertical: 20,
    },

    skipText: {
        color: Colors.warmGray,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "right",
        marginRight: 20,
        lineHeight: 18.75
    },

    ImageStyle: {
        width: screenWidth / 1.3,
        aspectRatio: 1.25,
        alignSelf: "center",
        marginTop: 20,
        marginHorizontal: 20,
    },

    PaginationDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.alizarin
    },

    PaginationInactiveDotStyle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.heather
    },

    TextStyle: {
        fontSize: 15,
        color: Colors.charcoal,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 18.75,
        marginTop: 20,
        marginHorizontal: "15%",
        textAlign: "justify",
    },

    ButtonContainer: {
        marginTop: 60
    },

});