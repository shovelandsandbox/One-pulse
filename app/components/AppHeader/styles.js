import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backButtonContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 25,
    paddingRight: 10
  },
  backButtonImage: {
    height: 15,
    width: 15
  },
  logoContainer: {
    flex: 3.5,
    justifyContent: "center",
    padding: 10,
    alignItems: "flex-start"
  },
  logo: {
    height: 44,
    width: 90,
    margin: 0
  },
  actionContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: 'row',
    padding: 10
  },
  rewardsNotificationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileContainer: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: "#FFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderWidth: 0.7,
    borderColor: "#FFFF"
  },
  profile: {
    width: 45,
    height: 45,
    overflow: "hidden",
    aspectRatio: 1 / 1,
    borderRadius: 45/2
  },
  countContainer: {
    borderRadius: 20/2, 
    height:12, width: 12, 
    backgroundColor:"white", 
    alignItems: "center", 
    justifyContent:"center", 
    position: "absolute"
  },
  countStyle: {
    color:"red", 
    fontSize: 6, 
    alignSelf: "center" 
  }
});
