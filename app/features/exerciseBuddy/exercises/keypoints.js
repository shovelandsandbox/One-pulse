import React from "react";
import Svg, { Circle, Line } from "react-native-svg";

export default KeyPoints = ({pose, posenet}) => {
  const MIN_KEYPOINT_SCORE = 0.2;
  const keypoints = pose.keypoints
    .filter(k => k.score > MIN_KEYPOINT_SCORE)
    .map((k, i) => {
      return (
        <Circle
          key={`skeletonkp_${i}`}
          cx={k.position.x}
          cy={k.position.y}
          r="2"
          strokeWidth="0"
          fill="blue"
        />
      );
    });

  const adjacentKeypoints = posenet.getAdjacentKeyPoints(
    pose.keypoints,
    MIN_KEYPOINT_SCORE
  );

  const skeleton = adjacentKeypoints.map(([from, to], i) => {
    return (
      <Line
        key={`skeletonls_${i}`}
        x1={from.position.x}
        y1={from.position.y}
        x2={to.position.x}
        y2={to.position.y}
        stroke="magenta"
        strokeWidth="1"
      />
    );
  });

  return (
    <Svg
      height="100%"
      width="100%"
      viewBox={`0 0 152 200`}
    >
      {skeleton}
      {keypoints}
    </Svg>
  ); 
};
