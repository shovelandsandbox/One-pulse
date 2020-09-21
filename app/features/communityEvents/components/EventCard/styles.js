import { StyleSheet } from "react-native";
import { Theme } from "../../../../themes";
const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  menuOptionsContainer: { borderRadius: 8, maxWidth: 150 },
  menuItemText: { color: "#212121" },
  menuLastOption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  menuOption: {
    borderBottomWidth: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#d9d3d3",
  },
  specialInviteText: { color: "#FFF", fontSize: 11, fontWeight: "bold" },
  specialInviteWrapper: {
    position: "absolute",
    top: -15,
    right: -60,
    width: 150,
    height: 60,
    backgroundColor: "#ec1c2e",
    transform: [{ rotate: "45deg" }],
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    borderRadius: 20,
    height: 34,
    justifyContent: "center",
    maxWidth: 140,
  },
  actionButtonText: { fontSize: 14, margin: 0 },
  communityCount: {
    color: "#2f2f2f",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 25,
  },
  communityIcon: {
    height: 14,
    width: 28,
  },
  dateAndTime: {
    color: "#212121",
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 5,
  },
  description: {
    color: "#414141",
    fontSize: 12,
    marginBottom: 5,
  },
  descriptionWrapper: {
    marginTop: 5,
  },
  eventContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: "hidden",
    padding: 14,
  },
  eventDate: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  eventDetailsPic: {
    alignSelf: "center",
    borderRadius: 10,
    height: 140,
    width: "100%",
  },
  footerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerWrapper: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },
  highlight: {
    color: "#ec1c2e",
    fontWeight: "bold",
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 8,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  seeMore: { color: "#ff0000", fontSize: 12 },
  specialPadding: { paddingRight: 40 },
});
