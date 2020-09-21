/* eslint-disable complexity */
/* eslint-disable react/display-name */
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AVATAR } from "../../../../config/images";
import MetaConstants from "../../meta";

export default ContactRowItem = ({
  item,
  onSelected,
  onInvite,
  enableInvite,
}) => {
  const metaConstants = { ...MetaConstants.initializeScreenMeta() };
  const imageUrl = item.hasThumbnail ? item.thumbnailPath : null;
  const givenName = item.givenName ? item.givenName + " " : "";
  const middleName = item.middleName ? item.middleName + " " : "";
  const familyName = item.familyName ? item.familyName : "";
  const name = givenName + middleName + familyName;
  const cancelInvite = "X " + metaConstants.cancelInvite;
  const acceptInvite = "+ " + metaConstants.invite;
  const invite = item.invitationSent ? cancelInvite : acceptInvite;
  return (
    <TouchableOpacity
      onPress={e => {
        e.preventDefault();
        onSelected(item);
      }}
      style={styles.container}
    >
      <View
        style={
          item.isSelectedForInvite ? styles.selectedView : styles.unSelectedView
        }
      />
      <View style={styles.imageView}>
        <Image
          style={styles.imgstyle}
          source={
            item.hasThumbnail
              ? {
                  uri: imageUrl,
                }
              : AVATAR
          }
        />
      </View>
      <View style={styles.contactView}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.emailText} numberOfLines={1}>
          {item.emailAddresses[0].email}
        </Text>
      </View>
      {enableInvite && (
        <TouchableOpacity
          onPress={e => {
            e.preventDefault();
            onInvite(item);
          }}
          style={styles.inviteView}
        >
          <Text style={styles.inviteText}>{invite}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
