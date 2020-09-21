import React, { PureComponent } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import ShadowWrapper from "../../../../components/ShadowWrapper";
import { PruBackHeader, CustomAlert } from "../../../../components";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import { metaFinder } from "../../utils/meta-utils";
import {
  ON_BOARDING_SETTINGS,
  MY_MEAL_PLAN_BANNER,
  CREATE_PLAN_BACKGROUND,
} from "../../../../config/images";
import { PropTypes } from "prop-types";
import ContentLoader from "react-native-easy-content-loader";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import MealSlot from "../../components/MealSlot";

import { pathOr } from "ramda";
import actions from "../../configs/actions";
import screens from "../../configs/screen-names";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import style from "../../../../components/PruShare/style";

const { NavigationService } = CoreServices;

const { width } = Dimensions.get("window");
const radius = 7;
const ITEM_WIDTH = width / radius;
const loaderWidth = width / 8;

const getFullDayFromDate = dateStr => moment(dateStr).format("dddd");
const dateFormats = ["DD/MM/YYYY", "YYYY-MM-DD"];
const dateDiff = (firstDate, secondDate) => {
  return moment.duration(
    moment(firstDate, dateFormats).diff(moment(secondDate, dateFormats))
  );
};

const getMealPlanForDate = (dateStr, customerMealPlans) => {
  const mealPlanForDate = customerMealPlans[dateStr] || {};
  const day = getFullDayFromDate(dateStr) || "";
  return mealPlanForDate[day] || mealPlanForDate[day.toLowerCase()];
};

