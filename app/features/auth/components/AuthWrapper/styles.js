import { Dimensions, StyleSheet } from "react-native";

const marginTop = Dimensions.get('window').height * 0.08;

export default StyleSheet.create({
  childrenContainer: {
    marginTop,
  },
  container: { 
    flex: 1, 
    backgroundColor: "#ffffff", 
  },
  languageText: {
    textAlign: "center",
    lineHeight: 36,
    fontSize: 14,
  },
})
