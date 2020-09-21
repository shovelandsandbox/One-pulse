import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get("window").width

export const IntroductionScreenStyles = StyleSheet.create({
    safeView: {
        flex: 1
    },

    MainContainer: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        padding: 20
    },

    upperView: {
        flex: 0.5
    },

    GreatingText: {
        fontSize: 27,
        fontWeight: 'bold',
        color: Colors.warmGray,
        fontFamily: "Avenir-Black",
        lineHeight: 33.75
    },

    GreatingNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.warmGray,
        fontFamily: "Avenir-Black"
    },

    ImageStyle: {
        width: screenWidth / 1.5,
        aspectRatio: 0.5,
        alignSelf: "flex-end",
        position: "absolute"
    },

    CardViewStyle: {
        flex: 0.55,
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    scrollView: {
        flex: 1,
    },

    IntroText: {
        fontSize: 15,
        color: Colors.charcoal,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 18.75,
        alignSelf: 'center',
        textAlign: "justify"
    },

    middleView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },

    pcaTmuView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    pcaTmuText: {
        color: Colors.charcoal,
        fontSize: 14,
        fontFamily: "Avenir",
        fontWeight: "normal",
        flexWrap: "wrap",
        flex: 0.5,
        textAlign: "center",
        lineHeight: 18,
    },

    btnView: {
        flex: 1,
        justifyContent: "flex-end",
    }

});