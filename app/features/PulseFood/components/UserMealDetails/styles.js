import { StyleSheet } from "react-native";

// custom
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export const styles = StyleSheet.create({

    container: {
        marginHorizontal: 16,
        paddingLeft: 20,
        borderLeftWidth: 1,
        borderLeftColor: "#ff8e98",
        position: "relative",
        marginBottom: 8,
        marginTop:16,
    },
    pointerCircle: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: "#ff8e98",
        position: 'absolute',
        left: -8,
        top: 0
    },
    mealDetailsHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mealDetailsHeaderText: {
        color: "#a7abb7",
    },
    mealItemsContainer: {
        borderWidth: 0.2,
        borderColor: "silver",
        backgroundColor: "#fff",
        paddingHorizontal: 8,
        paddingBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginTop: 8,
        borderRadius:10

    },
    mealItemContainer: {
        flexDirection: "row",
        marginTop: 16
    },
    mealItemDetailsContainer: {
        marginHorizontal: 16,
        flex: 1,
    },
    mealItemImg: {
        height: 56,
        width: 56,
    },
    mealItemDetailsRow1: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1
    },
    mealItemDetailsRow2: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    mealItemNameText: {
        color: "#4e5571",
        flex: 1,
        fontWeight: "bold"
    },
    mealItemActionsContainer: {
        flexDirection: "row"
    },
    removeActionText: {
        fontSize: 12,
        color: Colors.redec1c2e
    },
    editActionText: {
        fontSize: 12,
        color: "#6e6e6e",
        marginLeft: 8
    },

    // EMPTY STYLES
    emptyMealContainer: {
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingLeft: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#29000000",
        borderRadius: 6,
        marginTop: 16,
    },
    emptyCalDetailsContainer: {
        flexDirection: "row",
        alignItems: 'center',

    },
    addBtnContainer: {
        backgroundColor: Colors.redec1c2e,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        height: 40,
        width: 40,
        marginLeft: 16,
        justifyContent: "center",
        alignItems: 'center'
    },
    addIcon: {
        fontSize: 30,
        color: "#fff",
        textAlign: "center",
    }
})