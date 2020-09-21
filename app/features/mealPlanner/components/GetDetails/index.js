import React, { PureComponent } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import { getMetaForMetrics } from "../../utils";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import { PruRoundedButton } from "../../../../components";
import styles from "./styles";
import CheckBox from "react-native-check-box";
import { GET_DETAILS_BACKGROUND, CIRCLE } from "../../../../config/images";
import { PropTypes } from "mobx-react";

class GetDetails extends PureComponent {
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
      preferenceList: getMetaForMetrics(
        "foodPreferenceListNew",
        this.mealPlannerData,
        []
      ),
      selectedItems: (props.dietList || []).length ? props.dietList : ["None"],
    };
  }

  handleClick = item => {
    const prevItem = this.state.selectedItems[0];
    this.setState({
      selectedItems: [item],
    });

    const savePreferences = {
      dietList: item === "None" ? [] : [item],
    };
    if (prevItem !== item) savePreferences.exclusionList = [];
    this.props.savePreferences(savePreferences);
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={
            this.state.selectedItems[0] === item.key
              ? styles.buttonSelectedView
              : styles.buttonView
          }
          onPress={() => this.handleClick(item.key)}
        >
          <Text
            style={
              this.state.selectedItems[0] === item.key
                ? styles.buttonSelectedText
                : styles.buttonText
            }
          >
            {item.name}
          </Text>
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
            data={this.state.preferenceList}
            renderItem={item => this.renderItem(item)}
            extraData={this.state.selectedItems}
          />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

GetDetails.propTypes = {
  savePreferences: PropTypes.func,
  dietList: PropTypes.arrayOrObservableArray,
};

export default connect(mapStateToProps, {})(GetDetails);
