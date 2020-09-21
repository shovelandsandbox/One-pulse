import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  PermissionsAndroid,
  CameraRoll,
  Share
} from "react-native";
import React, { PureComponent } from "react";
import Pdf from "react-native-pdf";
import RNFetchBlob from "rn-fetch-blob"
import { path } from "ramda";
import RNFS from 'react-native-fs';
import {
  metaHelpers,
  CoreConstants,
  CoreComponents,
  CoreActionTypes,
  CoreConfig,
  CoreUtils,
  colors,
  events
} from "@pru-rt-internal/pulse-common";
const {
  pageKeys,
  TALKTOADOCTOR
} = CoreConfig;
import { connect } from "react-redux";
import {
  Bitmap,
  CLOSE,
  DOWNLOAD_ICON
} from "../../../config/images";
import moment from "moment";
import * as ActionTypes from "../../../actions/Types";
import styles from "./styles";
import { dispatchEvent } from "../../../actions";
const {
  ALL_MY_FILES_TITLE,
  ALL_MY_FILES_RECIEVED,
} = CoreConstants;

class AllMyFilesScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgModalVisible: false,
      source: "",
      path: "",
      sourceType: "",
      fileType: "",
      fileName: ""
    };
  }

  componentDidMount() {
    this.props.dispatchEvent(events.MyDocAllMyFilesScreen)
    let date = moment().format("YYYY-MM-DD");
    const list = path(["navigation", "state", "params", "list"], this.props);
    if (!list) {
      this.props.findDocumentsByCriteria(date);
    }
  }

  showMyDocFile = data => {
    this.setState({
      imgModalVisible: true,
      source: data.content,
      path: data.contentType.indexOf("pdf") > -1,
      sourceType: data.contentType,
    });
  };

  download = () => {
    let device_path = RNFetchBlob.fs.dirs;
    if (Platform.OS === "ios") {
      device_path = RNFS.CachesDirectoryPath;
      this.writeFile(device_path);
    } else {
      try {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        granted.then(res => {
          if (res === PermissionsAndroid.RESULTS.GRANTED) {
            this.writeFile(device_path.DownloadDir);
          }
        });
      } catch (err) {
        console.warn(err);
      }
    }
  }

  writeFile = (device_path) => {
    var path = `${device_path}/${this.state.fileName}`;
    RNFS.writeFile(path, this.state.source, 'base64')
      .then((success) => {
        alert("Successfully downloaded")
        if (Platform.OS === "ios") {
          if (this.state.fileName.includes(".pdf")) {
            Share.share({
              url: path
            });
          }
          CameraRoll.saveToCameraRoll(path, 'photo');
        }
      })
      .catch((error) => {
        alert("Download failed")
      });
  }

  render() {
    const list = path(["navigation", "state", "params", "list"], this.props);
    const myDocProfile = list ? list : (this.props.myDocProfile
      ? [...this.props.myDocProfile]
      : []);

    const source = { uri: "data:application/pdf;base64," + this.state.source };
    const allMyFilesTitleLabel = metaHelpers.findElement(TALKTOADOCTOR, ALL_MY_FILES_TITLE).label;
    const allMyFilesRecievedLabel = metaHelpers.findElement(TALKTOADOCTOR, ALL_MY_FILES_RECIEVED).label;

    return (
      <View style={styles.All}>
        <View style={styles.medicalTitle}>
          <Text style={styles.medicalText}>{allMyFilesTitleLabel}</Text>
        </View>

        <ScrollView>
          {myDocProfile.map((item, index) => {
            let type = false;
            let tempDate = moment(item.auditDetail.updateTime ? item.auditDetail.updateTime : item.auditDetail.createTime).format("DD/MM/YYYY");
            if (
              this.date !== tempDate
            ) {
              this.date = tempDate;
              type = true;
            }
            return (
              <View key={index}>
                {type ? (
                  <View>
                    <Text style={styles.date}>{this.date}</Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={styles.listFile}
                  onPress={() => {
                    this.setState({ fileType: item.category, fileName: item.filename });
                    this.props.getfindDocument(
                      item.filename,
                      item.category,
                      this.showMyDocFile
                    )
                  }}>
                  <View style={styles.ListFileDetail}>
                    <View style={styles.detailFile}>
                      <Image style={styles.bitmap} source={Bitmap} />
                      <View style={styles.fileTitle}>
                        <Text style={styles.titleText}>{item.filename}</Text>
                        <Text style={styles.fileTime}>
                          {`${allMyFilesRecievedLabel} ${moment(
                            item.auditDetail.updateTime ? item.auditDetail.updateTime : item.auditDetail.createTime
                          ).format("DD MMMM YYYY h:mm A")}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {this.state.imgModalVisible ? (
          <View style={styles.imgModalContainer}>
            <View style={styles.imgModalContent}>
              <View>
                <TouchableOpacity style={{ paddingRight: 10 }}
                  onPress={() => { this.download(); }} >
                  <Image style={{
                    width: 28, height: 28,
                  }} source={DOWNLOAD_ICON} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.closeButton}>
              <View>
                <TouchableOpacity onPress={() => { this.setState({ imgModalVisible: false }) }} >
                  <Image style={{
                    width: 28, height: 28,
                  }} source={CLOSE} />
                </TouchableOpacity>
              </View>
            </View>
            {
              this.state.sourceType != "application/pdf" ?
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }} >
                  <Image style={{
                    width: 400, height: 400, marginTop: 50, resizeMode: 'contain',
                  }} source={{ uri: `data:image/jpeg;base64,${this.state.source}` }} />
                </View> : <Pdf
                  source={source}
                  onLoadComplete={(numberOfPages, filePath) => {
                    // console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    // console.log(`current page: ${page}`);
                  }}
                  onError={(error) => {
                    // console.log(error);
                  }}
                  style={{ flex: 1, backgroundColor: "#fff" }} />
            }
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userLanguagePreference: state.userPreferences.language,
    myDocProfile: state.consultationHistory.documents
  };
};
export default connect(
  mapStateToProps,
  {
    dispatchEvent,
    findDocumentsByCriteria: date => ({
      context: pageKeys.MY_DOC_CHAT_SCREEN,
      type: ActionTypes.GET_MYDOC_PROFILE,
      payload: {
        date,
      },
    }),
    getfindDocument: (fileName, docType, callback, type) => {
      return {
        context: pageKeys.MY_DOC_CHAT_SCREEN,
        type: ActionTypes.MYDOC_GET_IMG_BASE,
        payload: {
          fileName,
          docType,
          callback,
          type,
          fileStatus: true,
        },
      };
    },
  })(AllMyFilesScreen);