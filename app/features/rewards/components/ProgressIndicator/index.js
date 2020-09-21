import React from "react";
import { FlatList, View } from "react-native";
import RowItem from "./RowItem";
import styles from "./styles";

export default ProgressIndicator = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <RowItem item={item} />}
      />
    </View>
  );
};