class MyMealPlan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateIndex: 7,
      todaysMeal: {},
      selectedDate: moment().format("YYYY-MM-DD"),
    };
    this.slotData = ["Breakfast", "Lunch", "Dinner"];
  }

  componentDidMount() {
    this.setState({
      todaysMeal: getMealPlanForDate(
        this.state.selectedDate,
        this.props.customerMealPlans
      ),
    });

    this.props.getCustomerMealPlanTemplates();
    this.props.registerEvent(eventNames.myMealPlanLaunch);
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    if (nextProps.customerMealPlans) {
      const nextPropsMeal = getMealPlanForDate(
        currentState.selectedDate,
        nextProps.customerMealPlans
      );
      if (nextPropsMeal !== currentState.todaysMeal) {
        return {
          todaysMeal: nextPropsMeal,
        };
      }
    }
    return currentState;
  }

  renderSettings = () => {
    return (
      <TouchableOpacity
        style={styles.settings}
        onPress={this.props.updatePreferences}
      >
        <Image style={styles.settings} source={ON_BOARDING_SETTINGS} />
      </TouchableOpacity>
    );
  };

  handleBackPress = () => {
    this.props.registerEvent(eventNames.mealPlannerExit);
    NavigationService.navigate("MainTab");
  };

  getHeader = () => {
    return (
      <ShadowWrapper>
        <PruBackHeader
          customStyles={{}}
          title={safeMetaLabelFinder("mealPlan", "myMealPlan")}
          onPress={this.handleBackPress}
          rightImage
          rightImageRenderMethod={this.renderSettings}
        />
      </ShadowWrapper>
    );
  };

  getNutritionView = mealPlan => {
    const { carbs = "0", protien = "0", fat = "0" } = mealPlan;
    return (
      <View style={styles.nutrition}>
        <View style={styles.nutritionColumn}>
          <ContentLoader
            active
            primaryColor={"rgba(232, 237, 241, 0.3)"}
            secondaryColor={"rgba(220, 222, 224, 0.3)"}
            title={false}
            pRows={1}
            pHeight={[20]}
            pWidth={[loaderWidth]}
            containerStyles={{ marginBottom: 20 }}
            loading={this.props.showMealPlanIndicator}
          >
            <Text style={styles.nutritionText}>
              {carbs + this.props.mealUnit}
            </Text>
            <Text style={styles.nutritionText}>
              {safeMetaLabelFinder("mealPlan", "CARBS")}
            </Text>
          </ContentLoader>
        </View>
        <View style={styles.nutritionColumn}>
          <ContentLoader
            active
            primaryColor={"rgba(232, 237, 241, 0.3)"}
            secondaryColor={"rgba(220, 222, 224, 0.3)"}
            title={false}
            pRows={1}
            pHeight={[20]}
            pWidth={[loaderWidth]}
            containerStyles={{ marginBottom: 20 }}
            loading={this.props.showMealPlanIndicator}
          >
            <Text style={styles.nutritionText}>
              {fat + this.props.mealUnit}
            </Text>
            <Text style={styles.nutritionText}>
              {safeMetaLabelFinder("mealPlan", "FAT")}
            </Text>
          </ContentLoader>
        </View>
        <View style={styles.nutritionColumn}>
          <ContentLoader
            active
            primaryColor={"rgba(232, 237, 241, 0.3)"}
            secondaryColor={"rgba(220, 222, 224, 0.3)"}
            title={false}
            pRows={1}
            pHeight={[20]}
            pWidth={[loaderWidth]}
            containerStyles={{ marginBottom: 20, marginRight: 40 }}
            loading={this.props.showMealPlanIndicator}
          >
            <Text style={styles.nutritionText}>
              {protien + this.props.mealUnit}
            </Text>
            <Text style={styles.nutritionText}>
              {safeMetaLabelFinder("mealPlan", "PROTEIN")}
            </Text>
          </ContentLoader>
        </View>
      </View>
    );
  };

  getTimeline = () => {
    const today = moment();
    const start = -1 * radius;
    const end = radius;
    const timeline = [];
    for (let i = start; i <= end; i++) {
      const date = moment(today).add(i, "days");

      timeline.push({
        dateAsDayOnly: date.format("Do"),
        dateAsShortWeekDay: date.format("ddd"),
        dateValue: date.format("YYYY-MM-DD"),
      });
    }
    return timeline;
  };

  handleDayPressed = (item, index) => {
    const {
      customerMealPlans,
      showGetMealLoaderScreen,
      registerEvent,
      clearState,
      getCustomerMealPlans,
      hideGetMealLoaderScreen,
    } = this.props;

    showGetMealLoaderScreen();
    registerEvent(eventNames.getMealPlanForDay, {
      datePressed: item.dateValue,
      isPastDate: dateDiff(item.dateValue, moment().format("YYYY-MM-DD")) < 0,
      isFutureDate: moment().isBefore(item.dateValue),
    });
    const todaysMeal = getMealPlanForDate(item.dateValue, customerMealPlans);
    if (!todaysMeal) {
      //dispatch action to load today's meal
      clearState();
      getCustomerMealPlans(item.dateValue);
    }
    this.setState({
      todaysMeal,
      selectedDateIndex: index,
      selectedDate: item.dateValue,
    });
    todaysMeal && hideGetMealLoaderScreen();
  };

  renderDay = ({ item, index }) => {
    const { selectedDateIndex } = this.state;
    return (
      <View style={{ width: ITEM_WIDTH }}>
        <Text style={styles.weekDay}>{item.dateAsShortWeekDay}</Text>
        <TouchableOpacity
          style={[
            styles.weekButton,
            selectedDateIndex === index ? styles.currentDateBtn : null,
          ]}
          onPress={() => this.handleDayPressed(item, index)}
        >
          <Text
            style={[
              styles.weekDate,
              selectedDateIndex === index ? styles.currentDate : null,
            ]}
          >
            {item.dateAsDayOnly}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  getWeekView = () => {
    const timeline = this.getTimeline();
    const { selectedDateIndex } = this.state;
    return (
      <View style={styles.weekContainer}>
        <FlatList
          data={timeline}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderDay}
          initialScrollIndex={selectedDateIndex - Math.floor(radius / 2)}
          keyExtractor={(item, index) => "day" + index}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
        />
      </View>
    );
  };

  isDayInFuture = () => moment().isBefore(this.state.selectedDate);

  renderBanner = () => {
    const { todaysMeal = {} } = this.state;
    const mealPlan = pathOr({}, ["todaysMeal", "mealPlan"], this.state);
    const { calories = "0" } = mealPlan;
    return (
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        source={MY_MEAL_PLAN_BANNER}
      >
        <LinearGradient
          colors={["rgba(84, 84, 84, 0)", "rgba(0, 0, 0, 0.56)"]}
          style={styles.imageStyle}
        >
          {(todaysMeal.foodItems || this.props.showMealPlanIndicator) && (
            <View style={styles.header}>
              <Text style={styles.preparedText}>
                {safeMetaLabelFinder("mealPlan", "preparedForYou")}
              </Text>
              <Text style={styles.myMealPlanTitle}>{mealPlan.name}</Text>
              <ContentLoader
                active
                primaryColor={"rgba(232, 237, 241, 0.3)"}
                secondaryColor={"rgba(220, 222, 224, 0.3)"}
                title={false}
                pRows={1}
                pHeight={[20]}
                pWidth={["30%"]}
                loading={this.props.showMealPlanIndicator}
              >
                <Text style={styles.preparedText}>
                  {calories + " " + safeMetaLabelFinder("mealPlan", "1230KCAL")}
                </Text>
              </ContentLoader>
            </View>
          )}
          {todaysMeal.foodItems || this.props.showMealPlanIndicator ? (
            this.getNutritionView(mealPlan)
          ) : (
            <View style={styles.createPlan}>
              <Text style={styles.createPlanText}>
                {this.isDayInFuture()
                  ? safeMetaLabelFinder("mealPlan", "createPlanText")
                  : safeMetaLabelFinder("mealPlan", "noPlanText")}
              </Text>
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    );
  };

  renderItem = ({ item }) => {
    const { todaysMeal } = this.state;
    // if (!todaysMeal) {
    // }
    const slotData = pathOr([], ["foodItems", item], todaysMeal);
    const planType = pathOr(
      "",
      ["navigation", "state", "params", "type"],
      this.props
    );
    return (
      <MealSlot
        slotName={item}
        slotData={slotData}
        onPressChangeRecipe={(data, name) =>
          this.onPressChangeRecipe(data, name)
        }
        planType={planType}
      />
    );
  };

  onPressChangeRecipe = (data, name) => {
    this.props.registerEvent(eventNames.changeRecipe, {
      recipeForDate: this.state.selectedDate,
      recipeForMeal: name,
    });
    const newData = data.filter(item => item.foodItem.name != undefined);
    this.props.currentSelectedRecipe({
      data: newData,
      name,
      currentIndex: this.state.selectedDateIndex,
      selectedDate: this.state.selectedDate,
    });
  };

  renderSlots = () => {
    const { todaysMeal } = this.state;
    if (!todaysMeal && !this.props.showMealPlanIndicator) {
      return (
        <View style={styles.noMealContainer}>
          <Text style={styles.noMeal}>{metaFinder("noMealPlan")}</Text>
        </View>
      );
    }

    return (
      <View style={styles.slotsContainer}>
        <FlatList
          data={this.slotData}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          extraData={this.state.todaysMeal}
        />
      </View>
    );
  };

  renderErrorModal = () => {
    CustomAlert.show("", metaFinder("alertFailure"), {
      positiveText: metaFinder("okay"),
      onPositivePress: () => {
        this.props.hideErrorModal();
      },
    });
  };

  renderCreateMealPlan = () => {
    const {
      enableReplicateMealPlan,
      showLoaderScreen,
      registerEvent,
      createCustomerMealPlan,
    } = this.props;
    return (
      <View style={styles.createPlanContainer}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            !enableReplicateMealPlan ? styles.buttonContainerCenter : null,
          ]}
          onPress={() => {
            showLoaderScreen();
            registerEvent(eventNames.createMealPlan);
            createCustomerMealPlan(this.state.selectedDate, "generate");
          }}
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
        {enableReplicateMealPlan > 0 && (
          <Text style={styles.orText}>
            {safeMetaLabelFinder("mealPlan", "or")}
          </Text>
        )}

        <ImageBackground
          style={styles.mealPlanImageBackground}
          imageStyle={styles.mealPlanImageStyle}
          source={CREATE_PLAN_BACKGROUND}
        >
          {enableReplicateMealPlan > 0 && (
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() =>
                createCustomerMealPlan(this.state.selectedDate, "replicate")
              }
            >
              <Text style={styles.repeatText}>
                {safeMetaLabelFinder("mealPlan", "replicateText")}
              </Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    );
  };

  renderLoadScreen = () => {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#FF0266" />
        <Text>{safeMetaLabelFinder("mealPlan", "loadingText")}</Text>
      </View>
    );
  };

  renderMealLoadScreen = () => {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#FF0266" />
        <Text>{safeMetaLabelFinder("mealPlan", "mealLoadingText")}</Text>
      </View>
    );
  };

  render() {
    const { displayType, showErrorMessage } = this.props;
    if (showErrorMessage) {
      this.renderErrorModal();
    }
    return (
      <View style={styles.container}>
        {this.getHeader()}
        {this.renderBanner()}
        {this.getWeekView()}
        {displayType === "createMealPlan" && this.renderCreateMealPlan()}
        {displayType === "myMealPlan" && this.renderSlots()}
        {displayType === "createPlanIndicator" && this.renderLoadScreen()}
      </View>
    );
  }
}

