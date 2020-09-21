import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    borderWidth: 0.3,
    height: "auto",
    justifyContent: "center",
    paddingLeft: 15,
    width: 120,
    alignSelf: 'stretch',
    backgroundColor: "#f5f6fa",
    borderColor:"#6e6e6e",
  },
  titleText:{
    color: "#212529",
    fontFamily: "Avenir-Black",
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "500",
  },
  subtitleText:{
    color: "#404040",
    fontFamily: "Avenir-Roman",
    fontSize: 8,
    lineHeight: 15,
  },
});
