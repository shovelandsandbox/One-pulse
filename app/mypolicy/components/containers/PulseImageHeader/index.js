import React, { Component } from "react";
import { View, Image } from "react-native";
import { Service_Header } from "../../../../config/images";
import { PLUK_LOGO } from "../../../../config/images";
import { connect } from "react-redux";

class PulseImageHeader extends Component {
  render() {
    return (
      <Image
        source={this.props.simCountry === "PH" ? PLUK_LOGO : Service_Header}
        style={{
          height: 28,
          aspectRatio: this.props.simCountry === "PH" ? 4.3 : 384 / 124
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    simCountry: state.auth.countryInfo.simCountry,
  }
}

export default connect(mapStateToProps, {
})(PulseImageHeader);