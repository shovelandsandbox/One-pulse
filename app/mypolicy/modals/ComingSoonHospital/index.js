import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_KEY = "FindHospital";
const KEY_MODAL_TITLE = "comingsoonhospitaltitle";
const KEY_MODAL_DESC = "comingsoonhospitaldesc";
const KEY_MODAL_BUTTON = "comingsoonhospitalbutton";

export default class ComingSoonHospital extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={modalComingSoonHospitalMeta(KEY_MODAL_TITLE).label}
        image={"coming_soon_hospital"}
        message={modalComingSoonHospitalMeta(KEY_MODAL_DESC).label}
        buttonLabel={modalComingSoonHospitalMeta(KEY_MODAL_BUTTON).label}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

const modalComingSoonHospitalMeta = key => {
  return metaHelpers.findElement(TYPE_KEY, key);
};
