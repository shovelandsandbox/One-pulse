import React, { PureComponent } from "react";
import {
  Picker,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Modal,
  Button,
} from "react-native";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pathOr, path } from "ramda";
import {
  CoreActionTypes,
  CoreConfig,
  CoreUtils,
} from "@pru-rt-internal/pulse-common";
const {
  SCREEN_CONSULTATION_HISTORY,
  CONSULTATION_FILTER_TITLE,
  CONSULTATION_CONSULTATION_DATE,
  CONSULTATION_TYPE_OF_CONSULTATION,
  CONSULTATION_BUTTON_APPLY,
  CONSULTATION_BUTTON_CANCEL,
  CONSULTATION_BUTTON_CLEAR,
  CONSULTATION_BUTTON_CONFIRM,
  CONSULTATION_TYPE_SELECTION_NONE,
  CONSULTATION_TYPE_SELECTION_AUDIO,
  CONSULTATION_TYPE_SELECTION_VIDEO,
  CONSULTATION_PLACEHOLDER_SELECT,
  CONSULTATION_PLACEHOLDER_FROM,
  CONSULTATION_PLACEHOLDER_TO,
  CONSULTATION_FILTER_VIDEO,
  CONSULTATION_FILTER_AUDIO,
} = CoreConfig;
const { metaHelpers } = CoreUtils;
const { pageKeys } = CoreConfig;
const Avenir = {
  default: "Avenir",
  light: "Avenir-light",
  medium: "Avenir-Medium",
  heavy: "Avenir-Heavy",
};
const FontColor = "#515B61";
const EditiingTypeStartDate = "sdf";
const EditiingTypeEndDate = "edf";

