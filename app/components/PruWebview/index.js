import React from "react";
import { WebView, Platform, BackHandler, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Theme } from "../../themes";
const { Sizes } = Theme;
import { HC_LIKE, HC_COMMENT, HC_SHARE, HC_LIKED } from "../../config/images";
import MultipleButtons from "../../features/likesAndComments/Component/MultipleButtons";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import { pathOr, isEmpty, path } from "ramda";
import { likeSelector } from "../../features/affinity-groups/selectors";
import affinityGroupScreens from "../../utils/configs/screen-names";
import { affinityGroupActions } from "../../features/affinity-groups/configs/affinity-group-actions";
import VideoPlayer from "../../components/VideoTile/VideoPlayer";
import styles from "./styles";
const { NavigationService } = CoreServices;
import {
  getGroupPostStats,
  getCommentsByGroupId,
  updateLikeAndDislike,
  sendComment,
  updateShare,
} from "../../features/likesAndComments/actions";
import {
  initializeDynamicLink,
  createDynamicLink,
} from "../../utils/DynamicLinkUtil";
// import Share from "react-native-share";

import MetaConstants from "../../features/likesAndComments/meta";

class PruWebview extends React.PureComponent {
  MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  webView = {
    canGoBack: false,
    ref: null,
  };

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  UNSAFE_componentWillMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress");
    }
  }
  onShare = async (uri, groupId) => {
    const fitter_with_app = this.MetaConstants.shareMessage;
    const { navigation, userAgent, updateShare } = this.props;
    const imageUrl = pathOr("", ["state", "params", "imageUrl"], navigation);
    const desc = pathOr("", ["state", "params", "desc"], navigation);
    const title = pathOr("", ["state", "params", "title"], navigation);
    initializeDynamicLink(userAgent);
    const queryParams = {
      screenId: "WebView",
      screenParams: `uri^${uri}|groupId^${groupId}`
    };
    const deeplinkUrl = await createDynamicLink({ desc, title, queryParams, imageUrl });

    // try {
    //   const result = await Share.open({
    //     message: deeplinkUrl,
    //   });
    //   updateShare({ id: groupId, type: "SHARE" });
    // } catch (error) {
    //   //alert(error.message);
    // }
  };

  isPostLiked = (groupPostLiked, groupId) => {
    const { navigation, isLiked } = this.props;
    const fromCommunity = pathOr(
      false,
      ["state", "params", "fromCommunity"],
      navigation
    );
    const index = groupPostLiked.findIndex(el => el == groupId);
    if (fromCommunity) {
      return isLiked;
    }
    return index !== -1 ? true : false;
  };

  getButtonList(groupId, groupPostLiked) {
    const isPostLiked = this.isPostLiked(groupPostLiked, groupId);
    const likeCap = this.MetaConstants.likeCap;
    const commentCap = this.MetaConstants.commentCap;
    const shareCap = this.MetaConstants.shareCap;
    const buttonList = [
      {
        type: "LIKE",
        text: likeCap,
        image: {
          source: isPostLiked ? HC_LIKED : HC_LIKE,
          height: 14,
          width: 17,
        },
      },
      {
        type: "SHARE",
        text: shareCap,
        image: { source: HC_SHARE, height: 14, width: 12 },
      },
      {
        type: "COMMENT",
        text: commentCap,
        image: { source: HC_COMMENT, height: 14, width: 18 },
      },
    ];
    return buttonList;
  }

  getFilteredPost = (groupPostList, groupId) => {
    const index = groupPostList.findIndex(el => el.id == groupId);
    if (index !== -1) {
      return groupPostList[index];
    }
    return {};
  };

  updateLikeDislike = type => {
    const {
      updateLikeAndDislike,
      groupPostLiked,
      navigation,
      isArticleLikesUpdating,
    } = this.props;
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const parentId = pathOr("", ["state", "params", "parentId"], navigation);
    const parent = {
      id: parentId,
    };

    const index = groupPostLiked.findIndex(el => el == groupId);
    if (!isArticleLikesUpdating) {
      if (index == -1) {
        updateLikeAndDislike({ id: groupId, type: type, parent });
      } else {
        updateLikeAndDislike({ id: groupId, type: "DISLIKE", parent });
      }
    }
  };

  updateCommunityLikeDislike = type => {
    const { isLiked, navigation, isLikesUpdating } = this.props;
    const postData = pathOr({}, ["state", "params", "postData"], navigation);
    const postId = path(["id"], postData);
    const group = path(["group"], postData);
    if (!isLikesUpdating) {
      if (isLiked) {
        this.props.unlikePost({
          postId,
          group,
        });
      } else {
        this.props.likePost({
          postId,
          group,
        });
      }
    }
  };

  handleButtonClick = item => {
    const { navigation } = this.props;
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const imageUrl = pathOr("", ["state", "params", "imageUrl"], navigation);
    const desc = pathOr("", ["state", "params", "desc"], navigation);
    const title = pathOr("", ["state", "params", "title"], navigation);
    const uri = pathOr("", ["state", "params", "uri"], navigation);
    const parentId = pathOr("", ["state", "params", "parentId"], navigation);
    const fromCommunity = pathOr(false, ["state", "params", "fromCommunity"], navigation);
    const postData = pathOr({}, ["state", "params", "postData"], navigation);
    switch (item.type) {
      case "SHARE":
        this.onShare(uri, groupId);
        break;
      case "LIKE":
        fromCommunity
          ? this.updateCommunityLikeDislike(item.type)
          : this.updateLikeDislike(item.type);
        break;
      case "COMMENT":
        NavigationService.navigate("ViewAllComments", {
          groupId,
          imageUrl: imageUrl,
          desc: desc,
          title: title,
          fromCommunity,
          parentId,
          postData,
        });
        break;
    }
  };

  render() {
    const { sourceType, navigation, groupPostLiked } = this.props;
    const groupId = pathOr("", ["state", "params", "groupId"], navigation);
    const postData = pathOr({}, ["state", "params", "postData"], navigation);
    const contentType = pathOr(
      "",
      ["group", "groupActivity", "content", "contentType"],
      postData
    );
    const type =
      sourceType === SourceTypes.URI
        ? { uri: this.props.uri }
        : { html: this.props.html };

    const config = {
      properties: {
        uri: this.props.navigation.getParam("uri"),
        thumb:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgYIBwgHCgkGDRYPBwYGCA8ICRAKFBEWFhQRExMYHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAB//EABUQAQEAAAAAAAAAAAAAAAAAAAAB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIcEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q==",
      },
      style: {
        width: Dimensions.get("screen").width,
        aspectRatio: 1.77,
      },
      autoPlay: false,
      resizeMode: "contain",
    };
    const showVideo = contentType === "video/mp4" ? true : false;
    return (
      <View style={styles.baseContainer}>
        {showVideo && <VideoPlayer config={config} style={styles.postVideo} />}
        {!showVideo && (
          <WebView
            style={{ height: Sizes.fullScreenHeight }}
            source={{ uri: this.props.navigation.getParam("uri") }}
            ref={webView => {
              this.webView.ref = webView;
            }}
            onNavigationStateChange={navState => {
              this.webView.canGoBack = navState.canGoBack;
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
          />
        )}
        {!isEmpty(groupId) && (
          <MultipleButtons
            buttonList={this.getButtonList(groupId, groupPostLiked)}
            onButtonClick={this.handleButtonClick}
          />
        )}
      </View>
    );
  }
}

export const SourceTypes = {
  HTML: "HTML",
  URI: "URI",
};

const mapStateToProps = (state, props) => {
  return {
    groupPostList: state.likecomment.groupPostList,
    groupPostLiked: state.likecomment.groupPostLiked,
    userAgent: state.auth.userAgent,
    isLiked: likeSelector(
      state,
      path(["navigation", "state", "params", "postData", "id"], props)
    ),
    isArticleLikesUpdating: pathOr(
      false,
      ["likecomment", "isLikesUpdating"],
      state
    ),
    isLikesUpdating: pathOr(false, ["affinityGroup", "isLikesUpdating"], state),
  };
};

export default connect(mapStateToProps, {
  getGroupPostStats,
  getCommentsByGroupId,
  updateLikeAndDislike,
  sendComment,
  updateShare,
  likePost: payload => ({
    context: affinityGroupScreens.affinityGroupWallScreen,
    type: affinityGroupActions.likePost,
    payload: {
      type: "LIKE",
      parent: { id: payload.postId },
      group: payload.group,
    },
  }),
  unlikePost: payload => ({
    context: affinityGroupScreens.affinityGroupWallScreen,
    type: affinityGroupActions.unlikePost,
    payload: {
      type: "DISLIKE",
      parent: { id: payload.postId },
      group: payload.group,
    },
  }),
})(PruWebview);
