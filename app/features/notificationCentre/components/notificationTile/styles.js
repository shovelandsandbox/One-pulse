import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({

  actionBtn: {
    borderRadius: 4,
    backgroundColor: "#68737a",
    fontSize: 10,
    height: 20,
    width: 120,
  },
  instructions: {
    color: "#68737a",
    fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 5,
    textAlign: "left",
  },
  titleContainer: {
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  titleContainerText: {
    color: "#414141",
    fontSize: 14,
  },
  htmlContainerStyle: {
    padding: 0,
    margin: 0,
  },
  notificationTileContainer: {
    height: 'auto',
    borderRadius: 10,
    flex: 1,
    paddingTop: 11,
    paddingBottom: 5,
    paddingHorizontal: 5.5,
    marginBottom: 10
  },
  unReadStyles: {
    borderLeftWidth: 3.3,
    borderLeftColor: "#ed1b2e",
    borderTopWidth: 0.3,
    borderTopColor: "#cbcbcb",
    borderRightColor: "#cbcbcb",
    borderRightWidth: 0.3,
    borderBottomColor: "#cbcbcb",
    borderBottomWidth: 0.3
  },
  readStyles: {
    borderWidth: 0.3,
    borderColor: "#cbcbcb"
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  buttonContainer: { 
    backgroundColor: "#ed1b2e", 
    color: "#fff", 
    padding: 4, 
    borderColor: '#cbcbcb', 
    borderWidth: 0.4, 
    borderRadius: 6, 
    marginBottom: -4 ,
    width: 90
  },
  buttonContainerText: { 
    color: "#fff", 
    fontSize: 10, 
    fontWeight: 'bold' ,
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    textAlign: "center"
  },
  dateTextStyle: {
    color: "#343434",
    fontSize: 9.3,
  },
  arrowImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  arrowImage: {
    height: 15,
    width: 15 
  }
});
