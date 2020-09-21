import { Dimensions, StyleSheet } from "react-native";
const width = Dimensions.get('window').width;

import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  container: {
    width: width * 0.85,
    paddingHorizontal: 23,
    paddingBottom: 17,
  },
  headerContainer: {
    marginVertical: 17,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "left",
    color: Colors.black,
  },
  body: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  bodyText: {
    fontSize: 10.7,
    lineHeight: 16.7,
    textAlign: "left",
    color: Colors.black,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    height: 32,
  },
  positiveButtonContainer: {
    backgroundColor: Colors.lightRed,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },
  postiveButtonText: {
    color: Colors.white,
  },
  negativeButtonText: {
    color: Colors.lightRed,
  },
});
