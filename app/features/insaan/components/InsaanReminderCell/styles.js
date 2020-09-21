/* eslint-disable */
import { StyleSheet} from "react-native";

export const InsaanReminderStyle = StyleSheet.create({
    container1: {
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#a9a9a9',
        paddingHorizontal: 20,
        justifyContent: 'space-evenly'
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    displayName: {
        color: '#000000',
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: '300',
    },
    timeStyle: {
        color: '#a9a9a9',
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: '300',
        marginLeft: 20,
        alignSelf: 'flex-end'
    },
    displayInsaanIcon: {
        width: 16,
        height: 16,
        tintColor: '#a9a9a9',
        alignSelf: 'center',
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    setReminder: {
        color: '#000000',
        fontFamily: 'Avenir',
        fontSize: 15,
        fontWeight: '300',
    }
});