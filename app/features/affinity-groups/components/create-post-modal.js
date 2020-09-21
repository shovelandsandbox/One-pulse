import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Colors from "../utils/colors";
import { goto } from "../../../actions";
import { affinityGroupActions } from "../configs/affinity-group-actions";
import {
  EDIT,
  GALLERY,
  VIDEO,
  TEXT,
  PDF,
} from "../../../../assets/images/affinityGroup";
import CardView from "react-native-cardview";
import { metaFinderAG } from "../utils/meta-utils";

class CreatePost extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderTitle = () => {
    return (
      <View style={styles.titleArea}>
        <Image source={EDIT} style={styles.editIcon} />
        <Text style={styles.titleStyle}>{metaFinderAG("CreatePost")}</Text>
      </View>
    );
  };

  onPostClick = postType => {
    this.props.setCurrentPostType(postType);
    this.props.goto("CreatePostScreen");
  };

  renderPostOptions = () => {
    return (
      <View style={styles.postOptionsContainer}>
        <TouchableOpacity
          style={StyleSheet.flatten(styles.iconContainer)}
          onPress={() => this.onPostClick("image")}
        >
          <Image source={GALLERY} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten(styles.iconContainer)}
          onPress={() => this.onPostClick("video")}
        >
          <Image source={VIDEO} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten(styles.iconContainer)}
          onPress={() => this.onPostClick("text")}
        >
          <Image source={TEXT} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten(styles.iconContainer)}
          onPress={() => this.onPostClick("pdf")}
        >
          <Image source={PDF} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <CardView cardElevation={5} cardMaxElevation={5}>
        <View style={styles.postContainer}>
          {this.renderTitle()}
          {this.renderPostOptions()}
        </View>
      </CardView>
    );
  }
}

CreatePost.propTypes = {
  goto: PropTypes.func,
  setCurrentPostType: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  goto,
  setCurrentPostType: payload => ({
    type: affinityGroupActions.setCurrentPostType,
    payload,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);

const styles = StyleSheet.create({
  editIcon: {
    height: 16,
    width: 16,
  },
  icon: {
    height: 35,
    width: 35,
  },
  iconContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  postContainer: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postOptionsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingRight: 10,
    paddingVertical: 10,
  },
  titleArea: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  titleStyle: {
    alignSelf: "center",
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    paddingLeft: 10,
  },
});
