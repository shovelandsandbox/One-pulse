/* eslint-disable react/display-name */
import React from "react";
import { FlatList, View } from "react-native";
import RewardRowItem from "./RewardRowItem";
import styles from "./styles";

export default RewardsWallet = ({ data, onTilePress }) => {
  return (
    <View>
      <FlatList
        horizontal={true}
        contentContainerStyle={styles.container}
        data={data}
        renderItem={({ item }) => (
          <RewardRowItem item={item} onTilePress={onTilePress} />
        )}
      />
    </View>
  );
};
