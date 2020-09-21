import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import {
  updateProfileInReducer,
  updateCustomerDetails,
} from "../../../../actions/apis";
import PruTextInput from "../../../../components/PruTextInput";
import { PruBackHeader } from "../../../../components";
import styles from "./styles";
import { Theme } from "../../../../themes";
import { goto } from "../../../../actions";
import { metaFinderCollectSocialEmail } from "../../meta";
import { isValidEmail } from "../../../../utils/UserCredentials";

const { Colors, Styles } = Theme;

import {
  CoreComponents,
  metaHelpers,
  CoreActionTypes,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
const { AppButton } = CoreComponents;

class CollectSocialRegnEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isEmailError: false,
    };
  }

  updateCustomerEmail() {
    const isEmailValid = isValidEmail(this.state.email);
    if (isEmailValid) {
      this.props.updateProfileInReducer("email", this.state.email);
      this.props.updateCustomerDetails();
      var useWizardRegistration = metaHelpers.findElement(
        "pruWizard",
        "useWizardRegistration"
      ).label;
      if (useWizardRegistration) {
        this.props.goto("PruWizardScreen");
      } else {
        this.props.dispatchRegistrationSuccess();
      }
    } else {
      this.setState({ isEmailError: true });
    }
  }

  componentDidMount() {
    this.props.registerEvent(eventNames.collectSocialEmailScreen);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <PruBackHeader title={""} previousPage={"UserRegistrationScreen"} />
        <View style={styles.container}>
          <View style={styles.congratsHeader}>
            <Text style={styles.congratsHeaderText}>
              {metaFinderCollectSocialEmail("congratsHeader")}
            </Text>
          </View>
          <View style={styles.congratsHeader}>
            <Text style={styles.subHeaderText}>
              {metaFinderCollectSocialEmail("youCanNowLoginToFacebook")}
            </Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.whatsYourEmailContainer}>
            <Text style={styles.whatsYourEmail}>
              {metaFinderCollectSocialEmail("whatsYourEmail")}
            </Text>
          </View>
          <View style={styles.personalisedContainer}>
            <Text style={styles.personalisedText}>
              {metaFinderCollectSocialEmail("youWillRecievePersonalHA")}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <PruTextInput
              title={metaFinderCollectSocialEmail("emailAddress")}
              txtInputStyle={styles.txtInputStyle}
              underlineColorAndroid="transparent"
              placeholder={metaFinderCollectSocialEmail("enterYourEmail")}
              messageType={this.state.isEmailError ? "error" : ""}
              message={
                this.state.isEmailError
                  ? metaFinderCollectSocialEmail("enterValidEmail")
                  : ""
              }
              onChange={newVal => {
                this.setState({ email: newVal });
              }}
              value={this.state.email}
            />
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title={metaFinderCollectSocialEmail("continueButton")}
              press={() => {
                this.updateCustomerEmail();
              }}
              type={[Styles.btn, Styles.primary]}
              disable={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  registerEvent,
  updateProfileInReducer,
  updateCustomerDetails,
  goto,
  dispatchRegistrationSuccess: () => ({
    type: CoreActionTypes.REGISTRATION_SUCCESS_HANDLER,
    context: pageKeys.REGISTRATION,
  }),
};

export default connect(null, mapDispatchToProps)(CollectSocialRegnEmail);
