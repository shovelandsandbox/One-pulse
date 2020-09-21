import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const AssessmentHistoryStyle = StyleSheet.create({
    safeView: {
        flex: 1
    },

    mainView: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        padding: 20
    },

    profilePicView: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: Colors.alizarin,
        borderRadius: 200 / 2,
        marginBottom: 15
    },

    profilePic: {
        alignSelf: "center",
        height: 100,
        width: 100,
        aspectRatio: 1 / 1,
        borderRadius: 200 / 2
    },

    historyText: {
        color: Colors.charcoal,
        fontSize: 17,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "center",
        marginBottom: 15
    },

    listMainView: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20
    },

    listSubViews: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    levelPhysiqueView: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
    },

    levelPhysiqueText: {
        color: Colors.charcoal,
        fontSize: 17,
        fontFamily: "Avenir-Black",
        fontWeight: "bold",
        marginVertical: 10,
        lineHeight: 21.25,
        textAlign: "center"
    },

    personalInfoView: {
        flex: 0.6,
        justifyContent: "space-between",
        alignItems: "flex-end"
    },

    genderAgeView: {
        flexDirection: "row",
        alignItems: "center"
    },

    personalInfoText: {
        color: Colors.charcoal,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal"
    },

    smallVerticalDivider: {
        backgroundColor: Colors.charcoal,
        height: 15,
        width: 1,
        marginHorizontal: 5
    },

    bigVerticalDivider: {
        backgroundColor: Colors.charcoal,
        width: 0.25,
        marginHorizontal: 15
    },

    arrowView: {
        justifyContent: "center",
        alignItems: "center"
    },

    arrowImage: {
        alignSelf: "center",
        height: 25,
        width: 25
    },

    bottomView: {
        backgroundColor: Colors.white,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 15,
        padding: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    lastDoneText: {
        color: Colors.charcoal,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "center",
        marginBottom: 15
    },

});