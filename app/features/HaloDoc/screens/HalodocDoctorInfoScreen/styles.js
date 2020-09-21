import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const window = Dimensions.get("window");
const width = window.width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 20
  },

  actionBarStyle: {
    flexDirection: "row",
    height: 54,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 5
  },

  backImageStyle: {
    width: 20,
    height: 15
  },

  actionBarRightContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // width: 120
  },
  haloDocImageStyle: {
    width: 60,
    height: 30
  },

  docImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  appBtn: {
    borderRadius: 25,
    height: 50,
    width: 200
  },
  docInfoContainerStyle: {
    marginTop: 5,
    paddingHorizontal: 20,
    marginLeft: 10,
    marginRight: 10
  },
  docNameStyle: {
    color: Colors.Fiord,
    fontSize: 28,
    fontWeight: "400",
    maxWidth: width * 0.7,
    marginTop: 15
  },
  likeImageStyle: {
    // height: 14,
    width: 18,
    height: 18
    // marginTop: 4
  },

  likeTextStyle: {
    fontSize: 16,
    fontWeight: "400",
    maxWidth: width * 0.7,

    color: Colors.Fiord,
    marginLeft: 4
  },

  briefcaseImageStyle: {
    height: 15,
    width: 15,
    marginLeft: 10
  },
  HaloDocImageStyle: {
    height: 25,
    width: 22,
    marginRight: 5
  },
  HaloDocEducationIcon: {
    height: 20,
    width: 22,
  },

  experienceContainerStyle: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center"
  },

  lightExperienceTextStyle: {
    color: Colors.greyChateau,
    fontSize: 13,
    fontWeight: "200",
    marginLeft: 4
  },

  docSpeStyle: {
    color: Colors.cello,
    fontSize: 16,
    fontWeight: "400",
    maxWidth: width * 0.9,
    marginTop: 10
  },

  btn: {
    alignSelf: "center",
    // margin: 10,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  primary: {
    backgroundColor: Colors.pulseRed
  },
  appContainerStyles: {
    // flex: 1,
    // position: "absolute",
    marginTop: 200
  },

  reqButtonTextStyle: {
    color: Colors.white,
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,

  },
  mainContainer: {
    backgroundColor: Colors.ghostWhiteOpacity,
    marginTop: 15,
  },

  containerDetails: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 10,
  },
  graducatedFromText: {
    fontSize: 18,
    marginLeft: 5,
    color: Colors.FiordRGB,
  },
  educationText: {
    marginLeft: 2,
    marginTop: 5,
    color: Colors.greyChateau,
  },

  practicePlace: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 10,
  },
  practicePlaceText: {
    fontSize: 18,
    marginTop: 5,
    color: Colors.FiordRGB
  },
  localityText: {
    marginLeft: 2,
    marginTop: 5,
    color: Colors.greyChateau,
  },
  paymentView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 10,
  },
  paymentText: {
    fontSize: 18,
    marginTop: 5
  },
  consultationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  consultationText: {
    marginLeft: 2,
    marginTop: 5,
    color: Colors.greyChateau,
  },
  priceText: {
    fontSize: 18,
    color: Colors.pulseRed,
    marginTop: 5,
    fontWeight: "500",
  }
});
