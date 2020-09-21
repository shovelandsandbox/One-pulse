import React, { PureComponent } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../utils/colors";
import CardView from "react-native-cardview";
import TextArea from "../components/text-area";
import UploadDocument from "../components/upload-document";
import UploadImages from "../components/upload-image";
import { path, pathOr, isEmpty } from "ramda";
import { goto } from "../../../actions";
import affinityGroupScreens from "../../../utils/configs/screen-names";
import { affinityGroupActions } from "../configs/affinity-group-actions";
import PopUpModal from "../components/pop-up-modal";
import {
  GALLERY,
  VIDEO,
  LINK,
  USERS,
  PDF,
} from "../../../../assets/images/affinityGroup";
import RNFS from "react-native-fs";
import UploadLink from "../components/upload-link";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
import UploadVideo from "../components/upload-video";
import { metaFinderAG } from "../utils/meta-utils";

class CreatePostScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "",
      postText: "",
      document: "",
      url: "",
      currentPostType: "",
      error: "",
    };
  }

  componentWillUnmount() {
    this.props.resetPostCreationStatus();
  }

  onChange = content => {
    this.setState({ postText: content });
  };

  uploadDocument = content => {
    this.setState({ document: content });
  };

  goBack = () => {
    this.props.goto("AffinityGroupWallScreen");
  };

  setUrl = url => {
    this.setState({ url });
  };

  createGroupPost = () => {
    const {
      currentGroup: {
        group: { id, name },
      },
    } = this.props;
    const { titleText, postText, document, currentPostType } = this.state;
    if (isEmpty(titleText.trim()) || isEmpty(postText.trim())) {
      this.setState({ error: metaFinderAG("titleMandatory") });
      return;
    }

    this.props.registerEvent(eventNames.createPost, {
      communityId: id,
      communityName: name,
    });

    const payload = {
      type: "POST",
      title: titleText,
      postType: currentPostType,
      groupId: id,
      message: postText,
    };

    switch (currentPostType) {
      case "image": {
        const file = {
          fileType: currentPostType,
          fileName: document.path,
          document: document.data,
        };
        this.props.uploadDocument({ ...payload, ...file });
        break;
      }
      case "pdf": {
        RNFS.readFile(document.uri, "base64").then(res => {
          const file = {
            fileType: currentPostType,
            fileName: document.name,
            document: res,
          };
          this.props.uploadDocument({ ...payload, ...file });
        });
        break;
      }
      case "link":
        this.props.createGroupPost({
          ...payload,
          document: { url: this.state.url },
        });
        break;
      case "video": {
        RNFS.readFile(document.path, "base64").then(res => {
          const file = {
            fileType: currentPostType,
            fileName: document.name,
            document: res,
          };
          this.props.uploadDocument({ ...payload, ...file });
        });
        break;
      }
      default:
        this.props.createGroupPost(payload);
    }
  };

  renderHeader = () => {
    return (
      <CardView cardElevation={5} cardMaxElevation={5}>
        <View style={Styles.headerContainer}>
          <TouchableOpacity onPress={this.goBack} style={Styles.iconContainer}>
            <Icon raised name={"times"} color={Colors.darkGrey} size={20} />
          </TouchableOpacity>
          <Text style={Styles.headerText}>{metaFinderAG("createPost")}</Text>

          <TouchableOpacity
            onPress={this.createGroupPost}
            style={Styles.iconContainer}
          >
            <Text style={Styles.createPostHeader}>{metaFinderAG("post")}</Text>
          </TouchableOpacity>
        </View>
      </CardView>
    );
  };

  renderGroupSelection = () => {
    const {
      allGroups,
      currentGroup: {
        group: { name },
      },
    } = this.props;
    const groupList = [{ name: metaFinderAG("selectGroup"), id: "0" }];
    allGroups.filter(item => {
      if (item.joined) {
        groupList.push(item);
      }
    });

    return (
      <View style={Styles.createPostGroup}>
        <View style={Styles.userIconView}>
          <Image source={USERS} style={Styles.userIcon} />
        </View>
        <Text style={Styles.currentGroupTitle}>{name}</Text>
      </View>
    );
  };

  renderTitle = () => {
    const { titleText } = this.state;
    return (
      <View style={Styles.createPostTitle}>
        <TextInput
          ref={ref => (this.ref = ref)}
          clearTextOnFocus={false}
          onChangeText={titleText => this.setState({ titleText })}
          placeholder={metaFinderAG("enterTitle")}
          value={titleText}
          style={Styles.createPostTitleText}
        />
      </View>
    );
  };

  renderInputBox = () => {
    return (
      <View style={Styles.textInputView}>
        <TextArea
          containerStyle={Styles.textAreaContainer}
          style={Styles.textArea}
          onChangeText={postText => this.onChange(postText)}
          defaultValue={this.state.postText}
          maxLength={600}
          placeholderTextColor={Colors.darkGrey}
          underlineColorAndroid={"transparent"}
        />
      </View>
    );
  };

  renderPost = currentPostType => {
    this.setState({ currentPostType });
  };

  renderPostOptions = () => {
    return (
      <View style={styles.postOptionsContainer}>
        <TouchableOpacity
          style={StyleSheet.flatten(styles.iconContainer)}
          onPress={() => this.renderPost("image")}
        >
          <Image source={GALLERY} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten(styles.iconContainer)}
          onPress={() => this.renderPost("video")}
        >
          <Image source={VIDEO} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten(styles.iconContainer)}
          onPress={() => this.renderPost("link")}
        >
          <Image source={LINK} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten(styles.iconContainer)}
          onPress={() => this.renderPost("pdf")}
        >
          <Image source={PDF} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  renderUploadDocument = () => {
    return (
      <UploadDocument
        onUpload={content => this.uploadDocument(content)}
        onCancel={this.cancelPostAttachment}
        showModal={true}
      />
    );
  };

  renderUploadImage = () => {
    return (
      <UploadImages
        onUpload={content => this.uploadDocument(content)}
        replaceImage={true}
        onCancel={this.cancelPostAttachment}
      />
    );
  };

  renderUploadLink = () => {
    return (
      <UploadLink
        showModal={true}
        onCancel={this.cancelPostAttachment}
        setUrl={this.setUrl}
      />
    );
  };

  renderUploadVideo = () => {
    return (
      <UploadVideo
        showModal={true}
        onCancel={this.cancelPostAttachment}
        onUpload={content => this.uploadDocument(content)}
      />
    );
  };

  cancelPostAttachment = () => {
    this.setState({ currentPostType: "", document: {}, url: "" });
  };

  onPopUpClose = () => {
    const { postCreationStatus } = this.props;
    this.props.resetPostCreationStatus();
    const screenName =
      postCreationStatus === "success"
        ? "AffinityGroupScreen"
        : "CreatePostScreen";

    this.props.goto(screenName);
  };

  renderPopUpModal = () => {
    const { postCreationStatus } = this.props;
    const icon =
      postCreationStatus === "success" ? "check-circle" : "times-circle";

    const modalText = postCreationStatus === "success" ? "Success" : "Failure";
    const buttonTitle =
      postCreationStatus === "success" ? "Go to Home" : "Go Back";
    const iconColor =
      postCreationStatus === "success" ? Colors.greenSuccess : Colors.red;

    const config = {
      showModal: true,
      icon,
      modalText,
      buttonTitle,
      iconColor,
      onPress: this.onPopUpClose,
    };

    return <PopUpModal config={config} />;
  };
  renderError = error => {
    return (
      <View style={{ margin: 25 }}>
        <Text style={Styles.errorText}>{error}</Text>
      </View>
    );
  };

  render() {
    const { currentPostType, document, url, error } = this.state;
    return (
      <View style={Styles.createPostBaseContainer}>
        {this.renderHeader()}
        {this.renderGroupSelection()}
        {this.renderTitle()}
        <ScrollView style={Styles.createPostContainer}>
          {this.renderInputBox()}
          {isEmpty(document) && isEmpty(url) && this.renderPostOptions()}
          {!isEmpty(error) && this.renderError(error)}
          {currentPostType === "image" && this.renderUploadImage()}
          {currentPostType === "pdf" && this.renderUploadDocument()}
          {currentPostType === "link" && this.renderUploadLink()}
          {currentPostType === "video" && this.renderUploadVideo()}
        </ScrollView>
      </View>
    );
  }
}

