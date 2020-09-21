import React from "react";
import { View } from "react-native";

import Styles from './styles';

import Logo from "../Logo";
import { PruBackHeader } from "../../../../components";

import { CoreComponents } from "@pru-rt-internal/pulse-common";
const { Languages } = CoreComponents;

const configureHeader = props =>{
  const { needLang, title="" } = props;

  if (needLang) {
    return <Languages
      accesible
      style={Styles.languageText}
      accessibilityLabel="langContainer"
      testID="langContainer"
      indicateColor="#6b6a6d"
    />
  }
    
  return <PruBackHeader title={title} customStyles={{ paddingHorizontal: 0, paddingTop: 0, }}/>;
}

export default AuthWrapper = props => {
  const { children, country, customStyles, ...rest } = props;

  return (
    <View style={{ ...Styles.container, ...customStyles }}>
      { configureHeader(rest) }
      <Logo country={country} />
      <View style={Styles.childrenContainer}>
        { children }
      </View>
    </View>
  )
};
