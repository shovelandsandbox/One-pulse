import { path, pathOr } from "ramda";
import screens from "../screenNames";
import actionNames from "../actionNames";

import { failureResponseTransformer } from "../../../../utils/apiUtils";
import actionCreators from "../../actions";
import { makeMessageReceivedHandler } from "../../../../utils/notification-utils";
import { addNotification } from "../../../appNotification/actions";

export default {
  [screens.PULSE_NOTIFICATION]: {
    [actionNames.getCustomerComms]: {
      successAction: actionNames.getCustomerCommsSuccess,
      failureAction: actionNames.getCustomerCommsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getCustomerCommById]: {
      successAction: actionNames.getCustomerCommByIdSuccess,
      failureAction: actionNames.getCustomerCommByIdFailure,
      dispatchActions: payload => {
        const actions = [];
        const { commId } = payload;

        const body = pathOr({}, ["response", "body"], payload);
        const showNotification = pathOr(
          false,
          ["actionPayload", "showNotification"],
          payload
        );

        if (body && body.id) {
          const { id } = body;

          if (!showNotification) {
            actions.push({
              type: actionNames.updateCustomerComm,
              payload: {
                id,
                status: "READ",
                showNotification,
              },
            });
          }

          actions.push(
            actionCreators.recordNotificationViewed({ id, commId }, showNotification)
          );

          if (showNotification) {
            actions.push(
              addNotification({
                notification: body,
                type: "notification_center",
              })
            );
          }
        }
        return actions;
      },
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.updateCustomerComm]: {
      successAction: actionNames.updateCustomerCommSuccess,
      failureAction: actionNames.updateCustomerCommFailure,
      postSuccessHook: payload => path(["response", "actionPayload"], payload),
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },

    [actionNames.testNotification]: {
      isSuccessResponse: () => true,
      successHandler: (action, store, config) => {
        const commId = pathOr("", ["payload", "commId"], action);

        makeMessageReceivedHandler(store)({
          payload: {
            commId,
          },
        });
      },
    },
  },
};
