//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { isEmpty } from "ramda";
import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";

const {
  GRANT_REVOKE_LIST_SCREEN,
  GRANT_REVOKE_REGISTER_SCREEN,
} = CoreConfig.pageKeys;
const {
  GET_LIFE_ASSURED_LIST_FETCH,
  GRANT_ACCESS_REQUEST_FAILED,
  GRANT_ACCESS_REQUEST_FETCH,
  GRANT_ACCESS_SAVE_FAILED,
  GRANT_ACCESS_SAVE_FETCH,
  GRANT_ACCESS_SAVE_SUCCESS,
  GRANT_ACCESS_REQUEST_SUCCESS,
} = CoreActionTypes;

// LOCAL & CONFIG IMPORTS
import { Colors } from "../../../configs";
import {
  convertToCapitalCase,
  getValue,
  handleOTPError,
  validatePhone,
  validateTOC,
} from "../../../utils";
// TODO: Tanya Frandisa screen SoA jadi apaan skrg.
// Update: Kata frandisa liat update aleph terbaru
// import { MAIN_SOA_SCREEN } from "../../../Main/mainScreenNames";
// import { MAIN_SOA_LOAD } from "../../../Main/mainActions";
import {
  BACKEND_RESPONSE,
  CLEAR_NETWORK_RESPONSE,
  ERROR_MESSAGE,
  ERROR_TITLE,
  NETWORK_RESPONSE_RECEIVED,
  OTP_RESPONSE,
} from "../../../bootstrap";
import Styles from "./style";

// COMPONENT IMPORTS
import { TextM } from "../../../components/derivatives/Text";
import { InputRadio, InputString } from "../../../components/derivatives/Input";
import {
  Auth as AuthContainer,
  HorizontalAnimator as HorizontalAnimatorContainer,
  Padder as PadderContainer,
} from "../../../components/containers";
import OTPModal from "../../../modals/OTP";
import GrantSuccessModal from "../../../modals/GrantSuccess";
import TNCModal from "../../../modals/TNC";

//#endregion

class GrantRevokeRegister extends Component {
  //#region CONSTRUCTOR AND LIFE CYCLES

  constructor(props) {
    super(props);

    this.state = {
      isOTPModalVisible: false,
      isSuccessModalVisible: false,
      isTNCModalVisible: false,
      lifeAssuredData: getValue(
        this.props.navigationParams.lifeAssuredData,
        {}
      ),
      formData: {
        phone: "",
        email: "",
      },
      otpResend: false,
      errors: {},
      toc: false,
      otpError: null,
    };

    this.toggleTOC = this.toggleTOC.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReduxActions = this.handleReduxActions.bind(this);
    this.onOTPConfirm = this.onOTPConfirm.bind(this);
    this.onRequestResend = this.onRequestResend.bind(this);
    this.onRegisterSuccessConfirmed = this.onRegisterSuccessConfirmed.bind(
      this
    );
    this.onOTPConfirmed = this.onOTPConfirmed.bind(this);
    // eslint-disable-next-line max-len
    this.handleNetworkResponseReceived = this.handleNetworkResponseReceived.bind(
      this
    );
    this.hideTNCModal = this.hideTNCModal.bind(this);
    this.showTNCModal = this.showTNCModal.bind(this);
    this.hideOTPModal = this.hideOTPModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.action !== prevProps.action) {
      this.handleReduxActions(this.props.action);
    }

