import React, { PureComponent } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  PruBackHeader,
  WPAvatar,
  WPStatRow,
  WPShare,
  WPGroupRankCard,
} from "../../components";
import { WELLNESS_GROUP2 } from "../../../../config";
import { styles } from "./styles";
class GroupDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      selectedBottomTab: 0,
    };
  }

  onTabChange = index => {
    this.setState({
      selectedTab: index,
    });
  };

  onBottomTabPress = index => {
    this.setState({
      selectedBottomTab: index,
    });
  };

  renderHeader() {
    return (
      <PruBackHeader
        renderTitle={() => {
          return (
            <View style={styles.titleWrapper}>
              <WPAvatar
                source={WELLNESS_GROUP2}
                style={styles.titleIconWrapper}
                imageStyle={styles.titleIconImage}
              />
              <Text style={styles.titleText}>Office Group</Text>
            </View>
          );
        }}
      />
    );
  }

  renderTab = () => {
    const { selectedTab } = this.state;
    return (
      <View style={styles.TopTabContainer}>
        <FlatList
          contentContainerStyle={styles.flatlistContainer}
          extraData={this.state}
          horizontal={true}
          data={[{ name: "Stats" }, { name: "Chat" }]}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => this.onTabChange(index)}
              >
                <Text
                  style={[
                    styles.selectedTabText,
                    selectedTab != index ? styles.unSelectedTabText : null,
                  ]}
                >
                  {item.name}
                </Text>
                <View
                  style={
                    selectedTab === index
                      ? styles.TabUnderline
                      : styles.tabUnderlineTransparent
                  }
                />
              </TouchableOpacity>
            );
          }}
        />
        <WPShare />
      </View>
    );
  };

  renderAllTimeList = () => {
    return (
      <>
        <WPGroupRankCard />
        <FlatList
          style={styles.listContainer}
          extraData={this.state}
          data={[
            {
              rank: 4,
              username: "Mary Cunningham",
              mastered: 13,
              professional: 13,
              healthy: 14,
              habitsCount: 25,
              image:
                "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
            },
            {
              rank: 5,
              username: "Sara Collins",
              mastered: 9,
              professional: 16,
              healthy: 12,
              habitsCount: 23,
              image:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd",
            },
            {
              rank: 6,
              username: "Dan Reyes",
              mastered: 7,
              professional: 5,
              healthy: 10,
              habitsCount: 15,
              image:
                "https://media-exp1.licdn.com/dms/image/C4E03AQFJT8d4FIAqew/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=ho4el2GnDnBoTpz7DSWCoSZQUxubS1WG0JWYD2Qwj1k",
            },
            {
              rank: 7,
              username: "Janice Ellis",
              mastered: 3,
              professional: 11,
              healthy: 7,
              habitsCount: 12,
              image:
                "http://www.veethi.com/images/people/fullsize/A._Harsha_20150825050811.jpeg",
            },
            {
              rank: 8,
              username: "Kevin Powell",
              mastered: 1,
              professional: 17,
              healthy: 8,
              habitsCount: 11,
              image:
                "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_120,w_120,f_auto,g_faces,z_0.7,b_white,q_auto:eco/v1481089264/muh5wluagflxvdantncq.png",
            },
            {
              rank: 9,
              username: "Mary Cunningham",
              mastered: 13,
              professional: 13,
              healthy: 14,
              habitsCount: 10,
              image:
                "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
            },
            {
              rank: 10,
              username: "Sara Collins",
              mastered: 9,
              professional: 16,
              healthy: 12,
              habitsCount: 8,
              image:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd",
            },
            {
              rank: 11,
              username: "Dan Reyes",
              mastered: 7,
              professional: 5,
              healthy: 10,
              habitsCount: 7,
              image:
                "https://media-exp1.licdn.com/dms/image/C4E03AQFJT8d4FIAqew/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=ho4el2GnDnBoTpz7DSWCoSZQUxubS1WG0JWYD2Qwj1k",
            },
            {
              rank: 12,
              username: "Janice Ellis",
              mastered: 3,
              professional: 11,
              healthy: 7,
              habitsCount: 5,
              image:
                "http://www.veethi.com/images/people/fullsize/A._Harsha_20150825050811.jpeg",
            },
            {
              rank: 13,
              username: "Kevin Powell",
              mastered: 1,
              professional: 17,
              healthy: 8,

              habitsCount: 3,
              image:
                "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_120,w_120,f_auto,g_faces,z_0.7,b_white,q_auto:eco/v1481089264/muh5wluagflxvdantncq.png",
            },
          ]}
          renderItem={({ item }) => {
            return <WPStatRow item={item} status="allTime" />;
          }}
        />
      </>
    );
  };

  renderList = () => {
    const { selectedBottomTab } = this.state;

    if (selectedBottomTab == 1) {
      return this.renderAllTimeList();
    }
    return (
      <>
        <Text style={styles.progressText}>Your Progress</Text>
        <FlatList
          style={styles.listContainer}
          extraData={this.state}
          data={[
            {
              rank: 4,
              username: "Mary Cunningham",
              mastered: 13,
              professional: 13,
              healthy: 14,
              habitsCount: 25,
              image:
                "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
            },
            {
              rank: 5,
              username: "Sara Collins",
              mastered: 9,
              professional: 16,
              healthy: 12,
              habitsCount: 23,
              image:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd",
            },
            {
              rank: 6,
              username: "Dan Reyes",
              mastered: 7,
              professional: 5,
              healthy: 10,
              habitsCount: 15,
              image:
                "https://media-exp1.licdn.com/dms/image/C4E03AQFJT8d4FIAqew/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=ho4el2GnDnBoTpz7DSWCoSZQUxubS1WG0JWYD2Qwj1k",
            },
            {
              rank: 7,
              username: "Janice Ellis",
              mastered: 3,
              professional: 11,
              healthy: 7,
              habitsCount: 12,
              image:
                "http://www.veethi.com/images/people/fullsize/A._Harsha_20150825050811.jpeg",
            },
            {
              rank: 8,
              username: "Kevin Powell",
              mastered: 1,
              professional: 17,
              healthy: 8,
              habitsCount: 11,
              image:
                "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_120,w_120,f_auto,g_faces,z_0.7,b_white,q_auto:eco/v1481089264/muh5wluagflxvdantncq.png",
            },
            {
              rank: 9,
              username: "Mary Cunningham",
              mastered: 13,
              professional: 13,
              healthy: 14,
              habitsCount: 10,
              image:
                "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
            },
            {
              rank: 10,
              username: "Sara Collins",
              mastered: 9,
              professional: 16,
              healthy: 12,
              habitsCount: 8,
              image:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd",
            },
            {
              rank: 11,
              username: "Dan Reyes",
              mastered: 7,
              professional: 5,
              healthy: 10,
              habitsCount: 7,
              image:
                "https://media-exp1.licdn.com/dms/image/C4E03AQFJT8d4FIAqew/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=ho4el2GnDnBoTpz7DSWCoSZQUxubS1WG0JWYD2Qwj1k",
            },
            {
              rank: 12,
              username: "Janice Ellis",
              mastered: 3,
              professional: 11,
              healthy: 7,
              habitsCount: 5,
              image:
                "http://www.veethi.com/images/people/fullsize/A._Harsha_20150825050811.jpeg",
            },
            {
              rank: 13,
              username: "Kevin Powell",
              mastered: 1,
              professional: 17,
              healthy: 8,

              habitsCount: 3,
              image:
                "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_120,w_120,f_auto,g_faces,z_0.7,b_white,q_auto:eco/v1481089264/muh5wluagflxvdantncq.png",
            },
          ]}
          renderItem={({ item }) => {
            return <WPStatRow item={item} status="current" />;
          }}
        />
      </>
    );
  };

  renderBottomTabs = () => {
    const { selectedBottomTab } = this.state;
    const data = [{ name: "Current" }, { name: "All Time" }];
    return (
      <View style={styles.bottomTabContainer}>
        <FlatList
          contentContainerStyle={styles.bottomTabList}
          horizontal={true}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  selectedBottomTab === index
                    ? styles.bottomTabSelectedItem
                    : styles.bottomTabUnselectedItem,
                  index == 0 ? styles.bottomTabStartItem : null,
                  index == data.length - 1 ? styles.bottomTabLastItem : null,
                ]}
                onPress={() => this.onBottomTabPress(index)}
              >
                <Text
                  style={
                    index === selectedBottomTab
                      ? styles.bottomTabSelectedStyle
                      : styles.bottomTabUnselectedStyle
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <>
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderTab()}
          {selectedTab == 0 ? (
            this.renderList()
          ) : (
            <View style={styles.comingSoon}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          )}
        </View>
        {selectedTab == 0 && this.renderBottomTabs()}
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};
GroupDetails.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
