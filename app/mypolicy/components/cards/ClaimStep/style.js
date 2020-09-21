import { Colors } from "../../../configs";

export default {
  container: {
    flex: -1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.main.borderGray,
    backgroundColor: Colors.main.baseWhite,
    borderRadius: 10,
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
  },

  circle: {
    container: {
      flex: -1,
      width: 40,
      height: 40,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  },

  label: {
    container: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: 16,
    },
  },

  icon: {
    container: {
      flex: -1,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  },
};
