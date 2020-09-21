import React from "react";
import { Modal, View, SafeAreaView } from "react-native";
import Pdf from "react-native-pdf";
import PdfCloseHeader from "./close-header-pdf";
import styles from "./styles";
const PdfViewer = ({ goForTcAction, termsModal, headerLabel, source }) => {
  return (
    <Modal
      animationType="slide"
      visible={termsModal}
      onRequestClose={() => {
        goForTcAction()
      }}
    >
      <SafeAreaView style={styles.pdfContainer}>
        <PdfCloseHeader
          goForTermsConditions={goForTcAction}
          headerLabel={headerLabel}
        />
        <View style={styles.pdfContainer}>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onError={error => {
              console.log(error);
            }}
            style={styles.pdf}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default PdfViewer;
