import React from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

import styles from "./styles";

import images from "../../../../images/ExerciseBuddy";
import { AVATAR } from "../../../../config/";

const renderMemberItem = (item, onContactCancelPress) => {
  return (
    <View style={styles.listRowView}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image source={AVATAR} style={styles.memberPic} />
        <View>
          <Text style={styles.memberName}>{item.fullName}</Text>
          <Text style={styles.memberStatus}>{"Invited"}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.uninviteBtn}
        onPress={() => onContactCancelPress(item)}
      >
        <Image source={images.close} style={styles.uninvite} />
      </TouchableOpacity>
    </View>
  );
};

const renderMemberList = (contacts, onContactCancelPress) => {
  const members = "Members";
  return (
    <>
      <Text style={styles.members}>{members}</Text>
      <View style={styles.scrollView}>
        <FlatList
          data={contacts}
          style={styles.flatlist}
          renderItem={({ item }) =>
            renderMemberItem(item, onContactCancelPress)
          }
        />
      </View>
    </>
  );
};
const GroupDetailModal = ({
  isModalVisible,
  contacts,
  onClosePress,
  onContactCancelPress,
  onEditPress,
  groupPicture,
  onChangeText,
  startTime,
  groupName,
  onStartPress,
  errorMessage,
}) => {
  const avatarUrl = {
    uri: `data:image/png;base64,${groupPicture}`,
  };
  const time = startTime;
  const grpDetail = "Group Details";
  const dailyWorkoutTime = "Daily Workout time";
  const start = "Start";
  const edit = "Edit";
  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Text style={styles.grpDetail}>{grpDetail}</Text>
            <View style={styles.grpRow}>
              <Image source={avatarUrl} style={styles.grpImg} />
              <View style={{justifyContent: "center"}}>
                <TextInput
                  value={groupName}
                  style={styles.grpName}
                  onChangeText={text => {
                    onChangeText(text);
                  }}
                  placeholder="Please type group name"
                  placeholderTextColor="gray"
                />
                <View style={styles.inputView}>
                  <Text style={styles.errorText}>{errorMessage || ""}</Text>
                </View>
              </View>
            </View>
            {renderMemberList(contacts, onContactCancelPress)}
            <Text style={styles.dailyTimeTitle}>{dailyWorkoutTime}</Text>
            <View style={styles.dailyTimeRow}>
              <View style={styles.timeView}>
                <Text style={styles.time}>{time}</Text>
              </View>
              <View style={styles.editView}>
                <TouchableOpacity style={styles.editBtn} onPress={onEditPress}>
                  <Text style={styles.edit}>{edit}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.startBtn} onPress={onStartPress}>
              <Text style={styles.startTxt}>{start}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.bottomCrossBtn}
            onPress={onClosePress}
          >
            <Image source={images.close} style={styles.bottomCrossImg} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default GroupDetailModal;
