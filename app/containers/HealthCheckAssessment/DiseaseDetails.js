import React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import {
  colors,
  CoreConstants,
  metaHelpers,
  CoreActionTypes,
  CoreActions,
  CoreConfig,
  CoreUtils,
} from "@pru-rt-internal/pulse-common";
import styles from "./DiseaseStyle";
import MakeChange from "../../components/MakeChange/MakeChange";
import { Header } from "../../components/ChatComponent/Header";
import AssessmentProgressBar from "../../components/AssessmentProgressBar/index";
import { pathOr, path } from "ramda";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

const { isNilOrEmpty } = CoreUtils;

const { SCREEN_KEY_HEALTH_CHECK_DISEASE_DETAILS } = CoreConstants;
const { resetHealthConditionDetail } = CoreActions;
const { pageKeys } = CoreConfig;
const KEY_UNDERSTAND_YOUR_RISK = "understandyourrisk";
const KEY_INFLUENCE = "influencigyourrisk";
const KEY_ABOUT = "about";
const KEY_MAKE_CHANGE = "makechange";

// eslint-disable-next-line react/require-optimization
class DiseaseDetails extends React.Component {
  componentDidMount() {
    const { getConditionDetails, navigation, conditionId } = this.props;
    if (navigation !== undefined) {
      const conditionIdValue = navigation.state.params.conditionId;
      this.getConditionDetails(conditionIdValue);
    } else {
      this.getConditionDetails(conditionId);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => { });
  }

  getConditionDetails = conditionId => {
    this.props.resetHealthConditionDetail();
    this.props.getConditionDetails(conditionId);
  };

  renderRiskInfluence(data) {
    return (
      <View style={[styles.influenceListText, styles.flexRow]}>
        <Text style={{
          ...styles.iconText,
          ...configureLineHeight("14")
        }}>
          {data.type && data.type.toLowerCase() === "increased" ? (
            <Icon name="arrow-circle-up" size={20} color={colors.red} />
          ) : (
              <Icon name="arrow-circle-down" size={20} color={colors.green} />
            )}
        </Text>
        <Text style={{
          ...styles.diseaseDescription,
          ...configureLineHeight("14")
        }}>{data.name}</Text>
      </View>
    );
  }

  renderActions = () => {
    const { conditionDetails } = this.props;
    const actions = pathOr({}, ["action"], conditionDetails);
    const component6 = pathOr([], ["component6"], actions);

    return component6.map(action => (
      // eslint-disable-next-line react/jsx-key
      <View>
        <MakeChange actions={action} />
      </View>
    ));
  };

  renderAssementProgressBar = () => {
    const { conditionDetails } = this.props;
    const actions = pathOr({}, ["action"], conditionDetails);
    const ranges = pathOr([], ["range"], actions);
    const value = path(["value"], actions);
    if (ranges.length === 3) {
      return (
        <AssessmentProgressBar
          green={ranges[0].max}
          orange={ranges[1].max - ranges[1].min}
          red={ranges[2].max - ranges[2].min}
          value={value}
        />
      );
    }
  }

  render() {
    const { navigation, conditionDetails, conditionId } = this.props;
    const riskInfluenceMap = pathOr([], ["riskhinfluecemap"], conditionDetails);
    const risk = pathOr({}, ["risk"], conditionDetails);

    let backGroundColor = undefined;
    if (conditionId === undefined) {
      backGroundColor = colors.white;
    }
    const influence = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_DISEASE_DETAILS,
      KEY_INFLUENCE
    ).label;
    const makechange = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_DISEASE_DETAILS,
      KEY_MAKE_CHANGE
    ).label;
    const understandyourrisk = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_DISEASE_DETAILS,
      KEY_UNDERSTAND_YOUR_RISK
    ).label;
    const about = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_DISEASE_DETAILS,
      KEY_ABOUT
    ).label;

    if (!conditionDetails) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <React.Fragment>
        <ScrollView style={{ backgroundColor: backGroundColor, padding: 10 }}>
          <View style={{ flex: 1, padding: 15 }}>
            {navigation != undefined && (
              <Text style={{
                ...styles.diseaseTitle,
                ...configureLineHeight("15")
              }}>
                {navigation.state.params.name}
              </Text>
            )}
            <Text style={{
              ...styles.diseaseDescription,
              ...configureLineHeight("14")
              }}>
              {conditionDetails.overView}
            </Text>
            <View style={styles.horizontalLine} />

            <View>
              <Text style={{
                ...styles.diseaseTitle,
                ...configureLineHeight("15")
                }}>{understandyourrisk}</Text>
              <View style={styles.flexRow}>
                <View style={styles.riskRange}>
                  <Text style={{
                    ...styles.riskValueText,
                    ...configureLineHeight("18")
                    }}>{risk.riskValue}</Text>
                  <Text style={{
                    ...styles.riskRangeText,
                    ...configureLineHeight("14")
                    }}>{risk.range}</Text>
                </View>
                <View style={styles.riskDescription}>
                  <Text style={{
                    ...styles.diseaseDescription,
                    ...configureLineHeight("14")
                    }}>
                    {risk.riskdescription}
                  </Text>
                </View>
              </View>
              <View style={styles.horizontalLine} />
            </View>

            <View>
              <Text style={{
                ...styles.influenceText,
                ...configureLineHeight("15")
                }}>{influence}</Text>
              <View>{riskInfluenceMap.map(this.renderRiskInfluence)}</View>
            </View>
            <View style={styles.horizontalLine} />

            <View>
              <Text style={{
                ...styles.diseaseTitle,
                ...configureLineHeight("15")
                }}>{makechange}</Text>
              {conditionDetails.action != null && (
                <Text style={{
                  ...styles.diseaseDescription,
                  ...configureLineHeight("14")
                  }}>
                  {conditionDetails.action.description}
                </Text>
              )}
              {!isNilOrEmpty(conditionDetails.action) &&
                this.props.fromReport != "fromReport" &&
                this.renderAssementProgressBar()}
              {conditionDetails.action != null && this.renderActions()}
              <View style={styles.horizontalLine} />
              <View>
                <Text style={{
                  ...styles.diseaseTitle,
                  ...configureLineHeight("15")
                  }}>{about}</Text>
                <Text style={{
                  ...styles.diseaseDescription,
                  ...configureLineHeight("14")
                  }}>
                  {conditionDetails.component1}
                </Text>
              </View>
            </View>
            <View style={styles.horizontalLine} />
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  conditionDetails: pathOr(
    {},
    ["healthCheck", "conditionDetails", "conditionDetails"],
    state
  ),
});

export default connect(mapStateToProps, {
  getConditionDetails: conditionId => ({
    context: pageKeys.DISEASE_DETAILS,
    type: CoreActionTypes.FETCH_HEALTH_CONDITIONS,
    payload: {
      conditionId,
    },
  }),
  getModalResponse: boolean => ({
    type: CoreActionTypes.GET_MODAL_RESPONSE,
    payload: boolean,
  }),
  resetHealthConditionDetail,
})(DiseaseDetails);
