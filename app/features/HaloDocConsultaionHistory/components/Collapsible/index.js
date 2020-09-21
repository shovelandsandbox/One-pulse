
import React from "react";
import {
  NativeModules,
  LayoutAnimation,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Image,
  ImageBackground,
  UIManager,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import {
  events,
  CoreConfig,
  metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from '../../../../actions'
import moment from "moment";
import DetailArrowCell from "../../../../components/DetailArrowCell";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import {
  PlaceholderNric,
  BACK,
  DOCLOGO,
  Bitmap,
  AttachedLink,
  Clock,
  VideoCall,
  LARGEYELLOWROBOT,
  IconChevronUp,
  IconChevronDown,
  Prescription,
  ReferralLetter,
  MedicationCertificate,
  CaseNote,
  Receipt,
  CLOSE,
  AVATAR,
  Message
} from "../../../../config/images";
import styles from './style'
import { path, map } from "ramda";
import MetaConstants from "../../meta";

const {
  HALODOC_SERVICE
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;
class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: 350,
      h: 0,
      openClose: false,
      modalVisible: false,
      accordion: this.props.accordion,
      caseNotes: []
    };
    this.MetaConstants = { ...MetaConstants.consultationHistoryMeta() };
  }

  _onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!this.state.openClose) {

      this.setState({
        openClose: true,
        w: this.state.w,
        h: this.state.h + 100
      });
    } else {
      this.setState({
        openClose: false,
        w: this.state.w,
        h: this.state.h - 100
      });
    }
    this.props.dispatchEvent(events.previousConsultationTileClick)
  };
  componentDidMount() {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }


  goToChat(item) {
    this.setState({
      w: 350,
      h: 0,
      openClose: false
    });
    this.props.navigation.navigate("ConsultationHistoryChat", {
      agentChat: true,
      chathistory: item.status.toUpperCase() === "ACTIVE" ? false : true,
      episodeId: item.id,
      item: item
    });
    this.props.dispatchEvent(events.goToDrChatClick)
  }
  goFile(doc_id) {
    this.setState({
      w: 350,
      h: 0,
      openClose: false
    });
    this.props.navigation.navigate("AllMyFiles", {
      content: {
        consultation_id: doc_id
      }
    });
    this.props.dispatchEvent(events.attachmentClick)
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderDocumentsView(item, name, img_source) {
    return (
      <View style={styles.listDetail}>
        <TouchableOpacity
          onPress={() => {
            this.goFile(item.id);
          }}
          style={{ alignItems: "center" }}
        >
          <Image
            style={styles.badgeImage}
            source={img_source}
            resizeMode="contain"
          />
          <Text style={styles.nameText}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderItem = item => {
    return (
      <View
        style={styles.cardMainView}
      >
        <View style={styles.textView}>
          <Text style={styles.dateText}>
            {this.MetaConstants.dateText}
          </Text>
          <Text>{moment(path(["item", "created_at"], item)).format("DD MMMM YYYY")}</Text>
        </View>
        <View style={styles.textView} >
          <Text
            style={styles.patientText}
          >
            {this.MetaConstants.patientNoteText}
          </Text>
          <Text>{path(["item", "revisions", 0, "patient_note"], item)}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.diagnosisText}>
            {this.MetaConstants.diagnosisText}
          </Text>
          <View style={{ flex: 1, flexWrap: "wrap" }}>
            {map((item) => {
              return <Text>{item.name} . </Text>;
            }, path(["item", "revisions", 0, "icd10Codes"], item))}
          </View>
        </View>
      </View>
    );
  };

  documentCount(item) {
    let count = item.status != "started" ? 1 : 0;  //for digital receipt
    if (item.attributes.prescription) {
      count = count + 1;
    }
    if (item.attributes.doctor_note) {
      count = count + 1;
    }
    if (item.attributes.referral) {
      count = count + 1;
    }
    if (item.attributes.follow_up) {
      count = count + 1;
    }
    return count;
  }

  getDuration = (item) => {
    if (!item || !item.startTime || !item.endTime) {
      return 0;
    }
    const round = (value) => {
      return value.toString().length == 1 ? "0" + value : value
    };
    var ms = moment(item.endTime).diff(moment(item.startTime));
    var d = moment.duration(ms);
    return round(d?._data?.hours) + ":" + round(d?._data?.minutes) + ":" + round(d?._data?.seconds);
  }

  modalView() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert(this.MetaConstants.modalCloseText);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <Image
              style={styles.closeIcon}
              source={CLOSE}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 22 }}>
          <View>
            <FlatList
              data={this.state.caseNotes}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </Modal>
    )
  }
  getStatusTranslatedText(status) {
    return fetchLabel(
      helpers.findElement(HALODOC_SERVICE, status),
      status
    )
  }
  render() {
    const item = this.props.accordion;
    return (
      <View style={styles.container}>
        {this.state.caseNotes.length > 0 && this.modalView()}
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.press}>
            <View style={styles.docName}>
              <View>
                <ImageBackground
                  style={styles.imageDimensions}
                  source={AVATAR}
                >
                  <Image
                    style={styles.imageDimensions}
                    style={[styles.docImage]}
                    source={
                      item.doctor &&
                        path(["doctor", "externalIds"], item) &&
                        path(["doctor", "externalIds", "image_url"], item)
                        ? { uri: path(["doctor", "externalIds", "image_url"], item) }
                        : LARGEYELLOWROBOT
                    }
                  />
                </ImageBackground>
              </View>
              <View>
                <Text style={styles.docText} numberOfLines={1}>{item.attributes.doctor_first_name} {item.attributes.doctor_last_name}</Text>
                <Text style={{ marginTop: 7 }}>{this.getStatusTranslatedText(item.status)}</Text>
                <Text style={{ marginTop: 7 }}>
                  {item.consultationTime
                    ? moment(item.consultationTime.startTime).format(
                      "DD MMMM YYYY"
                    )
                    : ""}
                </Text>
              </View>
              <View
                style={{
                  display: this.state.openClose ? "none" : "flex"
                }}
              >
                <Image style={styles.chevron} source={IconChevronDown} />
              </View>
              <View
                style={{
                  display: !this.state.openClose ? "none" : "flex"
                }}
              >
                <Image style={styles.chevron} source={IconChevronUp} />
              </View>
            </View>

            <View style={styles.funcList}>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Image style={styles.funcList1} source={Clock} />
                <Text style={styles.funcList1Text}>{this.getDuration(item.consultationTime)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
              </View>

              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Image style={styles.funcList1} source={AttachedLink} />
                <Text style={styles.funcList1Text}>
                  {this.documentCount(item)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {this.state.openClose ? (
          <View style={[styles.boxDetail]}>
            <View style={styles.detailArrow}>
              {item.doctor.name.indexOf("Dr") > -1 ? (
                <DetailArrowCell
                  labelText={
                    this.MetaConstants.chatText
                  }
                  hideArrow={false}
                  MessageSign={true}
                  imageIcon={Message}
                  onPress={() => {
                    this.setState({
                      w: 350,
                      h: 0,
                      openClose: false
                    });
                    this.props.navigation.navigate("DoctorChat", {
                      chathistory: true,
                      episodeId: item.id
                    });
                  }}
                />
              ) : (
                  <DetailArrowCell
                    labelText={
                      this.MetaConstants.chatText
                    }
                    hideArrow={false}
                    MessageSign={true}
                    imageIcon={Message}
                    onPress={() => {
                      this.goToChat(item);
                    }}
                  />
                )}
            </View>

            <View style={styles.attach}>
              {this.documentCount(item) > 0 ? (<View style={styles.attachTitle}>
                <Image
                  style={styles.attachTitleImage}
                  source={AttachedLink}
                />
                <Text style={styles.attachTitleText}>
                  {
                    this.MetaConstants.attachmentText
                  }
                </Text>
              </View>) : null}
              <View style={styles.attachList}>
                {item.status != "started" && this.renderDocumentsView(item, this.MetaConstants.recieptText, CaseNote)}
                {item.attributes.prescription &&
                  this.renderDocumentsView(
                    item,
                    this.MetaConstants.prescriptionText,
                    Prescription
                  )}
                {item.attributes.doctor_note &&
                  this.renderDocumentsView(item, this.MetaConstants.noteText, CaseNote)}
                {item.attributes.referral &&
                  this.renderDocumentsView(item, this.MetaConstants.referralText, ReferralLetter)}
                {item.attributes.follow_up &&
                  this.renderDocumentsView(item, this.MetaConstants.followUpText, Prescription)}
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    language: state.userPreferences.language,
  };
};

export default connect(mapStateToProps, {
  dispatchEvent,
})(Accordion);
