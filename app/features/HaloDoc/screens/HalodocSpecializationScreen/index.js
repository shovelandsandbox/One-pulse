import React, { Component } from "react";
import {
  View,
  Dimensions,
  BackHandler,
} from "react-native";
import { SEARCH_ICON } from "../../../../config/images";
import { FlatGrid } from "react-native-super-grid";
import styles from "./styles";
import {
  CoreActionTypes,
  CoreConfig,
  events
} from "@pru-rt-internal/pulse-common";
import HaloDocActionBar from "../../components/actionBar";
import { dispatchEvent } from "../../../../actions";

const window = Dimensions.get("window");
const width = window.width;

import { connect } from "react-redux";
const { pageKeys } = CoreConfig;
import TileItem from '../../components/TileItem'
import {
  goToSearchScreen,
  goToDoctorListScreen,
  setSpecializationDetails,
  getDocCategories,
  resetCovidAssessmentDetails
} from '../../actions'
import _ from "lodash";


class HalodocSpecializationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isError: null,
      categoryList: [],
      userIdFetching: false,
    };

  }


  onItemClick = (value, type, image) => {
    this.props.setSpecializationDetails(value, type, image);
    this.props.goToDoctorListScreen();
    this.props.dispatchEvent(events.DocCategoryClick);
  };

  getCategories = () => {
    this.setState({ isError: null });
    this.props.getDocCategories();
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.haloDocUserId) {
      this.props.getCustomerDetails();
    } else if (!nextProps.categoryList || nextProps.categoryList.length <= 0) {
      this.getCategories();
    } else {
      this.setState({
        isError: nextProps.categoryListError,
        categoryList: nextProps.categoryList,
      });
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onGoBack);
    if (!this.props.haloDocUserId) {
      this.setState({ userIdFetching: true });
      this.props.getCustomerDetails();
    } else {
      this.getCategories();
    }
    this.props.resetCovidAssessmentDetails();

  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onGoBack);
  }

  onGoBack = () => {
    this.props.navigation.navigate("PulseHealth");
    this.props.dispatchEvent(events.DocCategoryBackClick);
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <HaloDocActionBar
          onMenuIcon2Click={() =>
            this.props.goToSearchScreen()
          }
          onGoBack={() => this.onGoBack()}
          menuIcon2={SEARCH_ICON}
        ></HaloDocActionBar>

        <FlatGrid
          itemDimension={width * 0.35}
          items={this.state.categoryList}
          style={styles.gridViewStyle}
          spacing={20}
          renderItem={({ item, index }) => (
            <TileItem key={index} item={item} onClick={this.onItemClick} />
          )}
        />
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    meta: state.meta,
    categoryList: state.haloDocServices.categoryList,
    categoryListError: state.haloDocServices.categoryListError,
    haloDocUserId: state.auth.haloDocUserId,
  };
};
export default connect(
  mapStateToProps,
  {
    dispatchEvent,
    goToSearchScreen,
    goToDoctorListScreen,
    setSpecializationDetails,
    getDocCategories,
    resetCovidAssessmentDetails,

    getCustomerDetails: () => ({
      context: pageKeys.PROFILE,
      type: CoreActionTypes.GET_CUSTOMER_DETAILS,
      payload: {
        toggleLoader: true
      }
    }),
  }
)(HalodocSpecializationScreen);
