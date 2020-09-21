import { StyleSheet } from "react-native";
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  contactName: {
    color: "#2d2d2d",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: getLineHeight(12),
    marginLeft: 16,
  },
  contactView: {
    alignContent: "center",
    flex: 1,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  emailText: {
    color: "#9a9a9a",
    fontFamily: "Avenir-Roman",
    fontSize: 10,
    lineHeight: getLineHeight(10),
    marginLeft: 16,
  },
  imageView: {
    borderRadius: 33 / 2,
    height: 33,
    width: 33,
  },
  imgstyle: {
    borderRadius: 33 / 2,
    height: 33,
    width: 33,
  },
  redView: {
    backgroundColor: "#ec1c2e",
    borderRadius: 2,
    height: 9,
    width: 9,
  },
  selectedView: {
    alignItems: "center",
    borderColor: "#ec1c2e",
    borderRadius: 2,
    borderWidth: 0.3,
    height: 14,
    justifyContent: "center",
    width: 14,
  },
  unSelectedView: {
    borderColor: "#707070",
    borderRadius: 2,
    borderWidth: 0.3,
    height: 14,
    width: 14,
  },
});
