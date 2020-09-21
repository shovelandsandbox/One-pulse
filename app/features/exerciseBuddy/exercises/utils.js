import * as posenet from "@tensorflow-models/posenet";
import VPTreeFactory from "vptree";
import {
  imageCategories,
  squatPoseData,
} from "../configs/dataConfigs/squatData";
import {
  pushupImageCategories,
  pushupPoseData,
} from "../configs/dataConfigs/pushupData";
import {
  meditationPoseDataUp,
  meditationPoseDataDown,
  meditationImageCategories,
} from "../configs/dataConfigs/meditationData";
import {
  crunchesCategories,
  crunchesPoseData,
} from "../configs/dataConfigs/crunchesData";
import {
  dumblePressData,
  dumblePressImageCategories,
} from "../configs/dataConfigs/dumblePressData";
import l2norm from "compute-l2norm";
import { sortBy, chain } from "lodash";
import * as tf from "@tensorflow/tfjs";

// import { fetch } from "@tensorflow/tfjs-react-native";
import * as jpeg from "jpeg-js";

export const dataPattern = [
  {
    type: "start",
    count: 3,
    iteration: ["3", "2", "1", "Go!"],
    displayText: "Challenge going to start in",
  },
  {
    type: "Meditation",
    count: 30,
    iteration: [],
    displayText: "",
  },
  {
    type: "end",
  },
];

export const posenetConfig = {
  architecture: "MobileNetV1",
  outputStride: 16,
  inputResolution: { width: 152, height: 200 },
  multiplier: 0.75,
  quantBytes: 2,
};

export const whichVpTree = type => {
  switch(type) {
    case "Squats":
      return loadPoseData();
    case "PushUps":
      return loadPushupPoseData();
    case "Crunches": 
      return loadCrunchPoseData();
    case "Meditation":
      return loadMeditationPoseData();
    case "DumblePress":
      return loadPoseData("DumblePress");
  }
}

export const determineLevelData = (level, dataPattern) => {
  const excercise_object = [];
  const rest_object = {
    type: "rest",
    count: 30,
    iteration: [],
    displayText: "Take rest for 30 Seconds",
  };
  excercise_object.push(dataPattern);
  excercise_object.push(rest_object);
  switch (level) {
    case "advanced":
      merge(dataPattern, excercise_object, 1);
    case "intermediate":
      merge(dataPattern, excercise_object, 1);
  }
}

const partsGeneral = [
  "nose",
  // 'leftEye',
  // 'rightEye',
  // 'leftEar',
  // 'rightEar',

  "leftShoulder",
  "rightShoulder",

  "leftElbow",
  "rightElbow",
  "leftWrist",
  "rightWrist",

  "leftHip",
  "rightHip",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle",
];
let parts = [...partsGeneral];
let minConsecutivePoses = 5;
this.counter = [];
export const merge = (a, b, i = 1) => a.splice(i, 0, ...b) && a;
const meditationSpecificParts = ["leftEye", "rightEye", "leftEar", "rightEar"];
const meditationParts = [...parts];
merge(meditationParts, meditationSpecificParts, 1);
const dataConfig = {
  Squats: {
    data: squatPoseData,
    category: imageCategories,
  },
  PushUps: {
    data: pushupPoseData,
    category: pushupImageCategories,
  },
  Crunches: {
    data: crunchesPoseData,
    category: crunchesCategories,
  },
  Meditation: {
    downData: meditationPoseDataDown,
    upData: meditationPoseDataUp,
    category: meditationImageCategories,
  },
  DumblePress: {
    data: dumblePressData,
    category: dumblePressImageCategories,
  },
};

export async function loadPoseData(type = "Squats") {
  this.counter = [];
  const vptree = await buildVPTree(dataConfig[type].data);
  return vptree;
}

export async function loadPushupPoseData() {
  this.counter = [];
  const vptree = await buildVPTree(pushupPoseData);
  return vptree;
}

export function loadMeditationPoseData() {
  //To be tested
  const knnClassifier = require("@tensorflow-models/knn-classifier");
  const classifier = knnClassifier.create();
  meditationPoseDataDown.forEach(item => {
    classifier.addExample(tf.tensor(item), "Down");
  });
  meditationPoseDataUp.forEach(item => {
    classifier.addExample(tf.tensor(item), "Up");
  });

  //Old changes
  this.counter = [];
  // const vptree = await buildVPTree(meditationPoseData, "Meditation");
  // return vptree;
  return classifier;
}

export async function loadCrunchPoseData() {
  this.counter = [];
  const vptree = await buildVPTree(crunchesPoseData);
  return vptree;
}

export function convertPoseToVector(pose) {
  const keypoints = sortBy(normalizeKeypoints(pose), "part");
  const vector = keypoints.reduce((acc, keypoint) => {
    if (parts.includes(keypoint.part)) {
      acc.push(keypoint.normalizedPosition.x);
      acc.push(keypoint.normalizedPosition.y);
    }
    return acc;
  }, []);

  const scoreSum = keypoints.reduce((acc, keypoint) => {
    vector.push(keypoint.score);
    return acc + keypoint.score;
  }, 0);

  vector.push(scoreSum);
  return l2normPoseVector(vector);
}

function normalizeKeypoints(pose) {
  const boundingBox = posenet.getBoundingBox(pose.keypoints);

  const normalizedPoints = pose.keypoints.map(keypoint => {
    return {
      ...keypoint,
      normalizedPosition: {
        x: keypoint.position.x - boundingBox.minX,
        y: keypoint.position.y - boundingBox.minY,
      },
    };
  });
  return normalizedPoints;
}

