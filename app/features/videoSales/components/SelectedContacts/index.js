import React from "react";
import { FlatList, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import RowItem from "./RowItem";
import { SALE_VIDEO_CHAT_WHITE } from "../../../../config/images";

const SelectedContacts = ({
  data,
  onVideoPress,
  onCancelContactPress,
  disableVideoIcon,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={data}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={({ item }) => (
          <RowItem item={item} onCancelContactPress={onCancelContactPress} />
        )}
      />
      <TouchableOpacity
        style={disableVideoIcon ? styles.videoIconGrey : styles.videoIconView}
        onPress={onVideoPress}
        disabled={disableVideoIcon}
      >
        <Image source={SALE_VIDEO_CHAT_WHITE} style={styles.Image} />
      </TouchableOpacity>
    </View>
  );
};

SelectedContacts.propTypes = {
  onVideoPress: PropTypes.func,
  onCancelContactPress: PropTypes.func,
  data: PropTypes.array,
  disableVideoIcon: PropTypes.bool,
};

export default SelectedContacts;
