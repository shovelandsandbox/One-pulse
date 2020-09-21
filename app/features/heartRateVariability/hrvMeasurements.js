import * as tf from "@tensorflow/tfjs";
import rgb from "color-space/rgb";
import ycbcr from "color-space/ycbcr";

export const extractData = async frame => {
  if (frame) {
    const time = Date.now() / 1000.0;
    const greenRoi = frame.slice([0, 0, 1], [-1, -1, 1]);
    const greenMean = await tf.mean(greenRoi).array();

    const redRoi = frame.slice([0, 0, 0], [-1, -1, 1]);
    const redMean = await tf.mean(redRoi).array();

    const blueRoi = frame.slice([0, 0, 2], [-1, -1, 1]);
    const blueMean = await tf.mean(blueRoi).array();

    tf.dispose(greenRoi);
    tf.dispose(redRoi);
    tf.dispose(blueRoi);
    const ycbcrValue = rgb.ycbcr([redMean, greenMean, blueMean]);
    const data = {};
    data.yellowAv = ycbcrValue[0];
    data.cbAv = ycbcrValue[1];
    data.crAv = ycbcrValue[2];
    data.time = time;
    return data;
  }
};
