import React from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { healthAIMetaFinder } from "../utils/meta-utils";
import {
  EYE_MONITOR_ICON,
  EYE_MONITORING_BACK_ARROW,
} from "../../../config/images";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import actions from "../configs/actions";
import HTML from "react-native-render-html";
import screenNames from "../configs/screen-names";
import PruShareModal from "../../../components/PruShare/withModal";
import { styles } from "./style";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";

const { NavigationService } = CoreServices;
class EyeDetectionResult extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.registerEvent(eventNames.resultPageOnLoad);
  }

  getShareConfig = status => {
    const desc = status + " " + this.props.referralDescription;
    const link = {
      desc: desc,
      title: healthAIMetaFinder("eyeResult"),
      isDynamicLink: true,
    };
    return link;
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            this.props.registerEvent(eventNames.resultGoBack);
            NavigationService.navigate("MainTab");
          }}
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
        >
          <Image
            source={EYE_MONITORING_BACK_ARROW}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {healthAIMetaFinder("yourResult")}
        </Text>
        <TouchableOpacity
          style={styles.headerRightImageContainer}
          onPress={() => {
            this.props.registerEvent(eventNames.retakePicture);
            if (this.props.sourceType === "gallery") {
              this.props.initFaceDetection();
              this.props.shouldResetModal(true);
              NavigationService.goBack();
              NavigationService.goBack();
            } else {
              this.props.initFaceDetection();
              this.props.shouldResetModal(true);
              NavigationService.goBack();
            }
          }}
        >
          <Image source={EYE_MONITOR_ICON} style={styles.headerRightImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => {
            this.props.registerEvent(eventNames.shareOnClick);
            this.props.startSharing();
          }}
        >
          <Icon
            name={"share-square-o"}
            type={"font-awesome"}
            color={"red"}
            size={20}
          />
        </TouchableOpacity>
      </View>
    );
  };

  rightImageRenderMethod = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.headerRightImageContainer}
          onPress={() => {
            this.props.registerEvent(eventNames.retakePicture);
            if (this.props.sourceType === "gallery") {
              this.props.initFaceDetection();
              this.props.shouldResetModal(true);
              NavigationService.goBack();
              NavigationService.goBack();
            } else {
              this.props.initFaceDetection();
              this.props.shouldResetModal(true);
              NavigationService.goBack();
            }
          }}
        >
          <Image source={EYE_MONITOR_ICON} style={styles.headerRightImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => {
            this.props.registerEvent(eventNames.shareOnClick);
            this.props.startSharing();
          }}
        >
          <Icon
            name={"share-square-o"}
            type={"font-awesome"}
            color={"red"}
            size={20}
          />
        </TouchableOpacity>
      </View>
    );
  };

  onLinkPress = (event, href, attribs) => {
    if (attribs["data-source"] === "symptomChecker") {
      this.props.registerEvent(eventNames.goToSymptomChecker);
      this.props.goToSymptomChecker();
    } else if (attribs["data-source"] === "healthAssessment") {
      this.props.registerEvent(eventNames.goToHealthAssessment);
      this.props.goToHealthAssessment();
    } else if (attribs["data-source"] === "teleConsultation") {
      this.props.registerEvent(eventNames.goToTeleconsultation);
      this.props.goToTeleConsultation();
    }
  };

  render() {
    const { eyeData, imageData } = this.props;
    const avatarUrl = {
      uri: `data:image/png;base64,${imageData}`,
    };

    const status = healthAIMetaFinder(eyeData.diagnosis);

    return (
      <View style={styles.container}>
        {this.renderHeader()}

        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Image source={avatarUrl} style={styles.image} resizeMode={"cover"} />
          <View>
            <Text style={styles.eyeStatus}>{status}</Text>
            <HTML
              style={styles.eyeDescription}
              html={healthAIMetaFinder(eyeData.diagnosis + "_eyeinstructions")}
              onLinkPress={this.onLinkPress}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <HTML style={styles.footerText} html={healthAIMetaFinder("footer")} />
        </View>
        <PruShareModal
          visible={this.props.startShare}
          onClose={this.props.resetShare}
          title={healthAIMetaFinder("yourResult")}
          userAgent={this.props.userAgent}
          config={this.getShareConfig(status)}
        />
      </View>
    );
  }
}

EyeDetectionResult.propTypes = {
  eyeData: PropTypes.object,
  imageData: PropTypes.string,
  userAgent: PropTypes.object,
  startShare: PropTypes.bool,
  startSharing: PropTypes.func,
  resetShare: PropTypes.func,
  referralDescription: PropTypes.string,
  initFaceDetection: PropTypes.func,
  registerEvent: PropTypes.func,
  goToSymptomChecker: PropTypes.func,
  goToTeleConsultation: PropTypes.func,
  sourceType: PropTypes.string,
  shouldResetModal: PropTypes.func,
  goToHealthAssessment: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    eyeData: pathOr({}, ["faceDetection", "eyeData"], state),
    imageData: pathOr(false, ["faceDetection", "pictureInfo", "base64"], state),
    userAgent: state.auth.userAgent,
    startShare: pathOr(false, ["faceDetection", "startShare"], state),
    referralDescription: state.referralGroup.referralDescription,
    sourceType: pathOr("camera", ["faceDetection", "sourceType"], state),
  };
};

export default connect(mapStateToProps, {
  resetShare: () => ({
    type: actions.resetShare,
    context: screenNames.FACE_DETECTION,
  }),
  startSharing: () => ({
    type: actions.shareResults,
    context: screenNames.FACE_DETECTION,
  }),
  initFaceDetection: () => ({
    type: actions.initFaceDetection,
    context: "FACE_DETECTION",
  }),
  goToSymptomChecker: () => ({
    context: "PulseHealth",
    type: "BABYLON_GOTO_SYMPTOMPCHECKER",
    payload: {
      params: {
        fromHealthAIScreen: true,
      },
    },
  }),
  goToHealthAssessment: () => ({
    context: "PulseHealth",
    type: "BABYLON_GOTO_HEALTHASSESSMENT",
    payload: {
      params: {
        fromHealthAIScreen: true,
      },
    },
  }),
  goToTeleConsultation: () => ({
    navigateTo: "MyDocCampaignForm",
    type: "GO_TO_SCREEN",
  }),
  shouldResetModal: shouldReset => ({
    type: actions.shouldResetModal,
    context: screenNames.FACE_DETECTION,
    payload: {
      shouldResetModal: shouldReset,
    },
  }),
  registerEvent,
})(EyeDetectionResult);
