import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    paddingBottom: 14,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: "white",
  },
  helpContainer: { 
    alignSelf: "flex-end", 
    justifyContent: "center", 
    flexDirection: "row",
  },
  helpIcon: { 
    width: 18, 
    height: 18, 
  },
});
