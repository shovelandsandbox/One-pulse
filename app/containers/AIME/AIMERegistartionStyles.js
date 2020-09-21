import { StyleSheet, Platform } from "react-native";

import { CoreConfig } from "@pru-rt-internal/pulse-common";

const { colors } = CoreConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: colors.crimson,
  },
  flexRow: {
    flexDirection: "row",
  },
  termsWrapper: {
   justifyContent :'flex-end',
   flex: 0.7,
   margin:10
 
  },
  checkBox: {
    padding: 10,
    paddingBottom :40,
  },
  label: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.silver,
    fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
  },
  contentContainer: {
    backgroundColor: colors.white,
  },
  description:{
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular", 
    color: "#6d6d6d",
    fontSize: 11,
    lineHeight:20
  },
  aimeLogo:{ 
    width: Platform.OS === "ios"?40:100, 
    height: Platform.OS === "ios"?18:40, 
  },
  textLogo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop:5,
  },
  aimeLogoImage: {
    height: 18,
    marginLeft: 2,
    marginRight: 2,
    width: 36,
  },
  poweredByText: {
    textAlign: "left",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    color: "#6d6d6d",
    fontSize: 11,
  },
});

export default styles;
