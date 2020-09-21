import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  bgColor: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  dayTextStyle: {
    color: Colors.lightBlack,
    fontFamily: "Avenir-Medium",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  dismissIcon: {
    height: 20,
    width: 20,
  },
  mediaPlayer: {
    backgroundColor: Colors.black,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 40,
  },
  modalStyle: {
    backgroundColor: Colors.black,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});
