import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@pru-rt-internal/pulse-common";

const window = Dimensions.get("window");
const width = window.width;

export default StyleSheet.create({
  cardViewStyle: {
    marginTop: 5
  },

  tileContainerStyle: {
    width: width * 0.35,
    display: "flex",
    height: 150,
    paddingHorizontal: 5,
    paddingVertical: 15,
    alignSelf: "center"
  },
  tileImageStyle: {
    width: 50,
    height: 50
  },

  tileTextStyle: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
    color: "#737579"
  }
});
