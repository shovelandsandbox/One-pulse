import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import { BACK } from "../../../../config/images";
import Styles from './styles';

import {
  metaHelpers,
  CoreConstants,
} from "@pru-rt-internal/pulse-common";
const { MY_NOTIFICATION_CENTER, NOTIFICATION_CENTER } = CoreConstants;


export default AppHeaderComponent = props => {
  const notifiCenterLabel = metaHelpers.findElement(MY_NOTIFICATION_CENTER, NOTIFICATION_CENTER).label;

  return (
    <View style={ Styles.headerContainer }>
      <View style={ Styles.backContainer}>
        <TouchableOpacity onPress={() => props.goBack()}>
          <Image style={ Styles.backButton } source={BACK} />
        </TouchableOpacity> 
      </View>
      <View style={ Styles.wordContainer }>
        <Text style={ Styles.word }>{ notifiCenterLabel }</Text>
      </View>
      {/* 
      //DO NOT remove code, API is not yet ready
      <View style={ Styles.allReadContainer }>
        <Text style={ Styles.allRead }>Mark all read</Text>
      </View> */}
    </View>
  );
};
