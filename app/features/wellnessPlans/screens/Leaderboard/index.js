import React, { PureComponent } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import {
  WPHorizontalFilter,
  PruBackHeader,
  WPLeaderboardHeader,
  WPLeaderboardRow
} from "../../components";
import { styles } from "./styles";
import ShadowWrapper from "../../../../components/ShadowWrapper";
class Leaderboard extends PureComponent {
  renderHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <PruBackHeader title={"Leaderboard"} customStyles={{}} />
      </View>
    );
  };

  renderHorizontalFilter = () => {
    return (
      <View style={styles.filterWrapper}>
        <WPHorizontalFilter />
      </View>
    );
  };

  renderLeaderBoardList = () => {
    return (
      <View>
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
                "https://thesouthofglobe.com/wp-content/uploads/2019/08/IMG_20180801_160154_809-336x420.jpg"
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
            },
            {
              rank: 6,
              username: "Mary Collins ",
              mastered: 13,
              professional: 13,
              healthy: 14,
              image:
                "https://d1hbpr09pwz0sk.cloudfront.net/profile_pic/harsha-senanayake-1238b686"
            },
            {
              rank: 7,
              username: "Sara Cunningham",
              mastered: 9,
              professional: 16,
              healthy: 12,
              image:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd"
            },
            {
              rank: 8,
              username: "Dan Ellis",
              mastered: 7,
              professional: 5,
              healthy: 10,
              image:
                "https://media-exp1.licdn.com/dms/image/C4E03AQFJT8d4FIAqew/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=ho4el2GnDnBoTpz7DSWCoSZQUxubS1WG0JWYD2Qwj1k"
            },
            {
              rank: 9,
              username: "Reyes Janice ",
              mastered: 3,
              professional: 11,
              healthy: 7,
              image:
                "http://www.veethi.com/images/people/fullsize/A._Harsha_20150825050811.jpeg"
            },
            {
              rank: 10,
              username: "Powell Kevin ",
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
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View>{this.renderHeader()}</View>
        <ScrollView style={styles.scrollContainer}>
          {this.renderHorizontalFilter()}
          {this.renderLeaderBoardList()}
        </ScrollView>
      </View>
    );
  }
}

export default Leaderboard;
