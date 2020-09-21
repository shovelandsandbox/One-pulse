import React, { PureComponent } from "react";
import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Permissions from "expo-permissions";
// import { Camera } from "expo-camera";
import { connect } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
// import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { pathOr } from "ramda";
import PropTypes from "prop-types";

import styles from "./styles";
import KeyPoints from "./keypoints";
import {
  useRepsCounter,
  getScore,
  whichVpTree,
  dataPattern,
  determineLevelData,
  posenetConfig,
  getScorePlank,
} from "./utils";
import { BreakScreen } from "../components";
import { BACK_WHITE } from "../../../config/images";

import EBConclusion from "../screens/EBConclusion";

const inputTensorWidth = 152;
const inputTensorHeight = 200;
const AUTORENDER = true;
// const TensorCamera = cameraWithTensors(Camera);
// const cameraType = Camera.Constants.Type.front;

class ExerciseMain extends PureComponent {
  rafID;
  poseArray = [];
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      activeData: dataPattern[0],
      timer: 0,
      displayText: null,
      vptree: [],
      count: 0,
      totalcount: 0,
      countArray: new Map([
        ["Squats", 0],
        ["PushUps", 0],
        ["Plank", 0],
        ["Crunches", 0],
        ["Meditation", 0],
        ["DumblePress", 0],
      ]),
      shouldPause: false,
      showError: false,
      errorMsg: "",
      dataPattern,
    };

    this.interval = null;
    this.noOfPoses = 0;
    this.handleImageTensorReady = this.handleImageTensorReady.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await tf.setBackend("rn-webgl");
    await tf.ready();
    const { 
      exercise="Squats", 
      level="beginner" 
    } = pathOr({}, ["state", "params"], this.props.navigation);

    const posenetModel = await this.loadPosenetModel();
    const vptree = await whichVpTree(exercise);
    
    const dataPattern = this.state.dataPattern;
    dataPattern[1].type = exercise;
    if (exercise === "Meditation") {
      dataPattern[1].count = 60;
    }
    if (level !== "beginner") {
      dataPattern = determineLevelData(level, dataPattern);
    }

    this.setState({
      hasCameraPermission: status === "granted",
      posenetModel,
      vptree,
      dataPattern,
    }, this.startTimer);
  }

  async loadPosenetModel() {
    return await posenet.load(posenetConfig)
  }

  startTimer = () => {
    let { activeData, timer } = this.state;

    if (activeData.type === "end") {
      this.cleanTimer();
      return;
    }

    this.interval = setInterval(() => {
      if (timer !== activeData.count) {
        const displayText = activeData.displayText[timer] || timer;
        this.setState({
          timer: ++timer,
          displayText,
        });
      } else {
        this.clearStartedTimer();
      }
    }, 1000);
  };

  componentWillUnmount() {
    this.cleanTimer();
  }

  clearStartedTimer = (isStop = false) => {
    let { activeIndex, count, dataPattern } = this.state;
    const { countArray, activeData } = this.state;
    if (countArray.has(activeData.type)) {
      countArray.set(activeData.type, count);
    }
    this.cleanTimer();
    if (isStop) {
      this.setState({
        countArray,
        activeData: dataPattern[dataPattern.length - 1],
        activeIndex,
        timer: 0,
        shouldPause: false,
      });
    } else if (activeData.type === "rest") {
      count = countArray.get(dataPattern[activeIndex + 1].type);
      this.setState({
        countArray,
        count,
        activeData: dataPattern[++activeIndex],
        activeIndex,
        timer: 0,
        shouldPause: false,
      });
    } else {
      this.setState({
        countArray,
        activeData: dataPattern[++activeIndex],
        activeIndex,
        timer: 0,
        shouldPause: false,
      });
    }
    this.startTimer();
  };

  cleanTimer = () => {
    clearInterval(this.interval);
  };

  renderBreakScreen = () => {
    const {
      activeData: { displayText, type },
      timer,
      countArray,
    } = this.state;
    const { navigation } = this.props;
    const exeType = pathOr(
      "Squats",
      ["state", "params", "exercise"],
      navigation
    );
    const exercise = pathOr([], ["state", "params", "habit"], navigation);
    const level = pathOr("Beginner", ["state", "params", "level"], navigation);
    if (type === "end") {
      return (
        <EBConclusion
          exercise={exercise}
          level={level}
          units={countArray}
          timeTaken={1}
          type={exeType}
        />
      );
    }

    return (
      <BreakScreen 
        displayText={displayText}
        timer={timer}
        onPressOfBack={() => navigation.navigate("ExerciseBuddyHome")}
      />
    );
  };

  calculateIterations = (pose, whichVpTree, type) => {
    const totalcount = useRepsCounter(pose, whichVpTree, type);
    let { count, countArray, activeData } = this.state;

    if (totalcount !== this.state.totalcount) {
      let tempTotalCount = totalcount;
      countArray.forEach((value, key) => {
        if (key !== activeData.type) {
          tempTotalCount -= value;
        }
      });
      count = tempTotalCount;
      this.setState({
        count,
        totalcount,
      });
    }
  };

  async analysePose(type, pose, vptree) {
    if (type === "Meditation") {
      const { showError, errorMsg } = await getScore(vptree, pose);
      
      this.setState({
        showError,
        errorMsg,
      });
    } else {
      getScorePlank(vptree, pose);
    }
  }
  
  renderPose() {
    const {
      pose,
      activeData: { type },
      timer,
      countArray,
      vptree,
    } = this.state;
    const whichVpTree = vptree;
    if (pose != null) {
      if (type !== "Plank" && type !== "Meditation") {
        this.noOfPoses = 0;
        this.calculateIterations(pose, whichVpTree, type);
      } else {
        const val = countArray.get(type);
        const countArrayTemp = countArray;
        ++this.noOfPoses;
        this.analysePose(type, pose, whichVpTree);
        if (val !== timer) countArrayTemp.set(type, timer);
        
        this.setState({
          countArray: countArrayTemp,
        });
      }

      return <KeyPoints pose={pose} posenet={posenet} />
    }
    return null;
  }

  async handleImageTensorReady(images, updatePreview, gl) {
    const loop = async () => {
      if (!AUTORENDER) {
        updatePreview();
      }

      if (this.state.posenetModel != null) {
        const imageTensor = images.next().value;
        const flipHorizontal = Platform.OS === "ios" ? false : true;
        const pose = await this.state.posenetModel.estimateSinglePose(
          imageTensor,
          { flipHorizontal }
        );
        if (this.noOfPoses > 10) this.poseArray.push(pose);
        this.setState({ pose });
        tf.dispose([imageTensor]);
      }

      if (!AUTORENDER) {
        gl.endFrameEXP();
      }
      this.rafID = requestAnimationFrame(loop);
    };

    loop();
  }

  renderCamView = () => {
    const {
      activeData: { type },
      timer,
      count,
      errorMsg,
    } = this.state;

    let textureDims = {
      height: 1200,
      width: 1600,
    };

    if (Platform.OS === "ios") {
      textureDims = {
        height: 1920,
        width: 1080,
      };
    }

    const Counter = (
      <View style={styles.counterContainer}>
        <Text style={styles.countTitleStyle}>{"Count"}</Text>
        <Text style={styles.counterStyle}>
          {count >= 10 ? count : `0${count}`}
        </Text>
      </View>
    );

    return (
      <View style={styles.cameraContainer}>
        <View style={styles.subContainer}>
          {type !== "Plank" ? Counter : null}
          <View style={styles.activityTimerContainer}>
            <Text style={styles.timeTitleStyle}>{"Time"}</Text>
            <Text style={styles.counterStyle}>00 : {timer}</Text>
          </View>
        </View>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => this.clearStartedTimer(true)}
        >
          <Text style={styles.stopText}>{"Stop"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("ExerciseBuddyHome")}
        >
          <Image source={BACK_WHITE} />
        </TouchableOpacity>
        {/* <TensorCamera
          style={styles.camera}
          type={cameraType}
          zoom={0}
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={inputTensorHeight}
          resizeWidth={inputTensorWidth}
          resizeDepth={3}
          onReady={this.handleImageTensorReady}
          autorender={AUTORENDER}
          autoFocus={false}
        /> */}
        <View style={styles.modelResults}>{this.renderPose()}</View>
      </View>
    );
  };

  shouldRenderCam = () => {
    const {
      activeData: { type },
      shouldPause,
    } = this.state;

    return (
      type !== "start" && type !== "rest" && type !== "end" && !shouldPause
    );
  };

  render() {
    return this.shouldRenderCam()
      ? this.renderCamView()
      : this.renderBreakScreen();
  }
};

ExerciseMain.propTypes = {
  navigation: PropTypes.object,
  habits: PropTypes.array,
  joinedPlans: PropTypes.array,
};

const mapStateToProps = state => ({
  habits: state.workoutPlans.habitsByWorkoutPlanId,
  joinedPlans: state.workoutPlans.joinedPlans,
});

export default connect(mapStateToProps, {})(ExerciseMain);
