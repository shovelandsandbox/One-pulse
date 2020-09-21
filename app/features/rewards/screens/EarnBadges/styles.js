import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  flatListView: {
    marginTop: 10,
  },
  headerStyle: {
    paddingHorizontal: 0,
    paddingTop: 17,
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
  contentView: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
    height: "auto",
    marginBottom: 20,
    marginHorizontal: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  separatorComponent: {
    height: 1,
    backgroundColor: "#b5b0b0",
  },
});
