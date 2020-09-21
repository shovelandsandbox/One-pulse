import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { CLOSE_WHITE } from "../../config/images";
const PdfCloseHeader = ({ goForTermsConditions, headerLabel }) => {
  return (
    <View style={styles.pdfHeaderContainer}>
      <View style={styles.headerLeftView} />
      <View style={styles.headerBody}>
        <Text style={styles.headerTitle}>{headerLabel}</Text>
      </View>
      <View style={styles.headerRightContainer}>
        <TouchableOpacity onPress={goForTermsConditions}>
          <Image
            source={CLOSE_WHITE}
            style={styles.headerRightImg}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PdfCloseHeader;
