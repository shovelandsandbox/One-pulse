import React from "react";
import { StyleSheet, View, Text, BackHandler, Platform } from "react-native";
import Pdf from "react-native-pdf";
import PropTypes from "prop-types";

import PDFControls from "./PDFControls";
import { Theme } from "../../themes";
const { Sizes } = Theme;

class PruPdfview extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onBackButtonPress
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress");
    }
  }

  onBackButtonPress = () => {
    try {
      this.props.navigation.goBack();
    } catch {
      alert("Error");
    }
  };

  renderPdf = source => {
    return (
      <View style={styles.pdfView}>
        <PDFControls onBackButtonPress={this.onBackButtonPress}>
          <Pdf source={source} style={styles.pdf} />
        </PDFControls>
      </View>
    );
  };

  render() {
    const source = this.props.navigation.getParam("source");
    if (!source) {
      return <Text>Error! Corrupted PDF or Source</Text>;
    }
    return (
      <View>
        <View style={styles.container}>
          {this.renderPdf(source)}
        </View>
      </View>
    );
  }
}

PruPdfview.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: Sizes.fullScreenHeight,
    width: Sizes.fullScreen,
  },
  modal: {
    margin: 0,
  },
  pdf: {
    flex: 1,
    width: Sizes.fullScreen,
  },
  pdfView: { flex: 1 },
});

export default PruPdfview;
