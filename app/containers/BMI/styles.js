import { StyleSheet, Dimensions, Platform } from "react-native";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: "flex-start",
    flex: 1
  },
  cardHeader: {
    borderRadius: 10,
    width: "85%",
    elevation: 6,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowOffset: { height: 0, width: 0 },
  },
  cardContent: {
    flex: 0.8,
    width: "85%",
    backgroundColor: Colors.white,
    elevation: 6,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowOffset: { height: 0, width: 0 },
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 10
  },
  cardHeaderTitle: {
    height: 35,
    width: "100%",
    backgroundColor: Colors.green,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center"
  },
  cardHeaderTitleText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 20
  },
  cardContentTitleText: { 
    textAlign: "center", 
    color: Colors.black222529, 
    fontSize: 20
  },
  bmiResultsContent: {
    flex: 4,
    justifyContent: "space-evenly",
    marginLeft: "15%"
  },
  bmiResultLine: {
    flexDirection: "row",
    alignItems: "center"
  },
  bmiResultLineLabel: {
    flex: 1,
    textAlign: "left",
    color: "#acacac",
    fontSize: 18
  },
  heightTextContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center"
  },
  inputTextStyle: {
    fontSize: 15,
    height: 40,
    width: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#c7c7c7"
  },
  inputWeightStyle: {
    fontSize: 15,
    height: 40,
    width: 40, 
    borderBottomWidth: 1, 
    borderBottomColor: "#c7c7c7"
  },
  actionableActiveContainer: {
    backgroundColor: "#5fadf1", 
    borderRadius: 10, 
    width: 40
  },
  actionableInActiveContainer: {
    backgroundColor: Colors.white, 
    borderRadius: 10, 
    width: 40
  },
  actionActionActiveText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.white
  },
  actionActionInActiveText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.black
  },
  weightContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center"
  },
  bmiNumberDisplayContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  shareButtonStyle: {
    flexDirection: "row",
    height: 35,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.hkShade,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  // wrinkle index styles
  container: {
    backgroundColor: Colors.white,
    alignItems: "flex-start",
    flex: 1
},
shareButtonStyle: {
    flexDirection: "row",
    height: 35,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.hkShade,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
},
viewMoreTipsButton: {
    flexDirection: "row",
    height: 35,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.hkShade,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
},
vieMoreTipsText: {
    color: Colors.white,
    fontSize: 17
},
avatarContainer: {
    flex: 1,
    width: "80%",
    backgroundColor: Colors.white,
    elevation: 10,
    borderRadius: 20,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    alignItems: "center",
    justifyContent: "center"
},
infoText: {
    fontSize: 17,
    textAlign: "left",
    margin: 20,
    paddingLeft: 30,
    paddingRight: 10,
    fontFamily: Fonts.AvenirRoman
},
infoTextContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
},
wrinkleIndexText: {
    color: Colors.green,
    fontSize: 18,
    fontFamily: Fonts.AvenirRoman
}
});
