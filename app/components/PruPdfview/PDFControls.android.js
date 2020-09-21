import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { Theme } from "../../themes";
const { Colors } = Theme;

const headerHeight = 30;

class PDFControls extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={this.props.onBackButtonPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon raised name="angle-left" color={Colors.darkGrey} size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.content}>
            {this.props.children}
          </ScrollView>
        </View>
      </View>
    );
  }
}

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
    backgroundColor: Colors.white,
    borderBottomColor: Colors.grey707070,
    borderBottomWidth: 1,
    height: headerHeight,
    lineHeight: headerHeight,
  },
  touchable: {
    padding: 5,
  },
});

export default PDFControls;
