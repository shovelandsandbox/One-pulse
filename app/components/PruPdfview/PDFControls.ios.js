import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";

const headerHeight = 50;

const PDFControls = ({ onBackButtonPress, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.content}>
          {children}
        </ScrollView>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={onBackButtonPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.textStyle}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

PDFControls.propTypes = {
  onBackButtonPress: PropTypes.func,
  children: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignContent: "flex-start",
    backgroundColor: "white",
    borderTopColor: "rgb(200,200,200)",
    borderTopWidth: 1,
    height: headerHeight,
    lineHeight: headerHeight,
    paddingLeft: 15,
  },
  textStyle: {
    color: "rgb(0,122,255)",
  },
  touchable: {
    padding: 5,
  },
});

export default PDFControls;
