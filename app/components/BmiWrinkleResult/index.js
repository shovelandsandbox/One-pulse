import React, { PureComponent } from "react";
import { View, Dimensions, PixelRatio } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { Avatar } from "react-native-elements";
import DetailArrowCell from "../DetailArrowCell";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export default class BmiWrinkleResult extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.border, {borderTopColor : this.props.color}]}>
          <View style={styles.avatarContainer}>
            <Avatar
              source={this.props.imageUrl}
              width={deviceWidth * 0.60}
              height={deviceWidth * 0.65}
              avatarStyle = {{ borderRadius: 20 }}
              overlayContainerStyle={{ borderRadius: 20 }}
            />
          </View>
          <View style={styles.resultView}>
            <DetailArrowCell
              labelText={this.props.resultHeading}
              onPress={() => {}}
              hideArrow={true}
              showRightText={true}
              rightLabel={this.props.result}
              heightProp={40}
              highlightRightText={true}
            />
            <DetailArrowCell
              labelText={this.props.statusHeading}
              onPress={() => {}}
              hideArrow={true}
              showRightText={true}
              rightLabel={this.props.status}
              heightProp={40}
              highlightRightText={true}
              numberOfLines= {this.props.numberOfLines ? this.props.numberOfLines : 1}
            />
            <DetailArrowCell
              labelText={this.props.ageHeading}
              onPress={() => {}}
              hideArrow={true}
              showRightText={true}
              rightLabel={this.props.age}
              heightProp={40}
              highlightRightText={true}
            />
          </View>
        </View>
      </View>
    );
  }
}
