import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../themes";

const { width, height } = Dimensions.get("window");

const { Colors, Fonts } = Theme;

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  errorContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 120,
    justifyContent: "center",
    padding: 30,
  },
  errorTitle: { fontWeight: "bold", textAlign: "center" },
  errorButton: {
    backgroundColor: "red",
    borderRadius: 6,
    height: 30,
    justifyContent: "center",
    marginHorizontal: 5,
    width: 80,
  },
  errorText: {
    color: "white",
    fontSize: 10,
    padding: 5,
    textAlign: "center",
  },
  errorOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
  },
  alertContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flex: 1,
    justifyContent: "center",
  },
  loadScreenContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  loadScreenIcon: {
    height: 71,
    marginTop: 119,
    width: 142.3,
  },
  loadScreenText: {
    marginTop: 50,
  },
  absoluteFill: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: width,
    zIndex: 27,
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  cameraContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height,
    justifyContent: "center",
    width,
  },
  // eslint-disable-next-line react-native/no-color-literals
  close: {
    backgroundColor: "rgba(233,27,45,1)",
    borderRadius: 30,
    bottom: 40,
    height: 60,
    left: width / 2 - 30,
    position: "absolute",
    width: 60,
  },
  // eslint-disable-next-line react-native/no-color-literals
  closeInner: {
    backgroundColor: "rgba(255,255,255,.18)",
    borderRadius: 35,
    bottom: 35,
    height: 70,
    left: width / 2 - 35,
    position: "absolute",
    width: 70,
  },
  // eslint-disable-next-line react-native/no-color-literals
  closeOuter: {
    backgroundColor: "rgba(255,255,255,.08)",
    borderRadius: 40,
    bottom: 30,
    height: 80,
    left: width / 2 - 40,
    position: "absolute",
    width: 80,
  },
  loadingIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingScreen: {
    alignItems: "center",
    backgroundColor: "#fff",
    bottom: 0,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 30,
  },
  modelResults: {
    // borderRadius: 0,
    // borderWidth: 1,
    bottom: 0,
    // height: 800 / 2,
    width,
    height,
    // left: 50,
    left: 0,
    position: "absolute",
    // top: 100,
    right: 0,
    top: 0,
    // width: 600 / 2,
    zIndex: 20,
  },
  progressBarContainer: {
    bottom: 135,
    left: 16,
    position: "absolute",
    right: 16,
  },
  progressTimerContainer: {
    bottom: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    left: 16,
    position: "absolute",
    right: 16,
  },
  progressTimerText: {
    color: Colors.white,
    flexGrow: 1,
    fontSize: 15,
  },
  progressTimerTextLeft: {
    textAlign: "right",
  },
  resultText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    elevation: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 7,
    width: 160,
    height: 160,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  vitalName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  vitalValue: {
    color: Colors.pulseRed,
    fontSize: 28,
    fontWeight: "bold",
  },
  resultsView: {
    backgroundColor: "transparent",
    bottom: 20,
    height: 180,
    position: "absolute",
    zIndex: 25,
  },
  errorView: {
    backgroundColor: "white",
    borderRadius: 10,
    bottom: 20,
    height: 180,
    marginHorizontal: 10,
    position: "absolute",
    zIndex: 25,
  },
});