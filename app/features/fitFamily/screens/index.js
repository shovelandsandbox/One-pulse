import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SDKModule } from "product-sdk-1";
import AppConfig from "../../../config/AppConfig";

class FitFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SDKModule
        env={{
          SDK_ENV: AppConfig.getBuildEnv(),
          userId: this.props.userProfile.id,
          goBack: this.goBack,
          locale:this.props.language
        }}  
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {
        userProfile: state.profile,
        language: state.userPreferences.language,
    };
};

export default connect(mapStateToProps)(FitFamily);