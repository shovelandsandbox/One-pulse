import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

import { Theme } from "../../../../themes";
const { Colors } = Theme;

export default StyleSheet.create({
  parentContainer: {
    height: "auto"
  },
  parentSubContainer: {
    borderRadius: 3.3
  },
  container: { 
    backgroundColor: Colors.black, 
    flexDirection: "row",
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.black,
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
  textContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: 16.7
  },
  titleText: { 
    fontSize: 12, 
    color: Colors.text333333
  },
  rewardContainer: {
    justifyContent: "flex-end",
    flex: 0.8
  },
  badgeContainer: {
    flexDirection: "row"
  },
  badge: { height: 20, width: 20 },
  badgeCountContainer: { flexWrap: "wrap", width: 100 },
  badgeCount: {
    color: Colors.white,
    left: 4,
    flexWrap: "wrap",
    fontSize: 10.7
  },
  descriptionContainer: {
    backgroundColor:Colors.black,
    height: 170,
    paddingLeft: 23.7,
    borderBottomLeftRadius: 6.7,
    borderBottomRightRadius: 6.7
  },
  descriptionText: {
    color: Colors.white,
    fontSize: 12,
    paddingRight: 23.3,
    lineHeight: 15
  },
  rewardTextContainer: { top: 6.7 },
  rewardText: {
    color: Colors.redec1c2e,
    fontSize: 10.7,
    lineHeight: 14.3
  },
  badgeSubContainer: {
    flexDirection: "row",
    top: 5.3
  },
  badgeCompletionText: {
    color: Colors.white,
    fontSize: 11.3,
    lineHeight: 14.3,
    paddingLeft: 6.3,
  },
  mileStoneContainer: {
    marginTop: 7.7
  },
  duration: {
    color: Colors.redec1c2e,
    marginTop: 5.7,
    fontSize: 10.7,
    lineHeight: 14.3,
    fontWeight: "900",
    fontStyle: "normal",
  },
  days: {
    color: Colors.text333333,
    marginTop: 5.7,
    fontSize: 11.3,
    lineHeight: 15
  },
  bottomBorder: {
    width: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "red"
  },
  titleContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  tabsLayout: {
    flexDirection: "row",
    marginTop: 3
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderRadius: 3.3,
    height: "auto",
    width: width * 0.9,
    paddingLeft: 16.7,
    paddingRight: 16.7,
    paddingBottom: 10,
    paddingTop: 23.7,
  },
  imageStyle: {
    borderRadius: 3.3,
    height: 90.7,
    width: 100
  },
  shareTextStyle: { 
    fontSize: 10, 
    color: Colors.redec1c2e,
  },
  titleStyle: { 
    flex: 1, 
    marginLeft: 10 
  },
  Customtitle: {
    fontSize: 11.3,
    color: Colors.text333333,
    marginLeft: 3,
    lineHeight: 13.3,
  },
  linkedHabitContainer: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    width: "100%",
    marginTop: 10
  },
  unlockIcon: {
    height: 14.6,
    width: 11.7
  },
  roundDot: {
    height: 5,
    width: 5,
    borderRadius: 90,
    backgroundColor: Colors.black,
    marginRight: 3
  },
  badgeWithTextBackground: {
    flexDirection: "row" ,
    height: 35,
    backgroundColor: Colors.rede11a2c , 
    borderRadius: 6.7 ,  
    alignItems: "center" ,
    marginTop: 7,
  },
  textWithStar: {
    fontSize: 11.3,
    color: Colors.white,
    marginLeft: 3,
    lineHeight: 13.3,
    width: 240.3,
    flexWrap: "wrap",
  },
  starIcon: {
    width: 13 ,
    height: 13 ,
    marginStart: 6,
  },
  descriptionColor: {
    color: Colors.grey666666,
  },
  tabListContainer: {
    width: "auto",
    borderBottomColor: Colors.redc8cbd0,
    borderBottomWidth: 0.3,
  }
});
