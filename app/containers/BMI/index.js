import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from "react-redux";
import {pathOr} from "ramda";
import { Theme } from "../../themes";
const { Styles, Colors, Fonts } = Theme;
import {
    events,
    CoreActionTypes
} from "@pru-rt-internal/pulse-common";
import _ from "lodash";
import { makeTouchable } from "../../hocs";
const TouchableView = makeTouchable(View);
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import MetaConstants from "./meta";
import BmiWrinkleResult from "../../components/BmiWrinkleResult";
class BMIResults extends React.Component {
    constructor(props) {
        super(props);
        this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.userLanguagePreference !== nextProps.userLanguagePreference
        ) {
            this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
        }
    }

    componentDidMount() {
        this.initBMIValues();
    }

    initBMIValues = () => {
    const { BMIResponse } = this.props;
    const wrinkles = pathOr(
      0,
      ["BMIResponse", "lifestyle", "attributes", "wrinkle"],
      this.props
    );

    this.setState({
      BMIDesc: BMIResponse.lifestyle.bmiDesc,
      BMIValue: _.floor(BMIResponse.lifestyle.bmi),
      age: BMIResponse.lifestyle.ageNextBday,
      //gender: BMIResponse.sex,
      wrinkles,
      height: 100,
      heightUnit: "cm",
      weight: 50,
      weightUnit: "kgs",
      formDirty: false
    });
  };
    prepareShareButton = () => {
        return (
            <TouchableView
                event={events.ShareBMI}
                onPress={this.onPress}
                style={styles.shareButtonStyle}>
                <MaterialIcons
                    style={{ marginHorizontal: 5 }}
                    name="share"
                    size={18}
                    color="white"
                />
                <Text style={{ color: Colors.white, fontSize: 17 }}>
                    Share
                    {/* {this.metaConstants.wrinkleIdxResultsShare} */}
                </Text>
            </TouchableView>
        );
    }

    viewMoreTipsButton = () => {
        return (
            <TouchableView
                event={events.ShareBMI}
                onPress={this.onPress}
                style={styles.viewMoreTipsButton}>
                <Text style={styles.vieMoreTipsText}>
                    {this.metaConstants.wrinkleIdxResultsViewMoreLabel}
                </Text>
            </TouchableView>
        );
    }

    getBMIColor() {
      if (this.state.BMIValue < 18.5) {
        return "#D97777";
      } else if (this.state.BMIValue < 25) {
        return "#77D97B";
      } else if (this.state.BMIValue < 30) {
        return "#D9BF77";
      } else {
        return "#E9526B";
      }
    }

    renderGuideLine(){
      const guidelineTitle = this.metaConstants.bmiIndexGuideLabel;
      const valueTitle = this.metaConstants.bmiValueLabel;
      const descriptionTitle = this.metaConstants.descriptionLabel;
      const indexArray  = [
        this.metaConstants.lessThanEighteenPointFiveLabel,
        this.metaConstants.eighteenPointFiveToTwentyFiveLabel,
        this.metaConstants.fromTwentyFiveTOThirtyLabel,
        this.metaConstants.overThirtyLabel
      ];
      const descriptionArray = [
        this.metaConstants.bmiUnderWeightLabel,
        this.metaConstants.bmiNormalLabel,
        this.metaConstants.bmiOverWeightLabel,
        this.metaConstants.bmiObeseLabel
      ];
      return(
          <View style = {{margin:30, flex: 1}}>
              <Text style = {{fontSize:12, textDecorationLine: "underline"}}>
                  {guidelineTitle}
              </Text>
              <View style = {{marginTop: 20, flexDirection:"row"}}>
              <View style = {{flex : 3}}>
              <Text style = {{fontSize:12, lineHeight:18}}>
                  {valueTitle}
              </Text>
              {
                indexArray.map((item) => (
                    <Text style = {{fontSize:12, lineHeight:18,  fontWeight: "500"}}>
                       {item}
                    </Text>
                ))
              }
              </View>
              <View style= {{width:1, backgroundColor: "#878786"}}></View>
              <View style = {{flex : 6.9, marginLeft : 15}}>
              <Text style = {{fontSize:12, lineHeight:18}}>
                 {descriptionTitle}
              </Text>
              {
                descriptionArray.map((item) => (
                    <Text style = {{fontSize:12, lineHeight:18,  fontWeight: "500"}}>
                       {item}
                    </Text>
                ))
              }
              </View>
              </View>    
          </View>
      );
  }

    render() {
      const {attributes, ageNextBday} = this.props.BMIResponse.lifestyle;
        return (
          <ScrollView>
            <View style={[styles.container, { alignItems: "center", justifyContent: "center", }]}>
                <BmiWrinkleResult
                 imageUrl = {{uri: `data:image/png;base64,${this.props.bmiImageData}`}}
                 result = { this.state.BMIValue }
                 status = {this.state.BMIDesc}
                 age = {ageNextBday}
                 resultHeading= {this.metaConstants.bmiLabel}
                 statusHeading = {this.metaConstants.classificationLabel}
                 ageHeading = {this.metaConstants.ageLabel}
                 color = {this.getBMIColor()}
                 />
            </View>
            <View style={{ flex: 1 }}>
               {this.renderGuideLine()}
            </View>
          </ScrollView>
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
    })
})(BMIResults);