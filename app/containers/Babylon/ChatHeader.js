import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { ChatHeader as styles } from './styles';
import { BACK, History_Icon,BABYLON_LOGO_BLUE } from "../../config/images";

export default function ChatHeader(props) {
  const { goback, rightIcon, showHistory } = props;
  return (
    <View style={styles.headerBox}>
      <TouchableOpacity
        onPress={() => goback()}
        accessibilityLabel="home"
        accesible
      >
        <Image style={{ width: 20, height: 15 }} source={BACK} />
      </TouchableOpacity>
      {/* {
        rightIcon ? */}
          <TouchableOpacity
            // onPress={() => showHistory()}
            accessibilityLabel="home"
            accesible
            style={{
              height: "100%",
              alignItems:"center",
              justifyContent:"flex-end"
            }}
          >
            <Image style={{ resizeMode:"cover" }} source={BABYLON_LOGO_BLUE} />
          </TouchableOpacity>
          {/* : null
      } */}

    </View>
  );
}