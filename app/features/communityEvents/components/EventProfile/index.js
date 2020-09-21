import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import DotMenu from "../DotMenu";

import { AVATAR } from "../../../../config/images";

const EventProfile = ({ name, time }) => {
  return (
    <View style={styles.imageContainer}>
      <View>
        <Image source={AVATAR} style={styles.avatar} />
      </View>
      <View style={[styles.flex1, { marginHorizontal: 14 }]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      {/* <View style={styles.dotContainer}>
        <DotMenu />
      </View> */}
    </View>
  );
};

EventProfile.propTypes = {
  name: PropTypes.string,
  time: PropTypes.string,
};
export default EventProfile;
