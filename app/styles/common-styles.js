import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  
});

export default commonStyles;
export const commonStyles = {
  windowWidth: width,
  windowHeight: height,
  ...styles,
};
