import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import styles from './styles'

export const TimerComponent = props => {
    return (
        <View style={styles.viewTimer}>
            <Text style={styles.timer}>{props.timer}</Text>
            <Text style={styles.timerText}>{props.secondsText}</Text>
        </View>
    );
};