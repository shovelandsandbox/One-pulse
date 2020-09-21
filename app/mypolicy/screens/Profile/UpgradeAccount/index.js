import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Linking, BackHandler,Image,View } from "react-native";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreUtils,
  firebaseEvents,
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../../../actions";
import { Colors } from "../../../configs";
import Styles from "./style";
import { InputString } from "../../../components/derivatives/Input";
import { TextM } from "../../../components/derivatives/Text";
import {
  Padder as PadderContainer,
   AuthContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
} from "../../../components/containers";
import {
  OTP as OTPModal,
  GeneralError as GeneralErrorModal,
} from "../../../modals";
import { pathOr, isEmpty } from "ramda";
import { myPolicyActions } from "../../../configs/myPolicyActions";
import myPolicyScreens from "../../../configs/screenNames";
const { logFirebaseEvent } = CoreUtils;
import IMAGES from "../../../configs/Images"
const mainClaimMeta = (meta, type) => {
  const items = meta.find(item => item.key === type);
  return items === undefined ? type : items.label;
};

const { pageKeys } = CoreConfig;

const TYPE_CLAIM = "mpolicyClaim";
const KEY_ENTER_POLICY_NUMBER = "enter_policy_number";
const KEY_POLICY_NUMBER = "enter_policy_number_textbox_label";
const ERROR_POLICY_NUMBER_REQUIRED = "error_policy_number_required";
const ERROR_POLICY_NUMBER_NUMERIC = "error_policy_number_numeric";
const KEY_CLAIM_SAVE = "claim_save";

class UpgradeAccount extends PureComponent {
  static propTypes = {
    upgradeAccount: PropTypes.func,
    action: PropTypes.string,
    meta: PropTypes.object,
    upgradeAccountError: PropTypes.object,
    upgradeAccountSave: PropTypes.func,
    upgradeAccountSaveError: PropTypes.object,
    upgradeAccountSaveFetch: PropTypes.bool,
    phoneNumber: PropTypes.string,
    customer_master: PropTypes.any,
    loadMyPolicy: PropTypes.func,
    isdCode: PropTypes.string,
    myPolicyNumberRegex: PropTypes.string,
    policyStatus: PropTypes.string,
    loadMainPage: PropTypes.func,
    helpLine: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOTPModalVisible: false,
      otpError: null,
      formData: {
        policyNumber: "",
      },
      errors: {
        policyNumber: "",
      },
      isActiveGeneralErrorModal: false,
      errorMessage: "",
      countResend: 0,
    };

