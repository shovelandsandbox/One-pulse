import { Colors } from "../../../configs";

export default {
  container: {
    flex: -1,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 7,
    borderBottomColor: Colors.main.borderGray,
  },
  containerNoBorder: {
    flex: -1,
    flexDirection: "row",
    paddingVertical: 7,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
