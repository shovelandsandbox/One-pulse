import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import { BankForm as BankFormContainer } from "../../../components/containers";
import { EditBankAccountSuccess as EditBankAccountSuccessModal } from "../../../modals";
import OTPModal from "../../../modals/OTP";
import { convertToCapitalCase } from "../../../utils";
import _ from "lodash";

const { pageKeys } = CoreConfig;

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_BANK_CREATE_TITLE = "step_3_create_bank_account_title";
const KEY_CLAIM_BANK_EDIT_TITLE = "step_3_edit_bank_account_title";
const KEY_CLAIM_BANK_CREATE_ALERT = "step_3_create_bank_account_alert";

// eslint-disable-next-line react/require-optimization
class Edit extends Component {
  constructor(props) {
    super(props);

    const { navigation, getBankAccountsResponse } = props;
    const { selectedIndex } = navigation.state.params;
    const selectedBank =
      selectedIndex !== -1
        ? getBankAccountsResponse.body[selectedIndex]
        : {
          bankCode: "",
          bankName: "",
          accountNo: "",
          accountName: ""
        };
    this.state = {
      id: selectedBank.id,
      bankCode: selectedBank.bankCode,
      bankName: selectedBank.bankName,
      accountNo: selectedBank.accountNo,
      accountName: selectedBank.accountName,

      isOTPModalVisible: false,
      isSuccessModalVisible: false
    };
    this.onSuccessCreateBankAccount = this.onSuccessCreateBankAccount.bind(
      this
    );
  }

  componentDidUpdate(prevProps) {
    const { action, getTopBankCodes } = this.props;
    if (prevProps.action !== action) {
      switch (action) {
        case CoreActionTypes.PROFILE_BANK_ACCOUNT_EDIT_LOAD_SUCCESS:
          getTopBankCodes({ page: 1 });
          break;
        case CoreActionTypes.CREATE_BANK_ACCOUNT_SUCCESS:
          this.onSuccessCreateBankAccount();
          break;
        case CoreActionTypes.CREATE_BANK_ACCOUNT_FAILED:
          this.onFailedCreateBankAccount();
          break;
        case CoreActionTypes.EDIT_BANK_ACCOUNT_SUCCESS:
          this.onSuccessEditBankAccount();
          break;
        case CoreActionTypes.EDIT_BANK_ACCOUNT_FAILED:
          this.onFailedEditBankAccount();
          break;
        default:
      }
    }
  }

  onSuccessEditBankAccount() {
    this.setState({ isSuccessModalVisible: true });
  }

  onSuccessCreateBankAccount() {
    this.setState({ isSuccessModalVisible: true });
  }

  onFailedCreateBankAccount() {
    alert("Mohon coba kembali");
  }

  onFailedEditBankAccount() {
    alert("Mohon coba kembali");
  }

  onSubmit() {
    const {
      createBankAccount,
      navigation,
      editBankAccount,
      getListBankResponse,
      getLAForClaimResponse
    } = this.props;
    const { bankCode, accountNo, accountName, id } = this.state;
    let owners = this.getPolicyOwner();
    if (bankCode === "" || accountNo === "" || accountName === "") {
      alert(claimMeta(KEY_CLAIM_BANK_CREATE_ALERT).label);
      return false;
    }
    if (navigation.state.params.selectedIndex === -1) {
      createBankAccount({
        bankCode: getListBankResponse.body.filter(
          item => item.name.toUpperCase() === bankCode.toUpperCase()
        )[0].code,
        accountNo,
        accountName,
        bankName: bankCode,
        branchCode: "",
        clientId: owners.filter(
          item =>
            convertToCapitalCase(item.surName, false).toUpperCase() ===
            accountName.toUpperCase()
        )[0].id
      });
    } else {
      editBankAccount({
        id,
        bankCode: getListBankResponse.body.filter(
          item => item.longDesc.toUpperCase() === bankCode.toUpperCase()
        )[0].code,
        accountNo,
        accountName,
        bankName: bankCode,
        branchCode: "",
        clientId: getLAForClaimResponse.body.filter(
          item =>
            convertToCapitalCase(item.lsurname).toUpperCase() ===
            accountName.toUpperCase()
        )[0].clientNumber,
        selectedIndex: navigation.state.params.selectedIndex
      });
    }
    return true;
  }

  onOTPConfirmed() {
    this.setState({
      isOTPModalVisible: false,
      isSuccessModalVisible: true
    });
  }

