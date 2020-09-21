import React, { Component } from "react";
import { WebView, Platform } from "react-native";
import { Colors, Sizes } from "../../../configs";

const injectedScript = function() {
  function waitForBridge() {
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 100);
    } else {
      postMessage(
        Math.max(
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.body.clientHeight,
          document.body.scrollHeight
        )
      );
    }
  }
  waitForBridge();
};

export default class HTML extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 300,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    const androidScript =
      "window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');" +
      "(" +
      String(injectedScript) +
      ")();";
    const iosScript =
      "(" +
      String(injectedScript) +
      ")();" +
      "window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');";

    return (
      <WebView
        style={{ height: this.state.height }}
        injectedJavaScript={Platform.OS === "ios" ? iosScript : androidScript}
        javaScriptEnabled={true}
        automaticallyAdjustContentInsets={false}
        onMessage={e => this.setState({ height: parseInt(e.nativeEvent.data) })}
        scrollEnabled={false}
        useWebKit={false}
        scalesPageToFit={false}
        source={{
          html:
            `
          <div style="
            font-size: 16px;
            line-height: 24px;
            font-family: 'SF Pro Text';
            text-align: justify;
            width: ` +
            (Sizes.screen.width - Sizes.screen.paddingHorizontal * 2 - 10) +
            `px;
            color: ` +
            Colors.main.baseGray +
            `">` +
            this.props.html +
            `</div>`,
        }}
      />
    );
  }
}
