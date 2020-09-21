import React, { PureComponent } from "react";
import { Image, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import { pathOr, path } from "ramda";

import { PruBackHeader, CustomAlert } from "../../../components";
import { FITNESS_TICK } from "../../../config/images";
import { goto } from "../../../actions";

import WizardButton from "../components/WizardButton";
import Styles from "./styles";
import { metaFinderBabylon } from "../stringUtils";
import { createPlatformEvent } from "../actions";
import PropTypes from "prop-types";
import { configureLineHeight } from "../../../utils/lineHeightsUtils";
import {
  CoreActions,
  CoreServices,
  CoreActionTypes,
  CoreUtils,
  metaHelpers,
  CoreConfig,
  CoreConstants,
} from "@pru-rt-internal/pulse-common";
import firebaseEvents from "../firebaseEvents";

const { pageKeys } = CoreConfig;
const { BABYLON_SC_REG_STATUS } = CoreConstants;
const { NavigationService } = CoreServices;
const { setEntreBabylon } = CoreActions;
const { logFirebaseEvent } = CoreUtils;
class CongratulationsCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buildProfile = () => {
    const { details } = this.props;
    const gender =
      details.gender === "MALE"
        ? metaFinderBabylon("male")
        : metaFinderBabylon("female");

    return [
      { key: metaFinderBabylon("idNum"), val: details.id },
      { key: metaFinderBabylon("firstName"), val: details.firstName },
      { key: metaFinderBabylon("lastName"), val: details.lastName },
      { key: metaFinderBabylon("dob"), val: details.dob },
      { key: metaFinderBabylon("gender"), val: gender },
      { key: metaFinderBabylon("email"), val: details.email },
      { key: metaFinderBabylon("address"), val: details.address },
      { key: metaFinderBabylon("phone"), val: details.phone },
    ];
  };

  congratsBlock() {
    return (
      <View style={[Styles.block, Styles.congratsBlockBorder]}>
        <View style={[Styles.blockHeader, Styles.congratsBlockHeader]}>
          <Text style={[Styles.textCenter, Styles.congratsBlockHeaderText]}>
            {metaFinderBabylon("congrats")}
          </Text>
        </View>
        <View style={Styles.congratsBlockBody}>
          <Text style={[Styles.textCenter, { color: "#ee1a30" }]}>
            {metaFinderBabylon("congrats1")}
          </Text>
          <Text style={[Styles.textCenter, { color: "#747474" }]}>
            {metaFinderBabylon("congrats2")}
          </Text>
          <View style={[Styles.flexRow, Styles.pointer]}>
            <Image source={FITNESS_TICK} style={Styles.pointerTick} />
            <Text style={{ color: "#475662", marginLeft: 11 }}>
              {metaFinderBabylon("congrats3")}
            </Text>
          </View>
          <View style={[Styles.flexRow, Styles.pointer]}>
            <Image source={FITNESS_TICK} style={Styles.pointerTick} />
            <Text style={{ color: "#475662", marginLeft: 11 }}>
              {metaFinderBabylon("congrats4")}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  detailsBlock() {
    return (
      <View style={[Styles.block, Styles.detailsBlockBorder]}>
        <View style={[Styles.blockHeader, Styles.detailsBlockHeader]}>
          <Text style={[Styles.textCenter, Styles.detailsBlockHeaderText]}>
            {metaFinderBabylon("yourDetails")}
          </Text>
        </View>
        <View style={Styles.congratsBlockBody}>
          {this.buildProfile().map(detail => {
            if (detail.val) return this.buildDetailBlock(detail);
          })}
        </View>
      </View>
    );
  }

  buildDetailBlock = ({ key, val }) => (
    <View style={Styles.flexRow}>
      <Text
        style={{
          ...Styles.detailFontStyle,
          ...Styles.detailKeyStyle,
          ...{ textAlign: "left" },
          ...configureLineHeight("12")
        }}
      >
        {key}
      </Text>
      <Text
        style={{
          ...Styles.detailFontStyle,
          ...Styles.detailValStyle,
          ...{ textAlign: "left" },
          ...configureLineHeight("12")
        }}
      >
        {val}
      </Text>
    </View>
  );

  consentBlock = () => {
    const { loadTermsAndCondition } = this.props;

    return (
      <View style={[Styles.flexRow, Styles.consentBlock]}>
        <View style={Styles.consentTermsContainer}>
          <Text style={{...Styles.consentTerms, ...configureLineHeight("11")}}>
            {metaFinderBabylon("babylonConsent1")}
            <Text
              style={{...Styles.laterText, ...configureLineHeight("11")}}
              onPress={() =>
                loadTermsAndCondition("Babylon", "TermAndConditions")
              }
            >
              {metaFinderBabylon("babylonConsent2")}
            </Text>
            {metaFinderBabylon("babylonConsent3")}
            <Text
              style={{...Styles.laterText, ...configureLineHeight("11")}}
              onPress={() => loadTermsAndCondition("Babylon", "PrivacyPolicy")}
            >
              {metaFinderBabylon("babylonConsent4")}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  babylonConsentAcceptance = () => {
    this.props.updateBabylonRegStatus({
      babylonScStatus: BABYLON_SC_REG_STATUS.QUICK_START_DONE,
    });
    const tncData = {
      termsConditions: {
        Babylon: {
          consent: "ACCEPT",
          consentDate: CoreUtils.getTimeStamp(),
          version: metaHelpers.findCommon("BABYLON_TnC_VERSION").value,
          org: "Babylon",
          privacy: "ACCEPT",
          privacyDate: CoreUtils.getTimeStamp(),
          privacyVersion: metaHelpers.findCommon("BABYLON_PP_VERSION").value,
        },
      },
    };
    this.props.updateBabylonTnc(tncData);
  };

  registerBabylon = () => {
    const { details, updateProfileData } = this.props;

    const userProfile = {
      firstName: details.firstName,
      dob: details.dob,
      countryCode: details.countryCode,
      id: details.userId,
      sex: details.gender,
      surName: details.lastName,
    };

    const params = {
      healthFlowsData: undefined,
      owntype: undefined,
      healthAssessment: false,
      pageKey: undefined,
    };
    updateProfileData(userProfile, params);
  };

  getEventData = name => {
    const { auth } = this.props;
    const appVersion = path(["userAgent", "appVersion"], auth);
    return {
      type: "ClickEvent",
      tags: ["healthassessment", "babylon", "health"],
      name,
      source: "pulse",
      attributes: {
        appVersion,
      },
    };
  };

  nextAction = () => {
    const { goto, isRegDone, setEntreBabylon } = this.props;
    logFirebaseEvent(firebaseEvents.post_reg_activate_healthcheck.name, {
      ...firebaseEvents.post_reg_activate_healthcheck.params,
      status: "success",
    });

    this.props.createPlatformEvent(
      this.getEventData("pulse.postReg.wizard.complete.continueToHealthCheck")
    );
    if (isRegDone) {
      setEntreBabylon({ pageKey: "HEAHTH_ASSESSMENT" });
      goto("BabylonStartAssessmentScreen");
      return;
    }
    this.babylonConsentAcceptance();
    this.registerBabylon();
    setEntreBabylon({ pageKey: "HEAHTH_ASSESSMENT" });
  };

  renderContinue = () => {
    return (
      <WizardButton
        text={metaFinderBabylon("activateFreeHealthCheckup")}
        onNextPressed={this.nextAction}
      />
    );
  };

  renderLink = () => (
    <TouchableOpacity
      style={{ justifyContent: "center" }}
      onPress={() => {
        logFirebaseEvent(firebaseEvents.post_reg_activate_healthcheck.name, {
          ...firebaseEvents.post_reg_activate_healthcheck.params,
          status: "skipped",
        });
        this.props.createPlatformEvent(
          this.getEventData("pulse.postReg.wizard.complete.skipHealthCheck")
        );
        NavigationService.navigate("MainTab");
      }}
    >
      <Text
        style={{...Styles.textCenter, ...Styles.laterText, ...configureLineHeight("11")}}
      >
        {metaFinderBabylon("noMayBeLater")}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView style={Styles.mainContainer}>
        <PruBackHeader />
        <View style={Styles.container}>
          {this.congratsBlock()}
          {this.detailsBlock()}
          {this.consentBlock()}
          {this.renderContinue()}
          {this.renderLink()}
        </View>
      </ScrollView>
    );
  }
}

CongratulationsCard.propTypes = {
  auth: PropTypes.object,
  createPlatformEvent: PropTypes.func,
};

const mapStateToProps = state => {
  const profileData = state.profile;
  const id = pathOr("", ["externalIds", "NATIONAL_ID"], profileData);

  return {
    details: {
      address: profileData.address1,
      countryCode: profileData.countryCode,
      dob: profileData.dob,
      email: profileData.email,
      firstName: profileData.firstName,
      gender: profileData.gender,
      id,
      lastName: profileData.surName,
      phone: profileData.phone,
      userId: profileData.id,
    },
    isRegDone: state.babylonAuth.babylonUserLoggedIn,
    isPostRegister: state.wizardData.isPostRegister,
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  loadTermsAndCondition: (source, value) => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source,
      value,
    },
  }),
  updateBabylonRegStatus: payload => ({
    type: CoreActionTypes.UPDATE_BABYLON_REGISTRATION_STATUS,
    payload,
  }),
  updateBabylonTnc: tncData => ({
    context: pageKeys.CHAT_QUICK_START_WIZARD,
    type: CoreActionTypes.UPDATE_BABYLON_TNC,
    payload: {
      tncData,
    },
  }),
  updateProfileData: (userProfile, params) => ({
    context: pageKeys.PROFILE,
    type: CoreActionTypes.UPDATE_PROFILE_DETAILS_1,
    payload: {
      userProfile,
      params,
    },
  }),
  setEntreBabylon,
  goto,
  createPlatformEvent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongratulationsCard);
