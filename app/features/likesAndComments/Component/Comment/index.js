import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import moment from "moment";
import styles from "./styles";

import {
  HC_USER_ICON,
  HC_REPLY,
  HC_LIKE_GREY,
  HC_LIKED,
} from "../../../../config/images";

const extendedStyle = fromCommentsUI => {
  if (fromCommentsUI) {
    return {
      backgroundColor: "#f7f5f8",
      marginVertical: 2,
      marginHorizontal: 8,
    };
  }
};

const isLiked = (groupPostLiked, id) => {
  const index = groupPostLiked.findIndex(el => el == id);
  if (index !== -1) {
    return true;
  }
  return false;
};

const Comment = ({
  item,
  viewAllText,
  viewAll,
  onLikePress,
  onReplyPress,
  onViewAllPress,
  fromCommentsUI,
  groupPostLiked,
  disableReplyCount = false,
  expandStatus = false,
}) => {
  const id = pathOr("", ["id"], item);
  const name = pathOr("", ["customer", "firstName"], item);
  const message = pathOr("", ["message"], item);
  const time = pathOr("", ["auditDetail", "createTime"], item);
  const timeAgo = "";//time ? moment(time).fromNow() : "";
  const likesCount = pathOr(0, ["attributes", "stats", "likes"], item);
  const dislikesCount = pathOr(0, ["attributes", "stats", "dislike"], item);
  const likes = likesCount - dislikesCount;
  const replayCount = pathOr(0, ["attributes", "stats", "comments"], item);
  const isCommentLiked = isLiked(groupPostLiked, id);
  const totalCount = likes < 0 ? 0 : likes;
  const messgae = expandStatus ? "View less comments" : viewAllText;
  return (
    <View style={[styles.container, extendedStyle(fromCommentsUI)]}>
      <View style={styles.imageContainerStyle}>
        <Image source={HC_USER_ICON} style={styles.imageSize} />
      </View>
      <View style={styles.marginStyle}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
        <Text style={styles.messageStyle}>{message}</Text>
        <View style={styles.likeContainer}>
          <TouchableOpacity
            onPress={() => {
              onLikePress(item);
            }}
            style={styles.likeView}
          >
            <Image
              source={isCommentLiked ? HC_LIKED : HC_LIKE_GREY}
              style={styles.likeIcon}
            />
            <Text style={styles.likeCount}>{totalCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onReplyPress} style={styles.replyView}>
            <Image source={HC_REPLY} style={styles.replyIcon} />
            {!disableReplyCount && (
              <Text style={styles.replyCount}>{replayCount}</Text>
            )}
          </TouchableOpacity>
        </View>
        {viewAll && (
          <View style={styles.viewAllContainer}>
            <TouchableOpacity onPress={onViewAllPress}>
              <Text style={styles.viewAllTextStyle}>{messgae}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

Comment.propTypes = {
  item: PropTypes.object,
  viewAllText: PropTypes.string,
  viewAll: PropTypes.bool,
  onLikePress: PropTypes.func,
  onReplyPress: PropTypes.func,
  onViewAllPress: PropTypes.func,
  fromCommentsUI: PropTypes.bool,
  groupPostLiked: PropTypes.array,
  disableReplyCount: PropTypes.bool,
};

export default Comment;