MyMealPlan.propTypes = {
  showErrorMessage: PropTypes.bool,
  hideErrorModal: PropTypes.func,
  customerMealPlans: PropTypes.object,
  currentSelectedRecipe: PropTypes.func,
  getCustomerMealPlans: PropTypes.func,
  createCustomerMealPlan: PropTypes.func,
  clearState: PropTypes.func,
  registerEvent: PropTypes.func,
  mealUnit: PropTypes.string,
  showMealPlanIndicator: PropTypes.bool,
  showLoaderScreen: PropTypes.func,
  updatePreferences: PropTypes.func,
  showGetMealLoaderScreen: PropTypes.func,
  hideGetMealLoaderScreen: PropTypes.func,
  enableReplicateMealPlan: PropTypes.number,
  getCustomerMealPlanTemplates: PropTypes.func,
  displayType: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    showErrorMessage: state.mealPlanner.showErrorMessage,
    customerMealPlans: pathOr({}, ["mealPlanner", "customerMealPlans"], state),
    mealUnit: pathOr(" g", ["mealPlanner", "mealUnit"], state),
    showMealPlanIndicator: state.mealPlanner.showMealLoader,
    enableReplicateMealPlan: pathOr(
      0,
      ["mealPlanner", "customerMealPlanTemplates", "length"],
      state
    ),
    displayType: pathOr("myMealPlan", ["mealPlanner", "displayType"], state),
  };
};

