import React from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { skinCareAIMetaFinder } from "../utils/meta-utils";
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
import HTML from "react-native-render-html";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import actions from "../configs/actions";
import screenNames from "../configs/screen-names";
import PruShareModal from "../../../components/PruShare/withModal";
import { styles } from "./style";
import { metaHelpers, CoreServices } from "@pru-rt-internal/pulse-common";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
const { NavigationService } = CoreServices;
class SkinCareAIResult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.skinCareAIMeta = metaHelpers.findScreen("skinCareAI");
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

  renderBackArrow = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          this.props.registerEvent(eventNames.resultGoBackSkinCareAI);
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
        <Text style={styles.title}>{skinCareAIMetaFinder("skinCare")}</Text>
        <Text style={styles.subTitle}>
          {skinCareAIMetaFinder("yourResultText")}
        </Text>
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => {
            this.props.registerEvent(eventNames.shareOnClickSkinCareAI);
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
            this.props.registerEvent(eventNames.goToSymptomCheckerkinCareAI);
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
            {skinCareAIMetaFinder("symtomChecker")}
          </Text>
        </TouchableOpacity>
        <View style={styles.dashVertical}></View>
        <TouchableOpacity
          onPress={() => {
            this.props.registerEvent(eventNames.goToTeleconsultationSkinCareAI);
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
            {skinCareAIMetaFinder("teleconsultation")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderContent = key => {
    const { imageData, showColor } = this.props;
    const avatarUrl = {
      uri: `data:image/png;base64,${imageData}`,
    };
    const diagnosisData = metaHelpers.findElementWithScreen(
      this.skinCareAIMeta,
      key + "_details"
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
          style={
            showColor
              ? [
                  styles.thirdCircle,
                  {
                    borderColor: `rgba(${circleColor}, 0.1})`,
                  },
                ]
              : null
          }
        >
          <View
            style={
              showColor
                ? [
                    styles.secondCircle,
                    {
                      borderColor: `rgba(${circleColor}, 0.3})`,
                    },
                  ]
                : null
            }
          >
            <View
              style={
                showColor
                  ? [
                      styles.firstCircle,
                      {
                        borderColor: `rgba(${circleColor}, 1})`,
                      },
                    ]
                  : null
              }
            >
              <Image
                source={avatarUrl}
                style={
                  showColor ? styles.image : [styles.image, { marginTop: -80 }]
                }
                resizeMode={"cover"}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cameraIcon}
          onPress={() => {
            this.props.registerEvent(eventNames.retakePictureSkinCareAI);
            if (this.props.sourceType === "gallery") {
              this.props.initSkinCareAI();
              this.props.shouldResetModal(true);
              NavigationService.goBack();
              NavigationService.goBack();
            } else {
              this.props.initSkinCareAI();
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
          {key === "Healthy" ? (
            <Image source={EYE_TICK} style={styles.tick} resizeMode={"cover"} />
          ) : (
            this.renderButton()
          )}
        </View>
      </View>
    );
  };

  render() {
    const { skinData, thresholdValue } = this.props;
    const key =
      skinData["Nail Fungus/Nail Disease"] > thresholdValue
        ? "Healthy"
        : "Unhealthy";
    const diagnosisData = metaHelpers.findElementWithScreen(
      this.skinCareAIMeta,
      key + "_details"
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
        {this.renderContent(key)}
        <View style={styles.body}>
          <Text style={styles.textIns}>
            {skinCareAIMetaFinder("nextStepLabel")}
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
          title={skinCareAIMetaFinder("yourResult")}
          userAgent={this.props.userAgent}
          config={this.getShareConfig(key)}
        />
      </ScrollView>
    );
  }
}

SkinCareAIResult.propTypes = {
  skinData: PropTypes.object,
  imageData: PropTypes.string,
  userAgent: PropTypes.object,
  startShare: PropTypes.bool,
  startSharing: PropTypes.func,
  resetShare: PropTypes.func,
  referralDescription: PropTypes.string,
  initSkinCareAI: PropTypes.func,
  goToSymptomChecker: PropTypes.func,
  goToTeleConsultation: PropTypes.func,
  sourceType: PropTypes.string,
  shouldResetModal: PropTypes.func,
  thresholdValue: PropTypes.number,
  registerEvent: PropTypes.func,
  showColor: PropTypes.bool,
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
    showColor: pathOr(
      false,
      ["meta", "countryCommonMeta", "skinCareAI", "showColor"],
      state
    ),
  };
};

export default connect(mapStateToProps, {
  registerEvent,
  resetShare: () => ({
    type: actions.resetShare,
    context: screenNames.SKIN_CARE_AI,
  }),
  startSharing: () => ({
    type: actions.shareResults,
    context: screenNames.SKIN_CARE_AI,
  }),
  initSkinCareAI: () => ({
    type: actions.initSkinCareAI,
    context: "SKIN_CARE_AI",
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
    context: screenNames.SKIN_CARE_AI,
    payload: {
      shouldResetModal: shouldReset,
    },
  }),
})(SkinCareAIResult);
