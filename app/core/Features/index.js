import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

const features = {
  TOUCH_ID: "touchId",
  FACE_ID: "faceId",
  CUSTOMIZE: "customize",
  SECURITY: "security",
  LANGUGAE: "language",
  FEEDBACK: "feedback",
  PRIVACY: "privacy",
  SIGNOUT: "signout",
  REFERAFRIEND: "referAFriend"
};

const featureStatuses = {
  ALLOW: "ALLOW",
  DENY: "DENY"
};

const screenFeatures = {
  [pageKeys.PULSE_SECURITY]: [
    {
      feature: features.TOUCH_ID,
      screen: pageKeys.PULSE_SECURITY
    },
    {
      feature: features.FACE_ID,
      screen: pageKeys.PULSE_SECURITY
    }
  ],
  [pageKeys.ACCOUNT_SCREEN]: [
    {
      feature: features.CUSTOMIZE,
      screen: pageKeys.ACCOUNT_SCREEN
    },
    {
      feature: features.SECURITY,
      screen: pageKeys.ACCOUNT_SCREEN
    },
    {
      feature: features.LANGUGAE,
      screen: pageKeys.ACCOUNT_SCREEN
    },
    {
      feature: features.FEEDBACK,
      screen: pageKeys.ACCOUNT_SCREEN
    },
    {
      feature: features.PRIVACY,
      screen: pageKeys.ACCOUNT_SCREEN
    },
    {
      feature: features.REFERAFRIEND,
      screen: pageKeys.REFER_A_FRIEND
    }
  ]
};

const isFeatureEnable = (fetaureStatuses, feature) => {
  const featureStatus = fetaureStatuses[feature];
  if (featureStatus) {
    return featureStatus === featureStatuses.ALLOW;
  }
  return false;
};

export { screenFeatures, features, isFeatureEnable };
