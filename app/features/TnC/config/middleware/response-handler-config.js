import screens from "../screenNames";
import actionNames from "../actionNames";
import { pathOr } from "ramda";

export default {
  [screens.LOAD_TNC_AND_PRIVACY_POLICY]: {
    [actionNames.getTnCandPrivacyPolicy]: {
      successAction: actionNames.getTnCandPrivacyPolicySuccess,
      successHandler: (action, store) => {
        store.dispatch({
          type: "GO_TO_SCREEN",
          navigateTo: "PdfView",
          payload: {
            params: {
              source: {
                uri: "data:application/pdf;base64,".concat(
                  pathOr("", ["payload", "response", "body", "content"], action)
                ),
              },
            },
          },
        });
      },
      toggleLoader: false,
    },
  },
};