    if (
      this.props.bootstrapAction !== prevProps.bootstrapAction &&
      this.props.bootstrapAction !== CLEAR_NETWORK_RESPONSE
    ) {
      this.handleNetworkResponseReceived(this.props.bootstrapData);
    }
  }

  //#region CLASS FUNCTIONS

  handleReduxActions(action) {
    const {
      grantAccessResponse,
      grantAccessSaveResponse,
      onRequestLifeAssuredList,
    } = this.props;
    const actions = {
      [NETWORK_RESPONSE_RECEIVED]: () => {
        this.handleNetworkResponseReceived(this.props.bootstrapData);
      },
      [GRANT_ACCESS_REQUEST_SUCCESS]: () => {
        if (grantAccessResponse.status.otpCode === OTP_RESPONSE.SENT) {
          this.setState({ isOTPModalVisible: true, otpResend: false });
        } else {
          // TODO: Change to General error modal from aleph
          Alert.alert(ERROR_TITLE, ERROR_MESSAGE);
        }
      },
      [GRANT_ACCESS_REQUEST_FAILED]: () => {},
      [GRANT_ACCESS_SAVE_SUCCESS]: () => {
        const { otpCode } = grantAccessSaveResponse.status;
        if (otpCode) {
          const otpError = handleOTPError(otpCode);
          this.setState({ otpError }, () =>
            setTimeout(() => this.setState({ otpError: "" }), 3000)
          );
        } else {
          onRequestLifeAssuredList();
          this.onOTPConfirmed();
        }
      },
      [GRANT_ACCESS_SAVE_FAILED]: () => {
        Alert.alert(
          ERROR_TITLE,
          this.props.grantAccessSaveError.response.status.message ||
            ERROR_MESSAGE
        );
      },
      DEFAULT: () => {},
    };

    return (actions[action] || actions.DEFAULT)();
  }

  handleNetworkResponseReceived(response) {
    const actions = {
      [GRANT_ACCESS_REQUEST_FETCH]: () => {
        if (
          response.payload.response.status.code ===
          BACKEND_RESPONSE.VALIDATION_ERROR
        ) {
          const { errors } = this.state;
          errors.phone = response.payload.response.body.message;
          this.setState({ errors }, () => this.props.clearNetworkResponse());
        }
      },
      DEFAULT: () => {},
    };

    return (actions[response.extraParams.type] || actions.DEFAULT)();
  }

  onOTPConfirmed() {
    this.setState({
      isOTPModalVisible: false,
      isSuccessModalVisible: true,
    });
  }

  // ----------------------------------------

  onOTPConfirm(otp) {
    const {
      onRequestGrantAccountSave,
      grantAccessParam,
      deviceId,
    } = this.props;
    const sentData = {
      ...grantAccessParam,
      otp,
      type: "grant access",
      ref: deviceId,
    };
    onRequestGrantAccountSave(sentData);
  }

  onRequestResend() {
    this.setState({ otpResend: true }, () =>
      this.props.requestGrantOtp(this.props.grantAccessParam)
    );
  }

  onRegisterSuccessConfirmed() {
    this.props.navigation.pop();

    setTimeout(() => {
      this.setState({ isSuccessModalVisible: false });
    }, 100);
  }

  static validate(formData) {
    const { phone /* email */ } = formData;
    const errors = {};

    const phoneError = validatePhone(phone);
    if (phoneError) errors.phone = phoneError;

    // if (email) errors.email = validateEmail(email);

    return errors;
  }

  setFieldValue(value, field) {
    const newFormData = this.state.formData;

    newFormData[field] = value;

    const errors = GrantRevokeRegister.validate(newFormData);

    this.setState({ formData: newFormData, errors });
  }

  handleSubmit() {
    const { formData, toc, lifeAssuredData } = this.state;

    const errors = GrantRevokeRegister.validate(formData);

    const isValid = isEmpty(errors);

    if (!isValid) {
      if (!toc) Alert.alert("", validateTOC(toc, "grant-revoke"));
    } else {
      const { requestGrantOtp } = this.props;

      const sentData = {
        ...lifeAssuredData,
        ...formData,
        toc,
      };

      requestGrantOtp(sentData);
    }
  }

  toggleTOC() {
    this.setState(prevState => ({ toc: !prevState.toc }));
  }

  showTNCModal() {
    this.setState({ isTNCModalVisible: true });
  }

  hideTNCModal() {
    this.setState({ isTNCModalVisible: false });
  }

  hideOTPModal() {
    this.setState({ isOTPModalVisible: false });
  }

  //#endregion

  //#region RENDERS

  renderForm() {
    const { toc, errors, formData } = this.state;
    return (
      <PadderContainer>
        <HorizontalAnimatorContainer order={2}>
          <InputString
            label={"No. Ponsel"}
            leftIcon={"handphone"}
            keyboardType={"phone-pad"}
            style={Styles.input.email}
            error={errors.phone}
            value={formData.phone}
            onChangeText={text => this.setFieldValue(text, "phone")}
          />
        </HorizontalAnimatorContainer>

        <HorizontalAnimatorContainer order={4}>
          <InputString
            label={"Email (Optional)"}
            leftIcon={"message"}
            keyboardType={"email-address"}
            style={Styles.input.email}
            error={errors.email}
            value={formData.email}
            onChangeText={text => this.setFieldValue(text, "email")}
          />
        </HorizontalAnimatorContainer>

        <HorizontalAnimatorContainer order={7}>
          <InputRadio
            onToggle={this.toggleTOC}
            value={toc}
            label={
              <TextM>
                Saya setuju dengan{" "}
                <TextM color={Colors.main.baseRed} onPress={this.showTNCModal}>
                  syarat & ketentuan
                </TextM>{" "}
                dan kebijakan privasi Grant & Revoke
              </TextM>
            }
          />
        </HorizontalAnimatorContainer>
      </PadderContainer>
    );
  }

  //#endregion

  render() {
    const {
      otpResend,
      isOTPModalVisible,
      otpError,
      isSuccessModalVisible,
      lifeAssuredData,
    } = this.state;
    const { userData } = this.props;
    return (
      <AuthContainer
        title={`Data ${convertToCapitalCase(lifeAssuredData.name, false)}`}
        bottomOrder={5}
        buttonLabel={"Simpan"}
        onSubmit={this.handleSubmit}
      >
        {this.renderForm()}

        <OTPModal
          isActive={isOTPModalVisible}
          onConfirm={this.onOTPConfirm}
          onClose={this.hideOTPModal}
          error={otpError}
          requestResend={otpResend}
          onResend={this.onRequestResend}
          phoneNumber={userData.phone}
        />

        <GrantSuccessModal
          isActive={isSuccessModalVisible}
          onConfirm={this.onRegisterSuccessConfirmed}
          name={convertToCapitalCase(lifeAssuredData.name, false)}
        />

        <TNCModal
          isActive={this.state.isTNCModalVisible}
          type="access"
          onClosePress={this.hideTNCModal}
        />
      </AuthContainer>
    );
  }

  // ----------------------------------------
}

