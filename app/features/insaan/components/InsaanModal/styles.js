/* eslint-disable */
import { StyleSheet, Dimensions,} from "react-native";
const sw = Dimensions.get("window").width;

export const InsaanModalStyle = StyleSheet.create({
    container1: {
        backgroundColor: "#fff",
        width: sw * 0.85
        },
        container2: {
          height: 450
        },
        backgroundStyle: { 
          width: "100%", 
          height: "90%" 
        },
        container3: { 
          flexDirection: "column", 
          alignContent: "center" 
        },
        prayerTypeText: {
          marginLeft: 20,
          marginTop: 10,
          color: "#fff",
          fontFamily: "Avenir",
          fontSize: 18,
        },
        nptsText: {
          marginRight: 15,
          color: "#fff",
          fontFamily: "Avenir",
          fontSize: 16,
          marginLeft: 20,
        },
        closeAction: {
          position: "absolute",
          top: 0,
          right: 10,
          width: 40,
          height: 40,
          zIndex: 5,
          justifyContent: "center"
        },
        closeStyle: {
          alignSelf: "center",
          tintColor: "#fffe"
        },
        container4: { 
          borderWidth: 0.1,
          marginTop: "50%", 
          width: "60%", 
          marginLeft: "auto", 
          marginRight: "auto" 
        },
        countDownStyle: {
          color: "black",
          fontFamily: "Avenir",
          fontSize: 25,
          textAlign: "center",
        },
        compass: {
          marginTop: 30,
          marginBottom: 30,
          width: 90,
          height: 90,
          aspectRatio: 1,
          borderRadius: 155,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center"
        },
        insaanFixed: {
          position: "absolute",
          width: 50,
          height: 50
        },
        qiblaStyle: {
          marginBottom: 15,
          height: 22,
          color: "#68737a",
          fontFamily: "Avenir",
          fontSize: 16,
          fontWeight: "900",
          textAlign: "center"
        }
});