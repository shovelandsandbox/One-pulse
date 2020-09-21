import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  avatar: {
    height: 66,
    width: 66,
  },
  avatarHeaer: {
    alignSelf: "center",
    borderRadius: 24,
    height: 48,
    width: 48,
  },
  avatarInner: {
    justifyContent: "center",
  },
  avatarWraper: {
    flexDirection: "row",
  },
  headLeft: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
  },
  headRight: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headWraper: {
    flexDirection: "row",
    height: 60,
    marginHorizontal: 20,
  },
  newLogo: {
    alignContent: "flex-end",
    alignSelf: "center",
    height: 28,
    width: 70,
  },
  textWraper: {
    flex: 1,
  },
  welcomeName: {
    color: "#515B61",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 2,
    marginLeft: 15,
  },
  welcomeText: {
    color: "#515B61",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 15,
    marginTop: 2,
  },
  welcomeWraper: {
    backgroundColor: "#ed1b2e",
    elevation: 5,
    flexDirection: "row",
    height: 56,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
