
import { StyleSheet, Platform, Dimensions } from "react-native";

export default (loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer4: {
    paddingHorizontal: 40,
    alignItems:"center",
    paddingBottom:40
  },
  goRegisterBtn: {
    backgroundColor: "#fff",
    height: 44,
    width: 296,
    borderRadius: 22,
    borderColor: "#ED1B2E",
    borderWidth: 1,
    borderStyle: "solid"
  },
  goRegisterBtnText: {
    color: "#ED1B2E",

  },
}));
