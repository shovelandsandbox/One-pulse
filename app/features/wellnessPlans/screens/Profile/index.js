import React, { PureComponent } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  WPCard,
  PruBackHeader,
  WPLeaderboardHeader,
  WPLeaderboardRow,
  WPHorizontalFilter
} from "../../components";
import { styles } from "./styles";
import { ConnectedProfileImage } from "../../../../components";
//TODO: fetch data dynamically from API
class Profile extends PureComponent {
  gotoHabits = () => {
    this.props.navigation.goBack();
  };

  gotoReferals = () => {
    this.props.navigation.navigate("RewardCentre");
  };

  renderHeader() {
    let data = [{}, {}, {}];
    return (
      <View style={styles.header}>
        <PruBackHeader title={"My Profile"} customStyles={styles.backstyle} />
        <ConnectedProfileImage
          style={{ right: 0 }}
          size="large"
          variant="outline"
        />
        <Text style={styles.title}>Carolyn Nelson</Text>
        <FlatList
          data={data}
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.headerCountItem,
                  index !== 2 ? styles.itemSeperator : null
                ]}
              >
                <Text style={styles.title}>23</Text>
                <Text style={styles.label}>People Invited</Text>
                <TouchableOpacity onPress={this.gotoReferals}>
                  <Text style={styles.textLink}>My Referals</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        ></FlatList>
      </View>
    );
  }

  renderHabbits() {
    let data = [
      {
        color: "#a6b944",
        status: "In Progress",
        description: "Complete 2 more to get 30 bonus badges",
        count: 3
      },
      {
        color: "#c13a46",
        status: "Healthy",
        description: "Complete 2 more to get 30 bonus badges",
        count: 12
      },
      {
        color: "#3e37a1",
        status: "Professional",
        description: "Complete 2 more to get 30 bonus badges",
        count: 21
      },
      {
        color: "#815ff4",
        status: "Mastered",
        description: "Complete 5 more to get 30 bonus badges",
        count: 21
      }
    ];
    return (
      <WPCard>
        <View style={[styles.titleWrapper, styles.habitsTitle]}>
          <Text style={styles.title}>Habits</Text>
          <TouchableOpacity onPress={this.gotoHabits}>
            <Text style={styles.textLink}>View More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          numColumns={4}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.habitsItem}>
                <AnimatedCircularProgress
                  size={50}
                  width={3}
                  fill={(item.count / 30) * 100} //TODO: divide by total habbit count
                  tintColor={item.color}
                  backgroundColor="#0002"
                  rotation={-360}
                >
                  {fill => (
                    <Text
                      style={[styles.habitsCountText, { color: item.color }]}
                    >
                      {item.count}
                    </Text>
                  )}
                </AnimatedCircularProgress>
                <Text style={styles.habitsStatus}>{item.status}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            );
          }}
        ></FlatList>
      </WPCard>
    );
  }

  renderLeaderboard() {
    return (
      <WPCard style={styles.leaderboardContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Leaderboard</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("WellnessLeaderboard");
            }}
          >
            <Text style={styles.textLink}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterWrapper}>
          <WPHorizontalFilter />
        </View>
        <WPLeaderboardHeader />
        <FlatList
          data={[
            {
              rank: 1,
              username: "Mary Cunningham",
              mastered: 13,
              professional: 13,
              healthy: 14,
              image:
                "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1"
            },
            {
              rank: 2,
              username: "Sara Collins",
              mastered: 9,
              professional: 16,
              healthy: 12,
              image:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd"
            },
            {
              rank: 3,
              username: "Dan Reyes",
              mastered: 7,
              professional: 5,
              healthy: 10,
              image:
                "https://media-exp1.licdn.com/dms/image/C4E03AQFJT8d4FIAqew/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=ho4el2GnDnBoTpz7DSWCoSZQUxubS1WG0JWYD2Qwj1k"
            },
            {
              rank: 4,
              username: "Janice Ellis",
              mastered: 3,
              professional: 11,
              healthy: 7,
              image:
                "http://www.veethi.com/images/people/fullsize/A._Harsha_20150825050811.jpeg"
            },
            {
              rank: 5,
              username: "Kevin Powell",
              mastered: 1,
              professional: 17,
              healthy: 8,
              image:
                "https://res-3.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_120,w_120,f_auto,g_faces,z_0.7,b_white,q_auto:eco/v1481089264/muh5wluagflxvdantncq.png"
            }
          ]}
          renderItem={({ item, index }) => {
            return <WPLeaderboardRow {...item} />;
          }}
        />
      </WPCard>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderHeader()}
        {this.renderHabbits()}
        {this.renderLeaderboard()}
      </ScrollView>
    );
  }
}

export default Profile;
