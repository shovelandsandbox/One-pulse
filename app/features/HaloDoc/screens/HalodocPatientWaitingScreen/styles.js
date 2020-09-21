import { StyleSheet, Platform } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal4: {
    height: 300,
  },
  touchableImageStyle: {
    marginLeft: 20,
    height: 44,
    justifyContent: "center",
    width: 46
  },
  imageStyle: {
    width: 20,
    height: 20,
    marginLeft: 5
  },
  viewContainer: {
    marginTop:30,
    justifyContent: "center",
    alignItems: "center"
  },

  imageContainer: {
    height: 200,
    width: 200,
    borderWidth: 25,
    borderRadius: 100,
    borderColor: Colors.paleCornflowerBlueOp
  },
  docImage: {
    width: 150,
    height: 150,
    borderRadius: 80
    // overflow: "hidden",
  },
  
  message: {
    fontSize: 24,
    color: Colors.grey515B61,
    marginTop: 50,
    fontWeight: "400"
  },
  messageConfirm: {
    fontSize: 24,
    color: Colors.grey515B61,
    marginTop: 5,
    fontWeight: "400"
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15
  },
  requestMessage: {
    fontSize: 17,
    color: Colors.cello,
    marginTop: 30,
    paddingHorizontal: 20,
    textAlign: "center"
  },
  viewTimer: {
    flexDirection: "row",
    marginTop: 60
  },
  viewCancel: {
    flexDirection: "row",
    marginTop: 20
  },
  timer: {
    color: Colors.grey515B61,
    fontSize: 24,
    fontWeight: "bold"
  },
  timerText: {
    color: Colors.grey,
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
    marginTop: 8
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "ios" ? 20 : 0
  },

  ModalInsideView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey,
    height: 300,
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    opacity: 0.7
  },

  TextStyle: {
    fontSize: 20,
    marginBottom: 20,
    color: Colors.white,
    padding: 20,
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80
  },

  backImageStyle: {
    width: 20,
    height: 20,
    left: 0
  },

  backTouchableStyling: {
    width: 55,
    height: 55,
    alignItems: "flex-start",
    justifyContent: "center"
  },

  actionBarStyle: {
    width: "100%",
    height: 52,
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  haloDocImageContainerStyle: {
    width: 76,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  haloDocImageStyle: {
    width: 60,
    height: 30
  },
  haloDocGoBackModal:
  {
    width:150,
    alignItems:'center',
    alignSelf:'center'
  },
  scrollView:{
    backgroundColor: Colors.white,
    flex: 1 
  },
});
