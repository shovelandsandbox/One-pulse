import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { connect } from "react-redux";

import styles from "./styles";
import PruRagIndicator from "../../components/PruRagIndicator";
import { Theme } from "../../themes";
const { Styles, Colors } = Theme;
import {
  events,
  CoreActionTypes
} from "@pru-rt-internal/pulse-common";
import PruDropdownComponent from "../../components/PruDropdown";
import { dispatchEvent } from "../../actions";
import _ from "lodash";
import { makeTouchable } from "../../hocs";
const TouchableView = makeTouchable(View);
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MetaConstants from "./meta";

class BMIReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 20,
      gender: "",
      weight: {
        kgValue: 75,
        poundValue: 160
      },
      height: {
        cmValue: 175,
        footValue: 5,
        inchesValue: 5
      }
    }
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    this.initBMIValues();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userLanguagePreference !== nextProps.userLanguagePreference
    ) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  initBMIValues = () => {
    const { BMIResponse } = this.props;
    console.log(BMIResponse);
    this.setState({
      BMIDesc: BMIResponse.attributes.bmi,
      BMIValue: _.floor(BMIResponse.attributes.bmi_value),
      age: BMIResponse.attributes.age,
      gender: BMIResponse.attributes.gender,
      wrinkles: BMIResponse.attributes.wrinkle,
      height: 100,
      heightUnit: "cm",
      weight: 50,
      weightUnit: "kgs",
      formDirty: false,
    });
  }

  onAgeSelection = selectedAge => {
    this.setState({ age: selectedAge });
  };

  prepareAgePicker = () => {
    const ageList = [...Array(100).keys()];
    const mappedAgeList = ageList.map(ageItem => {
      return {
        label: `${ageItem}`,
        value: ageItem
      };
    });
    return (
      <PruDropdownComponent
        selectedValueCB={this.onAgeSelection}
        selectedOption={this.state.age}
        options={mappedAgeList}
      ></PruDropdownComponent>
    );
  };

  onGenderSelection = selectedGender => {
    this.setState({ gender: selectedGender });
  };

  prepareGenderPicker = () => {
    const genderList = [
      {label: this.metaConstants.bmiResultsMaleLabel, value: "MALE"},
      {label: this.metaConstants.bmiResultsFemaleLabel, value: "FEMALE"}
    ];
    const mappedGenderList = genderList.map(genderItem => {
      return {
        label: genderItem.label,
        value: genderItem.value
      };
    });
    return (
      <PruDropdownComponent
        selectedValueCB={this.onGenderSelection}
        selectedOption={this.state.gender}
        options={mappedGenderList}
      ></PruDropdownComponent>
    );
  };

  checkValueFetchRangeColor = (value) => {
    return _.inRange(value, 0, 25) ? Colors.green :
            _.inRange(value, 25, 30) ? Colors.blue : 
            _.inRange(value, 30, 39) ? Colors.amber : Colors.red; 
  }

  prepareShareButton = () => {
    return (
      <TouchableView
        event={events.ShareBMI}
        onPress={this.onPress}
        style={styles.shareButtonStyle}>
          <MaterialIcons
            style={{marginHorizontal: 5}}
            name="share"
            size={18}
            color="white"
          />
          <Text style={{color: Colors.white, fontSize: 17}}>
            {this.metaConstants.bmiResultsShareLabel}
          </Text>
      </TouchableView>
    );
  }

  onPress = () => {}

  render() {
    const value = this.state.BMIValue;
    const colorRanges = [
      { range: 25, color: Colors.green },
      { range: 5, color: Colors.blue },
      { range: 9, color: Colors.amber },
      { range: 11, color: Colors.red }
    ];
    const range = [...Array(50).keys()];
    const numberColor =  this.checkValueFetchRangeColor(value);
    return (
      <View style={[styles.container, { alignItems: "center" }]}>
        <Text style={[Styles.contentView, Styles.screenHeader]}>
          {this.metaConstants.bmiResultsYourResultLabel}
        </Text>
        <View style={[styles.bmiNumberDisplayContainer, {backgroundColor: numberColor}]}>
          <Text style={{ fontSize: 20, color: Colors.white }}>{value}</Text>
        </View>
        <View style={{ height: 10 }}>
        </View>
        <PruRagIndicator
          value={value}
          range={range}
          colorRanges={colorRanges}
        ></PruRagIndicator>
        <View style={{ height: 30 }}>
        </View>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderTitle}>
            <Text style={styles.cardHeaderTitleText}>
              {this.metaConstants.bmiResultsGotRightLabel}
            </Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardContentTitleText}>
            {this.metaConstants.bmiResultsNormalBmiLabel}
          </Text>
          <View style={styles.bmiResultsContent}>
            <View style={styles.bmiResultLine}>
              <Text style={styles.bmiResultLineLabel}>
                {this.metaConstants.bmiResultsAgeLabel}
              </Text>
              <View style={{ flex: 1 }}>
                {this.prepareAgePicker()}
              </View>
              <View style={{flex: 1}}></View>
            </View>
            <View style={styles.bmiResultLine}>
              <Text style={styles.bmiResultLineLabel}>
                {this.metaConstants.bmiResultsGenderLabel}
              </Text>
              <View style={{ flex: 1 }}>
                { this.prepareGenderPicker() }
              </View>
              <View style={{flex: 1}}></View>
            </View>
            <View style={styles.bmiResultLine}>
              <Text style={styles.bmiResultLineLabel}>
                {this.metaConstants.bmiResultsHeightLabel}
              </Text>
              <View style={{ flex: 2 }}>
                <View style={styles.heightTextContainer}>
                  <View>
                    <TextInput editable={true}
                      style={styles.inputTextStyle}
                      value="5'"/>
                  </View>
                  <View style={{width: 15}}></View>
                  <View>
                    <TextInput editable={true}
                      style={styles.inputTextStyle}
                      value={`5"`}/>
                  </View>
                  <View style={{width: 10}}></View>
                  <View style={styles.actionableInActiveContainer}>
                    <Text style={styles.actionActionInActiveText}>
                      {this.metaConstants.bmiResultsCmLabel}
                    </Text>
                  </View>
                  <View style={{width: 5}}></View>
                  <View style={styles.actionableActiveContainer}>
                    <Text style={styles.actionActionActiveText}>
                      {this.metaConstants.bmiResultsFtLabel}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.bmiResultLine}>
              <Text style={styles.bmiResultLineLabel}>
                {this.metaConstants.bmiResultsWeightLabel}
              </Text>
              <View style={{ flex: 2 }}>
                <View style={styles.weightContainer}>
                  <View>
                    <TextInput editable={true}
                      style={styles.inputWeightStyle}
                      value={"75"}/>
                  </View>
                  <View style={{width: 25}}></View>
                  <View style={styles.actionableActiveContainer}>
                    <Text style={styles.actionActionActiveText}>
                      {this.metaConstants.bmiResultsKgsLabel}
                    </Text>
                  </View>
                  <View style={{width: 5}}></View>
                  <View style={styles.actionableInActiveContainer}>
                    <Text style={styles.actionActionInActiveText}>
                      {this.metaConstants.bmiResultsLbLabel}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1.4, flexDirection: "row", justifyContent: "center" }}>
            {this.prepareShareButton()}
          </View>
        </View>
      </View>
    )
  }

}

const mapStateToProps = state => ({
  meta: state.meta,
  language: state.userPreferences.language,
  sessionId: state.auth.token,
  bmiFeedbackLoading: state.bmi.feedbackLoading,
  bmiFeedbackData: state.bmi.successFeedbackData,
  bmiImageData: state.bmi.bmiImage,
  facialToken: state.bmi.facialToken,
  BMIResponse: state.bmi.BMIResponse,
  languageSelected: state.userPreferences.language,
  isBMIFeedbackCall: state.bmi.isFeedbackCall,
  userLanguagePreference: state.userPreferences.language
});

export default connect(mapStateToProps, {
  BMIFeedback: (sessionId, data) => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.KEY_BMI_FEEDBACK,
    payload: {
      sessionId,
      data: data,
      bmiFeedbackCall: true
    }
  }),
  UpdateBMI: data => ({
    type: CoreActionTypes.ESTIMATE_BMI_SUCCESS,
    payload: {
      bmiRequest: data,
      bmiResponse: data,
      isFeedbackCall: true
    }
  }),
  dispatchEvent
})(BMIReport);