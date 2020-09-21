import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";

import {
  HC_LIKE,
  HC_COMMENT,
  HC_LIKED,
  HC_SHARE,
} from "../../../../config/images";

const EventLikeShareComment = ({
  isLiked,
  likeCount,
  commentCount,
  shareCount,
}) => {
  const likes = "Likes";
  const comments = "Comments";
  const shares = "Shares";
  return (
    <View style={styles.container}>
      <View style={styles.containerStyle}>
        <Image source={isLiked ? HC_LIKED : HC_LIKE} style={styles.imageSize} />
        <Text style={styles.textStyle}>
          {likeCount} {likes}
        </Text>
      </View>
      {shareCount != 0 && (
        <View style={styles.containerStyle}>
          <Image source={HC_SHARE} style={styles.imageSize} />
          <Text style={styles.textStyle}>
            {shareCount} {shares}
          </Text>
        </View>
      )}
      <View style={styles.containerStyle}>
        <Image source={HC_COMMENT} style={styles.imageSize} />
        <Text style={styles.textStyle}>
          {commentCount} {comments}
        </Text>
      </View>
    </View>
  );
};

EventLikeShareComment.propTypes = {
  isLiked: PropTypes.boolean,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  shareCount: PropTypes.number,
};
export default EventLikeShareComment;
