import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { metaFinder } from "../../utils/meta-utils";
import {
  ON_BOARDING_SETTINGS,
  BACKGROUND,
  REDCLOSE,
} from "../../../../config/images";
import Search from "./search";
import { Colors } from "../../styles";
import { PruBackHeader, CustomAlert } from "../../../../components";
import MealPlannerScreens from "../../configs/screen-names";
import actions from "../../configs/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import moment from "moment";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";
import { CoreServices } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;

class changeRecipe extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchValue: "",
      data: props.data,
      prvData: props.data,
    };
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.updatedRecipeId &&
      currentState.data &&
      currentState.data.length > 0
    ) {
      currentState.data[currentState.data.length - 1].id =
        nextProps.updatedRecipeId;
      nextProps.clearState();
    }
    return currentState;
  }

  onBackPress = () => {
    this.props.registerEvent(eventNames.onBackPress);
    this.props.getCustomerMealPlan(this.props.selectedDate);
    NavigationService.goBack();
  };

  showMessage = msg => {
    CustomAlert.show("", msg, {
      positiveText: metaFinder("okay"),
      onPositivePress: () => {
        this.props.clearState();
        this.setState({ modalVisible: false, data: this.state.prvData });
      },
    });
  };

  getHeader = () => {
    return (
      <View style={styles.headerTitleContainer}>
        <PruBackHeader
          customStyles={{}}
          title={metaFinder("changeUpdateRecipe")}
          onPress={this.onBackPress}
        />

        {this.getHeaderInfo()}
      </View>
    );
  };

  getHeaderInfo = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          justifyContent: "flex-start",
          marginBottom: 10,
        }}
      >
        <View style={styles.circle}></View>
        <View>
          <Text style={styles.bold}>{this.props.name}</Text>
          <Text style={{ color: rgb(162, 162, 162) }}>
            {this.renderSlotTime(this.props.name)}
          </Text>
        </View>
      </View>
    );
  };

  renderSettings = () => {
    return (
      <TouchableOpacity style={styles.settings}>
        <Image style={styles.settings} source={ON_BOARDING_SETTINGS} />
      </TouchableOpacity>
    );
  };

  getRecipeItem = () => {
    const searchBox = ({ item, index }) => {
      return (
        <View style={styles.result}>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ flexShrink: 1, paddingHorizontal: 20 }}>
              {item.foodItem.name}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => this.onDelete(item, index)}
          >
            <Image source={REDCLOSE} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      );
    };
    const { data } = this.state;
    return (
      <View>
        <FlatList
          data={data}
          extraData={data}
          renderItem={searchBox}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  getBody = () => {
    return <View>{this.getRecipeItem()}</View>;
  };
  resultList = ({ item, index }) => {
    return (
      <View style={styles.resultItem}>
        <TouchableOpacity
          style={[
            styles.resultContainer,
            index == 0 ? { backgroundColor: rgb(255, 228, 228) } : {},
          ]}
          onPress={() => this.updateRecipe(item)}
        >
          <View style={styles.resultList}>
            <Image
              style={styles.image}
              source={{
                uri: item?.mealPlan?.imageURL,
              }}
            ></Image>
            <View style={{ width: "90%" }}>
              <Text style={{ color: Colors.black }}>
                {item?.mealPlan?.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  getResultModal = () => {
    return (
      <FlatList data={this.props.searchResult} renderItem={this.resultList} />
    );
  };

  onSearch = title => {
    this.props.registerEvent(eventNames.searchItem, {
      searchItem: title,
    });
    this.setState({ modalVisible: true });
    this.props.search({ searchItem: title });
  };
  close = () => {
    this.setState({ modalVisible: false, item: {} });
  };
  onDelete = (item, index) => {
    this.props.registerEvent(eventNames.deleteItem, {
      item,
      recipeForDate: this.props.selectedDate,
      recipeForMeal: this.props.name,
    });
    this.deleteItem(index);
    this.props.deleteItem({ id: item.id });
  };

  deleteItem = index => {
    const { data } = this.state;
    const newData = [...data];
    newData.splice(index, 1);
    this.setState({ data: newData, prvData: data });
  };

  getSlotIndicator = slotName => {
    switch (slotName) {
      case "Breakfast":
        return "1";
      case "Lunch":
        return "2";
      case "Dinner":
        return "3";
      default:
        return "1";
    }
  };

  renderSlotTime = slotName => {
    switch (slotName) {
      case "Breakfast":
        return "7 - 10 AM";
      case "Lunch":
        return "12 AM - 1:30 PM";
      case "Dinner":
        return "7 PM - 8:30 PM";
      default:
        return "";
    }
  };

  updateRecipe = (item = {}) => {
    this.props.registerEvent(eventNames.updateItem, {
      updateItem: item,
      recipeForDate: this.props.selectedDate,
      recipeForMeal: this.props.name,
    });
    const { mealPlan = {} } = item;
    const { data } = this.state;
    const { maxNumRecipe } = this.props;
    if (data.length >= maxNumRecipe) {
      this.setState({ modalVisible: false });
      const msg = metaFinder("maxNumRecipeMessage");
      this.showMessage(msg);
      return;
    }
    const newData = [...data];
    const position = newData.length;
    const newItem = {
      foodItem: {
        id: mealPlan.id,
        name: mealPlan.name,
        tags: ["RECIPE"],
      },
    };
    newData.push(newItem);
    const payload = {
      item: newItem,
      startDate: this.props.selectedDate,
      slot: this.getSlotIndicator(this.props.name),
      position: `${position}`,
      servings: `${item.servings}`,
    };
    this.props.updateFoodItem(payload);
    this.setState({ data: newData, prvData: data, modalVisible: false });
  };

  addRecipe = () => {
    const { data } = this.state;
    const newData = [...data];
    newData.push({
      id: "",
      title: "",
    });
    this.setState({ data: newData });
  };

  getFooter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          right: 0,
          height: 58,
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center", width: 80 }}
          onPress={() => this.props.goToCreateMealPlan()}
        >
          <Text style={{ color: "red" }}>{metaFinder("cancel")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => this.props.goToCreateMealPlan()}
        >
          <Text style={{ color: "#ffffff", alignSelf: "center" }}>
            {metaFinder("save")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.getHeader()}
        <ImageBackground
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
          source={BACKGROUND}
        >
          <Search
            searchValue={this.state.searchValue}
            onSearch={title => this.onSearch(title)}
            cancelSearch={() => {
              this.setState({ modalVisible: false });
            }}
          ></Search>
          {!this.state.modalVisible && this.getBody()}
          {this.state.modalVisible && this.getResultModal()}
          {this.props.changeRecipeFail &&
            this.showMessage(metaFinder("alertFailure"))}
        </ImageBackground>
      </View>
    );
  }
}

changeRecipe.propTypes = {
  deleteItem: PropTypes.func,
  search: PropTypes.func,
  searchResult: PropTypes.array,
  data: PropTypes.array,
  name: PropTypes.string,
  updateFoodItem: PropTypes.func,
  getCustomerMealPlan: PropTypes.func,
  selectedDate: PropTypes.string,
  maxNumRecipe: PropTypes.number,
  changeRecipeFail: PropTypes.bool,
  clearState: PropTypes.func,
  updatedRecipeId: PropTypes.string,
  registerEvent: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    searchResult: pathOr([], ["mealPlanner", "searchResult"], state),
    data: pathOr([], ["mealPlanner", "currentSelectedRecipe", "data"], state),
    name: pathOr([], ["mealPlanner", "currentSelectedRecipe", "name"], state),
    selectedDate: pathOr(
      moment().format("YYYY-MM-DD"),
      ["mealPlanner", "currentSelectedRecipe", "selectedDate"],
      state
    ),
    changeRecipeFail: pathOr(false, ["mealPlanner", "changeRecipeFail"], state),
    maxNumRecipe: pathOr(
      5,
      ["meta", "countryCommonMeta", "maxNumRecipe"],
      state
    ),
    updatedRecipeId: pathOr(false, ["mealPlanner", "updatedRecipeId"], state),
  };
};

