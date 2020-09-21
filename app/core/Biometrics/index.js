import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import { metaHelpers, CoreConfig } from "@pru-rt-internal/pulse-common";
import { CustomAlert } from "../../components";
const {
  NEW_SECURITY,
  TOUCH_HEADING,
  TOUCH_SUB_HEADING,
  TOUCH_CANCEL,
  TOUCH_ENROLL,
} = CoreConfig;

const enrollFingerPrintAlert = (userId, ok, cancel) => {
  const touch_head = metaHelpers.findElement(NEW_SECURITY, TOUCH_HEADING).label;
  const touch_sub_heading = metaHelpers.findElement(
    NEW_SECURITY,
    TOUCH_SUB_HEADING
  ).label;

  const touch_cancel = metaHelpers.findElement(NEW_SECURITY, TOUCH_CANCEL)
    .label;

  const touch_enroll = metaHelpers.findElement(NEW_SECURITY, TOUCH_ENROLL)
    .label;
  CustomAlert.show(touch_head, touch_sub_heading, {
    positiveText: touch_enroll,
    onPositivePress: () => {
      console.log("Enroll user for touch.");
      ReactNativeBiometrics.createKeys()
        .then(result => {
          if (result) {
            ok(userId, result.publicKey);
          } else {
            console.log("Don't have keys.");
          }
        })
        .catch(error => {
          console.log(
            `Finger print enroll incomplete due to : [${error.message}]`
          );
        });
    },
    negativeText: touch_cancel,
    onNegativePress: () => {
      console.log("User denied touch enroll.");
      cancel();
    },
  });
};

export default checkBimetricSupported = (userId, ok, cancel) => {
  ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
    const { available, biometryType } = resultObject;
    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      enrollFingerPrintAlert(userId, ok, cancel);
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      console.log("FaceID is supported");
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      enrollFingerPrintAlert(userId, ok, cancel);
      console.log("Biometrics is supported");
    } else {
      console.log("Biometrics not supported");
    }
  });
};
