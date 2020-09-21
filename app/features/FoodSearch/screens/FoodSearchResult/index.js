import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FoodSearchResultStyle as styles } from './styles';
import Header from "../../components/Header";
import { goToFoodSearch, goToCCA, getTopSearches } from "../../actions";
import { isNil, isEmpty, pathOr } from "ramda";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { foodSearchImages } from '../../images';
import MetaConstants from "../../meta";

class FoodSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.MetaConstants = { ...MetaConstants.initializeFoodSearchScreenMeta() };
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
        this.props.dispatchEvent(events.CCAFoodSearchResultScreen);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {

    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.goToFoodSearch()
        this.props.getTopSearches()
        this.props.dispatchEvent(events.CCAFoodSearchResultBackClick);
        return true;
    }

    renderSubInfo = (item, index) => {
        const subInfo = item["foodItem"]["urls"]["content"]
        return (
            <View style={styles.subInfoView} >
                <Text style={styles.subInfoTxt}>
                    {subInfo}
                </Text>
            </View>
        )

    }

    renderSubTitle = (item, index) => {
        const subTitle = `${"-"} ${item["foodItem"]["name"]}`
        const isSubInfo = !isEmpty(pathOr([], ["foodItem", "urls", "content"], item))

        return (
            <View style={styles.subTitleView} >
                <Text style={isSubInfo ? styles.subTitleTextDark : styles.subTitleTextLight}>
                    {subTitle}
                </Text>
                {isSubInfo && this.renderSubInfo(item, index)}
            </View >
        )

    }

    renderTitle = (item, index) => {
        const resultTitle = isNil(item["mealPlan"]) || isEmpty(item["mealPlan"]) ? "__" : item["mealPlan"]["name"]
        const noFoodItems = isNil(item['foodItems']) || isEmpty(item['foodItems'])
        const FoodList = noFoodItems ? null : item['foodItems']["ccaFood"]

        return (
            <View style={styles.resultSubView}>
                <View style={styles.resultTitleView}>
                    <Image source={this.renderTitleImg(item, index)} resizeMode="contain" style={styles.resultTitleImg} />
                    <Text style={styles.resultTitleText}>
                        {resultTitle}
                    </Text>
                </View>

                {!noFoodItems &&
                    FoodList.map((item1, index1) => {
                        return this.renderSubTitle(item1, index1)
                    })}
            </View>
        )
    }

    renderTitleImg = (item, index) => {
        if (!isNil(item["mealPlan"]["imageURL"]) && !isEmpty(item["mealPlan"]["imageURL"].trim())
            && item["mealPlan"]["imageURL"].includes("http")) {
            return { uri: item["mealPlan"]["imageURL"] }
        }
        else {
            if (index === 0) return foodSearchImages.foodName
            if (index === 1) return foodSearchImages.suitableConst
            if (index === 2) return foodSearchImages.unsuitableConst
            if (index === 3) return foodSearchImages.understandFood
        }
    }

    onGo = () => {
        this.props.goToCCA()
        this.props.dispatchEvent(events.CCAFoodSearchResultGoButtonClick)
    }

    render() {
        const { foodDetails } = this.props

        return (
            <>
                <SafeAreaView style={styles.safeViewTop} />
                <SafeAreaView style={styles.safeViewBottom}>

                    <Header
                        onBackPress={() => this.handleBackButton()}
                        headerTitle={this.MetaConstants.foodSearchResultTxt}
                    />

                    <View style={styles.mainView}>

                        <View style={styles.resultView}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {isEmpty(foodDetails) ? null : foodDetails.map((item, index) => {
                                    return this.renderTitle(item, index)
                                })}
                            </ScrollView>
                        </View>


                        <View style={styles.bottomView}>

                            <View style={styles.bottomSubView}>
                                <Text style={styles.bottomText}>{this.MetaConstants.foodSearchUnderstandTxt}</Text>
                                <TouchableOpacity style={styles.goBtnBg}
                                    onPress={() => this.onGo()}
                                >
                                    <Text style={styles.goBtnText}>{this.MetaConstants.foodSearchGoTxt}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </SafeAreaView >
            </>
        );
    }
}

FoodSearchResult.PropTypes = {
    navigation: PropTypes.object,
};

const mapsStateToProps = state => ({
    foodDetails: state.foodSearch.foodDetails
});

export default connect(mapsStateToProps,
    {
        goToFoodSearch,
        goToCCA,
        getTopSearches,
        dispatchEvent
    }
)(FoodSearchResult);