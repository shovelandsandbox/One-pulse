import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 7
  },
  headingContainer: {
    paddingHorizontal: 17,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  heading: {
    fontSize: 16,
    color: "#ec1c2e"
  },
  contactContainer: {
    marginTop: 13,
    marginHorizontal: 6.5,
    backgroundColor: "#fff",
  },
  conversationTime: {
    fontSize: 9.3,
    lineHeight: 12.7,
    paddingLeft: 2,
    color: "#858c94",
  },
  contactTile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  contactTileName: {
    color: "#707070",
    fontSize: 11.3,
    fontWeight: "bold",
    lineHeight: 16
  },
  contactTileDate: {
    color: "#707070",
    fontSize: 10,
    lineHeight: 14
  },
  contactEmail: {
    fontSize: 12,
    color: "#858c94"
  },
  contactFullName: {
    fontSize: 14,
    color: "#414141"
  },
  dateContainer: {
    paddingRight: 4,
    alignItems: "center",

  },
  conversationDate: {
    fontSize: 9.3,
    lineHeight: 12.7,
    fontWeight: "bold",
    color: "#414141",
  },
  conversationDuration: {
    fontSize: 12,
    color: "#858c94"
  },
  arrowIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain"
  },
  itemSeperator: {
    marginVertical: 15,
    backgroundColor: "#f4f7fc",
    height: 2,
    width: "100%"
  },
  cardViewStyle: {
    minWidth: 200,
    height: 60,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 8
  },
  btnShadowContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  },
  search: {
    marginHorizontal: 10,
    width: 20,
    height: 20
  }
});
