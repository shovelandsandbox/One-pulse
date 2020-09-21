import React, { PureComponent } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";

class MealPlanTemplate extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderSelectButton = () => {
    const { template, onSelect } = this.props;
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          onSelect(template.id);
        }}
      >
        <LinearGradient
          colors={["#ec1c2e", "#a21421"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonSelect}>
            {safeMetaLabelFinder("mealPlan", "Select")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  getNutritionView = template => {
    return (
      <View style={styles.nutrition}>
        <Text style={styles.nutritionText}>
          {template.carbs + safeMetaLabelFinder("mealPlan", " CARBS")}
        </Text>
        <Text style={styles.nutritionText}>
          {template.fat + safeMetaLabelFinder("mealPlan", " FAT")}
        </Text>
        <Text style={styles.nutritionText}>
          {template.protein + safeMetaLabelFinder("mealPlan", " PROTEIN")}
        </Text>
      </View>
    );
  };

  renderTemplate = () => {
    const { template } = this.props;
    return (
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode={"cover"}
        source={{ uri: template.imageURL }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
          style={styles.imageStyle}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{template.name}</Text>
          </View>
          {this.renderSelectButton()}
        </LinearGradient>
      </ImageBackground>
    );
  };

  render() {
    return <View style={styles.container}>{this.renderTemplate()}</View>;
  }
}

MealPlanTemplate.propTypes = {
  template: PropTypes.object,
  onSelect: PropTypes.func,
};

export default MealPlanTemplate;
