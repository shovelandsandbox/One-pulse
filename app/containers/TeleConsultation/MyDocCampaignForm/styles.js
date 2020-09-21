import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  scrollContainer: {},
  backContainer: {
    borderBottomWidth: 0.2,
    shadowColor: "#e2e2e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: "#fff",
  },
  offerContainer: {
    shadowColor: "#e2e2e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  formContainer: {
    paddingHorizontal: 50,
  },
  buttonContainer: {
    marginBottom: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  textFieldLabel: {
    marginTop: -7,
    paddingTop: 7,
    lineHeight: 28,
  },
});

export default styles;
