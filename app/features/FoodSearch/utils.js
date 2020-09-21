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

export const getPayloadForNavigation = (action, navigateTo, params) => ({
    ...action,
    payload: {
        ...action.payload,
        navigateTo,
        params,
    },
});