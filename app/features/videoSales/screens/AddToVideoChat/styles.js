import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from "../../../../themes";
const { Colors, Fonts } = Theme;
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  headerBox: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    paddingBottom: 14,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: "white",
  },
  headerLayout: {
    color: Colors.grey343A40,
    fontFamily: Fonts.AvenirRoman,
    fontSize: 14,
    shadowColor: Colors.grey747474,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 14,
    marginTop: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
  },
  searchInput: {
    width: '88%',
    height: 35,
    backgroundColor: "#fff",
    textAlign: 'center',
  },
  searchAction: {
    height: 35,
    width: "12%",
    backgroundColor: "#ec1c2e",
    justifyContent: "center",
    alignItems: "center",
  },
  customTextStyles: {
    color: "#707070",
    fontSize: 17,
    paddingHorizontal: 10,
    marginTop: 80,
    marginBottom: 10,
  },
  callLogViewStyle: {
    marginTop: 13,
    marginHorizontal: 6.5,
    backgroundColor: "#fff",
  },
});
