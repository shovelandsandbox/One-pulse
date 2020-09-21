import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../../configs";
import Styles from "./style";
import Default from "../../../configs/default";
import { TextM, TextS } from "../../derivatives/Text";
import { ImageBase64 } from "../../derivatives/Image";
import Icon from "../../generics/Icon";
import { Padder as PadderContainer } from "../../containers";
import { metaFinder } from "../../../utils";

export default class LifeAssuredRow extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  metaFinders = key => metaFinder("myPolicy", key, "label").label;

  renderBadge() {
    if (!this.props.hasProblem && !this.props.hasAccess) {
      return null;
    }

    let color = Colors.main.successGreen;
    let icon = "rejected";

    if (this.props.hasProblem) {
      color = Colors.main.errorRed;
      icon = "rejected";
    }

    return (
      <View style={[Styles.image.badge.container, { backgroundColor: color }]}>
        <Icon name={icon} color={Colors.main.baseWhite} size={9} />
      </View>
    );
  }

  renderImage() {
    if (this.props.noImage) {
      return null;
    }

    return (
      <View>
        <View style={Styles.image.container}>
          <ImageBase64
            data={this.props.image}
            default={Default.image.profile}
          />
        </View>

        {this.renderBadge()}
      </View>
    );
  }

  renderLabel() {
    if (!this.props.label) {
      return null;
    }

    return (
      <TextS color={Colors.main.inactiveGray} style={Styles.label}>
        {this.props.label}
      </TextS>
    );
  }

  renderSubInfo() {
    if (!this.props.subInfo) {
      return null;
    }

    return (
      <TextS color={Colors.main.baseGray} style={Styles.label}>
        {this.props.subInfo}
      </TextS>
    );
  }

  renderMain() {
    const noPadding = { paddingHorizontal: 0 };
    const { name, rightContentRender } = this.props;
    return (
      <PadderContainer
        style={[Styles.container, this.props.noPadding && noPadding]}
      >
        {this.renderLabel()}

        <View style={Styles.innerContainer}>
          {this.renderImage()}

          <View style={Styles.name.container}>
            <TextM>{name}</TextM>

            {this.renderSubInfo()}
          </View>

          {rightContentRender}
        </View>
      </PadderContainer>
    );
  }

  render() {
    if (this.props.onPress) {
      return (
        <TouchableOpacity onPress={() => this.props.onPress()}>
          {this.renderMain()}
        </TouchableOpacity>
      );
    }

    return <View>{this.renderMain()}</View>;
  }
}

LifeAssuredRow.propTypes = {
  hasProblem: PropTypes.bool,
  hasAccess: PropTypes.bool,
  noImage: PropTypes.bool,
  image: PropTypes.string,
  label: PropTypes.string,
  subInfo: PropTypes.string,
  noPadding: PropTypes.bool,
  name: PropTypes.string,
  rightContentRender: PropTypes.any,
  onPress: PropTypes.func,
  data: PropTypes.object,
};
