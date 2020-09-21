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
} = CoreActions

const {
  INSAAN_HOME_TILE,
  INSAAN_PRAYERTIME,
  INSAAN_GETSTARTED,
  KEEP_TRACK,
  NEVER_MISS_PRAYER

} = CoreConfig;

class InsaanHomeTile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      compassVisible: false,
      currentTime: "",
      currentTimeFull: "",
      tiem: "123",
      Qubla: "0",
      Qubla1: "000",
      Direction: "",
      countDown: "--:--:--",
    };
    this.spinValue = new Animated.Value(0);
    this.spinValue1 = new Animated.Value(0);
  }

  componentDidMount() {
    let { token, userPreferences } = this.props;
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

    this.translateInsaanDate();

    ReactNativeHeading.start(1)
      .then(didStart => {
      })
    DeviceEventEmitter.addListener('headingUpdated', data => {
      data = Platform.OS === 'android' ? data : data.heading;
      this.spin(parseInt(data));
      this.spin1(parseInt(data));
      this.setState({
        Qubla: data
      });
    });

    if (Platform.OS == "android") {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(res => {

        if (res) {
          this.getGeolocationCompass();
        } else {
          this.requestLocationPermission();
        }
      }, err => {

      });
    } else {
      this.getGeolocationCompass();
    }
  }

  getGeolocationCompass() {
    // Geolocation.watchPosition(location => {

    let { userPreferences } = this.props;

    let Direction = this.computeAzimuth(
      {
        latitude: userPreferences.Latitude,
        longitude: userPreferences.Longitude
      },
      {
        latitude: 21.45,
        longitude: 39.81666667
      }
    );
    this.setState({
      Direction: Number(Direction)
    });

    const options = {
      enableHighAccuracy: Platform.OS == "ios",
      timeout: 5000,
      maximumAge: 0
    };
    Geolocation.getCurrentPosition(response => {
      const coords = response.coords;
      let Direction = this.computeAzimuth(
        {
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        {
          latitude: 21.45,
          longitude: 39.81666667
        }
      );
      this.setState({
        Direction: Number(Direction)
      });
    }, err => {

    });
  }


  computeAzimuth(la1, la2) {
    ;
    // Alert.alert(la1.latitude + " " + la1.longitude);
    var lat1 = la1.latitude,
      lon1 = la1.longitude,
      lat2 = la2.latitude,
      lon2 = la2.longitude;
    var result = 0.0;

    var ilat1 = parseInt(0.5 + lat1 * 360000.0);
    var ilat2 = parseInt(0.5 + lat2 * 360000.0);
    var ilon1 = parseInt(0.5 + lon1 * 360000.0);
    var ilon2 = parseInt(0.5 + lon2 * 360000.0);

    lat1 = this.toRadians(lat1);
    lon1 = this.toRadians(lon1);
    lat2 = this.toRadians(lat2);
    lon2 = this.toRadians(lon2);

    if (ilat1 == ilat2 && ilon1 == ilon2) {
      return result;
    } else if (ilon1 == ilon2) {
      if (ilat1 > ilat2) result = 180;
    } else {
      var c = Math.acos(
        Math.sin(lat2) * Math.sin(lat1) +
        Math.cos(lat2) * Math.cos(lat1) * Math.cos(lon2 - lon1)
      );
      var A = Math.asin((Math.cos(lat2) * Math.sin(lon2 - lon1)) / Math.sin(c));
      result = this.toDegrees(A);
      if (ilat2 > ilat1 && ilon2 > ilon1) {
      } else if (ilat2 < ilat1 && ilon2 < ilon1) {
        result = 180 - result;
      } else if (ilat2 < ilat1 && ilon2 > ilon1) {
        result = 180 - result;
      } else if (ilat2 > ilat1 && ilon2 < ilon1) {
        result += 360;
      }
    }
    return result;
  }

  toRadians = res => {
    return (res / 180) * Math.PI;
  };
  toDegrees = angrad => {
    return (angrad * 180.0) / Math.PI;
  };

  spin = target => {
    this.spinValue.setValue(0);
    this.setState({
      Qubla1: target
    });
    Animated.timing(this.spinValue, {
      toValue: -Number(target), // 最终值 为1，这里表示最大旋转 360度
      duration: 0
    }).start();
  };
  spin1 = target => {
    this.spinValue1.setValue(0);

    Animated.timing(this.spinValue1, {
      toValue: -Number(target + this.state.Direction - 230), // 最终值 为1，这里表示最大旋转 360度
      duration: 0
    }).start();
  };

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
    let currentTimeFull = day + ", " + date + " " + month;

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


  _fectchNotificationConfigForType(type) {
    const { userPreferences } = this.props;
    const scheduled = userPreferences.scheduledNotifications[0]
      ? userPreferences.scheduledNotifications[0]
      : {};
    const key = type;
    const preValue = scheduled[key];

    return preValue ? preValue.isOn : false;
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


  _toggleNotificationStateForType(type) {
    let list = {};
    const listPre = this.props.userPreferences.scheduledNotifications[0];
    list = listPre ? listPre : {};
    const key = type;
    list[key]["isOn"] = false
    this.props.updateScheduledNotification([list]);
    if (Platform.OS == "ios") {
      NotificationTool.reScheduleAllInsaanNotificationForWeek(list);
    } else {
      NotificationTool.reScheduleAllInsanNotificationForWeek(list);
    }
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


  getInsanEnter = () => {
    const spin = this.spinValue.interpolate({
      inputRange: [-360, 359],
      outputRange: ["-360deg", "359deg"]
    });
    const spin1 = this.spinValue1.interpolate({
      inputRange: [-360, 359],
      outputRange: ["-360deg", "359deg"]
    });
    const {
      compassActionHandler
    } = this.props;
    const KeepTrack = metaHelpers.findElement(INSAAN_HOME_TILE, KEEP_TRACK).label;
    const NeverMissPrayer = metaHelpers.findElement(INSAAN_HOME_TILE, NEVER_MISS_PRAYER).label;
    let { currentTime, currentTimeFull } = this.state;
    const { navigation, userPreferences, userIcon, } = this.props;
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

    if (!userPreferences.isShowInsan) {
      return null;
    } else {
      if (!userPreferences.isShowInsaanCard) {
        return (
          <ImageBackground
            style={styles.backgroundStyle}
            source={{ uri: "https://apidev.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/8f05f3dd-590c-487a-bb1e-9b895ec714fc?namespace=MY" }}

          >
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        compassVisible: true
                      });
                    }}
                  >
                    <View
                      style={styles.compassStyle}
                    >
                      <Animated.Image
                        style={{
                          width: 50,
                          height: 50,
                          position: "absolute",
                          transform: [{ rotate: spin }]
                        }}
                        source={INSAAN_COMPASS}
                      />
                      <Animated.Image
                        style={{
                          position: "absolute",
                          width: 5,
                          height: 30,
                          transform: [{ rotate: spin1 }]
                        }}
                        source={INSAAN_PIN}
                      />

                      <Image
                        style={styles.fixedStyle}
                        source={INSAAN_FIXED}
                      />
                    </View>

                  </TouchableOpacity>
                </View>
                <Text style={styles.prayerText}>{metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_PRAYERTIME).label}</Text>
              </View>

              <View style={styles.container1}>
                <View>
                  <Text style={styles.prayerTrackStyle}>
                    {KeepTrack}
                  </Text>
                  <Text style={styles.prayerTrackStyle}>
                    {NeverMissPrayer}
                  </Text>

                </View>
                <TouchableOpacity
                  onPress={() => {
                    Platform.OS == "ios"
                      ? this.getGeolocation()
                      : this.requestLocationPermission();

                    this.props.gotoPrayerTimeConventionsScreen();
                  }}
                  style={styles.button}>
                  <Text style={styles.prayerTrackStyle}>{metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_GETSTARTED).label}</Text>
                </TouchableOpacity>

              </View>

            </View>

          </ImageBackground>
        );
      } else {
        const type = this.getInsaanType(
          this.orderByPreaTime().currentPre &&
          this.orderByPreaTime().currentPre.split("+")[1]
        ).InsaanType;
        const status = this._fectchNotificationConfigForType(type);
        return (
          <InsaanCard
            nextPrayerTime={this.orderByPreaTime().currentPre}
            onCalendarPress={() => this.props.onCalendarPressHome(this.orderByPreaTime().currentPre)}
            nextPrayerType={
              this.getInsaanType(
                this.orderByPreaTime().currentPre &&
                this.orderByPreaTime().currentPre.split("+")[1]
              ).InsaanType
            }
            type={type}
            compassActionHandler={() => {
              this.setState({
                compassVisible: true
              });
            }}
            fullDate={currentTimeFull}
            date={currentTime}
            description={source ? source.islamicDate : " "}
            toggleRemindActionHandler={(type, status) => {
              if (!status) {
                this.props.gotoInsaanScheduleScreen();
              } else {
                // Toggle current type's notification to On
                this._toggleNotificationStateForType(type);
              }
            }}
          />
        );
      }
    }
  };

  render() {
    return (
      <View
        style={styles.modalContainer}
      >
        <View>{this.getInsanEnter()}</View>

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
                }}
              />
            </View>
          </View>
        </Modal>


      </View>
    );
  }
}


InsaanHomeTile.propTypes = {
  navigation: PropTypes.object,
  onCalendarPressHome: PropTypes.func,
  onDenyPress: PropTypes.func,
  compassActionHandler: PropTypes.func
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
})(InsaanHomeTile);