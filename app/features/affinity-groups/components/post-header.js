import _ from "lodash";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Colors from "../utils/colors";
import AvatarUtils from "../utils/avatar";

export default class PostHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderAvatar() {
    const { title, imageUrl } = this.props;
    if (!_.isEmpty(title)) {
      const shortName = AvatarUtils.getShortName(title);
      return (
        <View style={styles.avatarContainer}>
          {_.isEmpty(imageUrl) ? (
            <Avatar
              rounded
              title={shortName}
              overlayContainerStyle={styles.avatarOverlay}
            />
          ) : (
            <Avatar
              rounded
              title={shortName}
              source={{
                uri: imageUrl,
              }}
            />
          )}
        </View>
      );
    }
    return null;
  }

  render() {
    const { title, subtitle, actions } = this.props;
    return (
      <View style={styles.headerContainer}>
        {this.renderAvatar()}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.actionContainer}>
          {actions &&
            actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                style={styles.iconContainer}
              >
                <Icon
                  raised
                  name={action.icon}
                  color={Colors.darkGrey}
                  size={16}
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }
}

PostHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageUrl: PropTypes.string,
  actions: PropTypes.object,
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  avatarContainer: {},
  avatarOverlay: {
    backgroundColor: Colors.postAvatar,
    padding: 2,
  },
  headerContainer: {
    backgroundColor: Colors.baseBackground,
    flexDirection: "row",
    marginBottom: 10,
  },
  headerSubtitle: {
    color: Colors.postTitleText,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
  },
  headerTitle: {
    color: Colors.postTitleText,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerTitleContainer: {
    marginLeft: 10,
    paddingLeft: 5,
  },
  iconContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
});