    this.renderForm = this.renderForm.bind(this);
    this.onOTPConfirmed = this.onOTPConfirmed.bind(this);
    // eslint-disable-next-line max-len
    this.onUpgradeAccountSuccessConfirmed = this.onUpgradeAccountSuccessConfirmed.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);
    this.setModalError = this.setModalError.bind(this);
    this.setOtpError = this.setOtpError.bind(this);
    this.showOTPModal = this.showOTPModal.bind(this);
    this.onRequestResend = this.onRequestResend.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    const { policyStatus, loadMainPage, loadMyPolicy } = this.props;
    if (policyStatus === "getPolicyListFailure") {
      loadMainPage();
    } else {
      loadMyPolicy();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  // eslint-disable-next-line complexity
  componentDidUpdate(prevProps) {
    const {
      action,
      upgradeAccountSaveError,
      upgradeAccountError,
      phoneNumber,
      meta,
      customer_master,
    } = this.props;
    if (prevProps.action !== action) {
      switch (action) {
        case myPolicyActions.searchByPolicyNoSuccess: {
          this.onRequestResend();
          this.showOTPModal();
          break;
        }
        case myPolicyActions.searchByPolicyNoFailure:
          if (!customer_master) {
            this.setState({
              errors: {
                policyNumber: commonMeta("VALIDATION_POLICY_NOT_FOUND"),
              },
            });
          }
          if (upgradeAccountError.errorCode === 2093) {
            this.setState({
              errors: {
                policyNumber: upgradeAccountError.errorMsg,
              },
            });
          }
          if (upgradeAccountError.errorMsg !== "") {
            this.setModalError(
              true,
              upgradeAccountError.shortCode,
              upgradeAccountError.errorMsg
            );
          }
          break;
        case myPolicyActions.verifyOTPLinkPolicySuccess:
          this.showSuccessModal();
          break;
        case myPolicyActions.verifyOTPLinkPolicyFailure:
          this.setOtpError(upgradeAccountSaveError.shortCode);
          break;
        default:
      }
    }
  }

  onOTPConfirmed(otp) {
    const { upgradeAccountSave } = this.props;
    const sentData = { otp };
    upgradeAccountSave(sentData);
    this.onUpgradeAccountSuccessConfirmed();
  }

  onSubmit() {
    const { formData } = this.state;
    const { upgradeAccount, resetMyPolicyAction } = this.props;
    const reg = new RegExp(this.props.myPolicyNumberRegex);
    if (formData.policyNumber === "") {
      this.setState({
        errors: { policyNumber: claimMeta(ERROR_POLICY_NUMBER_REQUIRED).label },
      });
    } else {
      if (!reg.test(formData.policyNumber)) {
        this.setState({
          errors: {
            policyNumber: claimMeta(ERROR_POLICY_NUMBER_NUMERIC).label,
          },
        });
      }
    }

    const sentData = {
      ...formData,
    };
    // logFirebaseEvent(firebaseEvents.Policy_Number_Submit.name, firebaseEvents.Policy_Number_Submit.value);
    // this.props.dispatchEvent(events.PolicyNumberSubmitClick);
    resetMyPolicyAction();
    upgradeAccount(sentData);
  }

  onChangeText(value, field) {
    const newFormData = this.state.formData;

    newFormData[field] = value;
    const reg = new RegExp(this.props.myPolicyNumberRegex);
    if (newFormData[field] === "") {
      this.setState({
        errors: { policyNumber: claimMeta(ERROR_POLICY_NUMBER_REQUIRED).label },
      });
    } else {
      if (!reg.test(newFormData[field])) {
        this.setState({
          errors: {
            policyNumber: claimMeta(ERROR_POLICY_NUMBER_NUMERIC).label,
          },
        });
      } else {
        this.setState({
          errors: { policyNumber: "" },
        });
      }
    }

    this.setState({ formData: newFormData });
  }

  onRequestResend() {
    this.setState({
      requestResend: true,
      countResend: this.state.countResend + 1,
    });
  }

  showOTPModal() {
    this.setState({
      isOTPModalVisible: true,
      otpError: "",
      requestResend: false,
      countResend: 0,
    });
  }

  showSuccessModal() {
    // logFirebaseEvent(firebaseEvents.Pru_Services_Signup_Complete.name, firebaseEvents.Pru_Services_Signup_Complete.params);
    this.setState({ isOTPModalVisible: false });
  }

  onUpgradeAccountSuccessConfirmed() {
    const { loadMyPolicy } = this.props;
    loadMyPolicy();
  }

  renderInfo(){
    const { meta, helpLine } = this.props;
    return (
      <View style={[Styles.infoContainer, Styles.coloredBackground]}>
        <Image
          style={{ flex: 0.1, marginTop: 7 }}
          height={15.8}
          width={17.1}
          resizeMode={"contain"}
          source={IMAGES.illustration.my_policy.ic_warning}
        />
        <View style={Styles.label.container}>
          <TextM>
            {mainClaimMeta(meta.metaDetail.commons, "upgradeaccountdesc1")}
            <TextM
              onPress={() => Linking.openURL("tel:" + helpLine)}
              color={Colors.main.baseRed}
            >
              {mainClaimMeta(meta.metaDetail.commons, "upgradeaccountdesc2")}
            </TextM>
            {mainClaimMeta(meta.metaDetail.commons, "upgradeaccountdesc3")}
          </TextM>
        </View>
      </View>
    );
  }

  renderForm(){
    const { errors, formData } = this.state;
    return (
      <View style = {[Styles.infoContainer,{marginTop:11}]}>
          <View style={{flex:0.1,}}/>
          <View style= {{flex:1}}>
          <InputString
            hideBorder = {true}
            placeholder= {claimMeta(KEY_POLICY_NUMBER).label}
            label={claimMeta(KEY_POLICY_NUMBER).label}
            keyboardType={"default"}
            value={formData.policyNumber}
            autoFocus
            onChangeText={text => this.onChangeText(text, "policyNumber")}
            error={errors.policyNumber}
            data={formData.policyNumber}
          />
          </View>
      </View>
    );
  }

  setOtpError(shortCode) {
    if (shortCode === "INVALID_OTP") {
      this.setState(
        {
          otpError: commonMeta("VALIDATION_INVALID_OTP"),
        },
        () =>
          setTimeout(() => {
            this.setState({ otpError: "" });
          }, 3000)
      );
    }
  }

  setModalError(isActive, shortCode, message) {
    const { meta } = this.props;
    switch (shortCode) {
      case "VALIDATION_ERROR":
        this.setState({
          isActiveGeneralErrorModal: isActive,
          errorMessage: mainClaimMeta(meta.metaDetail.commons, message),
        });
        break;
    }
  }

  onBackPress = () => {
    const { policyStatus, loadMainPage, loadMyPolicy } = this.props;
    if (policyStatus === "getPolicyListFailure") {
      loadMainPage();
    } else {
      loadMyPolicy();
    }
  };

  render() {
    const { isActiveGeneralErrorModal, errorMessage } = this.state;
    const { upgradeAccountSaveFetch, meta, isdCode } = this.props;

    return (
      <AuthContainer
        backgroundImage = {IMAGES.illustration.my_policy.ic_linkHeader}
        title={claimMeta(KEY_ENTER_POLICY_NUMBER).label}
        bottomOrder={4}
        buttonLabel={claimMeta(KEY_CLAIM_SAVE).label}
        onSubmit={this.onSubmit}
        onBackPress={this.onBackPress}
      >
        
        {this.renderInfo()}
        {this.renderForm()}
        <OTPModal
          isActive={this.state.isOTPModalVisible}
          onConfirm={this.onOTPConfirmed}
          onClose={() => this.setState({ isOTPModalVisible: false })}
          error={this.state.otpError}
          requestResend={this.state.requestResend}
          countResend={this.state.countResend}
          loadingPin={upgradeAccountSaveFetch}
          phoneNumber={this.props.phoneNumber}
          onResend={this.onRequestResend}
          otpTitle={mainClaimMeta(
            meta.metaDetail.commons,
            "upgradeaccountotptitle"
          )}
          otpMessage={mainClaimMeta(
            meta.metaDetail.commons,
            "upgradeaccountotpdesc"
          )}
          isdCode={isdCode}
        />

        <GeneralErrorModal
          isActive={isActiveGeneralErrorModal}
          onClosePress={() =>
            this.setState({ isActiveGeneralErrorModal: false })
          }
          errorMessage={errorMessage}
          onConfirm={() => this.setState({ isActiveGeneralErrorModal: false })}
        />
      </AuthContainer>
    );
  }
}

