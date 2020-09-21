/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  Easing,
  TextInput,
  Alert,
  Keyboard,
  ImageBackground,
  WebView,
  PermissionsAndroid,
  Platform,
  DeviceEventEmitter
} from "react-native";
import * as ReactNativeHeading from 'react-native-heading';
import Geolocation from "Geolocation";
import {
  CLOSE_PAGE,
  INSAAN_COMPASS,
  INSAAN_FIXED,
  INSAAN_PIN,
  COMPASS_BACKGROUND,
  INSAAN_SCHEDULE_HEADER,
  PRAYER_CONVENTION_TILE
} from "../../../../config/images";
import {
  colors,
  CoreActionTypes,
  CoreConfig,
  CoreConstants,
  ElementErrorManager,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import { InsaanModalStyle as styles } from "./styles";


const { INSAAN_HOME_TILE, INSAAN_QIBLA } = CoreConfig;
import { connect } from "react-redux";

const INSAAN_TYPE_BEFORE_SUNRISE = "beforeSunrise";
const INSAAN_TYPE_SUNRISE = "sunrise";
const INSAAN_TYPE_NOON = "noon";
const INSAAN_TYPE_AFTERNOON = "afternoon";
const INSAAN_TYPE_SUNSET = "sunset";
const INSAAN_TYPE_NIGHT = "night";
const availableTypes = [
  INSAAN_TYPE_BEFORE_SUNRISE,
  INSAAN_TYPE_SUNRISE,
  INSAAN_TYPE_NOON,
  INSAAN_TYPE_AFTERNOON,
  INSAAN_TYPE_SUNSET,
  INSAAN_TYPE_NIGHT
];
import PropTypes from "prop-types";
import * as InsaanType from "../../configs/insaanTypes";
import moment from "moment";

class InsaanModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiem: "123",
      Qubla: "0",
      Qubla1: "000",
      Direction: "",
      countDown: "--:--:--",
    };
    this.spinValue = new Animated.Value(0);
    this.spinValue1 = new Animated.Value(0);
  }

  componentWillMount() {

    const { nextPrayerTime } = this.props;
    let _this = this;
    this.timer = setInterval(() => {
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

  componentDidMount() {
    // if (Platform.OS == "android") {
    ReactNativeHeading.start(1)
      .then(didStart => {
        // // Alert.alert(JSON.stringify(didStart));
      })
    DeviceEventEmitter.addListener('headingUpdated', data => {
      data = Platform.OS === 'android' ? data : data.heading;
      this.spin(parseInt(data));
      this.spin1(parseInt(data));
      this.setState({
        Qubla: data
      });
    });
    // }

    if (Platform.OS == "android") {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(res => {

        if (res) {
          this.getGeolocation();
        } else {
          this.requestLocationPermission();
        }
      }, err => {

      });
    } else {
      this.getGeolocation();
    }


  }

  getGeolocation() {
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

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        this.getGeolocation();
      } else {
      }
    } catch (err) {
    }
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


  render() {
    // let { currentDay } = this.state;
    let { userPreferences } = this.props;
    const { language } = userPreferences;

    let dates = new Date().toString().split(" ");
    let days = new Date().getDay().toString();
    let day = "";
    switch (days) {
      case "0": day = language == "BM" ? "Ahad" : "Sunday"; break;
      case "1": day = language == "BM" ? "Isnin" : "Monday"; break;
      case "2": day = language == "BM" ? "Selasa" : "Tuesday"; break;
      case "3": day = language == "BM" ? "Rabu" : "Wednesday"; break;
      case "4": day = language == "BM" ? "Khamis" : "Thursday"; break;
      case "5": day = language == "BM" ? "Jumaat" : "Friday"; break;
      case "6": day = language == "BM" ? "Sabtu" : "Saturday"; break;
    }

    let Qibla = metaHelpers.findElement(INSAAN_HOME_TILE, INSAAN_QIBLA).label;
    // if (Platform.OS == "android") {
    const patchPostMessageFunction = function () {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
      };

      window.postMessage = patchedPostMessage;
    };
    const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
    // }
    const { user, pwd, fadeAnim } = this.state;
    const { nextPrayerType, nextPrayerTime, onCloseAction } = this.props;
    var npts = " ";
    const targetTime = nextPrayerTime && nextPrayerTime.split("+")[0];
    if (targetTime != undefined) {
      const npth = parseInt(targetTime.split(":")[0]);
      const nptm = parseInt(targetTime.split(":")[1]);
      const display_npth = npth > 12 ? npth - 12 : npth;
      const npts_h = display_npth < 10 ? `${display_npth - 12 < 10 ? "0" : ""}${display_npth}` : `${display_npth < 10 ? "0" : ""}${display_npth}`;
      const npts_m = nptm < 10 ? `0${nptm}` : `${nptm}`;
      npts = `${npts_h}:${npts_m} ${npth >= 12 ? "PM" : "AM"}`;
    }
    //映射 0-1的值 映射 成 0 - 360 度
    const spin = this.spinValue.interpolate({
      inputRange: [-360, 359], //输入值
      outputRange: ["-360deg", "359deg"] //输出值
    });
    const spin1 = this.spinValue1.interpolate({
      inputRange: [-360, 359], //输入值
      outputRange: ["-360deg", "359deg"] //输出值
    });

    return (
      <View
        style={styles.container1}>
        <View
          style={styles.container2}
        >
          <ImageBackground
            style={styles.backgroundStyle}
            // source={COMPASS_BACKGROUND}
            source={{ uri: "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/f04a20bb-83c6-49cb-b7cb-7710fc8f3d6f?namespace=MY" }}
          >
            <View style={styles.container3}>
              {npts && npts.trim() !== "" ?
              <>
                <Text
                style={styles.prayerTypeText}
              >{InsaanType.displayNameForType(nextPrayerType)}</Text>

              <Text
                style={styles.nptsText}
              >
                {npts}, {`${day}`}
              </Text>
              </>
              : null }
            </View> 
            
            <TouchableOpacity
              style={styles.closeAction}
              onPress={() => {
                this.timer && clearTimeout(this.timer);
                onCloseAction && onCloseAction();
              }}
            >
              <Image
                style={styles.closeStyle}
                source={CLOSE_PAGE}
              />
            </TouchableOpacity>

            <View style={styles.container4}>
              <Text
                style={styles.countDownStyle}
              >
                {npts && npts.trim() !== "" ? this.state.countDown : ""}
              </Text>
             

              <View
                style={styles.compass}
              >
                <Animated.Image
                  style={{
                    width: 120,
                    height: 120,
                    position: "absolute",
                    transform: [{ rotate: spin }]
                  }}
                  source={INSAAN_COMPASS}
                />
                <Animated.Image
                  style={{
                    position: "absolute",
                    width: 20,
                    height: 120,
                    transform: [{ rotate: spin1 }]
                  }}
                  source={INSAAN_PIN}
                />

                <Image
                  style={styles.insaanFixed}
                  source={INSAAN_FIXED}
                />
              </View>

              <View>
                <Text
                  style={styles.qiblaStyle}
                >
                  {Qibla}: {parseInt(this.state.Direction)}°
                </Text>
              </View>
            </View>
          </ImageBackground>

        </View>
      </View>
    );
  }
}

InsaanModal.PropTypes = {
  onCloseAction: PropTypes.func,
  nextPrayerTime: PropTypes.string,
  nextPrayerType: PropTypes.string,
  day: PropTypes.string,
};


const mapStateToProps = state => {

  return {
    userPreferences: state.userPreferences
  };
};
export default connect(
  mapStateToProps
)(InsaanModal);
