/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  IMPORTS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */

// ----------------------------------------
// PACKAGE IMPORTS
// ----------------------------------------
import React, { Component } from "react";
import { View, Text, Linking } from "react-native";

// ----------------------------------------
// LOCAL & CONFIG IMPORTS
// ----------------------------------------
import { Colors, Sizes } from "../../configs";
import Styles from "./style";

// ----------------------------------------
// COMPONENT IMPORTS
// ----------------------------------------
import { TextLX, TextM, TextMX } from "../../components/derivatives/Text";
import {
  Padder as PadderContainer,
  Modal as ModalContainer,
  VerticalAnimator as VerticalAnimatorContainer,
} from "../../components/containers";
import Icon from "../../components/generics/Icon";

/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  MAIN CLASS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */
const MAIN_HOSPITAL_TYPES = "mainhospital";
const mainHospitalMeta = (meta, types, keys) =>
  meta.find(item => item.type === types && item.key === keys).label;
export default class HospitalFilterDescription extends Component {
  // ----------------------------------------
  // ----------------------------------------
  // RENDERS
  // ----------------------------------------

  renderItemTitle(icon, label) {
    return (
      <View style={Styles.title.container}>
        <Icon name={icon} color={Colors.main.baseRed} />

        <TextMX style={Styles.title.label}>{label}</TextMX>
      </View>
    );
  }

  // ----------------------------------------

  renderTitle() {
    const { meta } = this.props;
    return (
      <VerticalAnimatorContainer order={1}>
        <TextLX>
          {mainHospitalMeta(
            meta.metaDetail.commons,
            MAIN_HOSPITAL_TYPES,
            "filterhospitalservice"
          )}
        </TextLX>
      </VerticalAnimatorContainer>
    );
  }

  // ----------------------------------------

  renderFirstItem() {
    const { meta } = this.props;
    return (
      <VerticalAnimatorContainer order={3}>
        {this.renderItemTitle("pruhospital-friend", "PRUHospital Friend")}

        <View style={Styles.content.container}>
          <TextM color={Colors.main.baseGray}>
            {mainHospitalMeta(
              meta.metaDetail.commons,
              MAIN_HOSPITAL_TYPES,
              "filterhospitalprudentialstaff1"
            )}

            <TextM
              color={Colors.main.baseRed}
              onPress={() => Linking.openURL("https://www.prudential.co.id")}
            >
              www.prudential.co.id
            </TextM>
          </TextM>
        </View>
      </VerticalAnimatorContainer>
    );
  }

  // ----------------------------------------

  renderSecondItem() {
    const { meta } = this.props;
    return (
      <VerticalAnimatorContainer order={5}>
        {this.renderItemTitle("pruhospital-line", "PRUHospital Line")}

        <View style={Styles.content.container}>
          <TextM color={Colors.main.baseGray}>
            {mainHospitalMeta(
              meta.metaDetail.commons,
              MAIN_HOSPITAL_TYPES,
              "filterhospitalprudentialstaff2"
            )}
          </TextM>
        </View>
      </VerticalAnimatorContainer>
    );
  }

  // ----------------------------------------
  // ----------------------------------------
  // MAIN RENDER
  // ----------------------------------------

  render() {
    return (
      <ModalContainer
        isActive={this.props.isActive}
        persistScrollTitle={"Berdasarkan Pelayanan"}
        backgroundColor={Colors.main.baseWhite}
        onClosePress={() => this.props.onClosePress()}
        scrollable
      >
        <PadderContainer>
          {this.renderTitle()}

          {this.renderFirstItem()}

          {this.renderSecondItem()}
        </PadderContainer>
      </ModalContainer>
    );
  }

  // ----------------------------------------
}
