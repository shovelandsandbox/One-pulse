/* eslint-disable complexity */
import React from "react";
import Animated, {
  Platform,
  AppState,
  Alert,
  Easing,
  Share,
  UIManager,
} from "react-native";
import ObserverGenericComponent from "./components/GenericComponent";
import { componentRegistry } from "./ComponentRegistry";

import WebSocketClient from "./WebSocketClient";
import HttpClient from "./HttpClient";
import moment from "moment";
import _ from "lodash";
import R from "ramda";
import env from "react-native-config";

//import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from "react-native";
import colors from "./utils/colors";
import componentTypes from "./ComponentTypes";

import globalState from "./GlobalState";
import DeviceInfo from "react-native-device-info";
//import NetInfo from "@react-native-community/netinfo";
import { runInAction, autorun, observable } from "mobx";
const properties = require("../config/env.json");

class AppEnv {
  constructor() {
    this.packageRootUrl = env.PACKAGE_ROOT_URL
      ? env.PACKAGE_ROOT_URL
      : properties["PACKAGE_ROOT_URL"];
    this.packageEtags = "";
    console.log("Using package root url:" + this.packageRootUrl);
    this.packageDef = null;
    this.utils = {};
    this.colors = colors;
  }

  componentRegistry() {
    return componentRegistry;
  }

  isIos() {
    return Platform.OS == "ios";
  }

  isAndroid() {
    return Platform.OS == "android";
  }

  async isPackagePresent() {
    if (await this.getPackageDef()) return true;
    return false;
  }

  getCachedPackageDef() {
    return this.packageDef;
  }

  async getPackageDef() {
    if (!this.packageDef) {
      const response = await this.httpClient().getAsJson(
        this.packageRootUrl + "/package.json"
      );
      if (response && response.data) {
        this.packageDef = response.data;
        const etags = this.httpClient().getLastModified(response);
        // if (etags != this.packageEtags) {
        this.packageEtags = etags;
        await this.loadPackageDef(this.packageDef);
        //console.log("Package def:" + JSON.stringify(this.packageDef));
        // }
      } else {
        console.log("Failed to fetch packageDef");
      }
    }
    return this.packageDef;
  }

  async loadPackageDef(packageDef) {
    if (packageDef.utils) {
      for (utilKey in packageDef.utils) {
        await this.loadUtil(utilKey, packageDef.utils[utilKey]);
      }
    }
    if (packageDef.states) {
      for (stateKey in packageDef.states) {
        await this.loadState(stateKey, packageDef.states[stateKey]);
      }
    }
  }

  async loadUtil(utilKey, utilRelPath) {
    const response = await this.httpClient().getAsText(
      this.packageRootUrl + "/utils/" + utilRelPath + ".js"
    );
    if (response && response.data) {
      const utilObj = eval(response.data + "; utils");
      this.utils[utilKey] = utilObj;
    }
  }

  async loadState(stateKey, stateRelPath) {
    const response = await this.httpClient().getAsText(
      this.packageRootUrl + "/states/" + stateRelPath + ".js"
    );
    if (response && response.data) {
      const stateObj = eval(response.data + "; state");
      globalState.registerState(stateKey, stateObj);
    }
  }

  getPlatformUrl() {
    const packageDef = this.getCachedPackageDef();
    if (packageDef) {
      return packageDef.platformUrl;
    }
    return null;
  }

  setPackageRoot(packageRootUrl) {
    this.packageRootUrl = packageRootUrl;
    console.log("Using package root url:" + this.packageRootUrl);
  }

  component(type, params, children) {
    comp = componentTypes[type];
    if (comp) {
      return React.createElement(comp, params, children);
    }
    if (!params) params = {};
    params.screen = type;
    params.appCtx = props.appCtx;
    return React.createElement(ObserverGenericComponent, params, children);
  }

  /**
   * Pass custom headers including auth headers in the websocket call
   *
   * @param {} wsHeaders is a callback that is passed a req object where all the headers can be set
   */
  setWsHeaders(wsHeaders) {
    this.wsHeaders = wsHeaders;
  }

  /**
   * Pass custom headers including auth headers in the websocket call
   *
   * @param {} wsHeaders is a callback that is passed a req object where all the headers can be set
   */
  setHttpHeaders(httpHeaders) {
    this.httpHeaders = httpHeaders;
  }

