import React, { PureComponent } from "react";
import {
  permissions,
  getCurrentLocation,
  getLatLongFromAddress,
  getAddressFromLatLong,
} from "./LocationService";
import PropTypes from "prop-types";

export default class WithLocation extends PureComponent {
  state = {
    location: undefined,
  };

  componentDidMount() {
    this.getCoordinates(this.getCurrentLocation);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) {
      this.getCoordinates();
    }
  }

  getCurrentLocation = () => {
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

  getCoordinates = getLocation => {
    const { address,getAddressObject } = this.props;
    if (address && address.trim()) {
      //fetch location and update
      getLatLongFromAddress(address).then(coordinates => {
        if (coordinates) {
          this.setState({
            location: coordinates,
          },()=>{
              if(getAddressObject){
                getAddressObject(coordinates);
              }
          });
        }
      });
    } else {
      //fetch current location and update
      getLocation && getLocation();
    }
  };

  setCurrentLocation = () => {
    getCurrentLocation().then(coordinates => {
      this.setState({
        location: coordinates,
      });
    });
  };

  onLocationChanged = (latitude, longitude) => {
    getAddressFromLatLong(latitude, longitude).then(address => {
      this.props.onChange(address);
      this.setState({
        location: {
          latitude,
          longitude,
        },
      });
    });
  };

  render() {
    return React.Children.only(
      this.props.children(this.state.location, this.onLocationChanged)
    );
  }
}

WithLocation.propTypes = {
  address: PropTypes.string,
  onChange: PropTypes.func,
};
