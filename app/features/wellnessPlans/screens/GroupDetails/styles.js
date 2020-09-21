import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  progressText: {
    fontSize: 13.3,
    fontWeight: "900",
    color: "#393939",
    marginHorizontal: 20,
    marginVertical: 14,
  },
  TopTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 20,
    marginTop: 20,
  },
  TabUnderline: {
    backgroundColor: "#ec1c2e",
    height: 3,
    width: "100%",
  },
  bottomTabContainer: {
    bottom: 20,
    left: 0,
    position: "absolute",
    right: 0,
    backgroundColor: "#FFF",
  },
  bottomTabLastItem: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomTabList: {
    flex: 1,
    justifyContent: "center",
  },
  bottomTabSelectedItem: {
    backgroundColor: "#ec1c2e",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  bottomTabSelectedStyle: {
    color: "#ffffff",
    fontSize: 12,
  },
  bottomTabStartItem: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomTabUnselectedItem: {
    backgroundColor: "#FFF",
    borderColor: "#b5b5b5",
    borderWidth: 0.3,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  bottomTabUnselectedStyle: {
    color: "#828282",
    fontSize: 12,
  },
  comingSoon: {
    alignItems: "center",
    height: 560,
    justifyContent: "center",
  },
  comingSoonText: { fontSize: 20 },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  flatlistContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: { flex: 1, marginBottom: 60 },
  selectedTabText: {
    color: "#ec1c2e",
    fontSize: 16,
    fontWeight: "900",
    paddingBottom: 4,
  },
  tabItem: { marginHorizontal: 14 },
  tabUnderlineTransparent: {
    backgroundColor: "transparent",
    height: 2,
  },
  titleIconImage: {
    height: 14,
    width: 22,
  },
  titleIconWrapper: {
    alignItems: "center",
    backgroundColor: "red",
    borderColor: "#FFF",
    borderWidth: 2,
    elevation: 3,
    justifyContent: "center",
  },
  titleText: {
    color: "#393939",
    fontSize: 13.3,
    paddingHorizontal: 10,
  },
  titleWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 14,
  },
  unSelectedTabText: {
    color: "#8d8d8d",
    fontSize: 14,
  },
});
