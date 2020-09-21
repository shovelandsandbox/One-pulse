import React, { Component } from "react";
import PropTypes from "prop-types";
import { BankForm as BankFormContainer } from "../../../components/containers";
import { CreateBankAccountSuccess as CreateBankAccountSuccessModal } from "../../../modals";
import OTPModal from "../../../modals/OTP";

import BankAccountsDummies from "../../../dummies/BankAccount";
import UserAccountDummies from "../../../dummies/UserAccount";

import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_BANK_CREATE_TITLE = "step_3_create_bank_account_title";

export default class Create extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      bank: "",
      number: "",
      owner: "",

      isOTPModalVisible: false,
      isSuccessModalVisible: false,
    };
  }

  onSubmit() {
    this.setState({ isOTPModalVisible: true });
  }

  onOTPConfirmed() {
    this.setState({
      isOTPModalVisible: false,
      isSuccessModalVisible: true,
    });
  }

  onBankUpdateSuccess() {
    const { navigation } = this.props;
    navigation.pop();

    const _this = this;

    setTimeout(function() {
      _this.setState({ isSuccessModalVisible: false });
    }, 100);
  }

  onChangeValue(form, value) {
    this.setState({
      [form]: value,
    });
  }

  render() {
    return (
      <BankFormContainer
        title={claimMeta(KEY_CLAIM_BANK_CREATE_TITLE).label}
        data={{
          banks: BankAccountsDummies,
          owners: UserAccountDummies,
        }}
        value={{
          bank: this.state.bank,
          number: this.state.number,
          owner: "Pati Fretpolin",
        }}
        onChangeText={(form, value) => this.onChangeValue(form, value)}
        onSubmit={() => this.onSubmit()}
      >
        <CreateBankAccountSuccessModal
          isActive={this.state.isSuccessModalVisible}
          onConfirm={() => this.onBankUpdateSuccess()}
          bank={"Bank Rakyat Indonesia (BRI)"}
          number={"62653982792"}
          owner={"Pati Fertpolin"}
        />

        <OTPModal
          isActive={this.state.isOTPModalVisible}
          onConfirm={() => this.onOTPConfirmed()}
          onClose={() => this.setState({ isOTPModalVisible: false })}
          // error={ "kode yang anda masukkan salah" }
        />
      </BankFormContainer>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};
