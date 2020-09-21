import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ImageBackground, TextInput, BackHandler, Linking } from "react-native";
import { connect } from "react-redux";
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import MaterialTabs from "react-native-material-tabs";
import {
    GreyLine,
    Blue_Circle,
    Green_Circle,
    Orange_Circle,
    Purple_Circle,
    Red_Circle,
    Yellow_Circle,
    PM_10,
    PM_2,
    SO2,
    O3,
    NO2,
    CO,
} from '../../../../config/images'

import { styles } from "./styles"
import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";
const {
    AQHI_AIRQUALITYDATA,
} = CoreConfig;
import metaConstants from "../../meta";

const fetchLabel = (value, defaultValue) =>
    value.label ? value.label : defaultValue;

export default class CustomBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: [],
            selectedTab: 0,
            textShown: false,
        };
        this.metaConstants = { ...metaConstants.airQualityScreenMeta() }
    }

    getImageFromKey = key => {

        switch (key) {
            case "PM2_5":
                return PM_2
            case "PM10":
                return PM_10
            case "O3":
                return O3
            case "SO2":
                return SO2
            case "CO":
                return CO
            case "NO2":
                return NO2
            default:
                return PM_2
        }
    };
    getBackGroundImageFromKey = key => {

        switch (key) {
            case "PM2_5":
                return Blue_Circle
            case "PM10":
                return Green_Circle
            case "O3":
                return Yellow_Circle
            case "SO2":
                return Orange_Circle
            case "CO":
                return Red_Circle
            case "NO2":
                return Purple_Circle
            default:
                return Blue_Circle
        }
    };

    toggleBgStyle = (item, index) => {
        var showSubView = this.state.showDetails
        var newIndex = showSubView.indexOf(index);
        if (newIndex > -1) {
            return styles.grayBgViewElevated
        }
        else {
            return styles.grayBgView;
        }
    }
    toggleBgViewStyle = (item, index) => {
        var showSubView = this.state.showDetails
        var newIndex = showSubView.indexOf(index);
        if (newIndex > -1) {
            return { ...styles.grayBgView2, backgroundColor: this.colorForSelectedItem(item.measurement) }
        }
        else {
            return { ...styles.grayBgView1, backgroundColor: this.colorForSelectedItem(item.measurement) }
        }
    }


    toggleState = (item, index) => {
        var showSubView = this.state.showDetails
        var newIndex = showSubView.indexOf(index);
        if (newIndex > -1) {
            showSubView.splice(newIndex, 1)
            this.setState({ showDetails: showSubView, textShown: false, })
        } else {
            if (showSubView.length === 0) {
                var addIndex = showSubView.concat(index)
            } else {
                showSubView.length = 0
                var addIndex = showSubView.concat(index)
            }
            this.setState({ showDetails: addIndex, textShown: false, })
        }
    }

    colorForSelectedItem(key) {
        switch (key) {
            case "PM2_5":
                return "#2BCDDC"
            case "PM10":
                return "#2BDC59"
            case "O3":
                return "#DCCB2B"
            case "SO2":
                return "#DC942B"
            case "CO":
                return "#EA0F27"
            case "NO2":
                return "#CC6FDD"
            default:
                return
        }

    }
    renderFirstLevel = (item1, index1) => {
        let airQualityDescription = item1.description;
        let ar = airQualityDescription.split(' ')
        let Quality = ar[0]
        return (
            <View style={this.toggleBgViewStyle(item1, index1)}>
                <TouchableOpacity
                    style={this.toggleBgStyle(item1, index1)}
                    onPress={() => {
                        this.toggleState(item1, index1)
                    }} >
                    <View style={styles.firstView}>
                        <ImageBackground
                            source={this.getBackGroundImageFromKey(item1.measurement)}
                            style={styles.backGroundImg}>
                            <Image
                                style={styles.image}
                                resizeMode="contain"
                                style={styles.innerImage}
                                source={this.getImageFromKey(item1.measurement)} />
                        </ImageBackground>
                        <View stye={styles.measurementView}>
                            <Text stye={styles.measurementText}>
                                {item1.measurement}
                            </Text>
                            <Text stye={styles.measurementText}>
                                {item1.value}
                                {" "}
                                {item1.unit}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.QualityView}>
                        <Text style={styles.QualityText}>
                            {Quality}
                        </Text>
                        <Text style={styles.QualityText}>
                            {this.metaConstants.airQuality}
                        </Text>
                    </View>


                </TouchableOpacity>
            </View >
        )

    }

    toggleNumberOfLines = index => {
        this.setState({
            textShown: !this.state.textShown
        });
    };

    renderSecondLevel = (item1, index1) => {
        let sourceKey = `${item1.measurement}Source`
        let effectKey = `${item1.measurement}Effect`
        let Source = this.metaConstants.Source
        let Effect = this.metaConstants.Effect
        let tabdata = [Source, Effect]
        return (
            <>
                <View style={styles.lineView}></View>
                <View style={styles.tabMainView}>
                    <MaterialTabs
                        items={tabdata}
                        selectedIndex={this.state.selectedTab}
                        onChange={index => this.setState({ selectedTab: index })}
                        barColor="white"
                        inactiveTextColor="grey"
                        textStyle={styles.tabTextStyle}
                        activeTextStyle={styles.activetab}
                        indicatorColor={this.colorForSelectedItem(item1.measurement)}
                        activeTextColor={this.colorForSelectedItem(item1.measurement)}
                    />
                    {this.state.selectedTab === 0 &&
                        (
                            <View style={styles.selectedTabView}
                            >
                                <Text
                                    style={styles.selectedTabText}
                                    numberOfLines={this.state.textShown === true ? undefined : 4}>
                                    {fetchLabel(
                                        helpers.findElement(AQHI_AIRQUALITYDATA, sourceKey),
                                        ""
                                    )}
                                </Text>
                                <Text
                                    onPress={() => this.toggleNumberOfLines()}
                                    style={styles.seeText}>
                                    {this.state.textShown === true ? this.metaConstants.SeeLess : this.metaConstants.SeeMore}
                                </Text>
                            </View>
                        )

                    }
                    {this.state.selectedTab === 1 &&
                        (
                            <View style={styles.selectedTabView}
                            >
                                <Text
                                    style={styles.selectedTabText}
                                    numberOfLines={this.state.textShown === true ? undefined : 4}>
                                    {fetchLabel(
                                        helpers.findElement(AQHI_AIRQUALITYDATA, effectKey),
                                        ""
                                    )}
                                </Text>
                                <Text
                                    onPress={() => this.toggleNumberOfLines()}
                                    style={styles.seeText}>
                                    {this.state.textShown === true ? this.metaConstants.SeeLess : this.metaConstants.SeeMore}
                                </Text>
                            </View>
                        )
                    }
                </View>


            </>
        )
    }

    render() {
        const { airQualityData } = this.props
        return (

            <ScrollView showsVerticalScrollIndicator={false}>
                {airQualityData.map((item1, index1) => {
                    return (
                        <>
                            {this.renderFirstLevel(item1, index1)}

                            {this.state.showDetails.indexOf(index1) !== -1 &&
                                <View style={{ ...styles.subView1, backgroundColor: this.colorForSelectedItem(item1.measurement) }} >
                                    <View style={styles.subView}>
                                        {this.renderSecondLevel(item1, index1)}
                                    </View>
                                </View>
                            }
                        </>
                    )
                })
                }
            </ScrollView >

        );
    }
}