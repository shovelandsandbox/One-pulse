/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView
} from "react-native";
import { CLOSE_ICON, DOCTORHEAD, DOCLOGO } from '../../../config/images'
import { connect } from "react-redux";
import {
  CoreConfig,
  CoreActionTypes,
  events
} from '@pru-rt-internal/pulse-common'
import MetaConstants from "./meta";

const sh = Dimensions.get('window').height
const {
  pageKeys,
} = CoreConfig;

import PropTypes from 'prop-types'
import styles from "./styles";
import { dispatchEvent } from "../../../actions";
class DoctorTnC extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }
  componentDidMount() {
    this.props.dispatchEvent(events.MyDocTnCScreen)
  }

  render() {
    return <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff'
      }} >
      <View style={styles.firstView}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            this.props.navigation.goBack();
            this.props.dispatchEvent(events.MyDocTnCCrossClick)
          }}
        >
          <Image
            style={styles.closeImg}
            source={CLOSE_ICON}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.myDocTnCContainer}>
        <View>
          <Image
            style={{
              height: sh * 0.357,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={DOCTORHEAD}
          />
        </View>

        <View style={styles.talkToDocContainer}>
          <View>
            <Text style={styles.talktoDoctorLabelText}>
              {this.metaConstants.talkToDoctorLabel}
            </Text>
          </View>
          <Text style={styles.consultWithQualifiedText}>
            {this.metaConstants.consultWithQualifiedLabel}
          </Text>
          <View style={styles.wheneverContainer}>
            <Text style={styles.aimeStyle}>
              {this.metaConstants.whenEverLabel}
            </Text>
            <View style={styles.docLogoPosition}>
              <Image style={styles.docLogo} source={DOCLOGO} />
            </View>
            {
              this.metaConstants.appearsOnCall.split(' ').map(str => {
                return <Text style={styles.aimeStyle}>
                  {` ${str}`}
                </Text>
              })
            }
          </View>
        </View>

        <View style={styles.talkToDoctorTextContainer}>
          <Text style={styles.byContinueText}>
            {this.metaConstants.byClickingAgreeBelow}
            <Text style={styles.termsconditions} onPress={() => {
              this.props.dispatchEvent(events.MyDocTnCClick)
              this.props.loadPrivacypolicy("Mydoc", "TermAndConditions")
            }}>
              {` ${this.metaConstants.talkToDoctorTC}`}
            </Text>
            <Text>{` ${this.metaConstants.andLabel} `}</Text>
            <Text style={styles.termsconditions} onPress={() => {
              this.props.dispatchEvent(events.MyDocPrivacyPolicyClick)
              this.props.loadPrivacypolicy("Mydoc", "PrivacyPolicy")
            }}>
              {`${this.metaConstants.privacyPolicyLabel} `}
            </Text>
            {this.metaConstants.toUseMyDocServices}
          </Text>
        </View>

        <View style={{ height: 40 }}></View>

        <TouchableOpacity
          style={styles.tncAgreeAndContinueButton}
          onPress={() => {
            this.agreeTermsOfMyDoc()
          }}>
          <Text style={styles.tncAgreeContinueText}>
            {this.metaConstants.iAgreeContinue}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  }

  agreeTermsOfMyDoc = () => {
    this.props.dispatchEvent(events.MyDocTnCContinueClick)
    this.props.handleDocTnCAcceptance();
  }
}

DoctorTnC.PropTypes = {
  agreeAction: PropTypes.func
}

const mapStateToProps = state => ({
  userLanguagePreference: state.userPreferences.language,
});

export default connect(
  mapStateToProps,
  {
    dispatchEvent,
    handleDocTnCAcceptance: tncData => ({
      context: pageKeys.DOC_SERVICE_INTRO,
      type: CoreActionTypes.DOC_SERVICE_TNC_ACCEPTED,
    }),
    loadPrivacypolicy: (source, value) => ({
      context: "LOAD_TNC_AND_PRIVACY_POLICY",
      type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
      payload: {
        source: source,
        value: value,
      },
    }),
  }
)(DoctorTnC);