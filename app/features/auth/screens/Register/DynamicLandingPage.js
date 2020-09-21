import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CoreActionTypes, CoreUtils } from "@pru-rt-internal/pulse-common";
import { goto, gotoNewCommon } from "../../../../actions";
import MetaConstants from "../../meta";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import GenericContainer from "../../../../framework/AppContext";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";

const { EVENT_TYPE_USER_ACTIVITY } = CoreActionTypes;
const { setScreen } = CoreUtils;
class DynamicLandingPage extends PureComponent {
  renderDynamicScreen = screenInfo => {
    const { screenName } = screenInfo;
    return (
      <GenericContainer screen={screenName} {...this.props} hideLoader={true} />
    );
  };

  componentDidMount() {
    setScreen("LoggedOutHome", EVENT_TYPE_USER_ACTIVITY);
  }

  render() {
    return this.renderDynamicScreen({
      // screenName: "landing-page-" + Platform.OS,
      screenName: "landing-page",
    });
  }
}

DynamicLandingPage.propTypes = {
  meta: PropTypes.object,
  language: PropTypes.string,
  commonMeta: PropTypes.object,
  goto: PropTypes.func,
  gotoNewCommon: PropTypes.func,
  safeMetaLabelFinder: PropTypes.func,
  saveLoginPreference: PropTypes.func,
};

const mapStateToProps = state => ({
  meta: state.meta,
  language: state.userPreferences.language,
  commonMeta: state.meta.commonMeta,
  auth: state.auth,
  metaKeys: { ...MetaConstants.initializeScreenMeta() },
  safeMetaLabelFinder,
});

export default connect(mapStateToProps, {
  gotoNewCommon,
  goto,
  saveLoginPreference: loginPreference => ({
    type: "loginPreference",
    payload: {
      loginPreference
    }
  })
})(DynamicLandingPage);
