/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextM } from "../../derivatives/Text";
import Icon from "../../generics/Icon";
import { Padder as PadderContainer } from "../../containers";
import { path } from "ramda";
import lang from "../../../screens/MyPolicy/lang";
import IMAGES from "../../../configs/Images"
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
export default class RowMenu extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  renderIcon() {
    if (!this.props.icon) {
      return null;
    }

    return (
      <View style={Styles.icon.container}>
        <Icon name={this.props.icon} color={Colors.main.baseRed} />
      </View>
    );
  }

  renderRightArrow() {
    return (
      <View style={[Styles.arrow.container, { alignItems: "flex-end" }]}>
        <Image
          source={IMAGES.illustration.my_policy.ic_slider_left}
          style={{ transform: [{ rotate: '180deg' }], tintColor: '#000000' }}
        />
      </View>
    );
  }

  renderArrow() {
    if (this.props.noArrow || this.props.rightControl) {
      return null;
    }

    const flexEnd = { alignItems: "flex-end" };

    return (
      <View style={[Styles.arrow.container, flexEnd]}>
        <Icon
          name={this.props.actionIcon || "next"}
          color={Colors.main.inactiveGray}
        />
      </View>
    );
  }

  renderAddBeneficiariesButton() {
    const { rowBtnClicked } = this.props;
    return (
      <View style={[Styles.buttonContainer, { alignItems: "flex-end" }]}>
        <TouchableOpacity
          onPress={() => {
            if (rowBtnClicked) {
              rowBtnClicked();
            }
          }}
          style={Styles.addBeneficaryContainer}
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
        >
          <Text style={{...Styles.addBeneficiaries, ...configureLineHeight("15")}}>
            {lang.updateBeneficiary()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderRightControl() {
    if (!this.props.rightControl) {
      return null;
    }

    const flexEnd = { alignItems: "flex-end" };

    return (
      <View style={[Styles.arrow.container, flexEnd]}>
        {this.props.rightControl}
      </View>
    );
  }

  // eslint-disable-next-line complexity
  render() {
    const noBottomBorder = { borderBottomWidth: 0 };
    const { icon, policyData, updateBeneficiaryRequired, showArrowRight } = this.props;
    const noOfBeneficiaries = path(
      ["productOptions", "0", "options", "noOfBeneficiaries"],
      policyData
    );
    const showBeneficiary = noOfBeneficiaries
      ? parseInt(noOfBeneficiaries) > 0
      : true;
    const loadBeneficiaryButton =
      icon === "benefit" && showBeneficiary && updateBeneficiaryRequired;
    return (
      <TouchableOpacity
        onPress={this.props.onPress ? () => this.props.onPress() : () => { }}
      >
        <PadderContainer
          style={[Styles.container, this.props.noBorder && noBottomBorder]}
        >
          {this.renderIcon()}

          <View style={Styles.label.container}>
            <TextM
              color={this.props.color ? this.props.color : Colors.main.fontGray}
              style={this.props.textStyle}
            >
              {this.props.label}
            </TextM>
          </View>
          {showArrowRight && this.renderRightArrow()}
          {/* {!loadBeneficiaryButton && this.renderArrow()}

          {!loadBeneficiaryButton && this.renderRightControl()} */}

          {/* {loadBeneficiaryButton && this.renderAddBeneficiariesButton()} */}
        </PadderContainer>
      </TouchableOpacity>
    );
  }
}

RowMenu.propTypes = {
  icon: PropTypes.string,
  noArrow: PropTypes.bool,
  rightControl: PropTypes.any,
  actionIcon: PropTypes.string,
  onPress: PropTypes.func,
  noBorder: PropTypes.bool,
  color: PropTypes.string,
  label: PropTypes.string,
};
