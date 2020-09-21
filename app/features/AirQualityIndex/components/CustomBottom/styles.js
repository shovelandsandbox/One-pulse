import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const styles = StyleSheet.create({
    firstView: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    },
    backGroundImg: {
        height: 50,
        marginHorizontal: 10,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    innerImage: {
        height: 30,
        width: 30,
        alignSelf: 'center'
    },
    measurementView: {
        flexDirection: "column",
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    measurementText: {
        fontSize: 17
    },

    QualityView: {
        flex: 0.5,
        flexDirection: "column",
        right: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    QualityText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    tabTextStyle: {
        marginHorizontal: 14,
        fontSize: 14
    },
    activetab: {
        marginHorizontal: 14,
        fontSize: 15,
        fontWeight: "bold"
    },
    lineView: {
        backgroundColor: "#E0E0E0",
        height: 3
    },
    tabMainView: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 5
    },
    selectedTabView: {
        marginTop: 10
    },
    selectedTabText: {
        fontSize: 13
    },
    seeText: {
        color: 'red'
    },

    titleIconView: {
        flexDirection: "row",
        marginTop: 20,
    },
    subView1: {
        flex: 0.5,
        // backgroundColor: "red",
        // paddingHorizontal: 20,
        // paddingBottom: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        top: 0,
        marginHorizontal: 15,

    },

    subView: {
        backgroundColor: Colors.white,
        // paddingHorizontal: 20,
        top: 0,
        paddingBottom: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginRight: 8,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5

    },
    grayBgView1: {
        // backgroundColor: "red",
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 7
    },
    grayBgView2: {
        // backgroundColor: "red",
        marginTop: 10,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        marginHorizontal: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 7
    },
    grayBgView: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingVertical: 20,
        marginRight: 8,
    },
    grayBgViewElevated: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        borderTopLeftRadius: 10,
        paddingVertical: 20,
        marginRight: 8,

    },






});