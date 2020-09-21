import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { WPAvatar } from "../../components";

const WPInvitedContact = props => {
	const {
		uri,
		name,
		addMore,
		onClick,
		text
	} = props;
	return (
		<View style={styles.container}>
			{
				addMore && onClick ? (
					<View style={styles.innerContainer}>
						<TouchableOpacity style={styles.plusIconContainer} onPress={onClick}>
							<Icon name="plus" size={15} color="#ffffff" />
						</TouchableOpacity>
						<View style={styles.descriptionContainer}>
							<Text style={styles.textStyle}>{name}</Text>
						</View>
					</View>
				) : (
						<View style={styles.innerContainer}>
							<View style={styles.imageContainer}>
								<WPAvatar uri={uri} />
							</View>
							<View style={styles.descriptionContainer}>
								<Text>{name}</Text>
								<Text style={styles.invitedTextStyle}>{text}</Text>
							</View>
						</View>
					)
			}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingRight: 10,
		flex: 0.5
	},
	imageContainer: {
		paddingVertical: 5,
		paddingRight: 5
	},
	plusIconContainer: {
		marginVertical: 5,
		marginRight: 5,
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: "#d1d1d1",
		justifyContent: "center",
		alignItems: "center"
	},
	descriptionContainer: {
		padding: 5,
		justifyContent: "center"
	},
	invitedTextStyle: {
		color: "#7143b9",
		fontSize: 12
	},
	innerContainer: {
		flexDirection: "row"
	},
	textStyle: {
		color: "#3b3b3b"
	}
});

export default WPInvitedContact;
