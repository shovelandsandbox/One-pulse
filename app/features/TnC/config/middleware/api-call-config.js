import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { path } from "ramda";

const fetchTandCPrivacyPolicyPdf = {
  payloadBuilder: (store, action) => {
    const language = path(["userPreferences", "language"], store.getState());
    const source = action.payload.source;
    const tandcOrPrivacyPolicy = action.payload.value;

    const params = {
      id: `m::doc::${source}::${language}_${tandcOrPrivacyPolicy}`,
    };
    return buildPayload(store, "getResourceById", null, null, params);
  },
  loader: true,
};

export default {
  [screens.LOAD_TNC_AND_PRIVACY_POLICY]: {
    [actions.getTnCandPrivacyPolicy]: fetchTandCPrivacyPolicyPdf,
  },
};
