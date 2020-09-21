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
import { View } from "react-native";

// ----------------------------------------
// LOCAL & CONFIG IMPORTS
// ----------------------------------------
import { Colors } from "../../configs";
import Styles from "./style";

// ----------------------------------------
// COMPONENT IMPORTS
// ----------------------------------------
import { TextLX } from "../../components/derivatives/Text";
import { InputFilterCheckButtons } from "../../components/derivatives/Input";
import {
  Padder as PadderContainer,
  Modal as ModalContainer,
} from "../../components/containers";
import HospitalFilterDescriptionModal from "../HospitalFilterDescription";
import { BottomButtonGroup as BottomButtonGroupCard } from "../../components/cards";

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
export default class HospitalFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHospitalFilterDescriptionModalVisible: false,
    };
  }

  renderBottom() {
    const { meta } = this.props;
    return (
      <BottomButtonGroupCard
        transparentBackground
        submitLabel={mainHospitalMeta(
          meta.metaDetail.commons,
          MAIN_HOSPITAL_TYPES,
          "filterhospitalselect"
        )}
        onSubmit={this.props.onConfirm ? () => this.props.onConfirm() : {}}
      />
    );
  }

  renderTitle() {
    return (
      <View style={Styles.title.container}>
        <TextLX>Filter</TextLX>
      </View>
    );
  }

  renderFilters() {
    const { meta } = this.props;
    return (
      <View>
        <InputFilterCheckButtons
          label={mainHospitalMeta(
            meta.metaDetail.commons,
            MAIN_HOSPITAL_TYPES,
            "filterhospitalpartner"
          )}
          options={this.props.associatedTPA}
          values={this.props.filterAssociatedTPA}
          onSelect={val => this.props.setFilter("filterAssociatedTPA", val)}
        />
        <InputFilterCheckButtons
          label={mainHospitalMeta(
            meta.metaDetail.commons,
            MAIN_HOSPITAL_TYPES,
            "filterhospitalpriorityselect"
          )}
          values={this.props.filterPriority}
          options={[
            {
              label: mainHospitalMeta(
                meta.metaDetail.commons,
                MAIN_HOSPITAL_TYPES,
                "filterhospitalpriority"
              ),
              value: "isPrefered",
            },
            {
              label: mainHospitalMeta(
                meta.metaDetail.commons,
                MAIN_HOSPITAL_TYPES,
                "filterhospitalnonpriority"
              ),
              value: "isNotPrefered",
            },
          ]}
          onSelect={val => this.props.setFilter("filterPriority", val)}
        />
        <InputFilterCheckButtons
          onTooltipPress={() =>
            this.setState({ isHospitalFilterDescriptionModalVisible: true })
          }
          label={mainHospitalMeta(
            meta.metaDetail.commons,
            MAIN_HOSPITAL_TYPES,
            "filterhospitalservice"
          )}
          options={this.props.services}
          values={this.props.filterServices}
          onSelect={val => this.props.setFilter("filterServices", val)}
        />
      </View>
    );
  }

  render() {
    const { meta } = this.props;
    return (
      <ModalContainer
        isActive={this.props.isActive}
        bottomContent={this.renderBottom()}
        backgroundColor={Colors.main.baseWhite}
        onClosePress={this.props.onClosePress}
      >
        <PadderContainer>
          {this.renderTitle()}

          {this.renderFilters()}
        </PadderContainer>
        <HospitalFilterDescriptionModal
          meta={meta}
          isActive={this.state.isHospitalFilterDescriptionModalVisible}
          onClosePress={() =>
            this.setState({ isHospitalFilterDescriptionModalVisible: false })
          }
        />
      </ModalContainer>
    );
  }
}
