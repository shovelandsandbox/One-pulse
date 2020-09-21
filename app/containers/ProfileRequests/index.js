import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { path } from "ramda";
import styles from "./styles";
import {
  CoreComponents,
  CoreConfig,
  CoreUtils,
  metaHelpers,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
const { isNilOrEmpty, getDateFormat } = CoreUtils;
const helpers = metaHelpers;
const { Loader } = CoreComponents;
import PropTypes from "prop-types";
import { CustomAlert } from "../../components";
const {
  ElementErrorManager,
  SCREEN_KEY_PROFILE_REQUEST,
  pageKeys,
} = CoreConfig;
const {
  GET_ALL_CUSTOMERS_CONNECT,
  ADD_TO_ACCEPTED_REQUEST,
  REMOVE_CONNECTED_REQUEST,
  UPDATE_CUSTOMER_CONNECT,
  DELETE_CUSTOMER_CONNECT,
} = CoreActionTypes;

const KEY_ACCEPT = "accept";
const KEY_DECLINE = "decline";
const KEY_CANCEL = "cancel";
const STATUS_ACCEPTED = "ACCEPTED";
const STATUS_REJECTED = "REJECTED";
const KEY_CANCEL_MSG = "cancelmsg";
const KEY_ACCEPT_MSG = "accepttmsg";
const KEY_REJECT_MSG = "rejectmsg";

// eslint-disable-next-line react/require-optimization
class ProfileRequests extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.updatingConnects !== prevState.updatingConnects) {
      if (!nextProps.updatingConnects) {
        if (nextProps.connectError) {
          alert(nextProps.connectError.errorMsg);
        } else {
          const { connect, status } = nextProps.connectResponse.actionPayload;
          // eslint-disable-next-line max-depth
          if (status === STATUS_ACCEPTED) {
            const tempCustomer = {
              firstName: connect.customerFirstName,
              surName: connect.customerSurName,
              id: connect.from,
              contactDetails: {
                email: {
                  channel: "EMAIL",
                  value: connect.customerEmail,
                },
              },
              email: connect.customerEmail,
              phone: connect.customerPhone,
              dob: connect.customerDob,
              gender: connect.customerGender,
              linked: true,
              connectId: connect.id,
              profilePicture: "",
              address1: path(["address", "line1"], connect.customerAddress),
              address2: path(["address", "city"], connect.customerAddress),
              address3: path(["address", "zipcode"], connect.customerAddress),
              countryCode: path(
                ["address", "country"],
                connect.customerAddress
              ),
            };
            nextProps.dispatch({
              type: ADD_TO_ACCEPTED_REQUEST,
              payload: tempCustomer,
            });
            Alert.alert(
              helpers.findElement(SCREEN_KEY_PROFILE_REQUEST, KEY_ACCEPT_MSG)
                .label
            );
          } else {
            Alert.alert(
              helpers.findElement(SCREEN_KEY_PROFILE_REQUEST, KEY_REJECT_MSG)
                .label
            );
          }
          nextProps.dispatch({
            type: REMOVE_CONNECTED_REQUEST,
            payload: connect.id,
          });
          nextProps.dispatch({
            context: pageKeys.PROFILE,
            type: GET_ALL_CUSTOMERS_CONNECT,
            payload: {
              userId: nextProps.userId,
            },
          });
        }
      }
      return {
        updatingConnects: nextProps.updatingConnects,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      updatingConnects: props.updatingConnects,
    };
    this.renderItem = this.renderItem.bind(this);
    this.onUpdateCustomerConnect = this.onUpdateCustomerConnect.bind(this);
    this.onDeleteCustomerConnect = this.onDeleteCustomerConnect.bind(this);
    this.confirmRejectAlert = this.confirmRejectAlert.bind(this);
    this.confirmCancelAlert = this.confirmCancelAlert.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: GET_ALL_CUSTOMERS_CONNECT,
      payload: {
        userId,
      },
    });
  }

  onUpdateCustomerConnect(connect, status) {
    const { userId } = this.props;
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: UPDATE_CUSTOMER_CONNECT,
      payload: {
        connect,
        status,
        userId,
      },
    });
  }

  onDeleteCustomerConnect(connectId) {
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: DELETE_CUSTOMER_CONNECT,
      payload: {
        connectId,
      },
    });
  }

  confirmRejectAlert(id, status) {
    CustomAlert.show(
      "",
      "Are you sure you want to reject?",
      {
        positiveText: "YES",
        onPositivePress: () => {
          this.onUpdateCustomerConnect(id, status);
        },
      },
      {
        negativeText: "NO",
        onNegativePress: () =>{},
      }
    );
  }

  confirmCancelAlert(id) {
    CustomAlert.show(
      "",
      "Do you want to cancel the Request?",
      {
        positiveText: "YES",
        onPositivePress: () => {
          this.onDeleteCustomerConnect(id);
        },
      },
      {
        negativeText: "NO",
        onNegativePress: () =>{},
      }
    );
  }

  renderItem(data) {
    const { userId } = this.props;
    const accept = helpers.findElement(SCREEN_KEY_PROFILE_REQUEST, KEY_ACCEPT)
      .label;
    const decline = helpers.findElement(SCREEN_KEY_PROFILE_REQUEST, KEY_DECLINE)
      .label;
    const cancel = helpers.findElement(SCREEN_KEY_PROFILE_REQUEST, KEY_CANCEL)
      .label;
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_PROFILE_REQUEST);
    const createdTime = getDateFormat(data.item.auditDetail.createTime);
    return (
      <View>
        {data.item.status === "INVITED" && (
          <View style={styles.userView}>
            <View style={styles.nameContainer}>
              {!isNilOrEmpty(data.item.customerFirstName) && (
                <View>
                  {!isNilOrEmpty(data.item.customerSurName) && (
                    <Text style={styles.username}>
                      {data.item.customerFirstName} {data.item.customerSurName}
                    </Text>
                  )}
                  {isNilOrEmpty(data.item.customerSurName) && (
                    <Text style={styles.username}>
                      {data.item.customerFirstName}
                    </Text>
                  )}
                  <Text style={styles.email}>{data.item.customerEmail}</Text>
                </View>
              )}
              {isNilOrEmpty(data.item.customerFirstName) && (
                <View>
                  <Text style={styles.username}>{data.item.customerEmail}</Text>
                  <Text style={styles.message} />
                </View>
              )}
              {data.item.to == userId && (
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{createdTime}</Text>
                  <TouchableOpacity
                    onPress={e => {
                      e.preventDefault();
                      this.confirmRejectAlert(data.item, STATUS_REJECTED);
                    }}
                    style={[styles.buttonContainer, styles.inactiveButton]}
                  >
                    <Text style={styles.inactiveButtonText}>{decline}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={e => {
                      e.preventDefault();
                      this.onUpdateCustomerConnect(data.item, STATUS_ACCEPTED);
                    }}
                    style={[styles.buttonContainer, styles.activeButton]}
                  >
                    <Text style={styles.activeButtonText}>{accept}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {data.item.to !== userId && (
                <View style={styles.dateContainer}>
                  <Text style={[styles.date, { flex: 0.5 }]}>
                    {createdTime}
                  </Text>
                  <TouchableOpacity
                    onPress={e => {
                      e.preventDefault();
                      this.confirmCancelAlert(data.item.id);
                    }}
                    style={[
                      styles.buttonContainer,
                      styles.inactiveButton,
                      styles.cancelButton,
                    ]}
                  >
                    <Text style={styles.inactiveButtonText}>{cancel}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }

  render() {
    const { meta, connectRequests } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.container}
          data={connectRequests}
          renderItem={this.renderItem}
          extraData={this.props}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

ProfileRequests.propTypes = {
  meta: PropTypes.object,
  token: PropTypes.string,
  connectRequests: PropTypes.array,
  userId: PropTypes.string,
};

const mapStateToProps = state => ({
  meta: state.meta,
  token: state.auth.token,
  connectRequests: state.connectData.connectRequests,
  userId: state.profile.id,
  updatingConnects: state.profile.updatingConnects,
  connectResponse: state.profile.connectResponse,
  connectError: state.profile.connectError,
});

export default connect(mapStateToProps)(ProfileRequests);
