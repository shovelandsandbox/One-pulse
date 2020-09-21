import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../utils/colors";
import DocumentPicker from "react-native-document-picker";
import { UPLOAD, CANCEL } from "../../../../assets/images/affinityGroup";
import { metaFinderAG } from "../utils/meta-utils";

class UploadDocument extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      singleFileObject: {},
      fileUploaded: false,
      showModal: props.showModal,
    };
  }

  componentWillUnmount() {
    this.setState({
      showModal: false,
    });
  }

  cancelUploadSelectModal = () => {
    const { fileUploaded } = this.state;
    this.setState({
      showModal: false,
    });
    !fileUploaded && this.props.onCancel();
  };

  documentCallbackSuccessHandler = res => {
    res.name && this.setState({ singleFileObject: res, fileUploaded: true });
    this.props.onUpload(res);
  };

  async documentPicker() {
    let res = {};
    try {
      res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      throw err;
    }
    return res;
  }

  pickSingleDocument = () => {
    this.documentPicker()
      .then(res => this.documentCallbackSuccessHandler(res))
      .catch(err => console.log(err));
  };

  removeAttachment = () => {
    this.setState({
      showModal: false,
      fileUploaded: false,
      singleFileObject: {},
    });
    this.props.onCancel();
  };

  renderUploadedFile = () => {
    const { singleFileObject } = this.state;

    return (
      <View style={styles.uploadedFileContainer}>
        <TouchableOpacity>
          <Icon
            raised
            name={"check-circle"}
            color={Colors.greenSuccess}
            size={50}
          />
        </TouchableOpacity>
        <Text style={styles.textStyle}>{singleFileObject.name}</Text>
        <View style={styles.optionsStyle}>
          <TouchableOpacity
            onPress={this.pickSingleDocument}
            style={styles.button}
          >
            <Text style={styles.buttonTitle}>{metaFinderAG("replace")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.removeAttachment}
            style={styles.button}
          >
            <Text style={styles.buttonTitle}>{metaFinderAG("remove")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderUploadButton = () => {
    const { showModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={showModal}
        style={styles.modalContainer}
      >
        <View style={styles.postContainer}>
          <View style={styles.uploadButtonContainer}>
            <TouchableOpacity
              onPress={this.pickSingleDocument}
              style={styles.uploadButton}
            >
              <Image source={UPLOAD} style={styles.uploadIcon} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>
              {metaFinderAG("uploadPDFFile")}
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={this.cancelUploadSelectModal}
            >
              <Image source={CANCEL} style={styles.cancelIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { fileUploaded, showModal } = this.state;
    return (
      <View>
        {showModal && !fileUploaded && this.renderUploadButton()}
        {fileUploaded && this.renderUploadedFile()}
      </View>
    );
  }
}

UploadDocument.propTypes = {
  onCancel: PropTypes.func,
  onUpload: PropTypes.func,
  showModal: PropTypes.bool,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocument);

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    height: 25,
    justifyContent: "center",
    marginHorizontal: 5,
    marginVertical: 10,
    //paddingVertical: 10,
    width: 80,
  },
  buttonTitle: {
    color: Colors.white,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  cancelIcon: {
    height: 20,
    width: 20,
  },
  modalCloseButton: {
    alignItems: "center",
    paddingVertical: 25,
  },
  modalContainer: {
    alignSelf: "flex-end",
    flexDirection: "column",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  optionsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  postContainer: {
    backgroundColor: Colors.transparentBlack,
    height: window.height,
    justifyContent: "flex-end",
    width: window.width,
  },
  textStyle: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
  },
  uploadButton: {
    borderColor: Colors.lightGrey,
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 15,
  },
  uploadButtonContainer: {
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "column",
    height: "33%",
    justifyContent: "flex-end",
    paddingBottom: 20,
    width: "100%",
  },
  uploadIcon: {
    height: 41,
    width: 41,
  },
  uploadedFileContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
});
