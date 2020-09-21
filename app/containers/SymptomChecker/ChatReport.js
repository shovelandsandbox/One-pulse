import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Text,
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
  CoreUtils,
} from "@pru-rt-internal/pulse-common";
import { gotoBabylonChatScreen } from "../../actions";
import { ChatReportStyle as styles } from "./styles";
import PropTypes from "prop-types";
import { CustomAlert } from "../../components";
// import ChatHeader from ".";

const { Label, Rating } = CoreComponents;
const { pageKeys } = CoreConfig;
const {
  SCREEN_KEY_CHAT_REPORT,
  COMMON_KEY_BABYLON_LOGO,
  SCREEN_KEY_DIGITAL_TWIN,
} = CoreConstants;
const { LinkingHelpers } = CoreUtils;
const KEY_POSSIBLE_CAUSE = "possiblecause";
const KEY_OK = "ok";
const KEY_SUGGEST = "whydoisuggestthis";
const KEY_POSSIBLE_CONDITION = "possiblecondition";
const KEY_RATING = "rating";
const KEY_REPORT = "healthcheckreporttabtitle";

export class ChatReport extends Component {
  constructor(props) {
    super(props);
    this.openDetailPage = this.openDetailPage.bind(this);
    this.showAlert = this.showAlert.bind(this);
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
          uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image,
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
        style={styles.consultationHead}
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
                  style={styles.consultationHead}
                />
              </TouchableOpacity>
            ) : (
              <Label
                value={
                  this.props.triageReportData.triageReport
                    ? this.props.triageReportData.triageReport.title
                    : ""
                }
                style={styles.consultationHead}
              />
            )}
          </React.Fragment>
        )}
      </View>
    );
  }

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
                style={styles.questionStyle}
              />
              <Rating
                readonly
                startingValue={item.probabilityLevel}
                fractions={1}
                ratingColor="#ed1b2e"
                title={rating}
              />
            </View>
            <Label value={item.probabilityLabel} style={styles.ratingLabel} />
            <Label value={item.overview} style={styles.consultationSubhead} />
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
        <ChatHeader goback={() => this.props.gotoBabylonChatScreen()} />
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Label value={report} style={styles.heading} />
          </View>
          <View style={styles.bookAppCard}>
            <View style={styles.bookAppContentCard}>
              <View style={styles.bookAppContentLeftCard}>
                {this.getTriageReportData()}
                <Label
                  value={
                    triageReportData.triageReport
                      ? triageReportData.triageReport.disclaimer
                      : ""
                  }
                  style={styles.consultationSubhead}
                />
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 24 }}>
            <View style={styles.quesContainer}>
              <Label value={suggest} style={styles.questionStyle} />
              <Label
                value={
                  triageReportData.triageReport
                    ? triageReportData.triageReport.explanation
                    : ""
                }
                style={styles.consultationSubhead}
              />
            </View>
            <View style={styles.possibleCondLabelContainer}>
              <View style={styles.possibleNum}>
                <Text style={{ color: "#fff" }}>
                  {triageReportData.triageReport
                    ? `${triageReportData.triageReport.possibleConditions.length}`
                    : "0"}
                </Text>
              </View>
              <Label
                value={triageReportData.triageReport ? possiblecond : ""}
                style={[
                  styles.questionStyle,
                  { flex: 1, paddingTop: 2.5, paddingBottom: 2.5 },
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
};

const mapStateToProps = state => ({
  meta: state.meta,
  triageReportData: state.chat.triageReportData,
});
export default connect(mapStateToProps, {
  openTriageReport: id => ({
    context: pageKeys.CHAT_REPORT,
    type: CoreActionTypes.GET_TRIAGE_OUTCOME,
    payload: {
      id,
    },
  }),
  setTriageReport: value => ({
    type: CoreActionTypes.TRIAGE_REPORT_RESPONSE_DATA,
    payload: value,
  }),
  setPresentSymptoms: symptoms => ({
    type: CoreActionTypes.SET_SYMPTOMS,
    payload: {
      symptoms,
    },
  }),
  goToDocService: () => ({
    context: pageKeys.CHAT_REPORT,
    type: CoreActionTypes.GO_TO_DOC_SERVICE,
  }),
  openChatReportDetails: data => ({
    context: pageKeys.CHAT_REPORT,
    type: CoreActionTypes.GO_TO_CHAT_REPORT_DETAILS,
    payload: {
      params: { data },
    },
  }),
  recordBabylonTriageEvent: () => ({
    context: pageKeys.CHAT_REPORT,
    type: CoreActionTypes.RECORD_BABYLON_TRIAGE_EVENT,
  }),
  gotoBabylonChatScreen,
})(ChatReport);
