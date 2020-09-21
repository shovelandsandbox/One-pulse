import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fc",
  },
  flatlistStyles: { paddingTop: 10, elevation: 4 },
  descriptionStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  detailStyles: {
    padding: 5,
    fontSize: 14,
    color: "#393939",
  },
  crAmountStyles: {
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 5,
    color: "#169b3f",
  },
  debAmountStyles: {
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 5,
    color: "#9b1616",
  },
  imageStyles: { height: 30, width: 30 },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  debitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff5f5",
    paddingHorizontal: 16,
  },
  creditContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
