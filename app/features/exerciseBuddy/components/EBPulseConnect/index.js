import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView, FlatList } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import styles from "./styles";
import ConnectRowItem from "../EBConnectRowItem";
import GroupRowItem from "../EBGroupRowItem";

import { PruRoundedButton } from "../../../../components";
import { WPSearchBar } from "../../../wellnessPlans/components";
import { getAllCustomerGroup } from "../../actions";

class PulseConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
      filteredContactList: [],
      filteredGroupList: [],
      emailContactList: [],
    };
  }

  componentDidMount() {
    const { getAllCustomerGroup } = this.props;
    getAllCustomerGroup();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { groups } = this.props;
    if (nextProps.groups !== groups) {
      const filteredList = nextProps.groups.filter(item => {
        return item.name;
      });
      this.setState({ filteredGroupList: filteredList });
    }
  }

  handleOnConnectSelect = item => {
    const { filteredContactList } = this.state;
    const index = filteredContactList.findIndex(el => el.email === item.email);
    filteredContactList[index] = {
      ...filteredContactList[index],
      isSelectedForInvite: !item.isSelectedForInvite,
    };
    const inviteList = filteredContactList.filter(
      el => el.isSelectedForInvite == true
    );
    this.setState({
      filteredContactList: filteredContactList,
      selectedList: inviteList,
    });
  };

  handleOnGroupPress = () => {};

  handleCreateGroup = () => {};

  handleSearch = name => {
    const { isGroup, groups } = this.props;
    const { emailContactList } = this.state;
    if (isGroup) {
      const modifiedGroups = groups.filter(item => {
        const groupName = item.name ? item.name : "";
        return groupName.toLowerCase().includes(name.toLowerCase());
      });
      this.setState({ filteredGroupList: modifiedGroups });
    } else {
      const modifiedContacts = emailContactList.filter(item => {
        const firstName = item.firstName ? item.firstName : "";
        const lastName = item.lastName ? item.lastName : "";
        return (
          firstName.toLowerCase().includes(name.toLowerCase()) ||
          lastName.toLowerCase().includes(name.toLowerCase())
        );
      });
      this.setState({ filteredContactList: modifiedContacts });
    }
  };

  renderEmptyContainer = () => {
    const { isGroup } = this.props;
    const noContactsMessage = isGroup ? "No Groups" : "No Contacts";
    return (
      <View style={styles.noContactsBody}>
        <Text style={styles.noContactsText}>{noContactsMessage}</Text>
      </View>
    );
  };

  render() {
    const { isGroup } = this.props;
    const { filteredContactList, filteredGroupList, selectedList } = this.state;
    const search = "Search";
    const createGroupTitle = "Create Group";
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <WPSearchBar
            onChange={name => this.handleSearch(name)}
            placeholder={search}
            containerStyle={styles.searchContainer}
            iconStyle={styles.searchIcon}
            textStyle={styles.inputText}
            iconSize={22}
          />
        </KeyboardAvoidingView>

        <FlatList
          style={isGroup ? styles.flatListView : styles.flatListViewWithSpace}
          data={isGroup ? filteredGroupList : filteredContactList}
          renderItem={({ item }) =>
            isGroup ? (
              <GroupRowItem
                item={item}
                onSelected={this.handleOnGroupPress}
                enableInvite={false}
              />
            ) : (
              <ConnectRowItem
                item={item}
                onSelected={this.handleOnConnectSelect}
                enableInvite={false}
              />
            )
          }
          ListEmptyComponent={this.renderEmptyContainer()}
          showsVerticalScrollIndicator={false}
        />
        {!isGroup && selectedList.length > 0 && (
          <View style={styles.bottomView}>
            <PruRoundedButton
              buttonTitle={createGroupTitle}
              onPress={this.handleCreateGroup}
              style={styles.createGroupRoundedButton}
              textStyling={styles.createGroupText}
            />
          </View>
        )}
      </View>
    );
  }
}

PulseConnect.propTypes = {
  isGroup: PropTypes.bool,
  groups: PropTypes.array,
  getAllCustomerGroup: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    groups: state.workoutPlans.groups,
  };
};

export default connect(mapStateToProps, {
  getAllCustomerGroup,
})(PulseConnect);
