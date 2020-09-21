import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { TEAM_MATE } from "../../../../config/images";
import ProgressIndicator from "../ProgressIndicator";

export default class RewardProgress extends React.PureComponent {
  render() {
    const info = this.props.info;
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image
            style={styles.teamIcon}
            source={TEAM_MATE}
            resizeMode={"contain"}
          />
          <Text style={styles.infoText}>{info}</Text>
        </View>
        <View style={styles.progressView}>
          <ProgressIndicator data={this.props.data} />
        </View>
      </View>
    );
  }
}
