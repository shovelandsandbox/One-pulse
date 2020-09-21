import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { BACK, PRU_BSN_TAKAFUL } from "../../../../config/images";

const DengueNavigationHeader = ({ handlePress, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.backImage} onPress={handlePress}>
          <Image style={styles.backImage} source={BACK} />
        </TouchableOpacity>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={PRU_BSN_TAKAFUL}
        />
      </View>
    </View>
  );
};

/* eslint-disable */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  backImage: {
    width: 20,
    height: 15.6
  },
  logo: {
    width: 70,
    height: 40
  },
  text: {
    marginLeft: 15,
    color: "#222529",
    fontSize: 14,
    fontWeight: "900",
    fontFamily: "Avenir"
  }
});

DengueNavigationHeader.propTypes = {
  handlePress: PropTypes.func,
  text: PropTypes.string
};

export default DengueNavigationHeader;