const claimMeta = key => {
  const entry = metaHelpers.findElement(TYPE_CLAIM, key);
  return entry && entry.label ? entry : { label: key };
};

const commonMeta = key => {
  const entry = metaHelpers.findCommon(key);
  return entry && entry.label ? entry.label : key;
};

const mapStateToProps = state => ({
  action: state.myPolicy.action,
  meta: state.meta,
  upgradeAccountError: state.myPolicy.upgradeAccountError,
  phoneNumber: state.myPolicy.phoneNumber,
  upgradeAccountSaveError: state.myPolicy.upgradeAccountSaveError,
  upgradeAccountSaveFetch: state.myPolicy.upgradeAccountSaveFetch,
  customer_master: state.myPolicy.customer_master,
  isdCode: pathOr("", ["meta", "countryCommonMeta", "isdCode"], state),
  myPolicyNumberRegex: pathOr(
    "",
    ["meta", "countryCommonMeta", "myPolicyNumberRegex"],
    state
  ),
  policyStatus: pathOr([], ["myPolicy", "getPolicyStatus"], state),
  helpLine: pathOr("", ["meta", "countryCommonMeta", "helpLine"], state),
});

const mapDispatchToProps = dispatch => ({
  upgradeAccount: payload => {
    dispatch({
      context: myPolicyScreens.PROFILE_UPGRADE_ACCOUNT_SCREEN,
      type: myPolicyActions.searchByPolicyNo,
      payload,
    });
  },
  upgradeAccountSave: payload => {
    dispatch({
      context: myPolicyScreens.PROFILE_UPGRADE_ACCOUNT_SCREEN,
      type: myPolicyActions.verifyOTPLinkPolicy,
      payload,
    });
  },
  loadSteps: payload => {
    dispatch({
      context: pageKeys.CLAIM_STEPS_SCREEN,
      type: CoreActionTypes.CLAIM_STEPS_LOAD,
      payload,
    });
  },
  loadClaim: () => {
    dispatch({
      context: pageKeys.CLAIM_SCREEN,
      type: CoreActionTypes.CLAIM_LOAD,
    });
  },
  loadMyPolicy: () =>
    dispatch({
      context: pageKeys.MY_POLICY_MAIN_SCREEN,
      type: "LOAD_MY_POLICY_MAIN",
    }),
  loadMainPage: () =>
    dispatch({
      type: "GO_TO_SCREEN",
      navigateTo: "MainPage",
    }),
  resetMyPolicyAction:()=>dispatch({
    type:  myPolicyActions.resetMyPolicyAction
  }),
  dispatchEvent
});

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeAccount);