import { BACK, History_Icon, DOC_INLINE_LOGO } from "../../../../config/images";
import NewTextInput from "../../../../components/NewTextInput";
import ScreenNames from "../../configs/ScreenNames";
import actionNames from "../../configs/actionNames";
class ConsulationFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      presentingDatePicker: false,
      presentingTypePicker: false,
      startDate: null,
      endDate: null,
      editingType: null,
      type: null,
      editingDateType: null,
      editingDate: new Date(),
    };
  }
  _handleGoBack() {
    this.props.navigation.goBack();
  }

  _onApplyFilter() {
    // set filter options to reducer?
    // this._handleGoBack()
    this.props.getAllConsultationshistory({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      pageSize: 1,
      pageNumber: 1,
    });
  }

  _onCancel() {
    this._handleGoBack();
  }

  render() {
    // let video = metaHelpers.findElement(SCREEN_KEY_DOC_ON_CALL_LANDING, ElementKey).label
    const {
      presentingDatePicker,
      presentingTypePicker,
      editingDateType,
      editingDate,
    } = this.state;
    const { languageList = [], language } = this.props;
    const languageObj =
      languageList.find(
        element => element.languageCode === language.toUpperCase()
      ) || {};
    const locale = pathOr("en", ["locale"], languageObj);
    const TypeOptions = [
      {
        displayName: metaHelpers.findElement(
          SCREEN_CONSULTATION_HISTORY,
          CONSULTATION_TYPE_SELECTION_NONE
        ).label,
        value: null,
      },
      {
        displayName: metaHelpers.findElement(
          SCREEN_CONSULTATION_HISTORY,
          CONSULTATION_TYPE_SELECTION_VIDEO
        ).label,
        value: metaHelpers.findElement(
          SCREEN_CONSULTATION_HISTORY,
          CONSULTATION_FILTER_VIDEO
        ).label,
        // 'video',
      },
      {
        displayName: metaHelpers.findElement(
          SCREEN_CONSULTATION_HISTORY,
          CONSULTATION_TYPE_SELECTION_AUDIO
        ).label,
        value: metaHelpers.findElement(
          SCREEN_CONSULTATION_HISTORY,
          CONSULTATION_FILTER_AUDIO
        ).label,
        // value: 'audio',
      },
    ];
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        {/* Header Element */}
        <View
          style={{
            flexDirection: "row",
            height: 54,
            justifyContent: "space-between",
            // borderBottomColor: '#D9D9D9',
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this._handleGoBack();
            }}
            accesible
          >
            <Image style={{ width: 20, height: 15 }} source={BACK} />
          </TouchableOpacity>
          <View>
            <Image
              style={{
                width: 60,
                height: 35,
                resizeMode: "contain",
              }}
              source={DOC_INLINE_LOGO}
            />
          </View>
        </View>
        {/* Title */}
        <View>
          <Text
            style={{
              width: 295,
              fontFamily: Avenir.heavy,
              fontSize: 22,
              color: FontColor,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            {
              metaHelpers.findElement(
                SCREEN_CONSULTATION_HISTORY,
                CONSULTATION_FILTER_TITLE
              ).label
            }
          </Text>
        </View>
        {/* Date Selections */}
        <View
          style={{
            marginTop: 14,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: FontColor,
              fontSize: 16,
              fontFamily: Avenir.heavy,
            }}
          >
            {
              metaHelpers.findElement(
                SCREEN_CONSULTATION_HISTORY,
                CONSULTATION_CONSULTATION_DATE
              ).label
            }
          </Text>
          <View
            style={{
              marginTop: 8,
            }}
          >
            <NewTextInput
              DownArrow={true}
              isEditable={false}
              isEnabled={true}
              presetValue={
                this.state.startDate
                  ? moment(this.state.startDate).format("YYYY-MM-DD")
                  : metaHelpers.findElement(
                      SCREEN_CONSULTATION_HISTORY,
                      CONSULTATION_PLACEHOLDER_FROM
                    ).label
              }
              inputRectStyle={{
                color: this.state.startDate ? "#000" : "#a7a7a7",
              }}
              shouldDisplayTitle={false}
              buttonMode={true}
              buttonModeAction={() => {
                this.setState({
                  editingDateType: EditiingTypeStartDate,
                  editingDate: this.state.startDate || new Date(),
                  presentingDatePicker: true,
                });
              }}
            />
            <NewTextInput
              DownArrow={true}
              isEditable={false}
              isEnabled={true}
              presetValue={
                this.state.endDate
                  ? moment(this.state.endDate).format("YYYY-MM-DD")
                  : metaHelpers.findElement(
                      SCREEN_CONSULTATION_HISTORY,
                      CONSULTATION_PLACEHOLDER_TO
                    ).label
              }
              inputRectStyle={{
                color: this.state.endDate ? "#000" : "#a7a7a7",
              }}
              shouldDisplayTitle={false}
              buttonMode={true}
              buttonModeAction={() => {
                this.setState({
                  editingDateType: EditiingTypeEndDate,
                  editingDate: this.state.endDate || new Date(),
                  presentingDatePicker: true,
                });
              }}
            />
          </View>
        </View>
        {/* Type Selection */}
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: FontColor,
              fontSize: 16,
              fontFamily: Avenir.heavy,
            }}
          >
            {
              metaHelpers.findElement(
                SCREEN_CONSULTATION_HISTORY,
                CONSULTATION_TYPE_OF_CONSULTATION
              ).label
            }
          </Text>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <NewTextInput
              DownArrow={true}
              presetValue={
                this.state.type
                  ? this.state.type.slice(0, 1).toUpperCase() +
                    this.state.type.slice(1, this.state.type.length)
                  : metaHelpers.findElement(
                      SCREEN_CONSULTATION_HISTORY,
                      CONSULTATION_PLACEHOLDER_SELECT
                    ).label
              }
              isEditable={false}
              isEnabled={true}
              inputRectStyle={{
                color: this.state.type ? "#000" : "#a7a7a7",
              }}
              shouldDisplayTitle={false}
              buttonModeAction={() => {
                this.setState({
                  editingType: this.state.type,
                  presentingTypePicker: true,
                });
              }}
            />
          </View>
        </View>
        {/* Bottom Buttons */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            position: "absolute",
            bottom: 24,
          }}
        >
          {/* Apply */}
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 50,
              height: 44,
              borderWidth: 1,
              borderColor: "#ED1B2E",
              backgroundColor: "#ed1b2e",
              marginHorizontal: 8,
              justifyContent: "center",
            }}
            onPress={() => {
              this._onApplyFilter();
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontFamily: Avenir.heavy,
                alignSelf: "center",
              }}
            >
              {
                metaHelpers.findElement(
                  SCREEN_CONSULTATION_HISTORY,
                  CONSULTATION_BUTTON_APPLY
                ).label
              }
            </Text>
          </TouchableOpacity>
          {/* Cancel */}
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 50,
              height: 44,
              borderWidth: 1,
              borderColor: "#ED1B2E",
              marginHorizontal: 8,
              justifyContent: "center",
            }}
            onPress={() => {
              this._onCancel();
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#ED1B2E",
                fontFamily: Avenir.heavy,
                alignSelf: "center",
              }}
            >
              {
                metaHelpers.findElement(
                  SCREEN_CONSULTATION_HISTORY,
                  CONSULTATION_BUTTON_CANCEL
                ).label
              }
            </Text>
          </TouchableOpacity>
        </View>
        {/* Date Picker Modal */}
        <Modal visible={presentingDatePicker} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#000a",
              flexDirection: "column-reverse",
            }}
          >
            <View
              style={{
                backgroundColor: "#eee",
              }}
            >
              <View
                style={{
                  height: 44,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#a7a7a7",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    marginHorizontal: 10,
                    flexDirection: "row",
                  }}
                >
                  <Button
                    title={
                      metaHelpers.findElement(
                        SCREEN_CONSULTATION_HISTORY,
                        CONSULTATION_BUTTON_CANCEL
                      ).label
                    }
                    onPress={() => {
                      this.setState({
                        presentingDatePicker: false,
                      });
                    }}
                  />
                  <Button
                    title={
                      metaHelpers.findElement(
                        SCREEN_CONSULTATION_HISTORY,
                        CONSULTATION_BUTTON_CLEAR
                      ).label
                    }
                    onPress={() => {
                      this.setState(
                        {
                          presentingDatePicker: false,
                        },
                        () => {
                          switch (editingDateType) {
                            case EditiingTypeStartDate:
                              {
                                this.setState({
                                  startDate: null,
                                });
                              }
                              break;
                            case EditiingTypeEndDate:
                              {
                                this.setState({
                                  endDate: null,
                                });
                              }
                              break;
                            default:
                              break;
                          }
                        }
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Button
                    title={
                      metaHelpers.findElement(
                        SCREEN_CONSULTATION_HISTORY,
                        CONSULTATION_BUTTON_CONFIRM
                      ).label
                    }
                    onPress={() => {
                      this.setState(
                        {
                          presentingDatePicker: false,
                        },
                        () => {
                          switch (editingDateType) {
                            case EditiingTypeStartDate:
                              {
                                this.setState({
                                  startDate: this.state.editingDate,
                                });
                              }
                              break;
                            case EditiingTypeEndDate:
                              {
                                this.setState({
                                  endDate: this.state.editingDate,
                                });
                              }
                              break;
                            default:
                              break;
                          }
                        }
                      );
                    }}
                  />
                </View>
              </View>
              <DatePicker
                style={{
                  alignSelf: "center",
                }}
                mode={"date"}
                locale={locale}
                format={"YYYY-MM-DD"}
                // maximumDate={new Date()}
                // minimumDate={this.state.editingDateType == EditiingTypeEndDate ? this.state.startDate : null}
                date={this.state.editingDate}
                onDateChange={date => {
                  this.setState({
                    editingDate: date,
                  });
                }}
              />
            </View>
          </View>
        </Modal>
        {/* Type Picker Modal */}
        <Modal visible={presentingTypePicker} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#000a",
              flexDirection: "column-reverse",
            }}
          >
            <View
              style={{
                backgroundColor: "#eee",
              }}
            >
              <View
                style={{
                  height: 44,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#a7a7a7",
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Button
                    title={
                      metaHelpers.findElement(
                        SCREEN_CONSULTATION_HISTORY,
                        CONSULTATION_BUTTON_CANCEL
                      ).label
                    }
                    onPress={() => {
                      this.setState({
                        presentingTypePicker: false,
                      });
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Button
                    title={
                      metaHelpers.findElement(
                        SCREEN_CONSULTATION_HISTORY,
                        CONSULTATION_BUTTON_CONFIRM
                      ).label
                    }
                    onPress={() => {
                      this.setState({
                        presentingTypePicker: false,
                        type: this.state.editingType,
                      });
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={this.state.editingType}
                onValueChange={(v, i) => {
                  this.setState({
                    editingType: v,
                  });
                }}
              >
                {TypeOptions.map(item => {
                  return (
                    <Picker.Item label={item.displayName} value={item.value} />
                  );
                })}
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

ConsulationFilter.propTypes = {
  language: PropTypes.string,
  languageList: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    historyList: state.doctorOnCallService.historyList,
    language: pathOr("", ["userPreferences", "language"], state),
    languageList: state.meta.languageList,
  };
};
export default connect(mapStateToProps, {
  getAllConsultationshistory: payload => ({
    context: ScreenNames.DOC_CONSULTATION_HISTORY,
    type: actionNames.FETCH_CONSULATION_HISTORY,
    payload: payload,
  }),
})(ConsulationFilter);
