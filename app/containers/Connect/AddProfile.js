import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  PermissionsAndroid,
} from "react-native";
import {
  CoreComponents,
  CoreConfig,
  CoreConstants,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
import Icon from "react-native-vector-icons/FontAwesome";
import { activeTheme } from "../../themes";
import { AddProfileStyles } from "./styles";
import { NETWORK } from "../../config/images";
import { connect } from "react-redux";

const { pageKeys } = CoreConfig;
const { AppButton, OrDivider } = CoreComponents;
const { colors } = CoreConfig;
const { META_ADD_PROFILE } = CoreConstants;
const { GO_TO_CONTACT_LIST } = CoreActionTypes;

class AddProfile extends Component {
  onConnect() {
    const { navigation } = this.props;
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      granted.then(res => {
        if (res === PermissionsAndroid.RESULTS.GRANTED) {
          this.props.goToContactList();
        } else {
          alert(JSON.stringify(res));
        }
      });
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={[activeTheme.container, activeTheme.wrapper]}>
        <Text style={AddProfileStyles.screenTitle}>
          {META_ADD_PROFILE.title}
        </Text>
        <Text style={AddProfileStyles.screenDescription}>
          {META_ADD_PROFILE.description}
        </Text>
        <Image
          source={NETWORK}
          style={AddProfileStyles.screenImage}
          resizeMode="contain"
        />
        <AppButton
          type={[activeTheme.btn, activeTheme.primary]}
          title={META_ADD_PROFILE.buttonTitle}
          press={this.onConnect.bind(this)}
        />
        <OrDivider />
        <KeyboardAvoidingView>
          <View style={AddProfileStyles.textInput}>
            <Icon name="search" size={20} color={colors.nevada} />
            <TextInput
              style={{ flex: 1 }}
              placeholder={META_ADD_PROFILE.searchPlaceholder}
            />
            <Icon name="caret-right" size={20} color={colors.nevada} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(
  null,
  {
    goToContactList: () => ({
      context: pageKeys.ADD_PROFILE,
      type: GO_TO_CONTACT_LIST,
    }),
  }
)(AddProfile);
