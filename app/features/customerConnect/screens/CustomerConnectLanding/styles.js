import { StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../../utils/Scale";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  emptyMessage: {
    color: Colors.gray3f,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headerShadow: {
    borderRadius: 0,
    padding: 0,
  },
  noContentImage: {
    height: verticalScale(400),
    width: scale(240),
  },
  noContentWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalSecondView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: scale(160),
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: scale(290),
  },
  rightActionContainer: {
    flexDirection: "row",
  },
  rightActionIcon: {
    paddingRight: 0,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 20,
  },
  touchableView: {
    width: "40%",
    borderColor: Colors.red,
    borderWidth: 2,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    color: Colors.red,
  },
  createTouchable: {
    width: "40%",
    backgroundColor: Colors.red,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  white: {
    color: Colors.white,
  },
  bgA0Gray: {
    backgroundColor: Colors.bgA0Gray,
  },
  modalTopView: {
    alignItems: "center",
    backgroundColor: "#000c",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});

export default styles;
