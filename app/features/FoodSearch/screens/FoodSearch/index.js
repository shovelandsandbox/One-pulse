import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, BackHandler, Platform, Keyboard, TextInput } from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FoodSearchStyle as styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Header from "../../components/Header";
import { getTopSearches, getSearchResults, clearSearchResults, getFoodDetails } from "../../actions";
import { isNil, isEmpty } from "ramda";
import { dispatchEvent } from "../../../../actions";
import { events } from "@pru-rt-internal/pulse-common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MetaConstants from "../../meta";
import { Theme } from "../../../../themes";
const { Colors } = Theme;

class FoodSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            spaceRegex: /^\S.*$/,
            searchTextToDisplay: ""
        }
        this.MetaConstants = { ...MetaConstants.initializeFoodSearchScreenMeta() };
    }

    componentDidMount = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
        this.props.dispatchEvent(events.CCAFoodSearchScreen);
        this.props.getTopSearches()
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {

    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    handleBackButton = () => {
        this.onClearText()
        this.props.navigation.navigate("PulseHealth")
        this.props.dispatchEvent(events.CCAFoodSearchBackClick);
        return true;
    }

    onFoodSelect = (foodId) => {
        this.props.dispatchEvent(events.CCAFoodSearchOptionClick);
        this.setState({ searchText: "" })
        this.props.getFoodDetails({ foodId })
    }

    renderTopSearches = (item, index) => {
        return (
            <TouchableOpacity style={styles.foodNameBg}
                onPress={() => this.onFoodSelect(item.foodItem.id)}>
                <Icon name="circle" size={10} color={Colors.grey707070} />
                <Text style={styles.foodNameText}>{item.foodItem.name}</Text>
            </TouchableOpacity>
        )
    }

    renderSearchResults = (item, index) => {
        return (
            <TouchableOpacity style={styles.foodNameBg}
                onPress={() => this.onFoodSelect(item.foodItem.id)}>
                <Icon name="circle" size={10} color={Colors.grey707070} />
                <Text style={styles.foodNameText}>{item.foodItem.name}</Text>
            </TouchableOpacity>
        )
    }

    onChangeText = (text) => {
        const { spaceRegex } = this.state
        if (!spaceRegex.test(text)) {
            this.setState({ searchText: "" })
        } else {
            this.setState({ searchText: text })
        }
    }

    onClearText = () => {
        this.setState({ searchText: "" })
        this.props.clearSearchResults()
        this.props.dispatchEvent(events.CCAFoodSearchCrossClick);
    }

    onSearch = () => {
        Keyboard.dismiss()
        const { searchText } = this.state
        const keyword = searchText.trim()
        this.props.getSearchResults({ keyword })
        this.props.dispatchEvent(events.CCAFoodSearchSearchClick);
        this.setState({ searchText: searchText.trim(), searchTextToDisplay: searchText.trim() })
    }

    onFocus = () => {
        const { searchResults } = this.props;
        if (isEmpty(searchResults)) {
            this.onClearText()
        }
    }

    render() {
        const { searchText, searchTextToDisplay } = this.state;
        const { topSearches, searchResults, isSearchResponseReceived } = this.props;

        return (
            <>
                <SafeAreaView style={styles.safeViewTop} />
                <SafeAreaView style={styles.safeViewBottom}>

                    <Header
                        onBackPress={() => this.handleBackButton()}
                        headerTitle={this.MetaConstants.foodSearchHeading}
                    />

                    <View style={styles.mainView}>

                        <View style={styles.rowView}>
                            <View style={styles.searchBgView}>
                                <View style={styles.rowView}>
                                    <Icon name="magnify" size={20} color={Colors.grey707070} />
                                    <TextInput
                                        placeholder={this.MetaConstants.foodSearchEnterFoodName}
                                        style={styles.searchInput}
                                        textAlignVertical="center"
                                        blurOnSubmit={true}
                                        value={searchText}
                                        onChangeText={(text) => this.onChangeText(text)}
                                        onFocus={() => this.onFocus()}
                                    />
                                </View>

                                {searchText !== "" &&
                                    <TouchableOpacity onPress={() => this.onClearText()}>
                                        <Icon name="close-circle" size={20} color={Colors.grey707070} />
                                    </TouchableOpacity>
                                }
                            </View>

                            {searchText !== "" &&
                                <TouchableOpacity style={styles.searchBtnBg}
                                    onPress={() => this.onSearch()}
                                >
                                    <Text style={styles.searchBtnText}>{this.MetaConstants.foodSearchTxt}</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={styles.middleView}>

                            {isSearchResponseReceived
                                ? <>{!isEmpty(searchResults)
                                    ? <>
                                        <Text style={styles.redText}>{`${this.MetaConstants.foodSearchShowingResultTxt} ${":"} ${searchTextToDisplay}`}</Text>
                                        <KeyboardAwareScrollView
                                            enableOnAndroid={true}
                                            showsVerticalScrollIndicator={false}>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={searchResults}
                                                renderItem={
                                                    ({ item, index }) => this.renderSearchResults(item, index)
                                                }
                                                keyExtractor={item => item.id}
                                                extraData={this.state}
                                            />
                                        </KeyboardAwareScrollView>
                                    </>

                                    : <View style={{ flexDirection: "row", margin: 10 }}>
                                        <FAIcon name="exclamation-circle" size={25} color={Colors.redec1c2e} />
                                        <Text style={styles.oopsText}>{`${this.MetaConstants.foodSearchOopsTxt} ${'"'}${searchTextToDisplay}${'"'} ${this.MetaConstants.foodSearchAvailTxt} ${this.MetaConstants.foodSearchDatabaseTxt}`}</Text>
                                    </View>
                                }</>

                                : <>
                                    <Text style={styles.searchOrSelectText}>{this.MetaConstants.foodSearchSelectTxt}</Text>
                                    <Text style={styles.redText}>{this.MetaConstants.foodSearchTopKeywords}</Text>

                                    <KeyboardAwareScrollView
                                        enableOnAndroid={true}
                                        showsVerticalScrollIndicator={false}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={topSearches}
                                            renderItem={
                                                ({ item, index }) => this.renderTopSearches(item, index)
                                            }
                                            keyExtractor={item => item.id}
                                            extraData={this.state}
                                        />
                                    </KeyboardAwareScrollView>
                                </>
                            }


                        </View>


                        <View style={styles.bottomView}>
                            <Text style={styles.paraText}>{this.MetaConstants.foodSearchProvidedByTxt}</Text>
                            <View style={styles.divider} />
                            <View style={styles.pcaTmuView}>
                                <Text style={styles.pcaTmuText}>{this.MetaConstants.foodSearchPcaLifeTxt}</Text>
                                <Icon name="close" size={25} color={Colors.redec1c2e} />
                                <Text style={styles.pcaTmuText}>{this.MetaConstants.foodSearchResearchCenter}</Text>
                            </View>
                        </View>


                    </View>

                </SafeAreaView >
            </>
        );
    }
}

FoodSearch.PropTypes = {
    navigation: PropTypes.object,
};

const mapsStateToProps = state => ({
    topSearches: state.foodSearch.topSearches,
    searchResults: state.foodSearch.searchResults,
    isSearchResponseReceived: state.foodSearch.isSearchResponseReceived,
});

export default connect(mapsStateToProps,
    {
        getTopSearches,
        getSearchResults,
        clearSearchResults,
        getFoodDetails,
        dispatchEvent
    }
)(FoodSearch);