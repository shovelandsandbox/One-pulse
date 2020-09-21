import React, { Component } from "react";
import { View, Text, FlatList, Image, Linking } from "react-native";
import {
	WPSocialInviteType,
	WPDarkModal,
	WPInviteDoneModal
} from "../../components";
import { connect } from 'react-redux';
import { styles } from "./styles";
import { sendEmail } from "../../../../utils/send-email.js";
import {
	INVITE_WHATSAPP,
	INVITE_LINE,
	VIBER_ICON,
	INVITE_GROUP_MAIN,
	INVITE_EMAIL
} from "../../../../config/images";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import {
  initializeDynamicLink,
  createDynamicLink,
} from "../../../../utils/DynamicLinkUtil";
class InviteScreen extends Component {

	constructor(props) {
		super(props);
	}

	showInviteDoneDetails = () => {
		const { data } = this.props;
		WPDarkModal.show({
			Component: () => (
				<WPInviteDoneModal
					participants={data}
					buttonText={"Start Habit"}
					onButtonPress={() => {
						console.log("Selected Habit");
					}}
					eventStartDescription={"You and your friends each get 50 badges after the habit is completed. You also get 2 badges for each successful referral."}
				/>
			)
		});
	};

	handle = item => {
    const { url, encode } = item;
    const { userAgent } = this.props.auth;
		const config = {
			title: "Invite",
			desc: "Hey there"
		}
		let shareableUrl=config.desc;
		//setup dynamic links
		if (config.isDynamicLink) {
      initializeDynamicLink(userAgent);
      createDynamicLink(config).then(deeplinkUrl => {
        shareableUrl = encode
          ? encodeURIComponent(deeplinkUrl)
					: deeplinkUrl;				
      });
    }
		if (item.id === 'email') {
			sendEmail(
				null,
				{ subject: config.title, body: shareableUrl}
			).then(() => {
				console.log('Our email successful provided to device mail ');
			});
		} else {
			Linking.openURL(`${url}${shareableUrl}`);
		}
  };

	onPress = item => {    
		this.setState({ inviteMode: item.mode });
		// this.handle(item);
		this.showInviteDoneDetails();
	};	

	renderInviteMode = () => {
		const appTiles = [
			{
				id: "email",
				title: "Email",
				url: "mailto:",
				source: INVITE_EMAIL,
				customStyle: {
					height: 35,
					width: 35,
					marginTop: 5
				}
			},
			{
				id: "whatsapp",
				title: safeMetaLabelFinder("SocialInvite", "whatsapp"),
				url: "whatsapp://send?text=",
				source: INVITE_WHATSAPP,
				customStyle: {
					height: 35,
					width: 35,
					marginTop: 5
				}
			},
			{
				id: "viber",
				title: "Viber",
				url: "viber://forward?text=",
				source: VIBER_ICON,
				customStyle: {
					height: 40,
					width: 45
				}
			},
			{
				id: "line",
				title: safeMetaLabelFinder("SocialInvite", "line"),
				url: "https://line.me/R/msg/text/?",
				encode: true,
				source: INVITE_LINE,
				customStyle: {
					height: 40,
					width: 45
				}
			}
		];
		return (
			<View style={styles.inviteModeContainerStyle}>
				<FlatList
					horizontal={true}
					contentContainerStyle={styles.modeStyle}
					data={appTiles}
					renderItem={({ item }) => {
						return (
							<WPSocialInviteType
								item={item}
								onInvite={() => this.onPress(item)}
							/>
						);
					}}
				/>
			</View>
		);
	}

	renderInviteScreen = () => {
		return (
			<View style={styles.inviteScreencontainer}>
				<View style={styles.imgContainerStyle}>
					<Image
						source={INVITE_GROUP_MAIN}
						style={styles.imageStyle}
						resizeMode={"contain"}
					/>
				</View>
				<Text style={styles.textHeaderStyle}>{"Invite"}</Text>
				<View style={styles.textContainer}>
					<Text>{"Keep the boredom at bay, by inviting your friends to walk along in your wellness journey"}</Text>
				</View>
				{this.renderInviteMode()}
			</View>
		);
	}

	render() {
		return (
			<View>
				{this.renderInviteScreen()}
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
};

export default connect(mapStateToProps, {})(InviteScreen);
