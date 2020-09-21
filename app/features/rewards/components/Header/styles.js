import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    elevation: 2,
    height: 160,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  content: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 30,
  },
  customStyles: {
    backgroundColor: "transparent",
    height: "auto",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  rewardsText: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: -10,
  },
  transactionHistory: {
    color: "#FFF",
    fontSize: 14,
    paddingTop: 10,
    paddingRight: 5,
    textAlign: "right",
    textDecorationLine: "underline",
  },
  voucherCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  voucherImage: {
    height: 20,
    width: 20,
  },
  voucherLabel: {
    fontSize: 12,
  },
  voucherWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  vouchersContainer: {
    alignItems: "center",
    backgroundColor: "#FFFA",
    borderRadius: 30,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop:8,
    justifyContent: "center",
  },
  badgeImage: {
    height: 20,
    width: 20,
    paddingHorizontal: 15,
  },
  badgeWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
