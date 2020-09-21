import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const AssessmentResultStyle = StyleSheet.create({
    safeView: {
        flex: 1
    },

    mainView: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        paddingVertical: 10,
        paddingHorizontal: 20
    },

    resultHeadingText: {
        color: Colors.warmGray,
        fontSize: 20,
        fontFamily: "Avenir-Black",
        fontWeight: "bold",
        lineHeight: 25,
        alignSelf: "center"
    },

    innerViewOne: {
        flex: 0.55,
        flexDirection: "row",
        marginTop: 20
    },

    innerViewOneLeft: {
        flex: 0.5,
        justifyContent: "space-evenly",
    },

    yourConstitutionText: {
        color: Colors.warmGray,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "center",
        lineHeight: 18,
    },

    physiqueTextView: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.warmGray,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 5,
    },

    levelText: {
        color: Colors.alizarin,
        fontSize: 15,
        fontFamily: "Avenir-Black",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 18,
    },

    physiqueText: {
        color: Colors.alizarin,
        fontSize: 15,
        fontFamily: "Avenir-Black",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 18,
    },

    meterImage: {
        alignSelf: "center",
        height: 75,
        aspectRatio: 1.5,
        paddingHorizontal: "7.5%",
        paddingTop: "1.5%"
    },

    viewLMH: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    textL: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: "bold",
        transform: [{ rotate: "-45deg" }],
        top: "35%",
    },

    textM: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: "bold",
        top: "17.5%",
    },

    textH: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: "bold",
        transform: [{ rotate: "45deg" }],
        top: "35%",
    },

    needleView: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "60%"
    },

    lowNeedleImage: {
        alignSelf: "center",
        height: 45,
        width: 45,
    },

    medNeedleImage: {
        alignSelf: "center",
        height: 40,
        width: 40,
    },

    highNeedleImage: {
        alignSelf: "center",
        height: 45,
        width: 45,
    },

    suggestiveText: {
        color: Colors.warmGray,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 18,
    },

    innerViewOneRight: {
        flex: 0.5,
        position: "absolute",
        right: 0
    },

    humanImage: {
        alignSelf: "center",
        height: 450,
        width: 175
    },

    innerViewTwo: {
        flex: 0.45,
        justifyContent: 'space-evenly',
        backgroundColor: Colors.lavendarBlush,
        paddingVertical: 20,
        borderRadius: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },

    summaryHeadingText: {
        color: Colors.warmGray,
        fontSize: 20,
        fontFamily: "Avenir-Black",
        fontWeight: "bold",
        lineHeight: 25,
        marginHorizontal: 30,
    },

    scrollView: {
        marginVertical: 10,
    },

    bulletView: {
        flexDirection: "row",
        marginBottom: 10,
        marginHorizontal: 30,
    },

    bulletText: {
        color: Colors.warmGray,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 18,
        marginLeft: 10,
    },

});