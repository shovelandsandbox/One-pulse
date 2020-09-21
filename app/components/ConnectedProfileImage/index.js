/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import ProfileImage from "../ProfileImage";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    profilePicture: state.profile.profilePicture,
  };
};

export default connect(mapStateToProps, {})(ProfileImage);
