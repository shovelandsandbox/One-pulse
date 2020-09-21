/**
 * Example Usage:
 * const ratingTitles = [
    {
        value: 1,
        label: "Very Poor"
    },
    {
        value: 2,
        label: "Poor"
    },
    {
        value: 3,
        label: "Average"
    },
    {
        value: 4,
        label: "Good"
    },
    {
        value: 5,
        label: "Very Good"
    }
   ]
   <PruRating
    titleText={"How would you rate our service?"}
    selectedRating={2}
    ratingTitles={ratingTitles}></PruRating> 
 */

import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import _ from "lodash";
import pruRatingsStyle from "./styles";
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;
import { RATINGS_STAR, RATINGS_STAR_BORDER } from "../../config/images";
import { makeTouchable } from "../../hocs";
const TouchableView = makeTouchable(View);

class PruRatings extends Component {

  getTitleTextForRating = (selectedRating, ratingTitles) => {
    const ratingItem = _.find(ratingTitles, { value: selectedRating });
    return ratingItem ? ratingItem.label : "";
  }

  getRatingStyleBasedOnSelection = (selectedRating, itemValue) => {
    let rateLevelBackground = {};
    if (itemValue <= selectedRating) {
      rateLevelBackground = pruRatingsStyle.selectedYellow;
    }
    if ((selectedRating > 3) && (itemValue <= selectedRating)) {
      rateLevelBackground = pruRatingsStyle.selectedGreen;
    }
    return rateLevelBackground;
  }

  render() {
    const { titleText, selectedRating, ratingTitles, onRateSelection } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#676767', fontSize: 20, fontFamily: Fonts.AvenirRoman, textAlign: "center", lineHeight: 32, }}>
            {titleText}
          </Text>
          <View style={pruRatingsStyle.ratingContainer}>
              {
                ratingTitles.map((tile, index) => {
                  return (
                    <TouchableOpacity onPress={() => onRateSelection(tile.value)}>
                      <View style={[pruRatingsStyle.ratingItem, this.getRatingStyleBasedOnSelection(selectedRating, tile.value)]}>
                        {
                          index+1 < selectedRating ? null : (
                            <View style={{flex:1, flexDirection: 'row', justifyContent: "space-around"}}>
                              <Text style={(index+1 === selectedRating) && pruRatingsStyle.selected}>{tile.value}</Text>
                              <Image source={index+1 === selectedRating ? RATINGS_STAR : RATINGS_STAR_BORDER} style={[pruRatingsStyle.ratingStarSize]} />
                            </View>
                          )
                        }
                      </View>  
                    </TouchableOpacity>
                  )
                })
              }
          </View>
        </View>
      </View>
    );
  }
}

export default PruRatings;
