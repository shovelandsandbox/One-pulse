/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import XHeader from "../XHeader";
import ConnectedNotificationIcon from "../ConnectedNotificationIcon";
import ConnectedProfileImage from "../ConnectedProfileImage";
import ConnectedPulseLogo from "../ConnectedPulseLogo";
import ConnectedRewardsIcon from "../ConnectedRewardsIcon";


const rightComponent = props => {
  return (
    <View style={styles.rightContainer}>
      <ConnectedRewardsIcon {...props} />
      <ConnectedNotificationIcon {...props} />
    </View>
  );
};

export default class PulseAppHeader extends PureComponent {
  render() {
    return (
      <XHeader
        leftComponent={<ConnectedProfileImage onPress={this.props.onPress ? this.props.onPress : null} {...this.props}/>}
        leftStyle={{
          padding: this.props.showBackButton ? 0 : 25
        }}
        midComponent={<ConnectedPulseLogo />}
        midStyle={{
          paddingLeft: 15
        }}
        rightComponent={rightComponent(this.props)}
        rightStyle={{
          padding: 15,
          paddingBottom: 10
        }}
        colors={["#ec1c2e", "#a21421"]}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  rightContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
