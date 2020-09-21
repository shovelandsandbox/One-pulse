import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { PruBackHeader, WPInviteHeader } from "../../components";
import { connect } from "react-redux";
import { styles } from "./styles";
import { ButtonGroup } from "react-native-elements";
import { WELLNESS_REWARD, CLOSE_WHITE } from "../../../../config/images";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import GroupsScreen from "./groupsScreen";
import InviteScreen from "./inviteScreen";
import screenNames from "../../config/screenNames";
import PulseConnectScreen from "./pulseconnectScreen";

class Invite extends Component {
	data = [
		{
			uri: "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
			name: "James Anderson"
		},
		{
			uri: "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
			name: "James Anderson"
		},
		{
			uri: "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
			name: "James Anderson"
		},
		{
			uri: "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
			name: "James Anderson"
		}
	];
	constructor(props) {
		super(props);
		this.state = {
			isInviteHeaderVisible: true,
			selectedIndex: 0,
			invitedContactsList: []
		}
		this.updateIndex = this.updateIndex.bind(this)
	}

	componentDidMount() {
		this.setState({invitedContactsList : this.data}, () => {
			this.state.invitedContactsList.push({
				uri: "https://www.thehindu.com/entertainment/ojos5l/article31772613.ece/ALTERNATES/FREE_460/08BGCHIRANJEEVISARJA-1",
				name: "Add User",
				addMore: true
			});
		});		
	}	

	renderHeader = () => {
		return (
			<View style={styles.headerStyle}>
				<PruBackHeader
					title={"Select Friends"}
					customStyles={{}}
				/>
			</View>
		);
	}

  renderInviteHeader = () => {
    if (this.state.isInviteHeaderVisible) {
      let desc = "";
      const { selectedIndex } = this.state;
      if (selectedIndex === 0) {
        desc =
          "Invite new friends, complete the habit as a group and all earn 50 Badges. You also get 2 badges for each successful referral.";
      } else {
        desc =
          "+20 Badges when you complete a habit with your friends on Pulse";
      }
      return (
        <WPInviteHeader
          description={desc}
          leftUri={WELLNESS_REWARD}
          rightUri={CLOSE_WHITE}
          onClose={() => {
            this.setState({ isInviteHeaderVisible: false });
          }}
        />
      );
    } else {
      return <View />;
    }
  };

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  renderButtonGroup = () => {
    const buttons = ["Invite", "Pulse Connect", "Groups"];
    const { selectedIndex } = this.state;
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={styles.buttonsContainer}
        selectedButtonStyle={styles.selectedButtonStyle}
        selectedTextStyle={styles.selectecButtonText}
        textStyle={styles.buttonGroupTextStyle}
      />
    );
  };

  renderInviteScreen = () => {
    return (
      <View>
        <InviteScreen />
      </View>
    );
  };

	renderInviteScreen = () => {
		const { invitedContactsList } = this.state;
		return (
			<View>
				<InviteScreen data={invitedContactsList}/>
			</View>
		);
	}

	renderPulseConnectScreen = () => {
		return (
			<View>
				<PulseConnectScreen />
			</View>
		);
	}

  renderGroupsScreen = () => {
    return (
      <View>
        <GroupsScreen
          onGroupSelect={() => {
            this.props.navigation.navigate(screenNames.GROUP_DETAILS);
          }}
        />
      </View>
    );
  };

  renderScreen = () => {
    const { selectedIndex } = this.state;
    switch (selectedIndex) {
      case 0:
        return this.renderInviteScreen();
      case 1:
        return this.renderPulseConnectScreen();
      case 2:
        return this.renderGroupsScreen();
      default:
        return <View />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.renderHeader()}
          {this.renderInviteHeader()}
        </View>
        <ScrollView style={styles.scrollContainer}>
          {this.renderButtonGroup()}
          {this.renderScreen()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  socailShareReferral: state.socialReferralReducer.socailShareReferral,
  socialShareReferralContext:
    state.socialReferralReducer.socialShareReferralContext,
  referralDescription: state.referralGroup.referralDescription,
});

const mapDispatchToProps = dispatch => ({
  goToScreen: (screen, payload) => {
    dispatch({
      type: CoreActionTypes.GO_TO_SCREEN,
      navigateTo: screen,
      payload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
