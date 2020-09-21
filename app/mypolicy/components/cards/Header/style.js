import { NativeModules } from "react-native";
import { Sizes } from "../../../configs";

const { StatusBarManager } = NativeModules;

export default {
  grouper: {
    flex: -1,
    paddingVertical: 16,
    width: Sizes.screen.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Sizes.screen.paddingHorizontal,
    marginTop: Sizes.isAndroid ? -StatusBarManager.HEIGHT : 0,
  },

  button: {
    container: {
      flex: -1,
      width: 35,
      justifyContent: "center",
    },
    navBack: {
      flex: -1,
      flexDirection: 'row',
      justifyContent: "center",
    },
  },

  title: {
    container: {
      flex: 1,
    },
  },
};
