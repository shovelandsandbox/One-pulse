import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Text,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { OfflineImage } from "react-native-image-offline";
import { BABYLON_LOGO_BLUE } from "../../config/images";
import {
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  CoreConstants,
  colors,
  metaHelpers,
  CoreUtils
} from "@pru-rt-internal/pulse-common";
import { ChatReportStyle as styles } from "./styles";
import PropTypes from "prop-types";
import ChatHeader from "./ChatHeader";
import { gotoBabylonChatScreen, gotoOtpSent } from "../../actions";
import { CustomAlert } from "../../components";

const { Label, Rating } = CoreComponents;
const { pageKeys } = CoreConfig;
const {
  SCREEN_KEY_CHAT_REPORT,
  COMMON_KEY_BABYLON_LOGO,
  SCREEN_KEY_DIGITAL_TWIN
} = CoreConstants;
const { LinkingHelpers } = CoreUtils;
const KEY_POSSIBLE_CAUSE = "possiblecause";
const KEY_OK = "ok";
const KEY_SUGGEST = "whydoisuggestthis";
const KEY_POSSIBLE_CONDITION = "possiblecondition";
const KEY_RATING = "rating";
const KEY_REPORT = "healthcheckreporttabtitle";

import {configureLineHeight} from "../../utils/lineHeightsUtils";

export class ChatReport extends Component {
  constructor(props) {
    super(props);
    this.openDetailPage = this.openDetailPage.bind(this);
    this.showAlert = this.showAlert.bind(this);
    if (props.addCustomBackHandler) {
      props.addCustomBackHandler(this.handleBackNavigation);
    }
  }

  UNSAFE_componentWillMount() {
    this.props.setTriageReport({});
  }

  componentDidMount() {
    const { recordBabylonTriageEvent } = this.props;
    this.props.openTriageReport(this.props.navigation.state.params.id);
    recordBabylonTriageEvent();
  }

  openDetailPage(data) {
    this.props.openChatReportDetails(data);
  }

  showAlert() {
    const possiblecauses = metaHelpers.findElement(
      SCREEN_KEY_CHAT_REPORT,
      KEY_POSSIBLE_CAUSE
    ).label;
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
      CustomAlert.show("", possiblecauses, {
        positiveText: ok,
        onPositivePress: () => {},
      });
  }

  getBabylonFooterLogo() {
    return (
      <OfflineImage
        accessibilityLabel="babylonLogo"
        resizeMode="contain"
        accesible
        key={COMMON_KEY_BABYLON_LOGO}
        style={styles.babylonImage}
        fallbackSource={BABYLON_LOGO_BLUE}
        source={{
          uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image
        }}
      />
    );
  }

  getConsultTitle() {
    return "CONSULT DOCTOR";
  }

  getTriageReport() {
    const { triageReportData } = this.props;
    return (
      <Label
        value={
          triageReportData.triageReport
            ? triageReportData.triageReport.title
            : ""
        }
        style={{...styles.consultationHead, ...configureLineHeight("20")}}
      />
    );
  }
  navigateToDocService() {
    const { triageReportData } = this.props;
    this.props.goToDocService();
    this.props.setSymptoms(triageReportData.triageReport.presentSymptoms);
  }

  componentWillReceiveProps(nextProps) {
    const { openTriageReport, navigation } = this.props;
    if (nextProps.meta !== this.props.meta) {
      openTriageReport(navigation.state.params.id);
    }
  }

  getTriageReportData() {
    return (
      <View>
        {this.props.triageReportData.triageReport && (
          <React.Fragment>
            {this.props.triageReportData.callToActionType === "Phone" ? (
              <TouchableOpacity
                onPress={() =>
                  LinkingHelpers.phonecall(
                    this.props.triageReportData.triageReport.phoneNumber,
                    true
                  )
                }
              >
                <Label
                  value={
                    this.props.triageReportData.triageReport
                      ? this.props.triageReportData.triageReport.title
                      : ""
                  }
                  style={
                    Platform.OS == "ios"
                      ? {...styles.consultationSubhead, ...configureLineHeight("14")}
                      : {...styles.consultationHead, ...configureLineHeight("20")}
                  }
                />
              </TouchableOpacity>
            ) : (
              <Label
                value={
                  this.props.triageReportData.triageReport
                    ? this.props.triageReportData.triageReport.title
                    : ""
                }
                style={
                  Platform.OS == "ios"
                    ? {...styles.consultationSubhead, ...configureLineHeight("14")}
                    : {...styles.consultationHead, ...configureLineHeight("20")}
                }
              />
            )}
          </React.Fragment>
        )}
      </View>
    );
  }

  handleBackNavigation = () => {
    this.props.gotoBabylonChatScreen();
  };

