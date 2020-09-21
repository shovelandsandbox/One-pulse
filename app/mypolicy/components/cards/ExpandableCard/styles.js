import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "rgb(255,255,255)",
    backgroundColor: "#ffffff",
    borderRadius: 7,
    elevation: 2,
    marginBottom: 22,
    paddingBottom: 10.6,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  detailInfoTitle: {
    color: "rgb(47,47,47)",
    fontFamily: Platform.OS === "ios" ? "Avenir-Black" : "Avenir-Black-03",
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: "row",
    paddingBottom: 0.2,
    paddingTop: 13.8,
  },
  key: {
    color: "rgb(139,139,139)",
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Avenir-Regular",
    fontSize: 13,
    lineHeight: 15,
    flexWrap: 'wrap',
    paddingTop:5
  },
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 14.2,
    paddingRight: 5,
  },
  title: {
    color: "rgb(47,47,47)",
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    width: '85%',
    flexWrap: 'wrap'
  },
  value: {
    color: "rgb(47,47,47)",
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Avenir-Regular",
    fontSize: 14,
    lineHeight: 16,
    flexWrap: 'wrap',
    paddingTop:5
  },
});
