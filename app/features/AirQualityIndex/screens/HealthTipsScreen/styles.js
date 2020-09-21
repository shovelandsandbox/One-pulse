import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const window = Dimensions.get("window");
const width = window.width

export const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 5
    },
    imageButtonStyle: {
        // paddingTop: 10,
        textAlign: "center"
    },
    scrollStyle: {
        flex: 1
    },
    firstView: {
        backgroundColor: Colors.white,
        flex: 1
    },
    secondView: {
        flexDirection: "row",
        flex: 1
    },
    thirdView: {
        backgroundColor: "red",
        borderTopRightRadius: 20,
        flex: 0.20,
    },
    HeaderView: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButtonImg: {
        tintColor: 'white'
    },
    backGroundProductImgView: {
        justifyContent: "space-around",
        flex: 1,
        marginHorizontal: 6
    },
    leftIndexStyle: {
        backgroundColor: 'white',
        paddingVertical: 30,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 70,
        height: 120,
        width: '100%'
    },
    rightIndexStyle: {
        backgroundColor: 'red',
        paddingVertical: 30,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 70,
        height: 120,
        width: '100%'
    },
    backgroundImgStyle: {
        bottom: 0,
        width: '100%',
        height: '20%',
        marginHorizontal: -10
    },
    selectedImgView: {
        flex: 1
    },
    selectedImgStyle: {
        width: '100%',
        height: '100%',
        flex: 0.6
    },
    selectedButtonView: {
        bottom: 0
    },
    ButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: 2,
        height: 66,

    },
    selectedTextView: {
        minHeight: 150,
        paddingVertical: 15,
    },
    selectedTextStyle: {
        flexWrap: 'wrap',
        padding: 16,
        fontSize: 13
    }


})