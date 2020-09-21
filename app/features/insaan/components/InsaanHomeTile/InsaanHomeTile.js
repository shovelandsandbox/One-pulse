
/* eslint-disable */
import React, { PureComponent } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Animated,
  DeviceEventEmitter
} from "react-native";
import Geolocation from "Geolocation";
import InsaanCard from "../InsaanCard";
import InsaanModal from "../InsaanModal";
import { connect } from "react-redux";
import _ from "lodash";
import {
  HOME_TILE_COMPASS,
  INSAAN_COMPASS,
  INSAAN_FIXED,
  INSAAN_PIN,
} from '../../../../config/images'
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreActions,
  CoreSelectors,
  CoreUtils
} from "@pru-rt-internal/pulse-common";
import PropTypes from 'prop-types';
import moment from "moment";
import * as NotificationTool from "../../../../utils/NotificationScheduleTool";
import AppHeaderComponent from "../../../../components/AppHeader";
import * as InsaanType from "../../configs/insaanTypes";
import { InsaanHomeTile as styles } from "./styles";
import * as ReactNativeHeading from 'react-native-heading';
import LinearGradient from "react-native-linear-gradient";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import {
  getInsanZoneList,
  getPrayerTimeJAKIM,
  getPrayerTimeOtherconvention,
  gotoInsaanScheduleScreen,
  gotoPrayerTimeConventionsScreen,
} from '../../actions'

const {
  setLongitudeLatitude,
  updateScheduledNotification,
} = CoreActions;

const {
  INSAAN_HOME_TILE,
  INSAAN_PRAYERTIME,
  INSAAN_GETSTARTED,
  KEEP_TRACK,
  NEVER_MISS_PRAYER,
  INSAAN_NEXTPRAYERIN
} = CoreConfig;

class InsaanHomeTile extends PureComponent {
  constructor(props) {
    super(props);
    const { type } = props;
    this.state = {
      countDown: "--:--:--",
      currentTimeFull: "",
      currentTime: "",
      compassVisible: false,
    };
  }

