import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import styles from "./styles";

import {
  CoreComponents,
  CoreConfig,
  CoreUtils,
  metaHelpers,
  CoreConstants,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";

import Icon from "react-native-vector-icons/FontAwesome";
const { isNilOrEmpty, validateEmail } = CoreUtils;
const helpers = metaHelpers;
const { Loader, Label } = CoreComponents;
import PropTypes from "prop-types";
import { any } from "ramda";
const { ElementErrorManager, SCREEN_KEY_PROFILE_SEARCH, pageKeys } = CoreConfig;

const { EMAIL_ID_REQUIRED } = CoreConstants;

const {
  SEARCH_CUSTOMER_BY_EMAIL,
  CREATE_CUSTOMER_CONNECT,
  REQUEST_CUSTOMER_CONNECT,
} = CoreActionTypes;

const KEY_PLACEHOLDER = "searchplaceholder";
const KEY_OOPS = "oops";
const KEY_INVITE_NOTE = "invitenote";
const KEY_INVITE = "invite";
const KEY_PROFILE_FOUND = "profilefound";
const KEY_SEND_REQUEST = "sendrequest";
const KEY_REQUEST_SENT = "requestsent";
const KEY_INVITATION_SENT = "invitationsent";
const KEY_OWN_EMAILID = "ownemailid";
const KEY_ALREADY_CONNECTED = "alreadyconnected";
const KEY_REQUEST_PRESENT = "requestpresent";
const KEY_REQUIRED = "required";
const KEY_NOT_VALID = "not_valid";
// eslint-disable-next-line react/require-optimization
class ProfileSearch extends Component {
  // eslint-disable-next-line complexity
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searching !== prevState.searching) {
      if (!nextProps.searching) {
        if (nextProps.searchError) {
          alert(nextProps.searchError.errorMsg);
        } else {
          return {
            showResult: true,
            searching: nextProps.searching,
          };
        }
      }
      return {
        searching: nextProps.searching,
      };
    }
    if (nextProps.requesting !== prevState.loader) {
      if (!nextProps.requesting) {
        if (nextProps.requestError) {
          alert(nextProps.requestError.errorMsg);
        } else {
          Alert.alert(
            metaHelpers.findElement(SCREEN_KEY_PROFILE_SEARCH, KEY_REQUEST_SENT)
              .label
          );
          return {
            search: "",
            showResult: false,
            loader: false,
          };
        }
      }
      return {
        loader: nextProps.requesting,
      };
    }
    if (nextProps.creatingConnect !== prevState.creatingConnect) {
      if (!nextProps.creatingConnect) {
        if (nextProps.createError) {
          alert(nextProps.createError.errorMsg);
        } else {
          Alert.alert(
            metaHelpers.findElement(
              SCREEN_KEY_PROFILE_SEARCH,
              KEY_INVITATION_SENT
            ).label
          );
          return {
            search: "",
            showResult: false,
            creatingConnect: false,
          };
        }
      }
      return {
        creatingConnect: nextProps.creatingConnect,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      showResult: false,
      loader: props.requesting,
      searching: props.searching,
      creatingConnect: props.creatingConnect,
    };
    this.searchInput = this.searchInput.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
    this.requestContainer = this.requestContainer.bind(this);
  }

  searchInput(val) {
    if (this.state.showResult) {
      this.setState({ showResult: false });
    }
    this.setState({ search: val });
  }

  onSearch() {
    const search = this.state.search.trim();
    this.setState({
      search,
    });
    if (this.validateSearch()) {
      this.props.dispatch({
        context: pageKeys.PROFILE,
        type: SEARCH_CUSTOMER_BY_EMAIL,
        payload: {
          email: search,
        },
      });
    }
  }

  validateSearch() {
    const { senderMailId, connectRequests } = this.props;
    const search = this.state.search.trim();
    const acceptedMessage = helpers.findElement(
      SCREEN_KEY_PROFILE_SEARCH,
      KEY_ALREADY_CONNECTED
    ).label;
    const presentMessage = helpers.findElement(
      SCREEN_KEY_PROFILE_SEARCH,
      KEY_REQUEST_PRESENT
    ).label;
    const required = helpers.findElement(
      SCREEN_KEY_PROFILE_SEARCH,
      KEY_REQUIRED
    ).message;
    const notValid = helpers.findElement(
      SCREEN_KEY_PROFILE_SEARCH,
      KEY_NOT_VALID
    ).message;
    const emailError = validateEmail(search);
    if (!isNilOrEmpty(emailError)) {
      if (emailError == EMAIL_ID_REQUIRED) {
        alert(required);
      } else {
        alert(notValid);
      }
      return false;
    }
    if (search.toLowerCase() === senderMailId.toLowerCase()) {
      const errorMsg = helpers.findElement(
        SCREEN_KEY_PROFILE_SEARCH,
        KEY_OWN_EMAILID
      ).label;
      alert(errorMsg);
      return false;
    }

    let errorMsg = null;
    const isAlreadyInvited = any(connectRequest => {
      if (search.toLowerCase() === connectRequest.customerEmail.toLowerCase()) {
        switch (connectRequest.status) {
          case "ACCEPTED":
            errorMsg = search + " " + acceptedMessage;
            return true;
          case "INVITED":
            errorMsg = presentMessage;
            return true;
        }
      }
    })(connectRequests);

    if (isAlreadyInvited && errorMsg) {
      alert(errorMsg);
      return false;
    }
    return true;
  }

  sendRequest() {
    const { senderId, searchResult } = this.props;
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: CREATE_CUSTOMER_CONNECT,
      payload: {
        senderId,
        receiverId: searchResult.id,
      },
    });
  }

  sendInvite() {
    const { senderMailId, senderName } = this.props;
    const { search } = this.state;
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: REQUEST_CUSTOMER_CONNECT,
      payload: {
        senderMailId,
        senderName,
        receiverMailId: search,
      },
    });
  }

  requestContainer() {
    const { searchResult } = this.props;
    const { search } = this.state;
    const profilefound = helpers.findElement(
      SCREEN_KEY_PROFILE_SEARCH,
      KEY_PROFILE_FOUND
    ).label;
    const sendrequest = helpers.findElement(
      SCREEN_KEY_PROFILE_SEARCH,
      KEY_SEND_REQUEST
    ).label;
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultProfileLabel}>{profilefound}</Text>
        {searchResult.profilePicture && (
          <View style={styles.resultProfilePic}>
            <Image
              style={styles.userPic}
              source={{
                uri: `data:image/jpeg;base64,${searchResult.profilePicture}`,
              }}
            />
          </View>
        )}
        {!searchResult.profilePicture && (
          <View style={[styles.resultProfilePic, styles.noImage]} />
        )}
        <Text style={styles.resultName}>
          {searchResult.firstName ? searchResult.firstName : ""}{" "}
          {searchResult.surName ? searchResult.surName : ""}
        </Text>
        <Text style={styles.resultEmail}>{search}</Text>
        {!this.state.loader && (
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();
              this.sendRequest();
            }}
            style={[styles.buttonContainer, styles.activeButton]}
          >
            <Text style={styles.activeButtonText}>{sendrequest}</Text>
          </TouchableOpacity>
        )}
        {this.state.loader && (
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();
            }}
            style={[styles.buttonContainer, styles.noBorder]}
          >
            <ActivityIndicator color="#ed1b2e" size="large" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  inviteContainer() {
    const { search } = this.state;
    const oops = helpers.findElement(SCREEN_KEY_PROFILE_SEARCH, KEY_OOPS).label;
    const invite = helpers.findElement(SCREEN_KEY_PROFILE_SEARCH, KEY_INVITE)
      .label;
    const invitenote = helpers.findElement(
      SCREEN_KEY_PROFILE_SEARCH,
      KEY_INVITE_NOTE
    ).label;
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultMessage}>
          {oops} {search} {invitenote}
        </Text>
        <View style={[styles.resultProfilePic, styles.noImage]} />
        <Text style={styles.resultEmail}>{search}</Text>
        {!this.state.loader && (
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();
              this.sendInvite();
            }}
            style={[styles.buttonContainer, styles.activeButton]}
          >
            <Text style={styles.activeButtonText}>{invite}</Text>
          </TouchableOpacity>
        )}
        {this.state.loader && (
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();
            }}
            style={[styles.buttonContainer, styles.noBorder]}
          >
            <ActivityIndicator color="#ed1b2e" size="large" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    const { searchResult } = this.props;
    const { showResult, search } = this.state;

    const title = helpers.findScreen(SCREEN_KEY_PROFILE_SEARCH).label;
    const placeholder = helpers.findElement(
      SCREEN_KEY_PROFILE_SEARCH,
      KEY_PLACEHOLDER
    ).label;
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_PROFILE_SEARCH);
    return (
      <View style={styles.container}>
        <Label style={styles.labelStyle} value={title} />
        <View style={styles.contentContainer}>
          <TextInput
            autoFocus
            value={search}
            onChangeText={val => this.searchInput(val)}
            placeholder={placeholder}
            style={styles.textinput}
          />
          <TouchableOpacity
            style={styles.contentCenter}
            onPress={this.onSearch}
          >
            <Icon name="search" color="#ffffff" size={25} />
          </TouchableOpacity>
        </View>
        {this.state.searching && <Loader />}
        {isNilOrEmpty(searchResult) && showResult && this.inviteContainer()}
        {!isNilOrEmpty(searchResult) && showResult && this.requestContainer()}
      </View>
    );
  }
}

ProfileSearch.propTypes = {
  senderId: PropTypes.string,
  searchResult: PropTypes.object,
  senderMailId: PropTypes.string,
  senderName: PropTypes.string,
  connectRequests: PropTypes.array,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  senderId: state.profile.id,
  searchResult: state.connectData.searchResult,
  senderMailId: state.profile.email,
  senderName: state.profile.firstName,
  connectRequests: state.connectData.connectRequests,
  searching: state.connectData.searching,
  searchResponse: state.connectData.searchResponse,
  searchError: state.connectData.searchError,
  requesting: state.connectData.requestingConnect,
  requestError: state.connectData.requestError,
  creatingConnect: state.connectData.creatingConnect,
  createError: state.connectData.createError,
});

export default connect(mapStateToProps)(ProfileSearch);
