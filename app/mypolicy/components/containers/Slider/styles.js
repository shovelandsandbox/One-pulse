import { StyleSheet, Dimensions, Platform } from "react-native";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default StyleSheet.create({
    fullViewWidth: {
        width: width * .25,
        flex: 1
    },
    fullContainer: {
        width: width * .5,
     },
    iconContainer: {
        backgroundColor: 'rgb(237,27,46)',//read from colors
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    dividerStyle: {
        backgroundColor: 'rgb(255, 255, 255)',
        height: 0.8,
        width: '80%',
        alignSelf: 'center'
    },
    minPadding: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        minHeight: 100,
    },
    displayName: {
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Avenir-Regular",
        color: 'rgb(255,255,255)',
        lineHeight: 16,
        fontSize: 12,
        paddingTop: 13,
        textAlign: 'center'
    },
    gridContainer: {
        backgroundColor: 'rgb(237,27,46)',
        width: width * 0.2,
        right: 0,
        flex: 1,
        height: height - 256,
        position: 'absolute'
    },
    control:{ 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" 
    }
})