import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get("window").width;

export const CompletionScreenStyles = StyleSheet.create({
    safeView: {
        flex: 1
    },

    MainContainer: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        paddingVertical: 25,
        paddingHorizontal: 10,
    },

    ViewContainer: {
        flexDirection: 'row',
        flex: 0.35,
    },

    GreatingTextContainer: {
        flex: 0.4,
        alignSelf: "center",
        marginLeft: 10
    },

    GreatingStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: "Avenir-Black",
        color: Colors.warmGray,
        lineHeight: 37.5,
    },

    GreatingMessage: {
        width: screenWidth / 2.8,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: "Avenir-Black",
        color: Colors.warmGray,
        lineHeight: 18.75,
    },

    ImageContainer: {
        flex: 0.6
    },

    ImageStyle: {
        width: screenWidth / 1.975,
        aspectRatio: 0.7,
        position: "absolute",
        right: 0,
        top: 0,
    },

    CardViewStyle: {
        flex: 0.7,
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingVertical: 60,
        paddingHorizontal: 40,
        marginHorizontal: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        alignItems: "center",
        alignSelf: "center",
    },

    scrollView: {
        marginBottom: 25
    },

    FirstTextStyle: {
        fontSize: 15,
        color: Colors.alizarin,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 18.75
    },

    SecondTextStyle: {
        fontSize: 15,
        color: Colors.warmGray,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 18.75,
        marginVertical: "10%"
    },

});