import React, { Component } from "react";
import { Text, View, Alert, DeviceEventEmitter, TouchableOpacity, Image } from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { findIndex } from "ramda";
import PropTypes from "prop-types";
import {
    CoreActionTypes,
    CoreConfig,
    metaHelpers,
} from "@pru-rt-internal/pulse-common";
import { BabylonActions } from "@pru-rt-internal/react-native-babylon-chatbot";
import { connect } from "react-redux";
import styles from "./styles";
import { NavigationActions } from "react-navigation";
import SelectionCell from "../../components/SelectionCell";
import { BACK, DOC_INLINE_LOGO, BABYLON_LOGO_BLUE } from "../../config/images";

const { pageKeys } = CoreConfig;
const { colors, SCREEN_KEY_CHANGE_LANGUAGE } = CoreConfig;
const helpers = metaHelpers;
const { KEY_GENERIC_ERROR } = CoreConfig;

class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calenderList: [{ name: 'Gregorian', code: 'GR' }, { name: 'Thai Buddhist', code: 'TB' }]
        }

    }
    componentDidUpdate(prevProps) {
        if (prevProps.meta.metaDetail != this.props.meta.metaDetail) {
            const setParamsAction = NavigationActions.setParams({
                params: {},
                key: 'Accounts'
            })
            this.props.navigation.dispatch(setParamsAction)
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.meta.metaError && !nextProps.meta.refreshImage) {
            const metaError = metaHelpers.findCommonErrorMessages(KEY_GENERIC_ERROR)
                .message;
            Alert.alert(metaError);
        }
    }

    getSelectedIndex() {
        const { calenderList } = this.state;
        const { calenderSelected } = this.props;

        const index = findIndex(l => l.name === calenderSelected, calenderList);
        return index > 0 ? index : 0;
    }

    handleLanguageSelected = name => {
        const { calenderSelected } = this.props;
        if (name !== calenderSelected) {
            this.props.changeCalender(name);
            //  BabylonActions.setCurrentLanguageInBabylon(languageCode);
        }
    };

    render() {
        const { calenderList } = this.state;
        const { calenderSelected } = this.props;
        const changeLanguage = helpers.findScreen(SCREEN_KEY_CHANGE_LANGUAGE).label;

        return (
            <View style={styles.contain}>
                <View
                    style={[
                        {
                            width: "100%",
                            height: 52,
                            backgroundColor: "#ffffff",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 90
                        }
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                            // this.props.GET_CUSTOMER_DETAILS()
                            DeviceEventEmitter.emit("refreshFun", null);
                            DeviceEventEmitter.emit("translateDateFun", null);
                        }}
                        style={{
                            width: 55,
                            height: 55,
                            alignItems: "flex-start",
                            justifyContent: "center"
                        }}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                left: 0
                            }}
                            source={BACK}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.heading}>
                    {/* {helpers.findElement(NEW_LANGUAGR, LANGUAGR).label} */}
                    Change Calendar
                </Text>
                <View
                    style={{
                        paddingHorizontal: 20,
                        width: "100%"
                    }}
                >
                    {calenderList.map(data => (
                        <SelectionCell
                            isSelected={calenderSelected === data.name}
                            //labelText={helpers.findElement(NEW_LANGUAGR, data.name).label}
                            labelText={data.name}
                            onSelected={() => this.handleLanguageSelected(data.name)}
                        />
                    ))}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    calenderSelected: state.profile.calenderSelected,
    //  languageList: state.meta.languageList,
    meta: state.meta,
});

export default connect(
    mapStateToProps,
    {
        changeCalender: selectedCalender => ({
            // context: pageKeys.CHANGE_LANGUAGE_PAGE,
            type: CoreActionTypes.SET_SELECTED_CALENDER,
            payload: { calender: selectedCalender },
        }),

    }
)(Calender);
