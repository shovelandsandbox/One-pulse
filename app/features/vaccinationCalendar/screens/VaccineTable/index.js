/* eslint-disable react/require-optimization */
import React from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderWithImage from "../../components/HeaderWithImage";
import CustomCalendarTable from "../../components/CustomCalendarTable";
import Footer from "../../components/Footer";
import styles from "./styles";
import CustomDateModal from "../../components/CustomDateModal";
import { CustomAlert } from "../../../../components";
import {
  goToScreens,
  updateChildren,
  getVaccinationsDetails,
  updateSpouse,
  updateVaccinationSchedule,
} from "../../actions";
import { VaccinationSelector } from "../../Selector";
import { pathOr, isEmpty } from "ramda";
import moment from "moment";
import { metaFinderVaccinationCalendar } from "../../configs/meta-utils";
import {
  ELEMENT_KEY_YES,
  ELEMENT_KEY_NO,
  ELEMENT_KEY_REMINDER_RESET_ALERT,
} from "../../configs/metaConstant";

const DOB_DISPLAY_FORMAT = "YYYY-MM-DD";

class VaccineTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProfile: null,
      vaccinationSchedule: null,
      showDateModal: false,
      dateModalSelectedValue: this.defaultDob(),
      selectedVaccine: null,
    };
  }

  defaultDob = () =>
    moment()
      .add(0 - 0, "y")
      .toDate();

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.schedules !== this.props.schedules) {
      const { selectedProfile } = this.state;
      const vaccinationSchedule = VaccinationSelector.getVaccineDetailsByUserId(
        nextProps.schedules,
        selectedProfile.id
      );
      this.setState({ vaccinationSchedule });
    }
  }

  componentDidMount() {
    const { navigation, schedules } = this.props;
    const profileId = pathOr("", ["state", "params", "id"], navigation);
    const profiles = this.getProfileList();
    const selectedProfile = VaccinationSelector.getSelectedProfile(
      profiles,
      profileId
    );
    const vaccinationSchedule = VaccinationSelector.getVaccineDetailsByUserId(
      schedules,
      profileId
    );
    this.setState({ selectedProfile, vaccinationSchedule });
  }

  handleDownloadPress = () => {};
  handleOnProfilePress = selectedProfile => {
    const { schedules, getVaccinationsDetails } = this.props;
    if (selectedProfile && !isEmpty(selectedProfile)) {
      const vaccinationSchedule = VaccinationSelector.getVaccineDetailsByUserId(
        schedules,
        selectedProfile.id
      );
      this.setState({ selectedProfile, vaccinationSchedule });
      if (!vaccinationSchedule) {
        getVaccinationsDetails({
          id: selectedProfile.id,
          dateOfBirth: selectedProfile.dob,
          enableNavigation: false,
        });
      }
    }
  };
  handleOnReminderPress = () => {};

  getProfileList = () => {
    const { spouse, children } = this.props;
    const list = VaccinationSelector.getDropDownList(children, spouse);
    return list;
  };

  handleBellPress = vaccine => {
    if (vaccine.plannedDate && vaccine.reminder == true) {
      this.resetReminder(vaccine);
    } else {
      this.setState({ showDateModal: true, selectedVaccine: vaccine });
    }
  };
  resetReminder = vaccine => {
    const yesText = metaFinderVaccinationCalendar(ELEMENT_KEY_YES);
    const noText = metaFinderVaccinationCalendar(ELEMENT_KEY_NO);
    const alertMessage = metaFinderVaccinationCalendar(
      ELEMENT_KEY_REMINDER_RESET_ALERT
    );
    CustomAlert.show("", alertMessage, {
      positiveText: yesText,
      onPositivePress: () => {
        this.updateVaccine(vaccine, vaccine.plannedDate, false);
      },
      negativeText: noText,
    });
  };

  updateVaccine = (vaccine, plannedDate, reminder) => {
    const { updateVaccinationSchedule } = this.props;
    const { vaccinationSchedule } = this.state;
    const updatedVaccinationDetails = VaccinationSelector.setAlarmAndReturnUpdatePayload(
      vaccinationSchedule,
      vaccine,
      plannedDate,
      reminder
    );
    if (updatedVaccinationDetails) {
      updateVaccinationSchedule({ body: updatedVaccinationDetails });
      this.setState({
        vaccinationSchedule: updatedVaccinationDetails,
        selectedVaccine: null,
        dateModalSelectedValue: this.defaultDob(),
        showDateModal: false,
      });
    }
  };

  handleTickPress = vaccine => {
    const administeredVaccinations = [
      {
        name: vaccine.name,
        disease: vaccine.disease,
        dosage: vaccine.dosagePrescribed,
      },
    ];
    const { updateVaccinationSchedule } = this.props;
    const { vaccinationSchedule } = this.state;
    vaccinationSchedule.administeredVaccinations = administeredVaccinations;
    updateVaccinationSchedule({ body: vaccinationSchedule });
    this.setState({ vaccinationSchedule: vaccinationSchedule });
  };

  HandleDonePress = () => {
    const { selectedVaccine, dateModalSelectedValue } = this.state;
    const dobStr = moment(dateModalSelectedValue, DOB_DISPLAY_FORMAT).format(
      DOB_DISPLAY_FORMAT
    );
    this.updateVaccine(selectedVaccine, dobStr, true);
  };
  handleDateChange = date => {
    this.setState({ dateModalSelectedValue: date });
  };

  getNextVaccineDate = vaccinationsList => {
    let nextDate = null;
    let nextVaccine = null;

    vaccinationsList.map(item => {
      if (item.reminder) {
        const currentDate = moment();
        const plannedDate = moment(item.plannedDate);

        const diff = currentDate.diff(plannedDate);
        if (!nextDate && diff < 0) {
          //planned date is future
          nextDate = plannedDate;
          nextVaccine = item;
        } else if (nextDate) {
          if (plannedDate.diff(nextDate) < 0) {
            //find next immediate planned date
            nextDate = plannedDate;
            nextVaccine = item;
          }
        }
      }
    });
    return { nextDate, nextVaccine };
  };

  render() {
    const { language, languageList } = this.props;
    const {
      selectedProfile,
      vaccinationSchedule,
      showDateModal,
      dateModalSelectedValue,
    } = this.state;
    const profileList = this.getProfileList();
    const vaccinationsList = pathOr(
      [],
      ["vaccinationSchedule", "vaccinations"],
      vaccinationSchedule
    );

    const { nextDate, nextVaccine } = this.getNextVaccineDate(vaccinationsList);
    return (
      <View style={styles.container}>
        <HeaderWithImage
          profileData={profileList}
          onDownloadPress={this.handleDownloadPress}
          enableCustomDropDown={true}
          selectedValue={selectedProfile ? selectedProfile.name : ""}
          onProfileSelect={this.handleOnProfilePress}
        />
        <ScrollView>
          <CustomCalendarTable
            vaccines={vaccinationsList}
            onBellPress={this.handleBellPress}
            onTickPress={this.handleTickPress}
          />
        </ScrollView>
        <Footer
          nextDate={nextDate ? nextDate.format("DD MMM, YYYY") : ""}
          vaccine={nextVaccine ? nextVaccine.name : ""}
          onReminderPress={this.handleOnReminderPress}
        />
        <CustomDateModal
          showModal={showDateModal}
          languageList={languageList}
          language={language}
          onDonePress={this.HandleDonePress}
          dobModalSelectedValue={dateModalSelectedValue}
          onDateChange={this.handleDateChange}
          maxYear={2}
          minYear={0}
        />
      </View>
    );
  }
}

VaccineTable.propTypes = {
  navigation: PropTypes.object,
  schedules: PropTypes.array,
  children: PropTypes.array,
  spouse: PropTypes.array,
  updateVaccinationSchedule: PropTypes.func,
  getVaccinationsDetails: PropTypes.func,
  language: PropTypes.string,
  languageList: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    schedules: pathOr([], ["vaccinations", "schedules"], state),
    spouse: pathOr([], ["vaccinations", "spouse"], state),
    children: pathOr([], ["vaccinations", "children"], state),
    language: pathOr("", ["userPreferences", "language"], state),
    languageList: state.meta.languageList,
    firstName: state.profile.firstName,
  };
};

export default connect(mapStateToProps, {
  goToScreens,
  updateChildren,
  getVaccinationsDetails,
  updateSpouse,
  updateVaccinationSchedule,
})(VaccineTable);
