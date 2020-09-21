import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  Platform,
  Dimensions,
  Alert,
  BackHandler,
  SafeAreaView
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import styles from "./styles";
import { Theme } from "../../../themes";
const { Colors, Fonts, Styles } = Theme;
import { path } from "ramda";
import {
  CoreConfig,
  CoreActionTypes,
  CoreConstants,
  CoreUtils,
  metaHelpers,
  CoreActions, colors,
  events
} from "@pru-rt-internal/pulse-common";
import { PruKeyboardAvoidingView } from "../../../components";
import { PLANE, NEWCAMERA, NEWFILE, CLOSE_ICON, CLOSE, AttachedLink } from "../../../config/images";
import { ChatUserMessage } from "../PatientChatMessage";
import DoctorChatBotMessage from "../DoctorChatBotMessage";
import DoctorCard, { TryAgain } from "../DoctorCard";
import MetaConstants from "./meta";
const {
  SCREEN_KEY_MANAGE_PROFILE,
  CONSULTATION_TIME_OUT_VALUE,
  TALKTOADOCTOR,
  PRECON_WE_ARE_SORRY,
  PRECON_QUESTION_APPOINT_CONF,
  PRECON_BACK_TO_HOME,
  PRECON_QUESTION_DOCS_PREPPED
} = CoreConstants;
const {
  pageKeys,
  KEY_CAMERA_PERMISSION,
} = CoreConfig;
import moment from "moment";
import OpenSettings from "react-native-open-settings";
import { dispatchEvent } from "../../../actions";

const { isNilOrEmpty } = CoreUtils;
const { toggleLoader } = CoreActions;
const { height } = Dimensions.get("window");
let isDidMount = false;

const isConsultationInProgress = (appointmentDate) => {
  if (appointmentDate) {
    const isRequestTimedOut = CONSULTATION_TIME_OUT_VALUE > (moment() - moment(appointmentDate));
    return isRequestTimedOut;
  }
  return false;
};
let consultationWaitTimer = null;
let consultationEndTime = null;

class PreConsultationQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionIdx: -1,
      answerText: "",
      questionnaireCompleted: false,
      fileIndex: 0,
      buttonType: 1,
      questionnaireLog: [],
      modalVisible: false,
      questionnaireType: false,
      imgModalVisible: false,
      source: "",
      path: "",
      flexPosition: 20
    };
    this.answersObj = [];
    this.fileArr = [];
    this.imageList = [];
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    this.options = [
      this.metaConstants.preConQuestionChokingLabel,
      this.metaConstants.preConQuestionBreathingLabel,
      this.metaConstants.preConQuestionChestPainLabel,
      this.metaConstants.preConQuestionWeaknessLabel,
      this.metaConstants.preConQuestionSpeechDifficultyLabel,
      this.metaConstants.preConQuestionConsciousnessLossLabel,
      this.metaConstants.preConQuestionSuicidalLabel,
      this.metaConstants.preConQuestionSeizuresLabel,
      this.metaConstants.preConQuestionBleedingLabel,
      this.metaConstants.preConQuestionSeverePainLabel,
      this.metaConstants.preConQuestionHallucinationsLabel,
      this.metaConstants.preConQuestionBrokenBonesLabel,
    ];
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    // chatType 1: start 2: end 3: chat
    const chatType = path(["navigation", "state", "params", "chatType"], this.props);
    let num = this.state.buttonType;
    console.log('component did mount preconsultaiton questionaier chatType', chatType);
    if (!chatType) {
      this.askNextQuestion();
    }
    isDidMount = true;
    if (chatType === 1 || chatType === 2) {
      if (isConsultationInProgress(this.props.appointmentDate)) {
        this.state.questionnaireLog.push({
          question: this.metaConstants.preConQuestionMyDocRequestSent,
          type: "textInput",
          isQuestion: true,
        });
        if (this.props.consultationStatus === 3) {
          this.state.questionnaireLog.push({
            question: this.metaConstants.preConQuestionAppointmentConfirmed,
            type: "textInput",
            isQuestion: true,
          });
          this.state.questionnaireLog.push({
            question: "",
            isQuestion: true,
            isPrompt: true,
          });
          this.state.questionnaireLog.push({
            isDoctorName: true,
            question: this.props.doctorName,
            type: "card",
            isQuestion: true,
            time: this.props.appointmentDate && moment(this.props.appointmentDate).format("DD MMMM YYYY h:mm A")
          });
        }
      } else {
        this.state.questionnaireLog.push({
          isDoctorName: true,
          question: this.props.doctorName,
          type: "card",
          isQuestion: true,
        });
        this.state.questionnaireLog.push({
          question: this.metaConstants.preConQuestionDocsPrepped,
          type: "textInput",
          isQuestion: true,
          title: "Back to Home",
          isBack: true,
        });
      }
      this.setState({ buttonType: num + 1, questionnaireLog: this.state.questionnaireLog });
    }
    this.props.dispatchEvent(events.MyDocPreConsultationQuestionScreen)
    this.props.toggleLoader(false);
    if (this.props.appointmentDate) {
      const timeLeft = CONSULTATION_TIME_OUT_VALUE + this.timeElapsed();
      consultationWaitTimer = setTimeout(() => {
        this.props.consultationRequestTimedOut(this.props.consultationId);
      }, timeLeft);
      consultationEndTime = setTimeout(() => {
        this.initializeData();
      }, timeLeft);
    }
  }

  timeElapsed = () => {
    return moment(this.props.appointmentDate) - moment();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let num = prevState.buttonType;
    let newState = prevState;
    const chatType = path(["navigation", "state", "params", "chatType"], nextProps);
    const types = newState.questionnaireLog.filter(item => item.isDoctorName);
    const isBack = newState.questionnaireLog.filter(item => item.isBack);
    const isGoToHome = newState.questionnaireLog.filter(item => item.isGoToHome);
    const preConWeAreSorryLabel = metaHelpers.findElement(TALKTOADOCTOR, PRECON_WE_ARE_SORRY).label;
    const preConQuestionAppointmentConfirmed = metaHelpers.findElement(TALKTOADOCTOR, PRECON_QUESTION_APPOINT_CONF).label;
    const preConBackToHomeLabel = metaHelpers.findElement(TALKTOADOCTOR, PRECON_BACK_TO_HOME).label;
    const preConQuestionDocsPrepped = metaHelpers.findElement(TALKTOADOCTOR, PRECON_QUESTION_DOCS_PREPPED).label;
    if (chatType === 3) {
      return null;
    } else {
      if (nextProps.consultationStatus <= -1 && isGoToHome.length === 0) {
        newState.questionnaireLog.push({
          question: preConWeAreSorryLabel,
          type: "textInput",
          isQuestion: true,
          title: preConBackToHomeLabel,
          isBack: true,
        });
        newState.buttonType = num + 1;
      } else if (nextProps.consultationId && nextProps.consultationStatus && nextProps.doctorName && types.length === 0 && (!chatType || chatType === 1) && isDidMount) {
        consultationWaitTimer && clearTimeout(consultationWaitTimer);
        newState.questionnaireLog.push({
          question: preConQuestionAppointmentConfirmed,
          type: "textInput",
          isQuestion: true,
        });
        newState.questionnaireLog.push({
          question: "",
          isQuestion: true,
          isPrompt: true,
        });
        newState.questionnaireLog.push({
          isDoctorName: true,
          question: nextProps.doctorName,
          type: "card",
          isQuestion: true,
          time: nextProps.appointmentDate && moment(nextProps.appointmentDate).format("DD MMMM YYYY h:mm A")
        });
        newState.buttonType = num + 1;
      } else if (!isConsultationInProgress(nextProps.appointmentDate) && isBack.length === 0 && chatType) {
        newState.questionnaireLog.push({
          question: preConQuestionDocsPrepped,
          type: "textInput",
          isQuestion: true,
          title: preConBackToHomeLabel,
          isBack: true,
        });
        newState.buttonType = num + 1;
      }
      return { ...newState };
    }
  }

  initializeData = () => {
    if (!isConsultationInProgress(this.props.appointmentDate)) {
      this.props.initializeData();
    }
  };

  _keyboardDidShow = () => {
    this.setState({ flexPosition: 220 });
  }

  _keyboardDidHide = () => {
    this.setState({ flexPosition: 10 });

  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
    isDidMount = false;
    consultationWaitTimer && clearTimeout(consultationWaitTimer);
    consultationEndTime && clearTimeout(consultationEndTime);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userLanguagePreference !== nextProps.userLanguagePreference) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  goBack = () => {
    this.props.navigation.popToTop();
    return true;
  };

  askNextQuestion = () => {
    console.log("props", this.props);
    const { currentQuestionIdx } = this.state;
    const { preConsultationQuestions } = this.props;
    const nextIdx = currentQuestionIdx + 1;
    const currentQuestion = preConsultationQuestions.questions[nextIdx];
    if (!currentQuestion) {
      this.state.questionnaireLog.push({
        question: "Please Note！\n1.Make sure you are in an area where your device has good internet connectivity. \n2.Once the request for consultation is sent,  it cannot be recalled or cancelled.",
        type: "textInput",
        isQuestion: true,
        isTextBox: true,
      });
      this.setState({ questionnaireCompleted: true, questionnaireType: false, questionnaireLog: this.state.questionnaireLog });
      return;
    }

    this.state.questionnaireLog.push({
      question: currentQuestion.question,
      type: "textInput",
      isQuestion: true,
    });
    if (this.state.questionnaireLog.length === 5) {
      this.setState({ questionnaireType: true });
    }
    this.setState({ currentQuestionIdx: nextIdx, questionnaireLog: this.state.questionnaireLog });
  };

  answerQuestion = (answerText, imgBase) => {
    if (isNilOrEmpty(answerText) && isNilOrEmpty(imgBase)) {
      return;
    }
    const { currentQuestionIdx } = this.state;
    const { preConsultationQuestions } = this.props;
    const currentQuestion = preConsultationQuestions.questions[currentQuestionIdx];

    this.answersObj.push({
      question: currentQuestion.question,
      options: [
        {
          value: answerText,
        },
      ],
    });

    this.state.questionnaireLog.push({
      question: answerText,
      type: "textInput",
      isQuestion: false,
      imgBase
    });
    this.setState({ answerText: "", questionnaireLog: this.state.questionnaireLog });
    this.askNextQuestion();
  };

  userAnswerMessage = (answerText, imgBase) => {
    this.state.questionnaireLog.push({
      question: answerText,
      type: "textInput",
      isQuestion: false,
      imgBase
    });
    this.setState({ answerText: "", questionnaireLog: this.state.questionnaireLog });
  };

  getNextSlot = () => {
    const { appointmentDate } = this.props;
    const roundedUpTime =
      Math.ceil(
        moment(appointmentDate)
          .add(15, "minutes")
          .minute() / 15
      ) * 15;
    if (roundedUpTime === 15 && moment(appointmentDate).minute() !== 0) {
      return moment(appointmentDate)
        .minute(roundedUpTime)
        .second(0)
        .add("1", "hour");
    }
    return moment(appointmentDate)
      .minute(roundedUpTime)
      .second(0);
  };

  submit = (doctorType) => {
    if (doctorType) {
      const appointmentDate = this.getNextSlot().format("YYYY-MM-DD HH:mm:ss");
      this.props.setAppointmentDate(appointmentDate);
    }
    const answersObj = [];
    const answersFile = [];
    this.answersObj.forEach((item) => {
      answersObj.push(item)
    });
    console.log("answersObj", answersObj);
    console.log("answersFile", answersFile);

    const content = {
      questions: answersObj || '',
    };

    const later = path(["navigation", "state", "params", "later"], this.props);
    const appointmentId = path(["navigation", "state", "params", "id"], this.props);
    console.log('this.props-this.props-this.props', this.props);
    const { paymentMode } = this.props;
    if (later) {
      this.state.questionnaireLog.push({
        question: this.metaConstants.preConConsulRequestSentLabel,
        type: "textInput",
        isQuestion: true,
      });
      let num = this.state.buttonType;
      this.setState({ buttonType: num + 1, questionnaireLog: this.state.questionnaireLog });
      this.props.updatePreConLaterQuestions(content, appointmentId);
      this.props.requestConsultation(paymentMode);
    } else {
      const { doctorId, orderRef } = this.props;
      this.state.questionnaireLog.push({
        question: this.metaConstants.preConConsulRequestSentLabel,
        type: "textInput",
        isQuestion: true,
      });
      let num = this.state.buttonType;
      this.setState({ buttonType: num + 1, questionnaireLog: this.state.questionnaireLog });
      this.props.updatePreConQuestions(content, doctorId, orderRef, this.setTryAgain, this.updateImage, paymentMode);
    }
  };

  updateImage = () => {
    this.imageList.map(item => {
      this.getChildFile(item.file, item.name);
    });
  };

  setTryAgain = () => {
    let num = this.state.buttonType;
    const types = this.state.questionnaireLog.filter(item => item.isTryAgain);
    if (types.length === 0) {
      this.state.questionnaireLog.push({
        question: this.metaConstants.preConWeAreSorryLabel,
        type: "textInput",
        isQuestion: true,
      });
      this.state.questionnaireLog.push({
        isDoctorName: true,
        question: '',
        type: "button",
        isQuestion: true,
      });
      this.setState({ buttonType: num + 1, questionnaireLog: this.state.questionnaireLog });
    }
  };

  handleBlur() {
    Keyboard.dismiss();
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  _onClickRelation = (item) => {
    if (item.key === 1) {
      this.answerQuestion("No");
      this.props.dispatchEvent(events.MyDocPreConsultationQuestionNoClick)
    } else {
      this.setState({ questionnaireType: false });
      this.props.dispatchEvent(events.MyDocPreConsultationQuestionYesClick)
    }
  };

  _renderRelations = () => {
    const relations = [{ name: this.metaConstants.preConNoLabel, key: 1 }, { name: this.metaConstants.yesLabel, key: 0 }];
    return relations.map((relation, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{ width: "50%", borderRightWidth: index === 0 ? 1 : 0, borderColor: '#D6D6D6', height: 52, justifyContent: 'center', paddingTop: 16 }}
          onPress={() => {
            this._onClickRelation(relation);
          }}
        >
          <Text style={{ textAlign: "center", marginBottom: 10, color: '#515B61', fontSize: 14, fontFamily: 'Avenir-Heavy', }}>
            {relation.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  renderUserInput = () => {
    const later = path(["navigation", "state", "params", "later"], this.props);
    const chatType = path(["navigation", "state", "params", "chatType"], this.props);
    const startConsultation = this.props.now || later;
    if (this.state.questionnaireType) {
      return (
        <View style={[styles.bottomView, { flexDirection: "row", justifyContent: "center", paddingHorizontal: 20 }]}>
          {this._renderRelations(this.state.listData)}
        </View>
      )
    } else if (!this.state.questionnaireCompleted) {
      return (
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {
              // this.getFiles();
              this.showModal();
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.enterButton}
              source={AttachedLink}
            />
          </TouchableOpacity>
          <TextInput
            onBlur={this.handleBlur}
            style={styles.chatInsertBox}
            onChangeText={answerText => this.setState({ answerText })}
            value={this.state.answerText}
            underlineColorAndroid="#F1F1F1"
          />
          <TouchableOpacity
            onPress={() => {
              if (chatType === 3) {
                this.userAnswerMessage(this.state.answerText);
              } else {
                this.answerQuestion(this.state.answerText);
              }
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.enterButton}
              source={PLANE}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.bottomViewNext}>
        <TouchableOpacity
          style={styles.bottomButtonContainer}
          onPress={() => {
            this.props.dispatchEvent(events.MyDocPreConsultationQuestionSubmitClick)
            this.submit();
          }}
        >
          <Text style={styles.buttonText}>
            {startConsultation ? this.metaConstants.preConSubmitLabel : this.metaConstants.preConBookAppointmentLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderQuestionnaireLog = () => {
    return (
      <View style={{ marginTop: Platform.OS === "ios" ? 20 : this.state.flexPosition }}>
        <FlatList
          ref={ref => (this.flatList = ref)}
          onContentSizeChange={() => {
            setTimeout(() => {
              this.flatList && this.flatList.scrollToEnd({ animated: true });
            });
          }}
          onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          style={styles.flexStyle}
          data={this.state.questionnaireLog}
          renderItem={this.renderItem}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  renderItem = (data) => {
    const profilePicture = this.props.profilePicture ? this.props.profilePicture : "";
    const { item, index } = data;
    const chatType = path(["navigation", "state", "params", "chatType"], this.props);
    const countryCode = this.props.countryCommonMeta.countryCode2;
    let pleaseNoteTextItems = [
      this.metaConstants.preConMakeSureInternetLabel,
      this.metaConstants.preConOnceConsulSentLabel,
      this.metaConstants.preConAverageWaitTimeLabel,
      this.metaConstants.preConSwitchOnNotificationLabel,
      this.metaConstants.preConMyDocHotlineLabel
    ]
    if (countryCode == "SG") {
      pleaseNoteTextItems = [
        this.metaConstants.preConMakeSureInternetLabel,
        this.metaConstants.preConOnceConsulSentLabel,
        this.metaConstants.preConAverageWaitTimeLabel,
        this.metaConstants.preConSwitchOnNotificationLabel
      ]
    }
    if (item.isTextBox) {
      return (
        <DoctorChatBotMessage key={index}>
          <View style={{ paddingRight: 20, paddingLeft: 10 }}>
            <Text style={styles.pleaseNoteText}>
              {this.metaConstants.preConPleaseNoteLabel}
            </Text>
            {
              pleaseNoteTextItems.map((pleaseNoteItem, pleaseNoteIndex) => {
                return (<View style={{ flexDirection: "row" }}>
                  <View style={{ paddingRight: 5 }}>
                    <Text style={styles.pleaseNoteText}>{pleaseNoteIndex + 1}. </Text>
                  </View>
                  <View>
                    <Text style={styles.pleaseNoteText}>
                      {pleaseNoteItem}
                    </Text>
                  </View>
                </View>);
              })
            }
          </View>
        </DoctorChatBotMessage>
      );
    } else if (item.isPrompt) {
      return (
        <DoctorChatBotMessage key={index}>
          <View>
            <Text style={{ marginBottom: 10, color: "#210000", fontSize: 14, fontFamily: "Avenir-Heavy", }}>
              {this.metaConstants.preConEmergencyNumberLabel}
            </Text>
            {
              this.options.map((option, index) => {
                return (
                  <View key={index}>
                    <Text style={{ color: "#210000", fontSize: 12, fontFamily: "Avenir-Heavy" }}>{`- ${option.replace("]", "")}`}</Text>
                  </View>
                );
              })
            }
          </View>
        </DoctorChatBotMessage>
      );
    } else if (item.type === "button") {
      return (
        <DoctorChatBotMessage
          key={index}
          type="card"
        >
          <TryAgain
            style={{ fontSize: 14, fontFamily: "Avenir-Medium" }}
            key={index}
            submit={() => this.submit(true)}
          />
        </DoctorChatBotMessage>
      );
    } else if (item.type === 'chat') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
          <View style={{ width: '70%', borderRadius: 19, height: 38, backgroundColor: '#e3e3e3' }}>
            <Text style={{ fontSize: 14, fontFamily: "Avenir-Medium", color: '#fff', textAlign: 'center', lineHeight: 38 }}>{item.question}</Text>
          </View>
        </View>
      );
    } else if (item.type === 'card') {
      return (
        <DoctorChatBotMessage
          key={index}
          type="card">
          <DoctorCard
            style={{ fontSize: 14, fontFamily: "Avenir-Medium" }}
            key={index}
            doctorName={item.question}
            navigation={this.props.navigation}
            time={item.time}
            imgBase={item.imgBase}
            profilePicture={profilePicture}
            type={(chatType === 1 || !chatType) ? 'care' : 'final'}
          />
        </DoctorChatBotMessage>
      );
    } else if (!item.isQuestion) {
      return (
        <ChatUserMessage
          style={{ fontSize: 14, fontFamily: "Avenir-Medium" }}
          key={index}
          value={item.question}
          item={item}
          imgBase={item.imgBase ? { uri: `data:image/jpeg;base64,${item.imgBase}` } : item.imgBase}
          profilePicture={profilePicture}
          imgPress={() => {
            if (item.imgBase) {
              this.setState({
                imgModalVisible: true,
                source: item.imgBase,
                path: "",
              });
            }
          }}
        />
      );
    } else {
      return (
        <DoctorChatBotMessage
          key={index}
          value={item.question}
          title={item.title}
          data={item.title ? {} : null}
          isChat={chatType === 3}
          goToChatHome={() => {
            if (item.title) {
              this.initializeData();
              this.goBack()
            }
          }}
        />
      )
    }
  };

  showCamera = () => {
    const cameraPermission = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CAMERA_PERMISSION
    ).label;

    ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      useFrontCamera: true,
      includeBase64: true,
      compressImageQuality: 0.7,
      photo: "photo",
    })
      .then((data) => {
        console.log("ImagePicker", data);
        const file = data.data;
        const time = new Date().getTime();
        // const name =data.filename;
        // const name = data.hasOwnProperty("filename") ? data.filename : data.path.substr(data.path.lastIndexOf("/") + 1);
        const name = "pic" + time + ".jpg";
        console.log("android filename", name);

        const chatType = path(["navigation", "state", "params", "chatType"], this.props);
        this.callback(chatType, file);
        this.imageList.push({
          file,
          name,
        });
        this.setState({
          modalVisible: false,
        });

        // this.getChildFile(file, name);
      })
      .catch(error => {
        this.setState({
          modalVisible: false
        })
        console.log("openCamera error:", error)
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          Alert.alert(
            "",
            cameraPermission,
            [
              { text: "Ok", onPress: () => OpenSettings.openSettings() },
              { text: "Cancel", style: "cancel" },
            ],
            { cancelable: false }
          );
        }
      });

  }


  getFiles = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 200,
      height: 200,
      includeBase64: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: 0.8,
      photo: "photo",
    })
      .then((data) => {

        console.log("ImagePicker", data);
        const file = data.data;
        // const name =data.filename;
        const name = data.hasOwnProperty("filename") ? data.filename : data.path.substr(data.path.lastIndexOf("/") + 1);
        console.log("android filename", name);

        const chatType = path(["navigation", "state", "params", "chatType"], this.props);
        this.callback(chatType, file);
        this.imageList.push({
          file,
          name,
        });
        this.setState({
          modalVisible: false,
        });
      })
      .catch(error => {
        this.setState({
          modalVisible: false
        })
      });
  }

  getChildFile(file, name) {
    const { doctorId, orderRef } = this.props;
    this.props.updateConsultationFile(file, name, doctorId, orderRef, agentChat);
  }

  callback = (chatType, file) => {
    if (chatType === 3) {
      this.userAnswerMessage(null, file);
    } else {
      this.answerQuestion(null, file);
    }
  };

  render() {
    console.log("isDidMount-isDidMount-isDidMount-isDidMount-isDidMount-isDidMount-isDidMount", isDidMount);
    const chatType = path(["navigation", "state", "params", "chatType"], this.props);

    return (
      <SafeAreaView style={Styles.container}>
        {
          this.state.buttonType ? (
            <View style={[styles.middleView, { height: (this.state.buttonType === 1 || chatType === 3) ? height - 140 : height - 55 }]}>
              {this.renderQuestionnaireLog()}
            </View>
          ) : null
        }
        <PruKeyboardAvoidingView>
          {(this.state.buttonType === 1 || chatType === 3) ? this.renderUserInput() : null}
        </PruKeyboardAvoidingView>
        {this.state.modalVisible ? this.prepareCameraGalleryModal() : null}
        {this.state.imgModalVisible ? this.prepareImageContainerModal() : null}
      </SafeAreaView>
    );
  }

  prepareCameraGalleryModal = () => {
    return (
      <View style={styles.modalBackground}>
        <TouchableOpacity
          style={styles.profileModalContent}
          onPress={() => {
            this.setState({ modalVisible: false });
          }}>
          <View style={{
            backgroundColor: colors.white,
            alignItems: "center",
            height: 300,
            width: "88%",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.nevada,
            paddingVertical: 10,
            paddingHorizontal: 30,
          }}>
            <View style={{ width: "100%", padding: 10, marginBottom: 10 }}>
              <TouchableOpacity style={{ flexDirection: "row-reverse" }} onPress={() => this.setState({ modalVisible: false })}>
                <Image style={{ width: 18, height: 18, }} source={CLOSE_ICON} />
              </TouchableOpacity>
            </View>
            <Text style={{
              paddingBottom: 20,
              fontSize: 17,
              fontWeight: "500",
              color: "#515b61",
              fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
            }}>Select photo from</Text>
            <View style={{
              flexDirection: "row",
              marginTop: 10,
            }}>
              <View style={{ flex: 1, height: 150, width: 150 }}>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    padding: 8,
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginRight: 10,
                    // borderWidth: 0.5,
                    // borderColor: "#717171",
                    backgroundColor: "#FAFAFB",
                    borderRadius: 10,
                  }}
                  onPress={e => {
                    e.preventDefault();
                    // this.showCamera.bind(this);
                    this.showCamera();
                    // DocRegister.showCamera();
                  }}
                >
                  <View style={{
                    width: 60,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    // borderColor: "#ed1b2e",
                  }}>
                    <Image style={{ width: 50, height: 50 }} source={NEWCAMERA} />
                  </View>
                </TouchableOpacity>
                <Text style={{
                  fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
                  fontSize: 17,
                  textAlign: "center",
                  paddingTop: 10,
                  color: "#ed1b2e",
                  fontWeight: "400",
                }}>{"Camera"}</Text>
              </View>
              <View style={{ flex: 1, height: 150, width: 150 }}>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    padding: 8,
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginLeft: 10,
                    // borderWidth: 0.5,
                    // borderColor: "#717171",
                    backgroundColor: "#FAFAFB",
                    borderRadius: 10,
                  }}
                  onPress={e => {
                    e.preventDefault();
                    this.getFiles();
                  }}
                >
                  <View style={{
                    width: 60,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    // borderColor: "#ed1b2e",
                  }}>
                    <Image style={{ width: 50, height: 50 }} source={NEWFILE} />
                  </View>
                </TouchableOpacity>
                <Text style={{
                  fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
                  fontSize: 17,
                  textAlign: "center",
                  paddingTop: 10,
                  color: "#ed1b2e",
                  fontWeight: "400",
                }}>{"Gallery"}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  prepareImageContainerModal = () => {
    return (
      <View style={{
        position: "absolute",
        backgroundColor: "#FFF",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        padding: 0,
        margin: 0
      }}>
        <View style={{
          width: 38,
          height: 55,
          alignItems: "flex-start",
          justifyContent: "center",
          position: "absolute",
          right: 0,
          zIndex: 999,
        }}
        >
          <TouchableOpacity onPress={() => this.setState({ imgModalVisible: false })} >
            <Image style={{
              width: 28, height: 28,
            }} source={CLOSE} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }} >
          <Image style={{
            width: 400, height: 400, marginTop: 50, resizeMode: 'contain',
          }} source={{ uri: `data:image/jpeg;base64,${this.state.source}` }} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    now: state.doctorServices.consultation.now,
    preConsultationQuestions: state.doctorServices.preConsultationQuestions,
    doctorId: state.doctorServices.doctorId,
    doctorName: state.doctorServices.consultation ? state.doctorServices.consultation.doctorName : '',
    consultationId: state.doctorServices.consultationId,
    consultationStatus: state.doctorServices.consultationStatus,
    appointmentDate: state.doctorServices.consultation.appointmentDate,
    orderRef: state.doctorServices.paymentConfirmation.refNo,
    episodeId: state.doctorServices.episodeId,
    profilePicture: state.profile.profilePicture,
    doctorMessage: state.appNavigation.params,
    userLanguagePreference: state.userPreferences.language,
    paymentMode: state.doctorServices.paymentConfirmation.paymentMode,
    countryCommonMeta: state.meta.countryCommonMeta
  }
};
export default connect(mapStateToProps, {
  toggleLoader,
  dispatchEvent,
  consultationRequestTimedOut: (consultationId) => ({
    context: pageKeys.DOC_SERVICE_CONSULTATION,
    type: CoreActionTypes.DOC_SERVICE_REQUEST_TIMED_OUT,
    payload: {
      consultationId,
    },
  }),
  initializeData: () => ({
    context: pageKeys.DOC_SERVICE_CONSULTATION,
    type: CoreActionTypes.DOC_SERVICE_INITIALIZE_DATA,
  }),
  setAppointmentDate: (appointmentDate) => ({
    type: CoreActionTypes.SET_APPOINTMENT_DATE,
    payload: {
      appointmentDate,
      now: true,
    },
  }),
  updatePreConLaterQuestions: (content, appointmentId) => ({
    context: pageKeys.DOC_SERVICE_CONSULTATION_LATER,
    type: CoreActionTypes.DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS,
    payload: {
      content,
      appointmentId,
    },
  }),
  updatePreConQuestions: (content, doctorId, orderRef, callback, imageCallback, paymentMode) => ({
    context: pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
    type: CoreActionTypes.DOC_SERVICE_UPDATE_PRE_CONSULTATION_QUESTIONS,
    payload: {
      content,
      doctorId,
      orderRef,
      callback: this.setTryAgain,
      imageCallback: this.updateImage,
      paymentMode,
    },
  }),
  requestConsultation: paymentMode => ({
    type: CoreActionTypes.DOC_SERVICE_REQUEST_CONSULTATION,
    payload: {
      callType: "VIDEO_CHAT",
      paymentMode,
    },
  }),
  updateConsultationFile: (file, fileName, doctorId, orderRef, agentChat) => ({
    context: pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS,
    type: CoreActionTypes.DOC_SERVICE_UPDATE_FILE,
    payload: {
      content: file,
      filename: fileName,
      doctorId,
      orderRef,
      agentChat: false
    },
  })
})(PreConsultationQuestions);
