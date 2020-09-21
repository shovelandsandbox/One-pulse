import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

class PruTabView extends PureComponent {
  onChange = selectedTab => {
    const { onChange } = this.props;
    onChange && onChange(selectedTab);
  };

  render() {
    const { tabs, selectedTab } = this.props;
    return (
      <FlatList
        horizontal={true}
        data={tabs}
        extraData={this.props}
        renderItem={({ item, index }) => {
          const isSelected = item === selectedTab;
          return (
            <View>
              <TouchableOpacity
                onPress={() => this.onChange(item)}
                style={styles.tab}
              >
                <Text
                  style={[
                    styles.tabText,
                    isSelected ? styles.activeTabText : styles.inactiveTabText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.indicator,
                  isSelected
                    ? styles.activeIndicator
                    : styles.inactiveIndicator,
                ]}
              ></View>
            </View>
          );
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  inactiveTabText: { color: "#707070" },
  activeTabText: { color: "#F00", fontWeight: "bold" },
  tabText: { fontSize: 14 },
  inactiveIndicator: {
    backgroundColor: "transparent",
  },
  activeIndicator: {
    backgroundColor: "#FF0000",
  },
  indicator: {
    height: 2,
    width: "100%",
  },
  tab: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
  },
});
export default PruTabView;
