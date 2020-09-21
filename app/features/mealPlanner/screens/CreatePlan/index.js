import React, { PureComponent } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import ShadowWrapper from "../../../../components/ShadowWrapper";
import { PruBackHeader } from "../../../../components";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import {
  CREATE_PLAN_BACKGROUND,
  ON_BOARDING,
  ON_BOARDING_SETTINGS,
} from "../../../../config/images";
import LinearGradient from "react-native-linear-gradient";
import { PropTypes } from "mobx-react";
import { connect } from "react-redux";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import MealPlannerScreens from "../../configs/screen-names";

class CreatePlan extends PureComponent {
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

  getContentView = () => {
    return (
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        source={CREATE_PLAN_BACKGROUND}
      >
        <Image style={styles.onBoarding} source={ON_BOARDING} />
        <Text style={styles.onBoardingText}>
          {safeMetaLabelFinder("mealPlan", "createPlanText")}
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.props.showMealPlanOptions}
        >
          <LinearGradient
            colors={["#ec1c2e", "#a21421"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.create}>
              {safeMetaLabelFinder("mealPlan", "create")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.getHeader()}
        {this.getContentView()}
      </View>
    );
  }
}

CreatePlan.propTypes = {
  showMealPlanOptions: PropTypes.func,
};

const mapDispatchToProps = {
  showMealPlanOptions: () => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: MealPlannerScreens.MealPlanOptions,
  }),
};

export default connect(null, mapDispatchToProps)(CreatePlan);
