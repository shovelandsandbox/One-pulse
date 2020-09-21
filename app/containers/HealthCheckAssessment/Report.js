import React from "react";
import {
  View,
  Text,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import Pie from "react-native-pie";
import {
  colors,
  CoreConstants,
  metaHelpers,
  CoreConfig,
  CoreActionTypes,
  events
} from "@pru-rt-internal/pulse-common";
import styles from "./NutritionStyle";
import fastyles from "./FullAssessmentStyle";
import DiseaseDetails from "./DiseaseDetails";
import { ACTIVITY, NUTRITION, MOOD } from "../../config/images";
import { dispatchEvent } from "../../actions";
import DiseaseRisk from "../../components/DiseaseRisk/DiseaseRisk";
import MakeChange from "../../components/MakeChange/MakeChange";
import { find } from "ramda";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

const { SCREEN_KEY_HEALTH_CHECK_REPORT } = CoreConstants;
const { pageKeys } = CoreConfig;
const KEY_LOW = "low";
const KEY_MEDIUM = "medium";
const KEY_HIGH = "high";
const KEY_OK = "ok";
const KEY_UNKNOWN = "unknown";
const KEY_MODERATE = "moderate";
const KEY_ALERT = "alert";
const KEY_KEEP_IT_UP = "keepitup";
const KEY_MAKE_CHANGE = "makechange";
const KEY_GUIDELINES = "guidelines";
const KEY_RISK_RESULT = "riskresult";
const KEY_MODERATE_RESULT = "modrateresult";
const KEY_UNKNOWN_RESULT = "unknownresult";
const KEY_PRE_EXISTING_RESULT = "preexistingresult";
const KEY_CURRENTLY_DIAGNOSED_RESULT = "currentlydiagnosedresult";
const KEY_HEALTH_CHECK_SCORE = "healthcheckscore";
const KEY_COMPLETED_INFORMATION = "completedinformation";
const KEY_SUMMARY = "summary";
const KEY_MORE_DETAIL = "moredetail";
const KEY_NUTRITION = "nutrition";
const KEY_ACTIVITY = "activity";
const KEY_MOOD = "mood";
const KEY_DISEASE_RISK = "diseasaerisk";
const KEY_COMPARE_WITH_OTHERS = "comparewithother";
const KEY_OUT_OF = "outof";
const KEY_ORGAN_HEALTH = "organhealth";
const KEY_ORGAN_RESULT = "organresult";
const KEY_ORGAN_HEALTH_LABEL = "organhealthlabel";
const KEY_OPTIMISE = "optimise";
const KEY_DISEASE_RISK_LIST = "diseaserisklist";
const KEY_RISK_COMPARISION = "riskcomparision";
const KEY_REMEMBER = "remember";
const KEY_ADVICE_FROM_DOCTOR = "advicefromdoctor";
const KEY_SERIAL_ACTIVITY = "02.Activity";
const KEY_SERIAL_NUTRITION = "03.Nutrition";
const KEY_SERIAL_MOOD = "04.Mood";
const KEY_INCOMPLETE = "incompletetext";

const { BridgeEmitter } = NativeModules;
// const chatBridgeEmitter = new NativeEventEmitter(BridgeEmitter);
// const isIOS = Platform.OS === "ios";
const statusColorCode = {
  LOW: colors.green,
  MEDIUM: colors.orange,
  HIGH: colors.red,
  CRITICAL: colors.red,
};

// eslint-disable-next-line react/require-optimization
class Report extends React.Component {
  constructor(props) {
    super(props);
    this.renderView = this.renderView.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
    this.renderhealthAssesmentText = this.renderhealthAssesmentText.bind(this);
    this.renderAvailableDataList = this.renderAvailableDataList.bind(this);
    this.renderCategoryDetails = this.renderCategoryDetails.bind(this);
    this.rendermakeChange = this.rendermakeChange.bind(this);
    this.renderDiseaseRisk = this.renderDiseaseRisk.bind(this);
    this.loadOrganList = this.loadOrganList.bind(this);
    this.Capitalize = this.Capitalize.bind(this);
    this.viewMore = this.viewMore.bind(this);
    this.state = { conditionId: "" };
    this.loadPieChart = this.loadPieChart.bind(this);
    this.loadPieChartData = this.loadPieChartData.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.componentDidFocus = this.componentDidFocus.bind(this);
    this.listeners = [];
  }

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => {
      this.componentDidFocus();
      this.subs = [navigation.addListener("didFocus", this.componentDidFocus)];
    }, 500);
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  componentDidFocus() {
    const {
      getHealthCategoriesById,
      getHealthReport,
      getHealthCategories,
      dispatchEvent
    } = this.props;
    dispatchEvent(events.BabylonHealthReport);
    getHealthCategoriesById("nutrition");
    getHealthReport();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      getHealthCategoriesById,
      getHealthReport,
      getHealthCategories
    } = this.props;

    if (nextProps.language != this.props.language) {
      getHealthCategoriesById("nutrition");
      //getHealthCategoriesById("mood");
      //getHealthCategoriesById("activity");
      getHealthReport();
      // getHealthCategories();
    }
  }

  viewMore(conditionIdValue) {
    this.setState({ conditionId: conditionIdValue });
  }
  renderIcon(data, status) {
    let color = colors.nevada;
    if (status == "OK") {
      color = colors.green;
    } else if (status == "MODERATE") {
      color = colors.orange;
    } else if (status == "ALERT") {
      color = colors.red;
    } else if (status == "CRITICAL") {
      color = colors.red;
    } else if (status == "PREVIOUSLY DIAGNOSED") {
      color = colors.nevada;
    } else if (status == "CURRENTLY DIAGNOSED") {
      color = colors.bondiBlue;
    }

    return (
      <View
        style={{
          width: 50,
          height: 50,
          borderWidth: 6,
          borderRadius: 100,
          borderColor: color,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20
        }}
      >
        <Image source={data} style={fastyles.menuIcon} resizeMode="contain" />
      </View>
    );
  }

  renderView(data, dataValue) {
    const low = metaHelpers.findElement(SCREEN_KEY_HEALTH_CHECK_REPORT, KEY_LOW)
      .label;

    const medium = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_MEDIUM
    ).label;

    const high = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_HIGH
    ).label;

    const ok = metaHelpers.findElement(SCREEN_KEY_HEALTH_CHECK_REPORT, KEY_OK)
      .label;

    const unknown = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_UNKNOWN
    ).label;

    const moderate = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_MODERATE
    ).label;

    const alert = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_ALERT
    ).label;

    let color, textValue;
    if (data == "LOW") {
      color = colors.green;
      textValue = dataValue + low;
    } else if (data == "MEDIUM") {
      color = colors.orange;
      textValue = dataValue + medium;
    } else if (data == "HIGH") {
      color = colors.red;
      textValue = dataValue + high;
    } else if (data == "OK") {
      color = colors.green;
      textValue = dataValue + ok;
    } else if (data == "UNKNOWN") {
      color = colors.nevada;
      textValue = dataValue + unknown;
    } else if (data == "MODERATE") {
      color = colors.orange;
      textValue = dataValue + moderate;
    } else if (data == "ALERT") {
      color = colors.red;
      textValue = dataValue + alert;
    }
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ marginLeft: 20 }}>
          <Icon name="check-circle" size={20} color={color} />
        </View>
        <View>
          <Text style={{
            ...styles.minText,
            ...configureLineHeight("14")
            }}>{textValue}</Text>
        </View>
      </View>
    );
  }

  renderhealthAssesmentText() {
    const incompletetext = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_INCOMPLETE
    ).label;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 10
        }}
      >
        <View style={{ marginLeft: 20 }}>
          <Icon name="minus-circle" size={20} color={colors.nevada} />
        </View>
        <View>
          <Text style={{
            ...styles.minText,
            ...configureLineHeight("14")
            }}>{incompletetext}</Text>
        </View>
      </View>
    );
  }

  renderAvailableDataList(data) {
    let name = "minus-circle";
    let color = colors.nevada;
    const { value, range } = data;
    const valueRange = find(
      range => range.min <= value && range.max >= value,
      range
    );
    if (valueRange) {
      color = statusColorCode[valueRange.status];
      name = "check-circle";
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        <View style={{ marginLeft: 20 }}>
          <Icon name={name} size={20} color={color} />
        </View>
        <View>
          <Text style={[styles.minText, styles.normalTex, {...configureLineHeight("15")}]}>
            {data.component1}
          </Text>
        </View>
      </View>
    );
  }

  renderCategoryDetails(name, data) {
    if (data.categoriesDetails != undefined) {
      if (data.categoriesDetails[0].id == "ACTIVITY") {
        data = this.props.getActivityDetailsData;
      } else if (data.categoriesDetails[0].id == "NUTRITION") {
        data = this.props.getNutritionDetailsData;
      } else {
        data = this.props.getMoodDetailsData;
      }
    }
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text style={[styles.healthReportStyle, { marginBottom: 10, ...configureLineHeight("15")  }]}>
          {name}
        </Text>
        <Text style={{
          ...styles.normalTex,
          ...configureLineHeight("15")
          }}>
          {data.categoriesDetails[0].overview}
        </Text>
        {data.categoriesDetails[0].healthMatrics != undefined &&
          data.categoriesDetails[0].dataAvailability != "MISSING" && (
            <View>
              {data.categoriesDetails[0].healthMatrics.hasOwnProperty(
                "selfAccess"
              ) ? (
                  data.categoriesDetails[0].healthMatrics.selfAccess.items.map(
                    res => (
                      <View style={{ marginTop: 10 }}>
                        {this.renderAvailableDataList(res)}
                      </View>
                    )
                  )
                ) : (
                  <View />
                )}
            </View>
          )}
      </View>
    );
  }

  rendermakeChange(data) {
    const keepituplable = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_KEEP_IT_UP
    ).label;

    const makechangelabel = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_MAKE_CHANGE
    ).label;

    let keepItUp = false;
    let makeAchange = false;
    if (data.hasOwnProperty("action")) {
      for (let i = 0; i < data.action.length; i++) {
        if (data.action[i].compoenent3 == "MAINTAIN") {
          keepItUp = true;
        } else if (data.action[i].compoenent3 == "IMPROVE") {
          makeAchange = true;
        }
      }
    }
    return (
      <View>
        {keepItUp && (
          <Text
            style={{
              fontFamily:
                Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
              color: "#A9A9A9",
              fontSize: 20,
              textAlign: "center",
              ...configureLineHeight("22")
            }}
          >
            {keepituplable}
          </Text>
        )}
        {data.hasOwnProperty("action") ? (
          data.action.map(action =>
            action.compoenent3 == "MAINTAIN" ? (
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
              color: "#A9A9A9",
              fontSize: 20,
              textAlign: "center",
              ...configureLineHeight("22")
            }}
          >
            {makechangelabel}
          </Text>
        )}
        {data.hasOwnProperty("action") ? (
          data.action.map(action =>
            action.compoenent3 == "IMPROVE" ? (
              <MakeChange actions={action} />
            ) : (
                <View />
              )
          )
        ) : (
            <View />
          )}
      </View>
    );
  }

  renderDiseaseRisk(data) {
    if (data.dataAvailability != "MISSING") {
      return (
        <View>
          {data.healthMatrics != undefined && (
            <View>
              {data.healthMatrics != null && (
                <View>
                  {data.healthMatrics.hasOwnProperty("diseaseRisk") ? (
                    data.healthMatrics.diseaseRisk.items.map((res, index) => (
                      <View key={index}>
                        <DiseaseRisk
                          risks={res}
                          {...this.props}
                          name="report"
                          viewMore={this.viewMore}
                        />
                        {res.conditionId == this.state.conditionId && (
                          <View>
                            <DiseaseDetails
                              conditionId={this.state.conditionId}
                              showBack={false}
                              fromReport="fromReport"
                            />
                          </View>
                        )}
                      </View>
                    ))
                  ) : (
                      <View />
                    )}
                </View>
              )}
            </View>
          )}
        </View>
      );
    }
  }

  horizontalLine() {
    return <View style={fastyles.horizontalLine} />;
  }

  Capitalize(str) {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    return capital;
  }

  getStatusColor(status) {
    switch (status) {
      case "OK":
        return colors.green;
      case "MODERATE":
        return colors.orange;
      case "ALERT":
        return colors.red;
      case "CRITICAL":
        return colors.red;
      case "PREVIOUSLY_DIAGNOSED":
        return colors.bondiBlue;
      case "CURRENTLY_DIAGNOSED":
        return colors.bondiBlue;
      default:
        return colors.nevada;
    }
  }

  loadOrganList(data) {
    return (
      <View>
        {data.categoriesDetails != undefined && (
          <View>
            {data.categoriesDetails.map(res => (
              <View key={res.id} style={{ flex: 1, marginTop: 10 }}>
                <Text style={{
                  ...styles.subHeaderTextStyle,
                  ...configureLineHeight("15")
                  }}>{res.name}</Text>

                <View style={{ flex: 1, flexDirection: "row", margin: 15 }}>
                  <Icon
                    name={
                      res.dataAvailability != "MISSING"
                        ? "check-circle"
                        : "minus-circle"
                    }
                    size={20}
                    color={
                      res.dataAvailability != "MISSING"
                        ? this.getStatusColor(res.status)
                        : colors.nevada
                    }
                  />
                  <Text style={{
                    ...styles.overView,
                    ...configureLineHeight("14")
                    }}>{res.overview}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  roundNumber = num => {
    num = Math.round(num * 100 * 100) / 100;
    num = num.toFixed(2);
    return num;
  };

  loadPieChart() {
    const { getHealthReportRespons } = this.props;
    const scoreArray = [];
    const scoreValue = [];
    let okValue = 0;
    if (getHealthReportRespons.score.OK != undefined) {
      scoreArray.push(colors.green);
      scoreValue.push(getHealthReportRespons.score.OK * 100);
      okValue = getHealthReportRespons.score.OK * 100;
    }
    if (getHealthReportRespons.score.ALERT != undefined) {
      scoreArray.push(colors.red);
      scoreValue.push(getHealthReportRespons.score.ALERT * 100);
    }
    if (getHealthReportRespons.score.MODERATE != undefined) {
      scoreArray.push(colors.orange);
      scoreValue.push(getHealthReportRespons.score.MODERATE * 100);
    }
    if (getHealthReportRespons.score.UNKNOWN != undefined) {
      scoreArray.push(colors.greyColor);
      if (Platform.OS == "ios") {
        scoreValue.push(getHealthReportRespons.score.UNKNOWN * 100);
      } else {
        scoreValue.push(getHealthReportRespons.score.UNKNOWN * 100);
      }
    }
    if (getHealthReportRespons.score.CRITICAL != undefined) {
      scoreArray.push(colors.red);
      scoreValue.push(getHealthReportRespons.score.CRITICAL * 100);
    }
    if (getHealthReportRespons.score.PREVIOUSLY_DIAGNOSED != undefined) {
      scoreArray.push(colors.nevada);
      scoreValue.push(getHealthReportRespons.score.PREVIOUSLY_DIAGNOSED * 100);
    }
    if (getHealthReportRespons.score.CURRENTLY_DIAGNOSED != undefined) {
      scoreArray.push(colors.bondiBlue);
      scoreValue.push(getHealthReportRespons.score.CURRENTLY_DIAGNOSED * 100);
    }
    const okScore = getHealthReportRespons.score.OK
      ? getHealthReportRespons.score.OK
      : 0;
    const modeScore = getHealthReportRespons.score.MODERATE
      ? getHealthReportRespons.score.MODERATE
      : 0;
    const alertScore = getHealthReportRespons.score.ALERT
      ? getHealthReportRespons.score.ALERT
      : 0;

    const TotalValue =
      okScore + modeScore + alertScore > 1
        ? 1
        : okScore + modeScore + alertScore;
    return (
      <View style={peiStyles.container}>
        <Pie
          radius={80}
          innerRadius={74}
          series={scoreValue}
          colors={scoreArray}
        />
        <View style={peiStyles.gauge}>
          {/* <Text style={peiStyles.gaugeText}>{Math.floor(okValue*10 )/10}%</Text> */}
          <Text style={{
            ...peiStyles.gaugeText,
            ...configureLineHeight("24")
            }}>
            {/* {Math.floor(okValue*10 )/10==Math.floor(okValue )?Math.floor(okValue )+".0":Math.floor(okValue*10 )/10} */}
            {this.roundNumber(okScore)}%
          </Text>
        </View>
      </View>
    );
  }

  getStatus(status) {
    switch (status) {
      case "OK":
        return fastyles.greenCircle;
      case "MODERATE":
        return fastyles.orangeCircle;
      case "ALERT":
        return fastyles.redCircle;
      case "CRITICAL":
        return fastyles.redCircle;
      case "PREVIOUSLY_DIAGNOSED":
        return fastyles.nevadaCircle;
      case "CURRENTLY_DIAGNOSED":
        return fastyles.blueCircle;
      case "UNKNOWN":
        return fastyles.greyCircle;
      default:
        return fastyles.defaultCircle;
    }
  }

  loadPieChartData() {
    const { getHealthReportRespons } = this.props;

    const guidelines = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_GUIDELINES
    ).label;

    const riskresult = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_RISK_RESULT
    ).label;

    const moderateresult = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_MODERATE_RESULT
    ).label;

    const currentlydiagnosedresult = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_CURRENTLY_DIAGNOSED_RESULT
    ).label;

    const preexistingresult = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_PRE_EXISTING_RESULT
    ).label;

    const unknownresult = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_UNKNOWN_RESULT
    ).label;

    const { score } = getHealthReportRespons;

    const scoreCategories = [
      "OK",
      "ALERT",
      "CRITICAL",
      "MODERATE",
      "CURRENTLY_DIAGNOSED",
      "PREVIOUSLY_DIAGNOSED",
      "UNKNOWN"
    ];
    const categoryTexts = [
      guidelines,
      riskresult,
      riskresult,
      moderateresult,
      currentlydiagnosedresult,
      preexistingresult,
      unknownresult
    ];
    let counter = 0;
    scoreCategories.forEach((category, index) => {
      if (score[category] > 0) {
        counter++;
      }
    });
    let totalScore = 0;
    const scoreCategoryComponents = [];
    scoreCategories.forEach((category, idx) => {
      let categoryScore = score[category]
        ? this.roundNumber(score[category])
        : 0;
      if (categoryScore > 0) {
        counter--;
        if (counter === 0) {
          categoryScore = (Math.round((100 - totalScore) * 100) / 100).toFixed(
            2
          );
        }
        totalScore += Number(categoryScore);
        scoreCategoryComponents.push(
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "center",
              margin: 20
            }}
          >
            <View style={this.getStatus(category)} />
            <Text
              style={{
                marginLeft: 10,
                color: "#6b6a6d",
                fontSize: 13.3,
                lineHeight: 15.6,
                fontFamily:
                  Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
                ...configureLineHeight("14")
              }}
            >
              {categoryScore}
              {categoryTexts[idx]}
            </Text>
          </View>
        );
      }
    });

    return scoreCategoryComponents;
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      getNutritionDetailsData,
      getActivityDetailsData,
      getMoodDetailsData,
      getHealthReportRespons,
      getOrganResponse
    } = this.props;
    let showView = false;
    if (
      getNutritionDetailsData.categoriesDetails != null &&
      getActivityDetailsData.categoriesDetails != null &&
      getMoodDetailsData.categoriesDetails != null &&
      getHealthReportRespons.score != null &&
      getOrganResponse.categoriesDetails != null
    ) {
      showView = true;
    }

    const healthcheckscore = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_HEALTH_CHECK_SCORE
    ).label;

    const completedinformation = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_COMPLETED_INFORMATION
    ).label;

    const summary = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_SUMMARY
    ).label;

    const activity = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_ACTIVITY
    ).label;

    const mood = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_MOOD
    ).label;

    const nutrition = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_NUTRITION
    ).label;

    const moredetail = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_MORE_DETAIL
    ).label;

    const diseasaerisk = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_DISEASE_RISK
    ).label;

    const comparewithother = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_COMPARE_WITH_OTHERS
    ).label;

    const outof = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_OUT_OF
    ).label;

    const organhealth = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_ORGAN_HEALTH
    ).label;

    const organresult = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_ORGAN_RESULT
    ).label;

    const organhealthlabel = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_ORGAN_HEALTH_LABEL
    ).label;

    const optimise = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_OPTIMISE
    ).label;

    const optimdiseaserisklistise = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_DISEASE_RISK_LIST
    ).label;

    const riskcomparision = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_RISK_COMPARISION
    ).label;

    const remember = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_REMEMBER
    ).label;

    const advicefromdoctor = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_ADVICE_FROM_DOCTOR
    ).label;

    const serialActivity = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_SERIAL_ACTIVITY
    ).label;

    const serialNutrition = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_SERIAL_NUTRITION
    ).label;

    const serialMood = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_REPORT,
      KEY_SERIAL_MOOD
    ).label;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {showView && (
            <View style={{ flex: 1, margin: 20 }}>
              <View style={styles.pieChartWrapper}>
                <View style={styles.textLogo}>
                  <Text style={{
                    ...styles.peiChatHeader,
                    ...configureLineHeight("22")
                    }}>{healthcheckscore}</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={{
                    ...styles.peiChatTextStyle,
                    ...configureLineHeight("15")
                    }}>
                    {completedinformation}
                  </Text>
                </View>
                {this.loadPieChart()}
                {this.loadPieChartData()}
              </View>
              <Text style={{
                ...styles.healthReportStyle,
                ...configureLineHeight("15")
                }}>{summary}</Text>
              <Text
                style={{
                  marginTop: 10,
                  color: "#6b6a6d",
                  fontSize: 13.3,
                  lineHeight: 15.6,
                  fontFamily:
                    Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
                    ...configureLineHeight("14")
                }}
              >
                {moredetail}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 20,
                  alignContent: "center"
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent: "center",
                    marginLeft: 10
                  }}
                >
                  {this.renderIcon(
                    NUTRITION,
                    getNutritionDetailsData.categoriesDetails[0].status
                  )}
                  <Text style={[styles.normalTex, { marginLeft: 20, ...configureLineHeight("15") }]}>
                    {nutrition}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent: "center",
                    marginLeft: 10
                  }}
                >
                  {this.renderIcon(
                    ACTIVITY,
                    getActivityDetailsData.categoriesDetails[0].status
                  )}
                  <Text style={[styles.normalTex, { marginLeft: 20, ...configureLineHeight("15") }]}>
                    {activity}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: 10
                  }}
                >
                  {this.renderIcon(
                    MOOD,
                    getMoodDetailsData.categoriesDetails[0].status
                  )}
                  <Text style={[styles.normalTex, { marginLeft: 20, ...configureLineHeight("15") }]}>
                    {mood}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, margin: 5 }}>
                <Text style={{
                  ...styles.headerTextStyle,
                  ...configureLineHeight("15")
                  }}>{diseasaerisk}</Text>
                <Text style={[styles.normalTex, { marginTop: 5, ...configureLineHeight("15") }]}>
                  {outof}{" "}
                  {getHealthReportRespons.diseaseRisk.numberOfDiseaseRisks}{" "}
                  {comparewithother}{" "}
                </Text>
              </View>
              {getHealthReportRespons.diseaseRisk.summary.LOW != null && (
                <View style={{ marginTop: 5 }}>
                  {this.renderView(
                    "LOW",
                    getHealthReportRespons.diseaseRisk.summary.LOW
                  )}
                </View>
              )}
              {getHealthReportRespons.diseaseRisk.summary.MEDIUM != null && (
                <View style={{ marginTop: 10 }}>
                  {this.renderView(
                    "MEDIUM",
                    getHealthReportRespons.diseaseRisk.summary.MEDIUM
                  )}
                </View>
              )}
              {getHealthReportRespons.diseaseRisk.summary.HIGH != null && (
                <View style={{ marginTop: 10 }}>
                  {this.renderView(
                    "HIGH",
                    getHealthReportRespons.diseaseRisk.summary.HIGH
                  )}
                </View>
              )}
              {getHealthReportRespons.diseaseRisk.incompleteAssessment && (
                <View>{this.renderhealthAssesmentText()}</View>
              )}
              <View style={{ flex: 1, marginTop: 20, marginLeft: 5 }}>
                <Text style={{
                  ...styles.headerTextStyle,
                  ...configureLineHeight("15")
                  }}>{organhealthlabel}</Text>
                <Text style={[styles.normalTex, { marginTop: 5, ...configureLineHeight("15") }]}>
                  {organresult}
                </Text>
              </View>

              {getHealthReportRespons.organHealth.summary.OK != null && (
                <View style={{ marginTop: 10, flex: 1 }}>
                  {this.renderView(
                    "OK",
                    getHealthReportRespons.organHealth.summary.OK
                  )}
                </View>
              )}

              {getHealthReportRespons.organHealth.summary.ALERT != null && (
                <View style={{ flex: 1, marginTop: 10 }}>
                  {this.renderView(
                    "ALERT",
                    getHealthReportRespons.organHealth.summary.ALERT
                  )}
                </View>
              )}

              {getHealthReportRespons.organHealth.summary.UNKNOWN != null && (
                <View style={{ flex: 1, marginTop: 10 }}>
                  {this.renderView(
                    "UNKNOWN",
                    getHealthReportRespons.organHealth.summary.UNKNOWN
                  )}
                </View>
              )}

              {getHealthReportRespons.organHealth.summary.MODERATE != null && (
                <View style={{ flex: 1, marginTop: 10 }}>
                  {this.renderView(
                    "MODERATE",
                    getHealthReportRespons.organHealth.summary.MODERATE
                  )}
                </View>
              )}

              {getHealthReportRespons.organHealth.incompleteAssessment && (
                <View>{this.renderhealthAssesmentText()}</View>
              )}
              <View>
                {this.renderCategoryDetails(
                  serialActivity,
                  this.props.getActivityDetailsData
                )}
                {this.rendermakeChange(
                  this.props.getActivityDetailsData.categoriesDetails[0]
                )}
              </View>
              {this.renderCategoryDetails(
                serialNutrition,
                this.props.getNutritionDetailsData
              )}
              {this.rendermakeChange(
                this.props.getNutritionDetailsData.categoriesDetails[0]
              )}
              {this.renderCategoryDetails(
                serialMood,
                this.props.getMoodDetailsData
              )}
              {this.rendermakeChange(
                this.props.getMoodDetailsData.categoriesDetails[0]
              )}

              {getOrganResponse != null && (
                <View style={{ flex: 1, marginTop: 20 }}>
                  <Text style={{
                    ...styles.healthReportStyle,
                    ...configureLineHeight("15")
                    }}>{organhealth}</Text>
                  <Text style={[styles.normalTex, { marginTop: 10, ...configureLineHeight("15") }]}>
                    {optimise}
                  </Text>
                  {this.loadOrganList(getOrganResponse)}
                </View>
              )}

              <View style={{ flex: 1, marginTop: 20, alignContent: "center" }}>
                <Text style={{
                  ...styles.healthreportMain,
                  ...configureLineHeight("15")
                  }}>
                  {optimdiseaserisklistise}
                </Text>
                <Text style={{
                  ...styles.normalTex,
                  ...configureLineHeight("15")
                  }}>{riskcomparision}</Text>

                <Text
                  style={{
                    fontFamily:
                      Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
                    marginTop: 10,
                    color: "#68737a",
                    fontSize: 13.3,
                    lineHeight: 15.6,
                    marginBottom: 10,
                    ...configureLineHeight("14")
                  }}
                >
                  {remember}
                </Text>

                <Text style={{
                  ...styles.normalTex,
                  ...configureLineHeight("15")
                  }}>{advicefromdoctor}</Text>
                {getOrganResponse.categoriesDetails.map(res => (
                  <View>{this.renderDiseaseRisk(res)}</View>
                ))}
                {this.renderDiseaseRisk(
                  getActivityDetailsData.categoriesDetails[0]
                )}
                {this.renderDiseaseRisk(
                  getNutritionDetailsData.categoriesDetails[0]
                )}
                {this.renderDiseaseRisk(
                  getMoodDetailsData.categoriesDetails[0]
                )}
              </View>
            </View>
          )}
        </ScrollView>
        {!showView && (
          <View style={styles.acivityIndicator}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    nutritionData: state.healthCheck.nutritionData,
    getNutritionDetailsData: state.healthCheck.nutritionDetails,
    getActivityDetailsData: state.healthCheck.acivityDetails,
    getMoodDetailsData: state.healthCheck.moodDetails,
    getHealthReportRespons: state.healthCheck.healthReport,
    getOrganResponse: state.healthCheck.organDetails,
    meta: state.meta,
    healthCheckTab: state.healthCheck.healthCheckTab,
    language: state.userPreferences.language
  };
};

