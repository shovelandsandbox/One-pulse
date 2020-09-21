import { observable, extendObservable, autorun } from "mobx";
import DeviceInfo from "react-native-device-info";

class GlobalState {
  constructor() {
    this.region = "";
    this.lang = "en";
    this.locale = "en_US";
    this.timezone = "UTC";
    this.currency = "";
    this.theme = "default";
    this.isAuthenticated = false;
    this.userId = "";

    this.auth = {
      accessToken: "",
      refreshToken: "",
      apiKeyName: "",
      apiKey: "",
    };

    this.userAgent = {
      appName: DeviceInfo.getApplicationName(),
      appVer: DeviceInfo.getReadableVersion(),
      deviceId: DeviceInfo.getUniqueId(),
      devAdvId: "",
      os: DeviceInfo.getSystemName(),
      osVer: DeviceInfo.getSystemVersion(),
      model: DeviceInfo.getDeviceId(),
      brand: DeviceInfo.getBrand(),
    };

    extendObservable(this, {
      region: this.region,
      lang: this.lang,
      locale: this.locale,
      timezone: this.timezone,
      currency: this.currency,
      theme: this.theme,
      isAuthenticated: this.isAuthenticated,
      userId: this.userId,
      auth: this.auth,
      userAgent: this.userAgent,
    });
  }

  registerState(stateKey, state) {
    const decorators = {};
    for (prop in state) {
      if (typeof state[prop] === "function") {
        if (prop.startsWith("run")) {
          decorators[prop] = autorun;
        } else if (prop.startsWith("action")) {
          decorators[prop] = action;
        }
      } else {
        const descriptor = Object.getOwnPropertyDescriptor(state, prop);
        if (descriptor.get) {
          decorators[prop] = computed;
        } else if (descriptor.set) {
          this.decorators[prop] = action;
        } else {
          decorators[prop] = observable;
        }
      }
    }
    this[stateKey] = Object.seal(observable.object(state, this.decorators));
  }

  setTheme(theme) {
    this.theme = theme;
  }
}

const globalState = new GlobalState();

//export default observable.object(globalState);

export default globalState;
