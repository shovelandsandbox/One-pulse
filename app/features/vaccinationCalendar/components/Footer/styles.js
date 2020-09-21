import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#eb1b2e",
    flexDirection: "row",
    height: 58,
    justifyContent: "space-between",
  },
  reminderImage: {
    height: 11,
    width: 11,
  },
  reminderText: {
    color: "#fff",
    fontFamily: "Avenir-Black",
    fontSize: 14,
    lineHeight: 28,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "600"
  },
  reminderView: {
    alignItems: "center",
    flexDirection: "row",
  },
  dateText: {
    color: "#fff",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    lineHeight: 28,
  },
  VaccineText: {
    color: "#fff",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    lineHeight: 28,
    fontWeight: "800"
  },
  dateView: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 15,
  },
});
