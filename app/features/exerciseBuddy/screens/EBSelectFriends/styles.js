import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  contentView: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerStyle: {
    paddingHorizontal: 0,
  },
  headerView: {
    backgroundColor: "#ffffff",
    elevation: 3,
    height: "auto",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  menuView: {
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },
});
