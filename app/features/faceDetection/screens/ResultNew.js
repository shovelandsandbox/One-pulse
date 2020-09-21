import React from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { healthAIMetaFinder } from "../utils/meta-utils";
import {
  EYE_BACKGROUND,
  EYE_CAMERA_ICON,
  EYE_SHARE,
  EYE_MONITORING_BACK_ARROW_WHITE,
  EYE_TICK,
  EYE_BACKGROUND_RESULT,
  TELECONSULTATION,
  SYMPTOM_CHECKER,
} from "../../../config/images";
import LinearGradient from "react-native-linear-gradient";
import HTML from "react-native-render-html";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import actions from "../configs/actions";
import screenNames from "../configs/screen-names";
import PruShareModal from "../../../components/PruShare/withModal";
import { styles } from "./style";
import {
  metaHelpers,
  CoreServices,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
const { NavigationService } = CoreServices;
class EyeDetectionResult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.healthAIMeta = metaHelpers.findScreen("healthAI");
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

  renderBackArrow = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          this.props.registerEvent(eventNames.resultGoBack);
          NavigationService.navigate("MainTab");
        }}
        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
      >
        <Image
          source={EYE_MONITORING_BACK_ARROW_WHITE}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        {this.renderBackArrow()}
        <Text style={styles.title}>{healthAIMetaFinder("eyeMonitoring")}</Text>
        <Text style={styles.subTitle}>
          {healthAIMetaFinder("yourResultText")}
        </Text>
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => {
            this.props.registerEvent(eventNames.shareOnClick);
            this.props.startSharing();
          }}
        >
          <Image source={EYE_SHARE} style={styles.share} resizeMode={"cover"} />
        </TouchableOpacity>
      </View>
    );
  };

  renderInstructions = instructions => {
    return instructions.map((item, index) => (
      <View style={styles.instructionContainer} key={index}>
        <View style={styles.circle}>
          <Text style={styles.number}>{index + 1}</Text>
        </View>
        <View style={styles.dash}></View>
        <View style={styles.instructionTextContainer}>
          <Text style={styles.instructionText}>{item}</Text>
        </View>
      </View>
    ));
  };

  renderButton = () => {
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => {
            this.props.registerEvent(eventNames.goToBabylon);
            this.props.goToSymptomChecker();
          }}
          style={styles.buttonItem}
        >
          <Image
            source={SYMPTOM_CHECKER}
            style={styles.share}
            resizeMode={"cover"}
          />
          <Text style={styles.buttonText}>
            {healthAIMetaFinder("symtomChecker")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.registerEvent(eventNames.goToTeleconsultation);
            this.props.goToTeleConsultation();
          }}
          style={styles.buttonItem}
        >
          <Image
            source={TELECONSULTATION}
            style={styles.share}
            resizeMode={"cover"}
          />
          <Text style={styles.buttonText}>
            {healthAIMetaFinder("teleconsultation")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderContent = () => {
    const { eyeData, imageData } = this.props;
    const avatarUrl = {
      uri: `data:image/png;base64,${imageData}`,
    };

    const diagnosisData = metaHelpers.findElementWithScreen(
      this.healthAIMeta,
      eyeData.diagnosis + "_details"
    );

    const { data = {} } = diagnosisData || {};
    const { title, circleColor } = data;
    return (
      <View style={styles.innerContainer}>
        <Image
          source={EYE_BACKGROUND_RESULT}
          style={styles.imageBg}
          resizeMode={"cover"}
        />
        <View
          style={[
            styles.thirdCircle,
            { borderColor: `rgba(${circleColor}, 0.1)` },
          ]}
        >
          <View
            style={[
              styles.secondCircle,
              { borderColor: `rgba(${circleColor}, 0.3)` },
            ]}
          >
            <View
              style={[
                styles.firstCircle,
                { borderColor: `rgba(${circleColor}, 1)` },
              ]}
            >
              <Image
                source={avatarUrl}
                style={styles.image}
                resizeMode={"cover"}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cameraIcon}
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
          <Image
            source={EYE_CAMERA_ICON}
            style={styles.share}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
        <View style={styles.resultContainer}>
          <HTML style={styles.eyeDescription} html={title} />
          {eyeData.diagnosis !== "Healthy" ? (
            <Image source={EYE_TICK} style={styles.tick} resizeMode={"cover"} />
          ) : (
            this.renderButton()
          )}
        </View>
      </View>
    );
  };

  render() {
    const { eyeData } = this.props;
    const status = healthAIMetaFinder(eyeData.diagnosis);
    const diagnosisData = metaHelpers.findElementWithScreen(
      this.healthAIMeta,
      eyeData.diagnosis + "_details"
    );

    const { data = {} } = diagnosisData || {};
    const { subTitle, instructions = [] } = data;
    return (
      <ScrollView style={styles.container}>
        <Image
          source={EYE_BACKGROUND}
          style={styles.backgroundImage}
          resizeMode={"cover"}
        />
        {this.renderHeader()}
        {this.renderContent()}
        <View style={styles.body}>
          <Text style={styles.textIns}>
            {healthAIMetaFinder("nextStepLabel")}
          </Text>
          {this.renderInstructions(instructions)}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
        <PruShareModal
          visible={this.props.startShare}
          onClose={this.props.resetShare}
          title={healthAIMetaFinder("yourResult")}
          userAgent={this.props.userAgent}
          config={this.getShareConfig(status)}
        />
      </ScrollView>
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
  goToSymptomChecker: PropTypes.func,
  goToTeleConsultation: PropTypes.func,
  sourceType: PropTypes.string,
  shouldResetModal: PropTypes.func,
  registerEvent: PropTypes.func,
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
  registerEvent,
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
})(EyeDetectionResult);
