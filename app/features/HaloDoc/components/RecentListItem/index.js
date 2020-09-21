import React from "react";
import {
    Text,
    TouchableOpacity,
} from "react-native";
import styles from "../../screens/HalodocDoctorSearchScreen/styles";


export const RecentListItem = props => {
    return (
        <TouchableOpacity
            style={styles.recentSearchesRowStyle}
            onPress={() => props.onItemClick(props.item)}
        >
            <Text style={styles.recentItemTextStyle} numberOfLines={2}>
                {props.item}
            </Text>
        </TouchableOpacity>
    );
};