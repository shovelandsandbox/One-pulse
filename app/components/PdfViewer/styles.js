import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
  headerBody: {
    alignItems: "center",
    flex: 0.8,
    justifyContent: "center",
  },
  headerLeftView: {
    alignItems: "center",
    flex: 0.1,
    justifyContent: "center",
  },
  headerRightContainer: {
    alignItems: "center",
    flex: 0.1,
    justifyContent: "center",
    paddingRight: 8,
  },
  headerRightImg: { height: 35, width: 35 },
  headerTitle: { color: "#FFFFFF", fontSize: 18 },
  pdf: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  pdfContainer: { backgroundColor: "#EE172A", flex: 1 },
  pdfHeaderContainer: {
    backgroundColor: "#EE172A",
    flexDirection: "row",
    height: 48,
    width: "100%",
  },
});
export default Styles;
