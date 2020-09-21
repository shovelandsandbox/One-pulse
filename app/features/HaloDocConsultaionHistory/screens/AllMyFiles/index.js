import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { PureComponent } from "react";
import Styles from "./styles";
import Pdf from "react-native-pdf";
import { path, map } from "ramda";
import CardView from "react-native-cardview";
import { CoreActionTypes, CoreConfig, metaHelpers, events } from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from '../../../../actions'
const { pageKeys, HALODOC_SERVICE, HALODOC_ALL_MY_FILES } = CoreConfig;
import { connect } from "react-redux";
import { BACK, HALODOC_INLINE_LOGO, Bitmap, CLOSE } from "../../../../config/images";
import moment from "moment";
import MetaConstants from "../../meta";
import {
    findDocumentsByCriteria,
    resetHaloDocProfile
} from '../../action'

class AllMyFiles extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imgModalVisible: false,
            source: "",
            path: "",
            sourceType: "",
        };
        this.MetaConstants = { ...MetaConstants.consultationHistoryMeta() };
    }

    componentWillMount() {
        this.props.resetHaloDocProfile();
    }

    getConsultationId = () => {
        //todo get consultation id from notification
        const cons_Id = path(
            ["navigation", "state", "params", "content", "consultation_id"], this.props);
        if (cons_Id) {
            return cons_Id
        } else {
            const param = path(
                ["navigation", "state", "params", "content"], this.props);
            let content = JSON.parse(param);
            return content.consultation_id
        }

    };

    componentDidMount() {
        this.props.findDocumentsByCriteria(
            this.getConsultationId(),
            "prescription"
        );
        this.props.findDocumentsByCriteria(this.getConsultationId(), "Referral");
        this.props.findDocumentsByCriteria(this.getConsultationId(), "DoctorNotes");
        this.props.findDocumentsByCriteria(
            this.getConsultationId(),
            "DigitalReceipt"
        );
        this.props.findDocumentsByCriteria(this.getConsultationId(), "followUp");
        this.props.dispatchEvent(events.haloDocAllMyFilesScreen)
    }

    onRetryPress = () => {
        this.props.resetHaloDocProfile();
        this.props.findDocumentsByCriteria(
            this.getConsultationId(),
            "prescription"
        );
        this.props.findDocumentsByCriteria(this.getConsultationId(), "Referral");
        this.props.findDocumentsByCriteria(this.getConsultationId(), "DoctorNotes");
        this.props.findDocumentsByCriteria(
            this.getConsultationId(),
            "DigitalReceipt"
        );
        this.props.findDocumentsByCriteria(this.getConsultationId(), "followUp");
    };

    showMyDocFile = data => {
        this.setState({
            imgModalVisible: true,
            source: data.content,
            path: data.contentType.indexOf("pdf") > -1,
            sourceType: data.contentType,
        });
    };

    getDocumentType = typeKey => {
        let typeStr = "";
        switch (typeKey) {
            case "prescription":
                typeStr = "Medical Prescription";
                break;
            case "DoctorNotes":
                typeStr = "Doctor Notes";
                break;
            case "Referral":
                typeStr = "Referral Notes";
                break;
            case "DigitalReceipt":
                typeStr = "Digital Receipt";
                break;
            case "followUp":
                typeStr = "Doctor Followup";
                break;
            default:
                typeStr = "";
                break;
        }
        return typeStr;
    };

    headerView() {
        return (
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={Styles.backButton}
                    >
                        <Image
                            style={Styles.backIcon}
                            source={BACK}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityLabel="home"
                        accesible
                        style={Styles.haloDoc}
                    >
                        <Image
                            style={Styles.haloDocIcon}
                            resizeMode="contain"
                            source={HALODOC_INLINE_LOGO}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    scrollComponent() {
        const list = path(["navigation", "state", "params", "list"], this.props);
        const haloDocProfile = list
            ? list
            : this.props.haloDocProfile
                ? map((item) => ({
                    ...item,
                    filename: item.filename,
                    type: item.type,
                }), this.props.haloDocProfile)
                : [];
        return (
            <ScrollView>
                {map((item, index) => {
                    let type = false;
                    let tempDate = item.auditDetail
                        ? moment(
                            item.auditDetail.updateTime
                                ? item.auditDetail.updateTime
                                : item.auditDetail.createTime
                        ).format("DD MMMM YYYY h:mm A")
                        : null;
                    if (this.date !== tempDate) {
                        this.date = tempDate;
                        type = true;
                    }
                    return (
                        <View key={index}>
                            {type ? (
                                <View>
                                    <Text style={Styles.date}>{this.date}</Text>
                                </View>
                            ) : null}
                            <TouchableOpacity
                                style={Styles.listFile}
                                onPress={() => this.showMyDocFile(item)}>
                                <View style={Styles.ListFileDetail}>
                                    <View style={Styles.detailFile}>
                                        <Image style={Styles.bitmap} source={Bitmap} />
                                        <View style={Styles.fileTitle}>
                                            <Text style={Styles.titleText}>{item.filename}</Text>
                                            {tempDate ? (
                                                <Text style={Styles.fileTime}>
                                                    {this.MetaConstants.recieved + " " + tempDate}
                                                </Text>
                                            ) : null}
                                            <Text style={Styles.fileType}>
                                                {this.getDocumentType(item.type)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }, haloDocProfile)}
            </ScrollView>
        )
    }

    modalComponent() {
        const source = { uri: "data:application/pdf;base64," + this.state.source };
        return (
            <View style={Styles.modalMainView}>
                <View style={Styles.modalView}>
                    <TouchableOpacity
                        onPress={() => this.setState({ imgModalVisible: false })}
                    >
                        <Image
                            style={Styles.closeIcon}
                            source={CLOSE}
                        />
                    </TouchableOpacity>
                </View>
                {this.state.sourceType != "application/pdf" ? (
                    <View
                        style={Styles.imageView}
                    >
                        <Image
                            style={Styles.onlineImage}
                            source={{
                                uri: `data:image/jpeg;base64,${this.state.source}`,
                            }}
                        />
                    </View>
                ) : (
                        <Pdf
                            source={source}
                            onLoadComplete={(numberOfPages, filePath) => {
                            }}
                            onPageChanged={(page, numberOfPages) => {
                            }}
                            onError={error => {
                            }}
                            style={{ flex: 1 }}
                        />
                    )}
            </View>
        )
    }

    cardComponent() {
        return (
            <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={5}
                style={Styles.cardViewStyle}
            >
                <View style={Styles.retryContainer}>
                    <Text>{this.MetaConstants.pleaseText}</Text>

                    <TouchableOpacity
                        style={Styles.retryView}
                        onPress={this.onRetryPress}
                    >
                        <Text style={Styles.videoText}>{this.MetaConstants.retryText}</Text>
                    </TouchableOpacity>
                </View>
            </CardView>
        )
    }
    render() {
        const list = path(["navigation", "state", "params", "list"], this.props);

        const haloDocProfile = list
            ? list
            : this.props.haloDocProfile
                ? map((item) => ({
                    ...item,
                    filename: item.filename,
                    type: item.type,
                }), this.props.haloDocProfile)
                : [];
        const patchPostMessageFunction = () => {
            const originalPostMessage = window.postMessage;
            const patchedPostMessage = function (message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };

            patchedPostMessage.toString = () => {
                return String(Object.hasOwnProperty).replace(
                    "hasOwnProperty",
                    "postMessage"
                );
            };
            window.postMessage = patchedPostMessage;
        };

        const patchPostMessageJsCode =
            "(" + String(patchPostMessageFunction) + ")();";

        return (
            <View style={Styles.All}>
                {this.headerView()}
                <View style={Styles.medicalTitle}>
                    <Text style={Styles.medicalText}>{this.MetaConstants.allMyFiles}</Text>
                </View>
                {haloDocProfile && haloDocProfile.length > 0 ? this.scrollComponent() : this.props.isHaloDocProfileError ? this.cardComponent() : null}
                {this.state.imgModalVisible ? this.modalComponent() : null}
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        haloDocProfile: state.consulationHistoryHaloDoc.haloDocProfile,
        isHaloDocProfileError: state.consulationHistoryHaloDoc.isHaloDocProfileError,
    };
};
export default connect(mapStateToProps, {
    dispatchEvent,
    findDocumentsByCriteria,
    resetHaloDocProfile,
})(AllMyFiles);
