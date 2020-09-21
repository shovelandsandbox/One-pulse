import React, { useState } from "react";
import { connect } from "react-redux";

import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Colors from "../utils/colors";
import {
  HC_LIKE,
  HC_COMMENT,
  HC_SHARE,
  HEART_FILLED,
} from "../../../../assets/images/affinityGroup";

import affinityGroupScreens from "../../../utils/configs/screen-names";
import * as AffinityType from "../types";
import { metaFinderAG } from "../utils/meta-utils";
import PruShareModal from "../../../components/PruShare/withModal";

const getShareConfig = post => {
  const queryParams = {
    screenId: affinityGroupScreens.affinityGroupPostScreen,
    screenParams: `postId:${post.id}`,
  };
  const link = {
    desc: post.message,
    title: post.title,
    queryParams,
    isDynamicLink: true,
  };
  //if image post then show the image
  if (
    post.document &&
    post.document.url &&
    post.document.contentType == "image/jpg"
  ) {
    link.imageUrl = post.document.url;
  }
  return link;
};

const ActionBar = ({ config, post, userAgent }) => {
  const [isShareVisible, setShareVisibility] = useState(false);
  const liked = config.isLiked;

  return (
    <View style={{ ...styles.container, ...config.borderStyle }}>
      {!liked && (
        <TouchableOpacity
          style={styles.containerStyle}
          onPress={() => config.togglePostLike()}
        >
          <Image source={HC_LIKE} style={styles.imageSize} />
          <Text style={styles.textStyle}>{metaFinderAG("Like")}</Text>
        </TouchableOpacity>
      )}
      {liked && (
        <TouchableOpacity
          style={styles.containerStyle}
          onPress={() => config.togglePostLike()}
        >
          <Image source={HEART_FILLED} style={styles.imageSize} />
          <Text style={styles.textStyle}>{metaFinderAG("Like")}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => {
          config.onShare && config.onShare();
          setShareVisibility(true);
        }}
      >
        <Image source={HC_SHARE} style={styles.imageSize} />
        <Text style={styles.textStyle}>{metaFinderAG("Share")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => config.onCommentPress()}
      >
        <Image source={HC_COMMENT} style={styles.imageSize} />
        <Text style={styles.textStyle}>{metaFinderAG("Comment")}</Text>
      </TouchableOpacity>
      <PruShareModal
        visible={isShareVisible}
        onClose={() => setShareVisibility(false)}
        title={metaFinderAG("shareWithFriends")}
        userAgent={userAgent}
        config={getShareConfig(post)}
      />
    </View>
  );
};

ActionBar.propTypes = {
  config: PropTypes.object,
  post: AffinityType.post,
  userAgent: PropTypes.object,
};

const mapStateToProps = state => ({
  userAgent: state.auth.userAgent,
});

export default connect(mapStateToProps)(ActionBar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderTopColor: Colors.veryLightGrey,
    // borderTopWidth: 0.3,
    // borderBottomColor: Colors.veryLightGrey,
    // borderBottomWidth: 0.3,
    backgroundColor: Colors.white,
  },
  containerStyle: {
    alignItems: "center",
    flexDirection: "row",
  },
  imageSize: {
    height: 20,
    resizeMode: "contain",
    width: 20,
  },
  textStyle: {
    color: Colors.red,
    fontFamily: "Avenir-Regular",
    fontSize: 10,
    paddingLeft: 5,
  },
});
