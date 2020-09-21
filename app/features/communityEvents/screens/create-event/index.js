import React, { PureComponent } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { headers, datePickers } from "./../../components";
import PruDropdownComponent from "../../../../components/PruDropdown";
import { connect } from "react-redux";
import { metaFinderCommunityEventLanding } from "./../../meta";
import { getRTMPServer } from "../../config";
import { CALENDER_IMAGE } from "../../assets/communityGroup";
import moment from "moment";
import { getCustomerByEmail } from "../../actions";
import UploadImage from "../../components/upload-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  CustomAlert,
  PruRoundedButton,
  PruKeyboardAvoidingView,
} from "../../../../components";

import styles from "./styles";

class CreateCommunityEvents extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      meetingUrl: `${getRTMPServer()}/live/${props.userEmail}`,
      eventName: "",
      eventTypes: this.getEventType(),
      eventDescription: "",
      startDate: null,
      startTime: null,
      endTime: null,
      showStartDateModal: false,
      showStartTimeModal: false,
      showEndTimeModal: false,
      photo: null,
      isUploadModalVisible: false,
      selectedIndex: 0,
      renderType: "public",
      hostName: "",
    };
  }

  componentDidMount() {
    const { editEventData, userEmail } = this.props;

    if (editEventData) {
      const startDate = moment(editEventData.groupActivity.startTime);
      const endDate = moment(editEventData.groupActivity.endTime);
      this.setState({
        eventName: editEventData.name,
        hostName: editEventData.createdBy?.contactDetails?.email?.value,
        eventTypes: editEventData.tags?.eventType,
        eventDescription: editEventData.description,
        startDate: startDate.format("YYYY-MM-DD"),
        startTime: startDate.format("HH:mm:ss"),
        endTime: endDate.format("HH:mm:ss"),
        renderType: editEventData.groupActivity?.criteria?.eventClassification,
        photo: editEventData.icon?.url,
        meetingUrl: `${getRTMPServer()}/live/${userEmail}`,
      });
    }
  }

  getEventType = () => {
    const eventCategories = metaFinderCommunityEventLanding(
      "pulseTvEventTypes"
    );
    if (Array.isArray(eventCategories)) {
      return eventCategories[0]?.value;
    }
    return "";
  };

  createCommmunityEvent = () => {
    const {
      meetingUrl,
      eventName,
      eventDescription,
      startDate,
      startTime,
      endTime,
      photo,
      eventTypes,
      renderType,
      hostName,
    } = this.state;
    const { editEventData } = this.props;

    const startDateTime = `${startDate}T${startTime}`;
    const startDateTimeInUtc = moment(
      startDateTime,
      "YYYY-MM-DDTHH:mm:ss"
    ).utc();
    const endDateTime = `${startDate}T${endTime}`;
    const endDateTimeInUtc = moment(endDateTime, "YYYY-MM-DDTHH:mm:ss").utc();
    const defaultURL =
      "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/pulse/resources/pulse-tv.png?namespace=PH";

    const icon =
      editEventData && typeof photo === "string"
        ? null
        : {
            url: photo ? photo.path : defaultURL,
            content: photo ? photo.data : "",
            contentType: "JPEG",
            extension: "jpg",
            filename: "event-pic",
          };

    const payload = {
      name: eventName,
      hostName: hostName,
      description: eventDescription,
      classification: "Live TV broadcast",
      icon: icon,
      tags: {
        eventType: eventTypes,
      },
      groupActivity: {
        startTime: startDateTimeInUtc.toISOString(),
        endTime: endDateTimeInUtc.toISOString(),
        criteria: {
          eventClassification: renderType,
        },
      },
      createdBy: {
        contactDetails: {
          email: {
            channel: "EMAIL",
            value: hostName,
          },
        },
      },
      attributes: {
        eventRoomUrl: meetingUrl,
      },
    };

    const maxSessionDuration = Number(
      metaFinderCommunityEventLanding("pulseTvLandingCreateEventMaxMinute")
    );

    if (endDateTimeInUtc < startDateTimeInUtc) {
      CustomAlert.show(
        "",
        metaFinderCommunityEventLanding("pulseTvLandingEndDateGreaterError"),
        {
          positiveText: "OK",
          onPositivePress: () => {},
        }
      );
    } else if (
      !isNaN(maxSessionDuration) &&
      moment(endDateTime).diff(moment(startDateTime), "minutes") >
        maxSessionDuration
    ) {
      CustomAlert.show(
        "",
        metaFinderCommunityEventLanding("pulseTvLandingMaxEventError"),
        {
          positiveText: "OK",
          onPositivePress: () => {},
        }
      );
    } else {
      this.props.getCustomerByEmail(payload);
    }
  };

  toggleUploadPhotoModal = () => {
    this.setState({
      isUploadModalVisible: true,
    });
  };

  cancelPostAttachment = () => {
    this.setState({
      isUploadModalVisible: false,
    });
  };

  uploadDocument = content => {
    this.setState({
      photo: content,
    });
  };

  validate = () => {
    if (
      !this.state.endTime ||
      !this.state.hostName ||
      !this.state.startDate ||
      !this.state.startTime ||
      !this.state.eventName ||
      !this.state.eventDescription
    ) {
      return true;
    } else {
      return false;
    }
  };

  onEventSelection = type => {
    this.setState({ eventTypes: type });
  };

  renderEventList() {
    const mappedEventList = metaFinderCommunityEventLanding(
      "pulseTvEventTypes"
    );

    if (!Array.isArray(mappedEventList)) {
      return null;
    }

    return (
      <PruDropdownComponent
        selectedValueCB={this.onEventSelection}
        selectedOption={this.state.eventTypes}
        options={mappedEventList}
        enabled={true}
      ></PruDropdownComponent>
    );
  }

  onSelect(index, value) {
    this.setState({
      selectedIndex: index,
      renderType: value,
    });
  }

  renderPublicOrPrivate = () => {
    const { renderType } = this.state;
    return (
      <View style={styles.radioList}>
        <RadioGroup
          color="#ed1b2e"
          selectedIndex={renderType === "public" ? 0 : 1}
          style={{
            paddingBottom: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
          onSelect={(index, value) => this.onSelect(index, value)}
        >
          <RadioButton
            value="public"
            backgroundColor="#ed1b2e"
            style={{ marginTop: 5 }}
          >
            <Text style={styles.radioText}>{metaFinderCommunityEventLanding("pulseTvPublic")}</Text>
          </RadioButton>
          <RadioButton
            value="private"
            backgroundColor="#ed1b2e"
            style={{ marginTop: 5 }}
          >
            <Text style={styles.radioText}>{metaFinderCommunityEventLanding("pulseTvPrivate")}</Text>
          </RadioButton>
        </RadioGroup>
      </View>
    );
  };

  renderUploadPhoto = () => {
    const { editEventData } = this.props;
    const { photo } = this.state;
    return (
      <>
        {!this.state.photo ? (
          <View style={styles.uploadPhotoContainer}>
            <Icon name="photo-library" size={30} color={"#a3a3a3"} />
            <TouchableOpacity
              onPress={this.toggleUploadPhotoModal}
              style={styles.uploadButtonWrapper}
            >
              <Text style={styles.uploadButton}>{metaFinderCommunityEventLanding("pulseTvUpldImage")}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {typeof photo === "string" && photo?.includes("https") ? (
          <ImageBackground
            style={[
              styles.uploadButtonContainer,
              {
                backgroundColor: "#000",
                height: 120,
                borderRadius: 8,
                overflow: "hidden",
              },
            ]}
            resizeMode={"cover"}
            imageStyle={{ opacity: 0.5 }}
            source={{ uri: this.state.photo }}
          >
            <TouchableOpacity
              onPress={this.toggleUploadPhotoModal}
              style={styles.button}
            >
              <Text style={styles.buttonTitle}>{metaFinderCommunityEventLanding("pulseTvChnImage")}</Text>
            </TouchableOpacity>
            <View style={styles.optionsStyle}></View>
          </ImageBackground>
        ) : null}
        {this.renderUploadImage()}
      </>
    );
  };

  renderUploadImage = () => {
    if (this.state.isUploadModalVisible) {
      return (
        <UploadImage
          onUpload={content => this.uploadDocument(content)}
          replaceImage={true}
          onCancel={this.cancelPostAttachment}
        />
      );
    } else {
      return null;
    }
  };

  renderEventDateTime = () => {
    return (
      <>
        <View style={{ flexDirection: "row", flex: 1, marginVertical: 8 }}>
          <Text style={[styles.headerText, { flex: 1 }]}>{metaFinderCommunityEventLanding("pulseTvLandingEventDate")}</Text>
          <Text style={[styles.headerText, { flex: 0.6 }]}>{metaFinderCommunityEventLanding("pulseTvStartTime")}</Text>
          <Text style={[styles.headerText, { flex: 0.5 }]}>{metaFinderCommunityEventLanding("pulseTvEndTime")}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          {datePickers.renderDateModal(
            this.state.showStartDateModal,
            selectedDate => {
              this.setState({
                startDate: selectedDate,
                showStartDateModal: false,
              });
            }
          )}
          <TouchableOpacity
            onPress={() => {
              this.setState({ showStartDateModal: true });
            }}
            style={styles.dateContainer}
          >
            <Text style={{ paddingRight: 8 }}>
              {this.state.startDate
                ? moment(this.state.startDate).format("DD-MMM-YYYY")
                : ""}
            </Text>
            <Image source={CALENDER_IMAGE} style={{ height: 12, width: 12 }} />
          </TouchableOpacity>
          {datePickers.renderTimeModal(
            this.state.showStartTimeModal,
            selectedTime => {
              this.setState({
                startTime: selectedTime,
                showStartTimeModal: false,
              });
            }
          )}
          <TouchableOpacity
            onPress={() => {
              this.setState({ showStartTimeModal: true });
            }}
            style={styles.timeContainer}
          >
            <Text>
              {this.state.startTime
                ? moment(this.state.startTime, "HH:mm:ss").format("hh:mm A")
                : ""}
            </Text>
          </TouchableOpacity>
          {datePickers.renderTimeModal(
            this.state.showEndTimeModal,
            selectedTime => {
              this.setState({
                endTime: selectedTime,
                showEndTimeModal: false,
              });
            }
          )}
          <TouchableOpacity
            onPress={() => {
              this.setState({ showEndTimeModal: true });
            }}
            style={styles.timeContainerEnd}
          >
            <Text>
              {this.state.endTime
                ? moment(this.state.endTime, "HH:mm:ss").format("hh:mm A")
                : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  render() {
    const { editEventData } = this.props;
    const title = editEventData ? metaFinderCommunityEventLanding("pulseTvUpdEvent") :metaFinderCommunityEventLanding("pulseTvCreateAnEvent") ;
    return (
      <SafeAreaView style={styles.screenContainer}>
        {headers.renderPlainBackHeader(title)}
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={10}
          extraScrollHeight={10}
        >
          <ScrollView>
            <View style={{ backgroundColor: "#FFF", padding: 20 }}>
              {this.renderUploadPhoto()}
              <Text style={styles.headerText}>{metaFinderCommunityEventLanding("pulseTvEventName")}</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={text => this.setState({ eventName: text })}
                  value={this.state.eventName}
                  placeholder={" "}
                  maxLength={128}
                />
              </View>
              <Text style={styles.headerText}>{metaFinderCommunityEventLanding("pulseTvHostEmail")}</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={text => this.setState({ hostName: text })}
                  value={this.state.hostName}
                  placeholder={" "}
                  maxLength={128}
                />
              </View>
              <Text style={styles.headerText}>{metaFinderCommunityEventLanding("pulseTvCategory")}</Text>
              <View style={styles.eventType}>{this.renderEventList()}</View>
              {this.renderEventDateTime()}
              <Text style={styles.headerText}>{metaFinderCommunityEventLanding("pulseTvDescription")}</Text>
              <View style={styles.descriptionContainer}>
                <TextInput
                  multiline={true}
                  maxLength={400}
                  numberOfLines={5}
                  onChangeText={text =>
                    this.setState({ eventDescription: text })
                  }
                  style={{ height: 50 }}
                  value={this.state.eventDescription}
                  placeholder={"Add Details like topics, schedule, etc,."}
                />
              </View>
              <View>{this.renderPublicOrPrivate()}</View>
              <PruRoundedButton
                onPress={this.createCommmunityEvent}
                buttonTitle={editEventData ? metaFinderCommunityEventLanding("pulseTvUpdEvent") : metaFinderCommunityEventLanding("pulseTvCreateEvent") }
                disabled={this.validate()}
                style={{ width: "100%" }}
              />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.profile.id,
    userEmail: state.profile.email,
    editEventData: state.communityEvents.isEditEvent,
  };
};

const mapDispatchToProps = {
  getCustomerByEmail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCommunityEvents);
