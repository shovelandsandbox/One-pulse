import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { NEW_BG_REGISTER } from "../../../../config/images";

export default WelcomeWrapper = ({ children }) => (
  <View style={Styles.container}>
    <ImageBackground
      style={Styles.ImageContainer}
      source={NEW_BG_REGISTER}
    >
      <View style={Styles.childrenContainer}>
        {children}
      </View>
    </ImageBackground>
  </View>
);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  childrenContainer: {
    flex: 1, 
    margin: 10, 
    marginHorizontal: 0,
  },
});