  render() {
    const { triageReportData } = this.props;
    const suggest = metaHelpers.findElement(SCREEN_KEY_CHAT_REPORT, KEY_SUGGEST)
      .label;
    const possiblecond = metaHelpers.findElement(
      SCREEN_KEY_CHAT_REPORT,
      KEY_POSSIBLE_CONDITION
    ).label;
    const rating = metaHelpers.findElement(SCREEN_KEY_CHAT_REPORT, KEY_RATING)
      .label;
    const report = metaHelpers.findElement(SCREEN_KEY_DIGITAL_TWIN, KEY_REPORT)
      .label;

    const dataContainer = triageReportData.triageReport ? (
      triageReportData.triageReport.possibleConditions.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => this.openDetailPage(item)}
        >
          <View style={styles.reportDataContainer}>
            <View style={styles.itemLine}>
              <Label
                value={`${index + 1}. ${item.name}`}
                style={{...styles.questionStyle, ...configureLineHeight("15")}}
              />
              <Rating
                readonly
                startingValue={item.probabilityLevel}
                fractions={1}
                ratingColor="#ed1b2e"
                title={rating}
              />
            </View>
            <Label value={item.probabilityLabel} style={{...styles.ratingLabel, ...configureLineHeight("14")}} />
            <Label value={item.overview} style={{...styles.consultationSubhead, ...configureLineHeight("14")}} />
            {/* <View style={{ justifyContent: "center" }}>
              <Icon
                name="keyboard-arrow-right"
                size={25}
                color={colors.silver}
              />
            </View> */}
          </View>
        </TouchableWithoutFeedback>
      ))
    ) : (
      <View />
    );
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Label value={report} style={{...styles.heading, ...configureLineHeight("22")}} />
          </View>
          <View style={styles.bookAppCard}>
            <View style={styles.bookAppContentCard}>
              <View style={styles.bookAppContentLeftCard}>
                {Platform.OS == "android" && this.getTriageReportData()}

                <Label
                  value={
                    triageReportData.triageReport
                      ? triageReportData.triageReport.disclaimer
                      : ""
                  }
                  style={
                    Platform.OS == "android"
                    ? {...styles.consultationSubhead, ...configureLineHeight("14")}
                    : {...styles.consultationHead, ...configureLineHeight("20")}
                  }
                />
                {Platform.OS == "ios" && this.getTriageReportData()}
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 24 }}>
            <View style={styles.quesContainer}>
              <Label value={suggest} style={{...styles.questionStyle, ...configureLineHeight("15")}} />
              <Label
                value={
                  triageReportData.triageReport
                    ? triageReportData.triageReport.explanation
                    : ""
                }
                style={{...styles.consultationSubhead, ...configureLineHeight("14")}}
              />
            </View>
            <View style={styles.possibleCondLabelContainer}>
              <View style={styles.possibleNum}>
                <Text style={{ color: "#fff", ...configureLineHeight("14") }}>
                  {triageReportData.triageReport
                    ? `${triageReportData.triageReport.possibleConditions.length}`
                    : "0"}
                </Text>
              </View>
              <Label
                value={triageReportData.triageReport ? possiblecond : ""}
                style={[
                  styles.questionStyle,
                  { flex: 1, paddingTop: 2.5, paddingBottom: 2.5, ...configureLineHeight("16") }
                ]}
              />
            </View>
            <View style={styles.reportCondContainer}>{dataContainer}</View>
          </View>
        </ScrollView>
        {/* {this.getBabylonFooterLogo()} */}
      </View>
    );
  }
}

ChatReport.propTypes = {
  meta: PropTypes.object,
  triageReportData: PropTypes.object,
  navigation: PropTypes.object,
  openTriageReport: PropTypes.func,
  setTriageReport: PropTypes.func,
  recordBabylonTriageEvent: PropTypes.func,
  addCustomBackHandler: PropTypes.func
};

const mapStateToProps = state => {
  console.log(state, "======");
  return {
    meta: state.meta,
    triageReportData: state.chat.triageReportData
  };
};
export default connect(mapStateToProps, {
  openTriageReport: id => ({
    context: pageKeys.CHAT_REPORT,
    type: CoreActionTypes.GET_TRIAGE_OUTCOME,
    payload: {
      id
    }
  }),
  setTriageReport: value => ({
    type: CoreActionTypes.TRIAGE_REPORT_RESPONSE_DATA,
    payload: value
  }),
  setPresentSymptoms: symptoms => ({
    type: CoreActionTypes.SET_SYMPTOMS,
    payload: {
      symptoms
    }
  }),
  goToDocService: () => ({
    context: pageKeys.CHAT_REPORT,
    type: CoreActionTypes.GO_TO_DOC_SERVICE
  }),
  openChatReportDetails: data => ({
    context: pageKeys.CHAT_REPORT,
    type: CoreActionTypes.GO_TO_CHAT_REPORT_DETAILS,
    payload: {
      params: { data }
    }
  }),
  recordBabylonTriageEvent: () => ({
    context: pageKeys.CHAT_REPORT,
    type: CoreActionTypes.RECORD_BABYLON_TRIAGE_EVENT
  }),
  gotoBabylonChatScreen,
  gotoOtpSent
})(ChatReport);
