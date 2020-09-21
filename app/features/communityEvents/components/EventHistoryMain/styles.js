import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  borderContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 5,
    marginTop: 5,
    padding: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dayTextStyle: {
    color: Colors.lightBlack,
    fontFamily: "Avenir-Medium",
    fontSize: 14,
  },
  line: {
    backgroundColor: Colors.lineColor,
    height: 1,
    marginTop: 10,
    width: "100%",
  },
  mainContainer: {
    flex: 1,
    overflow: "hidden",
    padding: 6,
    marginHorizontal: 6,
    marginVertical: 5,
  },
  subContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "yellow",
  },
});
