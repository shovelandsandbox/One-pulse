import React, { PureComponent } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./styles";
import MetaConstants from "../../meta";
import { FAQRowItem } from "../../components";

export default class FAQComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      faqList: [],
      selectedRow: -1,
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    const faqList = this.MetaConstants.faqQAList;
    this.setState({ faqList });
  }

  onFAQPress = index => {
    this.setState(prevState => {
      if (prevState.selectedRow === index) {
        return {
          ...prevState,
          selectedRow: -1,
        };
      }
      return {
        ...prevState,
        selectedRow: index,
      };
    });
  };

  render() {
    const { faqList } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          extraData={this.state}
          style={styles.flatListView}
          data={faqList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <FAQRowItem
              item={item}
              onFAQPress={() => this.onFAQPress(index)}
              isActive={this.state.selectedRow === index}
            />
          )}
        />
      </View>
    );
  }
}
