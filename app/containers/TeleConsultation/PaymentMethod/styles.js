import { StyleSheet } from "react-native";

const localStyles = StyleSheet.create({
  paymentMethodContainer: {
    backgroundColor: "#ffffff",
  },
  paymentMethodContainerBlock: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 0,
  },
  centerAlignment: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  paymentHeader: {
    width: 232,
    height: 160,
    marginBottom: 30,
    marginTop: 10,
  },
  paymentDetailsContainer: { alignItems: "flex-start", width: "100%", marginTop: 30 },
  paymentHeaderText: { fontSize: 22, color: "#515B61", fontWeight: "600" },
  whatIsThisFor: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#899AA4",
    marginBottom: 20,
    width: "100%",
  },
  alignRowsWithBottomMargin: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  whenIsThisImage: {
    width: 19,
    height: 19,
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: "#899AA4",
  },
  detailInfoContainer: { paddingLeft: 34, marginBottom: 8 },
  doesItIncludeContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#899AA4",
    marginBottom: 20,
    width: "100%",
  },
  doesItIncludeMedicationImage: {
    width: 18,
    height: 18,
    marginRight: 15,
  },
  detailTextHeader: { fontSize: 14, color: "#434E54" },
  whenWillIBeChargedContainer: { marginBottom: 50, width: "100%" },
  whenWillIBeChargedAnswerContainer: { paddingLeft: 34, marginBottom: 8 },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonOverride: {
    fontSize: 20,
    fontWeight: "900",
    height: 43,
    width: 257,
    borderRadius: 22,
  }
});

export default localStyles;
