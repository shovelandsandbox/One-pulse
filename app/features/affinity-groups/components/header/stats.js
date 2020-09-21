import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import {
  HEART_FILLED,
  COMMENT_FILLED_GREY,
} from "../../../../../assets/images/affinityGroup";
import { stats as statsType } from "../../types";
import colors from "../../utils/colors";
import { metaFinderAG } from "../../utils/meta-utils";

export default function Stats({ stats = {} }) {
  const { likes = 0, comments = 0, dislike = 0 } = stats;

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image source={HEART_FILLED} style={styles.iconLike} />
        <Text style={styles.text}>
          {" "}
          {likes - dislike <0 ? 0 :likes - dislike } {metaFinderAG("Likes")}
        </Text>
      </View>
      <View style={styles.icon}>
        <Image source={COMMENT_FILLED_GREY} style={styles.iconComment} />
        <Text style={styles.text}>
          {" "}
          {comments} {metaFinderAG("Comments")}
        </Text>
      </View>
    </View>
  );
}

Stats.propTypes = {
  stats: statsType,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
  },
  iconComment: {
    height: 14,
    width: 16,
  },
  iconLike: {
    height: 14,
    width: 16,
  },
  text: {
    color: colors.lightGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    paddingLeft: 2,
    textAlign: "center",
  },
});
