import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    TextInput,
    Dimensions,
    LayoutAnimation,
    TouchableOpacity,
    PermissionsAndroid,
    KeyboardAvoidingView,
} from "react-native";

class HospitalFilterOptions extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#8acc' }} />
        )
    }
}
const mapStateToProps = state => { };
export default connect()(HospitalFilterOptions)