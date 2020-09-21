import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, FlatList } from "react-native";
import {
  PruBackHeader,
  PruRoundedButton,
  ShadowWrapper,
} from "../../../components";
import { Theme } from "../../../themes";
const { Colors } = Theme;
import { scale } from "../../../utils/Scale";

export default class GroupMembers extends PureComponent {
  constructor(props) {
    super(props);
  }

  groupMemberView = item => {
    const memberFullName = `${item.item.firstName} ${item.item.lastName}`;
    const memberEmail = item.item.email;
    return (
      <View style={styles.groupMember}>
        <Text style={styles.margin}>{memberFullName}</Text>
        <Text style={styles.margin}>{memberEmail}</Text>
        <View style={styles.separator}></View>
      </View>
    );
  };

  showGroupMembers = () => {
    const { groupMembers } = this.props;
    return (
      <FlatList
        style={styles.groupList}
        data={groupMembers}
        renderItem={this.groupMemberView}
        keyExtractor={(item, index) => index}
      />
    );
  };

  leaveGroup = () => {
    const { channelId } = this.props;
    this.props.leaveGroup(channelId);
  };
  close = () => {
    this.props.close();
  };

  render() {
    return (
      <View style={styles.body}>
        <ShadowWrapper>
          <PruBackHeader
            onPress={() => this.close()}
            title={"Group Members"}
            rightImage={false}
          ></PruBackHeader>
        </ShadowWrapper>
        {this.showGroupMembers()}
        <View style={styles.footerContainer}>
          <PruRoundedButton
            style={styles.requestPaymentButton}
            textStyling={{ fontSize: 14 }}
            buttonTitle={"Leave Group"}
            onPress={() => {
              this.leaveGroup();
            }}
          ></PruRoundedButton>
        </View>
      </View>
    );
  }
}

GroupMembers.propTypes = {
  groupMembers: PropTypes.array,
  leaveGroup: PropTypes.func,
  close: PropTypes.func,
  channelId: PropTypes.string,
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  footerContainer: {
    alignItems: "center",
    height: 200,
    justifyContent: "center",
  },
  groupList: {
    flex: 1,
    marginTop: 8,
  },
  groupMember: {
    padding: 15,
  },
  requestPaymentButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 30,
    height: 46,
    justifyContent: "center",
    width: scale(140),
  },
  separator: {
    flex: 1,
    flexDirection: "row",
    height: 1,
    backgroundColor: "#E8E8E8",
    marginTop: 5,
    marginBottom: 2,
  },
  margin: { marginLeft: 10, color: "#000" },
});
