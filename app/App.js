import React from "react";
import { connect } from "react-redux";
import {
  CoreConfig,
  CoreActionTypes,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

class App extends React.PureComponent {
  componentDidMount() {
    metaHelpers.restoreOfflineImageCache();
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      context: pageKeys.ALL,
      type: CoreActionTypes.APP_LOADED
    });
  }

  render() {
    return null;
  }
}

export default connect()(App);
