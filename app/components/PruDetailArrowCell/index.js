import React from "react";
import { Text, View, TouchableOpacity, Image, Switch } from "react-native";
import PropTypes from "prop-types";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
import { DETAIL_ARROW } from "../../config/images";
import Style from "./styles";

const whichThirdColumn = (column, configs) => {
  switch (column) {
    case "switchButton":
      return <Switch {...configs} />;
    case "arrow":
      return (
        <Image
          style={Style.thirdView}
          source={DETAIL_ARROW}
          resizeMode={"contain"}
        />
      );
    case "text":
      return <Text style={{...Style.thirdColumnText, ...configureLineHeight("14")}}>{configs}</Text>;
  }
};

const prepareConfig = props => {
  const { thirdComponent, onclick, switchValue, thirdColumnText } = props;

  switch (thirdComponent) {
    case "switchButton":
      return {
        thumbColor: "#fff",
        value: switchValue,
        onTintColor: "#EC1B2E",
        onValueChange: () => {
          onclick && onclick();
        },
      };
    case "arrow":
      return;
    case "text":
      return thirdColumnText;
  }
};

const addSpacing = icon => {
  if (icon) {
    return Style.addSpacing;
  }
  return null;
};

const PruDetailArrowCell = props => {
  const { icon, cellName, thirdColumn, onclick, thirdComponent } = props;

  return (
    <TouchableOpacity
      style={Style.container}
      onPress={() => {
        onclick && onclick();
      }}
    >
      <View style={Style.firstView}>
        {icon && (
          <Image style={Style.icon} resizeMode={"contain"} source={icon} />
        )}
        <Text style={[{...Style.cellName, ...configureLineHeight("14")}, addSpacing(icon)]}> {cellName} </Text>
      </View>
      <View style={Style.secondView}>
        {thirdColumn
          ? whichThirdColumn(thirdComponent, prepareConfig(props))
          : null}
      </View>
    </TouchableOpacity>
  );
};

PruDetailArrowCell.propTypes = {
  icon: PropTypes.instanceOf(Object),
  cellName: PropTypes.string.isRequired,
  thirdColumn: PropTypes.bool,
  onclick: PropTypes.func,
  thirdComponent: PropTypes.string,
};

export default PruDetailArrowCell;
