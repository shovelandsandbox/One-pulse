import { Theme } from "../../themes";
const { Colors: colors } = Theme;
const fontFamily = "Avenir";

const Colors = {
  ...colors,
  boldHeader: "#2f2f2f",
};

const fontWeight = {
  Thin: "100",
  UltraLight: "200",
  Light: "300",
  Regular: "400",
  Medium: "500",
  Semibold: "600",
  Bold: "700",
  Heavy: "800",
  Black: "900",
};

const Styles = {
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
};

export { Colors, fontFamily, fontWeight, Styles };
