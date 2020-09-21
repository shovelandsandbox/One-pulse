import { StyleSheet } from "react-native";
import { getLineHeight } from "../../utils/StyleUtils";

export default StyleSheet.create({
  cellName: {
    alignSelf: "center",
    color: "#434343",
    fontFamily: "Avenir-Light",
    fontSize: 14,
    lineHeight: getLineHeight(14),
    flex: 1,
    // height: 24
  },
  addSpacing: {
    marginLeft: 15,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 30.5,
    paddingVertical: 33,
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 0.3,
    justifyContent: "space-between",
    paddingRight: 18,
  },
  icon: {
    alignSelf: "center",
    height: 20,
    justifyContent: "flex-start",
    width: 18,
  },
  thirdView: {
    alignSelf: "flex-end",
  },
  firstView: {
    flexDirection: 'row',
    flex: 2,
  },
  secondView: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  thirdColumnText: {
    fontSize: 14,
    fontFamily: "Avenir",
    color: "#EC1B2E",
    // height: 20
  }
});
