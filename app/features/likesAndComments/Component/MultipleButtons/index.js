/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

const RawItem = ({ item, onItemPress }) => {
  return (
    <TouchableOpacity
      style={styles.buttonView}
      onPress={() => {
        onItemPress(item);
      }}
    >
      <Image
        style={[
          styles.buttonImage,
          { height: item.image.height, width: item.image.width },
        ]}
        source={item.image.source}
        resizeMode={"contain"}
      />
      <Text style={styles.buttonText}>{item.text}</Text>
    </TouchableOpacity>
  );
};

const MultipleButtons = ({ buttonList, onButtonClick }) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatlistContent}
        horizontal={true}
        data={buttonList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <RawItem item={item} onItemPress={onButtonClick} />
        )}
      />
    </View>
  );
};

export default MultipleButtons;
