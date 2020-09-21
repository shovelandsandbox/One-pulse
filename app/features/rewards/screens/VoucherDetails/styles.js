import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#f4f7fc",
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  flatListView: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerStyle: {
    paddingHorizontal: 0,
  },
  headerView: {
    backgroundColor: "#ffffff",
    elevation: 3,
    height: "auto",
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  transactionDate: {
    color: "#2f2f2f",
    fontFamily: "Avenir-Black",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  transactionView: {
    paddingVertical: 10,
    marginBottom: 10,
  },
});
