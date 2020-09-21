import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import { PruBackHeader } from "../../../../components";
import { Search, FAQRowItem } from "../../components";
import styles from "./styles";
import { metaFinderRewards } from "../../configs/meta-utils";
import MetaConstants from "../../meta";
import {
  FAQ_QA_LIST,
  ELEMENT_KEY_FAQ,
  SEARCH,
} from "../../configs/metaConstant";

export default class FAQ extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      faqList: [],
    };
    this.MetaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    const faqList = this.MetaConstants.faqQAList;
    //const faqList = metaFinderRewards(FAQ_QA_LIST);
    this.setState({ faqList });
  }

  handleTextChange = text => {
    const faqList = this.MetaConstants.faqQAList;
    //const faqList = metaFinderRewards(FAQ_QA_LIST);
    const filteredFaqList = faqList.filter(item => {
      const question = item.question ? item.question : "";
      const answer = item.answer ? item.answer : "";
      return (
        question.toLowerCase().includes(text.toLowerCase()) ||
        answer.toLowerCase().includes(text.toLowerCase())
      );
    });
    this.setState({ faqList: filteredFaqList });
  };

  render() {
    const { faqList } = this.state;
    const headerText = metaFinderRewards(ELEMENT_KEY_FAQ);
    const searchText = metaFinderRewards(SEARCH);
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <PruBackHeader title={headerText} customStyles={styles.headerStyle} />
          <Search
            searchText={searchText}
            onTextChange={this.handleTextChange}
          />
        </View>
        <FlatList
          style={styles.flatListView}
          data={faqList}
          renderItem={({ item }) => <FAQRowItem item={item} />}
        />
      </View>
    );
  }
}
