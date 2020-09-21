import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { path } from "ramda";
import { connect } from "react-redux";
import styles from "./style";
import MetaConstants from "./meta";

class DoctorProfile extends Component {

  constructor(props) {
    super(props);
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  render() {
    const {doctorProfile} = this.props;
    const imagUrlValue = path(["payload", 0, "attributes", "imageUrl"], doctorProfile);
    const imageUrl = imagUrlValue || "https://bootdey.com/img/Content/avatar/avatar6.png";
    const doctorname = path(["payload", 0, "name"], doctorProfile);
    const mcr = path(["payload", 0, "attributes", "mcr"], doctorProfile);
    return (
      <View style= {{flex:1}}>
        <View style={{flex:1}}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{ uri: `${imageUrl}` }}/>
        </View>
        <View style={styles.textView}>
          <Text style={styles.doctorText}>{this.metaConstants.doctorLabel}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={styles.name}>{`${this.metaConstants.nameLabel}: ${doctorname}`}</Text>
          <Text style={styles.name}>{`${this.metaConstants.mcrLabel}: ${mcr}`}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  doctorProfile: state.doctorProfile.doctorProfile,
  userLanguagePreference: state.userPreferences.language,
});

export default connect(mapStateToProps)(DoctorProfile);
