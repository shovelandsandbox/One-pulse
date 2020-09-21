import React, { PureComponent } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

import Pdf from "react-native-pdf";
import RNFS from "react-native-fs";
import { pathOr } from "ramda";
import moment from "moment";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import SignatureCapture from "react-native-signature-capture";
import { decode as atob, encode as btoa } from "base-64";
import { SALE_CLOSE } from "../../../config/images";
import { events } from "@pru-rt-internal/pulse-common";
import { CustomAlert } from "../../../components";
import { safeMetaLabelFinder } from "../../../utils/meta-utils";
import {eventNames} from "../events"

const getCurrentScreenMeta = key => {
  return safeMetaLabelFinder("DocumentSignature", key);
};

const fontSize = 9;
export default class DocSignature extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileDownloaded: false,
      getSignaturePad: false,
      signatureArrayBuffer: "",
      pdfArrayBuffer: "",
      newPdfSaved: false,
      newPdfPath: "",
      filePath: `${RNFS.DocumentDirectoryPath}/${this.props.policySignatureCoords.policyDocumentFileName}`,
      page: 1,
      scale: 1,
      numberOfPages: 0,
      horizontal: false,
      currentPosition: 0,
      signatureArray: [],
      currentAction: "",
      currentMessage: "",
      totalSignatureCount: 0,
    };
  }
  componentDidMount() {
    const { policySignatureCoords = {}, textinitiator } = this.props;
    const { currentPosition } = this.state;
    const { signatureCoordinate = [] } = policySignatureCoords;

    if (signatureCoordinate.length > 0) {
      const signCurrentPosition = signatureCoordinate[currentPosition];

      if (signCurrentPosition) {
        this.setState({
          currentAction: signCurrentPosition.action,
          currentMessage: signCurrentPosition.message,
        });
      }
    }
    this.downloadFile();
  }

  _base64ToArrayBuffer = base64 => {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  };

  _uint8ToBase64 = u8Arr => {
    const CHUNK_SIZE = 0x8000; //arbitrary number
    let index = 0;
    const length = u8Arr.length;
    let result = "";
    let slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return btoa(result);
  };

  writeToFile = () => {
    RNFS.writeFile(
      this.state.filePath,
      this.props.documentContent,
      "base64"
    ).then(success => {
      this.setState({ fileDownloaded: true });
      this.readFile();
    });
  };

  downloadFile = () => {
    if (!this.state.fileDownloaded) {
      // this.readFile();
      RNFS.exists(this.state.filePath)
        .then(result => {
          if (result) {
            return (
              RNFS.unlink(this.state.filePath)
                .then(() => {
                  this.writeToFile();
                })
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch(err => {
                  console.log(err.message);
                })
            );
          }
          this.writeToFile();
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  readFile = () => {
    RNFS.readFile(this.state.filePath, "base64").then(contents => {
      this.setState({ pdfArrayBuffer: this._base64ToArrayBuffer(contents) });
    });
  };

  getSignature = () => {
    this.setState({ getSignaturePad: true });
  };

  sendBackdocument = () => {
    const { policySignatureCoords = {} } = this.props;
    this.props.onSend(
      this.state.newPdfPath,
      policySignatureCoords.partyType + this.props.fileName,
      "pdf"
    );
  };

  handleSingleTap = async () => {
    const { policySignatureCoords = {} } = this.props;
    const {
      currentPosition,
      pdfArrayBuffer,
      signatureArrayBuffer,
    } = this.state;
    const {
      waterMarkConfig = "",
      signatureCoordinate = [],
    } = policySignatureCoords;
    const signCurrentPosition = signatureCoordinate[this.state.currentPosition];

    this.setState({
      newPdfSaved: false,
    });
    const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
    const pages = pdfDoc.getPages();
    const lastPage = pages[signCurrentPosition.pageNumber - 1];

    const signatureImage = await pdfDoc.embedPng(
      this.state.signatureArrayBuffer
    );
    const { x, y, width, height } = signCurrentPosition;

    lastPage.drawImage(signatureImage, {
      x,
      y,
      width,
      height,
    });
    const dateCoordinate = pathOr(
      [],
      [
        "policySignatureCoords",
        "signatureCoordinate",
        this.state.currentPosition,
        "dateCoordinate",
      ],
      this.props
    );
    if (dateCoordinate.length > 0) {
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      dateCoordinate.map(item => {
        const now = moment().format(item.format);
        pages[item.pageNumber - 1].drawText(now, {
          x: item.x,
          y: item.y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
      });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = this._uint8ToBase64(pdfBytes);
    const path = `${
      RNFS.DocumentDirectoryPath
      }/react-native_signed_${Date.now()}.pdf`;
    RNFS.writeFile(path, pdfBase64, "base64")
      .then(success => {
        this.setState(
          {
            newPdfPath: path,
            newPdfSaved: true,
            currentPosition: this.state.currentPosition + 1,
            filePath: path,
          },
          () => {
            if (signatureCoordinate.length > this.state.currentPosition) {
              this.setState({
                currentAction:
                  policySignatureCoords.signatureCoordinate[
                    this.state.currentPosition
                  ].action,
                currentMessage:
                  policySignatureCoords.signatureCoordinate[
                    this.state.currentPosition
                  ].message,
              });
              this.readFile();
            }
          }
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  saveSign() {
    if (this.state.currentSignatureCaptured) {
      this.setState((state, props) => ({
        totalSignatureCount: state.totalSignatureCount + 1,
      }));
      this.props.registerEvent(eventNames.addSignature,{
        signatureType : this.state.currentMessage
      })
      this.refs["sign"].saveImage();
    } else {
      CustomAlert.show("", getCurrentScreenMeta("no_signature_added"), {
        positiveText: getCurrentScreenMeta("no_signature_ok"),
        onPositivePress: () => { },
      });
    }

    
  }

  resetSign() {
    this.refs["sign"].resetImage();
    this.setState({ currentSignatureCaptured: false });
  }
  prePage = () => {
    const prePage = this.state.page > 1 ? this.state.page - 1 : 1;
    this.pdf.setPage(prePage);
  };

  nextPage = () => {
    const nextPage =
      this.state.page + 1 > this.state.numberOfPages
        ? this.state.numberOfPages
        : this.state.page + 1;
    this.pdf.setPage(nextPage);
  };

  _onSaveEvent = result => {
    if (this.state.currentSignatureCaptured) {
      const decodedString = result.encoded.replace(/\n/g, "");
      this.setState({
        signatureArrayBuffer: this._base64ToArrayBuffer(decodedString),
      });
      this.setState({
        getSignaturePad: false,
        currentSignatureCaptured: false,
      });
      this.handleSingleTap();
      this.props.platformEvent(events.documentSigned);
    }
  };

  _onDragEvent = () => {
    this.setState({ currentSignatureCaptured: true });
  };

  signatureView() {
    let signatureViewTitle = getCurrentScreenMeta("signature_capture_title");
    signatureViewTitle = signatureViewTitle.replace(
      "signature_type",
      this.state.currentMessage
    );
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.body}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{ paddingRight: 30 }}
              onPress={() => {
                this.setState({ getSignaturePad: false });
              }}
            >
              <Image
                style={{
                  width: 28,
                  height: 28,
                }}
                source={SALE_CLOSE}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.header}>{signatureViewTitle}</Text>
            <SignatureCapture
              style={styles.signature}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"}
              minStrokeWidth={getCurrentScreenMeta("signature_stroke_width")}
              maxStrokeWidth={getCurrentScreenMeta("signature_stroke_width")}
              strokeColor={getCurrentScreenMeta("signature_stroke_color")}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.saveSign();
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.resetSign();
                }}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  pdfBottomMenu() {
    const { currentAction, currentMessage, totalSignatureCount } = this.state;
    const { policySignatureCoords = {} } = this.props;
    const { signatureCoordinate = [] } = policySignatureCoords;

    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            disabled={this.state.page === 1}
            style={this.state.page === 1 ? styles.btnDisable : styles.btn}
            onPress={() => this.prePage()}
          >
            <Text style={styles.btnText}>{"-"}</Text>
          </TouchableOpacity>
          <View style={styles.btnText}>
            <Text style={styles.btnText}>Page {this.state.page}</Text>
          </View>
          <TouchableOpacity
            disabled={this.state.page === this.state.numberOfPages}
            style={
              this.state.page === this.state.numberOfPages
                ? styles.btnDisable
                : styles.btn
            }
            onPress={() => this.nextPage()}
          >
            <Text style={styles.btnText}>{"+"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {totalSignatureCount !== signatureCoordinate.length && (
            <TouchableOpacity onPress={this.getSignature} style={styles.button}>
              <Text style={styles.buttonText}>
                Add {currentMessage} Signature
              </Text>
            </TouchableOpacity>
          )}
          {currentAction === "Send Back" &&
            totalSignatureCount === signatureCoordinate.length && (
              <TouchableOpacity
                onPress={() => {
                  this.sendBackdocument(currentAction);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{currentAction}</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    );
  }
  render() {
    const { getSignaturePad, fileDownloaded, filePath } = this.state;
    return (
      <View style={styles.container}>
        {getSignaturePad ? (
          <View style={{ flex: 1 }}>{this.signatureView()}</View>
        ) : (
            fileDownloaded && (
              <View>
                {filePath && (
                  <View>
                    <View
                      style={{ flexDirection: "row", justifyContent: "flex-end" }}
                    >
                      <TouchableOpacity
                        style={{ paddingRight: 30 }}
                        onPress={() => {
                          this.props.Close();
                        }}
                      >
                        <Image
                          style={{
                            width: 28,
                            height: 28,
                          }}
                          source={SALE_CLOSE}
                        />
                      </TouchableOpacity>
                    </View>
                    <Pdf
                      ref={pdf => {
                        this.pdf = pdf;
                      }}
                      scale={this.state.scale}
                      horizontal={this.state.horizontal}
                      source={{
                        uri: this.state.newPdfSaved
                          ? this.state.newPdfPath
                          : this.state.filePath,
                      }}
                      onLoadComplete={(
                        numberOfPages,
                        filePath,
                        { width, height },
                        tableContents
                      ) => {
                        this.setState({
                          numberOfPages: numberOfPages,
                        });
                      }}
                      onPageChanged={(page, numberOfPages) => {
                        this.setState({
                          page: page,
                        });
                      }}
                      style={styles.pdf}
                    />
                    {this.pdfBottomMenu()}
                  </View>
                )}
              </View>
            )
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
  },
  btn: {
    backgroundColor: "aqua",
    margin: 2,
    padding: 2,
  },
  btnDisable: {
    backgroundColor: "gray",
    margin: 2,
    padding: 2,
  },
  btnText: {
    margin: 2,
    padding: 2,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    justifyContent: "center",
    marginVertical: 10,
    margin: 5,
    padding: 10,
    flex: 1,
    borderRadius: 10,
  },
  buttonText: {
    color: "#DAFFFF",
  },
  container: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  header: {
    color: "black",
    fontSize: 22,
    fontWeight: "600",
    paddingVertical: 20,
    textAlign: "center",
  },
  pdf: {
    height: Dimensions.get("window").height - 150,
    width: Dimensions.get("window").width,
  },
  signature: {
    borderColor: "#000033",
    borderWidth: 1,
    flex: 1,
  },
});
