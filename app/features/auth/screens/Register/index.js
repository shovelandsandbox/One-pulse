import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DynamicLandingPage from "./DynamicLandingPage";
import LandingPage from "./LandingPage";
import { path } from "ramda";
import { goto } from "../../../../actions";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";

class Register extends PureComponent {
  getLineHeight = size => {
    return configureLineHeight(size);
  };

  render() {
    const { useDynamicJsx } = this.props;

    return useDynamicJsx ? (
      <DynamicLandingPage
        {...this.props}
        hideLoader={true}
        configureLineHeight={this.getLineHeight.bind(this)}
      ></DynamicLandingPage>
    ) : (
      <LandingPage {...this.props}></LandingPage>
    );
  }
}

Register.propTypes = {
  useDynamicJsx: PropTypes.bool,
};

const mapStateToProps = state => ({
  useDynamicJsx: path(["meta", "countryCommonMeta", "useDynamicJsx"], state),
});

export default connect(mapStateToProps, {
  loadPrivacyPolicy: () => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source: "Pulse",
      value: "PrivacyPolicy",
    },
  }),
  loadTermsAndCondition: () => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source: "Pulse",
      value: "TermAndConditions",
    },
  }),
  goto,
})(Register);
