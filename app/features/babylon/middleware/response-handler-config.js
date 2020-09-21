// import { path } from "ramda";
import screens from "../configs/screens";
import actions from "../configs/actions";

// import { failureResponseTransformer } from "../../../utils/apiUtils";

export default {
  [screens.babylonChat]: {
    [actions.createUserConversation]: {
      successHandler: (action, store) => {
        store.dispatch({
          type: actions.createUserConversationSuccess,
          payload: action,
        });
      },
    },
  },
};
