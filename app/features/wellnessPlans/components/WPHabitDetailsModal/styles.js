import { StyleSheet } from "react-native";

export default StyleSheet.create({
  parentContainer: {
    height: "auto"
  },
  parentSubContainer: {
    borderRadius: 3.3
  },
  container: { backgroundColor: "#000000", flexDirection: "row" },
  subContainer: {
    flex: 1,
    backgroundColor: "#000000",
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
    backgroundColor: "#000000",
    paddingTop: 16.7
  },
  titleText: { fontSize: 14, color: "#FFFF" },
  rewardContainer: {
    justifyContent: "flex-end",
    flex: 0.8
  },
  badgeContainer: {
    flexDirection: "row"
  },
  badge: { height: 16, width: 16, },
  badgeCountContainer: { flexWrap: "wrap", width: 100 },
  badgeCount: {
    color: "#FFFF",
    left: 4,
    flexWrap: "wrap",
    fontSize: 10.7
  },
  descriptionContainer: {
    backgroundColor: "#000000",
    height: 170,
    paddingLeft: 23.7,
    borderBottomLeftRadius: 6.7,
    borderBottomRightRadius: 6.7
  },
  descriptionText: {
    color: "#FFFF",
    fontSize: 12,
    paddingRight: 23.3,
    lineHeight: 15
  },
  rewardTextContainer: { top: 6.7 },
  rewardText: {
    color: "#ec1c2e",
    fontSize: 10.7,
    lineHeight: 14.3,
  },
  badgeSubContainer: {
    flexDirection: "row",
    top: 5.3
  },
  badgeCompletionText: {
    color: "#FFFF",
    left: 2.9,
    fontSize: 11.3,
    lineHeight: 14.3,
  },
  mileStoneContainer: {
    marginTop: 7.7,
  },
  duration: {
    color: "#ec1c2e",
    marginTop: 5.7,
    fontSize: 10.7,
    lineHeight: 14.3,
  },
  days: {
    color: "#FFFF",
    marginTop: 5.7,
    fontSize: 11.3,
    lineHeight: 15
  }
});
