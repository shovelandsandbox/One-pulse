import React, { PureComponent } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";
import { getMetaForMetrics } from "../../utils";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import { GET_DETAILS_BACKGROUND } from "../../../../config/images";
import AppConfig from "../../../../config/AppConfig";
import { pathOr } from "ramda";

class AllergiesList extends PureComponent {
  constructor(props) {
    super(props);
    this.mealPlannerData = {};
    const mealPlan = metaHelpers.findScreen("mealPlan");
    if (mealPlan) {
      this.mealPlannerData = metaHelpers.findElementWithScreen(
        mealPlan,
        "mealPlanner"
      );
    }

    const dietPreference = (props.dietList && props.dietList[0]) || "None";
    const allergyListKey = this.getAllergyListKeyForDiet(dietPreference);
    this.state = {
      allergyList: getMetaForMetrics(allergyListKey, this.mealPlannerData, []),
      selectedList: (props.exclusionList || []).length
        ? props.exclusionList
        : [],
    };
  }

  getAllergyListKeyForDiet = dietPreference => {
    switch (dietPreference) {
      case "Vegeterian":
        return "allergyListVeg";
      case "Vegan and Pescetarian":
        return "allergyListVegan";
      default:
        return "allergyListNew";
    }
  };

  handleClick = item => {
    const newList = [...this.state.selectedList];

    const itemExistsAtIndex = newList.indexOf(item.name);
    itemExistsAtIndex === -1
      ? newList.push(item.name)
      : newList.splice(itemExistsAtIndex, 1);

    this.setState({
      selectedList: newList,
    });

    this.props.savePreferences({
      exclusionList: newList,
    });
  };

  fetchImageUrl = imageName => {
    return (
      AppConfig.getCMSUrl() +
      "pulse/resources/mealPlanner/" +
      imageName +
      "?namespace=" +
      this.props.namespace
    );
  };

  renderItem = ({ item, index }) => {
    const imageUrl = this.fetchImageUrl(item.imageUrl);
    const { selectedList } = this.state;
    const textColor =
      selectedList.indexOf(item.name) !== -1
        ? { color: "white" }
        : { color: "#2f2f2f" };
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={
            selectedList.indexOf(item.name) !== -1
              ? styles.buttonSelectedView
              : styles.buttonView
          }
          onPress={() => this.handleClick(item, index)}
        >
          <Image style={styles.itemImage} source={{ uri: imageUrl }} />
          <View style={styles.titleContainer}>
            <Text style={[styles.tileText, textColor]}>{item.name}</Text>
            <View style={styles.descriptionContainer}>
              <Text style={textColor}>{item.desc}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        imageStyle={styles.imageStyle}
        source={GET_DETAILS_BACKGROUND}
      >
        <View style={styles.contentView}>
          <FlatList
            data={this.state.allergyList}
            renderItem={item => this.renderItem(item)}
            extraData={this.state.selectedList}
          />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    namespace: pathOr("", ["auth", "userAgent", "region"], state),
  };
};

AllergiesList.propTypes = {
  savePreferences: PropTypes.func,
  exclusionList: PropTypes.array,
  dietList: PropTypes.array,
};

export default connect(mapStateToProps, {})(AllergiesList);
