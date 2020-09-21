import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  letsgoButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 108.3,
    borderRadius: 19.7,
  },
  noButton: {
    alignItems: "center",
    borderRadius: 3.3,
    height: 31.3,
    justifyContent: "center",
    width: 99.7,
  },
  noText: { 
    color: Colors.redec1c2e,
    fontSize: 12,
    fontWeight: "normal",
  },
  letsgoButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 14.7,
    marginVertical: 13.3,
  },
  flatlistContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    alignItems: "center"
  },
  habitDisabledText: {
    color: "#2f2f2f",
    opacity: 0.63
  },
  habitDisabledImage: {
    opacity: 0.63
  },
  habitSelectedItem: {
    backgroundColor: "#ffffff",
    elevation: 4,
    margin: 4,
    borderColor: "#e31b2c",
    borderRadius: 6.7,
    borderStyle: "solid",
    borderWidth: 0.3
  },
  habitItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 95,
    height: 100,
    paddingVertical: 10
  },
  container: {
    backgroundColor: Colors.white,
    flexDirection: "row"
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16.6,
    paddingTop: 16.7,
    borderRadius: 3.3,
    paddingBottom: 16.7
  },
  image: {
    height: 92.7,
    width: 146.7,
    borderRadius: 3.3,
    resizeMode: "cover"
  },

  titleText: {
    fontSize: 14,
    color: Colors.white
  },
  rewardContainer: {
    justifyContent: "flex-end",
    flex: 0.8
  },
  titleContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderRadius: 3.3,
    height: "auto",
    width: width * 0.9,
    padding: 16.7
  },
  imageStyle: {
    borderRadius: 3.3,
    height: 60,
    width: 60
  },
  shareTextStyle: {
    fontSize: 10,
    color: Colors.redec1c2e
  },
  titleStyle: {
    paddingHorizontal: 4,
    fontSize: 10,
    color: Colors.redec1c2e,
    fontWeight: "bold",
    marginTop: 4.7,
    lineHeight: 16,
    textAlign: "center"
  },
  Customtitle: {
    fontSize: 10.7,
    color: "#bdbdbd",
    marginLeft: 3
  },
  headerText: {
    fontSize: 14,
    color: "#2F2F2F",
    lineHeight: 16.3
  },
  imageContainer: {
    marginTop: 19.3
  },
  selectReminderContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  reminderText: {
    color: "#2f2f2f",
    fontSize: 11.3,
    lineHeight: 12.3
  },
  reminderContainer: {
    marginTop: 30
  },
  timeContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17.7
  },
  bellIconContainer: {
    borderRadius: 90,
    width: 21.3,
    height: 21.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.redec1c2e
  },
  bellIcon: {
    width: 16.7,
    height: 12.7
  },
  enableText: {
    fontSize: 10.7,
    color: "#2f2f2f",
    lineHeight: 14,
    marginLeft: 5
  },
  switchContainer: {
    marginLeft: 5
  },
  errorView: {
    marginVertical: 8,
  },
  errorViewText: {
    fontSize: 10,
    lineHeight: 18, 
    fontWeight: 'bold', 
    color: Colors.redec1c2e,
  }
});
