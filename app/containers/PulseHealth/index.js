import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HealthTab from "./HealthTab";
import DynamicHealthTab from "./DynamicHealthTab";

class PulseHealth extends PureComponent {
  render() {
    const { useDynamicHealthScreen } = this.props;
    if (useDynamicHealthScreen === true) {
      return <DynamicHealthTab {...this.props} />;
    } else if (useDynamicHealthScreen === false) {
      return <HealthTab {...this.props} />;
    }
    return null;
  }
}

PulseHealth.propTypes = {
  useDynamicHealthScreen: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    useDynamicHealthScreen: state.meta.countryCommonMeta.useDynamicHealthScreen,
  };
};
export default connect(mapStateToProps, null)(PulseHealth);
