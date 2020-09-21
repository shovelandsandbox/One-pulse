import React from "react";
import { Alert, View } from "react-native";

class PruAlert extends React.PureComponent {
  render() {
    Alert.alert("Face login failed.", "Please try your pulse user id.", [
      { text: "cancel", style: "cancel" }
    ]);
    return <View></View>;
  }
}

export default PruAlert;
