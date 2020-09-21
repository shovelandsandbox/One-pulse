/* eslint-disable complexity */
/* eslint-disable max-depth */
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation-tabs";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { getBuiltinComponent } from "../ComponentTypes";
import { componentRegistry } from "../ComponentRegistry";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { observer } from "mobx-react";
import appEnv from "../AppEnv";
import { ctxVal } from "../AppContext";
import R from "ramda";

import Icon from "react-native-vector-icons/FontAwesome";

import { CoreUtils } from "@pru-rt-internal/pulse-common";

const { logFirebaseEvent } = CoreUtils;

// eslint-disable-next-line react/require-optimization
class GenericComponent extends Component {
  constructor(props) {
    super(props);
    let screen = this.props.screen;
    if (!screen) {
      if (this.props.navigation) {
        screen = this.props.navigation.getParam("screen");
        if (!screen) {
          screen = this.props.navigation.state.routeName;
        }
      }
    }
    this.screen = screen;
    console.log("creating generic component:" + this.screen);
    this.isRoot = this.screen === "Root";
    this._onRefresh = this._onRefresh.bind();
    this.state = {};
  }

  async componentDidMount() {
    if (!this.screen) {
      this.setState({ status: "failed", errMsg: "No screen specified" });
    } else {
      console.log("Generic component mount:" + this.screen);
      await this.loadComponentDef();
    }
  }

  // eslint-disable-next-line complexity
  async componentDidUpdate(prevProps) {
    console.log("componentDidUpdate invoked for screen:" + this.screen);
    if (this.props.screenDef) {
      if (this.props.screenDef !== prevProps.screenDef)
        await this.loadComponentDef();
    } else if (this.props.dataFetcher) {
      const screenDef = await this.props.dataFetcher();
      if (screenDef !== this.state.screenDef) {
        this.setState({ screenDef: screenDef });
        await this.loadComponentDef();
      }
    } else if (this.props.componentDef) {
      //TODO
    } else {
      if (
        this.props.screen !== prevProps.screen ||
        (this.props.language && this.props.language !== prevProps.language)
      ) {
        const compDef = await componentRegistry.loadComponentDef(
          this.props.screen
        );
        if (compDef) {
          this.updateState(compDef);
        }
      }
    }
    if (this.state.model && this.state.model.update) {
      this.state.model.update(prevProps);
    }
  }

  registerDisposable(disposable) {
    if (!this.disposables) this.disposables = [];
    this.disposables.push(disposable);
  }

  // eslint-disable-next-line complexity
  async loadComponentDef() {
    try {
      let compDef;
      if (this.props.screenDef) {
        compDef = await componentRegistry.createComponentDef(
          this.props.screenDef
        );
        this.updateState(compDef);
      } else {
        if (this.props.dataFetcher) {
          let componentDefjson = this.state.screenDef;
          if (!componentDefjson) {
            componentDefjson = await this.props.dataFetcher();
            this.setState({ screenDef: componentDefjson });
          }
          if (componentDefjson) {
            compDef = await componentRegistry.createComponentDef(
              componentDefjson
            );
          }
          this.updateState(compDef);
        } else {
          compDef = this.props.componentDef;
          if (compDef) {
            this.updateState(compDef);
          } else {
            if (!this.state.componentDef) {
              compDef = componentRegistry.getComponentDef(this.screen);
              if (compDef) this.updateState(compDef);
            }
            compDef = await componentRegistry.loadComponentDef(this.screen);
            if (compDef) {
              this.updateState(compDef);
            } else {
              if (!this.state.componentDef) this.setState({ status: "failed" });
            }
          }
        }
      }
    } catch (err) {
      console.log("Error while loading:: " + err);
      console.log(err.stack);
      this.setState({ status: "failed", errMsg: err });
    }
  }

  updateState(compDef) {
    if (!compDef) {
      this.setState({ status: "failed" });
    } else {
      console.log("update state def for screen:" + this.screen);
      const stateObj = {};
      stateObj.componentDef = compDef;
      if (this.props.model || compDef.isDependent) {
        stateObj.model = this.props.model; //inherit the model from parent
      } else {
        // if (
        //   R.isEmpty(compDef.modelEtags) ||
        //   compDef.modelEtags != this.modelEtags
        // ) {
        let model = compDef.createModel();
        this.modelEtags = compDef.modelEtags;
        if (!model) model = {};
        model.props = this.props;
        model.compDef = compDef;
        //if(this.state.model){
        //Object.assign(model,this.state.model);
        //}else{
        if (model.init) {
          model.init(this.props);
        }
        //}
        stateObj.model = model;
      }
      // }
      this.setState(stateObj);
    }
  }

