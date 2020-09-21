import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import ShadowWrapper from "../../../../components/ShadowWrapper";
import { PruBackHeader } from "../../../../components";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import * as Progress from "react-native-progress";
import { BURN } from "../../../../config/images";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { PropTypes } from "mobx-react";
import colors from "../../../../themes/default/colors";

class RecipeDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "ingredientsList",
    };
  }

  getHeader = () => {
    return (
      <ShadowWrapper>
        <PruBackHeader
          title={safeMetaLabelFinder("mealPlan", "foodDetails")}
          customStyles={{}}
          onPress={this.renderExitModal}
        />
      </ShadowWrapper>
    );
  };

  getTitle = () => {
    const { mealPlan = {} } = this.props.recipeDetails;
    const slotName = pathOr(
      "",
      ["navigation", "state", "params", "slotName"],
      this.props
    );
    return (
      <View style={[styles.tileContainer, styles.marginPadding]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: mealPlan.imageURL }}
          ></Image>
          <View style={styles.titleHeader}>
            <Text numberOfLines={3} style={styles.name}>
              {mealPlan.name}
            </Text>

            <Text style={styles.menuLabel}>
              {slotName + " " + safeMetaLabelFinder("mealPlan", "lunchMenu")}
            </Text>
          </View>
        </View>
        <View style={styles.titleAmountContainer}>
          <View style={styles.amount}>
            <Image style={styles.burn} source={BURN} />
            <Text style={styles.name}>{mealPlan.calories}</Text>
          </View>

          <Text style={styles.caloriesLabel}>
            {safeMetaLabelFinder("mealPlan", "KCAL100g")}
          </Text>
        </View>
      </View>
    );
  };

  getNutritionChart = ({
    background,
    circle,
    progress,
    value,
    label,
    percentage = 0,
  }) => {
    return (
      <View
        style={[
          styles.nutritionContainer,
          styles.compositionContainer,
          { backgroundColor: background },
        ]}
      >
        <View style={[styles.circle, { backgroundColor: circle }]}></View>
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={70}
            progress={`${percentage / 100}`}
            color={progress}
            borderColor={"#ffffff"}
            showsText={true}
            radius={8}
            formatText={() => (
              <Text style={styles.percent}>{percentage + "%"}</Text>
            )}
            direction={"counter-clockwise"}
          />
          <Text style={styles.nutritionValue}>
            {value + this.props.mealUnit}
          </Text>
          <Text style={styles.nutritionLabel}>
            {safeMetaLabelFinder("mealPlan", label)}
          </Text>
        </View>
      </View>
    );
  };

  getComposition = () => {
    const {
      mealPlan = {
        protien: 0,
        carbs: 0,
        fat: 0,
        nutrients: {
          proteinPercentage: 0,
          fatPercentage: 0,
          carbsPercentage: 0,
        },
      },
    } = this.props.recipeDetails;
    return (
      <View style={styles.nutritionRowItem}>
        {this.getNutritionChart({
          background: "rgb(243,251,254)",
          circle: "rgb(0,113,155)",
          progress: "rgb(0, 113, 155)",
          value: mealPlan.carbs,
          label: "Carbohydrates",
          percentage: mealPlan?.nutrients?.carbsPercentage,
        })}
        {this.getNutritionChart({
          background: "rgb(255,249,246)",
          circle: "rgb(255, 122, 55)",
          progress: "rgb(255, 122, 55)",
          value: mealPlan.fat,
          label: "Fat",
          percentage: mealPlan?.nutrients?.fatPercentage,
        })}
        {this.getNutritionChart({
          background: "rgb(255,251,237)",
          circle: "rgb(243,189,0)",
          progress: "rgb(243, 189, 0)",
          value: mealPlan.protien,
          label: "Protein",
          percentage: mealPlan?.nutrients?.proteinPercentage,
        })}
      </View>
    );
  };

  renderTabHeader = () => {
    const TABS = [
      {
        key: "ingredientsList",
        title: safeMetaLabelFinder("mealPlan", "ingredientsList"),
      },
      { key: "recipe", title: safeMetaLabelFinder("mealPlan", "recipe") },
    ];
    const tabs = TABS.map(tab => {
      const isActive = tab.key === this.state.activeTab;
      return this.renderTabHeaderItem(tab, isActive);
    });
    return <View style={styles.toggleButtonStyle}>{tabs}</View>;
  };

  onTabPress = key => {
    this.setState({
      activeTab: key,
    });
  };

  renderTabHeaderItem = ({ title, key }, isActive) => {
    const style = [styles.toggleText];
    if (isActive) {
      style.push({ fontWeight: "bold" });
    }
    const dotColor =
      key === "ingredientsList"
        ? "rgba(70, 149, 18, 1)"
        : "rgba(241, 23, 43, 1)";

    return (
      <TouchableOpacity
        style={styles.toggleButtonArea}
        onPress={() => this.onTabPress(key)}
      >
        <View style={styles.rowItem}>
          <View
            style={[styles.circle, styles.headerDot, { borderColor: dotColor }]}
          ></View>
          <Text style={style}>{title}</Text>
        </View>
        {isActive && <View style={styles.groupSelectedLine}></View>}
        {!isActive && <View style={styles.groupNotSelectedLine}></View>}
      </TouchableOpacity>
    );
  };

  renderIngredients = ({ item }) => {
    return (
      <View style={styles.ingredient}>
        <Image
          style={styles.itemImage}
          source={{ uri: item?.foodItem?.imageURL }}
        />
        <Text numberOfLines={1} style={styles.ingredientValue}>
          {item?.foodItem?.name}
        </Text>
        <Text numberOfLines={1} style={styles.ingredientUnit}>
          {item?.quantity?.toFixed(2) + " " + (item?.unit || "")}
        </Text>
      </View>
    );
  };

  renderRecipeList = ({ item, index }) => {
    return (
      <View style={styles.ingredient}>
        <Text style={styles.recipeValue}>{`${index + 1}. ${item}`}</Text>
      </View>
    );
  };

  getIngredientsList = () => {
    const { foodItems = {}, mealPlan = {} } = this.props.recipeDetails;
    let recipeList = [];
    try {
      recipeList = JSON.parse(mealPlan?.description) || [];
    } catch (e) {
      console.log(
        "MealPlanner: JSON parse failed for recipe ",
        mealPlan.description
      );
    }
    const showIngredients = this.state.activeTab === "ingredientsList";
    return (
      <View style={[styles.tileContainer, styles.ingredientContainer]}>
        {this.renderTabHeader()}
        <View style={styles.marginPadding}>
          <FlatList
            data={showIngredients ? foodItems.Ingredients : recipeList}
            renderItem={
              showIngredients ? this.renderIngredients : this.renderRecipeList
            }
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.getHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.getTitle()}
          {this.getComposition()}
          {this.getIngredientsList()}
        </ScrollView>
      </View>
    );
  }
}

