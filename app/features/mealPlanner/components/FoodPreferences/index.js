import React, { PureComponent } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { getMetaForMetrics } from "../../utils";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import PropTypes from "prop-types";
import styles from "./styles";
import CheckBox from "react-native-check-box";
import { GREEN_SELECT } from "../../../../config/images";
import AppConfig from "../../../../config/AppConfig";
import { pathOr } from "ramda";
class FoodPreferences extends PureComponent {
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
    this.state = {
      foodList: getMetaForMetrics("foodList", this.mealPlannerData, []),
      selectedList: (props.cuisines || []).length ? props.cuisines : ["None"],
    };
  }

  handleClick = item => {
    let newList = [...this.state.selectedList];
    if (item.name === "None") {
      newList = ["None"];
    } else {
      const noneItem = newList[0];
      if (noneItem === "None") newList.splice(0, 1);
      const itemExistsAtIndex = newList.indexOf(item.name);
      itemExistsAtIndex === -1
        ? newList.push(item.name)
        : newList.splice(itemExistsAtIndex, 1);
    }

    this.setState({
      selectedList: newList,
    });

    this.props.savePreferences({
      cuisines: item.name === "None" ? [] : newList,
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
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.itemImage} source={{ uri: imageUrl }} />
        <View style={styles.titleContainer}>
          <Text style={styles.tileText}>{item.name}</Text>
          <View style={styles.descriptionContainer}>
            <Text>{item.desc}</Text>
          </View>
        </View>
        <CheckBox
          style={styles.checkBox}
          checkBoxColor={"#b2b2b2"}
          onClick={() => this.handleClick(item, index)}
          isChecked={selectedList.indexOf(item.name) !== -1}
          checkedImage={<Image source={GREEN_SELECT} />}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.foodList}
          renderItem={item => this.renderItem(item)}
          extraData={this.state.selectedList}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    namespace: pathOr("", ["auth", "userAgent", "region"], state),
  };
};

FoodPreferences.propTypes = {
  savePreferences: PropTypes.func,
  cuisines: PropTypes.array,
};

export default connect(mapStateToProps, {})(FoodPreferences);
