import { StyleSheet } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderBottomColor: Colors.grey1a1a1a,
    borderBottomWidth: 1,
    padding: 2,
  },
  header: {
    marginTop: 5,
  },
  headerText: {
    color: "#515B61",
    fontFamily: "Avenir-Heavy",
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
