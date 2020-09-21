import React, { PureComponent } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import PropTypes, { bool } from "prop-types";

import Colors from "../../utils/colors";
import { pathOr } from "ramda";
import { gotoWithParams } from "../../../../actions";
import screens from "../../../../utils/configs/screen-names";
import { affinityGroupActions as actions } from "../../configs/affinity-group-actions";
import * as AffinityType from "../../types";
import Footer from "./footer";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import { metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
import { path } from "ramda";
const {
  AFFINITY_GROUP_TEMP_SCREEN_KEY
} = CoreConstants;

class Group extends PureComponent {
  constructor(props) {
    super(props);
  }

  getMetaObject = (elementKey) => {
    if (!elementKey) {
      return null;
    }
    const metaObj = metaHelpers.findElement(AFFINITY_GROUP_TEMP_SCREEN_KEY, elementKey);
    const returnValue  = metaObj && metaObj.label && metaObj.label !== elementKey ? metaObj.label : null;
    return returnValue;
  };

  renderGroupImage = (group, metaObject) => {
    const uri = metaObject && metaObject.imageUrl ? metaObject.imageUrl : pathOr("", ["icon", "url"], group);
    return (
      <Image
        style={styles.groupImage}
        source={{
          uri,
        }}
        resizeMode="stretch"
      />
    );
  };

  renderAffinityGroupTitle = (group, metaObject) => {
    const groupTitle = metaObject && metaObject.title ? metaObject.title : path(["name"], group);
    return (
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.titleText}>
          {groupTitle}
        </Text>
      </View>
    );
  };

  handleOnPressGroup = () => {
    this.props.setCurrentGroup({ group: this.props.group });
    this.props.gotoWithParams(screens.affinityGroupWallScreen);
    this.props.registerEvent(eventNames.group, {
      communityId: this.props.group.id,
      communityName: this.props.group.name,
    });
  };

  renderDescription = (group, metaObject) => {
    const groupDesc = metaObject && metaObject.description ? metaObject.description : path(["description"], group);
    return (
      <View style={styles.titleContainer}>
        <Text>{groupDesc}</Text>
      </View>
    );
  };
  joinGroupPressed = group => {
    const { joinGroup, registerEvent } = this.props;
    registerEvent(eventNames.joinGroup, {
      communityId: group.id,
      communityName: group.name,
    });
    joinGroup(group);
  };
  leaveGroupPressed = group => {
    const { leaveGroup, registerEvent } = this.props;
    registerEvent(eventNames.leaveGroup, {
      communityId: group.id,
      communityName: group.name,
    });
    leaveGroup(group);
  };

  render() {
    const { group, showJoinOption, navigateFrom } = this.props;
    const metaKey = path(["attributes", "contentId"], group);
    const metaObject = this.getMetaObject(metaKey);
    return (
      <View style={styles.baseContainer}>
        <TouchableOpacity
          onPress={this.handleOnPressGroup}
          disabled={navigateFrom !== "content"}
        >
          {this.renderGroupImage(group, metaObject)}
          {this.renderAffinityGroupTitle(group, metaObject)}
          {this.renderDescription(group, metaObject)}
        </TouchableOpacity>
        {navigateFrom != "content" && (
          <Footer
            group={group}
            joinGroup={this.joinGroupPressed}
            leaveGroup={this.leaveGroupPressed}
            showJoinOption={showJoinOption}
            groupPress={this.handleOnPressGroup}
          />
        )}
      </View>
    );
  }
}

Group.propTypes = {
  group: AffinityType.group,
  showJoinOption: bool,
  gotoWithParams: PropTypes.func,
  setCurrentGroup: PropTypes.func,
  joinGroup: PropTypes.func,
  leaveGroup: PropTypes.func,
  registerEvent: PropTypes.func,
  navigateFrom: PropTypes.string,
};

const mapDispatchToProps = {
  gotoWithParams,
  registerEvent,
  setCurrentGroup: payload => ({
    type: actions.setCurrentGroup,
    payload,
  }),
  joinGroup: group => ({
    context: screens.affinityGroupMainScreen,
    type: actions.joinOrLeaveGroup,
    payload: {
      join: true,
      group,
    },
  }),
  leaveGroup: group => ({
    context: screens.affinityGroupMainScreen,
    type: actions.joinOrLeaveGroup,
    payload: {
      join: false,
      group,
    },
  }),
};

export default connect(null, mapDispatchToProps)(Group);

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: Colors.baseBackground,
    borderColor: Colors.lightGrey,
    borderRadius: 2,
    borderWidth: 0.5,
    flexDirection: "column",
    margin: 3,
    padding: 5,
  },
  groupImage: {
    alignSelf: "center",
    aspectRatio: 2.4,
    width: Dimensions.get("window").width - 40,
  },
  titleContainer: {
    paddingLeft: 15,
    paddingTop: 10,
  },
  titleText: {
    color: Colors.titleText,
    fontFamily: "Avenir-Regular",
    fontSize: 20,
    fontWeight: "bold",
  },
});
