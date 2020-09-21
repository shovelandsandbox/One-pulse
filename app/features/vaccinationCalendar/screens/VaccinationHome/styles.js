import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomView: {
    bottom: 23,
    paddingHorizontal: 30,
    position: "absolute",
    width: "100%",
  },
  container: { flex: 1, backgroundColor : "#ffffff" },
  continueButton: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 12,
    padding: 5,
    width: "80%",
  },
  continueText: {
    color: "#fff",
    fontFamily: "Avenir",
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  profilesView: {
    flex: 1,
    marginBottom: 40,
    marginHorizontal: 30,
    marginTop: 5,
  },
  startRoundedButton: {
    width: "100%",
  },
  subText: {
    color: "#393939",
    fontFamily: "Avenir-Roman",
    fontSize: 15,
    lineHeight: 18,
    marginHorizontal: 20,
    marginVertical: 14,
  },
});
