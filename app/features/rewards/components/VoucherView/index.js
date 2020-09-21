/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./style";
import VoucherRowItem from "../VoucherRowItem";
import { goToScreens } from "../../actions";
import { pathOr } from "ramda";
class VoucherView extends Component {
  constructor(props) {
    super(props);
  }
  onDetailPress = item => {
    const { goToScreens } = this.props;
    goToScreens({ id: item.id }, "VoucherDetails");
  };

  handleOnPress = item => {
    const { goToScreens } = this.props;
    goToScreens({ id: item.id }, "QRScreen");
  };

  handleTnCPress = link => {
    const { goToScreens } = this.props;
    const params = {
      source: {
        uri: link,
      },
    };
    goToScreens(params, "PdfView");
  };

  renderItem = item => {
    const qrImage = pathOr(null, ["item", "image", "content"], item);
    const status = pathOr(null, ["item", "status"], item);
    const isVoucherActive = status === "ACTIVE" || status === "PARTIALREDEEMED";
    return (
      <VoucherRowItem
        item={item.item}
        onDetailPress={this.onDetailPress}
        language={this.props.language}
        onPress={this.handleOnPress}
        disabled={qrImage === null || !isVoucherActive}
        onTnCPress={this.handleTnCPress}
        country={this.props.country}
      />
    );
  };
  render() {
    const { data } = this.props;
    return (
      <View>
        <FlatList data={data} renderItem={this.renderItem} />
      </View>
    );
  }
}
VoucherView.propTypes = {
  data: PropTypes.object,
  goToScreens: PropTypes.func,
  language: PropTypes.string,
  country: PropTypes.string,
};
const mapStateToProps = state => {
  const {
    userPreferences: { language },
    auth: { countryInfo },
  } = state;
  return {
    language,
    country: countryInfo.simCountry,
  };
};
export default connect(mapStateToProps, {
  goToScreens,
})(VoucherView);
