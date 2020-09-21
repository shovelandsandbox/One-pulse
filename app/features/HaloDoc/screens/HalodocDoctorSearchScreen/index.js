import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Keyboard,
  BackHandler,
  ActivityIndicator,
  TextInput,
} from "react-native";
import {
  SEARCH_ICON,
  CLOSE
} from "../../../../config/images";
import {
  events
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";
import MaterialTabs from "react-native-material-tabs";
import CardView from "react-native-cardview";
import { FlatGrid } from "react-native-super-grid";
import HaloDocCategoryTiles from "../../components/HaloDocCategoryTiles";
import DoctorsListItem from "../../components/HaloDocDoctorsListItem";
import { connect } from "react-redux";
import { dispatchEvent } from "../../../../actions";
import {
  gotoDocInfoScreen,
  gotoDocListScreen,
  setSpecializationDetails,
  haloDocSearch,
  resetSearchResults,
  addRecentSearchItem,
  setConsultationDocObject,
} from '../../actions'
import HaloDocActionBar from "../../components/actionBar";
import SafeAreaView from "react-native-safe-area-view";
const window = Dimensions.get("window");
const width = window.width;

import { RecentListItem } from "../../components/RecentListItem"
import { StaticNoResultComponent } from "../../components/StaticNoResultComponent"
import { Theme } from "../../../../themes";
const { Colors } = Theme;
import metaConstants from "../../meta";

class HalodocDoctorSearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowSearchBar: true,
      selectedTabIndex: 0,
      categoryList: [],
      filteredDocList: [],
      searchValue: "",
      shouldShowRecentSearch: false,
      isSearchInitiated: false,
      pageNo: 1,
    };

    this.metaConstants = { ...metaConstants.talkToDoctorMeta() }
  }

  onSetSelectedTab = selectedTab => {
    this.setState({ selectedTabIndex: selectedTab });
  };

  getHaloDocSearchResult = searchValue => {
    this.props.haloDocSearch(searchValue, this.state.pageNo);
  };

  componentWillReceiveProps(nextProps) {
    const filteredDocList =
      nextProps.haloDocSearchResult && nextProps.haloDocSearchResult.docResult
        ? nextProps.haloDocSearchResult.docResult
        : [];
    const categoryList =
      nextProps.haloDocSearchResult && nextProps.haloDocSearchResult.catResult
        ? nextProps.haloDocSearchResult.catResult
        : [];

    this.setState({
      filteredDocList: filteredDocList,
      categoryList: categoryList,
    });
  }

  onItemClick = (value, type, image) => {
    this.props.setSpecializationDetails(value, type, image);
    this.props.gotoDocListScreen(value, type, image);
       this.props.dispatchEvent(events.DocTileClick);
  };

  showWaitingScreen = item => {
    this.props.setConsultationDocObject(item);
    this.props.gotoDocInfoScreen();
  };

  onSearchValueChange = value => {
    this.setState({ searchValue: value });
  };

  onRecentItemSelected = value => {
    this.setState(
      { searchValue: value, isSearchInitiated: true },
      this.onSubmitSearch
    );
  };

  onClearSearchBar = () => {
    if (!this.state.searchValue) {
      this.props.navigation.goBack();
    } else {
      this.setState({ dismissKeyboard: false }, () => {
        Keyboard.dismiss();
      });
      this.setState({ searchValue: "", isSearchInitiated: false });
    }
  };

  onHardwareBack = () => {
    this.props.navigation.goBack();
    return true;
  };

  onSubmitSearch = () => {

    const Min_Char_Required = this.metaConstants.Min_Char_Required;
    if (this.state.searchValue && this.state.searchValue.length > 2) {
      this.props.addRecentSearchItem(this.state.searchValue);
      this.props.resetSearchResults();
      this.setState(
        { isSearchInitiated: true, pageNo: 1 },
        () => {
          this.getHaloDocSearchResult(this.state.searchValue);
        }
      );
    }
  };

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.onHardwareBack);
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    BackHandler.addEventListener("hardwareBackPress", this.onHardwareBack);
  }

  _keyboardDidHide = () => {
    if (!this.state.dismissKeyboard) {
      this.setState({ searchValue: "", isSearchInitiated: false });
    }
  };

  onSearchEndReached = () => {
    if (this.props.haloDocSearchResult.next_page) {
      this.setState(
        prevState => ({
          pageNo: prevState.pageNo + 1,
        }),
        () => {
          this.getHaloDocSearchResult(this.state.searchValue);
        }
      );
    }
  };

  renderLoader() {
    return (
      <View style={{ marginVertical: 20 }}>
        <ActivityIndicator size="large" color={Colors.crimson} />
      </View>
    );
  }

  showSearchBar() {

    const Search_By = this.metaConstants.Search_By;
    const Search = this.metaConstants.Search;
    return (
      <View style={styles.searchBarStyle}>
        <TouchableOpacity
          onPress={() => this.setState({ shouldShowSearchBar: false })}
          accessibilityLabel="home"
          accesible
          style={styles.backTouchableStyling}
        >
          <Image style={styles.searchIconStyle} source={SEARCH_ICON} />
        </TouchableOpacity>

        <View style={styles.textInput}>
          <TextInput
            placeholder={Search_By}
            isEditable={true}
            autoCorrect={false}
            isClearable
            style={styles.searchvalue}
            onChangeText={(val) => this.onSearchValueChange(val)}
            onBlur={() => { }}
            onFocus={() => {
              this.setState({ dismissKeyboard: true });
            }}
            returnKeyType={Search}
            onSubmitEditing={this.onSubmitSearch}
            keyboardType={'default'}
          />
        </View>

        <TouchableOpacity
          onPress={this.onClearSearchBar}
          accessibilityLabel="home"
          accesible
          style={styles.backTouchableStyling}
        >
          <Image style={styles.closeIconStyle} source={CLOSE} />
        </TouchableOpacity>
      </View>
    )
  }

  isSearchInitiated() {

    const Doc_Catergory = this.metaConstants.Doc_Catergory;
    const Doc_Speciality = this.metaConstants.Doc_Speciality;
    return (
      <View style={styles.cardViewStyle2}>
        <CardView
          cardElevation={3}
          cardMaxElevation={3}
          cornerRadius={0}
          style={styles.viewCon}
        >
          <MaterialTabs
            items={[Doc_Catergory, Doc_Speciality]}
            selectedIndex={this.state.selectedTabIndex}
            onChange={this.onSetSelectedTab}
            barColor={Colors.rgb255}
            indicatorColor={Colors.pulseRed}
            activeTextColor={Colors.pulseRed}
            textStyle={styles.textStyleView}
            activeTextStyle={{ color: Colors.pulseRed }}
          />
        </CardView>
      </View>
    )
  }

  categoryResult() {

    const Categories_With = this.metaConstants.Categories_With
    return (
      <View style={styles.flexView}>
        <Text style={styles.searchTextStyle}>{`${
          Categories_With
          }${" "}'${this.state.searchValue}'`}
        </Text>
        <FlatGrid
          itemDimension={width * 0.35}
          items={this.state.categoryList}
          style={styles.gridViewStyle}
          spacing={20}
          renderItem={({ item, index }) => (
            <HaloDocCategoryTiles
              key={index}
              item={item}
              onClick={this.onItemClick}
            />
          )}
        />
      </View>
    )


  }

  doctorNameResult() {

    const Doc_With_Name = this.metaConstants.Doc_With_Name
    const type = this.props.navigation.getParam("type", null);
    return (
      <View style={styles.flexView}>
        <Text style={styles.searchDoctorTextStyle}>{`${
          Doc_With_Name
          }${" "}'${this.state.searchValue}'`}</Text>
        <FlatList
          style={{ paddingHorizontal: 10 }}
          data={this.state.filteredDocList}
          onEndReached={this.onSearchEndReached}
          onEndReachedThreshold={0.9}
          bounces={false}
          ListFooterComponent={() => {
            return this.props.haloDocSearchResult.next_page
              ? this.renderLoader()
              : null;
          }}
          renderItem={({ item }) => (
            <DoctorsListItem
              item={item}
              type={type}
              navigation={this.props.navigation}
              showWaitingScreen={this.showWaitingScreen}
            />
          )}
        />
      </View>
    )

  }

  filterListResults() {
    return (
      <View style={{ flex: 1 }} >
        {this.state.selectedTabIndex === 1 ? (
          this.state.categoryList && this.state.categoryList.length > 0 ? (
            this.categoryResult()
          ) : (
              !this.props.isLoading && (
                <StaticNoResultComponent
                  isSearchInitiated={this.state.isSearchInitiated}
                />
              )
            )
        ) : this.state.filteredDocList && this.state.filteredDocList.length > 0 ? (
          this.doctorNameResult()
        ) : (
              !this.props.isLoading ? (
                <StaticNoResultComponent
                  isSearchInitiated={this.state.isSearchInitiated}
                />
              ) : this.renderLoader()
            )}
      </View>
    )
  }

  recentSearch() {

    const Recent = this.metaConstants.Recent
    const FilteredSearches = this.props.haloDocRecentSearches.filter(x => x);

    return (
      <View style={styles.recentSearchContainer}>
        <Text style={styles.recentTextStyle}>
          {Recent}
        </Text>
        <FlatList
          data={FilteredSearches}
          renderItem={({ item }) => (
            <RecentListItem
              item={item}
              onItemClick={this.onRecentItemSelected}
            />
          )}
        />
      </View>
    )
  }

  showSearchScreen() {
    return (
      <View style={styles.container}>
        {!this.state.shouldShowSearchBar ? (
          <HaloDocActionBar
            onMenuIcon2Click={() => { this.setState({ shouldShowSearchBar: true }) }}
            onGoBack={() => { this.props.navigation.goBack(); }}
            menuIcon2={SEARCH_ICON}
          ></HaloDocActionBar>
        ) : (
            <View>
              {this.showSearchBar()}
            </View>
          )}
        {this.state.shouldShowSearchBar && !this.state.isSearchInitiated && (
          this.recentSearch()
        )}

        {(this.state.isSearchInitiated || !this.state.shouldShowSearchBar) && (
          <View style={styles.flexView} >
            {this.isSearchInitiated()}
            {this.filterListResults()}

          </View>
        )}
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.flexView}>
        {this.showSearchScreen()}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
  return {
    haloDocSearchResult: state.haloDocServices.haloDocSearchResult,
    haloDocSearchError: state.haloDocServices.haloDocSearchError,
    haloDocRecentSearches: state.haloDocServices.haloDocRecentSearches,
    isLoading: state.haloDocServices?.haloDocSearchResult?.isLoading,
  };
};
export default connect(mapStateToProps, {
  dispatchEvent,
  gotoDocInfoScreen,
  gotoDocListScreen,
  setSpecializationDetails,
  haloDocSearch,
  resetSearchResults,
  addRecentSearchItem,
  setConsultationDocObject,

})(HalodocDoctorSearchScreen);
