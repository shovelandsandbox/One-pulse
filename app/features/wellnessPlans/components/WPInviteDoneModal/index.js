import React from "react";
import { View, Text, Image, Dimensions, TextInput, StyleSheet, FlatList, ScrollView } from "react-native";
import { INVITE_GROUP_ICON, WELLNESS_REWARD } from "../../../../config/images";
import { WPInvitedContact } from "../../components";
import { PruRoundedButton } from "../../../../components";
const width = Dimensions.get("window").width;

const WPInviteDoneModal = props => {
	const { participants, eventStartDescription, buttonText, onButtonPress } = props;
	return (
		<ScrollView
			style={styles.modalStyle}
		>
			<View style={styles.groupContainerStyle}>
				<Text style={styles.headingStyle}>{"Group Details"}</Text>
				<View style={styles.groupDescriptionStyle}>
					<View style={styles.imageWrapper}>
						<Image
							source={INVITE_GROUP_ICON}
							style={styles.imgStyle}
						/>
					</View>
					<TextInput
						placeholder={"Group Name"}
						style={styles.inputStyle}
					/>
				</View>
			</View>
			<View>
				<Text style={styles.headingStyle}>{"Participants"}</Text>
				<FlatList
					data={participants}
					numColumns={2}
					renderItem={({ item }) => {
						return (
							<WPInvitedContact
								uri={item.uri}
								name={item.name}
								text={"Invited"}
								addMore={item.addMore}
								onClick={() => {
									console.log("Add More");
								}}
							/>
						);
					}}
				/>
			</View>
			<View>
				<Text style={styles.eventsStartStyle}>{"The Event Starts Tomorrow"}</Text>
				<View style={styles.descriptionStyle}>
					<View style={styles.badgeStyle}>
						<Image
							source={WELLNESS_REWARD}
							style={styles.imgBadgeStyle}
						/>
					</View>
					<Text style={styles.textDescStyle}>{eventStartDescription}</Text>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<PruRoundedButton
					buttonTitle={buttonText}
					style={styles.startRoundedButton}
					onPress={onButtonPress}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	modalStyle: {
		backgroundColor: "#FFFFFF",
		borderRadius: 3.3,
		width: width * 0.9,
		padding: 23
	},
	headingStyle: {
		fontWeight: "900",
		color: "#3b3b3b"
	},
	groupContainerStyle: {
		paddingBottom: 15
	},
	eventsStartStyle: {
		alignSelf: "center",
		fontWeight: "900",
		color: "#3b3b3b"
	},
	descriptionStyle: {
		flexDirection: "row",
		marginTop: 5,
		justifyContent: "center",
		paddingHorizontal: 10
	},
	groupDescriptionStyle: {
		flexDirection: "row",
		marginTop: 15,
		justifyContent: "center"
	},
	textDescStyle: {
		paddingHorizontal: 5,
		fontSize: 12
	},
	participantContainer: {
		flex: 1
	},
	inputStyle: {
		borderBottomWidth: 0.5,
		flex: 3,
		marginLeft: 15,
		marginVertical: 15
	},
	imgStyle: {
		flex: 1,
		height: 35,
		width: 35,
		resizeMode: "contain"
	},
	badgeStyle: {
		justifyContent: "center",
		alignContent: "center"
	},
	imageWrapper: {
		width: 70,
		height: 70,
		borderRadius: 35,
		borderColor: "#707070",
		borderWidth: 0.5,
		justifyContent: "center",
		alignItems: "center"
	},
	textinputContainerStyle: {
		paddingVertical: 10
	},
	imgBadgeStyle: {
		height: 15,
		width: 15
	},
	startRoundedButton: {
    width: width * 0.8,
    borderRadius: 16.7,
	},
	buttonContainer: {
		paddingHorizontal: 15,
		paddingTop: 15,
		alignItems: "center"
	}
});

export default WPInviteDoneModal;
