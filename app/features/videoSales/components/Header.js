import React from "react";
import { StyleSheet } from "react-native";
import Header from "../../../components/Header/Header";
import { colors } from "@pru-rt-internal/pulse-common";
import MetaConstants from "../meta";

const HeaderWrapper = props => {
  const metaConstants = { ...MetaConstants.screenMeta() };
  const initiate_video_call = metaConstants.initiate_video_call;

  return (
    <Header
      title={initiate_video_call}
      titleStyle={styles.titleStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: colors.charcolBlack,
    fontSize: 20,
  },
});

export default HeaderWrapper;
