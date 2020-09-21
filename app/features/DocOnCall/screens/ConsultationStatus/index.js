import React, { PureComponent } from "react";
import { View, BackHandler, Text } from "react-native";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import {
  metaHelpers,
  CoreComponents,
  CoreActions,
  CoreConstants,
  CoreActionTypes,
  CoreConfig,
  colors
} from "@pru-rt-internal/pulse-common";
const { toggleLoader } = CoreActions;
const { Label, AppButton, MinuteTimer } = CoreComponents;
import { Header } from "../../../../components/ChatComponent/Header";
import styles from "./styles";
import { CONSULTATION_STATUS, CLOSE_WHITE } from "../../../../config/images";
import ScreenNames from "../../configs/ScreenNames";
import actionNames from "../../configs/actionNames";
const {
  ConsultationStatus,
  CONSULTATION_TIME_OUT_VALUE,
  CONSULTATION_START_WAIT_TIME,
  SCREEN_KEY_CONSULTATION_STATUS
} = CoreConstants;
const { pageKeys } = CoreConfig;
const NOTES_HEAD = "noteshead";
const NOTES_ONE = "noteone";
const NOTE_TWO = "notetwo";
// const KEY_REQUESTED = "requested";
const KEY_FAILED = "failed";
const TIMED_OUT = "timedout";
const KEY_ACCEPTED = "accepted";
const DOC_STATUS_REQUESTED = "docstatusrequested";
const DOC_STATUS_TIMED_OUT = "docfailedrequestcallback";
const DOC_STATUS_FAILED = "docfailedrequestcallback";
const STATUS_HEADER = "docconsultationheader";
const DOC_DESCRIPTION = "docconsultdescription";
const KEY_GO_BACK = "gobackbtn";
const KEY_TRY_AGAIN = "tryagainbtn";
const KEY_START_CONSULTATION = "startconsultationbtn";
const KEY_REQUEST_SENT = "requestSent";
const DOC_STATUS_BUSY_NOT_AVAILABLE = "docbusyandnotavailable";

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

class DoctorConsultationStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // notesHead: "Request Sent!",
      // noteOne:
      //   "1. Make sure you are in an area where your device has good Internet connection.",
      // noteTwo:
      //   "2. Once the request for consultation is sent, it cannot be recalled or cancelled.",
    };
    this.docRequestFailed = "";
    this.docRequestTimeOut = "";
    this.docRequest = "";
    this.timeOut = "";
    this.accepted = "";
    this.failed = "";
    this.notesHead = "";
    this.reqSent = "";
    this.startConsultation = this.startConsultation.bind(this);

    this.prefill = (100 * this.timeElapsed()) / CONSULTATION_TIME_OUT_VALUE;

    this.consultationWaitTimer = null;
    this.callReceivetimer = null;
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);

    this.circularProgress &&
      this.circularProgress.animate(100, CONSULTATION_TIME_OUT_VALUE);

    const timeLeft = CONSULTATION_TIME_OUT_VALUE - this.timeElapsed();
    this.consultationWaitTimer = setTimeout(() => {
      this.props.dispatch({
        context: ScreenNames.DOC_CONSULTATION_STATUS,
        type: actionNames.DOC_SERVICE_REQUEST_TIMED_OUT,
        payload: {
          consultationId: this.props.consultationId
        },
      });
    }, timeLeft);

    if (this.props.status === ConsultationStatus.AVAILABLE) {
      this.setWaitingTimeout();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
    this.clearTimer();
    //error handling
    this.props.dispatch(toggleLoader(false));
    //if doctor has accepted then reset on going back
    if (this.props.status === ConsultationStatus.AVAILABLE) {
      this.props.dispatch({
        context: ScreenNames.DOC_CONSULTATION_STATUS,
        type: actionNames.DOC_SERVICE_INITIALIZE_DATA
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (
      prevProps.status !== status &&
      status === ConsultationStatus.AVAILABLE
    ) {
      this.setWaitingTimeout();
    }
  }

  setWaitingTimeout = () => {
    this.callReceivetimer = setTimeout(() => {
      this.props.dispatch({
        context: ScreenNames.DOC_CONSULTATION_STATUS,
        type: actionNames.DOC_SERVICE_CALL_REQUEST_TIMED_OUT
      });
    }, CONSULTATION_START_WAIT_TIME);
  }

  getStatusText = status => {
    switch (status) {
      case ConsultationStatus.REQUESTED:
        return this.notesHead;
      case ConsultationStatus.FAILED:
        return this.failed;
      case ConsultationStatus.TIMED_OUT:
        return this.timeOut;
      case ConsultationStatus.ACCEPTED:
      case ConsultationStatus.AVAILABLE:
        return this.accepted;
      default:
        return " ";
    }
  };

  getStatusMessage = status => {
    switch (status) {
      case ConsultationStatus.REQUESTED:
        return this.docRequest;
      case ConsultationStatus.TIMED_OUT:
        return this.docRequestTimeOut;
      case ConsultationStatus.FAILED:
        return this.docRequestFailed;
      default:
        return " ";
    }
  };

  startConsultation() {
    this.props.dispatch({
      context: ScreenNames.DOC_CONSULTATION_STATUS,
      type: actionNames.DOC_SERVICE_START_CALL
    });
    this.clearTimer();
  }

  clearTimer = () => {
    this.callReceivetimer && clearTimeout(this.callReceivetimer);
    this.consultationWaitTimer && clearTimeout(this.consultationWaitTimer);
  };

  goBack = () => {
    // if (this.props.status !== ConsultationStatus.AVAILABLE) {
    //   this.props.dispatch({
    //     context: pageKeys.DOC_SERVICE_CONSULTATION,
    //     type: CoreActionTypes.GO_BACK_TO_PREVIOUS_STACK,
    //   });
    // }
    this.props.navigation.navigate("PulseHealth");
    return true;
  };

  timeElapsed = () => {
    return new Date() - new Date(this.props.lastRequestTimestamp);
  };

  // eslint-disable-next-line complexity
  render() {
    const { status } = this.props;
    const docConsultStatusScreen = metaHelpers.findScreen(
      SCREEN_KEY_CONSULTATION_STATUS
    );

    this.notesHead = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, NOTES_HEAD),
      ""
    );

    this.reqSent = fetchLabel(
      metaHelpers.findElementWithScreen(
        docConsultStatusScreen,
        KEY_REQUEST_SENT
      ),
      ""
    );

    const noteOne = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, NOTES_ONE),
      ""
    );

    const noteTwo = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, NOTE_TWO),
      ""
    );

    this.failed = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, KEY_FAILED),
      ""
    );

    this.accepted = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, KEY_ACCEPTED),
      ""
    );

    this.timeOut = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, TIMED_OUT),
      ""
    );

    this.docRequest = fetchLabel(
      metaHelpers.findElementWithScreen(
        docConsultStatusScreen,
        DOC_STATUS_REQUESTED
      ),
      ""
    );

    this.docRequestTimeOut = fetchLabel(
      metaHelpers.findElementWithScreen(
        docConsultStatusScreen,
        DOC_STATUS_TIMED_OUT
      ),
      ""
    );

    this.docRequestFailed = fetchLabel(
      metaHelpers.findElementWithScreen(
        docConsultStatusScreen,
        DOC_STATUS_FAILED
      ),
      ""
    );

    const statusHeader = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, STATUS_HEADER),
      ""
    );

    const description = fetchLabel(
      metaHelpers.findElementWithScreen(
        docConsultStatusScreen,
        DOC_DESCRIPTION
      ),
      ""
    );

    const goBackBtn = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, KEY_GO_BACK),
      ""
    );

    const tryAgainBtn = fetchLabel(
      metaHelpers.findElementWithScreen(docConsultStatusScreen, KEY_TRY_AGAIN),
      ""
    );

    const startConsultationBtn = fetchLabel(
      metaHelpers.findElementWithScreen(
        docConsultStatusScreen,
        KEY_START_CONSULTATION
      ),
      ""
    );

    const docBusyAndNotAvailable = fetchLabel(
      metaHelpers.findElementWithScreen(
        docConsultStatusScreen,
        DOC_STATUS_BUSY_NOT_AVAILABLE
      ),
      ""
    );

    const timeLeft = CONSULTATION_TIME_OUT_VALUE - this.timeElapsed();
    return (
      <View style={styles.container}>
        <Header
          leftIconType="back"
          onLeftPress={this.goBack}
          showRightIcon={false}
          showRightDocOnCallLogo={true}
        />
        <View style={styles.headerSection}>
          <Label value={statusHeader} style={styles.heading} />
        </View>
        <View style={styles.consultationBtnContainer}>
          <View style={styles.titleContainer}>
            <Label value={this.getStatusText(status)} style={styles.title} />
            {status === ConsultationStatus.FAILED && (
              <Label
                value={docBusyAndNotAvailable}
                style={[styles.consultationSubhead2]}
              />
            )}
            {status !== ConsultationStatus.FAILED && (
              <Label
                value={this.getStatusMessage(status)}
                style={[styles.consultationSubhead, styles.textCenter]}
              />
            )}
            {status === ConsultationStatus.REQUESTED && (
              <View style={styles.iconContainer}>
                <AnimatedCircularProgress
                  ref={ref => (this.circularProgress = ref)}
                  size={130}
                  width={5}
                  fill={this.state.fill}
                  rotation={180}
                  backgroundColor={colors.crimson}
                  tintColor={colors.white}
                  prefill={this.prefill}
                >
                  {fill => (
                    <MinuteTimer
                      timerDurationSecs={1}
                      totalDurationInMillis={timeLeft}
                      timerColor={colors.crimson}
                    />
                  )}
                </AnimatedCircularProgress>
              </View>
            )}
            {status === ConsultationStatus.FAILED && (
              <View style={[styles.iconContainer, styles.requestFailed]}>
                <OfflineImage
                  key={"consultation_status"}
                  resizeMode="contain"
                  style={styles.icons}
                  fallbackSource={CLOSE_WHITE}
                  source={CLOSE_WHITE}
                />
              </View>
            )}
            {status === ConsultationStatus.TIMED_OUT && (
              <View style={[styles.iconContainer, styles.requestFailed]}>
                <OfflineImage
                  key={"consultation_status"}
                  resizeMode="contain"
                  style={styles.icons}
                  fallbackSource={CLOSE_WHITE}
                  source={CLOSE_WHITE}
                />
              </View>
            )}
            {(status === ConsultationStatus.ACCEPTED ||
              status === ConsultationStatus.AVAILABLE) && (
                <View style={styles.iconContainer}>
                  <OfflineImage
                    key={"consultation_status"}
                    resizeMode="contain"
                    style={styles.icons}
                    fallbackSource={CONSULTATION_STATUS}
                    source={CONSULTATION_STATUS}
                  />
                </View>
              )}
          </View>
        </View>
        {status === ConsultationStatus.AVAILABLE && (
          <View style={styles.iconContainer}>
            <Text style={styles.title}> {description} </Text>
            <AnimatedCircularProgress
              ref={ref => ref && ref.animate(100, CONSULTATION_START_WAIT_TIME)}
              size={60}
              width={5}
              fill={this.state.fill}
              rotation={180}
              backgroundColor={colors.crimson}
              tintColor={colors.white}
            >
              {fill => (
                <MinuteTimer
                  timerDurationSecs={1}
                  totalDurationInMillis={CONSULTATION_START_WAIT_TIME}
                  timerColor={colors.crimson}
                />
              )}
            </AnimatedCircularProgress>
          </View>
        )}
        <View>
          {status == ConsultationStatus.FAILED && (
            <Label
              value={this.getStatusMessage(status)}
              style={[styles.consultationSubhead, styles.textCenter]}
            />
          )}
          <Label
            value={this.reqSent}
            style={[styles.consultationSubhead, styles.labelBold]}
          />
          <Label value={noteOne} style={[styles.consultationSubhead]} />
          <Label value={noteTwo} style={[styles.consultationSubhead]} />
          {status === ConsultationStatus.FAILED && (
            <AppButton
              type={[styles.btn, styles.default]}
              title={goBackBtn}
              press={this.goBack}
              textStyle={styles.btnTextStyle}
            />
          )}
          {status !== ConsultationStatus.FAILED &&
            status !== ConsultationStatus.TIMED_OUT && (
              <AppButton
                type={[styles.btn, styles.primary]}
                title={startConsultationBtn}
                press={this.startConsultation}
                disable={status !== ConsultationStatus.AVAILABLE}
              />
            )}
          {status === ConsultationStatus.TIMED_OUT && (
            <AppButton
              type={[styles.btn, styles.default]}
              title={tryAgainBtn}
              press={this.goBack}
              textStyle={styles.btnTextStyle}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  status: state.doctorOnCallService.consultationStatus,
  lastRequestTimestamp: state.doctorOnCallService.lastRequestTimestamp,
  consultationId: state.doctorOnCallService.consultationId
});
export default connect(mapStateToProps)(DoctorConsultationStatus);
