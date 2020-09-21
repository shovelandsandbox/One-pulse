import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./styles";
import Colors from "../utils/colors";
import screens from "../../../utils/configs/screen-names";
import { affinityGroupActions as actions } from "../configs/affinity-group-actions";
import { pathOr } from "ramda";
import Header from "../components/header";
import { MenuProvider } from "react-native-popup-menu";
import { metaFinderAG } from "../utils/meta-utils";
import * as AffinityType from "../types";
import Group from "../components/group";
import { NO_GROUP } from "../../../../assets/images/affinityGroup";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
import moment from "moment";

const extractKey = item => {
  const key = `PruListItem: ${item.id}`;
  return key;
};

class AffinityGroupScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "allCommunities",
      initialTABS: [
        { key: "myCommunities", title: metaFinderAG("myCommunities") },
        { key: "allCommunities", title: metaFinderAG("allCommunities") },
      ],
    };
  }

  componentDidMount() {
    const defaultValue = pathOr(
      "",
      ["state", "params", "navigateFrom"],
      this.props.navigation
    );
    if (defaultValue === "content") {
      this.setState({ activeTab: "allCommunities" });
    }
    const classification =
      defaultValue === "content" ? "HealthChannels" : "Community";
    this.props.fetchMyAffinityGroups(classification);
    this.props.fetchAllAffinityGroups(classification);
  }
  componentWillUnmount() {
    this.props.registerEvent(eventNames.exitCommunities, {
      completionDate: moment(),
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.myGroups &&
      nextProps.myGroups !== this.props.myGroups &&
      nextProps.myGroups.length > 0
    ) {
      this.setState({ activeTab: "myCommunities" });
    }
  }

  renderItem = ({ item }) => {
    const navigateFrom = pathOr(
      "",
      ["state", "params", "navigateFrom"],
      this.props.navigation
    );
    return (
      <Group
        group={item}
        showJoinOption={this.state.activeTab !== "myCommunities"}
        navigateFrom={navigateFrom}
      />
    );
  };

  filterGroup = (group, condition) => {
    if (condition) {
      return group.filter(item => item.hasOwnProperty("groupActivity"));
    }
    return group.filter(item => !item.hasOwnProperty("groupActivity"));
  };

  renderAffinityGroupList = () => {
    const navigateFrom = pathOr(
      "",
      ["state", "params", "navigateFrom"],
      this.props.navigation
    );
    const { activeTab } = this.state;

    const { allGroups, myGroups } = this.props;
    const data =
      activeTab === "myCommunities"
        ? this.filterGroup(myGroups, false)
        : this.filterGroup(allGroups, false);
    if (navigateFrom) {
      const filteredAllGroup = this.filterGroup(allGroups, true);
      if (navigateFrom) {
        return (
          <FlatList
            data={filteredAllGroup}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
          />
        );
      }
    }
    //if myGroups is blank show message when user is in my groups tabs
    if (activeTab === "myCommunities" && myGroups && myGroups.length === 0) {
      return (
        <View style={Styles.emptyContainer}>
          <ImageBackground
            style={Styles.imageBackground}
            resizeMode="cover"
            source={NO_GROUP}
          >
            <View style={Styles.emptyGroup}>
              <Text style={Styles.emptyGroupText}>
                {metaFinderAG("Leverage")}
              </Text>
              <Text style={Styles.emptyGroupText}>
                {metaFinderAG("communitiesLearn")}
              </Text>
              <Text style={Styles.emptyGroupText}>
                {metaFinderAG("shareInspire")}
              </Text>
              <TouchableOpacity
                onPress={() => this.onTabPress("allCommunities")}
                style={Styles.emptyGroupButtonContainer}
              >
                <Text style={Styles.emptyGroupButton}>
                  {metaFinderAG("joinNow")}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    );
  };

  onTabPress = key => {
    this.setState({
      activeTab: key,
    });
    this.props.registerEvent(eventNames[key]);
  };

  renderTabHeaderItem = ({ title, key }, isActive) => {
    const style = [Styles.toggleText];
    if (isActive) {
      style.push({ fontWeight: "bold", color: Colors.darkGrey });
    }

    return (
      <TouchableOpacity
        onPress={() => this.onTabPress(key)}
        style={Styles.toggleButtonArea}
      >
        <Text style={style}>{title}</Text>
        {isActive && <View style={Styles.groupSelectedLine}></View>}
      </TouchableOpacity>
    );
  };

  renderTabHeader = () => {
    const { initialTABS } = this.state;
    const navigateFrom = pathOr(
      "",
      ["state", "params", "navigateFrom"],
      this.props.navigation
    );
    const TABS =
      navigateFrom === "content"
        ? [{ key: "allCommunities", title: metaFinderAG("allHealthChannels") }]
        : initialTABS;
    const tabs = TABS.map(tab => {
      const isActive = tab.key === this.state.activeTab;
      return this.renderTabHeaderItem(tab, isActive);
    });
    return <View style={Styles.toggleButtonStyle}>{tabs}</View>;
  };

  render() {
    const navigateFrom = pathOr(
      "",
      ["state", "params", "navigateFrom"],
      this.props.navigation
    );
    const title =
      navigateFrom === "content"
        ? metaFinderAG("healthChannels")
        : metaFinderAG("communities");

    return (
      <MenuProvider>
        <View style={Styles.baseContainer}>
          <Header title={title} />
          {navigateFrom !== "content" && this.renderTabHeader()}
          {this.renderAffinityGroupList()}
        </View>
      </MenuProvider>
    );
  }
}

AffinityGroupScreen.propTypes = {
  allGroups: AffinityType.allGroups,
  myGroups: AffinityType.myGroups,
  fetchAllAffinityGroups: PropTypes.func,
  fetchMyAffinityGroups: PropTypes.func,
  registerEvent: PropTypes.func,
};

const mapStateToProps = state => ({
  allGroups: pathOr([], ["affinityGroup", "allGroups"], state),
  myGroups: pathOr([], ["affinityGroup", "myGroups"], state),
});

const mapDispatchToProps = {
  registerEvent,
  fetchAllAffinityGroups: classification => ({
    context: screens.affinityGroupMainScreen,
    type: actions.getAllGroups,
    payload: {
      classification,
    },
  }),
  fetchMyAffinityGroups: classification => ({
    context: screens.affinityGroupMainScreen,
    type: actions.getMyGroups,
    payload: {
      classification,
    },
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AffinityGroupScreen);