export default connect(mapStateToProps, {
  getHealthCategories: () => ({
    context: pageKeys.HEALTH_ASSESSMENT_REPORT,
    type: CoreActionTypes.FETCH_HEALTH_CATEGORIES
  }),
  getHealthCategoriesById: healthCategory => ({
    context: pageKeys.HEALTH_ASSESSMENT_REPORT,
    type: CoreActionTypes.FETCH_HEALTH_CATEGORIES_BY_ID,
    payload: {
      healthCategory
    }
  }),
  getHealthReport: () => ({
    context: pageKeys.HEALTH_ASSESSMENT_REPORT,
    type: CoreActionTypes.FETCH_HEALTH_REPORT
  }),
  getNutritionResponse: payload => ({
    type: CoreActionTypes.GET_HEALTH_NUTRITION_DETAILS,
    payload
  }),
  getActivityResponse: payload => ({
    type: CoreActionTypes.GET_HEALTH_ACTIVITY_DETAIL,
    payload
  }),
  getHealthOrganDetailsResponse: payload => ({
    type: CoreActionTypes.GET_HEALTH_ORGAN_RESPONSE,
    payload
  }),
  getMoodResponse: payload => ({
    type: CoreActionTypes.GET_HEALTH_MOOD_DETAIL,
    payload
  }),
  dispatchEvent
})(Report);
const peiStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    margin: 20
  },
  gauge: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    position: "absolute",
    width: 100
  },
  gaugeText: {
    backgroundColor: "transparent",
    color: "#68737a",
    fontSize: 24,
    marginTop: 50
  }
});
