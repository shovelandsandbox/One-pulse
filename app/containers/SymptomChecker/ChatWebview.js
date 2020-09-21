import React, { Component } from "react";
import { WebView } from "react-native";
import PropTypes from "prop-types";

export default class ChatWebview extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <WebView source={{ uri: this.props.navigation.state.params.url }} />;
  }
}

ChatWebview.propTypes = {
  navigation: PropTypes.object,
};
