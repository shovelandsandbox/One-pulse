import { StyleSheet } from "react-native";
import Colors from "../utils/colors";

export default StyleSheet.create({
  affinityIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backIcon: {
    height: 15,
    width: 15,
  },
  baseContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  baseWallContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  createPostBaseContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  createPostContainer: {
    marginBottom: 10,
  },
  createPostGroup: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
    paddingLeft: 30,
    backgroundColor: Colors.white,
  },
  createPostHeader: {
    color: Colors.red,
    fontFamily: "Avenir-Regular",
    fontWeight: "bold",
  },
  createPostTitle: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 0.5,
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 0.5,
  },
  createPostTitleText: {
    color: Colors.lightGrey,
    fontSize: 16,
    paddingLeft: 30,
    paddingVertical: 20,
  },
  currentGroupTitle: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 16,
    paddingLeft: 10,
  },
  editIcon: {
    height: 20,
    width: 20,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  emptyGroup: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  emptyGroupButton: {
    alignItems: "center",
    alignSelf: "center",
    color: Colors.white,
    display: "flex",
    fontFamily: "Avenir-Regular",
    fontSize: 13,
    lineHeight: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },
  emptyGroupButtonContainer: {
    alignItems: "center",
    backgroundColor: Colors.red,
    borderRadius: 5,
    height: 26,
    justifyContent: "center",
    marginTop: 15,
    width: 92,
  },
  emptyGroupText: {
    alignItems: "center",
    color: Colors.black,
    display: "flex",
    fontFamily: "Avenir-Regular",
    fontSize: 16,
    lineHeight: 20,
  },
  emptyText: {
    alignItems: "center",
    display: "flex",
    fontFamily: "Avenir-Regular",
  },
  errorText: {
    color: Colors.red,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    paddingLeft: 10,
    textAlign: "left",
  },
  groupSelectedLine: {
    borderBottomColor: Colors.groupButton,
    borderBottomWidth: 3,
  },
  groupSelectionContainer: {
    flexDirection: "row",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  headerText: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 16,
    paddingLeft: 15,
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  iconComment: {
    height: 22,
    width: 22,
  },
  iconContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  iconLike: {
    height: 21,
    width: 24,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  notificationList: {
    flex: 1,
    marginBottom: 10,
  },
  notificationSeparatorComponent: {
    backgroundColor: Colors.postSeparator,
    height: 5,
    width: "100%",
  },
  pickerStyle: {
    color: Colors.black,
    height: 30,
    width: "50%",
  },
  postHeaderContainer: {
    marginBottom: 10,
  },
  separatorComponent: {
    backgroundColor: Colors.postSeparator,
    height: 6,
    width: "100%",
  },
  textArea: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    height: 180,
    textAlignVertical: "top",
  },
  textAreaContainer: {
    backgroundColor: Colors.white,
    height: 180,
    padding: 5,
  },
  textInputView: {
    borderColor: Colors.lightGrey,
    borderRadius: 5,
    borderWidth: 0.5,
    margin: 25,
    padding: 10,
  },
  toggleButtonArea: {
    padding: 10,
    width: "50%",
  },
  toggleButtonStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  toggleText: {
    color: Colors.lightGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    paddingVertical: 10,
    textAlign: "center",
  },
  userIcon: {
    height: 10,
    width: 12,
  },
  userIconView: {
    alignItems: "center",
    backgroundColor: Colors.iconBackground,
    borderRadius: 28,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
});
