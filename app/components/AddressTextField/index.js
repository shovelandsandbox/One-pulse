import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";

// custom
import NewTextInput from "../NewTextInput";
import {
  permissions,
  getCurrentLocation,
  getLatLongFromAddress,
  getAddressFromLatLong,
} from "../../features/pru-wizard/components/AddressSelector/LocationService";
import AppConfig from "../../config/AppConfig";


import { pathOr } from "ramda";

export default class AddressTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressSuggestion: null,
      addressResults: [],
      numberOfLines: 1,
      showAddressSuggestion: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log("nextProps.presetValue",nextProps.presetValue)
    // console.log("this.props.presetValue", this.props.presetValue)
    const curr_textVal = pathOr("", ["presetValue"], this.props);
    const next_textVal = pathOr("", ["presetValue"], nextProps);
    if (!next_textVal || !next_textVal.trim()) {
      this.setState(() => ({ addressResults: [] }));
    } else if (
      curr_textVal.trim() !== next_textVal.trim() &&
      next_textVal.trim()
    ) {
      this.getPredictions(next_textVal);
      if (next_textVal.trim().length > 50) {
        const numberOfLines = parseInt(next_textVal.trim().length / 50) + 1;
        this.setState(() => ({ numberOfLines }));
      } else {
        this.setState(() => ({ numberOfLines: 1 }));
      }
    }
  }

  componentDidMount() {
    this.setUserCurrentAddress();
  }

  setCurrentLocation = () => {
    getCurrentLocation().then(({ latitude, longitude }) => {
      getAddressFromLatLong(latitude, longitude).then(address => {
        this.setState(() => ({ addressSuggestion: address.toString() }));
      });
    });
  };

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
          this.setState({
            addressResults,
          });
        }
      });
  };

  setUserCurrentAddress = () => {
    permissions.checkLocationPermission().then(hasPermission => {
      if (hasPermission) {
        this.setCurrentLocation();
      } else {
        permissions.requestLocationPermission().then(granted => {
          if (granted) {
            this.setCurrentLocation();
          }
        });
      }
    });
  };

  render() {
    console.log("addressresults", this.state.addressResults);
    return (
      <View style={{ position: "relative" }}>
        <NewTextInput
          {...this.props}
          multiline
          numberOfLines={this.state.numberOfLines}
          onChange={value => {
            this.props.onChange ? this.props.onChange(value) : () => {};
            const val = pathOr(false, ["showAddressSuggestion"], this.state);
            if (!val) {
              this.setState(() => ({ showAddressSuggestion: true }));
            }
          }}
          onFocus={() => {
            this.props.onFocus ? this.props.onFocus() : () => { };
            const val = pathOr("", ["presetValue"], this.props);
            if (!val.trim()) {
              this.setState(() => ({ showAddressSuggestion: true }));
            }
          }}
          onBlur={e => {
            this.props.onBlur ? this.props.onBlur() : () => { };
            // close suggestions
          }}
        />
        {this.props.showAddressSuggestion && this.state.showAddressSuggestion ?
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps={"handled"}
            style={{
              backgroundColor: "#fff",
              borderWidth: 0.5,
              borderColor: "silver",
              elevation: 2,
              padding: 8,
              width: "100%",
              marginTop: this.state.numberOfLines * 10 - 25,
              //position: "absolute",
              //top: 50 + this.state.numberOfLines * 10,
              flex: 1,
              maxHeight: 100,
              overflow: "scroll",
            }}
          >
            {this.state.addressSuggestion &&
              this.state.addressResults.length === 0 ?
              <TouchableOpacity
                onPress={e => {
                  this.props.onAddressSuggestionPress
                    ? this.props.onAddressSuggestionPress(
                      this.state.addressSuggestion
                    )
                    : () => { };
                  this.setState(() => ({ showAddressSuggestion: false }));
                }}
                style={{ marginBottom: 8 }}
              >
                <Text style={{ fontSize: 12 }}>
                  {this.state.addressSuggestion}
                </Text>
              </TouchableOpacity>
              : null
            }
            {this.state.addressResults.map(address => {
              return (
                <TouchableOpacity
                  onPress={e => {
                    this.props.onAddressSuggestionPress
                      ? this.props.onAddressSuggestionPress(address.description)
                      : () => { };
                    this.setState(() => ({ showAddressSuggestion: false }));
                  }}
                  style={{ marginBottom: 8 }}
                >
                  <Text style={{ fontSize: 12 }}>{address.description}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          : null
        }
      </View>
    );
  }
}
