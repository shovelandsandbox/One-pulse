import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  radioView: {
    backgroundColor: "#fff",
    borderColor: "#e21a2c",
    height: 17,
    width: 17,
    borderWidth: 0.3,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  redView: {
    height: 10,
    backgroundColor: "#e21a2c",
    width: 10,
    borderRadius: 2,
  },
  text: {
    color: "#464646",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    marginLeft: 10,
  },
  whiteView: {
    height: 10,
    backgroundColor: "#fff",
    width: 10,
  },
});
