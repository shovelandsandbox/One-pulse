import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
import colors from "../../utils/colors";
export default StyleSheet.create({
  container: {
    height: "auto",
    marginVertical: "2%",
    paddingHorizontal: width * 0.05,
    width,
  },
  descriptionContainer: {
    width: "100%",
  },
  descriptionText: {
    color: "#6a6a6a",
    fontSize: 10.7,
    lineHeight: 18,
  },
  detailContainer: {
    padding: 6.7,
    paddingRight: 12,
    width: "75%",
  },
  footer: {
    flexDirection: "row",
    height: 30,
    justifyContent: "flex-end",
    marginTop: 5,
  },
  footerContinueButton: {
    width: 95,
  },
  footerDetailButton: {
    color: "#ec1c2e",
    fontSize: 10.7,
    marginTop: 4,
  },
  footerStartButton: {
    height: 26.7,
    marginLeft: 12,
    paddingHorizontal: 2,
    width: 60.7,
  },
  footerStartText: {
    fontSize: 10.7,
    margin: 2,
    marginTop: 3,
    lineHeight: 18,
  },
  image: {
    height: 100,
    width: 100,
  },
  innerContainer: {
    borderRadius: 10,
    height: 100,
    width: width * 0.9,
  },
  lastChild: {
    marginBottom: "10%",
  },
  levelDescriptionContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  marginOne: { marginLeft: 1 },
  noPadding: {
    padding: 0,
  },
  progressContainer: { borderRadius: 6.7, height: 6.7, width: "100%" },
  repsStatusText: {
    color: colors.modalTitle,
    fontSize: 10.7,
    lineHeight: 12.7,
    marginTop: 3.3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    color: "#363636",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 20,
    textAlign: "left",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
