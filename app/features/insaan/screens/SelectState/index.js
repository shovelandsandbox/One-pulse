import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { BACK } from "../../../../config/images"
import { connect } from "react-redux"
import SelectStateItem from "../../components/SelectStateItem"
import { SelectStateStyle as styles } from "./styles"
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import {
    CoreActions,
    metaHelpers,
    CoreConfig
} from "@pru-rt-internal/pulse-common";
const {
    setConventionState,
    setConvention
} = CoreActions

const { INSAAN_PRAYER_CONVENTION, INSAAN_SELECT_STATE, INSAAN_SELECT_ZONE } = CoreConfig;
const helpers = metaHelpers;



class SelectState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectarr: [],
            curid: 1,
            jakimZones: [],
            stateCode: "",
            stateName: "",
            preStateCode: "",
            preStateName: "",
            prejakimzones: ""
        }
    }

    componentDidMount() {
        let insanstate = this.props.insanState.states;
        let arr = [];
        insanstate && insanstate.forEach((item, k) => {
            arr.push({
                stateCode: k,
                stateName: item.stateName,
                isSelect: false
            })
        })
        let { userPreferences } = this.props

        this.setState({
            preStateCode: userPreferences.conventionStateCode,
            preStateName: userPreferences.stateName,
            prejakimzones: userPreferences.jakimzones
        })
        this.props.dispatchEvent(events.StateScreen);

    }
    goToZone = () => {

        const { userPreferences } = this.props;
        if (userPreferences.conventionStateCode) {
            this.props.navigation.navigate("SelectZone", {
                selectName: this.state.jakimZones,

            })
        }
        this.props.dispatchEvent(events.SelectZoneClick);

    }
    render() {
        let { flag, selectarr, curid } = this.state;
        let { states } = this.props.insanState
        let arr = [];

        states && states.forEach((item, k) => {
            arr.push({
                stateCode: 567,
                stateName: item.stateName,
                isSelect: true
            })
        })
        let isHighLight = arr && arr.filter(item => {
            return item.isSelect
        }).length > 0
        const { navigation, userPreferences } = this.props;
        let conventionStateCode = userPreferences.conventionStateCode ? userPreferences.conventionStateCode : ""
        // let selectName = arr.filter((item) => {
        //     return item.isSelect
        // })[0].stateName;
        if (userPreferences.isZoneBack) {
            this.props.setConventionState({
                stateCode: this.state.preStateCode,
                stateName: this.state.preStateName,
                jakimzones: this.state.prejakimzones,
                isZoneBack: false

            })
        }
        // this.props.setConventionState({

        //     isZoneBack:false

        // })
        return (
            <View style={styles.container1}>
                <TouchableOpacity
                    style={styles.goback}
                    onPress={() => {
                        this.props.setConventionState({
                            stateCode: this.state.preStateCode,
                            stateName: this.state.preStateName,
                            jakimzones: this.state.prejakimzones,
                            isZoneBack: false

                        })
                        this.props.navigation.goBack()
                        this.props.dispatchEvent(events.StateScreenBackClick);
                    }}
                    accessibilityLabel="home"
                    accesible
                >
                    <Image style={styles.backImage} source={BACK} />
                </TouchableOpacity>

                <Text style={styles.SelectState}>
                    {helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_SELECT_STATE).label}
                </Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.marginState}>
                    {
                        states && states.map((item, k) => {
                            return (
                                <SelectStateItem
                                    stateCode={item.stateCode}
                                    isSelected={item.stateName == conventionStateCode}
                                    labelText={item.stateName}
                                    item={item}
                                    onSelected={(item) => {

                                        this.props.setConventionState({
                                            stateCode: item.stateName,
                                            stateName: item.stateName,
                                            jakimzones: item.jakimZones,
                                            isZoneBack: false

                                        })
                                        this.props.dispatchEvent(events.StateOptionClick);

                                    }}

                                />
                            )
                        })
                    }

                </ScrollView>
                {
                    <TouchableOpacity
                        style={{
                            width: 220,
                            height: 44,
                            backgroundColor: conventionStateCode ? "#ED1B2E" : "#F3F3F3",
                            borderRadius: 22,
                            justifyContent: "center",
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginLeft: 78,
                            marginRight: 77,
                            marginTop: 53,
                            flexShrink: 0,
                            marginBottom: 32
                        }}
                        onPress={() => {

                            this.goToZone()

                        }}
                        accessibilityLabel="home"
                        accesible
                    >

                        <Text style={{
                            fontFamily: "Avenir-Medium",
                            fontSize: 16,
                            letterSpacing: 0,
                            textAlign: "center",
                            height: 22,
                            color: conventionStateCode ? "#FFFFFF" : "#BDBEC0",
                        }}>{helpers.findElement(INSAAN_PRAYER_CONVENTION, INSAAN_SELECT_ZONE).label}</Text>

                    </TouchableOpacity>
                }

            </View>

        )
    }
}
const mapStateToProps = state => {
    return {
        insanState: state.InsanReducer.insanState,
        userPreferences: state.userPreferences
    }
}


export default connect(mapStateToProps, {
    setConventionState,
    setConvention,
    dispatchEvent,
})(SelectState)