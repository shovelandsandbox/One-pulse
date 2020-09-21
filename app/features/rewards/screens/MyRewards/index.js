import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { goToScreens } from "../../actions";

import { REWARD_BG } from "../../../../config/images";
import MetaConstants from "../../meta";
import { PruBackHeader } from "../../../../components";
import { MyRewardsCard } from "../../components";

class MyRewards extends PureComponent {
  constructor(props) {
    super(props);
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  handleTnCPress = link => {
    const { goToScreens } = this.props;
    const params = {
      source: {
        uri: link,
      },
    };
    goToScreens(params, "PdfView");
  };

  renderHeader() {
    return (
      <View style={styles.backContainer}>
        <PruBackHeader title={"My Rewards"} />
      </View>
    );
  }

  onDetailPress = item => {
    const { goToScreens } = this.props;
    goToScreens({ id: item.id }, "VoucherDetails");
  };

  render() {
    const { myVouchers } = this.props;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ImageBackground
          source={REWARD_BG}
          style={{ width: "100%", height: "100%" }}
          resizeMode={"stretch"}
        >
          <FlatList
            data={myVouchers}
            contentContainerStyle={{
              justifyContent: "center",
              alignSelf: "center",
              paddingTop: 20,
              paddingBottom: 40,
            }}
            renderItem={({ item, index }) => {
              return (
                <MyRewardsCard
                  isVertical
                  item={item}
                  index={index}
                  onTnCPress={this.handleTnCPress}
                  language={this.props.language}
                  country={this.props.country}
                  onDetailPress={this.onDetailPress}
                />
              );
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    userPreferences: { language },
    auth: { countryInfo },
  } = state;
  return {
    language,
    country: countryInfo.simCountry,
    myVouchers: state.rewardCenter.vouchers,
  };
};

const mapDispatchToProps = { goToScreens };

export default connect(mapStateToProps, mapDispatchToProps)(MyRewards);

const styles = StyleSheet.create({
  backContainer: {
    borderBottomWidth: 0.2,
    shadowColor: "#e2e2e2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: "#fff",
    elevation: 4,
  },
  container: { backgroundColor: "#f4f7fc", flex: 1 },
});
