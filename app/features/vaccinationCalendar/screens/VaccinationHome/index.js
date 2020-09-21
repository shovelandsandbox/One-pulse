/* eslint-disable react/require-optimization */
import React from "react";
import { View, Text, Platform } from "react-native";
import PropTypes from "prop-types";
import HeaderWithImage from "../../components/HeaderWithImage";
import ProfileList from "../../components/ProfileList";
import AddProfile from "../../components/AddProfile";
import CustomDateModal from "../../components/CustomDateModal";
import styles from "./styles";
import { PruRoundedButton, CustomAlert } from "../../../../components";
import { connect } from "react-redux";
import {
  goToScreens,
  updateChildren,
  getVaccinationsDetails,
  updateSpouse,
} from "../../actions";
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
import { VaccinationSelector } from "../../Selector";
import moment from "moment";
import { pathOr } from "ramda";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_CHECK_AND_TRACK,
  ELEMENT_KEY_OK,
  ELEMENT_KEY_PLEASE_ENTER_NAME,
  ELEMENT_KEY_CONTINUE,
  ELEMENT_KEY_PLEASE_SELECT_RELATION,
  ELEMENT_KEY_PLEASE_ENTER_VALID_NAME,
} from "../../configs/metaConstant";

const DOB_DISPLAY_FORMAT = "YYYY-MM-DD";
const { pageKeys } = CoreConfig;

class VaccinationHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileAddModal: false,
      showDobModal: false,
      dobModalSelectedValue: this.defaultDob(),
      relationType: "",
      userName: "",
      selectedProfile: null,
    };
  }

  defaultDob = () =>
    moment()
      .add(0 - 0, "y")
      .toDate();

  componentDidMount() {
    const { getCustomerDetails } = this.props;
    getCustomerDetails();
  }

  handleContinuePress = () => {
    const { getVaccinationsDetails } = this.props;
    const { selectedProfile } = this.state;
    if (selectedProfile) {
      getVaccinationsDetails({
        id: selectedProfile.id,
        dateOfBirth: selectedProfile.dob,
        enableNavigation: true,
      });
    }
  };
  handleOnSelect = item => {
    if (!item) {
      this.setState({ showProfileAddModal: true });
    } else {
      this.setState({ selectedProfile: item });
    }
  };
  handleOnSave = item => {
    const { updateChildren, updateSpouse } = this.props;
    if (this.isValidUser(item)) {
      switch (item.relationType) {
        case "child":
          updateChildren({ name: item.userName, dob: item.dateOfBirth });
          break;
        case "spouse":
          updateSpouse({ name: item.userName, dob: item.dateOfBirth });
          break;
      }
      this.setState({
        showProfileAddModal: false,
        relationType: "",
        userName: "",
        dobModalSelectedValue: this.defaultDob(),
        selectedProfile: null,
      });
    }
  };
  handleOnCancel = () => {
    this.setState({ showProfileAddModal: false });
  };

  enableDobModal = () => {
    if (Platform.OS === "ios") {
      this.setState({ showDobModal: true, showProfileAddModal: false });
    } else {
      this.setState({ showDobModal: true });
    }
  };

  disableDobModal = () => {
    if (Platform.OS === "ios") {
      this.setState({ showDobModal: false, showProfileAddModal: true });
    } else {
      this.setState({ showDobModal: false });
    }
  };

  handleDateChange = date => {
    this.setState({ dobModalSelectedValue: date });
  };

  handleRelationTypeChange = key => {
    this.setState({ relationType: key });
  };
  handleUserNameChange = name => {
    this.setState({ userName: name });
  };

  isValidUser = item => {
    const ok = metaFinderVaccinationCalendar(ELEMENT_KEY_OK);
    let errorMessage = "";
    const numReg = /\d/;
    if (!item.relationType) {
      errorMessage = metaFinderVaccinationCalendar(
        ELEMENT_KEY_PLEASE_SELECT_RELATION
      );
    } else if (!item.userName) {
      errorMessage = metaFinderVaccinationCalendar(
        ELEMENT_KEY_PLEASE_ENTER_NAME
      );
    } else if (numReg.test(item.userName)) {
      errorMessage = metaFinderVaccinationCalendar(
        ELEMENT_KEY_PLEASE_ENTER_VALID_NAME
      );
    }
    if (errorMessage) {
      CustomAlert.show("", errorMessage, {
        positiveText: ok,
      });
      return false;
    }
    return true;
  };

  getProfileList = () => {
    const { spouse, children } = this.props;
    const list = VaccinationSelector.getMergedList(children, spouse);
    return list;
  };

  render() {
    const { language, languageList } = this.props;
    const {
      showProfileAddModal,
      selectedProfile,
      dobModalSelectedValue,
      showDobModal,
      relationType,
      userName,
    } = this.state;
    const checkAndTrackVaccination = metaFinderVaccinationCalendar(
      ELEMENT_KEY_CHECK_AND_TRACK
    );
    const continueText = metaFinderVaccinationCalendar(ELEMENT_KEY_CONTINUE);
    const dobStr = moment(dobModalSelectedValue, DOB_DISPLAY_FORMAT).format(
      DOB_DISPLAY_FORMAT
    );
    const profileList = this.getProfileList();
    return (
      <View style={styles.container}>
        <HeaderWithImage />
        <Text style={styles.subText}>{checkAndTrackVaccination}</Text>
        <View style={styles.profilesView}>
          <ProfileList
            data={profileList}
            onSelect={this.handleOnSelect}
            selectedUser={selectedProfile}
          />
        </View>
        <View style={styles.bottomView}>
          <PruRoundedButton
            buttonTitle={continueText}
            style={styles.startRoundedButton}
            onPress={this.handleContinuePress}
          />
        </View>
        <AddProfile
          showModal={showProfileAddModal}
          onSave={this.handleOnSave}
          onCancel={this.handleOnCancel}
          onDatePickerSelected={this.enableDobModal}
          selectedDate={dobStr}
          relationType={relationType}
          onRelationTypeChange={this.handleRelationTypeChange}
          onUserNameChange={this.handleUserNameChange}
          userName={userName}
        />
        <CustomDateModal
          showModal={showDobModal}
          languageList={languageList}
          language={language}
          onDonePress={this.disableDobModal}
          dobModalSelectedValue={dobModalSelectedValue}
          onDateChange={this.handleDateChange}
          maxYear={0}
          minYear={100}
        />
      </View>
    );
  }
}

VaccinationHome.propTypes = {
  children: PropTypes.array,
  spouse: PropTypes.array,
  getVaccinationsDetails: PropTypes.func,
  getCustomerDetails: PropTypes.func,
  language: PropTypes.string,
  languageList: PropTypes.array,
  updateChildren: PropTypes.func,
  updateSpouse: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    spouse: pathOr([], ["vaccinations", "spouse"], state),
    children: pathOr([], ["vaccinations", "children"], state),
    language: pathOr("", ["userPreferences", "language"], state),
    languageList: state.meta.languageList,
    firstName: state.profile.firstName,
  };
};

export default connect(mapStateToProps, {
  goToScreens,
  getCustomerDetails: () => ({
    context: pageKeys.CAMPAIGN,
    type: CoreActionTypes.GET_CUSTOMER_DETAILS,
  }),
  updateChildren,
  getVaccinationsDetails,
  updateSpouse,
})(VaccinationHome);
