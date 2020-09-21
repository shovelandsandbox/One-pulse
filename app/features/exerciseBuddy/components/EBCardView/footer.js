import React from 'react';
import { Image, View, Text, TouchableOpacity } from "react-native";

import Styles from "./styles";
import styles from "../../screens/EBWorkoutHistory/styles";

import { PruRoundedButton } from "../../../../components";

const NormalFooter = ({ habit, paused, supportAction, mainAction }) => {
  const containerStyles = paused ? 
    {...Styles.footerStartButton, ...Styles.footerContinueButton} : 
    Styles.footerStartButton

  return (
    <View style={Styles.footer}>
      <TouchableOpacity onPress={() => supportAction(habit)}>
        <Text style={Styles.footerDetailButton}>
          {'Help'}
        </Text>
      </TouchableOpacity>
      <PruRoundedButton 
        buttonTitle={paused ? 'Continue': 'Start'}
        style={containerStyles}
        textStyling={Styles.footerStartText}
        onPress={() => mainAction(habit)}
      />
    </View>
  )
}

const CompletedFooter = ({mainAction, habit}) => {
  return (
    <View style={[styles.buttonRow, { justifyContent: 'space-between', marginTop: 8, }]}>
      <View style={styles.completedRow}>
        <Image
          source={images.checkMarkSuccess}
          style={styles.checkImg}
        />
        <Text style={styles.completedTxt}>{'Completed'}</Text>
      </View>
      <PruRoundedButton 
        buttonTitle={'Retry'}
        style={Styles.footerStartButton}
        textStyling={Styles.footerStartText}
        onPress={() => mainAction(habit)}
      />
    </View>
  )
}

export default Footer = ({whichFooter, ...props}) => {
  switch(whichFooter) {
    case 'paused':
      return <NormalFooter paused {...props} />;
    case 'completed':
      return <CompletedFooter {...props} />
    default: 
      return <NormalFooter {...props} />;
  }
}
