import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";

export default class MarketingContent extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={"Segera Hadir!"}
        image={"marketing_content"}
        message={
          "Fitur Klaim " +
          (this.props.claim ? this.props.claim + " " : "") +
          "melalui Pulse plus. Sementara itu, silakan mengajukan Klaim Kecelakaan melalui Pulse. Ajukan persyaratan ke kami dengan lengkap!"
        }
        buttonLabel={"Selesai"}
        onConfirm={() => this.onConfirm()}
        onClosePress={() => this.onClose()}
        floatingHeader
      />
    );
  }
}
