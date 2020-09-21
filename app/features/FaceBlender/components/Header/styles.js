import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export const HeaderStyles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 15,
        height: 50,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    backImgView: {
        position: "absolute",
        left: 15,
        height: 50,
        width: 50,
        justifyContent: "center"
    },

    headerLeftImage: {
        width: 25,
        height: 25,
    },

    headerMainTitleText: {
        fontSize: 20,
        color: Colors.charcoal,
        fontFamily: 'Avenir-Book',
    },

    crossImgView: {
        position: "absolute",
        right: 15,
        height: 50,
        justifyContent: "center"
    },

    headerRightImage: {
        width: 18,
        height: 18,
    },
})