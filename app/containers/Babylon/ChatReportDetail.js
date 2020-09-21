import React, { Component } from "react";
import { View, ScrollView, BackHandler } from "react-native";
import { connect } from "react-redux";
import { ChatReportDetailStyle as styles } from "./styles";

import {
  metaHelpers,
  CoreActionTypes,
  CoreComponents,
  CoreConfig,
  CoreConstants,
} from "@pru-rt-internal/pulse-common";
import PropTypes from "prop-types";
import ChatHeader from './ChatHeader'
const { Label, Rating } = CoreComponents;
const { pageKeys } = CoreConfig;
const { SCREEN_KEY_CHAT_REPORT_DETAIL } = CoreConstants;
const KEY_COMMON_TRATMENT = "commontreatment";
const KEY_POTENTIAL_CAUSE = "potentialcause";
const KEY_THIS_CONDITION = "thisconditioncouldbethecause";

import {configureLineHeight} from "../../utils/lineHeightsUtils";

class ChatReportDetail extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this); 
    this.openWebView = this.openWebView.bind(this);
    this.extraConditionItem = this.extraConditionItem.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick); 
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick); 
  }

  handleBackButtonClick() {
    console.log('Chat Report Details# Back navigation')
    this.props.navigation.goBack();
    return true;
  }

  openWebView(url) {
    this.props.openWebView(url);
  }

  extraConditionItem(item) {
    return item.extraConditionItem.map(val => {
      <Label value={val} style={{
        ...styles.causesStyle,
        ...configureLineHeight("14")
      }} />;
    });
  }

  render() {
    const { state } = this.props.navigation;
    const commontreatment = metaHelpers.findElement(
      SCREEN_KEY_CHAT_REPORT_DETAIL,
      KEY_COMMON_TRATMENT
    ).label;
    const potentialcauses = metaHelpers.findElement(
      SCREEN_KEY_CHAT_REPORT_DETAIL,
      KEY_POTENTIAL_CAUSE
    ).label;
    const condition = metaHelpers.findElement(
      SCREEN_KEY_CHAT_REPORT_DETAIL,
      KEY_THIS_CONDITION
    ).label;
    const possibleCauses = state.params.data.positiveSymptoms.map(
      (item, index) => {
        return <Label key={index} value={item} style={{...styles.causesStyle, ...configureLineHeight("14")}} />;
      }
    );

    const extraCondition = state.params.data.extraConditions.map(
      (item, index) => {
        return (
          <View key={index} style={styles.quesContainer}>
            <Label
              value={item.extraConditionTitle}
              style={{
                ...styles.questionStyle,
                ...configureLineHeight("16")
              }}
            />
            <View style={styles.extraCondItemContainer}>
              {item.extraConditionItem.map(val => {
                // eslint-disable-next-line react/jsx-key
                return <Label value={val} style={{...styles.causesStyle, ...configureLineHeight("14")}} />;
              })}
            </View>
          </View>
        );
      }
    );
    return (
      <View style={styles.container}>
        <ChatHeader goback={() => this.props.navigation.goBack()} />
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Label value={state.params.data.name} style={{
              ...styles.heading,
              ...configureLineHeight("22")
              }} />
            <View style={styles.ratingContainer}>
              <Label
                value={state.params.data.probabilityLabel}
                style={{
                  ...styles.ratingLabel,
                  ...configureLineHeight("14")
                }}
              />
              <Rating
                readonly
                startingValue={state.params.data.probabilityLevel}
                fractions={1}
                ratingColor="#ed1b2e"
              />
            </View>
            <Label
              value={state.params.data.overview}
              style={{
                ...styles.consultationSubhead,
                ...configureLineHeight("14")
              }}
            />
          </View>
          <View style={styles.quesContainer}>
            <Label value={commontreatment} style={{
              ...styles.questionStyle,
              ...configureLineHeight("16")
              }} />
            <Label
              value={state.params.data.commonTreatmentDescription}
              style={{
                ...styles.consultationSubhead,
                ...configureLineHeight("14")
              }}
            />
          </View>
          <View style={styles.quesContainer}>
            <Label value={potentialcauses} style={{
              ...styles.questionStyle,
              ...configureLineHeight("16")
              }} />
            <Label
              value={condition}
              style={[styles.consultationSubhead, styles.potentialCausePadding, {...configureLineHeight("14")}]}
            />
            <View style={styles.possibleCauses}>{possibleCauses}</View>
          </View>
          <View style={styles.extraCondContainer}>{extraCondition}</View>
        </ScrollView>
      </View>
    );
  }
}

ChatReportDetail.propTypes = {
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  meta: state.meta,
});
export default connect(
  mapStateToProps,
  {
    openWebView: url => ({
      context: pageKeys.CHAT_REPORT_DETAIL,
      type: CoreActionTypes.CHAT_OPEN_WEB_VIEW,
      payload: {
        params: {
          url,
        },
      },
    }),
  }
)(ChatReportDetail);
