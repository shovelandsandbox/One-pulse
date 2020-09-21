import * as tf from "@tensorflow/tfjs";

export const extractFace = async (frame, faces) => {
  if (faces && faces.length > 0) {
    const face = faces[0];
    const time = Date.now() / 1000.0;
    const roi1 = await extractROI1(frame, face);
    const roi2 = await extractROI2(frame, face);
    //const roi2 = roi1;
    if (roi1 == null || roi2 == null) {
      //no face found
      if (roi1 != null) tf.dispose(roi1);
      if (roi2 != null) tf.dispose(roi2);
      return;
    }
    //const hsv1 = await this.rgbToHsvMean(roi1);
    //const hsv2 = await this.rgbToHsvMean(roi2);

    const greenRoi1 = roi1.slice([0, 0, 1], [-1, -1, 1]);
    const greenMean1 = await tf.mean(greenRoi1).array();
    const greenRoi2 = roi2.slice([0, 0, 1], [-1, -1, 1]);
    const greenMean2 = await tf.mean(greenRoi2).array();
    //console.log("Greenroi:" + greenMean1 + " " + greenMean2);
    const greenMean = (greenMean1 + greenMean2) / 2.0;

    const redRoi1 = roi1.slice([0, 0, 0], [-1, -1, 1]);
    const redMean1 = await tf.mean(redRoi1).array();
    const redRoi2 = roi2.slice([0, 0, 0], [-1, -1, 1]);
    const redMean2 = await tf.mean(redRoi2).array();
    const redMean = (redMean1 + redMean2) / 2.0;
    //console.log("body::" + body);

    const blueRoi1 = roi1.slice([0, 0, 2], [-1, -1, 1]);
    const blueMean1 = await tf.mean(blueRoi1).array();
    const blueRoi2 = roi2.slice([0, 0, 2], [-1, -1, 1]);
    const blueMean2 = await tf.mean(blueRoi2).array();
    const blueMean = (blueMean1 + blueMean2) / 2.0;
    //tf.dispose(faceTensor);
    tf.dispose(roi1);
    tf.dispose(roi2);
    tf.dispose(greenRoi1);
    tf.dispose(greenRoi2);
    tf.dispose(greenMean1);
    tf.dispose(greenMean2);
    tf.dispose(redRoi1);
    tf.dispose(redRoi2);
    tf.dispose(redMean1);
    tf.dispose(redMean2);
    tf.dispose(blueRoi1);
    tf.dispose(blueRoi2);
    tf.dispose(blueMean1);
    tf.dispose(blueMean2);

    const data = {};
    data.greenAvg = greenMean;
    data.redAvg = redMean;
    data.blueAvg = blueMean;
    data.time = time;

    return data;
  }
};

const extractROI1 = async (frame, face) => {
  if (!face) return frame;
  const topLeft = face.topLeft;
  const bottomRight = face.bottomRight;
  const width = bottomRight[0] - topLeft[0] + 10;
  const height = bottomRight[1] - topLeft[1];
  const xstart = Math.floor(topLeft[0] + 5);
  const ystart = Math.floor(topLeft[1] + height / 2);
  const xsize = Math.floor(width / 5);
  const ysize = Math.floor(height / 5);
  const frameWidth = frame.shape[0];
  const frameHeight = frame.shape[1];
  if (xstart + xsize < frameWidth && ystart + ysize < frameHeight)
    return frame.slice([xstart, ystart], [xsize, ysize]);
};

//
const extractROI2 = async (frame, face) => {
  if (!face) return frame;
  const topLeft = face.topLeft;
  const bottomRight = face.bottomRight;
  const width = bottomRight[0] - topLeft[0] + 10;
  const height = bottomRight[1] - topLeft[1];
  const xstart = Math.floor(topLeft[0] + width - 5 - width / 5);
  const ystart = Math.floor(topLeft[1] + height / 2);
  const xsize = Math.floor(width / 5);
  const ysize = Math.floor(height / 5);
  const frameWidth = frame.shape[0];
  const frameHeight = frame.shape[1];
  if (xstart + xsize < frameWidth && ystart + ysize < frameHeight)
    return frame.slice([xstart, ystart], [xsize, ysize]);
};
