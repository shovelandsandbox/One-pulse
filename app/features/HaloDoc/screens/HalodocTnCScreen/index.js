/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler
} from "react-native";
import {
  CLOSE_ICON,
  DOCTORHEAD,
  HALODOC_INLINE_LOGO
} from "../../../../config/images";
import { connect } from "react-redux";
import {
  CoreUtils,
  events
} from "@pru-rt-internal/pulse-common";
import CheckBox from "react-native-check-box";
import { dispatchEvent } from "../../../../actions";
import { gotoPatientRegistrationScreen, handleDocTnCAcceptance, gotoHealthScreen, loadTermsAndCondition, loadPrivacypolicy } from "../../actions"
const { logFirebaseEvent } = CoreUtils;
import PropTypes from "prop-types";
import styles from './styles'
import _ from "lodash";
import metaConstants from '../../meta';
import { Theme } from "../../../../themes";
const { Colors } = Theme;



class HalodocTnCScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }
  }
  _agreeTermsOfDengueAlert() {
    if (!this.state.isChecked) {
      return false
    }

    const tncData = {
      termsConditions: {
        DOC: {
          consent: this.metaConstants.consent,
          consentDate: CoreUtils.getTimeStamp(),
          version: this.metaConstants.version,
          org: this.metaConstants.org,
          privacy: this.metaConstants.consent,
          privacyDate: CoreUtils.getTimeStamp(),
          privacyVersion: this.metaConstants.version
        }
      }
    };
    this.props.handleDocTnCAcceptance(tncData);
  }

  goBack = () => {
    this.props.gotoHealthScreen();
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.registrationStatus === 1) {
      this.props.gotoPatientRegistrationScreen();
    }
  }
  headerView() {
    return (
      <View style={styles.firstView}>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            this.goBack();
          }}
        >
          <Image
            style={styles.closeImg}
            source={CLOSE_ICON}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    )
  }


  headerImage() {
    return (
      <View
        style={styles.headerView}
      >
        <Image
          style={styles.headerImg}
          source={DOCTORHEAD}
        />
      </View>
    )
  }

  tileImage() {
    let appearsoncall = _.split(this.metaConstants.appearsoncall, " ");
    return (
      <View style={styles.tileView} >
        <Text style={styles.confirmTiletext} >
          {this.metaConstants.ConfirmProfile}
        </Text>
        <Text style={styles.descriptionText}>
          {
            this.metaConstants.ConfirmProfileMessage
          }
        </Text>
        <View style={styles.iconView}>
          <Text style={styles.AIME_STYLE}>
            {
              this.metaConstants.Whenever
            }
          </Text>
          <View style={styles.wheneverView}>
            <Image
              style={styles.logoImg}
              source={HALODOC_INLINE_LOGO}
            />
          </View>

          {
            _.map(appearsoncall, (
              str => {
                return <Text style={styles.AIME_STYLE}>{" " + str}</Text>;
              }
            ))
          }
        </View>
      </View>

    )
  }
  loadPdfView = value => {
    this.props.loadPrivacypolicy(value);
  }
  termDexcription() {

    const termsHaloDoc = this.metaConstants.termsHaloDoc
    const privacyHaloDoc = this.metaConstants.privacyHaloDoc
    const title = this.metaConstants.title
    const title_privacy = this.metaConstants.title_privacy
    const TERMS_AND_CONDITIONS_HOLODOC_HEADING = this.metaConstants.TermsConditions
    const PRIVACYNOTICE_HALODOC = this.metaConstants.PrivacyNotice


    return (
      <View
        style={styles.termView}
      >
        <CheckBox
          style={styles.checkBox}
          onClick={() => {
            logFirebaseEvent("halodoc_enabled", {});
            this.props.dispatchEvent(events.HalodocEnabledProccedClick)
            this.setState({
              isChecked: !this.state.isChecked,
            });
          }}
          isChecked={this.state.isChecked}
          rightTextStyle={styles.rightText}
          checkBoxColor={styles.checkColor}
        />
        <Text
          style={styles.byClickText}
        >
          {
            this.metaConstants.ByClickingBelowHalodoc
          }
          <Text
            style={styles.tncStyle}
            onPress={() => this.props.loadTermsAndCondition("Mydoc")}>
            {` ${
              this.metaConstants.TermsConditions
              } `}
          </Text>
          {
            this.metaConstants.And
          }
          <Text
            style={styles.privacyText}
            onPress={() => this.loadPdfView("Mydoc")}>
            {` ${
              this.metaConstants.PrivacyNotice
              } `}

          </Text>
        </Text>
      </View>

    )
  }


  iAgreeBtn() {
    return (
      <TouchableOpacity
        style={{ ...styles.iAgreeBtn, backgroundColor: this.state.isChecked ? Colors.pulseRed : Colors.veryLightGrey }}
        onPress={() => {
          this._agreeTermsOfDengueAlert();
        }}
      >
        <Text style={styles.iAgreeText} >
          {
            this.metaConstants.IAgree
          }
        </Text>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>

          {this.headerView()}
          {this.headerImage()}
          {this.tileImage()}
          {this.termDexcription()}
          {this.iAgreeBtn()}

        </View>
      </ScrollView>
    );
  }
}

HalodocTnCScreen.PropTypes = {
  agreeAction: PropTypes.func,
  config: PropTypes.array,
};

const mapStateToProps = state => ({
  registrationStatus: state.haloDocServices.registrationStatus,
});

export default connect(
  mapStateToProps,
  {
    gotoHealthScreen,
    handleDocTnCAcceptance,
    gotoPatientRegistrationScreen,
    dispatchEvent,
    loadTermsAndCondition,
    loadPrivacypolicy
  }
)(HalodocTnCScreen);