//#region PROPTYPES

GrantRevokeRegister.propTypes = {
  action: PropTypes.string,
  deviceId: PropTypes.string,
  grantAccessParam: PropTypes.string,
  grantAccessResponse: PropTypes.string,
  grantAccessSaveResponse: PropTypes.object,
  // loadSoa: PropTypes.func,
  navigationParams: PropTypes.object,
  onRequestGrantAccountSave: PropTypes.func,
  grantAccessSaveError: PropTypes.object,
  onRequestLifeAssuredList: PropTypes.func,
  requestGrantOtp: PropTypes.func,
  navigation: PropTypes.any,
  bootstrapData: PropTypes.object,
  bootstrapAction: PropTypes.string,
  clearNetworkResponse: PropTypes.func,
  userData: PropTypes.object,
};

//#endregion

//#region REDUX BINDINGS

// TODO: Tanya Frandisa juga buat yg device sama bootstrap diapain jadinya.
const mapStateToProps = state => ({
  action: state.mpolicyGrantRevoke.action,
  deviceId: state.mpolicyDevice.deviceID,
  userData: state.mpolicyDevice.userData,
  grantAccessParam: state.mpolicyGrantRevoke.grantAccessParam,
  grantAccessResponse: state.mpolicyGrantRevoke.grantAccessResponse,
  grantAccessSaveResponse: state.mpolicyGrantRevoke.grantAccessSaveResponse,
  grantAccessSaveParam: state.mpolicyGrantRevoke.grantAccessSaveParam,
  grantAccessSaveError: state.mpolicyGrantRevoke.grantAccessSaveError,
  bootstrapData: state.bootstrap.bootstrapData,
  bootstrapAction: state.bootstrap.action,
  navigationParams: state.appNavigation.params,
});

const mapDispatchToProps = dispatch => ({
  // loadSoa: payload => {
  //   dispatch({
  //     // context: MAIN_SOA_SCREEN,
  //     // type: MAIN_SOA_LOAD,
  //     payload,
  //   });
  // },
  requestGrantOtp: payload => {
    dispatch({
      context: GRANT_REVOKE_REGISTER_SCREEN,
      type: GRANT_ACCESS_REQUEST_FETCH,
      payload,
    });
  },
  onRequestGrantAccountSave: payload => {
    dispatch({
      context: GRANT_REVOKE_REGISTER_SCREEN,
      type: GRANT_ACCESS_SAVE_FETCH,
      payload,
    });
  },
  onRequestLifeAssuredList: () => {
    dispatch({
      context: GRANT_REVOKE_LIST_SCREEN,
      type: GET_LIFE_ASSURED_LIST_FETCH,
    });
  },
  clearNetworkResponse: () => {
    dispatch({
      type: CLEAR_NETWORK_RESPONSE,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GrantRevokeRegister);

//#endregion
