import { Platform } from "react-native";
const fonts = {
  fontFamilyRegular: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
  fontFamilyBold: Platform.OS == "ios" ? "PruSansNormal-Demi" : "pruSansBold",
  AvenirHeavy: "Avenir-Heavy",
  Avenir: "Avenir",
  fontFamilyAvenirRegular: Platform.OS === "ios" ? "Avenir" : "pru-regular",
  AvenirMedium: "Avenir-Medium",
  AvenirRoman: Platform.OS === "android" ? "AvenirLTStd-Roman" : "Avenir-Roman"
};

export default fonts;
