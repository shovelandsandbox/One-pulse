import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { CLOSE } from "../../../../config/images";
import styles from "./styles";
import IMAGES from "../../../configs/Images";

const PdfCloseHeader = ({
  downloadPdf,
  closeModal,
  headerLabel,
  hideDownloadOption,
}) => {
  return (
    <View style={styles.pdfHeaderContainer}>
      <View style={styles.headerLeftView}>
        <TouchableOpacity onPress={closeModal}>
          <Image source={CLOSE} style={styles.headerRightImg} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerBody}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {headerLabel}
        </Text>
      </View>
      {!hideDownloadOption && (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={downloadPdf}>
            <Image
              source={IMAGES.illustration.my_policy.ic_download}
              style={styles.headerLeftImg}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default PdfCloseHeader;
