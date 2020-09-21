import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import MetaConstants from "../../meta";
import styles from "./style";
import Comment from "../Comment";
class CommentBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expandView: false,
    }
  }
  viewPressExpand = () => {
    const { data, viewAllPress } = this.props;

    viewAllPress(data)
    this.setState({ expandView: !this.state.expandView })
  }

  render() {
    const {
      data,
      likePress,
      replyPress,
      viewAll,
      viewAllPress,
      childItems,
      fromCommentsUI,
      groupPostLiked,
      showChildComment
    } = this.props;

    const metaConstants = { ...MetaConstants.initializeScreenMeta() };
    const viewAllText = metaConstants.viewAllComment;
    return (
      <View style={styles.container}>
        <Comment
          item={data}
          viewAllText={viewAllText}
          viewAll={viewAll}
          expandStatus={this.state.expandView}
          onLikePress={likePress}
          onReplyPress={() => {
            replyPress(data);
          }}
          onViewAllPress={() => {
            this.viewPressExpand();
          }}
          fromCommentsUI={fromCommentsUI}
          groupPostLiked={groupPostLiked}
        />
        {
          showChildComment ?
          <View style={styles.childView}>
            <FlatList
              data={this.state.expandView ? childItems : []}
              renderItem={({ item }) => {
                return (
                  <Comment
                    item={item}
                    onLikePress={likePress}
                    onReplyPress={() => {
                      replyPress(data);
                    }}
                    fromCommentsUI={fromCommentsUI}
                    groupPostLiked={groupPostLiked}
                    disableReplyCount={true}
                  />
                );
              }}
              extraData={childItems}
            />
          </View> : null
        }
        
      </View>
    );
  }
}
CommentBox.propTypes = {
  data: PropTypes.object,
  viewAll: PropTypes.bool,
  likePress: PropTypes.func,
  replyPress: PropTypes.func,
  viewAllPress: PropTypes.func,
  childItems: PropTypes.array,
  fromCommentsUI: PropTypes.bool,
  groupPostLiked: PropTypes.array,
};

export default CommentBox;
