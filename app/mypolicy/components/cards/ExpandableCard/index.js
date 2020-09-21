import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import styles from "./styles";
import Images from "../../../configs/Images";
import { Colors } from "../../../configs";
import { getPolicyStatusComponent } from "../../../utils"
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";

const EachRow = info => {
  const key = info ? info[0] : "";
  const value = info ? info[1] : "";
  if (value) {
    return (
      <View style={styles.infoContainer}>
        <Text style={{...styles.key, ...configureLineHeight("13")}}>{key}</Text>
        <Text style={{...styles.value, ...configureLineHeight("14")}}>{value}</Text>
      </View>
    );
  }

};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableCard = ({
  title,
  contentData = [],
  staticCount = 2,
  onPress = () => { },
  statusColor,
  status
}) => {
  const tagColor =
    statusColor === "green" ? Colors.main.successGreen : Colors.main.errorRed;
  const [showAllContent, setShowAllContent] = useState(true);
  const { ic_down, ic_up } = Images.illustration.my_policy;
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress()}
      onLongPress={() => onPress()}
    >
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={{...styles.title, ...configureLineHeight("14")}}>{title}</Text>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.create(
                  200,
                  LayoutAnimation.Types.easeInEaseOut,
                  LayoutAnimation.Properties.opacity
                )
              );
              setShowAllContent(!showAllContent);
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={showAllContent ? ic_up : ic_down}
                width={13}
                height={7}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: tagColor,
            paddingRight: -18.6,
            marginTop: 16.2,
            width: 8,
            height: 16,
            position: "absolute",
          }}
        />
        {/* <View style={{ paddingBottom: 10.6 }}> */}
        <View style={{ paddingBottom: 10.6, paddingHorizontal: 14.2 }}>
          {contentData &&
            Array.isArray(contentData) &&
            contentData
              .slice(0, showAllContent ? contentData.length : staticCount)
              .map(info => EachRow(info))}
          <View
            style={{
              marginTop: 10,
              alignItems: "flex-end",
              justifyContent: 'center'
            }}>
            {getPolicyStatusComponent(status)}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ExpandableCard;
