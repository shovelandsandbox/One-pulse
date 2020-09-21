import React, { PureComponent } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import { goto } from "./../../../../actions";
import { headers } from "./../../components";
import actionNames from "../../../communityEvents/config/actions";
import screenNames from "../../../communityEvents/config/screens";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AVATAR, CONTACT_SEARCH } from "../../../../config/images";
import {
  PruRoundedButton,
  PruBackHeader,
  CustomAlert,
} from "../../../../components";
import ProfileImage from "../../../../components/ProfileImage";
import SearchBar from "../../components/SearchBar";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import { metaFinderCommunityEventLanding } from "./../../meta";

const { NavigationService } = CoreServices;

class EventInvite extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearEmailDetails();
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  onSearch = enteredEmail => {
    const {
      hostEmail,
      getCustomerByEmail,
      email,
      isFromExerciseBuddy,
    } = this.props;
    const isMobileNo = this.isNumber(enteredEmail);
    if (isFromExerciseBuddy && enteredEmail === email) {
      CustomAlert.show(
        metaFinderCommunityEventLanding("pulseTvEnterDiffEmail"),
        metaFinderCommunityEventLanding("pulseTvCannotEnterYourEmail"),
        {
          positiveText: "OK",
          onPositivePress: () => {},
        }
      );
      return;
    }
    if (enteredEmail && hostEmail === enteredEmail) {
      CustomAlert.show(
        "",
        metaFinderCommunityEventLanding("pulseTvUserAlrHost"),
        {
          positiveText: "Ok",
        }
      );
    } else {
      enteredEmail && getCustomerByEmail(enteredEmail, isMobileNo);
    }
  };

  onAndroidBackPress = () => {
    const { currentJourney } = this.props;
    this.props.navigation.navigate(
      currentJourney === "COMMUNITY_EVENTS"
        ? screenNames.COMMUNITY_EVENT_LANDING
        : screenNames.PULSE_TV_EVENT_MANAGER
    );
    return true;
  };

  renderSearchbar() {
    return <SearchBar onSearch={email => this.onSearch(email)} />;
  }

  invite = () => {
    const { contacts } = this.props;
    this.props.createGroupMembers(contacts);
  };

  createGroup = () => {
    this.invite();
  };

  openModal = () => {
    const { contacts, onEBCreateGroupPress } = this.props;
    onEBCreateGroupPress(contacts);
  };

  renderEmailItem = (item, index) => {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            marginRight: 4,
            paddingLeft: 10,
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#d5d5d5",
          },
        ]}
      >
        <ProfileImage profilePicture={""} contact={true} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "#3b3b3b", fontSize: 13 }}>
            {item.fullName}
          </Text>
          <Text style={{ color: "#888888", fontSize: 12 }}>{item.email}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.removeParticularContact(item.email)}
          style={{ justifyContent: "center" }}
        >
          <MaterialIcons
            name={"cancel"}
            size={20}
            style={styles.cancelIcon}
            color="#888888"
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { contacts, isFromExerciseBuddy, currentJourney } = this.props;

    return (
      <SafeAreaView style={styles.screenContainer}>
        {!isFromExerciseBuddy && (
          <View style={styles.backContainer}>
            <PruBackHeader
              title={metaFinderCommunityEventLanding("pulseTvInvPeople")}
              previousPage={
                currentJourney === "COMMUNITY_EVENTS"
                  ? screenNames.COMMUNITY_EVENT_LANDING
                  : screenNames.PULSE_TV_EVENT_MANAGER
              }
            ></PruBackHeader>
          </View>
        )}
        <View style={styles.scrollContainer}>
          {this.renderSearchbar()}
          <FlatList
            style={styles.flatlistView}
            contentContainerStyle={styles.flatlistContainer}
            data={contacts}
            renderItem={({ item, index }) => this.renderEmailItem(item, index)}
          />
          {this.props.contacts.length > 0 ? (
            <>
              <PruRoundedButton
                buttonTitle={isFromExerciseBuddy ? metaFinderCommunityEventLanding("pulseTvCreateGrp") : metaFinderCommunityEventLanding("pulseTvInvite")}
                style={{ marginBottom: 20, alignSelf: "center" }}
                onPress={() => {
                  isFromExerciseBuddy ? this.openModal() : this.createGroup();
                }}
              />
            </>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.communityEvents.contacts,
    currentJourney: state.communityEvents.currentJourney,
    hostEmail: state.communityEvents.hostEmail,
  };
};

const mapDispatchToProps = {
  getCustomerByEmail: email => ({
    type: actionNames.getCustomerByEmail,
    payload: { email },
    context: screenNames.EVENT_INVITE,
  }),
  goto,
  clearEmailDetails: () => ({
    type: actionNames.clearEmailDetails,
    context: screenNames.EVENT_INVITE,
  }),
  createGroupMembers: contacts => ({
    type: actionNames.createGroupMembers,
    payload: { contacts },
    context: screenNames.EVENT_INVITE,
  }),
  removeParticularContact: email => ({
    type: actionNames.removeParticularContact,
    payload: { email },
    context: screenNames.EVENT_INVITE,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(EventInvite);

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: "#fff",
    elevation: 5,
  },
  cancelIcon: {
    height: 22,
    marginRight: 10,
    width: 22,
  },
  backContainer: {
    backgroundColor: "#fff",
    elevation: 5,
  },
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingHorizontal: 20,
  },
  searchAction: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    height: 40,
    justifyContent: "center",
    width: "12%",
  },
  searchContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.26,
    shadowRadius: 1,
  },
  searchInput: {
    backgroundColor: "#fff",
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    textAlign: "left",
  },
});
