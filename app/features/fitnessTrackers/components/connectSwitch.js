import React from "react";
import { StyleSheet } from "react-native";
import SwitchToggle from "@dooboo-ui/native-switch-toggle";
import { safeMetaLabelFinder } from "../../../utils/meta-utils";
import metaKeys from "../screenMetaKeys";
export const ConnectSwitch = props => (
  <SwitchToggle
    buttonText={""}
    type={1}
    buttonStyle={styles.buttonStyle}
    textRightStyle={[styles.textCommon, { marginStart: 32 }]}
    textLeftStyle={[styles.textCommon, { color: "white", marginStart: 8 }]}
    containerStyle={styles.containerStyle}
    backgroundColorOff="#707070"
    backgroundColorOn="#34a853"
    circleStyle={styles.circleStyle}
    circleColorOff="#fff"
    circleColorOn="#fff"
    duration={500}
    {...props}
    switchOn={!props.switchOn}
  />
);

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  circleStyle: {
    backgroundColor: "blue",
    borderRadius: 12.5,
    height: 15,
    width: 15, // rgb(102,134,205)
  },
  containerStyle: {
    borderRadius: 30,
    height: 21,
    padding: 2,
    width: 45,
  },
  textCommon: { color: "black", fontSize: 17, marginStart: 15 },
});
