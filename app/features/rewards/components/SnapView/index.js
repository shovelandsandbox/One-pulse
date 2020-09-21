import React, { PureComponent } from "react";
import { Text, View, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import MetaConstants from "../../meta";
import { RewardCard } from "../../components";

export class SnapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bonusActivityList: [],
      activeSlide: 0,
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    const bonusActivityList = this.MetaConstants.bonusActivityList;
    this.setState({ bonusActivityList });
  }

  renderItem = ({ item, index }) => {
    return <RewardCard item={item} />;
  };

  get pagination() {
    const { bonusActivityList, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={bonusActivityList.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingTop: 14, paddingBottom: 4 }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "#c4c2c2",
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#606060",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <View style={{ paddingTop: 10 }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.bonusActivityList.slice(0, 4)}
          renderItem={this.renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={200}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          autoplay={true}
          lockScrollWhileSnapping={true}
          autoplayInterval={3500}
          contentContainerStyle={{ padding: 0, margin: 0 }}
          containerStyle={{ margin: 0 }}
        />
        {this.pagination}
      </View>
    );
  }
}