RecipeDetails.propTypes = {
  recipeDetails: PropTypes.object,
  mealUnit: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    recipeDetails: pathOr({}, ["mealPlanner", "recipeDetails"], state),
    mealUnit: pathOr(" g", ["mealPlanner", "mealUnit"], state),
  };
};

export default connect(mapStateToProps, null)(RecipeDetails);

const styles = StyleSheet.create({
  amount: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  burn: {
    height: 17,
    marginRight: 10,
    resizeMode: "stretch",
    width: 12,
  },
  caloriesLabel: {
    color: colors.black,
    fontSize: 13,
    lineHeight: 15,
    textAlign: "right",
  },
  circle: {
    borderRadius: 5,
    height: 10,
    margin: 10,
    width: 10,
  },
  compositionContainer: {
    flexDirection: "column",
    height: 148,
    justifyContent: "flex-start",
    width: 104,
  },
  container: {
    flex: 1,
  },
  groupNotSelectedLine: {
    borderBottomColor: "rgba(247, 249, 251, 1)",
    borderBottomWidth: 1,
  },
  groupSelectedLine: {
    borderBottomColor: "rgba(241, 23, 43, 1)",
    borderBottomWidth: 1,
  },
  headerDot: {
    borderWidth: 1,
    bottom: 0,
    top: 5,
  },
  image: {
    borderRadius: 5,
    height: 74,
    justifyContent: "center",
    width: 102,
  },
  imageContainer: {
    flexDirection: "row",
    margin: 10,
  },
  ingredient: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ingredientContainer: {
    borderRadius: 7,
    flexDirection: "column",
    height: undefined,
    justifyContent: "flex-start",
  },
  ingredientUnit: {
    color: "rgba(81,91,97,1)",
    fontSize: 14,
    lineHeight: 16,
    position: "absolute",
    right: 10,
    textAlign: "left",
  },
  ingredientValue: {
    color: "rgba(81,91,97,1)",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "left",
    width: "60%",
  },
  itemImage: {
    borderRadius: 10,
    height: 25,
    marginRight: 10,
    width: 25,
  },
  marginPadding: {
    marginTop: 20,
  },
  menuLabel: {
    color: colors.black,
    fontSize: 13,
    lineHeight: 15,
  },
  name: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    marginBottom: 5,
  },
  nutritionLabel: {
    color: "rgba(81,91,97,1)",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
  },
  nutritionValue: {
    color: "rgba(38,38,38,1)",
    fontSize: 14,
    lineHeight: 16,
    paddingVertical: 5,
    textAlign: "center",
  },
  percent: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
  },
  progressContainer: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  recipeValue: {
    color: "rgba(81,91,97,1)",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "left",
    padding: 5,
  },
  rowItem: {
    flexDirection: "row",
  },
  nutritionRowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  tileContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 3.3,
    elevation: 5,
    flexDirection: "row",
    height: 94,
    justifyContent: "space-between",
    marginHorizontal: 20,

    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nutritionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 3.3,
    elevation: 5,
    flexDirection: "row",
    height: 94,
    justifyContent: "space-between",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleAmountContainer: {
    margin: 10,
    position: "absolute",
    right: 5,
  },
  titleHeader: {
    marginLeft: 15,
    width: "50%",
  },
  toggleButtonArea: {
    paddingTop: 10,
    width: "50%",
  },

  toggleButtonStyle: {
    backgroundColor: "white",
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  toggleText: {
    color: "black",
    fontSize: 14,
    paddingVertical: 10,
    textAlign: "center",
  },
});
