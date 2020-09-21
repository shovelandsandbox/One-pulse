import moment from "moment";
import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { path, pathOr } from "ramda";
import { events } from "@pru-rt-internal/pulse-common";

export default {
  [screens.PULSE_NOTIFICATION]: {
    [actions.getCustomerComms]: {
      payloadBuilder: store => buildPayload(store, "getCustomerComms", null),
      loader: true,
    },
    [actions.getCustomerCommById]: {
      payloadBuilder: (store, action) => {
        const { commId } = action.payload;
        const params = {
          commId,
        };

        return buildPayload(store, "getCustomerCommById", null, {}, params);
      },
      loader: action => {
        return !pathOr(false, ["payload", "showNotification"], action);
      },
    },
    [actions.updateCustomerComm]: {
      payloadBuilder: (store, action) => {
        const { id, status } = action.payload;
        const body = {
          id,
          status,
        };
        return buildPayload(store, "updateCustomerComm", null, body);
      },
      loader: false,
    },

    [actions.notificationViewed]: {
      payloadBuilder: (store, action) => {
        const currDateTime = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
        events.notificationViewed.attributes = {
          id: pathOr("", ["payload", "id"], action),
          fromNotification: path(["payload", "fromNotification"], action),
          viewedAt: currDateTime,
          templateId: path(["payload", "commId"], action),
        };
        return buildPayload(store, "createEvent", null, events.notificationViewed, null);
      },
    },

    [actions.notificationDismiss]: {
      payloadBuilder: (store, action) => {
        const currDateTime = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
        let notificationDismissed = {
          type: "ClickEvent",
          tags: ["notification", "dismissed"],
          name: "pulse.notification.dismissed",
          source: "pulse",
          attributes: {},
        };
        notificationDismissed.attributes = {
          id: pathOr("", ["payload", "id"], action),
          dismissedAt: currDateTime,
          templateId: pathOr("", ["payload", "commId"], action),
        };
        return buildPayload(store, "createEvent", null, notificationDismissed, null);
      },
    },

    [actions.notificationActioned]: {
      payloadBuilder: (store, action) => {
        const currDateTime = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
        events.notificationActioned.attributes = {
          id: pathOr("", ["payload", "id"], action),
          fromNotification: path(["payload", "fromNotification"], action),
          actionedAt: currDateTime,
          templateId: pathOr("", ["payload", "commId"], action),
        };
        return buildPayload(store, "createEvent", null, events.notificationActioned, null);
      },
    },
  },
};