  onBankUpdateSuccess() {
    const { navigation } = this.props;
    navigation.pop();

    const _this = this;

    setTimeout(function () {
      _this.setState({ isSuccessModalVisible: false });
    }, 100);
  }

  onChangeValue(form, value) {
    this.setState({
      [form]: value
    });
  }

  getPolicyOwner = () => {
    const { policies, selectedIndexes } = this.props.submitInPatientParam.step2;
    let owners = [];
    selectedIndexes.map((riders, index) => {
      if (riders.length > 0) {
        let policy = policies[index];
        let customerRoles = this.props.myPolicyDetails[policy.id]
          ? this.props.myPolicyDetails[policy.id].customerRoles
          : [];
        customerRoles.map(val => {
          if (val.role === "OWNER") {
            let la = val.customer;
            owners.push(la);
          }
        });
      }
    });
    return _.uniqBy(owners, "id");
  };

  render() {
    const {
      navigation,
      getLAForClaimResponse,
      createBankAccountResponse,
      editBankAccountParam,
      getListBankResponse
    } = this.props;
    let owners = this.getPolicyOwner();
    return (
      <BankFormContainer
        title={
          navigation.state.params.selectedIndex === -1
            ? claimMeta(KEY_CLAIM_BANK_CREATE_TITLE).label
            : claimMeta(KEY_CLAIM_BANK_EDIT_TITLE).label
        }
        data={{
          banks: getListBankResponse.body.map(item => ({
            name: item.name,
            code: item.code
          })),
          owners: owners
            ? owners.map(item => ({
              name: convertToCapitalCase(item.surName, false)
            }))
            : []
        }}
        value={{
          bank: this.state.bankName,
          number: this.state.accountNo,
          owner: convertToCapitalCase(this.state.accountName, false)
        }}
        onChangeText={(form, value) => this.onChangeValue(form, value)}
        onSubmit={() => this.onSubmit()}
      >
        <EditBankAccountSuccessModal
          isActive={this.state.isSuccessModalVisible}
          title={
            navigation.state.params.selectedIndex === -1
              ? "Berhasil Ditambah!"
              : "Berhasil Diubah!"
          }
          onConfirm={() => this.onBankUpdateSuccess()}
          bank={
            navigation.state.params.selectedIndex === -1
              ? createBankAccountResponse.body.bankName
              : editBankAccountParam.bankName
          }
          number={
            navigation.state.params.selectedIndex === -1
              ? createBankAccountResponse.body.accountNo
              : editBankAccountParam.accountNo
          }
          owner={
            navigation.state.params.selectedIndex === -1
              ? createBankAccountResponse.body.accountName
              : editBankAccountParam.accountName
          }
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

const mapStateToProps = state => ({
  action: state.mpolicyProfile.action,
  getBankAccountsResponse: state.mpolicyProfile.getBankAccountsResponse,
  getLAForClaimResponse: state.mpolicyProfile.getLAForClaimResponse,
  createBankAccountResponse: state.mpolicyProfile.createBankAccountResponse,
  editBankAccountParam: state.mpolicyProfile.editBankAccountParam,
  getListBankResponse: state.mpolicyProfile.getListBankResponse,
  submitInPatientParam: state.mpolicyClaim.submitInPatientParam,
  myPolicyDetails: state.mpolicyMyPolicy.myPolicyDetails
});

const mapDispatchToProps = dispatch => ({
  createBankAccount: payload => {
    dispatch({
      context: pageKeys.PROFILE_BANK_ACCOUNT_EDIT_SCREEN,
      type: CoreActionTypes.CREATE_BANK_ACCOUNT,
      payload
    });
  },
  editBankAccount: payload => {
    dispatch({
      context: pageKeys.PROFILE_BANK_ACCOUNT_EDIT_SCREEN,
      type: CoreActionTypes.EDIT_BANK_ACCOUNT,
      payload
    });
  },
  getTopBankCodes: payload => {
    dispatch({
      context: pageKeys.PROFILE_BANK_ACCOUNT_EDIT_SCREEN,
      type: CoreActionTypes.GET_LIST_BANK,
      payload
    });
  }
});

Edit.propTypes = {
  action: PropTypes.string,
  navigation: PropTypes.object,
  getBankAccountsResponse: PropTypes.object,
  getLAForClaimResponse: PropTypes.object,
  createBankAccount: PropTypes.func,
  createBankAccountResponse: PropTypes.object,
  editBankAccount: PropTypes.func,
  editBankAccountParam: PropTypes.object,
  getTopBankCodes: PropTypes.func,
  getListBankResponse: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
