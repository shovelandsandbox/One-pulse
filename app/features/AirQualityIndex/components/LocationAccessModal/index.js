import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { styles } from './styles'
import metaConstants from "../../meta";
const LocationAccessModal = props => {
  let locationConstants = { ...metaConstants.airQualityScreenMeta() }
  return (
    <Modal
      visible={props.visible}
      transparent={true}
    >
      <View style={styles.viewStyle}>

        <View style={styles.containerStyle}></View>

        <View style={styles.viewContainerStyle}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>{props.title}</Text>
          </View>

          <View style={{}}>
            <Text style={styles.textSize}>{props.body}</Text>

          </View>

          <View style={styles.touchView}>

            <TouchableOpacity onPress={props.close}>
              <Text style={styles.locationMode}>
                {locationConstants.skipText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.requestPermission}>
              <View style={styles.allowLocation}>
                <Text style={styles.allowLocationText}>
                  {locationConstants.allowAccess}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </Modal>
  );
}


export default LocationAccessModal;