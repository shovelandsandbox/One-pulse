import { StyleSheet } from "react-native";

export default StyleSheet.create({
  questionText: {
    flex: 0.8,
    textAlign: "left",
    paddingVertical: 10,
    borderRadius: 7,
    color: "#2f2f2f",
    fontSize: 14,
    fontFamily: "Avenir-Roman",
    lineHeight: 18,
  },
  answerText: {
    paddingVertical: 10,
    color: "#707070",
    fontSize: 12,
    fontFamily: "Avenir-Book",
    lineHeight: 18,
  },
  container: {
    marginBottom: 10,
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
