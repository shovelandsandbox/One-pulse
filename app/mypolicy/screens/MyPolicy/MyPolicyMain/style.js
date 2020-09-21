import { Colors, Sizes } from "../../../configs";

export default {
  shadow: {
    container: {
      margin: 8,
      marginBottom: 26,
      borderRadius: 3.3,
      backgroundColor: "#ffffff",
      elevation: 5,
      // paddingHorizontal: 13.5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  },

  myPolicyImageContainer: {
    resizeMode: "cover",
    height: 205,
    width: "100%",
    marginBottom: 10,
    zIndex: 100,
  },

  title: {
    marginBottom: 40,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  disclaimerContainer: {
    borderColor: Colors.main.inactiveGray,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 25,
    padding: 15,
    position: "relative",
  },
  disclaimerText: {
    color: Colors.main.baseGray,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
  },
  disclaimerTextContainer: {
    alignContent: "stretch",
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    paddingLeft: 10,
  },
  disclaimerWarningText: {
    color: Colors.main.baseOrange,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
  },
  buttonStyle: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderTopColor: Colors.main.borderGray,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonMiddleBorder: {
    borderLeftColor: Colors.main.borderGray,
    borderLeftWidth: 1,
  },
  policyButtonText: {
    color: Colors.main.baseRed,
    fontFamily: "Avenir-Roman",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
  },
  inputContainer: () => ({
    flexDirection: "row",
    borderColor: Colors.main.baseGray,
  }),
  iconContainer: {
    height: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  top: {
    container: {
      flex: 1,
      justifyContent: "center",
    },

    image: {
      container: {
        width: 240,
        // height: 240,
        height: Sizes.screen.height < 650 ? 180 : 240,
      },
    },
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 24,
  },

  policy: {
    container: {
      flex: -1,
      borderWidth: 0.25,
      backgroundColor: Colors.main.baseWhite,
      borderColor: "#ed1b2e",
      borderRadius: 3,
    },

    title: {
      marginTop: 5,
      fontWeight: "normal",
      lineHeight: 30,
    },
    productTitle: {
      marginTop: 10,
      marginBottom: 18,
      color: Colors.main.baseGray,
      fontFamily: "Avenir-Roman",
    },
    policyOverviewText: {
      flex: 1,
      color: Colors.main.baseGray,
      lineHeight: 18,
      fontFamily: "Avenir-Roman",
    },
    policyOverviewContainer: {
      flexDirection: "row",
      marginBottom: 14,
    },
  },
  policyCardComponent: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  image: {
    container: {
      flex: -1,
      position: "absolute",
      left: -35,
      paddingLeft: 50,
    },

    background: {
      flex: 1,
    },

    main: {
      left: -15,
      width: Sizes.screen.width,
      height: ((Sizes.screen.width * 2) / 800) * 400 + 40,
    },
  },
  headerStyles: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  linkPolicyButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
    height: "auto",
    width: 100,
  },
  linkPolicyButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  policyCardImage: {
    paddingVertical: 10,
  },
  policyStatusComponent: {
    paddingBottom: 2,
  },
  beneficiaryContainer: {
    alignSelf: "flex-start",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: Colors.main.darkGray,
    justifyContent: "center",
    marginTop: 10,
  },
  beneficiaryButtonContainer: {
    marginTop: 5,
    padding: 2,
  },
  beneficiaryButtonText: {
    color: Colors.main.baseRed,
    fontWeight: "normal",
    fontFamily: "Avenir-Roman",
    fontSize: 12,
    letterSpacing: 0,
    textAlign: "center",
    marginRight: 10,
    lineHeight: 22,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  policyFlatList: {
    paddingHorizontal: Sizes.screen.paddingHorizontal
  },
  linkPolicy:{
    bottom:20,
    right:20,
    backgroundColor:'yellow',
    alignItems:'center',
    justifyContent:'flex-end',
    alignSelf:'flex-end'
  },
  linkPolicyText:{
    color:'#ffffff',
    fontFamily: "Avenir",
    fontSize: 13,
    lineHeight:15,
    textAlign:'center',
  },
  linkMyPolicyContainer:{
    justifyContent:'space-between',
    alignItems:'flex-end',
    backgroundColor:'rgba(0,0,0,0.3)',
    height:43,
    bottom:0,
    flexDirection:'row'
  },
  linkMyPolicyButton:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgb(237,27,46)',
    marginRight:20,
    marginVertical:6,
    paddingRight:11,
    paddingLeft:9.4,
    height:32
  },
  titleContainer:{
    paddingLeft:24,
    alignItems:'center',
    justifyContent:'center',
    height:'100%'
  },
  titleText:{ 
    fontFamily: "Avenir-Heavy",
    lineHeight: 18, 
    fontSize: 16,
    color: "#ffffff"
  },
  linkPolicyIconContainer:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  newTitleContainer:{
    flex:1,
    bottom:0,
    justifyContent:'flex-end', 
    height:40
  }
};
