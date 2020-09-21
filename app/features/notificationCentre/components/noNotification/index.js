import React from 'react';
import { View, Image, Text } from 'react-native';

import Styles from './style';
import { NO_NOTIFICATION } from '../../../../config/images';
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";

const NoNotification = () => (
  <View style={Styles.container}>
    <Image source={NO_NOTIFICATION}/>
    <View>
      <Text style={Styles.header}>
        {safeMetaLabelFinder("NotificationCenter", "noNotifications")}
      </Text>
      <Text style={Styles.description}>
        {safeMetaLabelFinder("NotificationCenter", "noNotificationsMessage")}
      </Text>
    </View>
  </View>
);

export default NoNotification;
