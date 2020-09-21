import uuidv4 from "uuid/v4";

class WebSocketClient {
  DEFAULT_TIMEOUT = 30000;

  constructor(wsUrl, authStore, dynHeaders) {
    this.wsUrl = wsUrl;
    this.authStore = authStore;
    this.dynHeaders = dynHeaders;
    this.isClosed = true;
    this.reqMap = new Map();
  }

  addHeader(name, value) {
    if (!this.headers) {
      this.headers = {};
    }
    this.headers[name] = value;
  }

  websocketHandler(evt) {
    if (evt) {
      const replyMsg = evt.data;
      console.log("Received websocket response:" + JSON.stringify(replyMsg));
      const corrId = replyMsg.correlationId;
      const respCallback = reqMap.get(corrId);
      if (respCallback) {
        if (!respCallback.isSubscriber) {
          if (respCallback.timerId) {
            clearTimeout(respCallback.timerId);
          }
          this.reqMap.delete(corrId);
        }
        const { status } = replyMsg;
        if (status && status.code == 0) {
          respPromise.resolve(replyMsg);
        } else {
          if (respCallback.reject && status) {
            respCallback.reject(status.message);
          }
        }
      }
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.isClosed) {
        this.ws = new WebSocket(this.wsUrl);
        const timerId = setTimeout(() => {
          reject("Connection timeout");
        }, 10000);
        this.ws.onopen = function() {
          clearTimeout(timerId);
          this.isClosed = false;
          resolve(this.ws);
        };
        this.ws.onmessage = evt => this.websocketHandler(evt);

        this.ws.onerror = function(err) {
          this.isClosed = true;
          reject(err);
        };
        this.ws.onclose = () => {
          this.isClosed = true;
          console.log("disconnected");
        };
      } else {
        resolve(this.ws);
      }
    });
  }

  async invoke(operation, payload, props, timeout) {
    try {
      await this.connect();
      return new Promise((resolve, reject) => {
        const req = this.createRequest(operation, props, payload);
        const callback = new ResCallback(req, false, resolve, reject);
        this.reqMap.set(req.msgId, callback);
        callback.timerId = setTimeout(
          () => {
            this.reqMap.delete(req.msgId);
            reject("Request timedout");
          },
          timeout ? timeout : DEFAULT_TIMEOUT
        );

        this.ws.send(req);
      });
    } catch (err) {
      console.log("Failed to invoke operation:" + operation + " err:" + err);
    }
  }

  async subscribe(operation, payload, callback, props) {
    try {
      await this.connect();
      const req = this.createRequest(operation, props, payload);
      const respCallback = new ResCallback(req, false, callback, reject);
      this.reqMap.set(req.msgId, respCallback);
      this.ws.send(req);
    } catch (err) {
      console.log("Failed to subscribe operation:" + operation + " err:" + err);
    }
  }

  async unsubscribe(subscriberId) {
    try {
      const respCallback = this.reqMap.get(subscriberId);
      if (respCallback) {
        await this.connect();
        const { req } = respCallback;
        const unsubscribeReq = this.createRequest(
          req.operaton + "_cancel",
          req.props
        );
        this.reqMap.delete(subscriberId);
        this.ws.send(unsubscribeReq);
      }
    } catch (err) {
      console.log(
        "Failed to publish message for operation:" + operation + " err:" + err
      );
    }
  }

  async publish(operation, payload, props) {
    try {
      await this.connect();
      const req = this.createRequest(operation, props, payload);
      this.ws.send(req);
    } catch (err) {
      console.log(
        "Failed to publish message for operation:" + operation + " err:" + err
      );
    }
  }

  // eslint-disable-next-line complexity
  createRequest(operation, props, payload) {
    const req = {};
    req.msgId = uuidv4();
    req.operation = operation;
    if (payload) req.body = payload;
    if (props) {
      for (propKey in props) {
        if (props[propKey]) req[propKey] = props[propKey];
      }
    }
    if (this.authStore.acessToken)
      req["access_token"] = this.authStore.acessToken;
    if (this.authStore.apiKey && this.authStore.apiKeyName)
      req[this.authStore.apiKeyName] = this.authStore.apiKey;
    if (this.headers) {
      for (propKey in this.headers) {
        if (this.headers[propKey]) req[propKey] = this.headers[propKey];
      }
    }
    if (this.dynHeaders) {
      this.dynHeaders(req);
    }
    console.log("Sending websocket request:" + JSON.stringify(req));
    return req;
  }
}

class ResCallback {
  constructor(req, isSubscriber, resolve, reject) {
    this.req = req;
    this.isSubscriber = isSubscriber;
    this.resolve = resolve;
    this.reject = reject;
    this.timerId = null;
  }
}

export default WebSocketClient;
