import { StyleSheet } from "react-native";
import { fontFamily, fontWeight, Colors, Styles } from "../../styles";

const customColors = {
  container: "rgba(0,0,0,0.7)",
  desc: "#2f2f2f",
  joinButton: "#ec1c2e",
  dateContainer: "rgba(0,0,0, 0.59)",
  activeContainer: "rgba(92,180,21,1)",
};

const styles = StyleSheet.create({
  activeContainer: {
    alignItems: "center",
    backgroundColor: customColors.activeContainer,
    borderRadius: 5,
    height: 46,
    justifyContent: "center",
    margin: 10,
    width: 47,
  },
  activeIcon: {
    height: 11.9,
    marginVertical: 5,
    width: 15.9,
  },
  activeStyle: {
    color: Colors.white,
    fontSize: 11,
    lineHeight: 13,
  },
  body: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bodyFooter: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 14.3,
    paddingBottom: 11,
    paddingRight: 12.7,
  },
  dateContainer: {
    alignItems: "center",
    backgroundColor: customColors.dateContainer,
    borderRadius: 5,
    flexDirection: "row",
    margin: 10,
  },
  dateDetails: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
  },
  dateLabelStyle: {
    alignSelf: "flex-start",
    color: Colors.white,
    fontSize: 9,
    lineHeight: 10,
    marginBottom: 3,
  },
  dateSeparator: {
    backgroundColor: Colors.white,
    height: 30,
    width: 1,
  },
  dateStyle: {
    alignSelf: "flex-start",
    color: Colors.white,
    fontSize: 13,
    lineHeight: 15,
  },
  desc: {
    color: customColors.desc,
    fontSize: 11,
    marginLeft: -4,
    paddingBottom: 4,
  },
  descContainer: {
    paddingBottom: 6.7,
    paddingHorizontal: 9.3,
    paddingTop: 12.3,
  },
  description: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  detailsStep: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  footer: {
    flexDirection: "row",
  },
  footerItemRight: {
    alignItems: "flex-end",
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 10,
  },
  icon: {
    height: 25,
    marginLeft: 10,
    width: 25,
  },
  imageBackground: {
    borderRadius: 3,
    height: 133.5,
    marginHorizontal: 20,
  },
  imageStyle: {
    borderRadius: 3,
    flex: 1,
    height: 133.5,
  },
  joinButton: {
    alignItems: "center",
    backgroundColor: customColors.joinButton,
    height: 38.3,
    justifyContent: "center",
    width: "50%",
  },
  joinText: {
    color: Colors.white,
    fontSize: 13,
    lineHeight: 15,
    textAlign: "center",
  },
  knowMoreButton: {
    alignItems: "center",
    backgroundColor: Colors.white,
    height: 38.3,
    justifyContent: "center",
    width: "50%",
  },
  knowMoreText: {
    color: Colors.pulseRed,
    fontSize: 13,
    lineHeight: 15,
    textAlign: "center",
  },
  leaderBoardContainer: {
    alignItems: "center",
    backgroundColor: customColors.dateContainer,
    borderRadius: 5,
    flexDirection: "row",
    margin: 10,
    maxWidth: 114,
  },
  leaderBoardIconContainer: {
    alignItems: "center",
    backgroundColor: Colors.pulseRed,
    borderRadius: 5,
    height: 46,
    justifyContent: "center",
    margin: 10,
    width: 47,
  },
  leaderboardIcon: {
    height: 28.6,
    width: 28.6,
  },
  learnMore: {
    color: Colors.pulseRed,
    fontFamily,
    fontSize: 11,
    fontWeight: fontWeight.Bold,
    letterSpacing: 0.36,
    textDecorationLine: "underline",
  },
  mainContainer: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    marginBottom: 10,
    marginTop: 2,
  },
  membersCount: {
    color: Colors.white,
    fontFamily: "Open Sans",
    fontSize: 14,
    fontWeight: fontWeight.Bold,
  },
  membersText: {
    color: Colors.white,
    fontFamily,
    fontSize: 11,
    paddingTop: 3,
  },
  nameStyle: {
    alignSelf: "flex-start",
    color: Colors.white,
    fontFamily: "Open Sans",
    fontSize: 15.3,
    paddingLeft: 12,
  },
  rowItem: {
    flexDirection: "row",
  },
  separator: {
    backgroundColor: Colors.gray,
    height: 1,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  step: {
    alignSelf: "flex-end",
    color: Colors.white,
    fontFamily: "Open Sans",
    fontSize: 33.3,
  },
});

export default styles;
