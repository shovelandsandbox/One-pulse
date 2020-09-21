import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 22.3,
    paddingHorizontal: 22.7,
    paddingBottom: 26,
  },
  header: {},
  headerText: {
    fontSize: 14,
    lineHeight: 19,
    color: "#ffffff",
    fontWeight: "900",
    textAlign: "center",
  },
  descriptionContainer: {
    marginTop: 10.3,
  },
  descriptionContainerHeader:{},
  descriptionContainerText: {
    fontSize: 10.7,
    lineHeight: 16.7,
    color: "#ffffff",
  },
  descriptionContainerList: {
    marginTop: 13.3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItem: {
    justifyContent: "space-between",
    marginLeft: 5.2,
    marginTop: 13,
  },
  rewardImage: { 
    width: 13, 
    height: 13, 
    marginTop: 4,
  },
  actionBlock: {
    width: "100%",
    height: 36,
    paddingVertical: 8.7,
    alignSelf: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 5,
    marginTop: 33.3,
  },
  actionBlockText: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  }
});
