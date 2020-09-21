import React, { Component } from "react";
import Styles from "./style";
import { InputString, InputRadioPicker } from "../../derivatives/Input";
import {
  Auth as AuthContainer,
  Padder as PadderContainer,
  HorizontalAnimator as HorizontalAnimatorContainer
} from "../../containers";

import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_BANK_ACCOUNT_OWNER = "step_3_edit_bank_account_owner_label";
const KEY_CLAIM_ACCOUNT_OWNER = "step_3_edit_bank_account_owner";
const KEY_CLAIM_BANK_NAME = "step_3_edit_bank_account_bank_label";
const KEY_CLAIM_BANK_SELECT = "step_3_select_bank_title";
const KEY_CLAIM_BANK_SEARCH = "step_3_select_bank_search";
const KEY_CLAIM_BANK_ACCOUNT_NUMBER = "step_3_edit_bank_account_number_label";
const KEY_CLAIM_BANK_SAVE = "claim_save";

export default class Create extends Component {
  onSubmit() {
    this.props.onSubmit();
  }

  updateValue(form, value) {
    if (this.props.onChangeText) {
      this.props.onChangeText(form, value);
    }
  }

  renderForms() {
    return (
      <PadderContainer>
        <HorizontalAnimatorContainer order={3}>
          <InputRadioPicker
            label={claimMeta(KEY_CLAIM_BANK_NAME).label}
            modalTitle={claimMeta(KEY_CLAIM_BANK_SELECT).label}
            // modalSearchablePlaceholder={"Cari Bank"}
            style={Styles.form.bankPicker}
            options={this.props.data.banks}
            value={this.props.value ? this.props.value.bank : null}
            onChangeText={value => this.updateValue("bankCode", value)}
          />
        </HorizontalAnimatorContainer>

        <HorizontalAnimatorContainer order={5}>
          <InputString
            label={claimMeta(KEY_CLAIM_BANK_ACCOUNT_NUMBER).label}
            style={Styles.form.accountNumber}
            keyboardType={"numeric"}
            paddingTop={this.props.value.number === "" ? 5 : 0}
            value={this.props.value.number}
            onChangeText={value => this.updateValue("accountNo", value)}
          />
        </HorizontalAnimatorContainer>

        <HorizontalAnimatorContainer order={7}>
          <InputRadioPicker
            label={claimMeta(KEY_CLAIM_BANK_ACCOUNT_OWNER).label}
            modalTitle={claimMeta(KEY_CLAIM_ACCOUNT_OWNER).label}
            // modalImageMapper={option => option.image}
            options={this.props.data.owners}
            value={this.props.value ? this.props.value.owner : null}
            onChangeText={value => this.updateValue("accountName", value)}
          />
        </HorizontalAnimatorContainer>
      </PadderContainer>
    );
  }

  render() {
    return (
      <AuthContainer
        title={this.props.title}
        buttonLabel={claimMeta(KEY_CLAIM_BANK_SAVE).label}
        onSubmit={() => this.onSubmit()}
      >
        {this.renderForms()}

        {this.props.children}
      </AuthContainer>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};
