import React, { PureComponent } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  CoreConfig,
  CoreActionTypes,
  CoreServices,
} from "@pru-rt-internal/pulse-common";
import PruShareModal from "../../components/PruShare/withModal";

import { REFER_FRIEND } from "../../config/images";
import MetaConstants from "./meta";
import { dispatchEvent } from "../../actions";
import { BackgroundImageDisplay, ContainerImageDisplay } from "./imageDisplay";
// import SocialReferral from "../../components/SocialReferral";
import {
  OPEN_SOCIAL_REFERRAL_MODAL,
  SOCIAL_REFERRAL_CONTEXT,
  SOCIAL_REFERRAL_ENABLE_INVITE_DONE_MODAL,
  SOCIAL_REFERRAL_DISABLE_INVITE_DONE_MODAL,
} from "../../actions/Types";
const { NavigationService } = CoreServices;
const { pageKeys } = CoreConfig;
import {
  safeMetaLabelFinder,
  safeMetaContextLabelFinder,
} from "../../utils/meta-utils";

const SCREEN_NAME_WHEN_SKIP = "MainTab";

class ReferFriendDemo extends PureComponent {
  constructor(props) {
    super(props);
    this.MetaConstants = {
      ...MetaConstants.initializeScreenMeta(),
      getScreenContext: MetaConstants.getScreenContext,
      getImage: MetaConstants.getImage,
      getScreenMode: MetaConstants.getScreenMode,
      showDescription: MetaConstants.showDescription,
    };
  }
  componentDidMount() {
    const { setReferralContext } = this.props;
    const context = this.MetaConstants.getScreenContext();
    this.setState({ context });
    this.props.getReferralCode();
    this.props.dispatchEvent(events(context).load);
  }
  renderInvitationModal = () => {
    const { referralEnableInviteDone, disableInviteDoneModal } = this.props;
    const inviteFriendVia = safeMetaContextLabelFinder(
      "gift",
      "SocialInvite",
      "inviteFriendVia"
    );
    const title = safeMetaLabelFinder("homeTab", "shareWithFriendsTitle");
    const desc =
      safeMetaContextLabelFinder("gift", "HomeReward", "fitterpulse") +
      " " +
      this.props.referralDescription;
    return (
      <PruShareModal
        config={{ title, desc }}
        userAgent={this.props.auth.userAgent}
        onClose={disableInviteDoneModal}
        visible={referralEnableInviteDone}
        title={inviteFriendVia}
      />
    );
  };

  openSocialInvite = () => {
    const { context } = this.state;
    const { enableInviteDoneModal } = this.props;
    this.props.dispatchEvent(events(context).inviteModalOpen);
    enableInviteDoneModal();
  };

  backEvent = () => {
    const { setReferralContext } = this.props;
    setReferralContext("invite");
    this.props.dispatchEvent(events(this.state.context).back);
  };

  renderSkip = () => {
    return (
      <TouchableOpacity
        onPress={() => (
          this.backEvent(), NavigationService.resetStack(SCREEN_NAME_WHEN_SKIP)
        )}
      >
        <Text style={styles.skipText}>{this.MetaConstants.skip}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { referralEnableInviteDone } = this.props;
    const IMAGE_URL = this.MetaConstants.getImage();
    const screenMode = this.MetaConstants.getScreenMode();
    const showDescription = this.MetaConstants.showDescription();
    const props = {
      ...this,
      ...this.props,
      IMAGE_URL,
      REFER_FRIEND,
      NavigationService,
      showDescription,
      SCREEN_NAME_WHEN_SKIP,
    };
    return (
      <React.Fragment>
        {screenMode == "full" ? (
          <BackgroundImageDisplay {...props} />
        ) : (
          <ContainerImageDisplay {...props} />
        )}
        {referralEnableInviteDone && this.renderInvitationModal()}
      </React.Fragment>
    );
  }
}

// ReferFriendDemo.propTypes = {
//   referralEnableInviteDone: PropTypes.boolean,
//   disableInviteDoneModal: PropTypes.boolean,
//   enableInviteDoneModal: PropTypes.func,
// };

const mapStateToProps = state => ({
  referralEnableInviteDone:
    state.socialReferralReducer.referralEnableInviteDone,
  auth: state.auth,
  referralDescription: state.referralGroup.referralDescription,
});

const mapDispatchToProps = dispatch => ({
  enableInviteDoneModal: key => {
    dispatch({
      context: "SOCIAL_REFERRAL",
      type: SOCIAL_REFERRAL_ENABLE_INVITE_DONE_MODAL,
      payload: {},
    });
  },
  disableInviteDoneModal: key => {
    dispatch({
      context: "SOCIAL_REFERRAL",
      type: SOCIAL_REFERRAL_DISABLE_INVITE_DONE_MODAL,
      payload: {},
    });
  },
  openInviteDialog: key => {
    dispatch({
      context: "SOCIAL_REFERRAL",
      type: OPEN_SOCIAL_REFERRAL_MODAL,
      payload: {},
    });
  },
  setReferralContext: key => {
    dispatch({
      type: SOCIAL_REFERRAL_CONTEXT,
      payload: key,
    });
  },
  getReferralCode: () => {
    dispatch({
      context: pageKeys.REFER_A_FRIEND,
      type: CoreActionTypes.GET_REFERRAL_CODE,
    });
  },
  dispatchEvent: payload => dispatch(dispatchEvent(payload)),
});

const styles = StyleSheet.create({
  skipText: {
    color: "#F1172B",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ReferFriendDemo);

const events = context => ({
  load: {
    type: "ScreenEvent",
    tags: ["referFriend"],
    name: "pulse.ProductJourneys.referFriend.load",
    source: "pulse",
    attributes: { context },
  },
  back: {
    type: "ClickEvent",
    tags: ["referFriend"],
    name: "pulse.ProductJourneys.referFriend.back",
    source: "pulse",
    attributes: { context },
  },
  inviteModalOpen: {
    type: "ClickEvent",
    tags: ["referFriend"],
    name: "pulse.viewContent",
    source: "pulse",
    attributes: { context },
  },
});