  componentWillUnmount() {
    console.log("Generic component unmount:" + this.screen);
    if (this.state.model && this.state.model.close) {
      this.state.model.close(this.props);
    }
    if (this.disposables) {
      for (disposable in this.disposables) {
        disposable.close();
      }
    }
    componentRegistry.unmountComponent(this.screen);
  }

  render() {
    const componentDef = this.state.componentDef;
    if (componentDef) {
      console.log("Rendering from def:" + this.screen);
      const comp = this.createComponent(componentDef);
      if (this.props.isRefreshOnFocus) {
        return this.insideScrollView(comp);
      }
      return comp;
    }
    if (this.state.status == "nopackagefound") {
      return this.defaultRender();
    } else if (this.state.status == "failed") {
      if (this.props.renderingFailedHandler) {
        return this.props.renderingFailedHandler();
      }
      logFirebaseEvent("JSXRenderFailed", { screen: this.screen });
      if (!__DEV__) {
        return null;
      }
      return this.insideScrollView(
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="exclamation-triangle" size={30} color="red" />
          <Text style={{ color: "red" }}>
            Rendering Failed:{this.state.errMsg}
          </Text>
        </View>
      );
    }
    if (!this.props.hideLoader) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" />
        </View>
      );
    }

    return null;
  }

  defaultRender() {
    if (this.props.defaultRender) {
      return this.props.defaultRender();
    }
    logFirebaseEvent("JSXRenderFailed", {
      screen: this.screen,
      from: "DefaultRender",
    });
    if (!__DEV__) {
      return null;
    }
    return this.insideScrollView(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon name="exclamation-triangle" size={30} color="blue" />
        <Text style={{ color: "blue" }}>No package definition found</Text>
      </View>
    );
  }

  handleNavigationOnWillFocus() {
    if (this.props.isRefreshOnFocus) {
      console.log("Navigation focus on screen:" + this.props.screen);
      this.setState({ refreshing: true, status: "loading" });
      (async () => {
        await this.loadComponentDef();
        this.setState({ refreshing: false });
      })();
    }
  }

  handleNavigationOnDidFocus() {}

  handleNavigationOnDidBlur() {}

  handleNavigationOnWillBlur() {}

  insideScrollView(innerView) {
    if (!this.isRoot && !this.props.isScreen) return innerView;
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={this._refreshControl()}
      >
        {innerView}
      </ScrollView>
    );
  }

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
      />
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true, status: "loading" });
    (async () => {
      await this.loadComponentDef();
      this.setState({ refreshing: false });
    })();
  };

  createComponent(componentDef) {
    const layout = componentDef.layout;
    let isVisible = true;
    if (layout.visible != null) {
      isVisible = this.evalParamValue("visible", layout.visible);
    }
    if (isVisible) {
      return this.createComponentTree(layout);
    }
    return null;
  }

  // eslint-disable-next-line complexity
  createComponentTree(componentRef) {
    const children = componentRef.children;
    let childComponents = null;
    if (children) {
      childComponents = [];
      if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
          if (children[i].loop) {
            const loopCol = this.evalParamValue("loop", children[i].loop.var);
            if (loopCol) {
              let index = 0;
              for (const item in loopCol) {
                if (!children[i].params) {
                  children[i].params = {};
                }
                children[i].params["loopItem"] = item;
                children[i].params["loopIndex"] = index;
                const childComp = this.createComponentTree(children[i]);
                if (childComp) {
                  childComponents.push(childComp);
                }
                index++;
              }
            }
          } else {
            const childComp = this.createComponentTree(children[i], null);
            if (childComp) {
              childComponents.push(childComp);
            }
          }
        }
      } else {
        const paramVal = this.evalParamValue("children", children);
        if (paramVal) {
          if (Array.isArray(paramVal)) {
            childComponents = paramVal;
          } else {
            childComponents.push(paramVal);
          }
        }
      }
    }
    return this.createComponentFromRef(componentRef, childComponents);
  }

  createComponentFromRef(componentRef, childComponents) {
    const type = componentRef.type;
    if (!type) return null;
    let isVisible = true;
    if (componentRef.visible != null) {
      isVisible = this.evalParamValue("visible", componentRef.visible);
    }
    if (!isVisible) return null;
    if (type == "String") {
      return this.evalParamValue("value", componentRef.params.value);
    }
    if (type == "NavigationEvents") {
      const naviEventProps = {};
      naviEventProps.onWillFocus = payload =>
        this.handleNavigationOnWillFocus();
      naviEventProps.onDidFocus = payload => this.handleNavigationOnDidFocus();
      naviEventProps.onWillBlur = payload => this.handleNavigationOnWillBlur();
      naviEventProps.onDidBlur = payload => this.handleNavigationOnDidBlur();
      return React.createElement(NavigationEvents, naviEventProps);
    } else if (type == "StackNavigator") {
      if (this.isRoot) {
        return this.createRootAppContainer(
          this.createStackNavigation(componentRef)
        );
      }
      return this.createReactElement(this.createStackNavigation(componentRef));
    } else if (type == "TabNavigator") {
      return this.createTabNavigation(componentRef);
    } else if (type == "BottomTabNavigator") {
      if (this.isRoot) {
        return this.createRootAppContainer(
          this.createBottomTabNavigation(componentRef)
        );
      }
      return this.createReactElement(
        this.createBottomTabNavigation(componentRef)
      );
    } else if (type == "MaterialBottomTabNavigator") {
      if (this.isRoot) {
        return this.createRootAppContainer(
          this.createMaterialBottomTabNavigator(componentRef)
        );
      }
      return this.createReactElement(
        this.createMaterialBottomTabNavigator(componentRef)
      );
    } else if (type == "MaterialTopTabNavigator") {
      if (this.isRoot) {
        return this.createRootAppContainer(
          this.createMaterialTopTabNavigator(componentRef)
        );
      }
      return this.createReactElement(
        this.createMaterialTopTabNavigator(componentRef)
      );
    } else if (type == "SwitchNavigator") {
      if (this.isRoot) {
        return this.createRootAppContainer(
          this.createSwitchNavigator(componentRef)
        );
      }
      return this.createReactElement(this.createSwitchNavigator(componentRef));
    } else if (type == "DrawerNavigator") {
      if (this.isRoot) {
        return this.createRootAppContainer(
          this.createDrawerNavigator(componentRef)
        );
      }
      return this.createReactElement(this.createDrawerNavigator(componentRef));
    }
    const componentType = getBuiltinComponent(type);
    let compParams = this.evalParamValues(componentRef.params);
    //console.log("Bulitincomponent:" + type + " " + componentType);
    if (componentType) {
      return React.createElement(componentType, compParams, childComponents);
    }
    if (!compParams) compParams = {};
    compParams.screen = type;
    compParams.appCtx = ctxVal;
    // compParams.appCtx = this.props.appCtx;
    if (this.props.navigation) {
      compParams.navigation = this.props.navigation;
    }
    compParams.child = true;
    compParams.refreshing = this.state.refreshing;
    const childCompDef = componentRegistry.getComponentDef(type);
    if (childCompDef) {
      if (childCompDef.isDependent) {
        compParams.model = this.state.model; //pass the model to childcomponent
      }
    }
    return React.createElement(
      ObserverGenericComponent,
      compParams,
      childComponents
    );
  }

  createReactElement(componentType, params, childComponents) {
    const compProps = this.evalParamValues(params);
    return React.createElement(componentType, compProps, childComponents);
  }

  evalParamValues(params) {
    const compProps = {};
    //attach props attributes
    if (params) {
      for (paramName in params) {
        const paramVal = params[paramName];
        const val = this.evalParamValue(paramName, paramVal);
        if (val) {
          compProps[paramName] = val;
        }
      }
    }
    return compProps;
  }

  evalParamValue(paramName, paramVal) {
    if (!paramVal) return null;
    if (typeof paramVal == "function") {
      const valObj = paramVal(this);
      if (typeof valObj == "function") {
        //return valObj(this.props);
        return valObj;
      }
      return this.evalParamValue(paramName, valObj);
    } else if (Array.isArray(paramVal)) {
      return paramVal.map(item => {
        return this.evalParamValue(paramName, item);
      });
    } else if (typeof paramVal == "object") {
      const updatedObj = {};
      const keys = Object.getOwnPropertyNames(paramVal);
      keys.map(key => {
        const val = paramVal[key];
        updatedObj[key] = this.evalParamValue(paramName, val);
      });
      return updatedObj;
    }
    return paramVal; //TODO
  }

  createRootAppContainer(navigator) {
    const appContainer = createAppContainer(navigator);
    const params = {};
    params.onNavigationStateChange = (prevState, currentState, action) => {
      const currentRouteName = appEnv.getActiveRouteName(currentState);
      const previousRouteName = appEnv.getActiveRouteName(prevState);
      if (previousRouteName !== currentRouteName) {
        console.log(
          "Navigation Screen change from " +
            previousRouteName +
            " to " +
            currentRouteName
        );
      }
    };
    params.uriPrefix = "myApp://";
    return React.createElement(appContainer, params);
  }

  createStackNavigation(componentRef) {
    const params = componentRef.params;
    const screens = params.screens;
    const stackNavConfig = this.evalNavConfig(params.config);
    const routeConfigs = this.createNavigationRouteConfigs(
      screens,
      stackNavConfig,
      "stack"
    );
    return createStackNavigator(routeConfigs, stackNavConfig);
  }

  createTabNavigation(componentRef) {
    const params = componentRef.params;
    const screens = params.screens;
    const stackNavConfig = this.evalNavConfig(params.config);
    const routeConfigs = this.createNavigationRouteConfigs(
      screens,
      stackNavConfig,
      "tab"
    );
    return createTabNavigator(routeConfigs, stackNavConfig);
  }

  createBottomTabNavigation(componentRef) {
    const params = componentRef.params;
    const screens = params.screens;
    const stackNavConfig = this.evalNavConfig(params.config);
    const routeConfigs = this.createNavigationRouteConfigs(
      screens,
      stackNavConfig,
      "tab"
    );
    return createBottomTabNavigator(routeConfigs, stackNavConfig);
  }

  createMaterialBottomTabNavigator(componentRef) {
    const params = componentRef.params;
    const screens = params.screens;
    const stackNavConfig = this.evalNavConfig(params.config);
    const routeConfigs = this.createNavigationRouteConfigs(
      screens,
      stackNavConfig,
      "tab"
    );
    return createMaterialBottomTabNavigator(routeConfigs, stackNavConfig);
  }

  createMaterialTopTabNavigator(componentRef) {
    const params = componentRef.params;
    const screens = params.screens;
    const stackNavConfig = this.evalNavConfig(params.config);
    const routeConfigs = this.createNavigationRouteConfigs(
      screens,
      stackNavConfig,
      "tab"
    );
    return createMaterialTopTabNavigator(routeConfigs, stackNavConfig);
  }

  createSwitchNavigator(componentRef) {
    const params = componentRef.params;
    const screens = params.screens;
    const stackNavConfig = this.evalNavConfig(params.config);
    const routeConfigs = this.createNavigationRouteConfigs(
      screens,
      stackNavConfig,
      "switch"
    );
    return createSwitchNavigator(routeConfigs, stackNavConfig);
  }

  createDrawerNavigator(componentRef) {
    const params = componentRef.params;
    const screens = params.screens;
    const stackNavConfig = this.evalNavConfig(params.config);
    const routeConfigs = this.createNavigationRouteConfigs(
      screens,
      stackNavConfig,
      "drawer"
    );
    return createDrawerNavigator(routeConfigs, stackNavConfig);
  }

  evalNavConfig(navConfig) {
    const navOptions = this.evalParamValue("config", navConfig);
    return navOptions;
  }

  createNavigationRouteConfigs(screens, navConfig, navkind) {
    const routeConfigs = {};
    const initialScreen = navConfig ? navConfig.initialRouteName : null;
    const defRefreshOnFocus = navkind == "tab" ? true : false;
    let cnt = 0;
    const evalScreens = this.evalParamValue("screens", screens);
    for (const screenName in evalScreens) {
      let isRefreshOnFocus = defRefreshOnFocus;
      const screenDef = {};
      const screenProps = evalScreens[screenName];
      let isPathDefined = false;
      for (screenProp in screenProps) {
        if (screenProp === "path") {
          isPathDefined = true;
        }
        screenDef[screenProp] = screenProps[screenProp];
      }
      if (
        !isRefreshOnFocus &&
        ((initialScreen && initialScreen == screenName) || cnt == 0)
      ) {
        isRefreshOnFocus = true;
      }
      screenDef["screen"] = props => (
        <ObserverGenericComponent
          {...props}
          screen={screenName}
          appCtx={ctxVal}
          isRefreshOnFocus={isRefreshOnFocus}
          isScreen={true}
        />
      );
      if (!isPathDefined) {
        screenDef["path"] = screenName;
      }
      routeConfigs[screenName] = screenDef;
      cnt++;
    }
    return routeConfigs;
  }
}

const ObserverGenericComponent = observer(GenericComponent);

export default ObserverGenericComponent;
