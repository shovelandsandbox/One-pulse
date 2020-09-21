import { StyleSheet, Dimensions, Platform } from "react-native";
import colors from "../../../themes/default/colors";
export const styles = StyleSheet.create({
  backButton: {
    height: 25,
    justifyContent: "center",
    left: 24,
    position: "absolute",
    top: 30,
    width: 25,
    zIndex: 100,
  },
  backButtonImage: {
    height: 12.5,
    width: 15,
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});
