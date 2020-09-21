import React from "react";
import {
    Image,
    View,
    Text,
} from "react-native";
import styles from './styles'

const Header = props => {
    console.log("props", props);

    return (
        <View style={styles.headerStyle1}>
            <Image style={styles.cardImage} source={{ uri: props.image }} />
            <Text style={styles.cardText}>{props.type}</Text>
        </View>
    );
};

export default Header;