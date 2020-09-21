/* eslint-disable complexity */
import React, { PureComponent } from "react";
import { View, Platform } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import { HistoryProgressBlinker as HistoryProgressBlinkerCard } from "../index";
import { TextMX, TextXS } from "../../derivatives/Text";
import Icon from "../../generics/Icon";
import moment from "moment";

const historyMeta = (meta, type) => {
  const items = meta.find(item => item.key === type);
  return items === undefined ? type : items.label;
};

export default class HistoryProgressHead extends PureComponent {
  render() {
    let dateRender = null;
    if (this.props.date) {
      dateRender = (
        <TextXS color={Colors.main.borderGray}>{moment(this.props.date).format('DD MMM YYYY HH:mm')}</TextXS>
      );
    }

    return (
      <View style={Styles.head.icon.parent}>
        <View
          style={[
            Styles.head.icon.leftBorder,
            {
              borderColor: !this.props.isActiveWithNoChild
                ? this.props.color
                : Colors.main.borderGray,
            },
            this.props.isLast
              ? { borderColor: Colors.main.transparent, paddingBottom: 0 }
              : {},
          ]}
        />
        <View style={Styles.head.container}>
          <View
            style={[
              Styles.head.detail.container,
              !this.props.date ? { top: 0 } : {},
            ]}
          >
            {dateRender}

            <TextMX color={!this.props.date ? Colors.main.borderGray : null}>
              {historyMeta(this.props.meta, this.props.title)}
            </TextMX>
          </View>

          <View
            style={[
              Styles.head.icon.container,
              { backgroundColor: this.props.color },
            ]}
          >
            {Platform.OS === "ios" ? (
              <HistoryProgressBlinkerCard
                color={this.props.color}
                top={0}
                left={0}
                size={24}
                maxSize={40}
                isActive={
                  this.props.status != "NEXT" && this.props.isActiveWithNoChild
                }
              />
            ) : null}

            <Icon
              name={this.props.icon}
              color={Colors.main.baseWhite}
              size={this.props.icon == "checked-small" ? 16 : 20}
            />
          </View>
        </View>
      </View>
    );
  }
}
