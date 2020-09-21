import { StyleSheet, Platform } from "react-native";
import { colors } from '@pru-rt-internal/pulse-common';

export const AIMEDengueAlertStyles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    Header: {
        flexDirection: "row",
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 7,
        justifyContent: "space-between",
    },
    BackImage: {
        height: 18,
        width: 18,
        margin: 5,
    },
    logo: {
        marginHorizontal: 5,
        width: 50,
        height: 30,
        resizeMode: "contain"
    },

    CoutryDropDown: {
        height: 35,
        width: 130,
        borderRadius: 4,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
        paddingLeft: 10,
        paddingRight: 7,
        flexDirection: "row",
        borderColor: "gray",
        borderWidth: 0.5,
    },
    CategoryDropDown: {
        height: 35,
        width: 100,
        borderRadius: 4,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 10,
        borderColor: "gray",
        borderWidth: 0.5,
        flexDirection: "row",
    },
    LocationImage: {
        height: 14,
        width: 10,
    },
    DropDownImage: {
        height: 8,
        width: 12,
    },
    ZoomImageMainContainer: {
        height: '5%',
        width: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: '5%',
        marginBottom: '7%'
    },
    ZoomImageContainer: {
        backgroundColor: 'white',
        height: 30,
        width: 35,
        borderRadius: 2,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ZoomImage: {
        height: 12,
        width: 12,
        margin: 2,
        padding: 2,
    },
    TextStyle: {
        fontSize: 18,
        textAlign: 'left',
        margin: 5,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    MapContainer: {
        flex: 1,
    },
    MyMapView: {
        height: '100%',
        width: '100%',
    },
    BackStyle: {
        top: 10,
        left: 10,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    OutBreaksContainerStyle: {
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: "space-around"
    },
    NewOutBreaksContainerStyle: {
        borderRightWidth: 0.5,
        paddingRight: "4%",
        borderColor: "#c2c2c2"
    },
    GraphText: {
        fontSize: 18,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    OutbreaksTxtStyle: {
        fontSize: 15,
        paddingVertical: 2,
        color: "#c2c2c2",
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    ThisWeekTxtStyle: {
        paddingRight: "10%",
        color: "#d9d9d9",
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    AreaChartStyle: {
        height: 40,
        alignSelf: 'stretch',
        width: 100
    },
    DeathWeekTextStyle: {
        color: "#d9d9d9",
        paddingLeft: 10,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    DeathAreaChartStyle: {
        height: 20,
        width: 60,
        paddingLeft: 10
    },
    DeathContainerStyle: {
        borderLeftWidth: 0.5,
        borderColor: "#c2c2c2",
        paddingLeft: 10
    },
    HologramContainerStyle: {
        marginVertical: 15,
        flexDirection: "column",
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    HologramTextContainerStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    HologramText: {
        fontSize: 20,
        justifyContent: "flex-start",
        paddingTop: 10,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    HologramDropDownStyle: {
        justifyContent: 'space-evenly',
        borderColor: "gray", borderWidth: 0.5,
        height: 35,
        width: 110,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: 'center',
    },
    BarChartAlertStyle: {
        paddingVertical: 20,
        justifyContent: 'center'
    },
    BarChartStyle: {
        height: 80,
        borderBottomWidth: 0.5,
        borderBottomColor: "#c9c9c9"
    },
    MonthTextViewStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingHorizontal: 10
    },
    CompBarContainerStyle: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    CompBarViewStyle: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    ComBarTextContainerStyle: {
        flexDirection: 'column',
        alignSelf: 'flex-start'
    },
    CompBarMainTextStyle: {
        fontSize: 18,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    CompBarTextStyle: {
        fontSize: 16,
        color: '#c9c9c9',
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    CompBarDropdownStyle: {
        justifyContent: 'space-evenly',
        borderColor: "gray",
        borderWidth: 0.5,
        height: 35,
        width: 110,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: 'center',
    },
    CompBarSubContainerStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    ComBarStyle: {
        alignSelf: "flex-start",
        paddingTop: 8,
        width: "80%"
    },
    CompBarNoView: {
        alignSelf: "flex-end",
        paddingRight: 20
    },
    CompBarNoText: {
        fontSize: 20,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    CompBarNameTextStyle: {
        fontSize: 16,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold"
    },
    ModelStyle: {
        backgroundColor: "rgba(0,0,0,0.7)",
        margin: 0
    },
    ModelViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative"
    },
    ModelImageContStyle: {
        width: "80%",
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    ModelImageTouchStyle: {
        padding: 10
    },
    ModelImageStyle: {
        width: 16,
        height: 16
    },
    LimitedTxtContStyle: {
        width: "80%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    LimitedTxtStyle: {
        color: "#515B61",
        fontSize: 14,
        fontWeight: '900',
        lineHeight: 16,
        fontFamily: 'Avenir',
        textAlign: 'justify'
    },
    ProceedTextContStyle: {
        alignItems: "center",
        backgroundColor: colors.crimson,
        borderColor: colors.crimson,
        borderWidth: 1,
        borderRadius: 22,
        height: 40,
        marginTop: 20,
        justifyContent: "center"
    },
    ProceedTextStyle: {
        color: colors.white,
        fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
        fontSize: 13,
        letterSpacing: 1.07,
        paddingHorizontal: 20,
        lineHeight: 15
    }

});