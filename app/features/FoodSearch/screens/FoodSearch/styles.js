import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const FoodSearchStyle = StyleSheet.create({
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
        backgroundColor: Colors.offwhite,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    rowView: {
        flexDirection: "row",
        alignItems: "center"
    },

    searchBgView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: Colors.greyb5b5b5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginBottom: 5
    },

    searchInput: {
        flex: 0.95,
        backgroundColor: Colors.offwhite,
        fontSize: 15,
        fontWeight: "bold",
        color: Colors.grey707070,
        lineHeight: 19
    },

    searchBtnBg: {
        backgroundColor: Colors.redec1c2e,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        padding: 10,
        borderRadius: 10
    },

    searchBtnText: {
        color: Colors.offwhite,
        fontSize: 14,
        fontFamily: "Avenir",
        fontWeight: "normal",
        lineHeight: 18
    },

    middleView: {
        flex: 2.5,
        paddingHorizontal: 10
    },

    searchErrText: {
        color: Colors.redec1c2e,
        fontSize: 14,
        fontFamily: "Avenir",
        fontWeight: "normal",
        lineHeight: 18
    },

    searchOrSelectText: {
        color: Colors.charcoal,
        fontSize: 15,
        fontFamily: "Avenir",
        fontWeight: "bold",
        marginTop: 5,
        lineHeight: 19
    },

    redText: {
        color: Colors.redec1c2e,
        fontSize: 16,
        fontFamily: "Avenir",
        fontWeight: "bold",
        marginVertical: 10,
        lineHeight: 20
    },

    foodNameBg: {
        paddingVertical: 12.5,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.greyb5b5b5,
        flexDirection: "row",
        alignItems: "center"
    },

    foodNameText: {
        color: Colors.grey707070,
        fontSize: 15,
        fontFamily: "Avenir",
        fontWeight: "normal",
        marginLeft: 5,
        lineHeight: 19
    },

    oopsText: {
        color: Colors.redec1c2e,
        fontSize: 15,
        fontFamily: "Avenir",
        fontWeight: "bold",
        textAlign: "justify",
        flex: 1,
        flexWrap: "wrap",
        marginLeft: 10,
        lineHeight: 19
    },

    bottomView: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 10,
        justifyContent: "flex-end",
    },

    paraText: {
        color: Colors.grey707070,
        fontSize: 14,
        fontFamily: "Avenir",
        fontWeight: "normal",
        textAlign: "center",
        lineHeight: 18
    },

    divider: {
        width: "100%",
        height: 0.75,
        backgroundColor: Colors.greyb5b5b5,
        marginVertical: 10
    },

    pcaTmuView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    pcaTmuText: {
        color: Colors.grey707070,
        fontSize: 14,
        fontFamily: "Avenir",
        fontWeight: "normal",
        flexWrap: "wrap",
        flex: 0.5,
        textAlign: "center",
        lineHeight: 18
    },

});