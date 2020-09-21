import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

export const ContinueAssessmentStyles = StyleSheet.create({
    safeView: {
        flex: 1
    },

    MainContainer: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        padding: 25
    },

    Container: {
        flex: 0.6,
    },

    TextStyle: {
        fontSize: 30,
        color: Colors.warmGray,
        fontWeight: "bold",
        fontFamily: "Avenir-Black",
        fontStyle: "normal",
        lineHeight: 37.5,
        marginBottom: 20
    },

    ImageStyles: {
        width: screenWidth / 1.6,
        aspectRatio: 0.4,
        alignSelf: "center",
        position: 'absolute'
    },

    CardStyles: {
        flex: 0.4,
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingTop: screenHeight / 16,
        paddingBottom: 10,
        paddingHorizontal: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    TextCupContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    },

    CardText: {
        fontSize: 20,
        color: Colors.warmGray,
        fontWeight: "bold",
        fontFamily: "Avenir-Book",
        fontStyle: "normal",
        lineHeight: 50,
        textAlign: "center",
        alignSelf: "center",
    },

    cupImage: {
        alignSelf: "center",
        width: 30,
        height: 30,
    },

    ButtonView: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    ButtonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },

});