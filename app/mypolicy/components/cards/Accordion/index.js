import React, { PureComponent, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { TextM } from "../../../components/derivatives/Text";
import Images from "../../../configs/Images";
import Styles from "./styles";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class Accordion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFullContent: this.props.showAllContent,
    };
    this.setContentPreference = this.setContentPreference.bind(this);
  }

  setContentPreference = () => {
    this.props.hideAccordian && this.props.hideAccordian();
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    const currentState = this.state.showFullContent;
    this.setState({ showFullContent: !currentState });
  }

  close() {
    this.setState({ showFullContent: false });
  }

  render() {
    const { ic_down, ic_up } = Images.illustration.my_policy;
    return (
      <View style={Styles.container}>
        <View style={Styles.titleWrapper}>
          <TextM style={Styles.title}>{this.props.title}</TextM>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setContentPreference()}>
            <Image
              source={this.state.showFullContent ? ic_up : ic_down}
              style={Styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        {this.state.showFullContent && (
          <View style={Styles.childContainer}>{this.props.children}</View>
        )}
      </View>
    );
  }
}

export default Accordion;
