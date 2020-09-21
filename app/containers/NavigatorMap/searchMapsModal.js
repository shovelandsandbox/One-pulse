import React from "react";
import {
  Text,
  View,
  Platform,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,

} from "react-native";
import Modal from "react-native-modal";
import { pathOr } from "ramda";
import Geocoder from "react-native-geocoding";
import Geolocation from "Geolocation";
import { connect } from "react-redux";

// Styles
import styles from "./styles";

// custom
import AppConfig from "../../config/AppConfig";
import { CoreServices } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;

let config = require("./config.json");

import {
  NAVIGATOR_RECENT_ICON,
  BACK,
} from "../../config/images";
import MetaConstants from "./meta";


class SearchMapsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: this.props.searchInput || "",
      searchResults: [],
    };
    this.searchInputRef = React.createRef();
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.searchInputRef && this.searchInputRef.focus();
  }

  getGeometryOfPlace = (placeID, description) => {
    const GOOGLE_API_KEY = AppConfig.getGoogleApiKey(Platform.OS);
    const encodedKey = encodeURIComponent(GOOGLE_API_KEY);
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${encodedKey}&place_id=${placeID}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === "OK") {
          const { lat, lng } = pathOr(
            {},
            ["result", "geometry", "location"],
            responseJson
          );
          if (lat && lng) {
            const targetRegion = {
              longitude: lng,
              latitude: lat,
              latitudeDelta: 0.0625 * 0.5 * 0.5,
              longitudeDelta: 0.0625 * 0.5 * 0.5,
            };
            this.props.moveToSelectedRegion(targetRegion, description);
            const recentSearch = this.props.recentSearch || [];
            // check if already exists in history
            if (recentSearch.indexOf(description) === -1) {
              recentSearch.push(description);
            }
            this.props.setRecentSearch(recentSearch);
          }
          this.props.onClose();
          this.setState(() => ({ searchResults: [] }));
        }
      });
  };

  // get maps suggestions
  getPredictions = value => {
    const GOOGLE_API_KEY = AppConfig.getGoogleApiKey(Platform.OS);
    const GOOGLE_PLACES_URL = AppConfig.getGooglePlacesUrl();

    const encodedKey = encodeURIComponent(GOOGLE_API_KEY);
    const encodedValue = encodeURIComponent(value);

    const url = `${GOOGLE_PLACES_URL}?key=${encodedKey}&input=${encodedValue}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === "OK") {
          const searchResults = responseJson.predictions || [];
          this.setState({
            searchResults,
          });
        }
      });
  };

  onChangeText = text => {
    this.setState(() => ({ searchInput: text }));
    if (!text.trim()) {
      this.setState(() => ({ searchResults: [] }));
    }
    this.getPredictions(text.trim());
  };

  handleFavourite(item) {
    // if (item === "Hospitals") {
    this.props.onClose();
    NavigationService.navigate("SearchMapCategoryList", {
      currentCoordnate: this.props.currentCoordnate,
      category: item,
    });
    // }
  }

  render() {
    let categories = this.metaConstants.config;

    console.log("categoriescategories", categories);

    return (
      <Modal style={styles.modal} isVisible={true}>
        <ScrollView
          keyboardShouldPersistTaps={"handled"}
          style={styles.container}
        >
          <View style={styles.test}>
            {/* Search Input */}
            <View style={styles.searchContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.onClose();
                }}
              >
                <Image style={styles.backIcon} source={BACK}></Image>
              </TouchableOpacity>
              <View
                style={[
                  styles.searchtextContainer,
                  {
                    position: "relative",
                    flex: 1,
                    marginLeft: 10,
                  },
                ]}
              >
                <TextInput
                  ref={ref => (this.searchInputRef = ref)}
                  onChangeText={text => this.onChangeText(text)}
                  placeholder={this.metaConstants.searchHere}
                  value={this.state.searchInput}
                  style={styles.searchtextInput}
                ></TextInput>
                <Text
                  onPress={() => {
                    this.setState(() => ({ searchInput: "", searchResults: [] }));
                  }}
                  style={styles.clearTextIcon}
                >
                  X
              </Text>
              </View>


            </View>

            {/* Divider */}
            <View style={styles.divider}></View>

            {/* pulse search */}
            <View style={styles.pulseSearchContainer}>
            <Text style={styles.pulseSearchText}>
              {this.metaConstants.pulseSearch}
            </Text>
            <View style={styles.pulseSearchCategoriesContainer}>
              {categories.map((category, i) => {
                const imageUrl =
                  AppConfig.getCMSUrl() +
                  "pulse/resources" +
                  category.img_uri +
                  "?namespace=" +
                  this.props.namespace;
                const imgSource = {
                  uri: imageUrl,
                };
                return (
                  <TouchableOpacity
                    style={styles.searchCategoryContainer}
                    onPress={() => this.handleFavourite(category.key)}
                  >
                    <Image
                      style={styles.categoryIcon}
                      source={imgSource}
                    ></Image>
                    <Text style={styles.categoryText}>
                      {category.display_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

            {/* Recent Search */}
            {this.props.recentSearch && this.props.recentSearch.length > 0 && (
            <View style={styles.recentSearchContainer}>
              <Text style={styles.recentSearchHeaderText}>
                {this.metaConstants.recentSearch}
              </Text>
              {this.props.recentSearch.map(text => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.onChangeText(text);
                    }}
                  >
                    <View style={styles.recentSearchTextContainer}>
                      <Image
                        style={styles.recentSearchIcon}
                        source={NAVIGATOR_RECENT_ICON}
                      ></Image>
                      <Text style={styles.recentSearchText}>{text}</Text>
                    </View>
                    <View style={styles.recentSearchDivider}></View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Input suggestions */}
          {this.state.searchResults && this.state.searchResults.length > 0 && (
                <View style={styles.searchSuggestionsContainer}>
                  {this.state.searchResults.map(searchResult => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.getGeometryOfPlace(
                            searchResult.place_id,
                            searchResult.description
                          );
                        }}
                      >
                        <Text style={styles.searchResultText}>
                          {searchResult.description}
                        </Text>
                        <View style={styles.searchResultDivider}></View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    namespace: pathOr("", ["auth", "userAgent", "region"], state),
  };
};

export default connect(mapStateToProps, {})(SearchMapsModal);
