/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import {
  MENU_LEFT_ARROW_WHITE
} from "../../config/images";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default class XHeader extends PureComponent {
  render() {
    const {
      leftComponent,
      leftStyle,
      rightComponent,
      rightStyle,
      containerStyle,
      midComponent,
      midStyle,
    } = this.props;
    return (
      <LinearGradient
        colors={this.props.colors}
        style={[styles.container, containerStyle]}
      >
        <View>
          {this.props.showBackButton && this.props.goBack ? 
            <TouchableOpacity onPress={() => {this.props.goBack();}} style={styles.backButtonContainer}>
              <Image source={MENU_LEFT_ARROW_WHITE} style={styles.backButtonImage}/>
            </TouchableOpacity> : null
          }
        </View>
        <View style={{justifyContent: "space-between", flexDirection: "row", flex: 1}}>
          {leftComponent && (
            <View style={[styles.left, leftStyle]}>{leftComponent}</View>
          )}
          {midComponent && (
            <View style={[styles.mid, midStyle]}>{midComponent}</View>
          )}
          {rightComponent && (
            <View style={[styles.right, rightStyle]}>{rightComponent}</View>
          )}
        </View>
      </LinearGradient>
    );
  }
}

XHeader.propTypes = {
  leftComponent: PropTypes.obj,
  rightComponent: PropTypes.obj,
  leftStyle: PropTypes.obj,
  rightStyle: PropTypes.obj,
  containerStyle: PropTypes.obj,
  midComponent: PropTypes.obj,
  midStyle: PropTypes.obj,
  colors: PropTypes.arrayOf(PropTypes.string),
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    flexDirection: "row",
    height: 56,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: screenWidth,
  },

  left: {
    justifyContent: "center"
  },
  mid: {
    justifyContent: "center"
  },
  right: {
    justifyContent: "center"
  },
  backButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingLeft: 25,
    paddingRight: 10
  },
  backButtonImage: {
    height: 15,
    width: 15
  },
});
