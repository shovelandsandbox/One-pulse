import React, { Component, useState } from "react";
import { Modal, View, SafeAreaView, Alert, Platform, PermissionsAndroid } from "react-native";
import Pdf from "react-native-pdf";
import PdfCloseHeader from "./close-header-pdf";
import styles from "./styles";
import RNFetchBlob from "rn-fetch-blob";
import { connect } from "react-redux";
import { pathOr, path } from "ramda";
import Toast from 'react-native-root-toast';
import { default as lang } from "../lang";

class PolicyPdfViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  closeModal = () => {
    const { navigation } = this.props
    navigation.goBack();
  };


  showToast = (successMessage) => {
    Toast.show(successMessage, {
      textColor: '#fff',
      duration: Toast.durations.LONG,
      position: Platform.select({
        ios: Toast.positions.TOP,
        android: Toast.positions.BOTTOM
      }),
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      opacity: Platform.select({
        ios: 1,
        android: .8
      }),
      containerStyle: styles.cntainerStyleToast
    })
  };

  requestStoragePermission = async (downloadData) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: "This app need storage Permission",
          message: "",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('::::granted');
          return this.downloadPdf(downloadData);
        }
        return;
      } else {
        return this.downloadPdf(downloadData);
      }

    } catch (err) {
      console.warn(err);
    }
  };

  downloadPdf = async (downloadData) => {
    const { config, fs } = RNFetchBlob
    let date = new Date();
    let DownloadDir = Platform.select({
      ios: RNFetchBlob.fs.dirs.DocumentDir,
      android: RNFetchBlob.fs.dirs.DownloadDir
    })
    let pdfLocation = DownloadDir + `/${downloadData.fileName}`;
    const successMessage = lang.pdfSuccessMessage();
    const downloadMessageIos = lang.iOSPdfDownlaod();
    let pdfBASE64 = downloadData.source;
    fs.writeFile(pdfLocation, pdfBASE64, 'base64')
      .then((res) => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.previewDocument(pdfLocation);
          this.showToast(downloadMessageIos);
        } if (Platform.OS === 'android') {
          this.showToast(successMessage)
        }
      })
      .catch((err) => this.showToast(err));
  };

  render() {
    const { navigation, pdfLink } = this.props
    const source = navigation.getParam("source");
    const hideDownloadOption = navigation.getParam("hideDownloadOption");
    const downloadData = {
      source: pathOr("", ["response", "body", "content"], pdfLink),
      fileName: pathOr("", ["response", "body", "filename"], pdfLink)
    };
    return (

      <SafeAreaView style={styles.pdfContainer}>
        <PdfCloseHeader
          headerLabel={downloadData.fileName}
          downloadPdf={() => this.requestStoragePermission(downloadData)}
          closeModal={this.closeModal}
          hideDownloadOption={hideDownloadOption}
        />
        <View style={styles.pdfContainer}>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onError={error => { console.warn(error) }}
            style={styles.pdf}
          />
        </View>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => ({
  pdfLink: path(["myPolicy", "showPDFData"], state),

})

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  null
)(PolicyPdfViewer);

