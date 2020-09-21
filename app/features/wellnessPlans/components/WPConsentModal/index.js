import React from "react";
import { View, Text, TouchableOpacity, } from "react-native";
import PropTypes from "prop-types";
import Styles from "./styles";
import MetaConstants from "../../meta";

const WPConsentModal = ({onpress}) => {
  const metaConstants = { ...MetaConstants.screenMeta() };

  return(
    <View style={Styles.container}>
      <View style={Styles.headerContainer}>
        <Text style={Styles.headerText}>{metaConstants.awesome}</Text>
      </View>
      <View style={Styles.body}>
        <Text style={Styles.bodyText}>{metaConstants.consentBody}</Text>
      </View>
      <TouchableOpacity 
        style={[Styles.buttonContainer, Styles.positiveButtonContainer]} 
        onPress={() => {
          onpress && onpress("true");
        }}
      >
        <Text style={[Styles.buttonText, Styles.postiveButtonText]}>{metaConstants.goForIt}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={Styles.buttonContainer}
        onPress={() => {
          onpress && onpress("false");
        }}
      >
        <Text style={[Styles.buttonText, Styles.negativeButtonText]}>{metaConstants.maybeLater}</Text>
      </TouchableOpacity>
    </View>
  )
};

WPConsentModal.propTypes = {
  onclick: PropTypes.func
}

export default WPConsentModal;