const mapDispatchToProps = {
  registerEvent,
  hideErrorModal: () => ({
    type: actions.disableErrorModal,
    context: screens.MyMealPlan,
  }),
  currentSelectedRecipe: payload => ({
    type: actions.currentSelectedRecipe,
    payload,
  }),
  clearState: () => ({
    type: actions.clearState,
  }),
  showLoaderScreen: () => ({
    type: actions.enableLoader,
  }),
  showGetMealLoaderScreen: () => ({
    type: actions.enableMealLoader,
  }),
  hideGetMealLoaderScreen: () => ({
    type: actions.disableMealLoader,
  }),
  getCustomerMealPlans: startDate => ({
    context: [screens.MyMealPlan],
    type: [actions.getCustomerMealPlans],
    payload: {
      startDate,
      skipPostResponseHandler: true,
    },
    disableTimeout: true,
  }),
  createCustomerMealPlan: (startDate, type) => ({
    type: actions.createCustomerMealPlan,
    context: screens.MealPlanOptions,
    payload: {
      type: type,
      startDate: startDate,
      skipPostResponseHandler: true,
    },
    disableTimeout: true,
  }),
  updatePreferences: () => ({
    type: actions.getCustomerPreference,
    context: screens.MealPlanner,
    disableTimeout: true,
    payload: {
      fromMyMealPlanner: true,
    },
  }),
  getCustomerMealPlanTemplates: () => ({
    type: actions.getCustomerMealPlanTemplates,
    context: screens.MyMealPlan,
    disableTimeout: true,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMealPlan);
