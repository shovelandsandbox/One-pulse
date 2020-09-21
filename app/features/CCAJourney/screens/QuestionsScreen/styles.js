import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get("window").width

export const QuestionScreenStyles = StyleSheet.create({
    safeView: {
        flex: 1
    },

    MainContainer: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    imageContainer: {
        flexDirection: 'row',
        flex: 1,
    },

    SymbolImageStyle: {
        width: screenWidth / 5.4,
        aspectRatio: 1,
        alignSelf: "center",
        marginLeft: screenWidth / 9
    },

    ImageStyle: {
        width: screenWidth / 1.95,
        aspectRatio: 0.8,
        position: "absolute",
        right: 0
    },

    QuestionViewStyle: {
        flex: 2.5,
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 20,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    BarContainer: {
        justifyContent: 'center',
        marginBottom: 15,
    },

    QuestionProgressViewLine: {
        height: 10,
        width: "100%",
        alignSelf: "center",
        borderRadius: 15,
        backgroundColor: Colors.whisper
    },

    QuestionProgressView: {
        height: 15,
        borderRadius: 15,
        backgroundColor: Colors.alizarin,
        position: "absolute",
    },

    SuggestionTextStyle: {
        fontSize: 15,
        color: Colors.warmGray,
        fontFamily: "Avenir-Book",
        fontWeight: 'normal',
        fontStyle: "normal",
        lineHeight: 18.75,
        marginBottom: 5,
    },

    QuestionsTextStyle: {
        fontSize: 15,
        color: Colors.charcoal,
        fontFamily: "Avenir-Book",
        fontWeight: 'normal',
        fontStyle: "normal",
        lineHeight: 18.75,
        marginBottom: 20,
    },

    OptionsView: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.heather,
        borderRadius: 7.5,
        paddingVertical: 7.5,
        marginVertical: 7.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    OptionsTextStyle: {
        fontSize: 15,
        color: Colors.charcoal,
        fontFamily: "Avenir-Book",
        fontWeight: 'normal',
        fontStyle: "normal",
        lineHeight: 18.75,
    },

    SelectedOptionsView: {
        borderWidth: 1,
        borderRadius: 7.5,
        paddingVertical: 7.5,
        marginVertical: 7.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    SelectedOptionsTextStyle: {
        fontSize: 15,
        color: Colors.black,
        fontFamily: "Avenir-Book",
        fontWeight: 'bold',
        fontStyle: "normal",
        lineHeight: 18.75,
    },

    ButtonContainer: {
        flexDirection: "row",
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: 'space-between',
    },
});