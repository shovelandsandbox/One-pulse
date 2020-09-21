import { StyleSheet, Platform, Dimensions } from "react-native";
import { Theme } from "../../../../themes";
import { scale } from "../../../../utils/Scale";
const { Colors } = Theme;

const styles = StyleSheet.create({
  deleteAlertContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    width: scale(280),
  },
  deleteAlertIcon: { width: 100 },
  deleteAlertTitle: {
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    color: "#2f2f2f",
  },
  deleteAlertDesc: {
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    color: "#707070",
  },
  deleteConfirmActions: {
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
  },
  delete: { width: 160, borderRadius: 30 },
  noButton: {
    alignItems: "center",
    borderRadius: 3.3,
    height: 31.3,
    justifyContent: "center",
    width: 99.7,
  },
  noText: {
    color: Colors.redec1c2e,
    fontSize: 12,
    fontWeight: "normal",
  },
  addButton: {
    alignItems: "center",
    borderRadius: 100 / 2,
    flex: 1,
    height: 50,
    justifyContent: "center",
    marginRight: 10,
    position: "absolute",
    right: 0,
    top: 0,
    width: 50,
  },
  dateText: {
    fontSize: 16,
    color: "#2f2f2f",
    marginLeft: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
});
export default styles;
