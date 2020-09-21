import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";

export default class QRPositionError extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        inverse={false}
        isActive={this.props.isActive}
        title={this.props.title}
        image={"qr_scan_error"}
        message={this.props.message}
        buttonLabel={this.props.buttonLabel}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}
