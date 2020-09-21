import React from "react";
import {
  View,
  Text
} from "react-native";
import styles from "./styles";


export const CardView = props => {
    return (
      <View style={{ ...styles.cardView, ...props.style }}>
        {
          props.cardTitle ?
            <View>
              <Text style={styles.cardTitleText}>{props.cardTitle}</Text>
            </View>
            : null
        }
        {props.children}
  
      </View>
    );
  }