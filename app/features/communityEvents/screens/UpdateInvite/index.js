import React, { PureComponent } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../../components/SearchBar";
import {
  PruRoundedButton,
  PruBackHeader,
  CustomAlert,
} from "../../../../components";
import {
  leaveGroupMember,
  getGroupMembers,
  resetEditEventMembers,
  searchAndUpdateGroupMember,
  getCustomerEventsForManager,
} from "../../actions";
import ProfileImage from "../../../../components/ProfileImage";
import screens from "../../config/screens";

class UpdateInvite extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { eventData } = this.props;
    this.props.resetEditEventMembers();
    this.props.getGroupMembers(eventData?.id);
  }

  onSearch = email => {
    const { eventData, searchAndUpdateGroupMember, hostEmail } = this.props;
    if (email && hostEmail === email) {
      CustomAlert.show(
        "",
        "This user is already a host for this Event. Please invite other members",
        {
          positiveText: "Ok",
        }
      );
    } else {
      email && searchAndUpdateGroupMember({ email, groupId: eventData.id });
    }
  };

  removeMember = email => {
    const { eventData } = this.props;
    this.props.leaveGroupMember(email, eventData.id);
  };

  getFullName = customer => {
    return `${customer.firstName ? customer.firstName : ""} ${
      customer.surName ? customer.surName : ""
    }`.trim();
  };

  continue = () => {
    this.props.getCustomerEventsForManager();
    this.props.navigation.navigate(screens.PULSE_TV_EVENT_MANAGER);
  };

  renderSearchbar() {
    return <SearchBar onSearch={email => this.onSearch(email)} />;
  }

  renderEmailItem = item => {
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
            {this.getFullName(item.customer)}
          </Text>
          <Text style={{ color: "#888888", fontSize: 12 }}>
            {item.customer?.contactDetails?.email?.value}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.removeMember(item.customer?.contactDetails?.email?.value)
          }
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

  renderContacts = () => {
    const { editEventMembers } = this.props;
    return (
      <FlatList
        style={styles.flatlistView}
        data={editEventMembers}
        renderItem={({ item, index }) => this.renderEmailItem(item, index)}
      />
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.continueWrapper}>
        <PruRoundedButton
          buttonTitle={"Continue"}
          style={{ width: "100%" }}
          onPress={this.continue}
        />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backContainer}>
          <PruBackHeader title={"Update Members"}></PruBackHeader>
        </View>
        <View style={styles.content}>
          {this.renderSearchbar()}
          {this.renderContacts()}
          {this.renderFooter()}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  eventData: state.communityEvents.isEditEvent,
  editEventMembers: state.communityEvents.editEventMembers,
  hostEmail: state.communityEvents.hostEmail,
});

const mapDispatchToProps = {
  leaveGroupMember,
  getGroupMembers,
  resetEditEventMembers,
  searchAndUpdateGroupMember,
  getCustomerEventsForManager,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInvite);

const styles = StyleSheet.create({
  flatlistView: {
    marginTop: 10,
  },
  backContainer: {
    backgroundColor: "#fff",
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  continueWrapper: {
    bottom: 20,
    left: 20,
    position: "absolute",
    right: 20,
  },
});
