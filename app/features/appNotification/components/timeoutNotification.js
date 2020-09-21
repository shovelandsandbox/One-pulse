import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { NO_NETWORK } from "../../../config/images";

export default TimeoutNotification = ({ removeNotification }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: "auto",
        padding: 10,
        paddingRight: 22,
        flex: 1,
        position: "absolute",
        width: "100%",
      }}
    >
      <View
        style={{ flex: 1, flexDirection: "row-reverse", height: "100%" }}
      >
        <TouchableOpacity onPress={removeNotification}>
          <Text style={{ fontSize: 10 }}>X</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: "auto",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignContent: "center",
            paddingTop: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "red" }}>
            An error occured
          </Text>
          <Text style={{ fontSize: 12, color: "red" }}>
            Please try after some time
          </Text>
        </View>
        <Image source={NO_NETWORK} style={{ height: 63, width: 63 }} />
      </View>
    </View>
  )
};
