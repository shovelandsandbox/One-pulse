import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  Keyboard
} from "react-native";
import { Icon } from "react-native-elements";
import { pathOr } from "ramda";
import { styles } from './styles'
import PropTypes from "prop-types";
import AppConfig from "../../../../config/AppConfig";
import metaConstants from "../../meta";
import PruTextInput from "../../../../components/PruTextInput";
import theme from "../../../../themes/default";

const searchIcon = props => {
  return (
    <View style={styles.searchIcon}>
      <Icon name={"search"} color={"gray"}></Icon>
    </View>
  );
};

const clearIcon = props => {
  return (
    <View style={styles.clearIconContainer}>
      <TouchableOpacity onPress={props.clearInput}>
        <Icon
          name="clear"
          color="white"
          size={20}
          style={{ height: 10, width: 20, textAlign: "center" }}
          containerStyle={styles.clearIcon}
        ></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default class SearchComponent extends PureComponent {


  state = {
    addressResults: [],
  };

  componentDidMount() {

    // this.setState({
    //   locations,
    // });
  }


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
        if (responseJson.status === "OK") {
          const addressResults = responseJson.predictions || [];
          console.log("addressResults", addressResults);
          this.setState({
            addressResults,
          });
        }
      });
  };

  renderSearchResultList = () => {
    const { addressResults } = this.state;
    if (!addressResults.length) {
      return null;
    }

    const renderItem = ({ item }) => {
      return (
        <View >
          <TouchableOpacity
            style={styles.addressListItemStyle}
            onPress={() => {
              this.onAddressSelect(item);
            }}
          >
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
          style={{ padding: 10 }}
          renderItem={renderItem}
          keyExtractor={({ place_id }) => place_id}
        />
      </View>
    );
  };

  onAddressSelect = item => {
    this.setState({
      addressResults: [],
    });
    const GOOGLE_API_KEY = AppConfig.getGoogleApiKey(Platform.OS);
    const GOOGLE_PLACES_URL = AppConfig.getGooglePlaceDetailsUrl();

    const encodedKey = encodeURIComponent(GOOGLE_API_KEY);
    const encodedValue = encodeURIComponent(item.place_id);

    const url = `${GOOGLE_PLACES_URL}?key=${encodedKey}&place_id=${encodedValue}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === "OK") {
          const placeDetails = responseJson.result || {};
          var lat = pathOr("", ["geometry", "location", "lat"], placeDetails);
          var long = pathOr("", ["geometry", "location", "lng"], placeDetails);
          this.props.onAddressSelected(item.description, lat, long);
        }
      });

    Keyboard.dismiss();
  };

  render() {
    const onClearInput = this.onClearInput;
    return (
      <View
        style={[styles.container, Platform.OS == "ios" ? { zIndex: 1 } : null]}
      >

        <PruTextInput
          // onFocus={this.props.dispatchEvent}
          leftComponent={searchIcon(this.props)}
          leftStyle={styles.leftStyle}
          rightComponent={clearIcon({
            ...this.props,
            clearInput: onClearInput,
          })}
          rightStyle={styles.leftStyle}
          txtInputStyle={styles.textInputStyle}
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

SearchComponent.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onAddressSelected: PropTypes.func,
};