import React, { Component } from "react";
import {
  View,
  FlatList,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import * as HalodocActions from '../../configs/actionNames'
import { screenNames } from '../../configs/screenNames'
import {
  SEARCH_ICON,
} from "../../../../config/images";
import styles from "./styles";
import {
  events
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "../../../../actions";
import HaloDocActionBar from "../../components/actionBar";
import {
  setConsultationDocObject,
  getFilteredDocList,
  goToSearchScreen,
  gotoDocInfoScreenfromListScreen
} from "../../actions"
import DocList from '../../components/DocList'
import Header from '../../components/Header'

class HalodocDoctorListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: null,
      filteredDocList: [],
    };
  }

  getFilteredDoctors = () => {
    const { specializationCategoryId } = this.props;
    this.setState({ isLoading: true, isError: null });
    this.props.getFilteredDocList(specializationCategoryId);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isError: nextProps.docFilterListError,
      isLoading: false,
      filteredDocList: nextProps.filteredDocList,
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPress);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPress);
    this.getFilteredDoctors();
  }

  backPress = () => {
    this.props.goBack();
    return true;
  };

  showWaitingScreen = item => {
    this.props.setConsultationDocObject(item);
    this.props.gotoDocInfoScreenfromListScreen(
      this.props.coronaAssessment?.coronaRiskFactor,
      this.props.coronaAssessment?.category
    );
  };

  onGoBack = () => {
    this.props.goBack();
    this.props.dispatchEvent(events.DocListBackArrowClick);
    return true;
  };


  render() {
    const {
      specializationCategoryType,
      specializationCategoryImage,
    } = this.props;
    return (
      <View style={styles.container}>
        <HaloDocActionBar
          onMenuIcon2Click={() => this.props.goToSearchScreen()}
          onGoBack={() => this.onGoBack()}
          menuIcon2={SEARCH_ICON}
        ></HaloDocActionBar>

        <Header
          type={specializationCategoryType}
          image={specializationCategoryImage}
        />
        <FlatList
          style={styles.listStyle}
          data={this.state.filteredDocList}
          renderItem={({ item }) => (
            <DocList
              item={item}
              type={specializationCategoryType}
              navigation={this.props.navigation}
              showWaitingScreen={this.showWaitingScreen}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    meta: state.meta,
    filteredDocList: state.haloDocServices.filteredDocList,
    docFilterListError: state.haloDocServices.docFilterListError,
    specializationCategoryImage:
      state.haloDocServices.specializationCategoryImage,
    specializationCategoryType: state.haloDocServices.specializationCategoryType,
    specializationCategoryId: state.haloDocServices.specializationCategoryId,
    coronaAssessment: state.haloDocServices.coronaAssessment,
  };
};
export default connect(mapStateToProps, {

  goBack: () => ({
    type: HalodocActions.GO_TO_SCREEN,
    navigateTo: screenNames.HALODOC_SPECIALIZATIONS,
  }),

  gotoDocInfoScreenfromListScreen,
  goToSearchScreen,
  getFilteredDocList,
  setConsultationDocObject,
  dispatchEvent

})(HalodocDoctorListScreen);
