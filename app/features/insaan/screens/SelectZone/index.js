import React, { Component, PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { BACK } from "../../../../config/images";
import SelectZoneItem from "../../components/SelectZoneItem";
import {SelectZoneStyle as styles} from "./styles"
import {
  CoreActions,
  CoreConfig,
  CoreActionTypes,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
import moment from "moment";
const { INSAAN_PRAYER_CONVENTION, INSAAN_SELECT_ZONE, INSAAN_CONFIRM } = CoreConfig;

import { connect } from "react-redux";
const helpers = metaHelpers;

const { 
  setInsanHomeCard,
  setConventionState,
  setConventionZone,
  setConvention 
} = CoreActions
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import {
  getPrayerTimeJAKIM,
} from '../../actions'

class SelectZone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      zoneArr: [
        {
          zoneCode: "789",
          zoneName: "Kuala Lumpur",
          isSelected: false
        },
        {
          zoneCode: "123",
          zoneName: "Zone1",
          isSelected: false
        },
        {
          zoneCode: "456",
          zoneName: "Zone2",
          isSelected: false
        }
      ],
      jakimzones: [],
      curid: "123",
      preZoneCode: "",
      preZoneName: "",
      preStateCode: "",
      preStateName: "",
      prejakimzones: [],
      isZoneSelected: false
    };
  }
  componentDidMount() {
    let jakimzones = this.props.navigation.state.params.selectName;
    this.setState({
      jakimzones
    });
    let { userPreferences } = this.props;
    this.setState({
      preZoneCode: userPreferences.conventionZoneCode,
      preZoneName: userPreferences.zoneName,
      preStateCode: userPreferences.conventionStateCode,
      preStateName: userPreferences.stateName,
      prejakimzones: userPreferences.jakimzones
    });
    this.props.dispatchEvent(events.ZoneScreen);
  }

  getPrayerTimeJAKIMFun = () => {
    let { token, userPreferences } = this.props;
    let conventionStateCode = userPreferences.conventionStateCode;
    let conventionZoneCode = userPreferences.conventionZoneCode;
    // : "KDH03"
    var timeZone = moment.parseZone(moment().format()).format('ZZ')
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
                  value: conventionZoneCode //stateName
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
                  value: moment().format("YYYY-MM-DD")
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

  onSelectZone = (id, item) => {
    this.setState({ isZoneSelected: true });
    this.props.setConventionZone({
      zoneCode: item.zoneCode,
      zoneName: item.zoneName
    });
    this.props.dispatchEvent(events.ZoneOptionClick);
  };
  render() {
    let { flag, zoneArr, curid } = this.state;
    const { navigation, userPreferences, insanState } = this.props;
    let conventionZoneCode = userPreferences.conventionZoneCode
      ? userPreferences.conventionZoneCode
      : "";

    return (
      <View
        style={styles.container1}
      >
        <TouchableOpacity
          style={styles.container2}
          onPress={() => {
            this.props.setConventionZone({
              zoneCode: this.state.preZoneCode,
              zoneName: this.state.preZoneName
            });
            this.props.setConventionState({
              stateCode: this.state.preStateCode,
              stateName: this.state.preStateName,
              jakimzones: this.state.prejakimzones,
              isZoneBack: true
            });
            this.props.navigation.goBack();
            this.props.dispatchEvent(events.ZoneScreenBackClick);
          }}
          accessibilityLabel="home"
          accesible
        >
          <Image
            style={styles.backImage}
            source={BACK}
          />
        </TouchableOpacity>
        <Text style={styles.selectZone}>
          {helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_SELECT_ZONE).label}
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <View
            style={styles.marginStyle}
          >
            {userPreferences.jakimzones &&
              userPreferences.jakimzones.length >= 1 &&
              userPreferences.jakimzones.map((item, k) => {
                return (
                  <SelectZoneItem
                    key={item.zoneCode}
                    zoneCode={item.zoneCode}
                    isSelected={item.zoneCode == conventionZoneCode}
                    labelText={item.zoneName}
                    onSelected={id => this.onSelectZone(id, item)}
                  />
                );
              })}
          </View>
        </ScrollView>
        {
          <TouchableOpacity
            style={{
              width: 220,
              height: 44,
              borderRadius: 22,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: 'center',
              marginLeft: 78,
              marginRight: 77,
              marginTop: 53,
              flexShrink: 0,
              marginBottom: 32,
              backgroundColor:
                this.state.isZoneSelected && conventionZoneCode
                  ? "#ED1B2E"
                  : "#F3F3F3"
            }}
            onPress={() => {
              //this.props.setInsanHomeCard(true);
              this.props.navigation.navigate("PrayerTimeConventions");
              this.getPrayerTimeJAKIMFun();
              this.props.setConvention("");
              this.props.dispatchEvent(events.ZoneScreenConfirmClick);
            }}
            accessibilityLabel="home"
            accesible
            disabled={!conventionZoneCode || !this.state.isZoneSelected}
          >
            <Text
              style={{
                fontSize: 16,
                color:
                  this.state.isZoneSelected && conventionZoneCode
                    ? "#FFFFFF"
                    : "#BDBEC0"
              }}
            >
              {helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_CONFIRM).label}
            </Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userPreferences: state.userPreferences,
    insanState: state.InsanReducer.insanState
  };
};

export default connect(
  mapStateToProps,
  {
    setInsanHomeCard,
    setConventionState,
    setConventionZone,
    setConvention,
    getPrayerTimeJAKIM,
    dispatchEvent,
  }
)(SelectZone);