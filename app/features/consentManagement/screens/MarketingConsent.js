/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-depth */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import Styles from "./styles";
import { screenNames } from "../config/screenNames";
import * as actionsNames from "../config/actionNames";
import MetaConstants from "../meta";

class MarketingConsent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConsentCheck: false,
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  rejectMarketingConsent = () => {
    this.props.rejectmarketingConsentAPI(this.state.isConsentCheck);
  };

  componentWillMount() {
    const { termsConditions } = this.props;
    if (termsConditions.marketing != undefined) {
      if (termsConditions.marketing.consent === "REJECT") {
        this.setState({ isConsentCheck: false });
      } else {
        this.setState({ isConsentCheck: true });
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.termsConditions.marketing !== undefined) {
      if (this.props.termsConditions.marketing != undefined) {
        if (
          this.props.termsConditions.marketing.consent !=
            nextProps.termsConditions.marketing.consent &&
          nextProps.termsConditions.marketing.consent === "REJECT"
        ) {
          this.setState({
            isConsentCheck: false,
          });
        } else {
          if (
            this.props.termsConditions.marketing.consent !=
              nextProps.termsConditions.marketing.consent &&
            nextProps.termsConditions.marketing.consent === "ACCEPT"
          ) {
            this.setState({
              isConsentCheck: true,
            });
          }
        }
      } else {
        if (nextProps.termsConditions.marketing === "REJECT") {
          this.setState({
            isConsentCheck: false,
          });
        } else {
          this.setState({
            isConsentCheck: true,
          });
        }
      }
    }
  }

  render() {
    const { termsConditions } = this.props;
    const acceptMarketingConsent = this.MetaConstants.marketing;
    const marketingConsentText = this.MetaConstants.marketingConsentText;
    const saveLabel = this.MetaConstants.saveText;
    const consentManagement = this.MetaConstants.markertingHeader;
    const marketing = this.MetaConstants.marketing;
    return (
      <View style={Styles.pageContainerStyle}>
        <View style={Styles.containerStyle}>
          <Text style={Styles.textStyle}>{consentManagement}</Text>
        </View>
        <View style={{ flex: 1.8 }}>
          <View style={{ flexDirection: "row", marginTop: 40 }}>
            <Text style={Styles.subHeading}>{marketing}</Text>
            <View style={{ flex: 1 }}>
              <CheckBox
                style={{ alignSelf: "flex-end" }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkBoxColor={"#ED1B2E"}
                onClick={() => {
                  this.state.isConsentCheck
                    ? this.setState({
                        isConsentCheck: false,
                      })
                    : this.setState({
                        isConsentCheck: true,
                      });
                }}
                isChecked={this.state.isConsentCheck}
                leftText={termsConditions.marketing === acceptMarketingConsent}
              />
            </View>
          </View>
          <View style={Styles.consentTextStyle}>
            <Text style={Styles.consentText}>{marketingConsentText}</Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            style={Styles.buttonStyle}
            onPress={this.rejectMarketingConsent}
          >
            <Text style={Styles.buttonTextStyle}>{saveLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    marketingConsentRejectStatus: state.profile.marketingConsentReject,
    termsConditions: state.auth.termsConditions,
    workflowId: state.register.workflowId,
    consentManagementStatus: state.consentManagementReducer.consentStatus,
  };
};

export default connect(mapStateToProps, {
  rejectmarketingConsentAPI: status => ({
    context: screenNames.MARKETING_CONSENT,
    type: actionsNames.MARKETING_CONSENT_STATUS,
    payload: { status: status },
  }),
})(MarketingConsent);
