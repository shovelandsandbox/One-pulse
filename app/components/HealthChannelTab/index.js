/* eslint-disable react/jsx-key */
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Styles from "./styles";

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

const HealthChannelTab = ({ onPress, selectedValue, filters }) => {
  const filterItems = filters;
  return (
    <View style={Styles.container}>
      <FlatList
        horizontal={true}
        data={filterItems}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.channelName}
        extraData={selectedValue}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={e => {
              e.preventDefault();
              onPress(item.channelId);
            }}
          >
            <FilterValue
              text={item.channelName}
              key={item.channelName}
              selected={item.channelId === selectedValue}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HealthChannelTab;
