import React, { Component } from "react";
import {
  View,
} from "react-native";

import { goto, dispatchEvent } from "../../../actions";
import { connect } from "react-redux";
import Styles from "./styles";
import DetailArrowCell from "../../../components/DetailArrowCell";
import { CoreConfig, events } from "@pru-rt-internal/pulse-common";
import MetaConstants from "./meta";
const {
  pageKeys,
} = CoreConfig;

class TeleConsultationSummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.props.dispatchEvent(events.MyDocMedicalRecordScreen)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  render() {
    return (
      <View style={Styles.All}>
        <View style={Styles.functionList}>
          <View style={Styles.listDetail}>
            <DetailArrowCell
              labelText={this.metaConstants.consultationHistoryLabel}
              hideArrow={false}
              onPress={() => {
                this.props.dispatchEvent(events.MyDocMedicalRecordConsultationHistoryClick)
                this.props.goto(pageKeys.MYDOC_CONSULTATION_HISTORY);
              }}
            />
            <DetailArrowCell
              labelText={this.metaConstants.allMyFilesLabel}
              hideArrow={false}
              onPress={() => {
                this.props.dispatchEvent(events.MyDocMedicalRecordAllMyFilesClick)
                this.props.goto(pageKeys.MYDOC_CONSULTATION_FILES);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userLanguagePreference: state.userPreferences.language,
});

export default connect(mapStateToProps, {
  goto,
  dispatchEvent
})(TeleConsultationSummaryScreen);
