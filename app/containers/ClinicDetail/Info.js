/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, ScrollView, Image, Text, TouchableOpacity, Platform, Linking, PermissionsAndroid } from "react-native";
import { connect } from "react-redux";
import {
  HOSPITAL_DETAIL_ADDRESS,
  HOSPITAL_DETAIL_TIME,
  INFO_CONTACT_NAVIGATOR
} from '../../config/images'
import PruRoundedButton from "../../components/PruRoundedButton";
import {
  CoreConfig,
  CoreUtils,
  AddressUtils,
  CoreComponents,
  metaHelpers
} from "@pru-rt-internal/pulse-common";

const {
  SCREEN_KEY_CLINIC_DETAIL_INFO_TAB,
  SCREEN_KEY_HOSPITAL_DETAIL_CALL_NOW,
  SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
} = CoreConfig;
const { NavigatorInfo } = CoreComponents;
const { colors } = CoreConfig;

class InfoDisplayCell extends Component {
  render() {
    const {
      icon,
      content
    } = this.props
    return (
      <View style={{
        // height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: '#8ac2',
        borderBottomWidth: 0.5,
        borderBottomColor: '#a9a9a9',
      }}>
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          {icon && <Image
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor: '#ddd',
              alignSelf: 'center',
            }}
            source={icon}
          />
          }
        </View>
        <Text style={{
          flex: 5,
          marginVertical: 25,
          alignSelf: 'center',
          fontFamily: 'Avenir',
          fontSize: 16,
          color: '#4A555B',

        }}>
          {content}
        </Text>
      </View>
    )
  }
}

InfoDisplayCell.PropTypes = {
  icon: PropTypes.string,
  content: PropTypes.string,
}


class ClinicInfo extends React.Component {
  async requestCallPermission(link_android) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Linking.openURL(link_android)
      } else {

      }
    } catch (err) {
    }
  }
  render() {
    const { meta, contactDetails, address, timings, loading, showDivider, userPreferences } = this.props;
    const contactInformation = Object.keys(contactDetails).map(detail => ({
      name: contactDetails[detail]["channel"],
      value: contactDetails[detail]["value"],
    }));

    const phoneNo =
      contactInformation.length !== 0
        ? contactInformation.find(info => info.name === "PHONE")
        : undefined;

    const websiteAddress =
      contactInformation.length !== 0
        ? contactInformation.find(info => info.name === "website")
        : undefined;

    const fullAddress = AddressUtils.formAddress(address);

    const call_now = metaHelpers.findElement(
      SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
      SCREEN_KEY_HOSPITAL_DETAIL_CALL_NOW
    ).label;

    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" color={colors.crimson} />
        </View>
      );
    }
    return (
      <View style={{
        flex: 1,
        borderTopWidth: showDivider ? 0.5 : 0,
        borderTopColor: '#c9c9c9'
      }}>
        <ScrollView style={{
          // height: '100%',
          flex: 1,
          // paddingHorizontal: 20,
        }}>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: '#a9a9a9',
            }}>
            <View style={{
              // flex: 1,
              paddingHorizontal: 20,
              justifyContent: 'center',
              // backgroundColor: '#ac4'
            }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: '#ddd',
                  alignSelf: 'center',
                }}
                source={HOSPITAL_DETAIL_ADDRESS}
              />
            </View>
            <Text style={{
              flex: 1,
              marginVertical: 25,
              alignSelf: 'center',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#4A555B',
            }}>
              {fullAddress}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: '#a9a9a9',
            }}>
            <View style={{
              paddingHorizontal: 20,
              // backgroundColor: '#ac4',
              justifyContent: 'center',
            }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: '#ddd',
                  alignSelf: 'center',
                }}
                source={HOSPITAL_DETAIL_TIME}
              />
            </View>
            <Text style={{
              flex: 1,
              marginVertical: 25,
              alignSelf: 'center',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#4A555B',
            }}>
              {timings}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: '#a9a9a9',
            }}>
            <View style={{
              // flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
              // backgroundColor: '#ac4',
            }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: '#ddd',
                  alignSelf: 'center',
                }}
                source={INFO_CONTACT_NAVIGATOR}
              />
            </View>
            <Text style={{
              flex: 1,
              marginVertical: 25,
              alignSelf: 'center',
              fontFamily: 'Avenir',
              fontSize: 14,
              color: '#4A555B',
            }}>
              {phoneNo ? phoneNo.value : ""}
            </Text>
          </View>
          {/* Address */}
          {/* {
            fullAddress && <InfoDisplayCell icon={HOSPITAL_DETAIL_ADDRESS} content={fullAddress} />
          } */}
          {/* Open Times */}
          {/* {
            timings && <InfoDisplayCell icon={HOSPITAL_DETAIL_TIME} content={timings} />
          } */}
          {/* Phone */}
          {/* {
            phoneNo && <InfoDisplayCell icon={INFO_CONTACT_NAVIGATOR} content={phoneNo.value} />
          } */}
          {/* WebAddress */}
          {/* {
            websiteAddress && <InfoDisplayCell content={websiteAddress.value} />
          } */}
        </ScrollView>
        <View style={{
          marginBottom: 30,
          marginTop: 10,
          justifyContent: "center",
          alignSelf: "center"
        }}>
          <PruRoundedButton
            onPress={() => {
              if (!phoneNo) {
                return;
              }
              switch (Platform.OS) {
                case "ios":
                  const link_ios = `tel:${phoneNo.value}`;
                  Linking.openURL(link_ios);
                  break;

                default:
                  const link_android = `tel:${phoneNo.value}`;
                  this.requestCallPermission(link_android);
                  break;
              }
            }}
            buttonTitle={call_now}
          />
        </View>
      </View>

      // <NavigatorInfo
      //   meta={meta}
      //   screenKey={SCREEN_KEY_CLINIC_DETAIL_INFO_TAB}
      //   phoneNo={phoneNo && phoneNo.value}
      //   workingDays={timings}
      //   websiteAddress={websiteAddress && websiteAddress.value}
      //   address={AddressUtils.formAddress(address)}
      // />
    );
  }
}

ClinicInfo.propTypes = {
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  contactDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  address: PropTypes.objectOf(PropTypes.any).isRequired,
  timings: PropTypes.string.isRequired,
  showDivider: PropTypes.bool
};

export default connect(state => ({
  meta: state.meta,
  loading: state.clinicDetail.loading,
  contactDetails: state.clinicDetail.contactDetails,
  address: state.clinicDetail.address,
  timings: state.clinicDetail.timing,
  userPreferences: state.userPreferences,

}))(ClinicInfo);
