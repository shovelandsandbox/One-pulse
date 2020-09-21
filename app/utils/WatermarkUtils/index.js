import ImageMarker from "react-native-image-marker";
import RNFS from "react-native-fs";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

const addWatermark = async (src, config) => {
  const markedResFile = await ImageMarker.markText({
    src: src,
    text: config.waterMarkText,
    position: "center",
    color: "#d9d3d3",
    fontName: "Arial-BoldItalicMT",
    fontSize: 65,
    shadowStyle: {
      dx: 4,
      dy: 4,
      radius: 20.9,
      color: "#ebebeb",
    },
    //   textBackgroundStyle: {
    //     type: "stretchX",
    //     paddingX: 10,
    //     paddingY: 10,
    //     color: "#0f0",
    //   },
    scale: 1,
    quality: 100,
    ...config,
  });
  const data = await RNFS.readFile(markedResFile, "base64");
  return { path: markedResFile, content: "data:image/jpeg;base64," + data };
};

const addTextToImageBase64 = (base64, config) => {
  return addWatermark({ uri: `data:image/jpeg;base64,${base64}` }, config);
};

const addTextToImageUri = (uri, config) => {
  return addWatermark(uri, config);
};

const convertToBase64 = async loadedPdfDoc => {
  const base64Pdf = await loadedPdfDoc.saveAsBase64();
  return base64Pdf;
};

const addTextToPdf = async (pdfArrayBuffer, waterMarkConfig) => {
  const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  pages.map(page => {
    const { waterMarkText, waterMarkDateTime } = waterMarkConfig;
    const { width, height } = page.getSize();
    page.drawText(waterMarkText, {
      x: width / 5,
      y: height / 5,
      size: 40,
      font: helveticaFont,
      color: rgb(0.7, 0.7, 0.7),
      rotate: degrees(45),
    });
    if (waterMarkDateTime) {
      page.drawText(waterMarkDateTime, {
        x: width / 2,
        y: height / 3,
        size: 20,
        font: helveticaFont,
        color: rgb(0.7, 0.7, 0.7),
        rotate: degrees(45),
      });
    }
  });
  return convertToBase64(pdfDoc);
};

const addImageToPdf = async (
  pdfArrayBuffer,
  imageArrayBuffer,
  imagePositionConfig
) => {
  const {
    pageNumber,
    xPosition,
    yPosition,
    width,
    height,
  } = imagePositionConfig;
  const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
  const imageToBeEmbedded = await pdfDoc.embedPng(imageArrayBuffer);
  const pages = pdfDoc.getPages();
  const targetPage = pages[pageNumber - 1];
  targetPage.drawImage(imageToBeEmbedded, {
    x: xPosition,
    y: yPosition,
    width: width,
    height: height,
  });
  return convertToBase64(pdfDoc);
};

/**
 * usage:
 * const res = await WatermarkUtils.addToBase64("base64data", config);
 *
 * const res = await WatermarkUtils.addToUri("base64data", config);
 */

export const WatermarkUtils = {
  addTextToImageBase64,
  addTextToImageUri,
  addTextToPdf,
  addImageToPdf,
};
