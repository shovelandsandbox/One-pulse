import React from "react";
import { Text, View, Image, Platform } from "react-native";
import { connect } from "react-redux";
import styles from "./NutritionStyle";
import {
  CoreConstants,
  CoreUtils,
  metaHelpers,
  CoreComponents,
  CoreConfig,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
import fastyles from "./FullAssessmentStyle";
import { ACTIVITY, NUTRITION, MOOD, ASSESSMENT } from "../../config/images";
import moment from "moment";

import DiseaseRisk from "../../components/DiseaseRisk/DiseaseRisk";
import ItemBar from "../../components/ItemBar/ItemBar";
import MakeChange from "../../components/MakeChange/MakeChange";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

const { AppButton } = CoreComponents;
const { isNilOrEmpty } = CoreUtils;
const { pageKeys } = CoreConfig;
const { SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS } = CoreConstants;
const KEY_ABOUT = "about";
const KEY_KEEP_IT_UP = "keepitup";
const KEY_MAKE_CHANGE = "makechange";
const KEY_RETAKE_ASSESSMENT = "retakeassessment";
const KEY_START_ASSESSMENT = "startassessment";
const KEY_END_ASSESSMENT_LABEL = "endAssessmentlabel";
const KEY_MINUTE = "minute";
const KEY_START_ASSESSMENT_LABEL = "startassessmentlabel";
const KEY_DISEASE_RISK = "diseaserisk";
const isIOS = Platform.OS === "ios";

// eslint-disable-next-line react/require-optimization
class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.openResult = this.openResult.bind(this);
    this.startAssessment = this.startAssessment.bind(this);
    this.retakeAssesment = this.retakeAssesment.bind(this);
  }

  startAssessment() {
    this.props.startAssessment();
  }
  retakeAssesment() {
    this.props.retakeAssesment();
  }
  openResult(data) {
    const { navigation } = this.props;
    if (data.dataAvailability === "AVAILABLE") {
      const name = this.Capitalize(data.id.toLowerCase());
      const healthCategory = data.id.toLowerCase();
      this.props.goToFullAssessment({
        categoryDetails: data,
        name,
        healthCategory,
        fromHealthCheckHome: false,
      });
    }
  }

  Capitalize(str) {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    return capital;
  }

  renderFooterView(organDetails) {
    const { navigation, type } = this.props;
    const data = navigation.state.params.value;
    const minute = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_MINUTE
    ).label;
    const category = organDetails[0].name ? organDetails[0].name.toLowerCase() : "";
    let startassessmentlabel = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_START_ASSESSMENT_LABEL
    ).label;
    startassessmentlabel = startassessmentlabel.replace('${0}', category);
    const endassessmentlabel = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_END_ASSESSMENT_LABEL
    ).label;
    const startassessment = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_START_ASSESSMENT
    ).label;
    const retakeassessment = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_RETAKE_ASSESSMENT
    ).label;
    let buttonTitle = "";
    if (type == undefined) {
      if (
        organDetails[0].type !== "ORGAN" &&
        organDetails[0].dataAvailability !== "MISSING"
      ) {
        buttonTitle = retakeassessment;
      } else {
        buttonTitle = startassessment;
      }
    } else {
      if (organDetails[0].dataAvailability !== "MISSING") {
        buttonTitle = retakeassessment;
      } else {
        buttonTitle = startassessment;
      }
    }
    return (
      <View>
        {organDetails[0].dataAvailability === "MISSING" && (
          <View style={styles.footerView}>
            <View style={styles.footerContainerView}>
              <Image
                style={[styles.imgStyle, styles.healthCheckIcon]}
                resizeMode="contain"
                source={this.renderIcon(data.flowId)}
              />
              <Text style={{
                ...styles.footertext,
                ...configureLineHeight("15")
                }}>
                {startassessmentlabel}
                {endassessmentlabel}
              </Text>
            </View>
            <View style={styles.footerTime}>
              <Text style={{
                ...styles.minText,
                ...configureLineHeight("14")
                }}>
                {organDetails[0].duration}
                {minute}
              </Text>
            </View>
            <AppButton
              type={[styles.btn, styles.primary]}
              title={buttonTitle}
              press={() => this.startAssessment()}
            />
          </View>
        )}
        {organDetails[0].dataAvailability !== "MISSING" && (
          <View>
            <AppButton
              type={[styles.btn, styles.primary]}
              title={buttonTitle}
              press={() => this.retakeAssesment()}
            />
          </View>
        )}
      </View>
    );
  }

  renderIcon(icon) {
    this.icon = icon;
    if (icon == undefined) {
      return null;
    } else if (icon.includes("activity_onboarding") || 
        icon.includes("activity_on_boarding")) {
      return ACTIVITY;
    } else if (icon.includes("nutrition_onboarding") ||
        icon.includes("nutrition_on_boarding")) {
      return NUTRITION;
    } else if (icon.includes("mood_onboarding") ||
        icon.includes("mood_on_boarding")) {
      return MOOD;
    } else if (icon.includes("initial_superflow")) {
      return ASSESSMENT;
    }
    return null;
  }

  renderData(organDetails) {
    return (
      <React.Fragment>
        {organDetails.dataAvailability !== "MISSING" && (
          <View>
            <Text
              style={{
                marginLeft: 10,
                marginBottom: 5,
                textAlign: "auto",
                fontSize: 13.3,
                lineHeight: 15.6,
                color: "#6b6a6d",
                ...configureLineHeight("15")
              }}
            >
              {organDetails.overview}
            </Text>
            {organDetails.healthMatrics != null && (
              <View style={{ padding: 10, flex: 0.8 }}>
                {organDetails.healthMatrics.hasOwnProperty("selfAccess") ? (
                  organDetails.healthMatrics.selfAccess.items.map(res => (
                    <View>
                      <ItemBar items={res} />
                    </View>
                  ))
                ) : (
                  <View />
                )}
              </View>
            )}
          </View>
        )}

        {this.props.type && organDetails.dataAvailability !== "MISSING" && (
          <View>
            {organDetails.healthMatrics != null && (
              <View style={{ padding: 10, flex: 0.8 }}>
                {organDetails.healthMatrics.hasOwnProperty("selfAccess") ? (
                  organDetails.healthMatrics.selfAccess.items.map(res => (
                    <View>
                      <ItemBar items={res} />
                    </View>
                  ))
                ) : (
                  <View />
                )}
              </View>
            )}
          </View>
        )}
      </React.Fragment>
    );
  }

  formatDate(date) {
    if (isNilOrEmpty(date)) {
      return "";
    }
    const formattedDate = moment(date, "YYYY-MM-DD hh:mm:ss Z").format(
      "DD-MM-YYYY hh:mm A"
    );
    return formattedDate;
  }
  // eslint-disable-next-line complexity
  render() {
    const { organDetails, navigation, type, meta } = this.props;
    let keepItUp = false;
    let makeAchange = false;
    if (organDetails[0].hasOwnProperty("action")) {
      for (let i = 0; i < organDetails[0].action.length; i++) {
        if (organDetails[0].action[i].compoenent3 === "MAINTAIN") {
          keepItUp = true;
        } else if (organDetails[0].action[i].compoenent3 === "IMPROVE") {
          makeAchange = true;
        }
      }
    }
    const keepitup = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_KEEP_IT_UP
    ).label;
    const makechange = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_MAKE_CHANGE
    ).label;
    const about = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_ABOUT
    ).label;
    const diseaseRiskLabel = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_CATEGORY_DETAILS,
      KEY_DISEASE_RISK
    ).label;
    return (
      <View style={{ margin: 10 }}>
        {
          <View>
            {organDetails.map(data => this.renderData(data))}
            {organDetails[0].healthMatrics != null &&
              organDetails[0].dataAvailability !== "MISSING" && (
                <View
                  style={[
                    fastyles.rowFlexMt,
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <Text style={{...fastyles.reportDescTitle, ...configureLineHeight("15")}}>
                    {organDetails[0].healthMatrics.hasOwnProperty("diseaseRisk")
                      ? diseaseRiskLabel
                      : ""}
                  </Text>
                  <Text style={{...fastyles.reportTime, ...configureLineHeight("15")}}>
                    {organDetails[0].healthMatrics.hasOwnProperty("diseaseRisk")
                      ? this.formatDate(
                          organDetails[0].healthMatrics.diseaseRisk
                            .calculationDateTime
                        )
                      : ""}
                  </Text>
                </View>
              )}
            {organDetails[0].healthMatrics != null &&
              organDetails[0].dataAvailability !== "MISSING" && (
                <View>
                  {organDetails[0].healthMatrics.hasOwnProperty(
                    "diseaseRisk"
                  ) ? (
                    organDetails[0].healthMatrics.diseaseRisk.items.map(
                      (res, index) => (
                        <View
                          style={{ marginLeft: 10, marginRight: 10 }}
                          key={index}
                        >
                          <DiseaseRisk risks={res} {...this.props} />
                        </View>
                      )
                    )
                  ) : (
                    <View />
                  )}
                </View>
              )}
            {keepItUp && (
              <Text
                style={{
                  ...{
                    fontFamily:
                      Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
                    color: "#68737a",
                    fontSize: 18.3,
                    lineHeight: 21,
                    textAlign: "center",
                  },
                  ...configureLineHeight("18")
                }}
              >
                {keepitup}
              </Text>
            )}
            {organDetails[0].hasOwnProperty("action") ? (
              organDetails[0].action.map(action =>
                action.compoenent3 === "MAINTAIN" ? (
                  <MakeChange actions={action} />
                ) : (
                  <View />
                )
              )
            ) : (
              <View />
            )}
            {makeAchange && (
              <Text
                style={{
                  fontFamily:
                    Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
                  color: "#68737a",
                  fontSize: 18.3,
                  lineHeight: 21,
                  textAlign: "center",
                  ...configureLineHeight("18")
                }}
              >
                {makechange}
              </Text>
            )}
            {organDetails[0].hasOwnProperty("action") ? (
              organDetails[0].action.map(action =>
                action.compoenent3 === "IMPROVE" ? (
                  <MakeChange actions={action} />
                ) : (
                  <View />
                )
              )
            ) : (
              <View />
            )}
            <View style={{ flex: 1, marginTop: 5, marginBottom: 5 }}>
              {this.renderFooterView(organDetails)}
            </View>
            {organDetails[0].dataAvailability !== "MISSING" && (
              <Text
                style={{
                  fontFamily:
                    Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
                  color: "#68737a",
                  fontSize: 15,
                  lineHeight: 17.3,
                  marginTop: 20,
                  marginLeft: 10,
                  ...configureLineHeight("15")
                }}
              >
                {about}
              </Text>
            )}
            {organDetails[0].dataAvailability !== "MISSING" && (
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 20,
                  color: "#6b6a6d",
                  fontSize: 13.3,
                  lineHeight: 15.6,
                  marginBottom: 60,
                  ...configureLineHeight("14")
                }}
              >
                {organDetails[0].description}
              </Text>
            )}
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
});

export default connect(
  mapStateToProps,
  {
    goToFullAssessment: params => ({
      context: pageKeys.CATEGORY_DETAILS,
      type: CoreActionTypes.GO_TO_FULL_ASSESSMENT,
      payload: {
        params,
      },
    }),
  }
)(CategoryDetails);
