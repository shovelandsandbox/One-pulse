import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Consultation_Summary } from "../../config/images";
class PruimageCard extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          height: 200,
          width: 200,
          backgroundColor: "lightgrey",
          margin: 20,
          elevation: 2,
          borderRadius: 25
        }}
      >
        <TouchableOpacity>
          <Image
            style={{ height: 200, width: 200, borderRadius: 20 }}
            source={Consultation_Summary}
            resizeMode="stretch"
          ></Image>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: "20%",
              width: 200,
              opacity: 0.95,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "green",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15
            }}
          >
            <Text>This is my image</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity activeOpacity={0.8}>
          <Image
            style={{ height: 200, width: 200 }}
            source={Consultation_Summary}
            resizeMode="stretch"
          ></Image>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: "20%",
              width: 200,
              opacity: 0.95,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "green",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15
            }}
          >
            <Text>This is my image</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default PruimageCard;
