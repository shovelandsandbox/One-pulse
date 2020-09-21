import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  BackHandler,
  ScrollView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-root-toast";

import { styles } from "./style";
import { connect } from "react-redux";
import moment from "moment";
import { pathOr, keys } from "ramda";
// import PruCamera from "../../../../components/PruCamera";
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";
import { metaLabelFinder } from "../../../../utils/meta-utils";
import {
  BACK,
  PULSE_FOOD_SHARE_ICON,
  PULSE_FOOD_CLOSE_CIRCLE,
} from "../../../../config/images";
import {
  addFoodItem,
  scanFoodItem,
  updateCustomerMealPlan,
  getAllCustomerGroup,
} from "../../actions";
import Modal from "react-native-modal";
import PruRoundedButton from "../../../../components/PruRoundedButton";
import { PruBackHeader } from "../../../../components";
import PruDropdownComponent from "../../../../components/PruDropdown";
import { PruCustomAlert } from "../../../../components/PruCustomAlert";
import MetaConstants from "../../meta";
import { CoreComponents } from "@pru-rt-internal/pulse-common";

const { Input } = CoreComponents;

class PulseFoodDetect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: pathOr(
        "",
        ["navigation", "state", "params", "imageSource"],
        this.props
      ),
      showSucessModal: false,
      showQuantityModal: false,
      showAnalyzeFailureModal: false,
      showAnalyzingModal: false,
      name: "",
      calories: "",
      finalCalories: "",
      weight: "",
      weightValue: "",
      weightUnit: "",
      quantities: 1,
      servingSizeList: null,
      selectedServingSize: null,
      selectedServingSizeUnit: null
    };
    this.isCameraOpen = false;
    this.backHandler = null;
    this.editView = pathOr(
      false,
      ["navigation", "state", "params", "editView"],
      this.props
    );
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    this.showAnalyzeFailureModal = null;
    this._showSucessModal = null;
    this._showQuantityModal = null;

    this.closeSuccessModal = false;
  }

  ShowToast = message => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      delay: 0,
    });
  };

  // open camera on component didmount
  componentDidMount() {
    // backhandler listner
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      console.log("back clicked");
      this.props.navigation.goBack();
    });

    // check if the screen to be rendered in EditView
    if (this.editView) {
      this._showQuantityModal = true;
      const mealData = pathOr(
        {},
        ["navigation", "state", "params", "mealData"],
        this.props
      );
      let calories = "";
      let finalCalories = pathOr("", ["foodItem", "calories"], mealData);
      const quatities = pathOr(1, ["quantity"], mealData);
      console.log("dhuwhduwfinalCalories", finalCalories);
      if (finalCalories) {
        calories = parseFloat(parseFloat(finalCalories) / quatities).toFixed(2);
        console.log("dhuwhduwcalories", calories);
      }
      this.setState(() => ({
        name: pathOr("", ["foodItem", "name"], mealData),
        calories: calories,
        finalCalories: pathOr("", ["foodItem", "calories"], mealData),
        quantities: pathOr(1, ["quantity"], mealData),
        weightValue: pathOr("", ["foodItem", "weight"], mealData),
        weightUnit: pathOr("", ["foodItem", "tags", 0], mealData),
        weight: `${pathOr("", ["foodItem", "weight"], mealData)} ${pathOr(
          "",
          ["foodItem", "tags", 0],
          mealData
        )}`,
        imageSource: mealData.imageSource || "",
        showAnalyzeFailureModal: true,
      }));
    } else {
      const payload = {
        body: {
          image: {
            content: this.state.imageSource,
          },
        },
      };
      this.setState(() => ({ showAnalyzingModal: true }));
      this.props.scanFoodItem(payload);
    }
  }

  componentWillUnmount() {
    this.backHandler && this.backHandler.remove();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // check for scan food item API
    if (this.props.isScanFoodItemLoading && !nextProps.isScanFoodItemLoading) {
      this._showSucessModal = true;
      this.setState({ showAnalyzingModal: false });
    }

    // check for add food item API
    if (this.props.isAddFoodItemLoading && !nextProps.isAddFoodItemLoading) {
      // check if The add fodd item API is failed or success
      if (!nextProps.isAddFoodItemError) {
        this._showQuantityModal = true;
        if (Platform.OS == "ios") {
          this.setState({
            showAnalyzeFailureModal: false,
            showSucessModal: false,
          });
        } else {
          this.setState({
            showAnalyzeFailureModal: false,
            showSucessModal: false,
            showQuantityModal: true,
          });
        }
      } else {
        PruCustomAlert.show(this.metaConstants.errTryAgain);
      }
    }

    // check for create Post API
    if (this.props.isCreatePostLoading && !nextProps.isCreatePostLoading) {
      if (nextProps.isCreatePostError) {
        PruCustomAlert.show(this.metaConstants.errTryAgain);
        this.ShowToast(
          this.metaConstants.errorPost
        );
      } else {
        this.ShowToast(this.metaConstants.sucessPost);
      }
    }

    // check for updateCustomerMealPlan API
    if (
      this.props.isUpdateCustomerMealPlanLoading &&
      !nextProps.isUpdateCustomerMealPlanLoading
    ) {
      // check if The Update customer Failed or success
      if (!nextProps.isUpdateCustomerMealPlanError) {
        this.setState(
          () => ({
            showQuantityModal: false,
          }),
          () => {
            this.props.navigation.goBack();
          }
        );
      } else {
        PruCustomAlert.show(this.metaConstants.errTryAgain);
      }
    }
  }

  handleNameChange = text => {

    this.setState({ name: text, failureModalError: "" });
  };

  handleWeightChange = text => {
    // extract the value and unit i.e split number and string
    let val = text.match(/\d+[.]*\d*/g) ? text.match(/\d+[.]*\d*/g)[0] : "";
    let unit = text.match(/[a-zA-Z]+/g) ? text.match(/[a-zA-Z]+/g)[0] : "grams";
    console.log("valisss", val);
    this.setState({
      weightValue: val,
      weightUnit: unit,
      weight: text,
      failureModalError: "",
    });

  };

  handleCaloriesChange = text => {
    const val = parseFloat(text).toFixed(2);
    // validation to check if a float
    if (!isNaN(val) || text === "") {
      if (this.state.editView) {
        this.setState({
          calories: text,
          finalCalories: val * parseInt(this.state.quantities),
          failureModalError: "",
        });
      } else {
        this.setState({
          calories: text,
          finalCalories: val,
          failureModalError: "",
        });
      }
    }

  };

  updateCustomerMealPlan = () => {
    const { selectedDate, mealType } = this.props.navigation.state.params;
    const { userMealPlanData, itemDocumentID } = this.props;

    const selectedDateMealPlanData = userMealPlanData[selectedDate] || {};
    const selectedDateMealPlanDataFoodItems = pathOr(
      {},
      ["foodItems"],
      selectedDateMealPlanData
    );
    let mealTypeData = pathOr(
      [],
      ["foodItems", mealType],
      selectedDateMealPlanData
    );

    // update the existing item if in Edit view
    if (this.editView) {
      const mealData = pathOr(
        {},
        ["navigation", "state", "params", "mealData"],
        this.props
      );
      mealTypeData = mealTypeData.map(meal => {
        if (meal.id === mealData.id) {
          return {
            ...meal,
            quantity: this.state.quantities,
            foodItem: {
              ...this.SelectedItem,
              name: this.state.name,
              weight: this.state.weightValue,
              calories: this.state.finalCalories,
              image: {
                id: meal.id,
              },
              tags: [this.state.weightUnit || this.metaConstants.grams],
            },
          };
        }
        return meal;
      });
    } else {
      // contruct food item Obj
      let mealObj = {
        id: itemDocumentID,
        mealTime: moment().format("hh:mm A"),
        quantity: this.state.quantities,
        foodItem: {
          name: this.state.name,
          weight: this.state.weightValue,
          calories: this.state.finalCalories,
          image: {
            id: itemDocumentID,
          },
          tags: [this.state.weightUnit || this.metaConstants.grams],
        },
      };

      // push the new item to selected dates meal Type
      mealTypeData.push(mealObj);
    }

    // construct payload;
    const payload = {
      params: { mealPlanId: selectedDate },
      body: {
        foodItems: {
          ...selectedDateMealPlanDataFoodItems,
          [mealType]: mealTypeData,
        },
      },
    };

    this.props.updateCustomerMealPlan(payload);
    // this.setState({ showQuantityModal: false });
    // this.props.navigation.goBack();
  };

  // get the imageId from the fooditem API
  getFoodItemImageId = () => {
    const { name, calories, imageSource, weightValue, weightUnit } = this.state;
    // regex for numbers followed by string
    const regex = new RegExp("\\d[ ]*[a-zA-Z]*");
    if (
      name &&
      calories &&
      regex.test(this.state.weight) &&
      weightValue &&
      weightUnit
    ) {
      Keyboard.dismiss();
      // if in editView open the quantity modal
      if (this.editView) {
        if (Platform.OS == "ios") {
          this.setState({
            showAnalyzeFailureModal: false,
            showSucessModal: false,
          });
        } else {
          this.setState({
            showAnalyzeFailureModal: false,
            showSucessModal: false,
            showQuantityModal: true,
          });
        }
      } else {
        // get the date and meal type for the Addfooditem
        const { selectedDate, mealType } = this.props.navigation.state.params;

        // contruct payload
        const payload = {
          params: { toCallService: "False" },
          body: {
            name,
            calories,
            weight: weightValue,
            image: {
              content: imageSource,
            },
          },
        };

        // API
        this.props.addFoodItem(payload);
      }
    } else {
      // set error
      this.setState(() => ({
        failureModalError: this.metaConstants.errCrctDetails,
      }));
      // PruCustomAlert.show(this.metaConstants.errCrctDetails);
    }
  };

  // incremenet the quantity and calories
  incQuatity = () => {
    const { servingSizeList, selectedServingSize, selectedServingSizeUnit, calories } = this.state
    if (servingSizeList) {
      this.setState(prevState => ({
        weight: parseFloat(parseFloat(selectedServingSizeUnit.split(" ")[0]) * (prevState.quantities + 1)).toFixed(2),
        weightValue: parseFloat(parseFloat(selectedServingSizeUnit.split(" ")[0]) * (prevState.quantities + 1)),
        quantities: prevState.quantities + 1,
        finalCalories:
          parseFloat(parseFloat(calories * selectedServingSize).toFixed(2) * (prevState.quantities + 1))
      }));
    } else {
      this.setState(prevState => ({
        quantities: prevState.quantities + 1,
        finalCalories:
          parseFloat(prevState.finalCalories) + parseFloat(prevState.calories),
      }));
    }
  };

  // decrement the quantity and calories
  decQuantity = () => {
    if (this.state.quantities !== 1) {
      const { servingSizeList, selectedServingSize, calories } = this.state
      if (servingSizeList) {
        this.setState(prevState => ({
          weight: parseFloat(selectedServingSize * (prevState.quantities - 1)).toFixed(2),
          weightValue: parseFloat(selectedServingSize * (prevState.quantities - 1)),
          quantities: prevState.quantities - 1,
          finalCalories:
            parseFloat(parseFloat(calories * selectedServingSize).toFixed(2) * (prevState.quantities - 1))
        }));
      } else {
        this.setState(prevState => ({
          quantities: prevState.quantities - 1,
          finalCalories:
            parseFloat(prevState.finalCalories) - parseFloat(prevState.calories),
        }));
      }
    }
  };

  // share the post to the comunity group
  handleShareItem = () => {
    const { itemDocumentID } = this.props;
    // update the existing item if in Edit view
    const mealData = pathOr(
      {},
      ["navigation", "state", "params", "mealData"],
      this.props
    );

    const mealType = pathOr(
      {},
      ["navigation", "state", "params", "mealType"],
      this.props
    );

    // construct payload
    const payload = {
      params: { classification: "Community" },
      body: {
        mealPlan: {
          id: this.editView ? mealData.id : itemDocumentID,
          mealType,
        },
      },
    };
    this.props.getAllCustomerGroup(payload);
  };

  AnalyseFailureModal = () => {
    return (
      <Modal
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        isVisible={this.state.showAnalyzeFailureModal}
        // onBackdropPress={() => {
        //   this.showCamera();
        //   this.setState({ showAnalyzeFailureModal: false });
        // }}
        onModalHide={() => {
          this._showQuantityModal = true;
          //This function is invoked when the first modal is closed. Now here
          //set the state for the second Modal.
          this.setState({
            showQuantityModal: this._showQuantityModal,
          });
          console.log("Analysing Failure modal closed");
        }}
      >
        <View
          style={{
            marginHorizontal: 16,
            width: "100%",
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          {/* show loder */}
          {this.props.isAddFoodItemLoading && (
            <View
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                top: 0,
                left: 0,
                elevation: 10,
                opacity: 0.5,
                backgroundColor: "white",
                height: "100%",
                width: "100%",
                zIndex: 99999,
              }}
            >
              <ActivityIndicator color="#ec1c2e" size="large" />
            </View>
          )}

          <View style={styles.headerView}>
            <Text style={styles.recogniseText}>
              {this.metaConstants.notRecognize}
            </Text>
          </View>
          <View style={styles.middleView}>
            {/* <View
              style={{
                ...styles.AvacadoView,
                overflow: "hidden",
              }}
            >
              <Image
                source={{
                  uri: `data:image/gif;base64,${this.state.imageSource}`,
                }}
                resizeMode={"stretch"}
                style={{
                  flex: 1,
                }}
              ></Image>
            </View> */}
            <View
              style={{
                marginHorizontal: 16,
                width: "100%",
              }}
            >
              {/* Name field */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: `data:image/gif;base64,${this.state.imageSource}`,
                  }}
                  resizeMode={"stretch"}
                  style={{
                    height: 55,
                    width: 55,
                    borderRadius: 8,
                  }}
                ></Image>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#cccccc",
                    flex: 1,
                    marginLeft: 16,
                  }}
                >
                  <Text style={{ fontColor: "#000", fontSize: 12 }}>
                    {this.metaConstants.addMealNameTitle}
                  </Text>
                  <TextInput
                    style={styles.nameInput}
                    placeholder={this.metaConstants.itemName}
                    keyboardType={"default"}
                    onChangeText={text => {
                      this.handleNameChange(text);
                    }}
                    value={this.state.name}
                    maxLength={25}
                  />
                </View>
              </View>

              {/* Calories field */}
              <View style={{ marginTop: 5 }}>
                <Text style={{ fontColor: "#000", fontSize: 12 }}>
                  {this.metaConstants.addMealCaloriesTitle}
                </Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder={this.metaConstants.calories}
                  keyboardType={"numeric"}
                  onChangeText={text => {
                    this.handleCaloriesChange(text);
                  }}
                  value={this.state.calories.toString()}
                  maxLength={8}
                />
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#cccccc",
                  }}
                >
                </View>
              </View>
              {/* Weight field */}
              <View style={{marginTop: 5}}>
              <Text style={{ fontColor: "#000", fontSize: 12 }}>
                {this.metaConstants.addMealWeightTitle}
              </Text>
              
                <TextInput
                  style={styles.nameInput}
                  placeholder={this.metaConstants.servngSize}
                  onChangeText={text => {
                    this.handleWeightChange(text);
                  }}
                  value={this.state.weight}
                  maxLength={15}
                />
                <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: "#cccccc",
                }}
              >
              </View>
              </View>

              {/* Error Text */}
              <Text
                style={{
                  color: "#ec1c2e",
                  fontSize: 12,
                  marginTop: 8,
                }}
              >
                {this.state.failureModalError}
              </Text>
            </View>
          </View>
          <View style={styles.tryView}>
            <PruRoundedButton
              onPress={this.getFoodItemImageId}
              buttonTitle={this.metaConstants.continue}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState(() => ({ showQuantityModal: false }));
            this.props.navigation.goBack();
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <ImageBackground
            source={PULSE_FOOD_CLOSE_CIRCLE}
            style={{ width: 50, height: 50 }}
          >
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                marginTop: 6,
                color: "#ea1b2d",
              }}
            >
              X
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </Modal>
    );
  };

  onServingSizeChange = (servesize) => {
    console.log('selectedServingSize::', servesize)
    const { servingSizeList, quantities, calories } = this.state

    Object.keys(servingSizeList).map((key, i) => {
      if (key == servesize) {
        this.setState(() => ({
          selectedServingSize: servingSizeList[key],
          selectedServingSizeUnit: key,
          weight: parseFloat(parseFloat(key.split(" ")[0]) * quantities).toFixed(2),
          weightValue: parseFloat(parseFloat(key.split(" ")[0]) * quantities),
          weightUnit: key.substring(key.indexOf(" ")),
          finalCalories: parseFloat(parseFloat(calories * servingSizeList[key]).toFixed(2) * quantities)
        }))
      }
    })
  }

  prepareServingSizePicker = () => {
    const { servingSizeList } = this.state;
    let mappedServingList = Object.keys(servingSizeList).map(key => {
      return {
        label: key,
        value: key,
      };
    });

    return (
      <PruDropdownComponent
        selectedValueCB={this.onServingSizeChange}
        selectedOption={this.state.selectedServingSizeUnit}
        options={mappedServingList}
        enabled={true}
      ></PruDropdownComponent>
    );
  };

  quantityModal = () => {
    console.log('SeringSize list:', this.state.servingSizeList)
    const { servingSizeList, calories, selectedServingSize, selectedServingSizeUnit } = this.state;

    return (
      <Modal
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        isVisible={this.state.showQuantityModal}
      // onBackdropPress={() => {
      //   this.showCamera();
      //   this.setState({ showQuantityModal: false });
      // }}
      >
        <View
          style={{
            marginHorizontal: 16,
            width: "100%",
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          {/* show loder */}
          {(this.props.isUpdateCustomerMealPlanLoading ||
            this.props.isCreatePostLoading) && (
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: 0,
                  left: 0,
                  elevation: 10,
                  opacity: 0.5,
                  backgroundColor: "white",
                  height: "100%",
                  width: "100%",
                  zIndex: 99999,
                }}
              >
                <ActivityIndicator color="#ec1c2e" size="large" />
              </View>
            )}

          <View style={styles.headerView}>
            <Text style={styles.recogniseText}>
              {this.metaConstants.addQuantity}
            </Text>
            {/* <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={this.handleShareItem}
            >
              <Image
                style={{ height: 16, width: 16 }}
                source={PULSE_FOOD_SHARE_ICON}
              ></Image>
              <Text style={{ color: "#707070", fontSize: 12, marginLeft: 8 }}>
                {this.metaConstants.share}
              </Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.middleView}>
            <View style={styles.AvacadoView}>
              <Image
                source={{
                  uri: `data:image/gif;base64,${this.state.imageSource}`,
                }}
                resizeMode={"stretch"}
                style={{
                  height: 150,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              ></Image>
              <View style={styles.whiteView}>
                <Text style={{ color: "#2a2a2a" }}>{this.state.name}</Text>
                <Text style={{ fontSize: 12, color: "#808080" }}>
                  {parseFloat(this.state.finalCalories).toFixed(2)} {this.metaConstants.kcal}
                </Text>
              </View>
            </View>
            <View style={styles.servingView}>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  disabled={parseInt(this.state.quantities) === 1}
                  onPress={this.decQuantity}
                  style={{
                    height: 40,
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    width: 40,
                    backgroundColor: parseInt(this.state.quantities) === 1 ? "#f5939b" : "#ec1c2e",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "white" }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "white",
                    height: 40,
                    width: 80,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: "#ec1c2e",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    {this.state.quantities}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={this.incQuatity}
                  style={{
                    height: 40,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    width: 40,
                    alignItems: "center",
                    backgroundColor: "#ec1c2e",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "white" }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ textAlign: "center", color: "#3b3b3b" }}>
                  {this.metaConstants.servingsHdr}
                </Text>
                {
                  servingSizeList ?
                    <View style={{ width: 180, paddingTop: 10 }}>
                      {
                        Platform.OS == 'ios' ?
                          <Text style={{
                            color: "#000", fontSize: 12,
                            position: 'absolute',
                            top: 10,
                          }}>
                            {selectedServingSizeUnit}
                          </Text>
                          : null
                      }
                      {this.prepareServingSizePicker()}
                      {/* <Text style={{
                          color: "#000", fontSize: 12,
                      }}>
                         {selectedServingSizeUnit} = {parseFloat(calories * selectedServingSize).toFixed(2)}
                         {this.metaConstants.kcal}
                      </Text> */}
                    </View>
                    :
                    <Text style={{ color: "#808080", fontSize: 12 }}>
                      1 {this.metaConstants.servings} = {this.state.weightValue}{" "}
                      {this.state.weightUnit}
                    </Text>
                }
              </View>
            </View>
          </View>
          <View style={styles.tryView}>
            <PruRoundedButton
              onPress={this.updateCustomerMealPlan}
              buttonTitle={this.metaConstants.continue}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState(() => ({ showQuantityModal: false }));
            this.props.navigation.goBack();
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <ImageBackground
            source={PULSE_FOOD_CLOSE_CIRCLE}
            style={{ width: 50, height: 50 }}
          >
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                marginTop: 6,
                color: "#ea1b2d",
              }}
            >
              X
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </Modal>
    );
  };

  AnalyseSuccessModal = () => {
    const { scanFoodResponse } = this.props;
    const foodItems = pathOr(
      {},
      ["mealPlan", "caloriemama", "foodItems"],
      scanFoodResponse
    );
    let mealItems;
    Object.keys(foodItems).map((key, i) => {
      mealItems = foodItems[key] || [];
    });

    const headerText = `${this.metaConstants.sucess} ${
      this.props.isScanFoodItemError || Object.keys(foodItems).length === 0
        ? this.metaConstants.noMatch
        : Object.keys(foodItems).length === 1 && mealItems.length === 1
          ? this.metaConstants.perfectMatch
          : this.metaConstants.moreMatch
      } `;

    return (
      <Modal
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        isVisible={this.state.showSucessModal}
        // onBackdropPress={() => {

        //   this.setState(() => ({
        //     showSucessModal
        //   }), () => {
        //     this.props.navigation.goBack()
        //   });

        // }}
        onModalHide={() => {
          if (!this.closeSuccessModal) {
            //This function is invoked when the first modal is closed. Now here
            //set the state for the second Modal.
            this.setState({
              showQuantityModal: this._showQuantityModal,
              showAnalyzeFailureModal: this._showAnalyzeFailureModal,
            });
            console.log("Analysis Success modal closed");
          }
        }}
      >
        <View
          style={{
            width: "100%",
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          {/* show loder */}
          {this.props.isAddFoodItemLoading && (
            <View
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                top: 0,
                left: 0,
                elevation: 10,
                opacity: 0.5,
                backgroundColor: "white",
                height: "100%",
                width: "100%",
                flex: 1,
                zIndex: 99999,
              }}
            >
              <ActivityIndicator color="#ec1c2e" size="large" />
            </View>
          )}

          <View style={{ backgroundColor: "#ffc2c8", padding: 16 }}>
            <Text style={{ fontSize: 12, color: "#4e5571" }}>{headerText}</Text>
          </View>

          {this.props.isScanFoodItemError ||
            Object.keys(foodItems).length === 0 ? (
              // FAILURE CASE
              <View style={{ padding: 16 }}>
                <Text style={{ color: "#4d4d4d" }}>
                  {this.metaConstants.scanAgain}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PruRoundedButton onPress={() => {
                    if (Platform.OS == "ios") {
                      this._showAnalyzeFailureModal = true;
                      this._showQuantityModal = false;
                      this.setState(() => ({
                        showSucessModal: false,
                      }));
                    } else {
                      this._showAnalyzeFailureModal = true;
                      this.setState(() => ({
                        showSucessModal: false,
                        showAnalyzeFailureModal: true,
                      }));
                    }
                  }} buttonTitle={this.metaConstants.add} />
                </View>
              </View>
            ) : (Object.keys(foodItems).length === 1 && mealItems.length === 1)
              ? (
                <>
                  <View
                    style={{
                      elevation: 3,
                      // ios elevation
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      borderRadius: 10,
                      backgroundColor: "#fff",
                      margin: 16,
                      padding: 8,
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      style={{ height: 55, width: 55 }}
                      source={{
                        uri: `data:image/gif;base64,${this.state.imageSource}`,
                      }}
                    ></Image>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={{ color: "#4e5571", fontWeight: "700" }}>
                        {pathOr("", ["foodItem", "name"], mealItems[0])}
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        {(
                          //Direct Calories From backend
                          //  parseFloat(pathOr(0, ["foodItem", "calories"], mealItems[0])).toFixed(2)

                          //App Calcuate Calories
                          parseFloat(
                            pathOr(0, ["foodItem", "calories"], mealItems[0])
                            *
                            pathOr(1, ["foodItem", "servingSizes",
                              keys(pathOr(
                                {},
                                ["foodItem", "servingSizes"], mealItems[0]))[0]],
                              mealItems[0]
                            )
                          ).toFixed(2)

                        )}{" "}
                        {this.metaConstants.kcal}
                      </Text>
                    </View>

                  </View>

                  {/* add manually btn */}
                  <View style={{
                    marginBottom: 16,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (Platform.OS == "ios") {
                          this._showAnalyzeFailureModal = true;
                          this._showQuantityModal = false;
                          this.setState(() => ({
                            showSucessModal: false,
                          }));
                        } else {
                          this._showAnalyzeFailureModal = true;
                          this.setState(() => ({
                            showSucessModal: false,
                            showAnalyzeFailureModal: true,
                          }));
                        }
                      }}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 10,
                        elevation: 3,
                        // ios elevation
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#fff"
                      }}
                    >
                      <Text
                        style={{
                          color: "#4e5571",
                          borderWidth: 1,
                          borderColor: "#4e5571",
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          fontWeight: "700",
                        }}
                      >
                        +
                  </Text>
                      <Text
                        style={{
                          color: "#4e5571",
                          fontWeight: "700",
                          marginLeft: 8,
                        }}
                      >
                        Add Manually
                  </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ alignItems: "center", marginBottom: 16 }}>
                    <PruRoundedButton
                      onPress={() => {
                        const item = mealItems[0];
                        const name = pathOr("", ["foodItem", "name"], mealItems[0]);
                        //Direct Calories from backend
                        // let calories = pathOr(0, ["foodItem", "calories"], mealItems[0]);

                        //App calculate calories
                        let calories = pathOr(100, ["foodItem", "calories"], mealItems[0]);
                        let defaultServingUnit = keys(pathOr({}, ["foodItem", "servingSizes"], mealItems[0]))[0]
                        let defaultServeWeight = defaultServingUnit && defaultServingUnit.split(' ')[0]
                        let defaultUnit = defaultServingUnit && defaultServingUnit.substring(defaultServingUnit.indexOf(' '))
                        const servingSize = pathOr(1, ["foodItem", "servingSizes",
                          defaultServingUnit
                        ], mealItems[0]);
                        let calcalories = calories * servingSize;

                        this.SelectedItem = item.foodItem;
                        const payload = {
                          params: { toCallService: "False" },
                          body: {
                            ...item.foodItem,
                            image: {
                              content: this.state.imageSource,
                            },
                          },
                        };
                        this.props.addFoodItem(payload);
                        this.setState(() => ({
                          name,
                          calories: parseFloat(calories).toFixed(2),
                          finalCalories: parseFloat(calcalories).toFixed(2),
                          weight: defaultServingUnit && (defaultServeWeight + defaultUnit),
                          weightValue: defaultServingUnit && parseFloat(defaultServeWeight),
                          weightUnit: this.metaConstants.grams,
                          selectedServingSize: servingSize,
                        }));
                      }}
                      buttonTitle={this.metaConstants.continue}
                    />
                  </View>
                </>
              ) : (
                // SUCCESS CASE
                <>
                  <ScrollView
                    style={{ maxHeight: 270, paddingTop: 16, marginHorizontal: 16 }}
                  >
                    {Object.keys(foodItems).map((key, i) => {
                      const mealItems = foodItems[key] || [];
                      return mealItems.map((item, j) => {
                        if (
                          j <
                          parseInt(
                            this.metaConstants.maxItemToDisplayFromEachCategory
                          )
                        ) {
                          const name = pathOr("", ["foodItem", "name"], item);
                          //Direct calories from backend 
                          // let calories = pathOr(0,["foodItem", "calories"],item);

                          //App Calculate Calories
                          let calories = pathOr(100, ["foodItem", "calories"], item);
                          let servingSizeList = pathOr(null, ["foodItem", "servingSizes"], item)
                          let defaultServingUnit = keys(pathOr({}, ["foodItem", "servingSizes"], item))[0]
                          let defaultServeWeight = defaultServingUnit && defaultServingUnit.split(' ')[0]
                          let defaultUnit = defaultServingUnit && defaultServingUnit.substring(defaultServingUnit.indexOf(' '))

                          const servingSize = pathOr(1, ["foodItem", "servingSizes", defaultServingUnit], item)
                          let calcalories = calories * servingSize
                          return (
                            <>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <View>
                                  <Text
                                    style={{ color: "#4e5571", fontWeight: "bold" }}
                                  >
                                    {name}
                                  </Text>

                                  <Text
                                    style={{
                                      color: "#4e5571",
                                      fontSize: 12,
                                      marginTop: 10,
                                    }}
                                  >
                                    {parseFloat(calcalories).toFixed(2)} {this.metaConstants.kcal}
                                  </Text>
                                </View>
                                <View>
                                  <PruRoundedButton
                                    onPress={() => {
                                      this.SelectedItem = item.foodItem;
                                      const payload = {
                                        params: { toCallService: "False" },
                                        body: {
                                          ...item.foodItem,
                                          image: {
                                            content: this.state.imageSource,
                                          },
                                        },
                                      };
                                      this.props.addFoodItem(payload);
                                      this.setState(() => ({
                                        name,
                                        calories: parseFloat(calories).toFixed(2),
                                        finalCalories: parseFloat(calcalories).toFixed(
                                          2
                                        ),
                                        weight: defaultServingUnit || "100 g",
                                        weightValue: (defaultServingUnit && parseFloat(defaultServeWeight)) || 100,
                                        weightUnit: (defaultServingUnit && defaultUnit) || "g",
                                        servingSizeList: servingSizeList,
                                        selectedServingSizeUnit: defaultServingUnit || "100 g",
                                        item: item
                                      }));
                                    }}
                                    style={{ width: 105 }}
                                    buttonTitle={"Select"}
                                  />
                                </View>
                              </View>

                              {/* DIVIDER */}
                              <View
                                style={{
                                  color: "#d1baba",
                                  marginVertical: 16,
                                  borderWidth: 0.2,
                                }}
                              ></View>
                            </>
                          );
                        }
                      });
                    })}
                  </ScrollView>

                  {/* Unable to find Btn */}
                  <TouchableOpacity
                    onPress={() => {
                      if (Platform.OS == "ios") {
                        this._showAnalyzeFailureModal = true;
                        this._showQuantityModal = false;
                        this.setState(() => ({
                          showSucessModal: false,
                        }));
                      } else {
                        this._showAnalyzeFailureModal = true;
                        this.setState(() => ({
                          showSucessModal: false,
                          showAnalyzeFailureModal: true,
                        }));
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: "#ea1b2d",
                        marginVertical: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {this.metaConstants.unableToFind}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
        </View>
        <TouchableOpacity
          onPress={() => {
            this.closeSuccessModal = true;
            this.setState({ showSucessModal: false }, () => {
              this.props.navigation.goBack();
            });
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <ImageBackground
            source={PULSE_FOOD_CLOSE_CIRCLE}
            style={{ width: 50, height: 50 }}
          >
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                marginTop: 6,
                color: "#ea1b2d",
              }}
            >
              X
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </Modal>
    );
  };

  renderAnalysingModel = () => {
    return (
      <Modal
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        isVisible={this.state.showAnalyzingModal}
        // onBackdropPress={() => {
        //   this.showCamera();
        //   this.setState({ showAnalyzeFailureModal: false });
        // }}
        onModalHide={() => {
          //This function is invoked when the first modal is closed. Now here
          //set the state for the second Modal.
          this.setState({
            showSucessModal: this._showSucessModal,
            showQuantityModal: this._showQuantityModal,
            showAnalyzeFailureModal: this._showAnalyzeFailureModal,
          });
          console.log("Analysing modal closed");
        }}
      >
        <View
          style={{
            marginHorizontal: 16,
            width: "100%",
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
        >
          <View style={styles.headerView}>
            <Text
              style={{ ...styles.recogniseText, textAlign: "center", flex: 1 }}
            >
              {this.metaConstants.analyseImage}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <ActivityIndicator color="#ec1c2e" size="large" />
          </View>
        </View>
      </Modal>
    );
  };

  showCamera = () => {
    if (this.isCameraOpen) return;
    const cameraPermission = metaLabelFinder(
      "manageprofile",
      "cameraPermission"
    );

    this.isCameraOpen = true;

    ImagePicker.openCamera({
      width: 200,
      height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      includeBase64: true,
      useFrontCamera: true,
      compressImageQuality: 0.8,
      photo: "photo",
    })
      .then(image => {
        this.isCameraOpen = false;
        this.setState({ showAnalyzingModal: true });
        this.setState({ imageSource: image.data });
        const payload = {
          body: {
            image: {
              content: image.data,
            },
          },
        };
        this.props.scanFoodItem(payload);
      })
      .catch(error => {
        this.isCameraOpen = false;
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          PruCustomAlert.show(
            "",
            cameraPermission,
            {
              positiveText: this.metaConstants.ok,
              onPositivePress: () => {
                OpenSettings.openSettings();
              },
            },
            {
              negativeText: this.metaConstants.cancel,
              onNegativePress: () => { },
            }
          );
        }
      });
  };

  render() {
    console.log("dhuwhdustate", this.state);
    return (
      <>
        <PruBackHeader title={this.metaConstants.scan}></PruBackHeader>

        <ImageBackground
          style={{ flex: 1 }}
          resizeMode={"cover"}
          source={{
            uri: `data:image/gif;base64,${this.state.imageSource}`,
          }}
        >
          {this.AnalyseSuccessModal()}
          {this.AnalyseFailureModal()}
          {this.quantityModal()}
          {this.renderAnalysingModel()}
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userMealPlanData: state.pulsefood.userMealPlanData,
    isScanFoodItemLoading: state.pulsefood.isScanFoodItemLoading,
    isScanFoodItemError: state.pulsefood.isScanFoodItemError,
    isAddFoodItemLoading: state.pulsefood.isAddFoodItemLoading,
    isAddFoodItemError: state.pulsefood.isAddFoodItemError,
    itemDocumentID: state.pulsefood.itemDocumentID,
    isUpdateCustomerMealPlanLoading:
      state.pulsefood.isUpdateCustomerMealPlanLoading,
    isUpdateCustomerMealPlanError:
      state.pulsefood.isUpdateCustomerMealPlanError,
    scanFoodResponse: state.pulsefood.scanFoodResponse,
    isCreatePostLoading: state.pulsefood.isCreatePostLoading,
    isCreatePostError: state.pulsefood.isCreatePostError,
  };
};

export default connect(mapStateToProps, {
  addFoodItem,
  scanFoodItem,
  updateCustomerMealPlan,
  getAllCustomerGroup,
})(PulseFoodDetect);
