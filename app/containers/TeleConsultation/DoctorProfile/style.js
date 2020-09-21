/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from "react-native";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { colors } = CoreConfig;
export default styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    borderColor: colors.white,
    borderRadius: 63,
    borderWidth: 4,
    height: 130,
    marginBottom: 10,
    marginTop: 130,
    position: "absolute",
    width: 130,
  },
  backButton: {
    alignItems: "flex-start",
    height: 55,
    justifyContent: "center",
    width: 55,
  },
  body: {
    flex: 1,
    marginTop: 40,
  },
  docHeader: {
    alignItems: "center",
    flex: 1,
    marginBottom: 30,
    marginTop: 30,
  },
  doctorText: {
    color: colors.black,
    fontSize: 20,
  },
  header: {
    backgroundColor: colors.warmGray,
    height: 200,
  },
  image: {
    height: 20,
    left: 0,
    width: 20,
  },
  imageHeader: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 52,
    justifyContent: "space-between",
    paddingLeft: 11,
    paddingRight: 11,
    width: "100%",
  },
  logo: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 76,
  },
  logoImage: {
    height: 30,
    width: 60,
  },
  name: {
    color: colors.darkGrey,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 40,
    marginTop: 10,
    textAlign: "left",
  },
  textView: {
    alignItems: "center",
  },
});
