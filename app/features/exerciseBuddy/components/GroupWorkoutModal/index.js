import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Image, Dimensions, Text, FlatList, TouchableOpacity } from "react-native";
import images from '../../../../images/ExerciseBuddy';
import styles from './styles';
import PruFullPageModal from '../../../../components/PruFullPageModal';

const modalData = {
  title: 'Amazing!',
  subTitle: 'Keep it up, you are working hard!',
  date: '2-Jun-2020',
  time: '17:22',
  duration: '8:30',
  durationUnit: 'Mins',
  participants_count: '4',
  participants_list: [
    {
      name: 'You',
      count: '1',
      image: '',
    },
    {
      name: 'Jose Diaz',
      count: '2',
      image: '',
    },
    {
      name: 'Chris Green',
      count: '3',
      image: '',
    },
    {
      name: 'James Bond',
      count: '4',
      image: '',
    },
  ],
}

const GroupWorkoutModal = (props) => {
  const [isModalVisible, setModalVisibility] = useState(true);
  return (
    <PruFullPageModal
      isModalVisible={isModalVisible}
      setModalVisibility={setModalVisibility}
      bgImg={images.exerciseBuddyHome}
      RenderContentView={<RenderContentView {...props}/>}
    />
  )

  
}

const RenderContentView = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <View style={styles.headerView}>
        <Text style={styles.amazing}>{modalData.title}</Text>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.date}>{modalData.date}</Text>
          <Text style={[styles.date, styles.time]}>{modalData.time}</Text>
        </View>
      </View>
      <Text style={styles.txtDesc}>{modalData.subTitle}</Text>
      <RenderFlatListView {...props} />
      <RenderBottomView {...props} />
    </View>
  );
}

const RenderFlatListView = (props) => {
  return (
    <ScrollView>
      <View style={styles.scrollview}>
        <FlatList
          data={modalData.participants_list}
          keyExtractor={(item, index) => index}
          style={styles.flatlist}
          // extraData={selectedValue}
          renderItem={({ item, index }) => (
            <View style={styles.listRow}>
              <View style={styles.nameView}>
                <Image
                  source={item.image ? { uri: item.image } : images.demoProfile}
                  style={styles.profileImg}
                />
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <Text style={styles.workoutCount}>
                {item.count} <Text style={styles.workoutTxt}>count</Text>
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  )
}

const RenderBottomView = (props) => {
  return (
    <View>
      <Text style={styles.title}>Live Session</Text>
      <View style={styles.doneView}>
        <Image
          source={images.checkMarkSuccess}
          style={styles.checkImg}
        />
        <Text style={styles.succTxt}>Done</Text>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.leftView}>
          {modalData.duration && (
            <View style={styles.leftTopView}>
              <Image
                source={images.clock}
                style={styles.clock}
              />
              <Text style={styles.timeTxt}>
                {modalData.duration} <Text style={styles.minTxt}>{modalData.durationUnit || "Mins"}</Text>
              </Text>
            </View>
          )}
          <Text style={styles.timeTaken}>Time</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.leftTopView}>
            <Image
              source={images.groupImg}
              style={styles.groupImg}
            />
            <Text style={styles.timeTxt}>{modalData.participants_count}</Text>
          </View>
          <Text style={styles.timeTaken}>Participants</Text>
        </View>

      </View>
      <View style={styles.bottomBtnView}>
        <TouchableOpacity style={[styles.btnStyle, styles.doneBtn]}>
          <Text style={styles.btnTitle}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStyle, styles.shareBtn]}>
          <Image
            source={images.share}
            style={styles.shareImg}
          />
          <Text style={styles.btnTitle}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>)
}

export default GroupWorkoutModal;