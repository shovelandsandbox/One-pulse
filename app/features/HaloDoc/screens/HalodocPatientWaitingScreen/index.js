import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  BackHandler,
  ImageBackground,
  Alert
} from "react-native";
// import BackgroundTimer from "react-native-background-timer";
import { connect } from "react-redux";
import { AVATAR } from "../../../../config/images";
import HaloDocActionBar from "../../components/actionBar";
import styles from "./styles";
import { screenNames } from '../../configs/screenNames'
import { CustomAlert } from '../../../../components'
import {
  updateDoctorAppointment,
  gotoDocInfoScreen,
  goToDoctorListScreen,
} from '../../actions';
import { dispatchEvent } from "../../../../actions";
import { TimerComponent } from '../../components/TimerComponent'
import metaConstants from '../../meta'
import {
  events
} from "@pru-rt-internal/pulse-common";


class HalodocPatientWaitingScreen extends Component {
  constructor(props) {
    super(props);

    this.screenComingFrom = props.navigation.getParam("initiatedBy", null);

    this.state = {
      timer: 180,
      ModalVisibleStatus: false,
      animating: true,
      consultation: "initial",
      text: "",
      value: null,
      showCancelModel: false,
    };
    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }
    this.secondsText = "sec";
  }


  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPress);
    this.props.dispatchEvent(events.TalkToDocWaitingScreen);
    this.intervalId = null;
    if (Platform.OS == "ios") {
      // BackgroundTimer.start();
    }
    // this.intervalId = BackgroundTimer.setInterval(() => {
    //   if (!this.state.showCancelModel) {
    //     this.setState(prevState => ({ timer: prevState.timer - 1 }));
    //   }
    // }, 1000);
    this.cancelTimerOnNavigation();
  }

  cancelTimerOnNavigation = () => {
    this.state.didBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      () => {
        this.setState({ timer: 180 });
        // BackgroundTimer.stopBackgroundTimer();
      }
    );
  };

  backPress = () => {
    this.props.dispatchEvent(events.TalkToDocWaitingScreenBackClick);
    CustomAlert.show(
      this.metaConstants.cancelTile,
      this.metaConstants.cancelDesc,
      {
        onPositivePress: () => {
          this.onOkPress();
          this.props.navigation.goBack();
          this.props.dispatchEvent(events.TalkToDoctorCancelAppointmentCancelClick);
        },
        onNegativePress: () => {

          this.props.dispatchEvent(events.TalkToDoctorCancelAppointmentOkClick);
        },
        negativeText: "Cancel",
        positiveText: "OK",
      }
    );
    return true;

  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPress);
    // BackgroundTimer.stopBackgroundTimer();
    // BackgroundTimer.stop();
    // BackgroundTimer.clearInterval(this.intervalId);
    this.state.didBlurSubscription.remove();
  }


  componentDidUpdate(previousProps, previousState) {
    if (this.state.timer === 0) {
      this.setState({ consultation: "reject", timer: 60 });
      // BackgroundTimer.stopBackgroundTimer();
      Alert.alert("", this.metaConstants.couldNotConfirm)
    }
  }

  ShowModalFunction(visible) {
    this.setState({ consultation: visible, timer: 60 });
    // BackgroundTimer.stopBackgroundTimer();
    this.props.goToDoctorListScreen();
  }

  ShowAppointment = visible => {
    this.setState({ consultation: visible, timer: 60 });
    // BackgroundTimer.stopBackgroundTimer();
    this.gotoConsultationScreen();
  };

  onOkPress = () => {
    this.setState({ consultation: false, timer: 60 });
    // BackgroundTimer.stopBackgroundTimer();
    this.setState({ showCancelModel: false });
    var appointmentData = this.props.appointmentData;
    const consultationId = appointmentData.customer_consultation_id;
    const body = {
      type: "customer_cancelled",
      reason: this.state.value ? this.state.value : "cancelled",
      comments: "comments",
    };
    const docObject = this.props.navigation.getParam("docObject", null);
    this.props.updateDoctorAppointment(body, consultationId);
    this.props.gotoDocInfoScreen(docObject);
  };

  gotoConsultationScreen = () => {
    const docObject = this.props.navigation.getParam("docObject", null);
    this.props.navigation.replace(screenNames.HALODOC_CONSULTATION, {
      docObject,
    });
  };

  getDurationTime = () => {
    return this.state.timer;
  };

  renderTimer = () => {
    const canShowTimer =
      this.screenComingFrom != "healthCard" &&
      this.state.consultation == "initial";
    if (canShowTimer) {
      return (
        <TimerComponent
          timer={this.state.timer}
          secondsText={this.secondsText}
        />
      );
    } else {
      return null;
    }
  };

  renderView = () => {
    const docObject = this.props.navigation.getParam("docObject", null);
    const docName = `${docObject.first_name} ${docObject.last_name}`
    return (
      <View style={styles.viewContainer} >
        <View style={styles.imageContainer}>
          <ImageBackground style={styles.docImage} source={AVATAR}>
            <Image
              style={styles.docImage}
              source={{ uri: docObject.image_url, }}
            />
          </ImageBackground>
        </View>
        <Text style={styles.message}>
          {
            this.metaConstants.waitingForDoc
          }
        </Text>
        <Text style={styles.messageConfirm}>
          {
            this.metaConstants.DocConfirmation
          }
        </Text>
        <Text style={styles.requestMessage}>
          {
            this.metaConstants.requestedDoc, [docName]
          }
        </Text>
        {this.renderTimer()}
      </View >
    )
  }

  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        accessibilityLabel="container"
        accesible
        keyboardShouldPersistTaps="always"
        ref={component => (this._scrollView = component)}
        scrollEnabled={false}
      >
        <HaloDocActionBar onGoBack={() => this.backPress()}></HaloDocActionBar>
        {this.renderView()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.profile,
    appointmentData: state.haloDocServices.appointmentData,
  };
};

export default connect(mapStateToProps, {
  updateDoctorAppointment,
  gotoDocInfoScreen,
  goToDoctorListScreen,
  dispatchEvent

})(HalodocPatientWaitingScreen);
