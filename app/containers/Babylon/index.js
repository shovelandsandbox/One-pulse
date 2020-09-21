/* eslint-disable */
import React from "react";
import {
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class BabyLon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPage: 0,
            openBMIModal: false,
        };
        this.handleScrollBegin = this.handleScrollBegin.bind(this);
        this.onSelectPicker = this.onSelectPicker.bind(this);
        this.showBMIModal = this.showBMIModal.bind(this);
    }
    render() {
        return <View>
            <Text>
                111
            </Text>
        </View>
    }
}
export default BabyLon;