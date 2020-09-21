import React from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import {
  skinCareAIMetaFinder,
  skinCareAIMetaFinderWithDefault,
} from "../utils/meta-utils";
import {
  EYE_MONITOR_ICON,
  EYE_MONITORING_BACK_ARROW,
} from "../../../config/images";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr, forEachObjIndexed, sortBy, keys } from "ramda";
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
    this.props.registerEvent(eventNames.resultPageOnLoadSkinCareAI);
  }

  getShareConfig = status => {
    const desc = status + " " + this.props.referralDescription;
    const link = {
      desc: desc,
      title: skinCareAIMetaFinder("skinResult"),
      isDynamicLink: true,
    };
    return link;
  };

  rightImageRenderMethod = () => {
    return (
      <TouchableOpacity
        style={styles.headerRightImageContainer}
        onPress={() => {
          this.props.registerEvent(eventNames.retakePictureSkinCareAI);
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
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            this.props.registerEvent(eventNames.resultGoBackSkinCareAI);
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
          {skinCareAIMetaFinder("skinClinicAssessment")}
        </Text>
        <TouchableOpacity
          style={styles.headerRightImageContainer}
          onPress={() => {
            this.props.registerEvent(eventNames.retakePictureSkinCareAI);
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
            this.props.registerEvent(eventNames.shareOnClickSkinCareAI);
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

  getSkinCareConfigs = () => {
    const { skinCareConfig } = this.props;

    const defaultConfigs = {
      diabetic_foot: {
        threshold: 1,
        priority: 1,
      },
      skin_burn: {
        threshold: 50,
        priority: 2,
      },
      skin: {
        threshold: 60,
        priority: 3,
      },
    };

    const outputConfig = { ...defaultConfigs, ...skinCareConfig };
    forEachObjIndexed((config = {}, category) => {
      if (!config.priority && defaultConfigs[category]) {
        config.priority = defaultConfigs[category].priority || 0;
      }
      if (!config.threshold && defaultConfigs[category]) {
        config.threshold = defaultConfigs[category].threshold || 0;
      }
    }, outputConfig);

    return outputConfig;
  };

  getDiagnosis = () => {
    const { skinData } = this.props;

    const catOutputs = {};
    forEachObjIndexed((predictions, category) => {
      const output = {};
      forEachObjIndexed((value, key) => {
        if (!output.diagnosis || value > output.confidence) {
          output.diagnosis = key;
          output.confidence = value;
        }
      }, predictions);
      catOutputs[category] = output;
    }, skinData);

    const skinCareConfigs = this.getSkinCareConfigs();

    const sortedCats =
      sortBy(v => skinCareConfigs[v].priority, keys(catOutputs)) || [];

    let diagnosis;

    sortedCats.forEach(cat => {
      const val = catOutputs[cat];
      const config = skinCareConfigs[cat];
      if (!diagnosis) {
        if (val && val.confidence > config.threshold) {
          diagnosis = val;
        }
      }
    });
    return diagnosis;
  };

  onLinkPress = (event, href, attribs) => {
    if (attribs["data-source"] === "symptomChecker") {
      this.props.registerEvent(eventNames.goToSymptomCheckerkinCareAI);
      this.props.goToSymptomChecker();
    } else if (attribs["data-source"] === "healthAssessment") {
      this.props.registerEvent(eventNames.goToHealthAssessmentSkinCareAI);
      this.props.goToHealthAssessment();
    } else if (attribs["data-source"] === "teleConsultation") {
      this.props.registerEvent(eventNames.goToTeleconsultationSkinCareAI);
      this.props.goToTeleConsultation();
    }
  };

  render() {
    const { imageData, thresholdValue } = this.props;
    const avatarUrl = {
      uri: `data:image/png;base64,${imageData}`,
    };

    const diagnosis = this.getDiagnosis();
    const key =
      diagnosis && diagnosis.diagnosis ? diagnosis.diagnosis : "Healthy";

    const status = skinCareAIMetaFinderWithDefault(key, "skinClinicAssessment");

    const diagnosisText = skinCareAIMetaFinderWithDefault(
      key + "_instructions",
      "Unhealthy_instructions",
      diagnosis
    );

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Image source={avatarUrl} style={styles.image} resizeMode={"cover"} />
          <View>
            <Text style={styles.eyeStatus}>{status}</Text>
            <HTML
              style={styles.eyeDescription}
              html={diagnosisText}
              onLinkPress={this.onLinkPress}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <HTML
            style={styles.footerText}
            html={skinCareAIMetaFinder("footer")}
          />
        </View>
        <PruShareModal
          visible={this.props.startShare}
          onClose={this.props.resetShare}
          title={skinCareAIMetaFinder("skinClinicAssessment")}
          userAgent={this.props.userAgent}
          config={this.getShareConfig(status)}
        />
      </View>
    );
  }
}

EyeDetectionResult.propTypes = {
  skinData: PropTypes.object,
  imageData: PropTypes.string,
  userAgent: PropTypes.object,
  startShare: PropTypes.bool,
  startSharing: PropTypes.func,
  resetShare: PropTypes.func,
  referralDescription: PropTypes.string,
  initFaceDetection: PropTypes.func,
  registerEvent: PropTypes.func,
  goToSymptomChecker: PropTypes.func,
  goToHealthAssessment: PropTypes.func,
  sourceType: PropTypes.string,
  shouldResetModal: PropTypes.func,
  thresholdValue: PropTypes.number,
  goToTeleConsultation: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    skinData: pathOr({}, ["skinCareAI", "skinData"], state),
    imageData: pathOr(false, ["skinCareAI", "pictureInfo", "base64"], state),
    userAgent: state.auth.userAgent,
    startShare: pathOr(false, ["skinCareAI", "startShare"], state),
    referralDescription: state.referralGroup.referralDescription,
    sourceType: pathOr("camera", ["skinCareAI", "sourceType"], state),
    thresholdValue: pathOr(
      60,
      ["meta", "countryCommonMeta", "skinCareAI", "thresholdValue"],
      state
    ),
    skinCareConfigs: pathOr(
      { skin: 60, skinBurn: 50, diabeticFoot: 1 },
      ["meta", "countryCommonMeta", "skinCareAI"],
      state
    ),
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
