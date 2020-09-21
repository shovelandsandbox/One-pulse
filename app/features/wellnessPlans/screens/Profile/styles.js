import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backstyle: {
    backgroundColor: "#fff",
    marginBottom: 20
  },
  container: {
    backgroundColor: "#f5f9ff",
    flex: 1
  },
  description: {
    fontSize: 9.7,
    letterSpacing: 0,
    lineHeight: 13.3,
    textAlign: "center"
  },
  filterWrapper: {
    marginVertical: 6,
    paddingLeft: 20
  },
  habitsCountText: {
    fontSize: 24
  },
  habitsItem: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 6
  },
  habitsStatus: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 13.3,
    letterSpacing: 0,
    textAlign: "center",
    color: "#000000"
  },
  habitsTitle: {
    marginHorizontal: 0
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafbfc",
    width: "100%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    marginBottom: 10,
    marginRight: 16
  },
  headerCountItem: {
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 10,
    paddingHorizontal: 20
  },
  itemSeperator: {
    borderRightWidth: 2,
    borderRightColor: "#fafbfc"
  },
  label: {
    fontSize: 13,
    lineHeight: 17.3,
    letterSpacing: 0,
    textAlign: "center",
    color: "#93add2"
  },
  leaderboardContainer: {
    paddingHorizontal: 0
  },
  textLink: {
    fontSize: 11.5,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 14,
    color: "#ef5f6c",
    textDecorationLine: "underline",
    paddingVertical: 6
  },
  title: {
    fontSize: 21,
    fontWeight: "900",
    lineHeight: 25,
    color: "#263e5f"
  },
  titleWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20
  }
});
