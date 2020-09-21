/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import RewardsIcon from "../RewardsIcon";
import { connect } from "react-redux";
import { gotoRewardCentre } from "../../actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  onPress: gotoRewardCentre,
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardsIcon);
