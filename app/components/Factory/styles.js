import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 5,
    padding: 15,
  },
  image: {
    alignContent: "center",
    width: width - 10,
  },
  tile: {
    borderRadius: 5,
    margin: 5,
  },
  video: {
    backgroundColor: Colors.black222529,
    height: width * (9 / 16),
    width: width,
  },
});
