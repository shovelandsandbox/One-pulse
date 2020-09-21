import React, { PureComponent } from "react";
import { View, Text, TextInput } from "react-native";
import AddressSearchBar from "./AddressSearchBar";
import AddressMapView from "./AddressMapView";
import WithLocation from "./WithLocation";
import styles from "./styles";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import PropTypes from "prop-types";

export default class AddressSelector extends PureComponent {
  //this will be used to fetch location - do not search for loaction when user just types - it has to be selected from the dropdown
  state = {
    completeAddress: this.props.fieldValue,
  };

  onCompleteAddressSelected = completeAddress => {
    //this will trigger WithLocation get location which in turn will update mapview
    this.setState(
      {
        completeAddress,
      },
      () => {
        this.props.onChange(completeAddress);
      }
    );
  };

  renderError = () => {
    if (!this.props.exception) {
      return null;
    }
    return (
      <View>
        <Text style={{...styles.exception, ...configureLineHeight("12")}}>{this.props.errorMessage}</Text>
      </View>
    );
  };

  renderAddress = () => {
    return (
      <View style={styles.subAddressContainer}>
        <Text style={styles.subAddressStyle}>{this.props.fieldValue}</Text>
      </View>
    );
  };

  onChange = val => {
    this.setState({ query: val });
    this.props.onChange(val);

  };

  render() {
    return (
      <View style={styles.container}>
        <AddressSearchBar
          onChange={this.onChange}
          value={this.state.query}
          onAddressSelected={this.onCompleteAddressSelected}
          title={this.props.title}
          flex={this.props.flex}
          borderRadius={this.props.borderRadius}

        />
        {this.renderError()}
        <View style={styles.addressMapContainer}>
          <WithLocation
            address={this.state.completeAddress}
            getAddressObject = {this.props.getFormattedAddress}
            onChange={this.props.onChange}
          >
            {(location, onLocationChanged) => (
              <AddressMapView
                onCoordinatesChanged={onLocationChanged}
                location={location}
              />
            )}
          </WithLocation>
        </View>

        {this.props.fieldValue ? this.renderAddress() : null}

      </View>
    );
  }
}

AddressSelector.propTypes = {
  fieldValue: PropTypes.string,
  onChange: PropTypes.func,
  exception: PropTypes.bool,
  errorMessage: PropTypes.string,
};
