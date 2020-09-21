import React, { Component } from "react";
import { Text, View, Platform, PermissionsAndroid } from "react-native";
import SocialInvite from "../../../socialInvite";
import { connect } from 'react-redux';
import Contacts from "react-native-contacts";
import { styles } from "./styles";

class PulseConnectScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isPermissionGranted: false
		}
	}

	componentDidMount() {
		this.checkPermissionAndHandle();
	}

	checkPermissionAndHandle = () => {
		if (Platform.OS === "android") {
			try {
				const granted = PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_CONTACTS
				);
				granted.then(res => {
					if (res === PermissionsAndroid.RESULTS.GRANTED) {
						this.setState({ isPermissionGranted: true });
					}
				});
			} catch (err) {
				console.warn(err);
			}
		} else {
			Contacts.checkPermission((err, permission) => {
				if (err) throw err;
				// Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
				if (permission === "undefined") {
					Contacts.requestPermission((err, permission) => {
						if (permission === "authorized") {
							this.setState({ isPermissionGranted: true });
						}
					});
				}
				if (permission === "authorized") {
					this.setState({ isPermissionGranted: true });
				}
			});
		}
	};

	render() {
		const { isPermissionGranted } = this.state;
		return (
			<View>
				{isPermissionGranted ? (
					<SocialInvite
						isPulseConnectScreen={true}
					/>
				) : (
						<View style={styles.margin15}>
							<Text>{"Please give permission to view this tab"}</Text>
						</View>
					)}
			</View>
		);
	}
}

export default connect()(PulseConnectScreen);
