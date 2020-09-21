/* eslint-disable */
import { StyleSheet, Platform } from "react-native";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { colors } = CoreConfig;

export default (notificationRequestStyles = StyleSheet.create({
    base: {
        // backgroundColor: '#8ac5',
        // height: 90,
        // overflow:'visible',
        // marginBottom: 8,
    },
    title: {
        color: '#515B61',
        fontSize: 12,
        fontWeight: '900',
        lineHeight: 20,
        fontFamily: 'Avenir',
    },
    disabledTitle: {
        color: '#A7A8AA',
        fontSize: 12,
        fontWeight: '900',
        lineHeight: 20,
        fontFamily: 'Avenir',
    },
    cameraIconContainer:{
      alignItems: "center",
      backgroundColor: "transparent",
      justifyContent: "center",
      padding: 10,
      width: 30,
      bottom: 20,
      left: "90%",
      position: "absolute",
    },
    inputRect: {
      marginTop: 6,
      flex: 1,
      padding: 0,
      color:"#000"
    },
    profileInputRect: {
      marginTop: 6,
      flex: 1,
      padding: 0,
      color:"#000",
      fontSize: 12,
    },
    buttonToggle: {
        backgroundColor: "#ED1B2E",
        borderRadius: 4,
        width: 56,
        height: 17,
        marginLeft: 4,
        marginRight: 4,
        alignSelf: 'flex-end',
    },
    buttonText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        lineHeight: 20,
    },
    passwordToggle: {
        width: 20,
        marginLeft: 4,
        marginRight: 4,
        height: 17,
        alignSelf: 'flex-end',
    },
    passwordToggleImg: {
        flex: 1,
        tintColor: '#515b61',
    },
    profilePasswordToggleImg: {
      flex: 1,
      tintColor: '#afafaf',
    },
    profileHeaderTextColor: {
      color: "#afafaf",
      fontSize: 12,
      lineHeight: 20
    },
    subtitleText: { 
      marginTop: 6, 
      marginRight: 5, 
      lineHeight: 20,
    },
    presetValueText: {
      marginTop: 6,
      marginRight: 3,
      lineHeight: 20,
    },
    errorMessageStyle: {
      marginTop: 3,
      fontFamily: "Avenir",
      fontSize: 12,
      lineHeight: 20,
    }
}));
