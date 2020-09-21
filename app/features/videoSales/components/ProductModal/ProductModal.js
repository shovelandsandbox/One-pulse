import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import {
  SALE_UPLOAD,
  ARROW_RIGHT,
  ARROW_LEFT,
  SALE_CLOSE,
} from "../../../../config/images";
import { events } from "@pru-rt-internal/pulse-common";
import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from "react-native-document-picker";
import moment from "moment";
import MetaConstants from "../../meta";
import { CustomAlert } from "../../../../components";
import Styles from "./styles";
const productList = [
  {
    value: "Personal Accident Insurance",
  },
  {
    value: "Covid 19 Protection",
  },
  {
    value: "Educare",
  },
];
const documentList = [
  {
    value: "Identity Proof",
  },
  {
    value: "Address Proof",
  },
  {
    value: "Proposal Documents",
  },
  {
    value: "Bank Statements",
  },
  {
    value: "Quotation Documents",
  },
];
const documentTypeList = [
  {
    value: "Driving License",
  },
  {
    value: "Pan Card",
  },
];
export default class ProductModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDocument: "",
      selectedProduct: "",
      selectedDocumentType: "",
      productDocumentModal: false,
    };
    this.metaConstants = { ...MetaConstants.screenMeta() };
    this.selectedPoint = "Product";
    this.uploadTypeListIos = [
      {
        value: this.metaConstants.open_camera,
      },
      {
        value: this.metaConstants.document_pdf,
      },
      {
        value: this.metaConstants.image_doc,
      },
    ];
    this.uploadTypeListAndroid = [
      {
        value: this.metaConstants.open_camera,
      },
      {
        value: this.metaConstants.document_type,
      },
    ];
  }

  onProductClicked = item => {

    switch (this.selectedPoint) {
      case "Product":
        this.selectedPoint = "Document";
        this.setState({ selectedProduct: item.item.value });
        break;
      case "Document":
        this.selectedPoint = "DocumentType";
        this.setState({ selectedDocument: item.item.value });
        break;
      case "DocumentType":
        this.selectedPoint = "UploadType";
        this.setState({ selectedDocumentType: item.item.value });
        break;
      case "UploadType":
        this.resetProductDoc();
        this.selectedPoint = "Product";
        if (Platform.OS === "ios") {
          setTimeout(() => {
            this.openCameraDocument(item.item.value);
          }, 500)
        } else {
          this.openCameraDocument(item.item.value);
        }
        break;
    }
  };
  openCameraDocument = type => {
    const documentPdf = this.metaConstants.document_pdf;
    const documentPdfImg = this.metaConstants.document_type;
    const openCamera = this.metaConstants.open_camera;
    const image = this.metaConstants.image_doc;
    switch (type) {
      case documentPdf:
        this.SingleFilePicker();
        this.props.platformEvent(events.documentUpload);
        break;
      case openCamera:
        this.openCamera();
        this.props.platformEvent(events.documentUpload);
        break;
      case image:
        this.SingleImagePicker();
        this.props.platformEvent(events.documentUpload);
        break;
      case documentPdfImg:
        this.SingleFilePicker();
        this.props.platformEvent(events.documentUpload);
        break;
    }
  };

  SingleImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true,
      compressImageQuality: 0.8,
    })
      .then(data => {
        this.props.onSend(data.data, data.filename, "image", "ios");
      })
      .catch(error => { });
  };

  openCamera = () => {
    const cameraConfig = {
      includeBase64: true,
      compressImageQuality: 0.8,
      photo: "photo",
    };

    ImagePicker.openCamera(cameraConfig)
      .then(image => {
        this.props.onSend(
          image.data,
          `IMG_${moment(new Date()).valueOf()}.png`,
          "image",
          "ios"
        );
      })
      .catch(error => { });
  };
  SingleFilePicker = async () => {
    const upload_pdf_image = this.metaConstants.upload_pdf_image;
    const OK = this.metaConstants.all_permission_ok;
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (res.type === "application/pdf" || res.type === "image/jpeg") {
        this.props.onSend(
          res.uri,
          res.name,
          res.type === "application/pdf" ? "pdf" : "image"
        );
      } else {
        CustomAlert.show("", upload_pdf_image, {
          positiveText: OK,
        });
      }
    } catch (err) { }
  };
  documentPressBack = () => {
    this.selectedPoint = "Document";
    this.setState({ selectedDocument: "" });
  };
  productPressBack = () => {
    this.selectedPoint = "Product";
    this.setState({ selectedProduct: "", selectedDocument: "" });
  };
  renderItem = item => {
    return (
      <View>
        <View style={Styles.rednerItemTopView} />
        <TouchableOpacity
          style={Styles.productClickView}
          onPress={() => this.onProductClicked(item)}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 3 }}>
              <Text style={Styles.itemTextStyle}>{item.item.value}</Text>
            </View>
            <View style={Styles.renderItemArrowView}>
              <Image source={ARROW_RIGHT} style={Styles.rightArrow} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderProductDocument = () => {
    const uploadFor = this.metaConstants.upladDocFor;
    const productName = this.metaConstants.productName;
    const selectProduct = this.metaConstants.selectProduct;
    const {
      productDocumentModal,
      selectedProduct,
      selectedDocument,
    } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={productDocumentModal}
        onRequestClose={() => { }}
      >
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 2 }}>
                  <Text style={Styles.uploadDocText}>{uploadFor} </Text>
                </View>
                <TouchableOpacity
                  style={{ flex: 1, alignItems: "flex-end" }}
                  onPress={() => {
                    this.resetProductDoc();
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
              {selectedProduct ? (
                <View style={Styles.productBackView}>
                  <TouchableOpacity
                    style={Styles.selectedDocPress}
                    onPress={() => this.productPressBack()}
                  >
                    <Image source={ARROW_LEFT} style={Styles.leftArrow} />
                    <Text style={Styles.selectedProductStyle}>
                      {selectedProduct}
                    </Text>
                  </TouchableOpacity>
                  <Text style={Styles.productName}>{productName}</Text>
                </View>
              ) : (
                  <Text style={Styles.defaultProduct}>{selectProduct}</Text>
                )}
            </View>
            {selectedDocument ? (
              <View style={Styles.selectedDocStyle}>
                <TouchableOpacity
                  style={Styles.selectedDocPress}
                  onPress={() => this.documentPressBack()}
                >
                  <Image source={ARROW_LEFT} style={Styles.leftArrow} />
                  <Text style={Styles.selectedDocValue}>
                    {selectedDocument}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <FlatList
                data={this.getList(this.selectedPoint)}
                renderItem={this.renderItem}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  resetProductDoc = () => {
    this.setState({
      productDocumentModal: false,
      selectedDocumentType: "",
      selectedDocument: "",
      selectedProduct: "",
    });
  };
  getList = selectedPoint => {
    switch (selectedPoint) {
      case "Product":
        return productList;
      case "Document":
        return documentList;
      case "DocumentType":
        return documentTypeList;
      case "UploadType":
        return Platform.OS === "ios"
          ? this.uploadTypeListIos
          : this.uploadTypeListAndroid;
    }
  };
  onActionsPress = () => {
    this.setState({ productDocumentModal: true });
  };
  render() {





    return (
      <TouchableOpacity
        style={Styles.customMenuStyle}
        onPress={() => this.onActionsPress()}
      >
        {this.state.productDocumentModal && this.renderProductDocument()}
        <Image source={SALE_UPLOAD} style={Styles.icon} />
      </TouchableOpacity>
    );
  }
}