import React from "react";
import CardView from "react-native-cardview";
import { Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import metaConstants from "../../meta";

const HaloDocCategoryTiles = props => {
  let catConstants = { ...metaConstants.talkToDoctorMeta() }
  const Not_Available = catConstants.Not_Available
  return (
    <CardView
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={5}
      style={[styles.cardViewStyle, { backgroundColor: "white" }]}
    >
      <TouchableOpacity
        style={styles.tileContainerStyle}
        onPress={() =>
          props.onClick(
            props.item.id,
            props.item.name,
            props.item.icon.url
          )
        }
      >
        <Image
          style={styles.tileImageStyle}
          source={{ uri: props.item.icon.url }}
        />
        <Text style={styles.tileTextStyle} numberOfLines={2}>
          {props.item.name || Not_Available}
        </Text>
      </TouchableOpacity>
    </CardView>
  );
};



export default HaloDocCategoryTiles;
