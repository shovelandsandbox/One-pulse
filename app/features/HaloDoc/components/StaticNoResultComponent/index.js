import React, { Component } from "react";
import {
  Image,
  View,
  Text,
} from "react-native";
import styles from "./styles";
import {
  SEARCH_ICON_MAIN,
  SORRY_ICON,
} from "../../../../config/images"
import metaConstants from "../../meta";

export const StaticNoResultComponent = props => {
  let StaticMeta = { ...metaConstants.talkToDoctorMeta() }
  const Sorry_Msg = StaticMeta.Sorry_Msg;
  const Search_Result = StaticMeta.Search_Result
  return (
    <View
      style={styles.mainView}
    >
      <Image
        style={styles.icon}
        source={props.isSearchInitiated ? SORRY_ICON : SEARCH_ICON_MAIN}
      />
      <Text style={styles.searchResultTextStyle}>
        {props.isSearchInitiated
          ? Sorry_Msg
          : Search_Result}
        }
        </Text>
    </View>
  );
};


