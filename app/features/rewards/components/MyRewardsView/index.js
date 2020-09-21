import React, { PureComponent } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import MyRewardsCard from "../MyRewardsCard";
import { goToScreens } from "../../actions";
class MyRewardsView extends PureComponent {
  handleTnCPress = link => {
    const { goToScreens } = this.props;
    const params = {
      source: {
        uri: link,
      },
    };
    goToScreens(params, "PdfView");
  };

  onDetailPress = item => {
    const { goToScreens } = this.props;
    goToScreens({ id: item.id }, "VoucherDetails");
  };

  render() {
    const { myVouchers } = this.props;
    return (
      <View>
        <FlatList
          data={myVouchers.filter(item => item.status === "ACTIVE").slice(0, 4)}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <MyRewardsCard
                item={item}
                index={index}
                onTnCPress={this.handleTnCPress}
                language={this.props.language}
                country={this.props.country}
                onDetailPress={this.onDetailPress}
              />
            );
          }}
          horizontal={true}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRewardsView);
