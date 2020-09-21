import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  avatar: {
    height: 66,
    width: 66,
  },
  avatarHeaer: {
    alignSelf: "center",
    borderRadius: 24,
    height: 48,
    width: 48,
  },
  avatarInner: {
    justifyContent: "center",
  },
  avatarWraper: {
    flexDirection: "row",
  },
  headLeft: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
  },
  headRight: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headWraper: {
    flexDirection: "row",
    height: 60,
    marginHorizontal: 20,
  },
  newLogo: {
    alignContent: "flex-end",
    alignSelf: "center",
    height: 28,
    width: 70,
  },
  textWraper: {
    flex: 1,
  },
  welcomeName: {
    color: "#515B61",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 2,
    marginLeft: 15,
  },
  welcomeText: {
    color: "#515B61",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 15,
    marginTop: 2,
  },
  welcomeWraper: {
    backgroundColor: "#ed1b2e",
    elevation: 5,
    flexDirection: "row",
    height: 56,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  base: {
    borderRadius: 16,
    marginHorizontal: 20,
    minHeight: 200,
    overflow: "hidden",
    paddingTop: 15,
  },
  contentText: {
    color: "#fff",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 20,
    marginLeft: 15,
    marginTop: 10,
  },

  contentTitle: {
    color: "#fff",
    fontFamily: "Avenir",
    fontSize: 17,
    fontWeight: "900",
    lineHeight: 25,
    marginLeft: 15,
  },
  contentView: {
    bottom: 0,
    top: 0,
    width: "100%",
    position: "absolute",
    backgroundColor: "#0006",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },

  
  mainHomeTile: {
    width: '100%',
    height: 230,
    flex: 1
  },
  HomeTile: {
    width: '100%',
    height: 220,
    flex: 1
  },
  pulseHeader: {
    height: 40,
    width: 100,
  },
  PrayerTime: {
    marginLeft: 30,
    // marginTop: 20,
  },
  Date: {
    marginTop: 30,
    marginLeft: 30
  },
  nextPrayer: {
    marginTop: 30,
    marginRight: 30,
    borderWidth: 1,
    width: '30%',
    alignContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 4,
    backgroundColor: 'black',
    opacity: 0.6,
    padding: 10,
  },
  PrayerCalendar: {
    borderWidth: 0.1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
    marginTop: 20,
    marginRight: 40,
    width: '25%',
  },
  PrayerName: {
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 50,
    width: '80%',
    height: 20,
    backgroundColor: 'black',
    opacity: 0.6,
    paddingLeft: 10
  }
});
