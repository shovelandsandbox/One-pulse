import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end'
    },
    containerStyle: {
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.shadowColor,
        opacity: 0.5
    },
    viewContainerStyle: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 10,
        paddingHorizontal: 20,
        zIndex: 2,
        marginHorizontal: 15
    },
    textView: {
        marginVertical: 20
    },
    textStyle: {
        fontSize: 18,
        lineHeight: 25,
        color: Colors.grey393939
    },
    textSize: {
        fontSize: 14,
        lineHeight: 25,
        color: Colors.grey393939
    },
    touchView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 20
    },
    locationMode: {
        fontSize: 14,
        lineHeight: 25,
        color: Colors.pulseRed,
        paddingHorizontal: 20
    },
    allowLocation: {
        paddingHorizontal: 30,
        height: 33.3,
        backgroundColor: Colors.pulseRed,
        borderRadius: 20,
        justifyContent: 'center'
    },
    allowLocationText: {
        color: Colors.white,
        fontSize: 14,
        lineHeight: 25,
    }



})