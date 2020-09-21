import React, { PureComponent } from "react";
import styles from "./styles";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

const REGION_DELTA = 0.0625 * 0.5 * 0.5;

export default class AddressMapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { location } = this.props;
    if (this.isValidLocation(location)) {
      this.setRegion(location);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      location: { latitude: prevLatitude, longitude: prevLongitude } = {},
    } = prevProps;

    const { location: { latitude, longitude } = {} } = this.props;

    if (prevLatitude !== latitude || prevLongitude !== longitude) {
      this.setRegion(this.props.location);
    }
  }

  isValidLocation = location => {
    return location && location.latitude && location.longitude;
  };

  setRegion = ({ latitude, longitude }) => {
    this.setState({
      region: this.getRegion({
        latitude,
        longitude,
      }),
    });
  };

  getRegion = coordinates => {
    return {
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
      latitudeDelta: REGION_DELTA,
      longitudeDelta: REGION_DELTA,
    };
  };

  onRegionChangeComplete = region => {
    this.props.onCoordinatesChanged(region.latitude, region.longitude);
  };

  render() {
    const { region } = this.state;
    return (
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChangeComplete={this.onRegionChangeComplete}
        showsUserLocation={true}
        ref={map => (this.mapView = map)}
      >
        {region && region.latitude && region.longitude && (
          <Marker coordinate={region} />
        )}
      </MapView>
    );
  }
}

AddressMapView.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  onCoordinatesChanged: PropTypes.func,
};
