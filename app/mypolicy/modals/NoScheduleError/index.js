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
import Styles from "./style";

// ----------------------------------------
// COMPONENT IMPORTS
// ----------------------------------------
import { SuccessModal as SuccessModalContainer } from "../../components/containers";

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
export default class NoScheduleError extends Component {
  // ----------------------------------------
  // ----------------------------------------
  // METHODS
  // ----------------------------------------

  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  // ----------------------------------------
  // ----------------------------------------
  // MAIN RENDER
  // ----------------------------------------

  render() {
    const { meta } = this.props;
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        onClosePress={() => this.props.onClosePress()}
        title={mainHospitalMeta(
          meta.metaDetail.commons,
          MAIN_HOSPITAL_TYPES,
          "modalschedulenotfound"
        )}
        image={"no_schedule_error"}
        message={mainHospitalMeta(
          meta.metaDetail.commons,
          MAIN_HOSPITAL_TYPES,
          "modalschedulemessage"
        )}
        buttonLabel={mainHospitalMeta(
          meta.metaDetail.commons,
          MAIN_HOSPITAL_TYPES,
          "modalschedulebutton"
        )}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }

  // ----------------------------------------
}
