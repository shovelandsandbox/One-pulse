/* eslint-disable max-params */
/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextM, TextLX, TextS } from "../../../components/derivatives/Text";
import { Bank as BankCard } from "../../../components/cards";
import Icon from "../../../components/generics/Icon";
import {
  Padder as PadderContainer,
  Base as BaseContainer,
  HorizontalAnimator as HorizontalAnimatorContainer
} from "../../../components/containers";
import {
  DeleteBankAccountSuccess as DeleteBankAccountSuccessModal,
  DeleteBankAccountConfirmation as DeleteBankAccountConfirmationModal,
  FeatureDescription as FeatureDescriptionModal
} from "../../../modals";
import { convertToCapitalCase } from "../../../utils";

const { pageKeys } = CoreConfig;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankId: "",
      bankName: "",
      accountNo: "",
      accountName: "",
      isConfirmationModalVisible: false,
      isSuccessModalVisible: false,
      isFeatureDescriptionModalVisible: false
    };
  }

  componentDidUpdate(prevProps) {
    const { action } = this.props;
    if (prevProps.action !== action) {
      switch (action) {
        case CoreActionTypes.DELETE_BANK_ACCOUNT_SUCCESS:
          this.openSuccessModal();
          break;
        case CoreActionTypes.DELETE_BANK_ACCOUNT_FAILED:
          this.onFailedCreateBankAccount();
          break;
        default:
      }
    }
  }

  openSuccessModal() {
    this.setState({
      isConfirmationModalVisible: false,
      isSuccessModalVisible: true
    });
  }

  onBankDeleteConfirmed() {
    const { bankId } = this.state;
    const { deleteBankAccount } = this.props;
    deleteBankAccount({ bankId });
    this.setState({
      isConfirmationModalVisible: false,
      isSuccessModalVisible: true
    });
  }

  onBankDeleteSuccess() {
    this.setState({
      isSuccessModalVisible: false,
      bankId: "",
      bankName: "",
      accountNo: "",
      accountName: ""
    });
  }

  renderTitle() {
    return (
      <PadderContainer style={Styles.title.container}>
        <TextLX>Akun Bank</TextLX>
        <TextLX>Pembayaran Klaim</TextLX>
      </PadderContainer>
    );
  }

  renderControl(onEditPress, onDeletePress, index) {
    return (
      <View style={Styles.control.grouper}>
        <TouchableOpacity
          style={Styles.control.icon.container}
          onPress={() => onEditPress()}
        >
          <Icon name="edit" color={Colors.main.baseRed} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.control.icon.container}
          onPress={() => onDeletePress()}
        >
          <Icon name="delete" color={Colors.main.baseRed} />
        </TouchableOpacity>
      </View>
    );
  }

  // eslint-disable-next-line max-params
  renderBankItem(bank, number, owner, onEditPress, onDeletePress, index) {
    return (
      <HorizontalAnimatorContainer key={index} order={(index + 2) * 2}>
        <BankCard
          key={index}
          name={bank}
          number={number}
          owner={owner}
          rightRender={this.renderControl(onEditPress, onDeletePress, index)}
        />
      </HorizontalAnimatorContainer>
    );
  }

  renderBanks() {
    const {
      loadBankAccountEdit,
      getBankAccountsResponse,
      getBankAccountsFetch
    } = this.props;
    const banks = getBankAccountsResponse.body;

    if (getBankAccountsFetch) {
      return (
        <PadderContainer>
          <ActivityIndicator />
        </PadderContainer>
      );
    }

    if (banks.length < 1) {
      return (
        <PadderContainer>
          <HorizontalAnimatorContainer order={4}>
            <TextM color={Colors.main.baseGray}>
              Tidak ada rekening bank yang terdaftar
            </TextM>
          </HorizontalAnimatorContainer>
        </PadderContainer>
      );
    }

    return (
      <PadderContainer>
        {banks.map((bank, index) => {
          return this.renderBankItem(
            bank.bankName,
            bank.accountNo,
            convertToCapitalCase(bank.accountName, false),
            // TODO: Add navigation Edit bank screen.
            () =>
              loadBankAccountEdit({
                selectedIndex: index
              }),
            () =>
              this.setState({
                isConfirmationModalVisible: true,
                bankId: bank.id,
                bankName: bank.bankName,
                accountNo: bank.accountNo,
                accountName: bank.accountName
              }),
            index
          );
        })}
      </PadderContainer>
    );
  }

  renderAddButton() {
    const { loadBankAccountEdit } = this.props;
    return (
      <PadderContainer>
        <TouchableOpacity
          style={Styles.addBank.container}
          onPress={() => loadBankAccountEdit({ selectedIndex: -1 })}
        >
          <View style={Styles.addBank.icon.container}>
            <Icon name="add" color={Colors.main.baseRed} />
          </View>

          <TextS color={Colors.main.baseRed}>Rekening Bank</TextS>
        </TouchableOpacity>
      </PadderContainer>
    );
  }

  renderRightHeaderButtons() {
    return (
      <TouchableOpacity
        style={Styles.rightHeader.container}
        onPress={() =>
          this.setState({ isFeatureDescriptionModalVisible: true })
        }
      >
        <Icon name="tooltips" size={25} />
      </TouchableOpacity>
    );
  }

  render() {
    const { accountName, bankName, accountNo } = this.state;
    return (
      <BaseContainer
        onBackPress={() => this.props.navigation.pop()}
        persistScrollTitle={"Rekening Bank Pembayaran Klaim"}
      >
        {this.renderTitle()}

        {this.renderBanks()}

        <HorizontalAnimatorContainer order={6}>
          {this.renderAddButton()}
        </HorizontalAnimatorContainer>

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

const mapStateToProps = state => ({
  action: state.mpolicyProfile.action,
  getBankAccountsResponse: state.mpolicyProfile.getBankAccountsResponse,
  getBankAccountsFetch: state.mpolicyProfile.getBankAccountsResponse
});

const mapDispatchToProps = dispatch => ({
  loadBankAccountEdit: payload => {
    dispatch({
      context: pageKeys.PROFILE_BANK_ACCOUNT_EDIT_SCREEN,
      type: CoreActionTypes.PROFILE_BANK_ACCOUNT_EDIT_LOAD,
      payload
    });
  },
  deleteBankAccount: payload => {
    dispatch({
      context: pageKeys.PROFILE_BANK_ACCOUNT_EDIT_SCREEN,
      type: CoreActionTypes.DELETE_BANK_ACCOUNT,
      payload
    });
  }
});

List.propTypes = {
  action: PropTypes.string,
  loadBankAccountEdit: PropTypes.func,
  getBankAccountsResponse: PropTypes.object,
  deleteBankAccount: PropTypes.func,
  getBankAccountsFetch: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
