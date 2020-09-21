import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: {
    height: 98,
    width: 75,
    paddingTop: 6,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    backgroundColor: "rgba(255,255,255, 1)",
    margin: 2,
    borderRadius: 7,
    marginRight: 15,
  },
  countText: {
    fontFamily: "Avenir-Black",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
    color: "#4d4d4d",
  },
  nameText: {
    fontFamily: "Avenir-Roman",
    fontSize: 11,
    lineHeight: 13,
    marginTop: 5,
    color: "#888888",
  }
});
