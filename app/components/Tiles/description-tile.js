import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { isEmpty, pathOr } from "ramda";
import { Theme } from "../../themes";
import LikeAndComments from "../../features/likesAndComments";
const { Colors } = Theme;

const getSeparatorStyle = showSeparator => {
  if (showSeparator) {
    return { borderBottomWidth: 1, padding: 2 };
  }
  return { borderBottomWidth: 0 };
};
export default class DescriptionTile extends PureComponent {
  render() {
    const {
      properties: {
        title = "",
        readMore = "",
        desc = "",
        showSeparator,
        groupId = "",
        uri,
      },
      actions,
      handler,
      style = {},
      type,
    } = this.props;
    const url = pathOr(
      "",
      ["0", "actionsToDispatch", "0", "payload", "params", "uri"],
      actions
    );
    return (
      <View
        style={{
          width: styles.width,
          marginLeft: 10,
          borderBottomColor: Colors.grey1a1a1a,
          ...getSeparatorStyle(showSeparator),
        }}
      >
        <TouchableOpacity style={{ marginBottom:10}} onPress={() => handler("click")}>
          {!isEmpty(title) && (
            <Text style={styles.titleStyle} numberOfLines={2}>
              {title}
            </Text>
          )}
          {!isEmpty(desc) && <Text style={styles.descStyle} >{desc}</Text>}
          {!isEmpty(readMore) && (
            <Text style={styles.readMoreText}>{readMore}</Text>
          )}
        </TouchableOpacity>
        {!isEmpty(groupId) && (
          <LikeAndComments
            groupId={groupId}
            uri={url}
            articleData={this.props.properties}
            type={type}
          />
        )}
      </View>
    );
  }
}

DescriptionTile.propTypes = {
  properties: PropTypes.object,
  handler: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
};

DescriptionTile.defaultProps = {};
