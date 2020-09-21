import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { activeTheme } from "../../themes";
import { connect } from "react-redux";

import { CoreConstants, CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";

import { ProfileConnectStyles } from "./styles";
const { META_PROFILE_CONNECT } = CoreConstants;
const { pageKeys } = CoreConfig;
const { GO_TO_ADD_PROFILE } = CoreActionTypes;

class ProfileConnect extends Component {
  renderConnect() {
    const { navigation } = this.props;
    if (META_PROFILE_CONNECT.connections.length === 0) {
      return (
        <View>
          <Text>{META_PROFILE_CONNECT.noConnection}</Text>
          <View style={ProfileConnectStyles.horizontalLine} />
          <TouchableOpacity onPress={() => this.props.goToAddProfile()}>
            <Text style={ProfileConnectStyles.add}>
              {META_PROFILE_CONNECT.add}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        <View style={ProfileConnectStyles.horizontalLine} />
        {META_PROFILE_CONNECT.connections.map((data, index) => (
          <View key={data.recordID}>
            <View style={ProfileConnectStyles.flexRow}>
              <View style={ProfileConnectStyles.imageContainer}>
                <Image
                  source={data.src}
                  style={ProfileConnectStyles.profileImage}
                />
              </View>
              <View>
                <Text style={ProfileConnectStyles.connectionName}>
                  {data.name}
                </Text>
                <Text style={ProfileConnectStyles.connectionTagLine}>
                  {data.tag}
                </Text>
                {this.renderRelationship(data)}
              </View>
            </View>
            <View style={ProfileConnectStyles.horizontalLine} />
          </View>
        ))}
        <TouchableOpacity onPress={() => this.props.goToAddProfile()}>
          <Text style={ProfileConnectStyles.add}>
            {META_PROFILE_CONNECT.addMore}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderRelationship(data) {
    if (data.relationship) {
      return (
        <Text style={ProfileConnectStyles.connectionRelationship}>
          {data.relationshipTitle}
        </Text>
      );
    }
    return (
      <TouchableOpacity>
        <Text style={ProfileConnectStyles.connectionRelationship}>
          {data.relationshipTitle}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[activeTheme.container, activeTheme.wrapper]}>
        <Text style={ProfileConnectStyles.screenTitle}>
          {META_PROFILE_CONNECT.title}
        </Text>
        <View>{this.renderConnect()}</View>
      </View>
    );
  }
}
export default connect(
  {
    goToAddProfile: () => ({
      context: pageKeys.PROFILE_CONNECT,
      type: GO_TO_ADD_PROFILE
    })
  }
)(ProfileConnect);
