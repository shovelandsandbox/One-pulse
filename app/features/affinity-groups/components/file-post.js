import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import Colors from "../utils/colors";
import { PDF_FILE } from "../../../../assets/images/affinityGroup";

class FilePost extends PureComponent {
  constructor(props) {
    super(props);
  }

  onPress = () => {
    const { document: { url } = {} } = this.props;
    if (!url) {
      return;
    }
    this.props.dispatch({
      type: "GO_TO_SCREEN",
      navigateTo: "PdfView",
      payload: {
        params: {
          source: {
            uri: url,
          },
        },
      },
    });
  };

  render() {
    const { document: { name } = {} } = this.props;
    return (
      <View style={styles.baseContainer}>
        <View style={styles.pdfContainer}>
          <TouchableOpacity
            style={styles.pdfContainerView}
            onPress={this.onPress}
          >
            <Image source={PDF_FILE} style={styles.pdfIcon} />
            <Text style={styles.pdfName}>{name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

FilePost.propTypes = {
  document: PropTypes.object,
  dispatch: PropTypes.func,
};

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: Colors.baseBackground,
    flex: 1,
  },
  pdfContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  pdfContainerView: {
    alignItems: "center",
    backgroundColor: Colors.postSeparator,
    borderRadius: 5,
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },
  pdfIcon: {
    height: 28,
    width: 21,
  },
  pdfName: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
    width: "98%",
  },
});

export default connect()(FilePost);
