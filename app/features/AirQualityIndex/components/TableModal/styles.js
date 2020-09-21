import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export const styles = StyleSheet.create({
    viewStyle: {
        flex: 1, 
        zIndex: 2, 
        backgroundColor: 'transparent', 
        justifyContent: 'center'
    },
    containerStyle: {
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#000', 
        opacity: 0.5,
        zIndex: 1
    },
    textView: {
        width: '95%', 
        backgroundColor: '#ffffff', 
        padding: 10, 
        borderRadius: 10, 
        elevation: 10, 
        marginHorizontal: '2.5%'
    },
    closeContainer: {
        zIndex: 2, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        marginVertical: 20
    },
    image: {
        elevation: 10, 
        width: 36, 
        height: 36
    }


})