/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  clearText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Roman",
    fontSize: 13,
    lineHeight: 25,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
  },
  pulseConnectContainer: {
    backgroundColor: "white",
    flex: 1    
  },
  filterView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  flatlistContainer: {
    paddingBottom: 10,
  },
  flatlistView: {
    marginTop: 10,
  },
  flatlistViewWithSpace: {
    marginBottom: 60,
    marginTop: 10,
  },
  headerStyle: {
    height: 60,
    paddingHorizontal: 0,
    // paddingTop: 17,
  },
  inviteButton: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 26,
    bottom: 18,
    height: 53,
    justifyContent: "center",
    marginHorizontal: 20,
    position: "absolute",
    width: "100%",
  },
  inviteText: {
    color: "#fff",
    fontFamily: "Avenir-Roman",
    fontSize: 14,
    lineHeight: 25,
  },
  noContactsBody: {
    alignItems: "center",
    justifyContent: "center",
  },
  noContactsText: {
    fontFamily: "Avenir-Roman",
    fontSize: 15,
    lineHeight: 25,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  searchText: {
    flex: 1,
    marginLeft: 10,
  },
  searchView: {
    alignItems: "center",
    backgroundColor: "#fcfcfc",
    borderRadius: 7,
    flexDirection: "row",
    height: 36,
    marginTop: 20,
    paddingLeft: 12,
  },
  selectText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Roman",
    fontSize: 13,
    lineHeight: 25,
    marginLeft: 25,
  },
  skipText: {
    color: "#ec1c2e",
    fontFamily: "Avenir-Roman",
    fontSize: 13,
    lineHeight: 25,
  },
  skipView: {
    position: "absolute",
    right: 15,
    top: 17,
  },
  tabStyle: {
    backgroundColor: "#fff",
    height: 35,
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d9d3d3",
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 30,
    paddingVertical: 5
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 10
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 25,
    color: "#888888"
  }
});
