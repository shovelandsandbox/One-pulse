/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextLX, TextM } from "../../../components/derivatives/Text";
import {
  BottomButtonGroup as BottomButtonGroupCard,
  Bank as BankCard
} from "../../../components/cards";
import {
  Base as BaseContainer,
  Padder as PadderContainer,
  VerticalAnimator as VerticalAnimatorContainer
} from "../../../components/containers";
import Toggle from "../../../components/generics/Toggle";
import {
  DeleteBankAccountSuccess as DeleteBankAccountSuccessModal,
  DeleteBankAccountConfirmation as DeleteBankAccountConfirmationModal
} from "../../../modals";
import { convertToCapitalCase } from "../../../utils";

const { pageKeys } = CoreConfig;

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_BANK_DELETE = "step_3_delete_bank_account";
const KEY_CLAIM_BANK_DELETE_BUTTON = "step_3_delete_button";
const KEY_CLAIM_BANK_NOACCOUNT = "step_3_bank_no_account";

class BankAccountDelete extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    getBankAccountsResponse: PropTypes.object,
    deleteBankAccount: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      bankId: "",
      bankName: "",
      accountNo: "",
      accountName: "",
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

  openSuccessModal() {
    this.setState({
      isConfirmationModalVisible: false,
      isSuccessModalVisible: true
    });
  }

  onBankDeleteConfirmed() {
    const { bankId } = this.state;
    const { deleteBankAccount, getBankAccountsResponse } = this.props;
    deleteBankAccount({
      key: getBankAccountsResponse.body[this.state.selectedIndex].accountNo
    });
    this.setState({
      isConfirmationModalVisible: false,
      isSuccessModalVisible: true
    });
  }

  onToggle(index, value = false) {
    const { getBankAccountsResponse } = this.props;
    if (this.state.selectedIndex !== index && value) {
      this.setState({
        selectedIndex: index,
        bankId: getBankAccountsResponse.body[index].id
      });
    }
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
          <TextLX>{claimMeta(KEY_CLAIM_BANK_DELETE).label}</TextLX>
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
            owner={convertToCapitalCase(bank.accountName)}
            rightRender={this.renderToggle(index)}
          />
        </TouchableOpacity>
      </VerticalAnimatorContainer>
    );
  }

  renderBanks() {
    const { getBankAccountsResponse } = this.props;
    const banks = getBankAccountsResponse.body;

    if (banks.length < 1) {
      return (
        <PadderContainer>
          <VerticalAnimatorContainer order={3}>
            <TextM color={Colors.main.baseGray}>
              {claimMeta(KEY_CLAIM_BANK_NOACCOUNT).label}
            </TextM>
          </VerticalAnimatorContainer>
        </PadderContainer>
      );
    }

    return (
      <PadderContainer>
        {banks.map((bank, index) => {
          return this.renderBankItem(bank, index, () =>
            this.setState({
              isConfirmationModalVisible: true,
              bankId: bank.id,
              bankName: bank.bankName,
              accountNo: bank.accountNo,
              accountName: bank.accountName
            })
          );
        })}
      </PadderContainer>
    );
  }

  renderBottom() {
    return (
      <BottomButtonGroupCard
        submitLabel={claimMeta(KEY_CLAIM_BANK_DELETE_BUTTON).label}
        onSubmit={() => this.setState({ isConfirmationModalVisible: true })}
        submitBordered
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const { accountName, bankName, accountNo } = this.state;
    return (
      <BaseContainer
        bottomContent={this.renderBottom()}
        persistScrollTitle={claimMeta(KEY_CLAIM_BANK_DELETE).label}
        scrollable
        onBackPress={() => navigation.pop()}
      >
        {this.renderTitle()}

        {this.renderBanks()}

        <View style={Styles.bottomPadder} />

        <DeleteBankAccountSuccessModal
          isActive={this.state.isSuccessModalVisible}
          onConfirm={() => this.onBankDeleteSuccess()}
          bank={bankName}
          number={accountNo}
          owner={accountName}
        />

        <DeleteBankAccountConfirmationModal
          isActive={this.state.isConfirmationModalVisible}
          onConfirm={() => this.onBankDeleteConfirmed()}
          onCancel={() =>
            this.setState({
              isConfirmationModalVisible: false,
              bankId: "",
              bankName: "",
              accountNo: "",
              accountName: ""
            })
          }
          bank={bankName}
          number={accountNo}
          owner={accountName}
        />
      </BaseContainer>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

const mapStateToProps = state => ({
  action: state.mpolicyClaim.action,
  getBankAccountsResponse: state.mpolicyProfile.getBankAccountsResponse
});

const mapDispatchToProps = dispatch => ({
  deleteBankAccount: payload => {
    dispatch({
      context: pageKeys.PROFILE_BANK_ACCOUNT_EDIT_SCREEN,
      type: CoreActionTypes.DELETE_BANK_ACCOUNT,
      payload
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountDelete);
