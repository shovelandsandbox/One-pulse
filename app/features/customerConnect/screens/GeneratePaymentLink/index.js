import React, { PureComponent } from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { CHAT_ADD_PEOPLE, CHAT_VIDEO_CALL } from "../../../../config/images";
import { metaFinderCustomerConnect } from "../../meta";
import {
  PruBackHeader,
  ShadowWrapper,
  PruRoundedButton,
} from "../../../../components";
import { connect } from "react-redux";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PruDropdownComponent from "../../../../components/PruDropdown";
import { CoreServices, events } from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../../../actions";
const { NavigationService } = CoreServices;
import { updatePaymentDetails } from "../../redux/actions";
import _ from "lodash";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import { pathOr } from "ramda";

class GeneratePaymentLink extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: "",
      policyName: "",
    };
  }

  componentDidMount() {
    const selectedCurrency = metaFinderCustomerConnect("selectedCurrency");
    this.setState({ selectedCurrency });
  }

  onCurrencySelection = selectedCurrency => {
    this.setState({ selectedCurrency });
  };

  formHasErrors = () => {
    let formHasErrors = false;
    if (_.isEmpty(this.state.paymentAmount)) {
      this.setState({ paymentAmountError: "Please enter Amount" });
      formHasErrors = true;
    }
    if (_.isEmpty(this.state.proposalID)) {
      this.setState({ proposalIDError: "Please enter Policy No." });
      formHasErrors = true;
    }
    if (_.isEmpty(this.state.policyName)) {
      this.setState({ PolicyNameError: "Please enter Policy Name" });
      formHasErrors = true;
    }
    return formHasErrors;
  };

  resetError = stateProperty => {
    this.setState({
      [stateProperty]: "",
    });
  };

  continuePaymentLink = () => {
    if (this.formHasErrors()) {
      return;
    }
    const payload = {
      customerName: this.props?.chatDetails?.participantName,
      paymentAmount: this.state.paymentAmount,
      orderRef: this.state.proposalID,
      policyName: this.state.policyName,
      serviceCode: metaFinderCustomerConnect("serviceCode"),
      currency: this.state.selectedCurrency,
      pgCode: metaFinderCustomerConnect("pgCode"),
      type: "payment-link",
    };
    this.props.updatePaymentDetails(payload);
    this.props.registerEvent(eventNames.generatePaymentLink);
    // this.props.dispatchEvent(events.generatePaymentLink);
    NavigationService.goBack(null);
  };

  prepareCurrencyPicker = () => {
    const currencyList = metaFinderCustomerConnect("currencyList");

    return (
      <PruDropdownComponent
        selectedValueCB={this.onCurrencySelection}
        selectedOption={this.state.selectedCurrency}
        options={currencyList}
        enabled={true}
      ></PruDropdownComponent>
    );
  };

  render() {
    const { chatDetails, contacts } = this.props;
    const participantEmailPhone = pathOr(
      "",
      ["initiatedWith", "value"],
      chatDetails
    );
    const participantContact = contacts[0];
    const partyName = pathOr("", ["fullName"], participantContact);
    return (
      <View style={styles.pulseContainer}>
        <ShadowWrapper style={{ padding: 0, borderRadius: 0 }}>
          <PruBackHeader title={partyName} rightImage={false}></PruBackHeader>
        </ShadowWrapper>
        <ScrollView>
          <KeyboardAwareScrollView
            enableOnAndroid
            contentContainerStyle={{ flexGrow: 1 }}
            extraScrollHeight={Platform.OS == "ios" ? 15 : 50}
          >
            <View style={styles.generateLinkLayout}>
              <Text style={styles.titleText}>Generate Payment Link</Text>
              <View>
                <Text style={styles.sectionLabel}>Bill To</Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    value={partyName}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onFocus={() => {}}
                    onChangeText={value => {}}
                    onSubmitEditing={value => {}}
                    fontSize={14}
                    textColor={"#000"}
                    placeholder={"Customer Name"}
                    editable={false}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    value={participantEmailPhone}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onFocus={() => {}}
                    onChangeText={value => {}}
                    onSubmitEditing={value => {}}
                    fontSize={14}
                    textColor={"#000"}
                    placeholder={"Customer Mail ID"}
                    editable={false}
                    style={styles.textInput}
                  />
                </View>
                <Text style={styles.sectionLabel}>Policy Invoice</Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    value={this.state.policyName}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onFocus={() => {
                      this.resetError("PolicyNameError");
                    }}
                    onChangeText={value => {
                      this.setState({ policyName: value });
                    }}
                    onSubmitEditing={value => {}}
                    fontSize={14}
                    placeholder={"Policy Name"}
                    style={styles.textInput}
                  />
                </View>
                {this.state.PolicyNameError ? (
                  <Text style={styles.error}>{this.state.PolicyNameError}</Text>
                ) : null}
                <View style={styles.textInputWrapper}>
                  <TextInput
                    value={this.state.proposalID}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onFocus={() => {
                      this.resetError("proposalIDError");
                    }}
                    onChangeText={value => {
                      this.setState({ proposalID: value });
                    }}
                    onSubmitEditing={value => {}}
                    fontSize={14}
                    placeholder={"Policy No."}
                    error={this.state.proposalIDError}
                    style={styles.textInput}
                  />
                </View>
                {this.state.proposalIDError ? (
                  <Text style={styles.error}>{this.state.proposalIDError}</Text>
                ) : null}
              </View>
              <View style={styles.amountRow}>
                <View style={styles.currencyWrapper}>
                  {this.prepareCurrencyPicker()}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.textInputWrapper}>
                    <TextInput
                      value={this.state.paymentAmount}
                      autoCorrect={false}
                      enablesReturnKeyAutomatically={true}
                      onFocus={() => {
                        this.resetError("paymentAmountError");
                      }}
                      onChangeText={value => {
                        this.setState({ paymentAmount: value });
                      }}
                      onSubmitEditing={value => {}}
                      fontSize={14}
                      placeholder={"Payment Amount"}
                      error={this.state.paymentAmountError}
                      style={styles.textInput}
                      keyboardType={"numeric"}
                    />
                  </View>
                </View>
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                {this.state.paymentAmountError ? (
                  <Text style={styles.error}>
                    {this.state.paymentAmountError}
                  </Text>
                ) : null}
              </View>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.cancelContainer}
                  onPress={() => this.props.navigation.goBack(null)}
                >
                  <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
                <PruRoundedButton
                  style={styles.requestPaymentButton}
                  textStyling={{ fontSize: 14 }}
                  buttonTitle={"Generate Link"}
                  onPress={() => {
                    this.continuePaymentLink();
                  }}
                ></PruRoundedButton>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    chatDetails: state.customerConnect.chatDetails,
    isVideoResized: state.customerConnect.isVideoResized,
    textinitiator: state.customerConnect.textinitiator,
    contacts: state.customerConnect.contacts,
  };
};

export default connect(mapStateToProps, {
  registerEvent,
  updatePaymentDetails,
  dispatchEvent,
})(GeneratePaymentLink);
