import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./NutritionStyle";
import { dispatchEvent } from "../../actions";
import PropTypes from "prop-types";
import { path } from "ramda"; 
import {configureLineHeight} from "../../utils/lineHeightsUtils";

import {
  colors,
  CoreConstants,
  metaHelpers,
  CoreConfig,
  CoreActionTypes,
  CoreUtils,
} from "@pru-rt-internal/pulse-common";

const { ARROW, COMMON_KEY_NO_DATA } = CoreConstants;
const { pageKeys } = CoreConfig;

class BodyOrganListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.openResult = this.openResult.bind(this);
  }


  logActivityEvent = healthCategory => {
    const { auth } = this.props;
    const appVersion = path(["userAgent", "appVersion"], auth);
    const eventData = {
      type: "ActivityEvent",
      tags: ["healthassessment", "babylon", "health", "DigitalTwin"],
      name: "pulse.babylon.digitalTwin.organDetails",
      source: "pulse",
      attributes: {
        appVersion,
        organ: healthCategory,
      },
    };
    this.props.dispatchEvent(eventData);
  };

  openResult(data) {
    const { navigation } = this.props;
    const name = data.name;
    const healthCategory = data.id.toLowerCase();
    this.logActivityEvent(healthCategory);
    this.props.goToOrganDetails({
      organDetails: data,
      name,
      healthCategory,
      fromHealthCheckHome: false,
      value: navigation.state.params.value,
    });
  }

  render() {
    const { organDetails } = this.props;
    const noData = metaHelpers.findCommon(COMMON_KEY_NO_DATA).label;
    if (organDetails.type === "ORGAN") {
      const iconColor =
        organDetails.dataAvailability !== "MISSING"
          ? CoreUtils.getStatusDotColor(organDetails.status)
          : colors.nevada;
      return (
        <TouchableOpacity
          style={styles.headCell}
          onPress={() => this.openResult(organDetails)}
        >
          <View style={styles.flxRow}>
            <Text style={[styles.textStyle, styles.iconText, {...configureLineHeight("14")}]}>
              {
                <Icon
                  name="check-circle"
                  iconStyle={{ marginRight: 10 }}
                  size={12}
                  color={iconColor}
                />
              }
            </Text>
            <Text style={{
              ...styles.textStyle,
              ...configureLineHeight("15")
              }}>
              {CoreUtils.toTitleCase(organDetails.name)}
            </Text>
          </View>
          <View style={styles.dataStyle}>
            {organDetails.dataAvailability === "AVAILABLE" ? (
              <Image source={ARROW} style={styles.arrowImage} />
            ) : (
              <Text style={{
                ...styles.noDataText,
                ...configureLineHeight("14")
              }}>{noData}</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    }
    return <View />;
  }
}

BodyOrganListDetails.propTypes = {
  auth: PropTypes.object,
  dispatchEvent: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  goToOrganDetails: params => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.GO_TO_ORGAN_DETAILS,
    payload: {
      params,
    },
  }),
  dispatchEvent,
})(BodyOrganListDetails);
