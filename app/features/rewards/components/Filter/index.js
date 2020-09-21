/* eslint-disable react/jsx-key */
import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import MetaConstants from "../../meta";
import Styles from "./styles";
import PruBackHeader from "../../../../components/PruBackHeader";
import { REWARDS_BACKGROUND } from "../../../../config/images";

const FilterValue = ({ text, selected }) => {
  return (
    <View style={selected ? Styles.tagSelectedView : Styles.tagUnSelectedView}>
      <Text
        style={selected ? Styles.tagSelectedText : Styles.tagUnselectedText}
      >
        {text}
      </Text>
      {selected && <View style={Styles.redbar}></View>}
    </View>
  );
};

const FilterComponent = ({ onPress, selectedValue, trophies }) => {
  const metaConstants = { ...MetaConstants.initializeScreenMeta() };
  const vouchers = metaConstants.vouchers;
  //Disabled Temporarily
  //const experiences = metaConstants.experiences;
  const badges = metaConstants.badges;
  const filterItems = [
    { text: vouchers, value: "Vouchers" },
    //Disabled Temporarily
    // { text: experiences, value: experiences },
    { text: badges, value: "Badges" },
  ];
  return (
    <ImageBackground style={Styles.Maincontainer} source={REWARDS_BACKGROUND}>
      <PruBackHeader
        title={metaConstants.myRewards}
        customStyles={Styles.customStyles}
      />
      <View style={Styles.container}>
        {filterItems.map(filterItem => (
          <TouchableOpacity
            style={Styles.filterValue}
            onPress={() => onPress(filterItem.value)}
          >
            <FilterValue
              text={filterItem.text}
              key={filterItem.text}
              selected={filterItem.value === selectedValue}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

export default FilterComponent;
