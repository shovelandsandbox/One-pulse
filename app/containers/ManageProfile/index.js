import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  BackHandler,
} from "react-native";
import {
  CoreComponents,
  CoreConfig,
  CoreUtils,
  metaHelpers,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
import { OfflineImage } from "react-native-image-offline";
import Icons from "react-native-vector-icons/Feather";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
const { Label, Loader } = CoreComponents;
import styles from "./styles";
import { CustomAlert } from "../../components";
const {
  SCREEN_KEY_PROFILE_LIST,
  COMMON_KEY_CLOSE_WHITE,
  pageKeys,
} = CoreConfig;
const { isNilOrEmpty } = CoreUtils;
const {
  GO_TO_PROFILE,
  GO_TO_PROFILE_SEARCH,
  GET_RELATIONSHIP_LIST,
  GET_ALL_RELATIONS,
  GET_ALL_CUSTOMERS_CONNECT,
  UPDATE_DOCUMENTS_FOR_CONNECTED_MEMBERS,
  DELETE_CUSTOMER_CONNECT,
  UPDATE_PROFILE_DETAILS,
  GET_CUSTOMER_DOCUMENTS,
  REMOVE_RELATED_MEMBER,
  SET_RELATED_MEMBER_LIST,
  TOGGLE_LOADER,
} = CoreActionTypes;

import { path } from "ramda";
import PropTypes from "prop-types";
import ModalDropdown from "react-native-modal-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LINK_ACCOUNT, ADD_FRIEND, CLOSE_WHITE } from "../../config/images";

const KEY_ADD_FRIENDS = "addfriends";
const KEY_LINK_ACCOUNT = "linkaccount";
const KEY_CREATE_PROFILE = "createprofile";
const KEY_LINK_ACCOUNT_IMAGE = "linkaccountimg";
const KEY_CREATE_PROFILE_IMAGE = "createprofileimg";
const KEY_ALERT_YES = "yes";
const KEY_ALERT_NO = "no";
const KEY_ME = "me";

const KEY_DELETE_MESSAGE_PREFIX = "deleteConfirmationPrefix";
const KEY_DELETE_MESSAGE_SUFFIX = "deleteConfirmationSuffix";

class ManageProfile extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let connectMembersChange = false;
    let stateChanges = {};
    if (nextProps.relationDataLoading !== prevState.relationDataLoading) {
      if (!nextProps.relationDataLoading) {
        stateChanges = {
          ...stateChanges,
          relationList:
            nextProps.relationList &&
            nextProps.relationList.map(data => ({
              ...data,
              key: metaHelpers.findElement(SCREEN_KEY_PROFILE_LIST, data.name)
                .label,
            })),
        };
      } else {
        stateChanges = {
          ...stateChanges,
          relationDataLoading: nextProps.relationDataLoading,
        };
      }
    }
    if (nextProps.updatingRelations !== prevState.updatingRelations) {
      if (!nextProps.updatingRelations) {
        connectMembersChange = true;
        stateChanges = {
          ...stateChanges,
          updatingConnectedMembers: prevState.updatingConnectedMembers + 1,
        };
      }
      stateChanges = {
        ...stateChanges,
        updatingRelations: nextProps.updatingRelations,
      };
    }
    if (nextProps.updatingConnects !== prevState.updatingConnects) {
      if (!nextProps.updatingConnects) {
        stateChanges = {
          ...stateChanges,
          updatingConnectedMembers: connectMembersChange
            ? 2
            : prevState.updatingConnectedMembers + 1,
        };
      }
      stateChanges = {
        ...stateChanges,
        updatingConnects: nextProps.updatingConnects,
      };
    }
    if (Object.keys(stateChanges).length !== 0) {
      return stateChanges;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      relationDataLoading: props.relationDataLoading,
      modalVisible: false,
      updatingRelations: props.updatingRelations,
      updatingConnects: props.updatingConnects,
      updatingConnectedMembers: 0,
      relationList:
        props.relationList &&
        props.relationList.map(data => ({
          ...data,
          key: metaHelpers.findElement(SCREEN_KEY_PROFILE_LIST, data.name)
            .label,
        })),
    };
    this.openModal = this.openModal.bind(this);
    this.navToProfile = this.navToProfile.bind(this);
    this.navToSearch = this.navToSearch.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.pickerValue = this.pickerValue.bind(this);
    this.updateConnectedMembers = this.updateConnectedMembers.bind(this);
    this.renderName = this.renderName.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: GET_RELATIONSHIP_LIST,
    });
    this.loadSelfProfileImage();
    this.updateConnectedMembers();
  }

  componentDidUpdate() {
    const { relatedMembers, connectedMembers } = this.props;
    if (this.state.updatingConnectedMembers === 2) {
      const mergedData = relatedMembers.concat(connectedMembers);
      this.props.dispatch({
        type: SET_RELATED_MEMBER_LIST,
        payload: mergedData,
      });
      this.props.dispatch({
        type: TOGGLE_LOADER,
        value: false,
      });
      mergedData.forEach(data => {
        if (path(["documents"], data)) {
          this.props.dispatch({
            context: pageKeys.PROFILE,
            type: UPDATE_DOCUMENTS_FOR_CONNECTED_MEMBERS,
            payload: data,
          });
        }
      });
      this.setState({
        updatingConnectedMembers: 0,
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  updateConnectedMembers() {
    const { userProfile } = this.props;
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: GET_ALL_RELATIONS,
    });
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: GET_ALL_CUSTOMERS_CONNECT,
      payload: {
        userId: userProfile.id,
      },
    });
  }

  navToProfile(data) {
    this.setState({ modalVisible: false });
    let payload;
    if (data) {
      if (data.linked) {
        payload = {
          userData: data,
          editable: false,
          related: false,
          newProfile: false,
        };
      } else {
        payload = {
          userData: data,
          editable: true,
          related: true,
          newProfile: false,
          updateConnectedMembers: this.updateConnectedMembers,
        };
      }
    } else {
      payload = {
        editable: true,
        related: true,
        newProfile: true,
        updateConnectedMembers: this.updateConnectedMembers,
      };
    }
    this.props.dispatch({
      context: pageKeys.MANAGE_PROFILE,
      type: GO_TO_PROFILE,
      payload,
    });
  }

  navToSearch() {
    this.setState({ modalVisible: false });
    this.props.dispatch({
      context: pageKeys.MANAGE_PROFILE,
      type: GO_TO_PROFILE_SEARCH,
    });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  static relationCheck(relation) {
    return (
      relation.toLowerCase() !== "spouse" &&
      relation.toLowerCase() !== "children"
    );
  }

  static formatUserData(data) {
    return {
      firstName: data.firstName,
      surName: data.surName,
      sex: data.gender,
      dob: data.dob,
      addressDetails: {
        address: {
          line1: data.address1,
          city: data.address2,
          zipcode: data.address3,
          country: data.countryCode,
        },
      },
      contactDetails: {
        phone: {
          channel: "PHONE",
          value: data.phone,
        },
      },
      documents: data.documents,
    };
  }

  updateMemberRelationShip(userData, relation) {
    const { userProfile: pastUserDetails } = this.props;
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: DELETE_CUSTOMER_CONNECT,
      payload: {
        connectId: userData.id,
        relationId: userData.id,
        relation,
        pastUserDetails,
        userData,
      },
    });
    const formattedData = ManageProfile.formatUserData(userData);
    ManageProfile.newFamilyMember(
      relation,
      pastUserDetails,
      formattedData,
      this.props
    );
  }

  static newFamilyMember(relation, pastUserDetails, formData, props) {
    const userProfile = {};
    const { token: Token, dispatch } = props;
    if (ManageProfile.relationCheck(relation)) {
      userProfile["id"] = pastUserDetails.id;
      userProfile["relatesTo"] = {};
      userProfile["relatesTo"][relation.toLowerCase()] = [];
      userProfile["relatesTo"][relation.toLowerCase()].push(formData);
    } else {
      ManageProfile.checkRelationSpouse(
        relation,
        userProfile,
        pastUserDetails,
        formData
      );
    }
    if (!isNilOrEmpty(Token)) {
      dispatch({
        context: pageKeys.PROFILE,
        type: UPDATE_PROFILE_DETAILS,
        payload: {
          userProfile,
          fromManageProfile: true,
          toggleLoader: true,
        },
      });
    }
  }

  static checkRelationSpouse(relation, userProfile, pastUserDetails, formData) {
    if (relation.toLowerCase() === "spouse") {
      userProfile["id"] = pastUserDetails.id;
      userProfile[relation.toLowerCase()] = {};
      userProfile[relation.toLowerCase()] = formData;
    } else {
      userProfile["id"] = pastUserDetails.id;
      userProfile[relation.toLowerCase()] = [];
      userProfile[relation.toLowerCase()].push(formData);
    }
  }

  pickerValue(val, data) {
    Object.assign(data, { relation: val });
    this.updateMemberRelationShip(data, val);
  }

  deleteAlert(data) {
    const deleteConfirmationPrefix = metaHelpers.findElement(
      SCREEN_KEY_PROFILE_LIST,
      KEY_DELETE_MESSAGE_PREFIX
    ).label;
    const deleteConfirmationSuffix = metaHelpers.findElement(
      SCREEN_KEY_PROFILE_LIST,
      KEY_DELETE_MESSAGE_SUFFIX
    ).label;

    let userName = data.firstName ? data.firstName : "";
    userName += data.surName ? " " + data.surName : "";

    const deleteMessage =
      deleteConfirmationPrefix + " " + userName + deleteConfirmationSuffix;

    const yes = metaHelpers.findElement(SCREEN_KEY_PROFILE_LIST, KEY_ALERT_YES)
      .label;
    const no = metaHelpers.findElement(SCREEN_KEY_PROFILE_LIST, KEY_ALERT_NO)
      .label;
      CustomAlert.show(
        "",
        deleteMessage,
        {
          positiveText: yes,
          onPositivePress: () => {
            this.deleteProfile(data);
          },
        },
        {
          negativeText: no,
          onNegativePress: () =>{
          },
        }
      );
  }

  deleteProfile(data) {
    const { token } = this.props;
    if (token && token != null) {
      if (data.linked) {
        this.props.dispatch({
          context: pageKeys.PROFILE,
          type: DELETE_CUSTOMER_CONNECT,
          payload: {
            connectId: data.connectId,
            id: data.id,
          },
        });
      } else {
        this.props.dispatch({
          context: pageKeys.PROFILE,
          type: REMOVE_RELATED_MEMBER,
          payload: {
            relationId: data.id,
          },
        });
      }
    }
  }

  loadSelfProfileImage = () => {
    const { userProfile, profilePicture } = this.props;
    if (path(["documents"], userProfile) && isNilOrEmpty(profilePicture)) {
      // User has documents
      this.props.dispatch({
        context: pageKeys.PROFILE,
        type: GET_CUSTOMER_DOCUMENTS,
        payload: {
          customer: userProfile,
          selfProfile: true,
        },
      });
    }
  };

  renderSelfItem() {
    const meMessage = metaHelpers.findElement(SCREEN_KEY_PROFILE_LIST, KEY_ME)
      .label;
    const { userProfile, profilePicture } = this.props;

    const hasProfilePic = !isNilOrEmpty(profilePicture);
    const hasFirstName = !isNilOrEmpty(path(["firstName"], userProfile));
    return (
      <View style={styles.selfContainer}>
        <TouchableOpacity
          onPress={e => {
            e.preventDefault();
            this.props.dispatch({
              context: pageKeys.MANAGE_PROFILE,
              type: GO_TO_PROFILE,
              payload: {
                userData: {
                  ...userProfile,
                  profilePicture,
                },
                editable: true,
                related: false,
                newProfile: false,
              },
            });
          }}
        >
          <View style={styles.userView}>
            <View>
              {!hasProfilePic && (
                <View style={[styles.userPic, styles.noImage]}>
                  <FontAwesomeIcons name="camera" size={20} color="#68737a" />
                </View>
              )}
              {hasProfilePic && (
                <Image
                  style={styles.userPic}
                  source={{
                    uri: `data:image/jpeg;base64,${profilePicture}`,
                  }}
                />
              )}
            </View>
            <View style={styles.nameContainer}>
              {hasFirstName && (
                <Text style={styles.username}>{`${userProfile.firstName} ${
                  userProfile.surName
                  }`}</Text>
              )}
              <Text style={styles.relation}>{meMessage}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  onRelationChange(key, data) {
    const { relationList } = this.state;
    const itemValue = relationList.find(x => x.key === key);
    this.pickerValue(itemValue.name, data);
  }

  renderName(data) {
    if (data.firstName || data.surName) {
      return (
        <Text style={styles.username}>
          {`${data.firstName} ${data.surName}`}
        </Text>
      );
    }
    if (path(["contactDetails", "email", "value"], data)) {
      return (
        <Text style={styles.username}>{data.contactDetails.email.value}</Text>
      );
    }
    return <Text style={styles.username} />;
  }

  renderItem(data) {
    const { relationList } = this.state;
    const whiteclose = metaHelpers.findCommon(COMMON_KEY_CLOSE_WHITE);
    const dropDownOptions = relationList.map(x => x.key);
    const itemValue = relationList.find(x => x.name === data.item.relation);
    return (
      <TouchableOpacity
        key={data.item.id}
        onPress={() => this.navToProfile(data.item)}
      >
        <View style={styles.userView}>
          <View>
            {data.item.profilePicture != "" && (
              <Image
                style={styles.userPic}
                source={{
                  uri: `data:image/jpeg;base64,${data.item.profilePicture}`,
                }}
              />
            )}
            {data.item.profilePicture == "" && (
              <View style={[styles.userPic, styles.noImage]}>
                <FontAwesomeIcons name="camera" size={20} color="#68737a" />
              </View>
            )}
            {data.item.linked && (
              <View style={styles.connectedIcon}>
                <Icons name="link" size={16} color="#ffffff" />
              </View>
            )}
          </View>
          <View style={styles.nameContainer}>
            {this.renderName(data.item)}
            {!data.item.linked && (
              <View style={styles.dropbox}>
                <ModalDropdown
                  textStyle={styles.textStyle}
                  style={styles.dropDownButton}
                  dropdownStyle={styles.dropdownStyle}
                  dropdownTextStyle={styles.dropdownTextStyle}
                  defaultValue={itemValue.key}
                  options={dropDownOptions}
                  onSelect={(index, key) =>
                    this.onRelationChange(key, data.item)
                  }
                />
                <View pointerEvents="none" style={styles.dropDownIcon}>
                  <MaterialIcons
                    pointerEvents="none"
                    name="arrow-drop-down"
                    size={25}
                    color="#a8a8a8"
                  />
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={e => {
              e.preventDefault();
              this.deleteAlert(data.item);
            }}
          >
            <View style={styles.closeContainer}>
              <OfflineImage
                source={{ uri: whiteclose }}
                fallbackSource={CLOSE_WHITE}
                style={styles.closeIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  getDeleteConfirmationModal() { }

  render() {
    const { connectedList } = this.props;
    const { modalVisible } = this.state;
    const addfriends = metaHelpers.findElement(
      SCREEN_KEY_PROFILE_LIST,
      KEY_ADD_FRIENDS
    ).label;
    const createprofile = metaHelpers.findElement(
      SCREEN_KEY_PROFILE_LIST,
      KEY_CREATE_PROFILE
    ).label;
    const createprofileimg = metaHelpers.findElement(
      SCREEN_KEY_PROFILE_LIST,
      KEY_CREATE_PROFILE_IMAGE
    ).image;
    const linkaccount = metaHelpers.findElement(
      SCREEN_KEY_PROFILE_LIST,
      KEY_LINK_ACCOUNT
    ).label;
    const linkaccountimg = metaHelpers.findElement(
      SCREEN_KEY_PROFILE_LIST,
      KEY_LINK_ACCOUNT_IMAGE
    ).image;
    return (
      <View style={styles.container}>
        {this.renderSelfItem()}
        <FlatList
          style={styles.memberContainer}
          data={connectedList}
          renderItem={this.renderItem}
          extraData={this.props}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.whiteBg}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.openModal}
            activeOpacity={0.5}
          >
            <Label value={addfriends} style={styles.buttonText} />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
          hideModalContentWhileAnimating
        >
          <View style={styles.modalStyle}>
            <Text style={styles.modalHeaderLabel}>{addfriends}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalLeftButton}
                onPress={e => {
                  e.preventDefault();
                  this.navToProfile();
                }}
              >
                <OfflineImage
                  source={{ uri: createprofileimg }}
                  fallbackSource={ADD_FRIEND}
                  style={styles.addFriendIcon}
                />
                <Text style={styles.modalButtonLabel}>{createprofile}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalRightButton}
                onPress={e => {
                  e.preventDefault();
                  this.navToSearch();
                }}
              >
                <OfflineImage
                  source={{ uri: linkaccountimg }}
                  fallbackSource={LINK_ACCOUNT}
                  style={styles.linkAccountIcon}
                />
                <Text style={styles.modalButtonLabel}>{linkaccount}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {this.getDeleteConfirmationModal()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  userProfile: state.profile,
  connectedList: state.profile.connectedList,
  relationList: state.relationData.relationList,
  profilePicture: state.documents.profilePicture,
  relationDataLoading: state.relationData.loading,
  relations: state.relationData.relationList,
  updatingRelations: state.profile.loading,
  updatingConnects: state.connectData.loading,
  relatedMembers: state.profile.relationList,
  connectedMembers: state.connectData.connectedList,
});

export default connect(mapStateToProps)(ManageProfile);

ManageProfile.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string,
  userProfile: PropTypes.instanceOf(Object),
  connectedList: PropTypes.instanceOf(Object),
  relationList: PropTypes.instanceOf(Object),
  profilePicture: PropTypes.string,
};

ManageProfile.defaultProps = {
  token: "",
};
