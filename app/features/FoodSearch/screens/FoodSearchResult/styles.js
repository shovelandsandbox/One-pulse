import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
import DeviceInfo from 'react-native-device-info';
const { Colors } = Theme;
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const FoodSearchResultStyle = StyleSheet.create({
    safeViewTop: {
        flex: 0,
        backgroundColor: Colors.redec1c2e
    },

    safeViewBottom: {
        flex: 1,
        backgroundColor: Colors.offwhite
    },

    mainView: {
        flex: 1,
        backgroundColor: Colors.whitef4f7fc,
        paddingBottom: 100,
    },

    resultView: {
        paddingHorizontal: 25,
        marginHorizontal: 40,
        marginVertical: 20,
        backgroundColor: Colors.offwhite,
        borderRadius: 5,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    resultSubView: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderColor: Colors.greyb5b5b5,
    },

    resultTitleView: {
        flexDirection: "row",
        alignItems: 'center'
    },

    resultTitleImg: {
        width: 20,
        height: 20,
        marginRight: 5
    },

    resultTitleText: {
        color: Colors.charcoal,
        fontFamily: "Avenir",
        fontWeight: "bold",
        fontSize: 17,
        textAlign: "center",
        lineHeight: 21
    },

    subTitleView: {
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    subTitleTextLight: {
        color: Colors.warmGray,
        fontFamily: "Avenir",
        fontWeight: "normal",
        fontSize: 13,
        textAlign: "center",
        lineHeight: 17
    },

    subTitleTextDark: {
        color: Colors.charcoal,
        fontFamily: "Avenir",
        fontWeight: "bold",
        fontSize: 13,
        textAlign: "center",
        marginVertical: 5,
        lineHeight: 17
    },

    subInfoView: {
        marginHorizontal: 15,
        justifyContent: "center",
        alignItems: "center"
    },

    subInfoTxt: {
        color: Colors.warmGray,
        fontFamily: "Avenir",
        fontWeight: "normal",
        fontSize: 12,
        textAlign: "center",
        lineHeight: 16
    },

    bottomView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.offwhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: (Platform.OS === "ios" && DeviceInfo.hasNotch()) ? 0 : 20
    },

    bottomSubView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    bottomText: {
        color: Colors.warmGray,
        fontFamily: "Avenir",
        fontWeight: "normal",
        fontSize: 12,
        lineHeight: 16,
        flex: 1,
        flexWrap: "wrap",
    },

    goBtnBg: {
        width: screenWidth / 3,
        backgroundColor: Colors.redec1c2e,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },

    goBtnText: {
        color: Colors.offwhite,
        fontSize: 15,
        lineHeight: 19,
        fontFamily: "Avenir",
        fontWeight: "normal",
    },

});