  componentDidMount() {
    let { token, userPreferences, type } = this.props;
    if (type === "wrapper") {
      const {
        conventionStateCode,
        conventionZoneCode,
        Latitude,
        Longitude
      } = userPreferences;

      const date = new moment().format("YYYY-MM-DD");

      if (conventionStateCode && conventionZoneCode) {
        this.getPrayerTimeJAKIMFun(date);
      } else {
        if (Latitude && Longitude) {
          this.getPrayerTimeOtherconvention(Latitude, Longitude, date);
        }
      }

      this.props.getInsanZoneList({ token });
      this.props.dispatchEvent(events.InsaanTile);
    }

    if (this.props.type === "nextprayertime") {
      if (!this.timer) {

        let _this = this;
        this.timer = setInterval(() => {
          const nextPrayerTime = this.orderByPreaTime().currentPre;
          if (nextPrayerTime != undefined) {
            const tuple = nextPrayerTime.split("+")[0].split(":");
            const hour = parseInt(tuple[0]);
            const minu = parseInt(tuple[1]);

            var target = moment();
            target.set("hour", hour);
            target.set("minute", minu);
            target.set("second", 0);

            const current = moment();

            if (target.isBefore(current)) {
              target.set("d", current.get('d') + 1) // caculate for next day
            }

            const value = target.unix() - current.unix();
            const date = moment.unix(value);
            const h = Math.floor(value / 60 / 60);
            const m = Math.floor((value - h * 3600) / 60);
            const s = Math.floor(value - (h * 60 * 60 + m * 60));

            const hs = h < 10 ? `0${h}` : `${h}`;
            const ms = m < 10 ? `0${m}` : `${m}`;
            const ss = s < 10 ? `0${s}` : `${s}`;

            const fs = `${hs}:${ms}:${ss}`;

            _this.setState({
              countDown: fs
            });
          }
        }, 1000);
      }
    }

    if (type === "prayerDate") {
      this.translateInsaanDate();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getPrayerTimeJAKIMFun = fullDate => {
    let { token, userPreferences } = this.props;
    const { conventionZoneCode } = userPreferences;
    var date = String(new Date());
    var sign = date.indexOf("+");
    if (sign === -1) {
      sign = date.indexOf("-");
    }
    var zero = date.lastIndexOf("0") + 1;
    var timeZone = date.slice(sign, zero);
    this.props.getPrayerTimeJAKIM(
      {
        projs: null,
        filter: {
          simpleExpression: null,
          logicalExpression: {
            op: "AND",
            expressions: [
              {
                lhs: ["id"],
                op: "EQ",
                value: {
                  value: conventionZoneCode
                }
              },
              {
                lhs: ["convention"],
                op: "EQ",
                value: {
                  value: "JAKIM"
                }
              },
              {
                lhs: ["prayerDate"],
                op: "EQ",
                value: {
                  value: fullDate
                }
              },
              {
                lhs: ["timeZone"],
                op: "EQ",
                value: {
                  value: timeZone
                }
              }
            ]
          }
        },
        limit: null,
        orderBy: null
      },
      {
        realm: "prayerTimings",
        token: token
      }
    );
  };


  getPrayerTimeOtherconvention = (latitude, longitude, fullDate) => {
    let { token, userPreferences } = this.props;
    const conventionCode = userPreferences.conventionCode;
    var date = String(new Date());
    var sign = date.indexOf("+");
    if (sign === -1) {
      sign = date.indexOf("-");
    }
    var zero = date.lastIndexOf("0") + 1;
    var timeZone = date.slice(sign, zero);
    this.props.getPrayerTimeOtherconvention(
      {
        projs: null,
        filter: {
          simpleExpression: null,
          logicalExpression: {
            op: "AND",
            expressions: [
              {
                lhs: ["convention"],
                op: "EQ",
                value: {
                  value: conventionCode
                }
              },
              {
                lhs: ["prayerDate"],
                op: "EQ",
                value: {
                  value: fullDate
                }
              },
              {
                lhs: ["timeZone"],
                op: "EQ",
                value: {
                  value: timeZone
                }
              },
              {
                lhs: ["latitude"],
                op: "EQ",
                value: {
                  value: String(latitude)
                }
              },
              {
                lhs: ["longitude"],
                op: "EQ",
                value: {
                  value: String(longitude)
                }
              }
            ]
          }
        },
        limit: null,
        orderBy: null
      },
      {
        realm: "prayerTimings",
        token: token
      }
    );
  };


  translateInsaanDate = () => {
    let { userPreferences } = this.props;
    const { language } = userPreferences;

    let dates = new Date().toString().split(" ");
    let days = new Date().getDay().toString();
    let months = new Date().getMonth();
    let date = new Date().getDate();
    let day = "";
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    switch (months) {
      case 0: month = language == "BM" ? "Januari" : "January"; break;
      case 1: month = language == "BM" ? "Februari" : "February"; break;
      case 2: month = language == "BM" ? "Mac" : "March"; break;
      case 3: month = language == "BM" ? "April" : "April"; break;
      case 4: month = language == "BM" ? "Mei" : "May"; break;
      case 5: month = language == "BM" ? "Jun" : "June"; break;
      case 6: month = language == "BM" ? "Julai" : "July"; break;
      case 7: month = language == "BM" ? "Ogos" : "August"; break;
      case 8: month = language == "BM" ? "September" : "September"; break;
      case 9: month = language == "BM" ? "Oktober" : "October"; break;
      case 10: month = language == "BM" ? "November" : "November"; break;
      case 11: month = language == "BM" ? "Disember" : "December"; break;
    }

    switch (days) {
      case "0": day = language == "BM" ? "Ahad" : "Sunday"; break;
      case "1": day = language == "BM" ? "Isnin" : "Monday"; break;
      case "2": day = language == "BM" ? "Selasa" : "Tuesday"; break;
      case "3": day = language == "BM" ? "Rabu" : "Wednesday"; break;
      case "4": day = language == "BM" ? "Khamis" : "Thursday"; break;
      case "5": day = language == "BM" ? "Jumaat" : "Friday"; break;
      case "6": day = language == "BM" ? "Sabtu" : "Saturday"; break;
    }

    let currentTime = month + " " + year;
    let currentTimeFull = hours + ":" + minutes + ", " + day + ", " + date + " " + month;

    this.setState({
      currentTime,
      currentTimeFull
    });
  };

  _valuesOrderByTime(dict) {
    const array = [];
    const example = {};
    for (const key in dict) {
      if (key == "gregorianDate") {
        continue;
      }
      if (key == "islamicDate") {
        // islamicDate = dict[key]
        continue;
      }
      const v = dict[key];
      array.push(dict[key]);
      example[v] = key;
    }
    // Sort by asec
    array.sort();
    return { array, example };
  }

  getInsaanType = (key) => {
    switch (key) {
      case "subuhTime":
        return {
          InsaanName: "Fajr",
          InsaanType: InsaanType.INSAAN_TYPE_BEFORE_SUNRISE
        }
        break;
      case "syurukTime":
        return {
          InsaanName: "sunrise",
          InsaanType: InsaanType.INSAAN_TYPE_SUNRISE
        }
        break;
      case "zohorTime":
        return {
          InsaanName: "Dhuhdr",
          InsaanType: InsaanType.INSAAN_TYPE_NOON
        }
        break;
      case "asarTime":
        return {
          InsaanName: "Asr",
          InsaanType: InsaanType.INSAAN_TYPE_AFTERNOON
        }
        break;
      case "maghribTime":
        return {
          InsaanName: "Maghrib",
          InsaanType: InsaanType.INSAAN_TYPE_SUNSET
        }
        break;
      case "isyakTime":
        return {
          InsaanName: "Isha'a",
          InsaanType: InsaanType.INSAAN_TYPE_NIGHT
        }
        break;
      default:
        return {
          InsaanName: "Fajr",
          InsaanType: InsaanType.INSAAN_TYPE_BEFORE_SUNRISE
        }
        break;
    }
  }

  orderByPreaTime = () => {
    // Fetch prayer time datasource
    let { userPreferences } = this.props;
    let { conventionStateCode, conventionZoneCode } = userPreferences;
    const key = moment().format("YYYYMMDD");
    let source = null;
    if (conventionStateCode && conventionZoneCode) {
      source = this.props.prayerTimeJakimIndex[key]
        ? this.props.prayerTimeJakimIndex[key]
        : null;
    } else {
      source = this.props.prayerTimeOtherIndex[key]
        ? this.props.prayerTimeOtherIndex[key]
        : null;
    }
    // If no source fetched, skip process
    if (!source) {
      return false;
    }
    // Sorted time array
    const sortedTuple = this._valuesOrderByTime(source);
    // Example time
    let current = new moment();
    const times = sortedTuple.array;
    const dict = sortedTuple.example;
    let timeKey = times[0] || null;
    for (const idx in times) {
      if (times.hasOwnProperty(idx)) {
        const element = times[idx];
        const tuple = element.split(":");
        const sample = new moment();
        sample.set("H", tuple[0]);
        sample.set("m", tuple[1]);
        if (sample.isBefore(current)) {
          continue;
        }
        timeKey = element;
        break;
      }
    }
    const type = dict[timeKey];
    const currentPrayer = `${timeKey}+${type}`;
    return {
      currentPre: currentPrayer,
      nextPre: " + "
    };
  };

  getGeolocation() {
    Geolocation.getCurrentPosition(
      location => {
        this.props.setLongitudeLatitude({
          Longitude: location.coords.longitude,
          Latitude: location.coords.latitude
        });
      },
      () => { }
    );
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getGeolocation();
      } else {
        this.props.onDenyPress()
      }
    } catch (err) {
      console.warn(err);
    }
  }

