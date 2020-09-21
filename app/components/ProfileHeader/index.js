/* eslint-disable */
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from "react-native";
import { BACK, AVATAR, CAMERA_ICON } from '../../config/images';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CoreConfig,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
const {
  NEW_ME,
  NEW_ME_EDITPROFILE,
} = CoreConfig;

const findElement = (screenKey, elementKey) =>
  metaHelpers.findElement(screenKey, elementKey) || {
    label: elementKey,
  };

class ProfileHeader extends Component {

  render() {
    const {
      closePageHandler,
      icon,
      rightAccesoryLabel,
      rightAccessoryAction,
      rightAccesoryTextStyle,
      editIconActionHandler
    } = this.props;
    
    let bottomMargin = icon ? -12 : 2;
    const editProfile =findElement(NEW_ME, NEW_ME_EDITPROFILE)
      .label;

    return (
      <View style={{ height: 220, padding: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start"}}>
            <TouchableOpacity onPress={closePageHandler}>
              <Image
                style={{
                  height: 16,
                  width: 16
                }}
                source={BACK}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 14, color: '#000', marginLeft: 16 }}>
              {editProfile}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: "flex-start" }}>
            <TouchableOpacity
              onPress={rightAccessoryAction}
              style={{
                width: 100,
                justifyContent: 'flex-start',
                zIndex: 25
              }}
            >
              <Text style={[{
                marginRight: 8,
                color: '#000',
                fontFamily: 'Avenir',
                fontSize: 14,
                textAlign: 'right',
              }, rightAccesoryTextStyle]}>{rightAccesoryLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            editIconActionHandler && editIconActionHandler()
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 90,
                backgroundColor: "#FFFF",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 0.7,
                borderColor: "#afafaf",
                shadowOpacity: 200,
                shadowRadius: 100,
                shadowColor: 'red',
                shadowOffset: { width: 30, height: 30 }
              }}
            >
              <Image
                style={{
                  width: 110,
                  height: 110,
                  overflow: "hidden",
                  aspectRatio: 1 / 1,
                  borderRadius: 90,
                }}
                source={icon ? icon : AVATAR}
              />
            </View>
            <Image
              style={{
                height: 27,
                width: 27,
                position: 'absolute',
                bottom: bottomMargin,
                left: '50%'
              }}
              source={CAMERA_ICON}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

ProfileHeader.PropTypes = {
  user: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  icon: PropTypes.string,
  editProfileHandler: PropTypes.func,
  closePageHandler: PropTypes.func,
  saveActionHandler: PropTypes.func,
  type: PropTypes.string.isRequired,
  hideLeftAccessory: PropTypes.bool,
  hideRightAccessory: PropTypes.bool,
  editIconActionHandler: PropTypes.func,
}

ProfileHeader.defaultProps = {
  hideLeftAccessory: false,
  hideRightAccessory: false,
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userPreference: state.userPreferences,
    preayerTimeJAKIM: state.InsanReducer.preayerTimeJAKIM,
    preayerTimeOther: state.InsanReducer.preayerTimeOther,
    prayerTimeJakimIndex: state.InsanReducer.prayerTimeJakimIndex,
    prayerTimeOtherIndex: state.InsanReducer.prayerTimeOtherIndex,
    userPreferences: state.userPreferences
  };
};
export default connect(mapStateToProps)(ProfileHeader)
