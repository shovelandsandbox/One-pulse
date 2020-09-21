import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { failureResponseTransformer } from "../../../utils/apiUtils";
import { pathOr, path } from "ramda";
import moment from "moment";

export default {
  [screens.COMMON]: {
    [actions.getResource]: {
      successAction: actions.getResourceSuccess,
      failureAction: actions.getResourceFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
};
