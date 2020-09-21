import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const BasicInformationStyle = StyleSheet.create({
    safeView: {
        flex: 1
    },

    mainView: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        paddingVertical: 10,
        paddingHorizontal: 20
    },

    upperView: {
        justifyContent: "center",
        paddingRight: 50,
    },

    basicInfoText: {
        color: Colors.warmGray,
        fontSize: 17,
        fontFamily: "Avenir-Black",
        fontWeight: "bold",
        lineHeight: 21.25
    },

    pleaseProvideText: {
        color: Colors.charcoal,
        fontSize: 14,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        marginVertical: 20,
        lineHeight: 17.5
    },

    imageChangeView: {
        flexDirection: "row",
        alignItems: "center"
    },

    profilePicView: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 7,
        borderColor: Colors.white,
        borderRadius: 160 / 2,
    },

    profilePic: {
        alignSelf: "center",
        height: 80,
        width: 80,
        aspectRatio: 1 / 1,
        borderRadius: 160 / 2
    },

    changeAddText: {
        color: Colors.alizarin,
        fontSize: 14,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        marginLeft: 10,
        lineHeight: 17.5
    },

    profileModalContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.modalBackground,
    },

    profileModalStyle: {
        backgroundColor: Colors.white,
        alignItems: "center",
        height: 170,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: Colors.nevada,
        padding: 10,
    },

    profileModalLabel: {
        paddingBottom: 5,
    },

    profileModalButtonContainer: {
        flexDirection: "row",
    },

    profileModalLeftButton: {
        alignItems: "center",
        flex: 0.45,
        padding: 8,
        paddingTop: 15,
        paddingBottom: 15,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: Colors.dimGray,
        borderRadius: 5,
    },

    profileModalIcon: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderColor: Colors.alizarin,
    },

    profileModalButtonLabel: {
        fontFamily: "Avenir-Book",
        fontSize: 13.3,
        lineHeight: 14.3,
        textAlign: "center",
        paddingTop: 10,
    },

    profileModalRightButton: {
        alignItems: "center",
        flex: 0.45,
        padding: 8,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: Colors.dimGray,
        borderRadius: 5,
    },

    scrollView: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: Colors.aliceBlue
    },

    subViews: {
        justifyContent: "center",
        marginVertical: 10
    },

    subHeadingText: {
        color: "#a0a0a0",
        fontSize: 12,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        marginRight: 5,
        lineHeight: 15
    },

    iconView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    dobValueText: {
        color: Colors.warmGray,
        fontSize: 13,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 16.25
    },

    dobErrorText: {
        color: Colors.alizarin,
        fontSize: 12,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 16.25
    },

    cityValueText: {
        color: Colors.warmGray,
        fontSize: 13,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 15
    },

    icon: {
        width: 20,
        height: 20
    },

    underline: {
        width: "100%",
        height: 0.5,
        backgroundColor: Colors.warmGray,
        marginTop: 5
    },

    optionsView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },

    genderUnselectedOptionView: {
        backgroundColor: Colors.transparent,
        borderWidth: 0.5,
        borderColor: Colors.warmGray,
        borderRadius: 5,
        flex: 0.35,
        paddingVertical: 7.5,
        marginRight: 15,
        marginTop: 10,
    },

    genderSelectedOptionView: {
        backgroundColor: Colors.alizarin,
        borderWidth: 0.5,
        borderColor: Colors.warmGray,
        borderRadius: 5,
        flex: 0.35,
        paddingVertical: 7.5,
        marginRight: 15,
        marginTop: 10,
    },

    unselectedOptionView: {
        backgroundColor: Colors.transparent,
        borderWidth: 0.5,
        borderColor: Colors.warmGray,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        marginRight: 15,
        marginTop: 10,
    },

    unselectedOptionText: {
        color: Colors.warmGray,
        fontSize: 13,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "center"
    },

    selectedOptionView: {
        backgroundColor: Colors.alizarin,
        borderWidth: 0.5,
        borderColor: Colors.alizarin,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        marginRight: 15,
        marginTop: 10,
    },

    selectedOptionText: {
        color: Colors.white,
        fontSize: 13,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "center",
        lineHeight: 16.25
    },

    modalTransparentView: {
        flex: 1,
        backgroundColor: Colors.modalBackground,
        justifyContent: "flex-end"
    },

    pickerView: {
        height: screenHeight / 3,
        width: "100%",
        backgroundColor: Colors.white,
        alignItems: "center",
    },

    pickerHeaderView: {
        backgroundColor: Colors.warmGrayOpaque,
        alignItems: "flex-end",
        width: "100%",
        justifyContent: "center",
        padding: 10,
    },

    pickerButtonText: {
        fontSize: 15,
        color: Colors.alizarin,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        lineHeight: 16.25
    },

    cityPickerStyle: {
        height: 100,
        width: "100%",
    },

    requiredText: {
        color: Colors.alizarin,
        fontSize: 12,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        marginTop: 20,
        lineHeight: 15
    }

});