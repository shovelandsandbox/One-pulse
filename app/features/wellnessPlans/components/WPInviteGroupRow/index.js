import React, { PureComponent } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text	
} from "react-native";

import { WPAvatar } from "../../components"

const WPInviteGroupRow = props => {
	const {
		uri,
		name,
		noOfMember,
		onClick
	} = props;
	return (
		<View style={styles.container}>
			<View style={noOfMember >= 5 ? styles.imageContainerStyle : styles.imageContainerStyleFaded}>
				<WPAvatar
					uri={uri}
				/>
			</View>
			<View style={noOfMember >= 5 ? styles.nameContainer : styles.nameContainerFaded}>
				<Text style={styles.textNameStyle}>{name}</Text>
				<Text style={styles.textStyle}>{noOfMember + " Members"}</Text>
			</View>
			{noOfMember >= 5 ? (				
				<TouchableOpacity onPress={onClick} style={styles.selectContainer}>
					<Text style={styles.selectText}>{"Select"}</Text>
				</TouchableOpacity>
			) : (
				<View style={styles.minReqContainer}>
					<Text style={styles.minReqTextStyle}>{"Mininum"}</Text>
					<Text style={styles.minReqTextStyle}>{"5 members"}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: "row"
	},
	textNameStyle: {
		fontWeight: "normal",
		color: "#3b3b3b"
	},
	textStyle: {
		color: "#888888"
	},
	imageContainerStyle: {
		flex: 0.5,
	},
	nameContainer: {
		flex: 2
	},
	imageContainerStyleFaded: {
		flex: 0.5,
		opacity: 0.5,
		overlayColor: '#404040'
	},
	nameContainerFaded: {
		flex: 2,
		opacity: 0.5
	},
	selectContainer: {
		flex: 1,
		backgroundColor: "#fe4c5d",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		width: 35
	},
	minReqTextStyle: {
		color: "#fe4c5d",
		alignSelf: "center"
	},
	selectText: {
		color: "#ffffff",
		fontWeight: "300",
		fontSize: 14
	},
	minReqContainer: {
		flex: 1,
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
		opacity: 0.5
	}
});

export default WPInviteGroupRow;
