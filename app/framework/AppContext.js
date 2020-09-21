import React from "react";
import appEnv from "./AppEnv";
import globalState from "./GlobalState";
import ObserverGenericComponent from "./components/GenericComponent";
import R from "ramda";

/*export const AppContext = React.createContext(
);*/

export const ctxVal = {
  env: appEnv,
  globalState: globalState,
};

class GenericContainer extends React.PureComponent {
  render() {
    ctxVal.globalState.lang = this.props.language && R.toLower(this.props.language);
    ctxVal.globalState.auth = this.props.auth;
    return <ObserverGenericComponent {...this.props} appCtx={ctxVal} />;
  }
}

export default GenericContainer;