const mapDispatchToProps = {
  registerEvent,
  search: payload => ({
    type: actions.searchFoodItem,
    context: MealPlannerScreens.ChangeRecipe,
    payload,
    disableTimeout: true,
  }),
  deleteItem: payload => ({
    type: actions.deleteFoodItem,
    context: MealPlannerScreens.ChangeRecipe,
    payload,
    disableTimeout: true,
  }),
  clearState: () => ({
    type: actions.clearState,
  }),
  goToCreateMealPlan: () => ({
    type: "GO_TO_SCREEN",
    navigateTo: MealPlannerScreens.CreatePlan,
  }),
  updateFoodItem: payload => ({
    type: actions.updateFoodItem,
    context: MealPlannerScreens.ChangeRecipe,
    payload,
    disableTimeout: true,
  }),
  getCustomerMealPlan: startDate => ({
    type: actions.getCustomerMealPlans,
    context: MealPlannerScreens.MyMealPlan,
    payload: {
      skipPostResponseHandler: true,
      startDate: startDate,
    },
    disableTimeout: true,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(changeRecipe);

const styles = StyleSheet.create({
  backIcon: {
    height: 15,
    width: 15,
  },
  bold: {
    fontSize: 15,
    fontWeight: "bold",
  },
  circle: {
    borderColor: Colors.pulseRed,
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    margin: 10,
    top: -5,
    width: 10,
  },
  closeIcon: {
    height: 11,
    width: 11,
  },
  container: { backgroundColor: Colors.white, flex: 1 },
  footerContainer: {
    alignItems: "center",
    backgroundColor: Colors.pulseRed,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 15,
    width: 100,
  },
  headerTitleContainer: {
    justifyContent: "flex-start",
    marginTop: 5,
  },
  iconContainer: {
    height: 25,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    width: 25,
  },
  image: {
    height: 34,
    marginRight: 10,
    width: 34,
  },
  imageBackground: {
    flex: 1,
  },
  imageStyle: {
    height: 456,
    resizeMode: "cover",
    top: undefined,
  },
  modalContainer: {
    justifyContent: "flex-end",
    marginLeft: 10,
    padding: 15,
    right: 10,
    top: 10,
  },
  result: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 3.3,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginVertical: 10,
    minHeight: 45,
    paddingVertical: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultContainer: {
    alignItems: "center",
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  resultItem: {
    padding: 15,
    paddingVertical: 5,
  },
  resultList: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
    marginRight: 5,
  },
});
