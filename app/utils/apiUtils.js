import { pathOr } from "ramda";

export const buildPayload = (
  store,
  operation,
  event,
  body,
  params = {},
  key = ""
) => {
  const { token, userAgent } = store.getState().auth;
  const payload = {
    ...params,
    operation,
  };
  if (token) {
    payload.token = token;
    payload.access_token = token;
  }
  if (event) {
    payload.event = event;
  }
  if (body) {
    payload.body = body;
  }
  if (userAgent) {
    payload.userAgent = userAgent;
  }
  if (key) {
    payload.key = key;
  }
  return payload;
};

export const buildPayloadWithAccessToken = (
  store,
  operation,
  event,
  body,
  params = {}
) => {
  const { token } = store.getState().auth;
  const payload = {
    ...params,
    operation,
  };
  if (token) {
    payload.access_token = token;
  }
  if (event) {
    payload.event = event;
  }
  if (body) {
    payload.body = body;
  }
  return payload;
};


export const failureResponseTransformer = payload => ({
  shortCode: pathOr(-1, ["response", "status", "shortCode"], payload),
  errorMsg: pathOr("", ["response", "status", "message"], payload),
  errorCode: pathOr(-1, ["response", "status", "code"], payload),
});
