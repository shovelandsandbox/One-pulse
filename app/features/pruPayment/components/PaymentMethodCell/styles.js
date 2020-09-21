import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    height: 22,
    width: 33,
  },
  text: {
    color: "#515151",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
  },
  radioView: {
    backgroundColor: "#fff",
    borderColor: "#e21a2c",
    height: 20,
    width: 20,
    borderWidth: 0.3,
    borderRadius: 20 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  redView: {
    height: 10,
    backgroundColor: "#e21a2c",
    width: 10,
    borderRadius: 10 / 2,
  },
  whiteView: {
    height: 10,
    backgroundColor: "#fff",
    width: 10,
    borderRadius: 10 / 2,
  },
});
