import { StyleSheet, Dimensions } from "react-native";

const window = Dimensions.get("window");
const width = window.width;

export default StyleSheet.create({
  cardViewStyle: {
    margin: 10
  },

  disabledOverLay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 100
  },
  tileContainerStyle: {
    display: "flex",
    padding: 10,
    margin: 10,
    zIndex: 1
  },
  tileContainerPart1Style: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "rgba(200, 200, 200, 0.8)"
  },

  tileImageStyle: {
    width: width * 0.16,
    height: width * 0.16,
    alignSelf: "center",
    borderRadius: 40
  },

  tileTextStyle: {
    fontSize: 12,
    fontWeight: "200",
    marginTop: 10,
    color: "#737579",
    textAlign: "center"
  },
  dataContainer: {
    marginLeft: 20
  },
  docNameStyle: {
    color: "#34495E",
    fontSize: 17,
    fontWeight: "400",
    maxWidth: width * 0.6,
    marginTop: 5
  },
  docSpeStyle: {
    color: "rgb(170, 170, 170)",
    fontSize: 13,
    fontWeight: "400",
    maxWidth: width * 0.6,
    marginTop: 2
  },

  bottomView: {
    flexDirection: "row",
    marginTop: 20,
    // height: 20,
    width: "100%",
    marginVertical: 5,
    justifyContent: "space-between"
  },

  bottomImage: {
    height: 12,
    width: 15,
    marginTop: 4
  },

  bottomText: {
    color: "rgb(170, 170, 170)",
    fontSize: 13,
    fontWeight: "400",
    maxWidth: width * 0.7,
    marginTop: 2,
    color: "#34495E",
    marginLeft: 4
  },

  bottomRpText: {
    color: "rgb(170, 170, 170)",
    fontSize: 15,
    fontWeight: "700",
    color: "#34495E"
  },

  bottomRightImage: {
    height: 12,
    width: 15,
    marginTop: 4,
    marginLeft: 10
  },

  docRpStyle: {
    color: "rgb(170, 170, 170)",
    fontSize: 19,
    fontWeight: "400",
    marginTop: 2,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  }
});
