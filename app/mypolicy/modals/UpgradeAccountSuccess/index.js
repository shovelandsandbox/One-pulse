/* eslint-disable import/named */
import React, { Component } from "react";
import { connect } from "react-redux";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import {
  CoreUtils,
  firebaseEvents,
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../../actions";
const {logFirebaseEvent} = CoreUtils;

class UpgradeAccountSuccess extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    // logFirebaseEvent(firebaseEvents.Pru_Services_Signup_Complete.name,firebaseEvents.Pru_Services_Signup_Complete.params);
    // this.props.dispatchEvent(events.PRUServicesSignupCompleteClick);
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={this.props.title}
        image={"upgrade_account_success"}
        message={this.props.message}
        buttonLabel={this.props.buttonLabel}
        onConfirm={() => this.onConfirm()}
      />
    );
  }
}

export default connect(null,{
  dispatchEvent
})(UpgradeAccountSuccess);