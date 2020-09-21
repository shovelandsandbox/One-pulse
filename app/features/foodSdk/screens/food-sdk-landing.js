import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SDKModule } from "food-sdk-1";
import { gotoMainPage, dispatchEvent } from "../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import AppConfig from "../../../config/AppConfig";

class FoodSdkLandingScreen extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatchEvent(events.GoutBusterLanding);
    }

    goBack = () => {
        this.props.gotoMainPage();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SDKModule env={{
                    SDK_ENV: "prod",//AppConfig.getBuildEnv(),
                    userId: this.props.userProfile.id,
                    goBack: this.goBack
                }} />
            </View>
        );
    }
}

FoodSdkLandingScreen.propTypes = {
    language: PropTypes.string,
    userProfile: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        language: state.userPreferences.language,
        userProfile: state.profile,
    };
};

const mapDispatchToProps = {
    gotoMainPage,
    dispatchEvent,
};
export default connect(mapStateToProps, mapDispatchToProps)(FoodSdkLandingScreen);
