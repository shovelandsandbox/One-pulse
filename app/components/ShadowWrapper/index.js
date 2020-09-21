import React from 'react';
import { View, StyleSheet } from 'react-native';

export default ShadowWrapper = ({ style, children }) => 
    <View style={{ ...Styles.card, ...style }}>{children}</View>

const Styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 6.7,
  },
});
