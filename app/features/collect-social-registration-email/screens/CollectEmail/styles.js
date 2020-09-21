import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";

const { Colors } = Theme;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 40,
  },
  txtInputStyle: {
    borderWidth: 1,
    borderColor: Colors.greyd9dcde,
  },
  separator: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: Colors.grey707070,
  },
  congratsHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  congratsHeaderText: {
    color: Colors.pulseRed,
    fontSize: 25,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: "300",
  },
  whatsYourEmail: {
    color: Colors.grey707070,
    fontSize: 23,
    fontWeight: "bold",
  },
  whatsYourEmailContainer: {
    marginTop: 20,
    marginBottom: 5,
  },
  personalisedContainer: {
    marginBottom: 15,
  },
  personalisedText: {
    color: Colors.grey707070,
    fontSize: 16,
    fontWeight: "200",
  },
  buttonContainer: {
    padding: 30,
    flex: 2.5,
    alignItems: "center",
  },
});
