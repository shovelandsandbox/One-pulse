import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import { WPInviteGroupRow, WPSearchBar } from "../../components";
import { connect } from "react-redux";
import { styles } from "./styles";

class GroupsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  onSearchGroup = val => {
    this.setState({ searchValue: val });
  };

  renderGroupsScreen = () => {
    return (
      <View>
        <WPSearchBar
          onChange={ele => {
            this.onSearchGroup(ele);
          }}
          value={this.state.searchValue}
          placeholder={"Search"}
          containerStyle={styles.searchInput}
          iconStyle={styles.searchIcon}
          textStyle={styles.inputText}
          iconSize={22}
        />
        <FlatList
          contentContainerStyle={styles.modeStyle}
          data={[
            {
              uri:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd",
              name: "Challenge Folks",
              noOfMembers: 16,
            },
            {
              uri:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd",
              name: "Ab 60 workout",
              noOfMembers: 14,
            },
            {
              uri:
                "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/harsha-amrita-750x.jpg?itok=TFVtjtgd",
              name: "Ab 60 workout",
              noOfMembers: 4,
            },
          ]}
          renderItem={({ item }) => {
            return (
              <WPInviteGroupRow
                uri={item.uri}
                name={item.name}
                noOfMember={item.noOfMembers}
                onClick={
                  this.props.onGroupSelect ? this.props.onGroupSelect : null
                }
              />
            );
          }}
        />
      </View>
    );
  };

  render() {
    return <View>{this.renderGroupsScreen()}</View>;
  }
}

export default connect()(GroupsScreen);
