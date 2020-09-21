/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../configs";
import Styles from "./style";
import { TextLX, TextM } from "../../components/derivatives/Text";
import {
  BottomButtonGroup as BottomButtonGroupCard,
  Bank as BankCard
} from "../../components/cards";
import {
  Padder as PadderContainer,
  Modal as ModalContainer,
  VerticalAnimator as VerticalAnimatorContainer
} from "../../components/containers";
import Toggle from "../../components/generics/Toggle";
import {
  DeleteBankAccountSuccess as DeleteBankAccountSuccessModal,
  DeleteBankAccountConfirmation as DeleteBankAccountConfirmationModal
} from "../index";

import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_BANK_DELETE_TITLE = "step_3_delete_bank_account";
const KEY_CLAIM_BANK_DELETE_NO_ACCOUNT = "step_3_bank_no_account";
const KEY_CLAIM_BANK_DELETE = "claim_delete";

export default class DeleteBankAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndexes: props.selectedIndexes ? props.selectedIndexes : [],

      isConfirmationModalVisible: false,
      isSuccessModalVisible: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      if (this.props.selectedIndexes != nextProps.selectedIndexes) {
        this.setState({ selectedIndexes: nextProps.selectedIndexes });
      }

      return true;
    }

    return false;
  }

  toggleSelections(index, value) {
    let selectedIndexes = this.state.selectedIndexes;
    selectedIndexes = selectedIndexes.filter(item => item != index);
    if (value) {
      selectedIndexes.push(index);
    }

    this.setState({ selectedIndexes });

    if (this.props.onToggle) {
      this.props.onToggle(selectedIndexes);
    }
  }

  onToggle(index, value = false) {
    if (this.state.selectedIndex !== index && value) {
      this.setState({
        selectedIndex: index
      });
    }
  }

  onBankDeleteConfirmed() {
    this.setState({
      isConfirmationModalVisible: false,
      isSuccessModalVisible: true
    });
  }

  onBankDeleteSuccess() {
    this.setState({
      isSuccessModalVisible: false
    });
  }

  renderTitle() {
    return (
      <VerticalAnimatorContainer order={1}>
        <PadderContainer style={Styles.title.container}>
          <TextLX>{claimMeta(KEY_CLAIM_BANK_DELETE_TITLE).label}</TextLX>
        </PadderContainer>
      </VerticalAnimatorContainer>
    );
  }

  renderToggle(index) {
    return (
      <Toggle
        isActive={this.state.selectedIndex === index}
        onToggle={() => this.onToggle(index, true)}
        shouldPersist={this.state.selectedIndex === index}
        rounded
      />
    );
  }

  renderBankItem(bank, index) {
    return (
      <VerticalAnimatorContainer key={index} order={(index + 2) * 2}>
        <TouchableOpacity
          onPress={() => this.onToggle(index, true)}
          key={index}
        >
          <BankCard
            key={index}
            name={bank.bankName}
            number={bank.accountNo}
            owner={bank.accountName}
            rightRender={this.renderControl(index)}
          />
        </TouchableOpacity>
      </VerticalAnimatorContainer>
    );
  }

  renderBanks() {
    if (this.props.banks.length < 1) {
      return (
        <PadderContainer>
          <VerticalAnimatorContainer order={3}>
            <TextM color={Colors.main.baseGray}>
              {claimMeta(KEY_CLAIM_BANK_DELETE_NO_ACCOUNT).label}
            </TextM>
          </VerticalAnimatorContainer>
        </PadderContainer>
      );
    }

    return (
      <PadderContainer>
        {this.props.banks.map((bank, index) => {
          return this.renderBankItem(bank, index);
        })}
      </PadderContainer>
    );
  }

  renderBottom() {
    return (
      <BottomButtonGroupCard
        submitLabel={claimMeta(KEY_CLAIM_BANK_DELETE).label}
        onSubmit={() => this.setState({ isConfirmationModalVisible: true })}
        submitBordered
      />
    );
  }

  render() {
    return (
      <ModalContainer
        isActive={this.props.isActive}
        onShow={this.props.onShow ? () => this.props.onShow() : () => {}}
        onClosePress={
          this.props.onClosePress ? () => this.props.onClosePress() : () => {}
        }
        bottomContent={this.renderBottom()}
        persistScrollTitle={claimMeta(KEY_CLAIM_BANK_DELETE_TITLE).label}
        scrollable
      >
        {this.renderTitle()}

        {this.renderBanks()}

        <View style={Styles.bottomPadder} />

        <DeleteBankAccountSuccessModal
          isActive={this.state.isSuccessModalVisible}
          onConfirm={() => this.onBankDeleteSuccess()}
          // bank={ "Bank Rakyat Indonesia (BRI)" }
          // number={ "62653982792" }
          // owner={ "Pati Fertpolin" }
        />

        <DeleteBankAccountConfirmationModal
          isActive={this.state.isConfirmationModalVisible}
          onConfirm={() => this.onBankDeleteConfirmed()}
          onCancel={() => this.setState({ isConfirmationModalVisible: false })}
          // bank={ "Bank Rakyat Indonesia (BRI)" }
          // number={ "62653982792" }
          // owner={ "Pati Fertpolin" }
        />
      </ModalContainer>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};
