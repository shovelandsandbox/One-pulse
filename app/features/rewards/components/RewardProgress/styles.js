import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 5,
    height: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: "90%",
  },
  infoContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  infoText: {
    color: "#4d4d4d",
    flex: 1,
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: 14,
    marginLeft: 17,
  },
  progressView: { flex: 1, marginTop: 20 },
  teamIcon: {
    height: 72,
    width: 72,
  },
});
