import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const AssessmentDetailStyle = StyleSheet.create({
    safeView: {
        flex: 1
    },

    mainView: {
        flex: 1,
        backgroundColor: Colors.aliceBlue,
        padding: 20
    },

    detailHeadingText: {
        color: Colors.warmGray,
        fontSize: 20,
        fontFamily: "Avenir-Black",
        fontWeight: "bold",
        marginBottom: 10,
        lineHeight: 25
    },

    grayBgView: {
        flexDirection: "row",
        backgroundColor: Colors.solitude,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 10,
        marginHorizontal: 15,
        flexWrap: 'wrap',
        alignContent: "flex-start"
    },
    imgStyle: {
        flex: 0.2,
        flexDirection: "row"
    },
    textStyle: {
        flex: 0.8,
        flexWrap: "wrap",
        flexDirection: "row"
    },
    grayBgViewElevated: {
        flexDirection: "row",
        flexWrap: 'wrap',
        backgroundColor: Colors.white,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 10,
        marginHorizontal: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    yellowBgView: {
        flexDirection: "row",
        backgroundColor: Colors.pearlLusta,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 10,
        marginHorizontal: 15
    },

    yellowBgViewElevated: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 10,
        marginHorizontal: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },

    image: {
        alignSelf: "center",
        width: 30,
        height: 22,
        marginRight: 15
    },

    infoHeadingText: {
        color: Colors.warmGray,
        fontSize: 17,
        fontFamily: "Avenir-Black",
        fontWeight: "bold",
        lineHeight: 21,

    },

    subView: {
        flex: 0.5,
        justifyContent: 'space-evenly',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginHorizontal: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    bulletTextGray: {
        color: Colors.warmGray,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "justify",
        lineHeight: 18,
        marginLeft: 5,
    },

    bulletTextRed: {
        color: Colors.alizarin,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "justify",
        lineHeight: 18,
        marginLeft: 5
    },

    bulletTextYellow: {
        color: Colors.apache,
        fontSize: 15,
        fontFamily: "Avenir-Book",
        fontWeight: "normal",
        textAlign: "justify",
        lineHeight: 18,
        marginLeft: 5
    },

    adviceIcon: {
        alignSelf: "center",
        width: 30,
        height: 20,
        marginLeft: 5,
        marginBottom: 5,
    },

    subImage: {
        alignSelf: "center",
        width: 275,
        height: 150,
    },

    hollowBulletView: {
        flexDirection: "row",
        marginLeft: 15,
        marginRight: 10,
        marginVertical: 5,
    },

    warnDecView: {
        flexDirection: "row",
        marginVertical: 5
    },

    adviceImageView: {
        marginHorizontal: 10,
        marginTop: 5
    },

    underline: {
        width: "100%",
        height: 0.5,
        backgroundColor: Colors.warmGray,
        marginVertical: 5
    },

    contentView: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },

    titleIconView: {
        flexDirection: "row",
        marginTop: 20,
    }
});