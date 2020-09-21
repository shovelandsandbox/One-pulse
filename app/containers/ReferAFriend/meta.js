import {
    CoreConfig,
    metaHelpers,
    CoreConstants
  } from "@pru-rt-internal/pulse-common";
  const findElement = metaHelpers.findElement;
  const findCommon = metaHelpers.findCommon;
  const findErrorMessage = metaHelpers.findErrorMessage;
  const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
  const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
  const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;
  
  const {
    pageKeys
  } = CoreConfig;
  const {
    REFER_A_FRIEND_YOU_REFER,
    REFER_A_FRIEND_THEY_JOIN,
    REFER_A_FRIEND_YOU_REWARD,
    REFER_A_FRIEND_THEY_REWARD,
    REFER_A_FRIEND_INVITE,
    REFER_A_FRIEND_DASHBOARD,
    REFER_A_FRIEND_SHARE_QR,
    REFER_A_FRIEND_SCANNING_APPSTORE,
    REFER_A_FRIEND_SHARE_URL,
    REFER_A_FRIEND_INVITED,
    REFER_A_FRIEND_JOINED,
    REFER_A_FRIEND_REWARDS,
  } = CoreConstants;

  const { REFER_A_FRIEND } = pageKeys;
  
  const initializeScreenMeta = () => {
    const referAFriendYouReferLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_YOU_REFER).label;
    const referAFriendTheyJoinLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_THEY_JOIN).label;
    const referAFriendYouRewardLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_YOU_REWARD).label;
    const referAFriendTheyRewardLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_THEY_REWARD).label;
    const referAFriendInviteLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_INVITE).label;
    const referAFriendDashboardLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_DASHBOARD).label;
    const referAFriendShareQrCodeLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_SHARE_QR).label;
    const referAFriendScanningAppStoreLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_SCANNING_APPSTORE).label;
    const referAFriendShareURLLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_SHARE_URL).label;
    const referAFriendInvitedLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_INVITED).label;
    const referAFriendJoinedLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_JOINED).label;
    const referAFriendRewardsLabel = findElement(REFER_A_FRIEND, REFER_A_FRIEND_REWARDS).label;
    return {
      referAFriendTheyJoinLabel,
      referAFriendTheyRewardLabel,
      referAFriendYouReferLabel,
      referAFriendYouRewardLabel,
      referAFriendInviteLabel,
      referAFriendDashboardLabel,
      referAFriendShareQrCodeLabel,
      referAFriendScanningAppStoreLabel,
      referAFriendShareURLLabel,
      referAFriendInvitedLabel,
      referAFriendJoinedLabel,
      referAFriendRewardsLabel
    };
  };
  
  export default MetaConstants = {
    findElement,
    findCommon,
    findErrorMessage,
    findCommonErrorMessages,
    findBackendErrorMessage,
    findBackendErrorMessageByScreen,
    initializeScreenMeta
  };
  