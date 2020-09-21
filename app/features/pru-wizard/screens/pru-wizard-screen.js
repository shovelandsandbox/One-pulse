import React from "react";
import PruWizard from "../components/pru-wizard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;
// import stepsConfig from "../testConfig";

class PruWizardScreen extends React.PureComponent {
  getWizardConfig = () => {
    // const config = stepsConfig;
    const config = this.props.wizardConfig;
    return config;
  };

  componentDidMount() {
    this.props.fetchWizardConfig();
  }

  componentDidUpdate() {
    const { language } = this.props;
    const config = this.getWizardConfig();
    if (config && config.productInfo) {
      this.props.fetchProductMeta(language, config.productInfo.productCode);
    }
  }

  render() {
    const wizardConfig = this.getWizardConfig();
    if (!wizardConfig) {
      return null;
    }
    return <PruWizard config={wizardConfig} />;
  }
}

PruWizardScreen.propTypes = {
  fetchProductMeta: PropTypes.func,
  wizardConfig: PropTypes.object,
  language: PropTypes.string,
};
const mapStateToProps = state => {
  return {
    wizardConfig: state.wizardData.pruWizardSteps,
    language: state.userPreferences.language,
  };
};

const mapDispatchToProps = {
  fetchWizardConfig: () => ({
    context: pageKeys.REGISTRATION,
    type: "GET_PRU_WIZARD_ID"
  }),
  fetchProductMeta: (language, code) => ({
    context: "PRODUCT_SELECT_PAGE",
    type: "GET_PRODUCT_META",
    payload: {
      code,
      language,
    },
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(PruWizardScreen);

/*
PruWizardScreen
  PruWizard
    Continue
    Next
    RNWizard (steps -- each step has content, each content has props )
      => CardOne (step1Config)
      => CardOne (step2Config)
*/
