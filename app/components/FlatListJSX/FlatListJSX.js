import React from "react";
import { FlatList, TouchableOpacity, Image, Text } from "react-native";

export default FlatListJSX = props => {
  const { listData } = props;
  return (
    <FlatList
     horizontal
     data={listData}
     renderItem={({item}) => (
        <TouchableOpacity>
            <Image style={{width:27,height:27,borderRadius:27/2}} source={{uri:item.imageUrl}}/>
        </TouchableOpacity>
    )}
    />
  )
};
