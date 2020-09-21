import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GenericContainer from "../../framework/AppContext";
import {
  safeMetaLabelFinder,
  safeMetaContextLabelFinder,
} from "../../utils/meta-utils";
import {
  goto,
  gotoNewCommon,
  dispatchActionWithContext,
  justDispatchAction,
} from "../../actions";
import { pathOr, path } from "ramda";
import { formatCurrency } from "../../utils";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
import { CoreUtils } from "@pru-rt-internal/pulse-common";

const { logFirebaseEvent, setScreen } = CoreUtils;

class GenericComponentTile extends PureComponent {
  getDataForProp = prop => {
    return this.props[prop];
  };
  getData = (initialValue, path) => {
    return pathOr(initialValue, path, this.props);
  };

  doesDataExistForProp = prop => {
    const propItem = this.props[prop];
    return propItem && propItem.length > 0;
  };

  getLineHeight = value => {
    const lineHeight = configureLineHeight(value);
    return lineHeight
  };

  render() {
    const {
      id,
      properties: { screenId },
      style,
      ...restProps
    } = this.props;
    const { ...rest } = style;
    return (
      <GenericContainer
        screen={screenId}
        tileId={id}
        style={rest}
        hideLoader={true}
        {...restProps}
        getDataForProp={this.getDataForProp}
        getData={this.getData}
        language={this.props.language}
        doesDataExistForProp={this.doesDataExistForProp}
        configureLineHeight={this.getLineHeight.bind(this)}
      />
    );
  }
}
const mapStateToProps = state => ({
  pulseFood: state.pulsefood,
  customerConnectedWearables: pathOr(
    [],
    ["FitnessTrackersReducer", "customerConnectedWearables"],
    state
  ),
  commonData: state.commonData,
  meta: state.meta,
  language: state.userPreferences.language,
  referralGroup: state.referralGroup,
  commonMeta: state.meta.commonMeta,
  countryInfo: pathOr("", ["auth", "countryInfo"], state),
  countryCommonMeta: path(["meta", "countryCommonMeta"], state),
  auth: state.auth,
  metaKeys: {},
  safeMetaLabelFinder,
  formatCurrency,
  safeMetaContextLabelFinder,
  dispatchActionWithContext,
  justDispatchAction,
  gotoNewCommon,
  goto,
  pathOr,
  subscriptions: pathOr(
    null,
    ["subscription"],
    state
  ),
  logFirebaseEvent,
  setScreen
});

export default connect(mapStateToProps, {})(GenericComponentTile);

GenericComponentTile.propTypes = {
  properties: PropTypes.object,
  handler: PropTypes.func,
  style: PropTypes.object,
  customerConnectedWearables: PropTypes.object,
  calories: PropTypes.string,
  steps: PropTypes.string,
  id: PropTypes.string,
};

GenericComponentTile.defaultProps = {};
