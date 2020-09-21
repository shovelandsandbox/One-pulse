import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export const HeaderStyles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
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

    headerContentView: {
        flexDirection: "row",
        alignItems: "center",
        height: 50
    },

    headerLeftImage: {
        alignSelf: 'center',
        width: 25,
        aspectRatio: 1.25,
        tintColor: Colors.charcoal,
    },

    headerRightImage: {
        alignSelf: 'center',
        width: 25,
        aspectRatio: 1.25,
        tintColor: Colors.charcoal,
    },

    headerLeftTitleText: {
        fontSize: 18,
        color: Colors.charcoal,
        fontFamily: 'Avenir-Book',
        fontWeight: 'normal',
        marginLeft: 10,
    },

    headerMainTitleText: {
        fontSize: 18,
        color: Colors.charcoal,
        fontFamily: 'Avenir-Book',
        fontWeight: 'bold',
    },

    headerRightTitleText: {
        fontSize: 18,
        color: Colors.charcoal,
        fontFamily: 'Avenir-Book',
        fontWeight: 'normal',
    }
})