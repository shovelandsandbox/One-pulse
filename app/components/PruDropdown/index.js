import React from "react";
import { View, Picker, Platform, ActionSheetIOS } from "react-native";

import NewTextInput from "../NewTextInput";
import { Divider } from "react-native-elements";
import _ from "lodash";
import { Theme } from "../../themes";
const { Colors } = Theme;

const PruDropdownComponent = props => {
  const {
    selectedValueCB,
    selectedOption,
    options,
    underlineRequired,
    enabled,
  } = props;
  const selectedOptionObject = _.find(options, { value: selectedOption });
  const presetValue = selectedOptionObject
    ? selectedOptionObject.label
    : options[0].label;

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options.map(item => item.label || ""),
      },
      buttonIndex => {
        selectedValueCB(options[buttonIndex].value);
      }
    );
  };

  const getDropDownTextBox = () => {
    return (
      <NewTextInput
        DownArrow={true}
        butonMode={true}
        buttonModeAction={() => {
          if (enabled) {
            showActionSheet();
          }
        }}
        presetValue={presetValue}
        autoCorrect={false}
        onChange={() => {}}
        onSubmit={() => {}}
        showTipOnFocus={true}
        isEnabled={enabled}
        isEditable={false}
        showUnderLine={false}
      />
    );
  };

  if (Platform.OS === "ios") {
    return <View>{getDropDownTextBox()}</View>;
  } else {
    return (
      <View>
        <Picker
          selectedValue={selectedOption}
          style={{ height: 40, width: "100%", marginLeft: -8 }}
          onValueChange={itemValue => {
            selectedValueCB(itemValue);
          }}
          enabled={enabled}
        >
          {options.map(optionItem => {
            const pickerLabel = optionItem.label || "";
            const pickerValue = optionItem.value || "";
            return (
              <Picker.Item
                label={pickerLabel}
                value={pickerValue}
              ></Picker.Item>
            );
          })}
        </Picker>
        {underlineRequired ? (
          <Divider style={{ backgroundColor: Colors.black222529 }} />
        ) : null}
      </View>
    );
  }
};

export default PruDropdownComponent;
