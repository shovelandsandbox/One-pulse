import { StyleSheet } from "react-native";
import colors from "../../../../themes/default/colors";

export default StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    borderRadius: 19.7,
    height: 36,
    marginTop: 10,
    width: 106,
  },
  buttonGradient: {
    alignItems: "center",
    borderRadius: 19.7,
    height: 36,
    justifyContent: "center",
    width: 106,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  create: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 13,
    lineHeight: 15,
    textAlign: "center",
    width: 218,
  },
  imageBackground: {
    flex: 1,
  },
  imageStyle: {
    height: "100%",
    resizeMode: "cover",
  },
  onBoarding: {
    alignSelf: "center",
    height: 45,
    marginTop: 90,
    width: 45,
  },
  onBoardingText: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 21,
    marginTop: 10,
    textAlign: "center",
    width: 218,
  },
  settings: {
    height: 17.1,
    width: 17.1,
  },
});
