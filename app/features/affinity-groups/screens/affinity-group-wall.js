import { path, pathOr } from "ramda";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import { View, FlatList, Text } from "react-native";
import Styles from "./styles";
import GroupPost from "../components/group-post";
import affinityGroupScreens from "../../../utils/configs/screen-names";
import Header from "../components/header";
import { affinityGroupActions } from "../configs/affinity-group-actions";
import CreatePost from "../components/create-post-modal";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
import moment from "moment";
import { metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const {
  AFFINITY_GROUP_TEMP_SCREEN_KEY
} = CoreConstants;



const extractKey = item => {
  const key = `PruListItem: ${item.id}`;
  return key;
};

class AffinityGroupWallScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.handleLoadMorePosts(true);
      }
    );
  };

  componentWillUnmount() {
    if (this.didFocusListener) {
      this.didFocusListener.remove();
    }
    const {
      currentGroup: {
        group: { id, name },
      },
    } = this.props;
    this.props.registerEvent(eventNames.exitGroup, {
      communityId: id,
      communityName: name,
      completionDate: moment(),
    });
  }

  handleLoadMorePosts = reload => {
    const {
      currentGroup: {
        group: { id },
        pagination = {},
      },
    } = this.props;

    const isArticle = pathOr(false, ["currentGroup", "group", "groupActivity"], this.props);

    //no more requests to fetch
    // if (!pagination.done) {
      this.props.fetchGroupPosts({ groupId: id, isArticle });
    // }
  };

  renderGroupWallHeader = () => {
    const {
      currentGroup: { group },
    } = this.props;
    const isArticle = pathOr(false, 
        ["currentGroup", "group", "groupActivity"], this.props);

    return (
      <Header
        title={group.name}
        options={{ showCreatePostIcon: isArticle ? false : true }}
      />
    );
  };

  renderCreatePost = () => {
    const {
      currentGroup: {
        group: { joined },
      },
    } = this.props;
    if (!joined) {
      return null;
    }
    return (
      <View style={Styles.createPostContainer}>
        <CreatePost />
      </View>
    );
  };

  getMetaObject = (elementKey) => {
    const metaObj = metaHelpers.findElement(AFFINITY_GROUP_TEMP_SCREEN_KEY, elementKey);
    const returnValue  = metaObj && metaObj.label && metaObj.label !== elementKey ? metaObj.label : null;
    return returnValue;
  };

  renderPost = ({ item }) => {
    const {
      currentGroup: {
        group: { joined },
      },
    } = this.props;
    const dataAttribute = item;
    const type = path(["type"], dataAttribute);
    const isArticle = pathOr(false, ["currentGroup", "group", "groupActivity"], this.props);
    const metaKey = path(["attributes", "contentId"], dataAttribute);
    if(metaKey) {
      const metaObj = this.getMetaObject(metaKey);
      if (metaObj) {
        const metaTitleValue = path(["title"], metaObj);
        if (metaTitleValue) {
          dataAttribute.title = metaTitleValue;
        }
        
        const metaDescriptionValue = path(["description"], metaObj);
        if (metaDescriptionValue) {
          dataAttribute.message = metaDescriptionValue;
        }

        //Un-Comment the below block to read the image urls and webview urls from meta json
        if(isArticle) {
          const metaImageUrl = path(["imageUrl"], metaObj);
          if (metaImageUrl) {
            dataAttribute.document ?
              dataAttribute.document.url = metaImageUrl :
                dataAttribute.document = { url: metaImageUrl };
          }
          const metaWebViewUrl = path(["webviewUrl"], metaObj);
          if (metaWebViewUrl) {
            dataAttribute.group ?
              (dataAttribute.group.groupActivity ?
                (dataAttribute.group.groupActivity.content ?
                  (dataAttribute.group.groupActivity.content.content = metaWebViewUrl) : 
                    (dataAttribute.group.groupActivity.content = {content: metaWebViewUrl})
                ) : (dataAttribute.group.groupActivity = {content: {content: metaWebViewUrl}})
              ) : (dataAttribute.group = {groupActivity: {content: {content: metaWebViewUrl}}});
          }
        }
        
      }
    }


    return <GroupPost data={item} showFooter={isArticle || joined} type={type} />;
  };

  renderListSeparator = () => {
    return <View style={Styles.separatorComponent} />;
  };

  renderPostList = () => {
    let { posts = [] } = this.props.currentGroup;
    const isArticle = pathOr(false, 
        ["currentGroup", "group", "groupActivity"], this.props);
    
    if (isArticle) {
      posts = posts.filter(post => {
        const groupActivity = pathOr(null, ["group", "groupActivity"], post);
        if (groupActivity) {
          return true;
        }
        return false;
      });
    }

    return (
      <FlatList
        data={posts}
        keyExtractor={extractKey}
        onEndReachedThreshold={0.5}
        renderItem={this.renderPost}
        onEndReached={() => this.handleLoadMorePosts()}
        ItemSeparatorComponent={this.renderListSeparator}
      />
    );
  };

  render() {
    return (
      <View style={Styles.baseWallContainer}>
        {this.renderGroupWallHeader()}
        {this.renderPostList()}
      </View>
    );
  }
}

AffinityGroupWallScreen.propTypes = {
  currentGroup: PropTypes.object,
  navigation: PropTypes.object,
  fetchGroupPosts: PropTypes.func,
  registerEvent: PropTypes.func,
};

const mapStateToProps = state => ({
  currentGroup: path(["affinityGroup", "currentGroup"], state),
});

const mapDispatchToProps = {
  fetchGroupPosts: payload => {
    return {
      context: affinityGroupScreens.affinityGroupWallScreen,
      type: affinityGroupActions.getGroupPosts,
      payload,
      disableTimeout: true,
    };
  },
  registerEvent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AffinityGroupWallScreen);
