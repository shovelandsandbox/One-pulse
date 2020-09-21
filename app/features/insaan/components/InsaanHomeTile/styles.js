/* eslint-disable */
import { StyleSheet} from "react-native";

export const InsaanHomeTile = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        // justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20
      },
      prayerText: {
        color: '#ffffff',
        fontSize: 24,
        fontFamily: 'Avenir',
        marginBottom: 10
      },
      container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
      },
      prayerTrackStyle: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Avenir'
      },
      button: {
        backgroundColor: '#ed1b2c',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 25,
        paddingVertical: 10
      },
      modalContainer: {
        flex: 1,
        backgroundColor: "rgb(246,246,246)",
        position: "relative"
      },
      modalView1: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#000c",
        justifyContent: "center"
      },
      modalView2: {
        marginHorizontal: "2.5%",
        alignSelf: "center",
        borderRadius: 12,
        overflow: "hidden"
      },
      compassStyle:{ 
        marginRight: 10, 
        marginBottom: 10, 
        width: 40, 
        height: 40, 
        aspectRatio: 1, 
        borderRadius: 155, 
        alignSelf: "center", 
        alignItems: "center", 
        justifyContent: "center"
      },
      fixedStyle:{
        position: "absolute",
        width: 5,
        height: 5
      }
});