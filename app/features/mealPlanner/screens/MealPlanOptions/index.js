import React, { PureComponent } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import ShadowWrapper from "../../../../components/ShadowWrapper";
import { PruBackHeader } from "../../../../components";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import {
  START_FROM_SCRATCH_BANNER,
  ON_BOARDING_SETTINGS,
} from "../../../../config/images";
import LinearGradient from "react-native-linear-gradient";
import MealPlanTemplate from "../../components/MealPlanTemplate";
import { PropTypes } from "mobx-react";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import MealPlannerScreens from "../../configs/screen-names";
import { pathOr } from "ramda";
import actions from "../../configs/actions";

class MealPlanOptions extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderSettings = () => {
    return (
      <TouchableOpacity style={styles.settings}>
        <Image style={styles.settings} source={ON_BOARDING_SETTINGS} />
      </TouchableOpacity>
    );
  };

  getHeader = () => {
    return (
      <ShadowWrapper>
        <PruBackHeader
          customStyles={{}}
          title={safeMetaLabelFinder("mealPlan", "myMealPlan")}
        />
      </ShadowWrapper>
    );
  };

  getTemplateHeader = () => {
    return (
      <View style={styles.templateHeader}>
        <Text style={styles.templateTitle}>
          {safeMetaLabelFinder("mealPlan", "popularMealPlans")}
        </Text>
        <Text style={styles.templateDescription} numberOfLines={2}>
          {safeMetaLabelFinder("mealPlan", "chooseDesc")}
        </Text>
      </View>
    );
  };

  launchCustomerMealPlan = () => {
    this.props.launchCustomerMealPlan();
  };

  getStartFromScratchView = () => {
    return (
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        source={START_FROM_SCRATCH_BANNER}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.96)", "rgba(84, 84, 84, 0)"]}
          style={styles.imageStyle}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.startContainer}>
            <Text style={styles.startTitle}>
              {safeMetaLabelFinder("mealPlan", "startFromScratch")}
            </Text>
            <Text style={styles.startDescription} numberOfLines={2}>
              {safeMetaLabelFinder("mealPlan", "customiseText")}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.launchCustomerMealPlan}
          >
            <LinearGradient
              colors={["#ec1c2e", "#a21421"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonStart}>
                {safeMetaLabelFinder("mealPlan", "start")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    );
  };

  onTemplateSelect = templateId => {
    this.props.createCustomerMealPlan({ id: templateId, type: "template" });
  };

  renderItem = ({ item }) => {
    return (
      <MealPlanTemplate
        template={item}
        onSelect={this.onTemplateSelect}
      ></MealPlanTemplate>
    );
  };
  getTemplates = () => {
    return (
      <View style={styles.templateContainer}>
        <FlatList
          data={this.props.mealPlanTemplates}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.getHeader()}
        {this.getStartFromScratchView()}
        {this.getTemplateHeader()}
        {this.getTemplates()}
      </View>
    );
  }
}

MealPlanOptions.propTypes = {
  launchCustomerMealPlan: PropTypes.func,
  mealPlanTemplates: PropTypes.array,
  createCustomerMealPlan: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    mealPlanTemplates: pathOr([], ["mealPlanner", "mealPlanTemplates"], state),
  };
};

const mapDispatchToProps = {
  launchCustomerMealPlan: () => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: MealPlannerScreens.MealPlanner,
  }),
  createCustomerMealPlan: payload => ({
    type: actions.createCustomerMealPlan,
    context: MealPlannerScreens.MealPlanOptions,
    payload: payload,
    disableTimeout: true,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MealPlanOptions);
