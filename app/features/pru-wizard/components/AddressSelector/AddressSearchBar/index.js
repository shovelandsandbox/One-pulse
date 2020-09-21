/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import {
  Platform,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";
import AppConfig from "../../../../../config/AppConfig";
import PruTextInput from "../../../../../components/PruTextInput";
import theme from "../../../../../themes/default";
import { safeMetaLabelFinder } from "../../../../../utils/meta-utils";

import styles from "./styles";

const searchIcon = props => {
  return (
    <View style={[styles.searchIcon, {
      borderTopLeftRadius: props.borderRadius ? props.borderRadius : 0,
      borderBottomLeftRadius: props.borderRadius ? props.borderRadius : 0
    }]}>
      <Icon name={"search"} color={"gray"}></Icon>
    </View>
  );
};

const clearIcon = props => {
  return (
    <View style={[styles.clearIconContainer,
    {
      borderTopRightRadius: props.borderRadius ? props.borderRadius : 0,
      borderBottomRightRadius: props.borderRadius ? props.borderRadius : 0
    }]}>
      <TouchableOpacity onPress={props.clearInput}>
        <Icon
          name="clear"
          color="white"
          size={20}
          style={{ height: 20, width: 20, textAlign: "center" }}
          containerStyle={styles.clearIcon}
        ></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default class AddressSearchBar extends PureComponent {
  state = {
    addressResults: [],
  };

  onClearInput = () => {
    this.setState({
      addressResults: [],
    });
    this.props.onChange("");
  };

  onChangeText = text => {
    if (text && text.trim().length > 0) {
      this.getPredictions(text);
    }
    this.props.onChange(text);
  };

  onBlur = () => { };

  getPredictions = value => {
    const GOOGLE_API_KEY = AppConfig.getGoogleApiKey(Platform.OS);
    const GOOGLE_PLACES_URL = AppConfig.getGooglePlacesUrl();

    const encodedKey = encodeURIComponent(GOOGLE_API_KEY);
    const encodedValue = encodeURIComponent(value);

    const url = `${GOOGLE_PLACES_URL}?key=${encodedKey}&input=${encodedValue}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log('::::responseJson',responseJson);
        if (responseJson.status === "OK") {
          const addressResults = responseJson.predictions || [];
          this.setState({
            addressResults,
          });
        }
      });
  };

  onAddressSelect = item => {
    this.setState({
      addressResults: [],
    });
    this.props.onAddressSelected(item.description);
    Keyboard.dismiss();
  };

  renderSearchResultList = () => {
    const { addressResults } = this.state;
    if (!addressResults.length) {
      return null;
    }

    const renderItem = ({ item }) => {
      return (
        <View>
          <TouchableOpacity
            style={styles.addressListItemStyle}
            onPress={() => {
              this.onAddressSelect(item);
            }}
          >
            <Text
              style={styles.addressListMainTextStyle}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {item.structured_formatting.main_text}
            </Text>
            <Text
              style={styles.addressListTextStyle}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {item.description}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={styles.addressListContainerStyle}>
        <FlatList
          data={addressResults}
          renderItem={renderItem}
          keyExtractor={({ place_id }) => place_id}
        />
      </View>
    );
  };

  render() {
    const onClearInput = this.onClearInput;
    return (
      <View
        style={[styles.container, Platform.OS == "ios" ? { zIndex: 1 } : null]}
      >
        {this.props.title &&
          <Text style={styles.addressHeader}>{this.props.title}</Text>
        }
        {/* <View style={styles.inputBoxContainer}>
          <Icon name={"search"} color={"white"}></Icon>
          <View style={styles.inputBox}>
            <TextInput
              style={{ marginLeft: 4, marginRight: 16 }}
              placeholder="Search"
              onChangeText={this.onChangeText}
              value={this.props.value}
              onClear={this.onClearInput}
              numberOfLines={0}
              lines={0}
              multiline={true}
            />
          </View>
        </View> */}
        <PruTextInput
          leftComponent={searchIcon(this.props)}
          leftStyle={{
            flex: this.props.flex ? this.props.flex : 0.1
          }}
          rightComponent={clearIcon({
            ...this.props,
            clearInput: onClearInput,
          })}
          rightStyle={{
            flex: this.props.flex ? this.props.flex : 0.1
          }}
          txtInputStyle={{
            borderColor: theme.Colors.greyd9dcde,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            // borderRadius: 5
          }}
          underlineColorAndroid="transparent"
          placeholder="Search"
          title=" "
          onChange={this.onChangeText}
          value={this.props.value}
        />

        {this.renderSearchResultList()}
      </View>
    );
  }
}

AddressSearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onAddressSelected: PropTypes.func,
};
