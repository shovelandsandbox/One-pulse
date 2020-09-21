import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export const styles = StyleSheet.create({
    backgroundImgStyle: {
        bottom: 0,
        width: '100%',
        height: '20%',
        marginHorizontal: -10
    },
    mainViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    imageButtonStyle: {
        paddingTop: 10,
        textAlign: "center"
    },
    scrollStyle: {
        flex: 1
    },
    HeaderView: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButtonImg: {
        tintColor: 'white'
    },
    backGroundProductImgView: {
        justifyContent: "space-around",
        flex: 1,
        marginHorizontal: 6
    },
    leftIndexStyle: {
        backgroundColor: 'white',
        paddingVertical: 30,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 70,
        height: 120,
        width: '100%'
    },
    rightIndexStyle: {
        backgroundColor: 'red',
        paddingVertical: 30,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: 70,
        height: 120,
        width: '100%'
    },

    thirdView: {
        backgroundColor: "red",
        borderTopRightRadius: 20,
        flex: 0.20,
    },
    qualityDataImage: {
        height: 40,
        width: 40,
        marginLeft: 30,
    },
    dataValueStyle: {
        fontSize: 18
    },
    contentViewStyle: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 35,
        // marginVertical: 15,
        // marginHorizontal: 25,
    },
    viewStyle: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    contentImageStyle: {
        height: 21.2,
        width: 10.5,
        marginRight: 15,
        marginLeft: 15,
    },
    contentTextStyle: {
        fontSize: 13.3
    },
    speedoMeterViewStyle: {
        flexDirection: "row"
    },
    imageStyle: {
        width: 200,
        height: 200
    },
    outerCircleStyle: {
        height: 100,
        width: 200
    },
    innerCircleStyle: {
        height: 80,
        width: 160
    },
    halfCircleStyle: {
        borderWidth: 5,
        borderColor: "white"
    },
    labelStyle: {
        top: -5,
        fontSize: 26.7
    },
    labelNoteStyle: {
        top: -5,
        fontSize: 12,
        justifyContent: "center",
    },
    humidityViewStyle: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginRight: 50,
    },
    humidityImageStyle: {
        height: 14.6,
        width: 10.8,
        marginRight: 15,
    },
    humidityTextStyle: {
        marginRight: 15,
        fontSize: 13.3
    },
    infoView: {
        flexDirection: "row",
        justifyContent: "center"
    },
    infoImageStyle: {
        width: 27.7,
        height: 27.7,
        right: -50,
        bottom: 10,
        //marginRight: 90,
    },
    modalView: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.white,
    },
    cardView: {
        height: 40,
        backgroundColor: Colors.white,

    },
    cardImageView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 56,
        backgroundColor: Colors.offwhite,
    },
    imgView: {
        padding: 10
    },
    imgStyle: {
        marginLeft: 15,
        height: 16.7,
        width: 22,
    },
    textStyle: {
        marginLeft: 10,
        color: Colors.grey393939,
        fontSize: 16,
        fontWeight: "600",
    },
    searchView: {
        padding: 10
    },
    airReportView: {
        marginTop: 5
    },
    airReportView2: {
        marginTop: 0
    },
    airReportView1: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },
    airReportStyle: {
        color: Colors.color4a4a4a,
        fontSize: 15,
        // lineHeight: 16,
        // fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 20
    },
    dialView: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15
    },
    QualityIndexView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3
    },
    QualityIndexText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    QualityView: {
        justifyContent: "center",
        alignItems: "center",
    },
    QualityText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    airQualityText: {
        fontSize: 16,
        fontWeight: "400"
    },
    dialMainView: {
        position: "absolute"
    },
    HeaderDetailedView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    HeaderImageView: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    HeaderImage: {
        height: 18.2,
        width: 10.5,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    HeaderImageText: {
        fontSize: 15,
        marginTop: 7
    },
    addressView: {
        marginTop: 30
    },
    FirstView: {
        flexDirection: "row",
        flex: 1
    },
    rightView: {
        flex: 1
    },
    rightHalfVieW: {
        flex: 0.47
    },
    lefttHalfVieW: {
        flex: 0.53
    }
})