  registerModel(screenName, model) {
    if (!model) return;
    if (!this.registeredModels) {
      this.registeredModels = {};
      this.registeredDecorators = {};
    }
    this.registeredModels[screenName] = model;
    const decorators = {};
    for (prop in model) {
      if (typeof model[prop] === "function") {
        if (prop.startsWith("run")) {
          decorators[prop] = autorun;
          model[prop] = autorun(model[prop]);
        } else if (prop.startsWith("action")) {
          decorators[prop] = action.bound;
        }
      } else {
        const descriptor = Object.getOwnPropertyDescriptor(model, prop);
        if (descriptor.get) {
          decorators[prop] = computed;
        } else if (descriptor.set) {
          decorators[prop] = action.bound;
        } else {
          decorators[prop] = observable;
        }
      }
    }
    this.registeredDecorators[screenName] = decorators;
  }

  createRegisteredModel(screenName) {
    if (this.registeredModels) {
      const model = this.registeredModels[screenName];
      const decorators = this.registeredDecorators[screenName];
      const objRef = observable.object(model, decorators);
      const keys = Object.getOwnPropertyNames(objRef);
      keys.map(key => {
        const val = objRef[key];
        if (typeof val == "function") {
          objRef[key] = val.bind(objRef);
        }
      });
      return objRef;
    }
    return null;
  }

  wsClient() {
    if (!this.wsClientInstance) {
      const platformUrl = this.getPlatformUrl();
      console.log("Using platform url:" + platformUrl);
      this.wsClientInstance = new WebSocketClient(
        platformUrl,
        globalState.auth,
        wsHeaders
      );
      this.wsClientInstance.addHeader("userAgent", globalState.userAgent);
    }
    return this.wsClientInstance;
  }

  async dispatchEvent(name, type, tags, attrs, startTime, endTime) {
    const event = {};
    event.name = name;
    event.type = type;
    if (tags) event.tags = tags;
    if (attrs) event.attributes = attr;
    if (startTime) event.startTime = startTime;
    if (endTime) event.endTime = endTime;
    event.source = globalState.appName;
    await this.wsClient().publish("createEvent", event);
  }

  httpClient() {
    // if (!this.http) {
    this.http = new HttpClient(globalState.auth, this.httpHeaders);
    // }
    return this.http;
  }

  dtutil() {
    return moment();
  }

  lodash() {
    return _;
  }

  ramda() {
    return R;
  }

  alert(title, message, actions) {
    Alert.alert(title, message, actions);
  }

  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes
      ? navigationState.routes[navigationState.index]
      : null;
    // dive into nested navigators
    if (route) {
      if (route.routes) {
        return getActiveRouteName(route);
      }
      return route.routeName;
    }
    return null;
  }

  animated() {
    return Animated;
  }

  easing() {
    return Easing;
  }

  /*storage(){
        return AsyncStorage;
    }

    async storeValue(key, val){
        try {
            await AsyncStorage.setItem(key,val);
        } catch (e) {
            console.log("failed to save key");
        }
    }

    async getValue(key){
        try {
            await AsyncStorage.getItem(key);
        } catch (e) {
            console.log("failed to save key");
        }
    }*/

  hardwareBackHandler() {
    return BackHandler;
  }

  registerUtil(name, util) {
    this.utils[name] = util;
  }

  async share(message) {
    await Share.share(message);
  }

  ShareFunc() {
    return Share;
  }

  platform() {
    return Platform;
  }

  uiMgr() {
    return UIManager;
  }

  devInfo() {
    return DeviceInfo;
  }

  addAppStateListener(type, handler) {
    AppState.addEventListener(type, handler);
  }

  removeAppStateListener(type, handler) {
    AppState.removeEventListener(type, handler);
  }

  /*async getNetworkState(){
        return await NetInfo.getNetworkState();
    }

    configureNetworkReachabilityTest(reachabilityUrl,reachabilityTest,
        reachabilityShortTimeout,reachabilityLongTimeout,reachabilityRequestTimeout){
        NetInfo.configure({
            reachabilityUrl: reachabilityUrl,
            reachabilityTest: reachabilityTest,
            reachabilityLongTimeout: reachabilityLongTimeout,
            reachabilityShortTimeout: reachabilityShortTimeout,
            reachabilityRequestTimeout: reachabilityRequestTimeout
          });
    }

    addNetworkEventListener(handler){
        return NetInfo.addEventListener(handler);
    }

    removeNetworkEventListener(unsubscribe){
        if(unsubscribe) unsubscribe();
    }*/

  runAction(handler) {
    runInAction(handler);
  }

  state() {
    return globalState;
  }

  registerAutoRun(func) {
    autorun(func);
  }
}

export default appEnv = new AppEnv();
