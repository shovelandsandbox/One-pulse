import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "rgb(246,246,246)",
    flex: 1,
    position: "relative",
  },
  footerContainer: {
    bottom: 0,
    flexDirection: "column",
    padding: 15,
    paddingTop: 5,
  },
  footerImageStyle: { height: 50, resizeMode: "contain", width: 150 },
  footerText: { fontSize: 13, lineHeight: 24 },
});
