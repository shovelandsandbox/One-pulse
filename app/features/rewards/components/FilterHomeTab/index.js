import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "./styles";
import MetaConstants from "../../meta";
import { SR_ICON, REWARD_VOUCHER_HEAD } from "../../../../config/images";
import LinearButton from "../LinearButton";
const redGradient = ["#ec1c2e", "#a21421"];

const FilterValue = ({ text, selected, icon }) => {
  return (
    <View style={icon ? { marginLeft: 10 } : { marginLeft: 25 }}>
      <View
        style={selected ? Styles.tagSelectedView : Styles.tagUnSelectedView}
      >
        {icon && (
          <Image
            source={text === "Badges" ? SR_ICON : REWARD_VOUCHER_HEAD}
            style={Styles.IconStyle}
          />
        )}
        <Text
          style={selected ? Styles.tagSelectedText : Styles.tagUnselectedText}
        >
          {text}
        </Text>
      </View>
      {selected && <View style={Styles.redbar}></View>}
    </View>
  );
};

const FilterHomeTab = ({ onPress, selectedValue, filterItems, icon, showFaq, onFaqPress }) => {
  const metaConstants = { ...MetaConstants.initializeScreenMeta() };

  return (
    <View style={Styles.Maincontainer}>
      <View style={Styles.container}>
        {filterItems.map(filterItem => (
          // eslint-disable-next-line react/jsx-key
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={e => {
              e.preventDefault();
              onPress(filterItem.value);
            }}
          >
            <FilterValue
              text={filterItem.text}
              key={filterItem.text}
              icon={icon}
              selected={filterItem.value === selectedValue}
            />
          </TouchableOpacity>
        ))}
        {showFaq && (
          <View style={{ position: "absolute", top: 15, right: 0 }}>
            <LinearButton
              colors={redGradient}
              text={"FAQ"}
              onTextPress={() => {
                onFaqPress();
              }}
              isDisabled={false}
            />
          </View>)}
      </View>
      <View style={Styles.bottomArrow} />
    </View>
  );
};

export default FilterHomeTab;
