import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  customStyles: {
    height: 45,
  },
  welcomeContainer: { 
    height: "auto", 
    width: "100%", 
    paddingVertical: 14, 
    paddingHorizontal: 16.7, 
    borderBottomColor: "#d1d1d1", 
    borderBottomWidth: 0.3 ,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#f8f8f8",
  },
  welcomeHeadingContainer: { 
    justifyContent: "flex-start",
    alignItems: "flex-start", 
  },
  welcomeText: { 
    color: "#ec1c2e", 
    fontSize: 14, 
    lineHeight: 21.3, 
    textAlign: "center", 
    fontWeight: "900", 
    fontWeight: "bold",
    width: 230, 
  },
  welcomeImageContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
  welcomeDescriptionTextContainer: { 
    marginTop: 9,
  },
  welcomeDescriptionText: { 
    color: "#000000",
    fontSize: 10.7, 
    lineHeight: 15, 
  },
});
