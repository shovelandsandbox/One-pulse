import { Dimensions, StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

const Width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    backgroundColor: "#f2f6ff",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  currentHabits: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    height: "auto",
    paddingBottom: 12,
  },
  currentHabitsInnerContainer: {
    paddingTop: 8,
    justifyContent: "center",
    alignItems: "center",
  }, 
  inprogressHabits: {
    flexDirection: "row",
  },
  inprogressHabit: {

  },
  changeHabit: {
    color: "#e84c5a",
    fontSize: 12,
    lineHeight: 22.7,
    alignSelf: "center",
  },
  progressBar: {
    height: 13.3,
    backgroundColor: "#d5d5d5",
    position: "absolute",
    width: Width,

  },
  progressBarText: {
    color: "#3c3c3c",
    fontSize: 9.3,
    lineHeight: 11.3,
    fontWeight: "900",
    alignSelf: "center",
  },
  innerContainer: {
    paddingLeft: Width * 0.03,
    paddingRight: Width * 0.019,
  },
  availableHabits: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    marginBottom: 30,
    flex : 1,
  },
  addInProgressHabit: {
    borderRadius: 10,
    borderColor: "#c4c4c4",
    borderWidth:1,
    borderStyle: 'dashed',
    width: Width * 0.32,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 203,
    marginTop: 6,
  },
  crossUp: {
    backgroundColor: '#e84c5a',
    height: 14,
    width: 4,
  },
  crossFlat: {
    backgroundColor: '#e84c5a',
    height: 4,
    width: 14,
    position: "absolute",
    top: "49%",
    left: "45%"
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },  
  mainHeading: {
    color: "#e84c5a",
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 25,
    letterSpacing : 0.5
  },
  subHeading: {
    color: "#858585",
    fontSize: 12,
    lineHeight: 25,
  },
});
