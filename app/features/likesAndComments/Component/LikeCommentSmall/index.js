import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import MetaConstants from "../../meta";
import styles from "./style";

import { HC_LIKE, HC_COMMENT_GREY, HC_LIKED, HC_SHARE } from "../../../../config/images";

const LikeCommentSmall = ({
  isLiked,
  likeCount,
  commentCount,
  shareCount,
  onCommentPress,
}) => {
  const metaConstants = { ...MetaConstants.initializeScreenMeta() };
  const likes = likeCount > 1 ? metaConstants.likes : metaConstants.like;
  const comments =
    commentCount > 1 ? metaConstants.comments : metaConstants.comment;
  const shares = shareCount > 1 ? metaConstants.shares : metaConstants.share;
  return (
    <View style={styles.container}>
      <View style={styles.containerStyle}>
        <Image source={isLiked ? HC_LIKED : HC_LIKE} style={styles.imageSize} />
        <Text style={styles.textStyle}>
          {likeCount} {likes}
        </Text>
      </View>
      {
        shareCount != 0 && 
        <View style={styles.containerStyle}>
          <Image source={HC_SHARE} style={styles.imageSize} />
          <Text style={styles.textStyle}>
            {shareCount} {shares}
          </Text>
        </View>
      }
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => {
          onCommentPress();
        }}
      >
        <Image source={HC_COMMENT_GREY} style={styles.imageSize} />
        <Text style={styles.textStyle}>
          {commentCount} {comments}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LikeCommentSmall;
