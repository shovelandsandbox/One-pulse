import { path, pathOr } from "ramda";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../utils/colors";
import DateUtils from "../utils/date";
import {
  HC_USER_ICON,
  HC_LIKED,
  HC_LIKE,
  HEART_FILLED,
} from "../../../../assets/images/affinityGroup";
import { likeSelector } from "../selectors";
import { metaFinderAG } from "../utils/meta-utils";

class PostComment extends PureComponent {
  constructor(props) {
    super(props);
  }

  toggleLike = () => {
    this.props.onLikeToggle && this.props.onLikeToggle(this.props.data);
  };

  render() {
    const { data, onLikeToggle, isLiked } = this.props;

    const firstName = pathOr("", ["customer", "firstName"], data);
    const middleName = pathOr("", ["customer", "middleName"], data);
    const surName = pathOr("", ["customer", "surName"], data);

    const likes = pathOr(0, ["attributes", "stats", "likes"], data);
    const dislike = pathOr(0, ["attributes", "stats", "dislike"], data);
    let likeCount = likes - dislike;
    // if likes are less than 0 update to 0
    if (parseInt(likeCount) < 0) {
      likeCount = 0;
    }

    const userName = firstName + " " + middleName + " " + surName;
    const postedOn = path(["auditDetail", "createTime"], data);
    const duration = DateUtils.getTimeSince(postedOn);

    const likeText =
      likeCount === 1
        ? ` ${metaFinderAG("Like")}`
        : ` ${metaFinderAG("Likes")}`;
    // const icon = isLiked ? "thumbs-down" : "thumbs-up";
    // const shortName = AvatarUtils.getShortName(userName);

    return (
      <View style={styles.baseContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.firstContainer}>
            {/* <Avatar
            rounded
            title={shortName}
            overlayContainerStyle={styles.avatarOverlay}
          /> */}
            <Image source={HC_USER_ICON} style={styles.userIcon} />
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.commentContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{userName}</Text>
              </View>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.commentText}>{data.message}</Text>
                </View>
              </View>
              <View style={styles.likeReplyContainer}>
                {!isLiked && (
                  <TouchableOpacity
                    style={styles.likeContainer}
                    onPress={() => onLikeToggle(data, true)}
                  >
                    <Image source={HC_LIKE} style={styles.imageSize} />

                    <Text style={styles.likeReply}>{metaFinderAG("Like")}</Text>
                  </TouchableOpacity>
                )}
                {isLiked && (
                  <TouchableOpacity
                    style={styles.likeContainer}
                    onPress={() => onLikeToggle(data, false)}
                  >
                    <Image source={HEART_FILLED} style={styles.imageSize} />
                    <Text style={styles.likeReply}>{metaFinderAG("Like")}</Text>
                  </TouchableOpacity>
                )}
                {/* <TouchableOpacity disabled>
                  <Text style={styles.likeReplyText}>Reply</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <View style={styles.thirdContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.headerSubTitle}>
                {" "}
                {duration} {metaFinderAG("ago")}
              </Text>
            </View>
            <View style={styles.commentStat}>
              <Image source={HC_LIKED} style={styles.iconLike} />
              <Text style={styles.footerSubTitle}>
                {likeCount} {likeText}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isLiked: likeSelector(state, path(["data", "id"], props)),
});

export default connect(mapStateToProps)(PostComment);

PostComment.propTypes = {
  data: PropTypes.object,
  isLiked: PropTypes.bool,
  onLikeToggle: PropTypes.func,
};

const styles = StyleSheet.create({
  avatarOverlay: {
    backgroundColor: Colors.postAvatar,
    padding: 2,
  },
  // baseContainer: {
  //   backgroundColor: Colors.white,
  //   flex: 1,
  //   marginBottom: 10,
  // },
  commentContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  commentStat: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 7,
  },
  commentText: {
    color: Colors.lightGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    paddingVertical: 5,
    textAlign: "left",
  },
  firstContainer: {
    paddingTop: 5,
    width: "5%",
  },
  footerSubTitle: {
    color: Colors.lightGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    paddingLeft: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerSubTitle: {
    color: Colors.lightGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
  },
  headerTitle: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    fontWeight: "bold",
  },
  iconLike: {
    height: 12,
    width: 14,
  },
  imageSize: {
    height: 12,
    width: 14,
  },
  likeContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  likeReply: {
    color: Colors.red,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    paddingHorizontal: 2,
    paddingLeft: 4,
  },
  likeReplyContainer: {
    backgroundColor: Colors.baseBackground,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  likeReplyText: {
    color: Colors.veryLightGrey,
    fontSize: 12,
    paddingLeft: 10,
  },
  mainContainer: {
    alignContent: "center",
    backgroundColor: Colors.baseBackground,
    flex: 1,
    flexDirection: "row",
    marginTop: 3,
    marginHorizontal: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  secondContainer: {
    alignContent: "center",
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingTop: 3,
  },
  thirdContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 3,
  },
  timeContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  userIcon: {
    height: 28,
    width: 28,
  },
});