function l2normPoseVector(vector) {
  const norm = l2norm(vector);
  const normalized = vector.map(value => (value / norm) * (value / norm));
  return normalized;
}

async function buildVPTree(poseData, type = "Squats") {
  // Initialize our vptree with our images’ pose data and a distance function
  parts = [...partsGeneral];
  if (type === "Meditation") {
    parts = [...meditationParts];
  }
  return new Promise(resolve => {
    resolve(VPTreeFactory.build(poseData, weightedDistanceMatching));
  });
}

function weightedDistanceMatching(poseVector1, poseVector2) {
  const partsEnd = parts.length * 2;
  const scoresEnd = partsEnd + parts.length;
  const vector1PoseXY = poseVector1.slice(0, partsEnd);
  const vector1Confidences = poseVector1.slice(partsEnd, scoresEnd);
  const vector1ConfidenceSum = poseVector1.slice(scoresEnd, scoresEnd + 1);

  const vector2PoseXY = poseVector2.slice(0, partsEnd);

  const summation1 = 1 / vector1ConfidenceSum;
  let summation2 = 0;
  for (let i = 0; i < vector1PoseXY.length; i++) {
    const tempConf = Math.floor(i / 2);
    const tempSum =
      vector1Confidences[tempConf] *
      Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
    summation2 = summation2 + tempSum;
  }

  return summation1 * summation2;
}

export function useRepsCounter(pose, vptree, type) {
  if (type !== "Squats") {
    minConsecutivePoses = 3;
  }
  if (type === "DumblePress") {
    minConsecutivePoses = 2;
  }
  if (type === "Crunches") {
    minConsecutivePoses = 5;
  }
  if (pose) {
    const match = findMostSimilarMatch(vptree, pose, type);
    incrementPoseCount(match.category);
    return countTotalReps(2);
  }
  return 0;
}

function returnCategory(type) {
  if (type === "Crunches") {
    return crunchesCategories;
  }
  if (type === "Squats") {
    return imageCategories;
  }
  return pushupImageCategories;
}

function findMostSimilarMatch(vptree, userPose, type) {
  const pose = convertPoseToVector(userPose);
  const nearestImage = vptree.search(pose);
  const whichCategory = dataConfig[type].category;

  return {
    index: nearestImage[0].i,
    score: nearestImage[0].d,
    category: whichCategory[nearestImage[0].i],
  };
}

export async function getScore(vptree, userPose) {
  const pose = convertPoseToVector(userPose);
  const nearestImage = await vptree.predictClass(tf.tensor(pose), 7);
  const cat = nearestImage.label;
  const scorePer = cat === "Up" ? -1 : nearestImage.confidences[cat];
  
  if (scorePer >= 0.76) {
    return {
      showError: false,
      errorMsg: "",
    }
  }

  return {
    showError: true,
    errorMsg: "Please correct your pose",
  };
}

export function getScorePlank(vptree, userPose) {
  const pose = convertPoseToVector(userPose);
  // search the vp tree for the image pose that is nearest (in cosine distance) to userPose
  const nearestImage = vptree.search(pose);
  const dmax = 1;
  // return index (in relation to poseData) of nearest match.
  const nearestDist = nearestImage[0].d;
  let scorePer =
    nearestDist >= dmax ? 0 : ((dmax - nearestDist) / dmax).toFixed(4);
  const category = meditationImageCategories[nearestImage[0].i];
  scorePer = category === "up" ? -1 : scorePer;
  return {
    index: nearestImage[0].i,
    score: scorePer,
    category,
  };
}

function incrementPoseCount(category) {
  if (this.counter.length === 0) {
    this.counter.push([category, 1]);
  } else if (this.counter[this.counter.length - 1][0] === category) {
    this.counter[this.counter.length - 1][1]++;
  } else {
    this.counter.push([category, 1]);
  }
}

function countTotalReps(numCategories) {
  const reps = chain(this.counter)
    .filter(p => p[1] >= minConsecutivePoses)
    .reduce((acc, pose) => {
      if (acc.length === 0) {
        acc.push(pose);
      } else {
        const previousPose = acc[acc.length - 1];
        if (previousPose[0] === pose[0]) {
          previousPose[1] += pose[1];
        } else {
          acc.push(pose);
        }
      }
      return acc;
    }, [])
    .value();
  return Math.max(0, Math.ceil((reps.length - 1) / numCategories));
}



// const RNFS = require("react-native-fs");
export function imageToTensor(rawImageData) {
  // const rawImageData = await RNFS.readFile(filePath);
  // console.log("###rawImageData --> ", rawImageData);
  const TO_UINT8ARRAY = true;
  const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  // Drop the alpha channel info for mobilenet
  const buffer = new Uint8Array(width * height * 3);
  let offset = 0; // offset into original data
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];

    offset += 4;
  }

  return tf.tensor3d(buffer, [height, width, 3]);
}

export async function convertImage(image) {
  // image is like any jpg image in our application.
  try {
    // const imageAssetPath = Image.resolveAssetSource(image);
    // console.log("###imageAssetPath --> ", imageAssetPath);
    // const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
    // console.log("###response -->", JSON.stringify(response));

    // const rawImageData = await response.arrayBuffer();
    // console.log("###rawImage -->", rawImageData);
    // const imageTensor = imageToTensor(rawImageData);

    console.log("###imageTensor --> ", imageTensor);
  } catch (e) {
    console.log(e);
  }
}
