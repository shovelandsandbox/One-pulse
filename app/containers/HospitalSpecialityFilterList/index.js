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
import { CoreActions } from '@pru-rt-internal/pulse-common'
const { filterChangeAction, fetchSpecializationList, fetchMarkers } = CoreActions
import SpecialityFilter from '../../components/SpecialityFilter'

class HospitalSpecialityFilterList extends Component {

    constructor(props) {
        super(props)
        const { navigation } = props
        const lon = navigation.getParam('lon', 3.52)
        const lat = navigation.getParam('lat', 102.39)

        this.state = {
            lon,
            lat,
        }
    }

    componentWillMount() {
        const { selectedLanguage } = this.props
        this.props.fetchSpecializationList(selectedLanguage)
    }

    _fetchMarkers() {
        const { selectedSpecializations } = this.props
        this.props.fetchMarkers(
            {
                'latitude': this.state.lat,
                'longitude': this.state.lon,
            },
            50,
            selectedSpecializations,
            this.props.token,
            'hospital'
        )

        this.props.fetchMarkers(
            {
                'latitude': this.state.lat,
                'longitude': this.state.lon,
            },
            50,
            selectedSpecializations,
            this.props.token,
            'clinic'
        )
    }

    render() {
        const { navigation, specializationList, selectedSpecializations } = this.props
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }} >
                <SpecialityFilter
                    displaySource={specializationList}
                    indiviualMode={true}
                    onBackAction={() => {
                        this._fetchMarkers()
                        navigation.goBack()
                    }}
                    onApplyActions={() => {
                        this._fetchMarkers()
                        navigation.goBack()
                    }} />
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        selectedLanguage: state.userPreferences.language,
        specializationList: state.navigator.filter.specialization,
        selectedSpecializations: state.navigator.filter.selectedSpecialization,
    }
};
const mapDispatchToProps = {
    filterChangeAction,
    fetchSpecializationList,
    fetchMarkers,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HospitalSpecialityFilterList)