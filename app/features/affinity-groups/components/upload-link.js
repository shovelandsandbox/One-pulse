import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Colors from "../utils/colors";
import { CANCEL } from "../../../../assets/images/affinityGroup";
import { isEmpty } from "ramda";
import PostLinkPreview from "./link-preview";
import Icon from "react-native-vector-icons/FontAwesome";
import { metaFinderAG } from "../utils/meta-utils";

// eslint-disable-next-line no-useless-escape
const regex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

class UploadLink extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: props.showModal,
      text: "",
      enablePostButton: false,
      error: "",
    };
  }

  componentWillUnmount() {
    this.setState({
      showModal: false,
    });
  }

  cancelUploadSelectModal = () => {
    this.setState({
      showModal: false,
    });
    this.props.onCancel();
  };

  replaceUrl = () => {
    this.setState({
      showModal: true,
    });
  };

  removeAttachment = () => {
    this.setState({
      showModal: false,
      text: "",
      error: "",
      enablePostButton: true,
    });
    this.props.onCancel();
  };

  renderPreview = () => {
    const { text } = this.state;
    return (
      <View style={styles.previewLinkContainer}>
        <PostLinkPreview text={this.formatUrl(text)} titleNumberOfLines={1} />
        <Text style={styles.urlTextStyle}>{text}</Text>
        <View style={styles.optionsStyle}>
          <TouchableOpacity onPress={this.replaceUrl} style={styles.button}>
            <Text style={styles.buttonTitle}>{` ${metaFinderAG(
              "replace"
            )} `}</Text>
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

  validLink = text => {
    const condition = text.match(regex);
    return condition;
  };

  //assuming its a valid url
  formatUrl = (url = "") => {
    url = url.replace(/HTTPS?/gi, function(x) {
      return x.toLowerCase();
    });
    //protocol is mandatory for link to show
    if (!url.startsWith("http")) {
      //by default assume that its http
      url = `http://${url}`;
    }
    return url;
  };

  uploadLink = () => {
    const text = this.state.text || "";
    if (!this.validLink(text)) {
      this.setState({ error: "Invalid URL" });
    } else {
      const url = this.formatUrl(text);
      this.props.setUrl(url);
      this.setState({ error: "", showModal: false, text: url });
    }
  };

  handleChangeText = event => {
    const text = event.nativeEvent.text;
    this.setState({ text });
    if (isEmpty(text)) {
      this.setState({ enablePostButton: false });
    }
    this.setState({ enablePostButton: true });
  };

  renderEnterLink = () => {
    const { showModal, enablePostButton, text, error } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={showModal}
        style={styles.modalContainer}
      >
        <KeyboardAvoidingView behavior={"position"} enabled={true}>
          <View style={styles.postContainer}>
            <View style={styles.uploadButtonContainer}>
              <View style={styles.uploadButtonView}>
                <Text style={styles.textStyle}>
                  {metaFinderAG("enterLink")}
                </Text>
                <View style={styles.errorView}>
                  <View style={styles.inlineCommentView}>
                    <View style={styles.inlineCommentTextBox}>
                      <TextInput
                        multiline
                        numberOfLines={0}
                        value={text}
                        style={styles.textInput}
                        placeholder={"https://"}
                        clearTextOnFocus
                        onChange={this.handleChangeText}
                      />
                    </View>
                    {enablePostButton === true && (
                      <TouchableOpacity
                        onPress={this.uploadLink}
                        style={styles.inlineCommentIconBox}
                      >
                        <Icon
                          raised
                          name="chevron-circle-right"
                          color={Colors.red}
                          size={28}
                        />
                      </TouchableOpacity>
                    )}
                    {enablePostButton === false && (
                      <View style={styles.inlineCommentIconBox}>
                        <Icon
                          raised
                          name="chevron-circle-right"
                          color={Colors.lightGrey}
                          size={28}
                        />
                      </View>
                    )}
                  </View>
                  {!isEmpty(error) && (
                    <Text style={styles.errorText}>{error}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={this.cancelUploadSelectModal}
              >
                <Image source={CANCEL} style={styles.cancelIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  showLinkPreview() {
    const { showModal, error, text } = this.state;
    return !showModal && isEmpty(error) && !isEmpty(text);
  }

  render() {
    const { showModal } = this.state;
    return (
      <View>
        {showModal && this.renderEnterLink()}
        {this.showLinkPreview() && this.renderPreview()}
      </View>
    );
  }
}

UploadLink.propTypes = {
  onCancel: PropTypes.func,
  showModal: PropTypes.bool,
  setUrl: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadLink);

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    height: 25,
    justifyContent: "center",
    marginHorizontal: 5,
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
  errorText: {
    color: Colors.red,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    paddingLeft: 10,
    textAlign: "left",
  },
  errorView: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingVertical: 30,
  },
  inlineCommentIconBox: {
    alignSelf: "center",
    marginRight: 10,
  },
  inlineCommentTextBox: {
    alignSelf: "center",
    borderColor: Colors.veryLightGrey,
    borderRadius: 20,
    borderWidth: 0.5,
    marginHorizontal: 15,
    width: "85%",
  },
  inlineCommentView: {
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalCloseButton: {
    alignItems: "center",
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
  previewLinkContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  textInput: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  textStyle: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 18,
    paddingBottom: 10,
    textAlign: "center",
  },
  uploadButtonContainer: {
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "column",
    height: "30%",
    justifyContent: "center",
    width: "100%",
  },
  uploadButtonView: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  urlTextStyle: {
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    padding: 5,
  },
});
