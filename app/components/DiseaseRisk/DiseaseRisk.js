import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { connect } from "react-redux";
import { ARROW } from "../../config/images";
import AssessmentProgressBar from "../AssessmentProgressBar";
import {
  CoreConfig,
  metaHelpers,
  CoreActionTypes
} from "@pru-rt-internal/pulse-common";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
const KEY_VIEW_MORE = "viewmore";
const { SCREEN_KEY_HEALTH_CHECK_REPORT, pageKeys } = CoreConfig;
class DiseaseRisk extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadConditionDetails = this.loadConditionDetails.bind(this);
    this.loadOrganDetailsCliked = this.loadOrganDetailsCliked.bind(this);
    this.viewMore = this.viewMore.bind(this);
  }
  loadConditionDetails() {
    const { name, risks } = this.props;
    this.loadOrganDetailsCliked();
    if (name != "report") {
      this.props.goToDiseaseDetails({
        name: risks.name,
        showBack: false,
        conditionId: risks.conditionId,
        fullAssessment: this.props.fullAssessment
      });
    }
  }
  loadOrganDetailsCliked() {
    if (this.props.fullAssessment != null) {
      this.props.loadOrganDetailsCliked();
    }
  }
  viewMore() {
    const { risks } = this.props;
    this.props.viewMore(risks.conditionId);
  }
  horizontalLine() {
    return <View style={styles.horizontalLine} />;
  }
  render() {
    const { risks, name } = this.props;
    const viewmore = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_VIEW_MORE
    ).label;
    return (
      <TouchableOpacity onPress={this.loadConditionDetails}>
        {risks.hasOwnProperty("range") && risks.range.length > 0 ? (
          <View>
            <View style={styles.wrapper}>
              <View>
                <Text style={{...styles.riskText, ...configureLineHeight("13")}}>{risks.name}</Text>
              </View>
              {name != "report" && (
                <TouchableOpacity>
                  <Image source={ARROW} style={styles.diseaseTitleIcon} />
                </TouchableOpacity>
              )}
            </View>
            <AssessmentProgressBar
              green={risks.range[0].mix}
              orange={risks.range[1].mix - risks.range[0].mix}
              red={risks.range[2].mix - risks.range[1].mix}
              value={risks.value}
            />
            {name == "report" && (
              <TouchableOpacity onPress={this.viewMore}>
                <Text style={{...styles.viewmore, ...configureLineHeight("13")}}>{viewmore}</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : risks.hasOwnProperty("conditionId") ? (
          <View>
            <View style={styles.wrapper}>
              <View>
                <Text style={{...styles.riskText, ...configureLineHeight("13")}}>{risks.name}</Text>
              </View>
            </View>
            <Text style={[{ paddingVertical: 5 }, {...styles.viewmore, ...configureLineHeight("13")}]}>
              {risks.valueDescription}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }
}

DiseaseRisk.propTypes = {
  risks: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

export default connect(null, {
  goToDiseaseDetails: params => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.GO_TO_DISEASE_DETAILS,
    payload: {
      params
    }
  })
})(DiseaseRisk);