  wrapperElement = () => {
    const { jsxStyles, children } = this.props;
    return <View style={jsxStyles.containerStyle}>{children}</View>;
  }

  nextPrayerTimeElement = () => {
    const { jsxStyles, labels } = this.props;
    return (
      <View style={[jsxStyles.centerBtnContainer, jsxStyles.nextEventDetails]}>
        <View>
          <Text style={[jsxStyles.buttonText, jsxStyles.nextEventLabel]}>
            {labels.nextPrayerIn}
          </Text>
          <Text style={[jsxStyles.buttonText, jsxStyles.nextEventText]}>
            {this.state.countDown}
          </Text>
        </View>
      </View>
    );
  }

  prayerTimeElement = () => {
    const { jsxStyles, contents } = this.props;
    const nextPrayerType = this.getInsaanType(
      this.orderByPreaTime().currentPre &&
      this.orderByPreaTime().currentPre.split("+")[1]
    ).InsaanType;
    return (
      <View>
        <View style={jsxStyles.timingsStyle}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                compassVisible: true
              });
              this.props.dispatchEvent(events.CompassClick);
            }}
          >
            <Image
              style={jsxStyles.compassStyle}
              source={{ uri: contents.compass }}
            />
          </TouchableOpacity>
          <Text style={[jsxStyles.buttonText, jsxStyles.nextEventText, { marginStart: 10 }]}>{InsaanType.displayNameForType(nextPrayerType)}</Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.compassVisible}
        >
          <View
            style={styles.modalView1}
          >
            <View
              style={styles.modalView2}
            >
              <InsaanModal
                nextPrayerTime={this.orderByPreaTime().currentPre}
                nextPrayerType={
                  this.getInsaanType(
                    this.orderByPreaTime().currentPre &&
                    this.orderByPreaTime().currentPre.split("+")[1]
                  ).InsaanType
                }
                onCloseAction={() => {
                  this.setState({
                    compassVisible: false
                  });
                  this.props.dispatchEvent(events.CompassModalCloseClick);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  islamicDateElement = () => {
    const { jsxStyles, userPreferences } = this.props;
    const { conventionStateCode, conventionZoneCode } = userPreferences;
    const key = moment().format("YYYYMMDD");
    let source = null;
    if (conventionStateCode && conventionZoneCode) {
      source = this.props.prayerTimeJakimIndex[key]
        ? this.props.prayerTimeJakimIndex[key]
        : null;
    } else {
      source = this.props.prayerTimeOtherIndex[key]
        ? this.props.prayerTimeOtherIndex[key]
        : null;
    }

    return (
      <View style={[jsxStyles.centerBtnContainer, jsxStyles.eventAddress]}>
        <Text style={[jsxStyles.subTitleText, jsxStyles.eventAddressText]}>
          {source && source.islamicDate}
        </Text>
      </View>
    );
  }

  prayerCalendarElement = () => {
    const { jsxStyles, labels } = this.props;
    return (
      <TouchableOpacity
        style={[jsxStyles.centerBtnContainer, jsxStyles.eventButton]}
        onPress={() => {
          this.props.goToInsaanSchedule({ params: { nextPrayerTime: this.orderByPreaTime().currentPre } });
          this.props.dispatchEvent(events.PrayerCalendarClick);
        }}
      >
        <Text style={[jsxStyles.subTitleText, jsxStyles.eventButtonText]}>
          {labels.prayerCalendar}
        </Text>
      </TouchableOpacity>);
  }

  getStartedElement = () => {
    const { jsxStyles, labels } = this.props;
    return (
      <View>
        <View style={jsxStyles.titleContainer}>
          <Text style={[{ marginTop: 62.3 }, jsxStyles.mainTileText]}>{labels.prayerTimeTitle}</Text>
          <View style={[jsxStyles.titleUnderline]} />
        </View>
        <View style={jsxStyles.descriptionContainer}>
          <Text style={[jsxStyles.subTitleText]}>{labels.prayerTimeDescription}</Text>
        </View>
        <TouchableOpacity
          style={[jsxStyles.buttonPosition, jsxStyles.buttonContainer]}
          onPress={
            () => {
              Platform.OS == "ios"
                ? this.getGeolocation()
                : this.requestLocationPermission();

              this.props.gotoPrayerTimeConventionsScreen();
              this.props.dispatchEvent(events.GetStartedClick);
            }
          }>
          <LinearGradient
            colors={["#ec1c2e", "#a21421"]}
            style={[jsxStyles.buttonGradient]}>
            <Text style={[jsxStyles.boldText, jsxStyles.buttonText, { padding: 5 }]}>{labels.prayerTimeGetStarted}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  prayerDateElement = () => {
    const { jsxStyles } = this.props;
    return (
      <Text style={[jsxStyles.subTitleText, jsxStyles.eventTime]}>
        {this.state.currentTimeFull}
      </Text>
    );
  }


  render() {
    const { type, userPreferences } = this.props;

    switch (type) {
      case "wrapper":
        return this.wrapperElement();
        break;
      case "nextprayertime":
        return userPreferences.isShowInsaanCard ? this.nextPrayerTimeElement() : null;
        break;
      case "prayertime":
        return userPreferences.isShowInsaanCard ? this.prayerTimeElement() : null;
        break;
      case "islamicDate":
        return userPreferences.isShowInsaanCard ? this.islamicDateElement() : null;
        break;
      case "prayerBtn":
        return userPreferences.isShowInsaanCard ? this.prayerCalendarElement() : null;
        break;
      case "prayerDate":
        return userPreferences.isShowInsaanCard ? this.prayerDateElement() : null;
        break;
      case "getStartedBtn":
        return !userPreferences.isShowInsaanCard ? this.getStartedElement() : null;
        break;
      default:
        break;
    }
  }
}


InsaanHomeTile.propTypes = {
}


const mapStateToProps = state => {
  return {
    userPreferences: state.userPreferences,
    userIcon: state.profile.profilePicture,
    token: state.auth.token,
    prayerTimeJAKIM: state.InsanReducer.prayerTimeJAKIM,
    prayerTimeOther: state.InsanReducer.prayerTimeOther,
    prayerTimeJakimIndex: state.InsanReducer.prayerTimeJakimIndex,
    prayerTimeOtherIndex: state.InsanReducer.prayerTimeOtherIndex,
  };
};

export default connect(mapStateToProps, {
  updateScheduledNotification,
  setLongitudeLatitude,
  getInsanZoneList,
  getPrayerTimeJAKIM,
  getPrayerTimeOtherconvention,
  gotoInsaanScheduleScreen,
  gotoPrayerTimeConventionsScreen,
  goToInsaanSchedule: (payload) => ({
    type: "GO_TO_SCREEN",
    navigateTo: "InsaanSchedule",
    payload: payload,
  }),
  dispatchEvent,
})(InsaanHomeTile);