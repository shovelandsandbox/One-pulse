import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

const WPInviteHeader = props => {
    const {
      description,
      leftUri,
      rightUri,
      onClose
    } = props;    

    return (
      <View style={styles.conatiner}>
        <View style={styles.leftContainerStyle}>
          <Image            
            source={leftUri}
            style={styles.imageStyle}
          />
        </View>     
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{description}</Text>
        </View>      
        <View style={styles.rightContainerStyle}>
          <TouchableOpacity
            style={styles.rightImgButtonStyle}
            onPress={onClose}            
          >
            <Image                
                source={rightUri}
                style={styles.imageStyle}
            />
          </TouchableOpacity>          
        </View>                   
      </View>
    );
}

const styles = StyleSheet.create({
  conatiner: {
      flexDirection: "row",
      backgroundColor: "#e11a2c",
      padding: 5
  },
  textContainer: {  
    flex: 3.5,  
    paddingHorizontal: 5     
  },
  textStyle: {
    color: "#ffffff",
    fontSize: 12
  },
  leftContainerStyle: {
    flex: 0.25,
    alignSelf: "center"
  },
  rightContainerStyle: {
    flex: 0.25,
    justifyContent:"center"
  },
  rightImgButtonStyle: {
    justifyContent: "center",
    alignItems: "flex-end"
  },
  imageStyle: {
    height: 20,
    width: 20
  }
});

export default WPInviteHeader;
