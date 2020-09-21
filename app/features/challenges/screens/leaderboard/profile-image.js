import React, { PureComponent } from "react";
import { Image, View, StyleSheet } from "react-native";
import { func } from "prop-types";
import { Colors } from "../../styles";
import { connect } from "react-redux";
import { path } from "ramda";

import screens from "../../configs/screen-names";
import actions from "../../configs/actions";
import { HC_USER_ICON } from "../../../../../assets/images/affinityGroup";

class ProfileImage extends PureComponent {
  componentDidMount() {
    this.getProfilePic();
  }

  getProfilePic = () => {
    const id = path(["customer", "documents", "0", "id"], this.props);
    if (id) {
      this.props.getProfilePic(id);
    }
  };

  render() {
    const profilePic = path(["customer", "profilePic"], this.props);
    const userDPimage = profilePic
      ? { uri: `data:image/jpeg;base64,${profilePic}` }
      : HC_USER_ICON;

    return (
      <View>
        <View style={styles.profileContainer}>
          <Image style={styles.profile} source={userDPimage} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  getProfilePic: id => ({
    context: screens.LEADERBOARD,
    type: actions.getProfilePic,
    payload: { id },
  }),
};

export default connect(null, mapDispatchToProps)(ProfileImage);

const styles = StyleSheet.create({
  profile: {
    aspectRatio: 1 / 1,
    borderRadius: 47 / 2,
    height: 47,
    overflow: "hidden",
    width: 47,
  },
  profileContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderRadius: 49 / 2,
    borderWidth: 2,
    height: 49,
    justifyContent: "center",
    marginTop: -2,
    width: 49,
  },
});

ProfileImage.propTypes = {
  getProfilePic: func,
};
