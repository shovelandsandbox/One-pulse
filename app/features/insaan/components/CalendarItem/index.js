/* eslint-disable */
import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { TextOnlyPropTypes } from "react-native-render-html/src/HTMLUtils";
import styles from "./styles";
var moment = require('../../../../utils/HijriDate/index.js')
import { connect } from 'react-redux'

class CalendarItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { year, month, day, daynumber, changeitem, cid, checkId } = this.props;
    let {
      conventionStateCode,
      conventionZoneCode,
      language
    } = this.props.userPreferences
    const { prayerTimeJakimIndex, prayerTimeOtherIndex } = this.props

    const currentTime = moment(`${year}-${month}-${daynumber}`, 'YYYY-MM-DD')
    const key = currentTime.format('YYYYMMDD')
    let islamicDay = ' '
    if (conventionStateCode && conventionZoneCode) {
      const data = prayerTimeJakimIndex[key]
      const islamicString = data ? data.islamicDate : null
      if (islamicString) {
        const islamicNumber = islamicString.split(' ')[0]
        islamicDay = islamicNumber
      }
    } else {
      const data = prayerTimeOtherIndex[key]
      const islamicString = data ? data.islamicDate : null
      if (islamicString) {
        const islamicNumber = islamicString.split(' ')[0]
        islamicDay = islamicNumber
      }
    }

    let days = "";

    switch (new Date().toString().split(" ")[0]) {
      case "Sun": days = language == "BM" ? "Aha" : "Sun"; break;
      case "Mon": days = language == "BM" ? "Isn" : "Mon"; break;
      case "Tue": days = language == "BM" ? "Sel" : "Tue"; break;
      case "Wed": days = language == "BM" ? "Rab" : "Wed"; break;
      case "Thu": days = language == "BM" ? "Kha" : "Thu"; break;
      case "Fri": days = language == "BM" ? "Jum" : "Fri"; break;
      case "Sat": days = language == "BM" ? "Sab" : "Sat"; break;
    }
    return (
      <TouchableOpacity onPress={() => changeitem(cid, `${year}-${month < 10 ? `0${month}` : month}-${daynumber}`)}
        style={[styles.shadow, checkId == cid ? styles.checked : styles.unchecked]}>

        <Text style={[styles.dayNumberText, { color: checkId == cid ? "#fff" : "#000000" }]}>
          {daynumber}
        </Text>


        {
          checkId == cid && day == days ?
            <Text style={checkId == cid ? styles.topchecked : styles.topunchecked}>
              {language == "BM" ? "Hari ini" : "Today"}
            </Text>
            : <Text style={checkId == cid ? styles.topchecked : styles.topunchecked}>
              {day}
            </Text>
        }

      </TouchableOpacity>
    );
  }
}

CalendarItem.propTypes = {
  day: TextOnlyPropTypes.string,
  daynumber: TextOnlyPropTypes.number,
  cid: TextOnlyPropTypes.number
};

const mapStateToProps = state => {

  return {
    userPreferences: state.userPreferences,
    prayerTimeJakimIndex: state.InsanReducer.prayerTimeJakimIndex,
    prayerTimeOtherIndex: state.InsanReducer.prayerTimeOtherIndex,
  };
};

export default connect(
  mapStateToProps
)(CalendarItem)