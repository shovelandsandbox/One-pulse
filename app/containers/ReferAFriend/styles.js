import { StyleSheet } from "react-native";

import { Theme } from "../../themes";
const { Colors, Sizes, Fonts } = Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  equalShareContent: {
    flex: 1
  },
  equalShare2x: {
    flex: 2
  },
  showYourFriendsContainer: {
    flex: 1.5,
    alignItems: "center"
  },
  showYourFriendsImage: {
    width: 100,
    height: 100
  },
  qrCodeContainer: {
    flex: 2,
    alignItems: "center"
  },
  barCodeImage: {
    width: 120,
    height: 120
  },
  barCodeText: {
    textAlign: "center",
    paddingLeft: 70,
    paddingRight: 70
  },
  shareButtonContainer: {
    flex: 0.75,
    alignItems: "center"
  },
  alignHorizontally: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly"
  },
  invitedBackgroud: {
    backgroundColor: "#b75275"
  },
  joinedBackground: {
    backgroundColor: "#62b5d2"
  },
  rewardsBackground: {
    backgroundColor: "#8dd271"
  },
  stepsStyle: {
    backgroundColor: Colors.hkShade,
    borderColor: Colors.hkShade
  },
  stepsNumberStyle: {
    fontSize: 14
  },
  stepNameStyle: {
    fontSize: 14,
    width: 80
  },
  shareButton: {
    backgroundColor: Colors.hkShade
  }
});

export default styles;
