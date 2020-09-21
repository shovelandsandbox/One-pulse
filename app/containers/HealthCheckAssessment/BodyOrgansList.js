import React from "react";
import { View, FlatList, StyleSheet} from "react-native";
import BodyOrganListDetails from "./BodyOrganListDetail";
export default class BodyOrganList extends React.Component {
  render() {
    const { organList, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={organList.categoriesDetails}
          style={styles.listStyle}
          contentContainerStyle={styles.listStyle}
          renderItem={({ item }) => (
            <BodyOrganListDetails organDetails={item} navigation={navigation} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listStyle: {
    paddingBottom: 60,
  },
});