CreatePostScreen.propTypes = {
  goto: PropTypes.func,
  resetPostCreationStatus: PropTypes.func,
  createGroupPost: PropTypes.func,
  postCreationStatus: PropTypes.string,
  allGroups: PropTypes.array,
  uploadDocument: PropTypes.func,
  currentGroup: PropTypes.object,
  registerEvent: PropTypes.func,
};

const mapStateToProps = state => ({
  currentPostType: path(["affinityGroup", "currentPostType"], state),
  postCreationStatus: path(["affinityGroup", "postCreationStatus"], state),
  allGroups: path(["affinityGroup", "allGroups"], state),
  currentGroup: pathOr({}, ["affinityGroup", "currentGroup"], state),
});

const mapDispatchToProps = {
  goto,
  registerEvent,
  createGroupPost: payload => ({
    context: affinityGroupScreens.createPostScreen,
    type: affinityGroupActions.createGroupPost,
    payload,
  }),
  resetPostCreationStatus: () => ({
    type: affinityGroupActions.resetPostCreationStatus,
  }),
  uploadDocument: payload => ({
    context: affinityGroupScreens.createPostScreen,
    type: affinityGroupActions.uploadDocument,
    payload,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen);

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
  },
  iconContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  postOptionsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 20,
    paddingVertical: 10,
  },
});
