import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex: {
    display: 'flex'
  },
  flexRow: {
    flexDirection: 'row',
    flex: 1
  },
  flexColumn: {
    flexDirection: 'column',
    flex: 1
  },
  headerContainer: {
    height: 80,
    backgroundColor: "#FFF",
    flexDirection: "row",
    elevation: 2,
    borderBottomWidth: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  backContainer: {
    flex: 0.5, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  wordContainer: { 
    flex: 3, 
    justifyContent: 'center', 
    padding: 5 
  },
  allReadContainer: { 
    flex: 2, 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    paddingRight: 10,
    fontSize: 16 
  },
  backButton: { 
    width: 20, 
    height: 20 
  },
  word: { 
    fontSize: 16, 
    color: '#000' 
  },
  allRead: { 
    fontSize: 13, 
    color: "#ed1b2e" 
  }
});
