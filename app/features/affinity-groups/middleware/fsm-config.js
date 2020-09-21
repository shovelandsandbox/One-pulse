import screens from "../../../utils/configs/screen-names";
import { affinityGroupActions as actions } from "../configs/affinity-group-actions";

import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

const middlewareConfig = {
  [screens.createPostScreen]: {
    [actions.createGroupPostSuccess]: ({ action }) => {
      const navigateTo = screens.affinityGroupWallScreen;
      const groupId = action.payload.actionPayload.groupId;
      return getPayloadForNavigation(action, navigateTo, {
        groupId,
      });
    },
  },
};

export default middlewareConfig;
