import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");
import { colors } from "@pru-rt-internal/pulse-common";

export default StyleSheet.create({
  actionImage: {
    height: 40,
    width: 35,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 2,
    height: 80,
    margin: 7,
    borderColor: 'red',
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: 80,
  },
  contentTitle: {
    color: colors.grey66,
    fontFamily: "Avenir",
    fontSize: 10,
    fontWeight: "200",
  },
  contentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  contentViewimage: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  statusCompleted: {
    color: colors.green,
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: "100",
    marginLeft: 4,
  },
  statusInProgress: {
    color: colors.yellow,
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: "100",
  },
  statusView: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15,
  },
  underline: { height: 3 },
});
