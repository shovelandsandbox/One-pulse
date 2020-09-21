import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import Colors from "../utils/colors";
import { isEmpty } from "ramda";
import {
  HC_COMMENT_SEND_RED,
  HC_COMMENT_SEND_GREY,
} from "../../../../assets/images/affinityGroup";
import { metaFinderAG } from "../utils/meta-utils";

export default class InlineComment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      enablePostButton: false,
    };
    this.ref = React.createRef();
  }

  postComment = () => {
    const { comment } = this.state;
    if (!comment || !comment.trim()) {
      return;
    }
    const { postId, group } = this.props;
    const payload = {
      message: comment,
      postId,
      group,
    };

    this.props.postComment(payload);

    this.setState({ comment: "", enablePostButton: false });
  };

  focus = () => {
    this.ref.current.focus();
  };

  handleChangeText = comment => {
    this.setState({ comment });
    if (isEmpty(comment)) {
      this.setState({ enablePostButton: false });
    }
    this.setState({ enablePostButton: true });
  };

  renderInlineComment = () => {
    const { comment, enablePostButton } = this.state;
    const { style, borderStyle, borderRadius, textStyle } = this.props;

    return (
      <View style={{ ...styles.inlineCommentView, ...style }}>
        <View
          style={{
            ...styles.inlineCommentTextBox,
            ...borderStyle,
            borderRadius,
          }}
        >
          <TextInput
            multiline
            numberOfLines={0}
            value={comment}
            style={{ ...styles.textInput, ...textStyle }}
            placeholder={metaFinderAG("EnterComment")}
            clearTextOnFocus
            onChangeText={this.handleChangeText}
            ref={this.ref}
          />
        </View>
        {enablePostButton === true && (
          <TouchableOpacity
            onPress={this.postComment}
            style={styles.inlineCommentIconBox}
          >
            <Image source={HC_COMMENT_SEND_RED} style={styles.sendIcon} />
          </TouchableOpacity>
        )}
        {enablePostButton === false && (
          <View style={styles.inlineCommentIconBox}>
            <Image source={HC_COMMENT_SEND_GREY} style={styles.sendIcon} />
          </View>
        )}
      </View>
    );
  };

  render() {
    return this.renderInlineComment();
  }
}

InlineComment.defaultProps = {
  borderRadius: 0,
};

InlineComment.propTypes = {
  postId: PropTypes.string,
  group: PropTypes.string,
  postComment: PropTypes.func,
  style: PropTypes.object,
  borderRadius: PropTypes.number,
  borderStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  inlineCommentIconBox: {
    paddingLeft: 15,
    width: "15%",
  },
  inlineCommentTextBox: {
    marginHorizontal: 25,
    width: "85%",
  },
  inlineCommentView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: Dimensions.get("window").width,
  },
  sendIcon: {
    height: 28,
    width: 28,
  },
  textInput: {
    fontFamily: "Avenir-Regular",
    paddingVertical: 5,
  },
});
