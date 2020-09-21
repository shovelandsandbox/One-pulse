import React, { Component } from "react";
import { View, Text, Image, ScrollView, ImageBackground, FlatList } from "react-native";

export default class PulseHealthDetail extends Component {
  render() {
    const { navigation: { state: { params } } } = this.props;
    return (
      <View>
        <Text>{params.payload.title}</Text>
      </View>
    )
  }
}