/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  buttonImage: {
    alignSelf: "center",
    height: 15,
    marginRight: 6,
    width: 18,
  },
  buttonText: {
    alignSelf: "center",
    color: "#ea2121",
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    lineHeight: getLineHeight(12),
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#FFFF",
    borderBottomWidth: 0.3,
    borderColor: "#dcdcdc",
    borderTopWidth: 0.3,
    height: 40,
    marginHorizontal: 0,
  },
  flatlistContent: {
    flex: 1,
    justifyContent: "space-around",
  },
  seperatorView: {
    backgroundColor: "#f7f7f7",
    width: 1,
  },
});
