/* eslint-disable complexity */
/* eslint-disable react/display-name */
import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";

import { SUCCESS } from "../../../../../config/images";

export default RowItem = ({ item }) => {
  const date = item.date ? item.date : "";
  return (
    <View
      style={
        item.bonusRewarded
          ? [styles.rowItem, styles.highlightedRowItem]
          : styles.rowItem
      }
    >
      <Text
        style={
          item.bonusRewarded
            ? [styles.dateText, styles.highlightedDateText]
            : styles.dateText
        }
      >
        {date}
      </Text>
      <View style={styles.indicatorView}>
        <View
          style={
            item.key == 0
              ? styles.verticalLine
              : [
                  styles.verticalLine,
                  item.taskCompleted
                    ? styles.highlightedVerticalLine
                    : styles.unHighLightedVerticalLine,
                ]
          }
        />
        <View
          style={
            item.taskCompleted
              ? [
                  styles.circularView,
                  item.bonusRewarded
                    ? styles.imageView
                    : styles.highlightedCircularView,
                ]
              : styles.circularView
          }
        >
          {item.bonusRewarded && (
            <Image
              style={styles.image}
              source={SUCCESS}
              resizeMode={"contain"}
            />
          )}
        </View>
        <View
          style={
            item.isLastIndex
              ? styles.verticalLine
              : [
                  styles.verticalLine,
                  item.taskCompleted && !item.bonusRewarded
                    ? styles.highlightedVerticalLine
                    : styles.unHighLightedVerticalLine,
                ]
          }
        />
      </View>
      <Text
        style={
          item.bonusRewarded
            ? [styles.pointText, styles.highlightedPointText]
            : styles.pointText
        }
      >
        {item.point}
      </Text>
      <Text
        style={
          item.bonusRewarded
            ? [styles.descText, styles.highlightedDescText]
            : styles.descText
        }
      >
        {item.desc}
      </Text>
    </View>
  );
};
