import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { pathOr } from "ramda";

import styles from "./styles";
import {
  WPDescription,
  WPBadgeWithText,
  WPShare
} from "../../components";

import { WELLNESS_STAR } from "../../../../config";
import MetaConstants from "../../meta";
import {getHabitDetails} from "../../utils";

class WPDetailsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: {
        id: 1,
        title: "Info"
      }
    };
    this.metaConstants = { ...MetaConstants.screenMeta() };
  }

  renderTab = item => {
    let customStyles = {
      ...styles.titleContainer
    };

    let customTextStyles = {
      color: "#707070",
      fontSize: 10
    };

    if (this.state.selectedTab.id === item.id) {
      customStyles = { ...customStyles, ...styles.bottomBorder };
      customTextStyles = { ...customTextStyles, color: "#ec1c2e" };
    }

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ selectedTab: item, searchSelected: false });
        }}
      >
        <View style={customStyles}>
          <Text style={customTextStyles}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderTabs = tabCount => {
    const tabs = [
      {
        id: 1,
        title: "Info"
      },
      {
        id: 3,
        title: "Unlock"
      }
    ];
    const tabSlides = tabs.splice(0, tabCount);
    return (
      <View style={styles.tabListContainer}>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={tabSlides}
          keyExtractor={item => item.id}
          renderItem={tab => this.renderTab(tab.item)}
        />
      </View>
    );
  };

  render() {
    const { habit, tabCount } = this.props;
    const imageUrl = pathOr("", ["icons", "badge", "tags", "600*600"], habit);

    return (
      <View style={styles.mainContainer}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={{ uri: imageUrl }}
              style={styles.imageStyle}
              resizeMode={"cover"}
            />
          </View>
          <View style={styles.titleStyle}>
            <Text style={styles.titleText}>{getHabitDetails(habit, "name")}</Text>
          </View>
          <View>
            {/* <WPShare /> */}
          </View>
        </View>

        <View style={styles.tabsLayout}>{this.renderTabs(tabCount)}</View>
        <View style={{ marginTop: 3.3 }}>
          <WPDescription
            description={getHabitDetails(habit, "desc")}
            numberOfLines={null}
            action={() => {}}
            habits={[]}
            textStyle={styles.descriptionColor}
          />
          <View>
            <View style={styles.rewardTextContainer}>
              <WPBadgeWithText
                title={`${
                  habit.earnReward ? habit.earnReward.units : 0
                }${" "}${this.metaConstants.badge_upon_completion}`}
                customStyle={styles.badgeCompletionText}
                customIcon={styles.badge}
                customTitleStyle={styles.Customtitle}
              />
              <View style={styles.badgeWithTextBackground}>
                <WPBadgeWithText
                  title= "Invite new friends,complete the habit as group and all earn +50 Bonus Badges"
                  customStyle={styles.badgeCompletionText}
                  customIcon={styles.badge}
                  customTitleStyle={styles.textWithStar}
                />
                <Image source={WELLNESS_STAR} style={styles.starIcon} />
              </View>
            </View>
            <View style={styles.mileStoneContainer}>
              <Text style={styles.duration}>
                {this.metaConstants.wellness_duration}
              </Text>
              <Text style={styles.days}>
                {habit.milestoneCount || 7} {this.metaConstants.wellness_days}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default WPDetailsModal;
