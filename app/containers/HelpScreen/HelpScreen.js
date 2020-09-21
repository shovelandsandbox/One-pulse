/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Platform,
} from "react-native";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import ModalDropdown from "react-native-modal-dropdown";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import helpStyles from "./styles";
import { EMAIL } from "../../config/images";

const { GO_TO_FEEDBACK } = CoreActionTypes;
const { pageKeys, SCREEN_KEY_HELP } = CoreConfig;

const KEY_DD_HEADER = "helpscreendropdownheader";
const KEY_EMAIL = "helpscreenemail";
const KEY_EMAIL_ID = "helpscreenemailid";
const KEY_CONTACT_DESCRIPTION = "helpscreencontactdescription";
const TYPE_DROP_DOWN_ITEM = "dropdownitem";
const KEY_FEEDBACK = "helpscreenfeedbackbutton";

class Help extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      heading: "",
      selectedDropDownOption: "",
    };
  }

  onSelectPicker(label) {
    const helpScreen = metaHelpers.findScreen(SCREEN_KEY_HELP);
    const key = metaHelpers
      .findAllElementsByType(helpScreen, TYPE_DROP_DOWN_ITEM)
      .find(item => item.label === label).key;
    const elements = metaHelpers.findAllElementsByType(
      helpScreen,
      TYPE_DROP_DOWN_ITEM
    );

    const selectedElement = elements.find(element => element.key === key);

    this.setState({
      content: selectedElement.description,
      heading: selectedElement.label,
      selectedDropDownOption: label,
    });
  }

  onPressMailButton() {
    this.props.gotoFeedback(this.state.selectedDropDownOption);
  }

  render() {
    const helpScreen = metaHelpers.findScreen(SCREEN_KEY_HELP);

    const dropDownOptions = metaHelpers
      .findAllElementsByType(helpScreen, TYPE_DROP_DOWN_ITEM)
      .map(item => item.label);
    if (this.state.content === "") {
      this.onSelectPicker(dropDownOptions[0]);
    }
    return (
      <View contentContainerStyle={helpStyles.container}>
        <ScrollView style={helpStyles.scrollView}>
          <View style={helpStyles.leftSpacing}>
            <Text
              style={[
                helpStyles.Header,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  fontSize: 21.7,
                  fontFamily:
                    Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
                  marginTop: 10,
                },
              ]}
            >
              {helpScreen.label}
            </Text>
            <Text
              style={[
                helpStyles.Header,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  fontSize: 15,
                  fontFamily:
                    Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
                  marginLeft: 15,
                  marginTop: 30,
                },
              ]}
            >
              {metaHelpers.findElement(SCREEN_KEY_HELP, KEY_DD_HEADER).label}
            </Text>
            <View>
              <View style={{ justifyContent: "center" }}>
                <View
                  style={[
                    helpStyles.dropbox,
                    { marginTop: 30, alignItems: "center" },
                  ]}
                >
                  <ModalDropdown
                    textStyle={helpStyles.textStyle}
                    dropdownStyle={helpStyles.dropdownStyle}
                    dropdownTextStyle={helpStyles.dropdownTextStyle}
                    style={helpStyles.dropDownButton}
                    defaultValue={dropDownOptions[0]}
                    options={dropDownOptions}
                    onSelect={(index, key) => this.onSelectPicker(key)}
                  />
                  <View pointerEvents="none" style={helpStyles.dropDownIcon}>
                    <MaterialIcons
                      pointerEvents="none"
                      name="arrow-drop-down"
                      size={25}
                      color="#a8a8a8"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <Text style={helpStyles.pickerHeading}>{this.state.heading}</Text>
            <Text style={helpStyles.pickerContent}>{this.state.content}</Text>
          </View>
          <View style={helpStyles.ruler} />
          <View
            style={{ flexDirection: "row", flex: 0.5, paddingHorizontal: 20 }}
          >
            <OfflineImage
              fallbackSource={EMAIL}
              accessibilityLabel="email"
              accesible
              key={KEY_EMAIL}
              source={{
                uri: metaHelpers.findElement(SCREEN_KEY_HELP, KEY_EMAIL).image,
              }}
              style={{ width: 40, marginTop: 15, height: 30 }}
            />

            <View style={{ flex: 1, marginTop: 10 }}>
              <Text style={[helpStyles.heading]}>
                {metaHelpers.findElement(SCREEN_KEY_HELP, KEY_EMAIL).label}
              </Text>
              <Text style={[helpStyles.mailId]}>
                {metaHelpers.findElement(SCREEN_KEY_HELP, KEY_EMAIL_ID).label}
              </Text>
              <Text style={helpStyles.description}>
                {
                  metaHelpers.findElement(
                    SCREEN_KEY_HELP,
                    KEY_CONTACT_DESCRIPTION
                  ).label
                }
              </Text>
            </View>
          </View>
          <View style={helpStyles.leftSpacing}>
            <TouchableOpacity
              style={helpStyles.button}
              onPress={() => this.onPressMailButton()}
            >
              <Text style={helpStyles.buttonText}>
                {metaHelpers.findElement(SCREEN_KEY_HELP, KEY_FEEDBACK).label}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  {
    gotoFeedback: selectedDropDownOption => ({
      context: pageKeys.HELP_SCREEN,
      type: GO_TO_FEEDBACK,
      payload: {
        params: {
          selectedDropDownOption,
        },
      },
    }),
  }
)(Help);
