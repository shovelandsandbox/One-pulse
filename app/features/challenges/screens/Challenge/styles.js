import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";

const { Fonts, Colors } = Theme;

export const fontSize = {
  xLarge: 30,
  large: 18,
  small: 12,
  tiny: 10,
};

export const spacing = {
  tiny: 10,
  small: 12,
  base: 18,
  large: 20,
  xLarge: 22,
};

export const colors = {
  ...Colors,
  boldTextColor: "#2f2f2f",
  chartTitleBG: "#fedde1",
  chartAreaBG: "#ffecee",
  textColor: "#9f9f9f",
  unitTextColor: "#9a9a9a",
  mutedTextColor: "#898991",
  containerBGColor: "#f2f3f8",
};

export default StyleSheet.create({
  CONTAINER: {
    backgroundColor: colors.containerBGColor,
    flex: 1,
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  DISCLAIMER_TEXT: {
    marginBottom: 10,
    textAlign: "center",
  },
  MUTED_TEXT: {
    color: colors.mutedTextColor,
  },
  PRIMARY_TEXT: {
    color: Colors.pulseRed,
  },
  //these are utills style
  TEXT: {
    color: Colors.black,
    fontFamily: Fonts.Avenir,
    fontSize: 15,
  },
  activityChart: {
    marginTop: 10,
  },
});
