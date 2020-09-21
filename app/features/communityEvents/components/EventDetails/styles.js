import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
    eventContainer: {
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 14,
        elevation: 5,
        marginHorizontal: 20,
        marginVertical: 8,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    eventDate: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    eventDetailsPic: {                              
        width: "100%",
        height: 140,
        alignSelf: 'center',
        borderRadius: 10
    }
});