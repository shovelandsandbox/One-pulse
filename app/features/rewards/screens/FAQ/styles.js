import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  flatListView: {
    paddingTop: 20,
    paddingHorizontal: 20,
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
  }
});
