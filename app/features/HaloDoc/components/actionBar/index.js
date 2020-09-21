import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { BACK, HALODOC_INLINE_LOGO, SEARCH_ICON} from "../../../../config/images";
import styles from "./styles";

export default class HaloDocActionBar extends Component {
  render() {
    return (
      <View style={styles.actionBarStyle}>
        <TouchableOpacity
          onPress={this.props.onGoBack}
          accessibilityLabel="haloDocHeader"
        >
          <Image style={styles.backImageStyle} source={BACK} />
        </TouchableOpacity>

        <View style={[styles.actionBarRightContainerStyle, !this.props.menuIcon2 &&  styles.actionBarRightContainerStyle2]}>
          {this.props.menuIcon2 && (
            <TouchableOpacity onPress={this.props.onMenuIcon2Click}>
              <Image
                style={styles.menuIcon2Style}
                source={this.props.menuIcon2}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            accessibilityLabel="home"
            style={styles.haloDocImageContainerStyle}
          >
            <Image
              style={styles.haloDocImageStyle}
              resizeMode="contain"
              source={HALODOC_INLINE_LOGO}
            />
          </TouchableOpacity>
          </View>
        </View>
     
    );
  }
}
