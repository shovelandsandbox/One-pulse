import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

const WPSocialInviteType = props => {   
    const {
      item,
      onInvite
    } = props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={e => {
          e.preventDefault();
          onInvite(item.id);
        }}
      >
        <View style={styles.imageContainerStyle}>
          <Image            
            source={item.source}
            resizeMode={"contain"}
            style={item.customStyle}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{item.title}</Text>
        </View>         
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {    
      padding: 10
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",    
    flex: 1
  },
  textStyle: {
    color: "#777777"
  },
  imageContainerStyle: {
    flex: 1,
    alignItems: "center"
  },
  imageStyle: {
    height: 40,
    width: 40
  }
});

export default WPSocialInviteType;
