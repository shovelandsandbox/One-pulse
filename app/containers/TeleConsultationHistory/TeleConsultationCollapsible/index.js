import React from "react";
import {
    NativeModules,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    View, Image, SafeAreaView
} from "react-native";
import moment from "moment";
import DetailArrowCell from "../../../components/DetailArrowCell";
import {
    Bitmap,
    AttachedLink,
    Clock,
    VideoCall,
    LARGEYELLOWROBOT,
    IconChevronUp,
    IconChevronDown,
    Prescription,
    ReferralLetter,
    MedicationCertificate,
    CaseNote,
    Receipt,
    CLOSE
} from "../../../config/images";

import {
    metaHelpers,
    CoreConfig,
    CoreUtils,
    events
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";
const { isNilOrEmpty } = CoreUtils;
const { pageKeys } = CoreConfig;

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Accordion extends React.Component {
    state = {
        w: 350,
        h: 0,
        openClose: false,
        modalVisible: false,
        accordion: this.props.accordion,
        caseNotes: []
    };

    _onPress = () => {
        this.props.dispatchEvent(events.MyDocConsultationHistoryExpandButtonClick)
        if (!this.state.openClose) {
            this.setState({
                openClose: true,
                w: this.state.w,
                h: this.state.h + 100
            })
        } else {
            this.setState({
                openClose: false,
                w: this.state.w,
                h: this.state.h - 100
            })
        }
    }

    goToChat(item) {
        this.setState({
            w: 350,
            h: 0,
            openClose: false
        });
        this.props.gotoWithParams(pageKeys.MY_DOC_CHAT_SCREEN, {
            agentChat: true,
            chathistory: item.session.status.toUpperCase() === "ACTIVE" ? false : true,
            episodeId: item.id
        });
    }

    goFile(item) {
        this.setState({
            w: 350,
            h: 0,
            openClose: false
        });
        if (item.category === "casenotes") {
            this.setState({
                caseNotes: item.list,
                modalVisible: true
            })
        }
        else {
            this.props.gotoWithParams(pageKeys.MYDOC_CONSULTATION_FILES, {
                list: item.list
            })
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    renderItem = (item) => {
        const { metaConstants } = this.props;
        return (
            <View style={styles.caseModalContainer}>
                <View style={styles.caseModalContent}>
                    <Text style={styles.caseModalText}>{metaConstants.consulHistoryConsulDateLabel}: </Text>
                    <Text style={styles.notesText}>{moment(item.item.created_at).format("DD/MM/YYYY")}</Text>
                </View>
                <View style={styles.caseModalContent}>
                    <Text style={styles.caseModalText}>{metaConstants.consulHistoryPresentingComplaints}: </Text>
                    <Text style={styles.notesText}>{item.item.revisions[0].presenting_complaint}</Text>
                </View>
                <View style={styles.caseModalContent}>
                    <Text style={styles.caseModalText}>{metaConstants.consulHistoryDiagnosisLabel}: </Text>
                    {item.item.revisions[0].icd10Codes.length > 0 ?
                        <View style={{ flex: 1, flexWrap: "wrap" }}>
                            {
                                item.item.revisions[0].icd10Codes.map((k) => {
                                    return <Text style={styles.notesText}>{k.name} . </Text>;
                                })
                            }
                        </View> :
                        <Text style={styles.notesText}>{item.item.revisions[0].diagnosis}</Text>
                    }
                </View>
                <View style={styles.caseModalContent}>
                    <Text style={styles.caseModalText}>{metaConstants.consulHistoryPatientNoteLabel}: </Text>
                    <Text style={styles.notesText}>{item.item.revisions[0].patient_note}</Text>
                </View>
                <View style={styles.caseModalContent}>
                    <Text style={styles.caseModalText}>{metaConstants.consulHistoryFollowUp}: </Text>
                    <Text style={styles.notesText}>{!isNilOrEmpty(item.item.revisions[0].followup) ? moment(item.item.revisions[0].followup).format("DD/MM/YYYY HH:MM") : ""}</Text>
                </View>
                <View style={styles.caseModalContent}>
                    <Text style={styles.caseModalText}>{metaConstants.consulHistorySpecialist}: </Text>
                    <Text style={styles.notesText}>{item.item.revisions[0].specialist_referred}</Text>
                </View>
                <View style={styles.caseModalContent}>
                    <Text style={styles.caseModalText}>{metaConstants.consulHistoryMydocReferral}: </Text>
                    <Text style={styles.notesText}>{item.item.revisions[0].mydoc_referred}</Text>
                </View>
                <View style={styles.caseModalContent}>
                    <Text style={styles.caseModalText}>{metaConstants.consulHistoryAlliedHealth}: </Text>
                    <Text style={styles.notesText}>{item.item.revisions[0].allied_health_referred}</Text>
                </View>
            </View>
        );

    }

    prepareCaseNotesModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
            >
                <SafeAreaView style={styles.closeStyle}>
                    <View style={{ alignItems: 'flex-end', margin: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Image style={{ width: 28, height: 28, }} source={CLOSE} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <FlatList
                                data={this.state.caseNotes}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>);
    }

    render() {
        const item = this.props.accordion;
        const { metaConstants } = this.props;
        return (
            <View style={styles.container}>
                {this.state.caseNotes.length > 0 && this.prepareCaseNotesModal()}
                <TouchableOpacity onPress={this._onPress}>
                    <View style={styles.press}>
                        <View style={styles.docName}>
                            <View>
                                <Image
                                    style={{ width: 40, height: 40 }}
                                    style={[styles.docImage, { backgroundColor: "white" }]}
                                    source={item.message.attributes && item.message.attributes.avatar_url ? { uri: item.message.attributes.avatar_url } : LARGEYELLOWROBOT} />
                            </View>
                            <View>
                                <Text style={styles.docText}>
                                    {item.sender}
                                </Text>
                            </View>
                            <View style={{ display: this.state.openClose ? "none" : "flex" }}>
                                <Image style={styles.chevron} source={IconChevronDown} />
                            </View>
                            <View style={{ display: !this.state.openClose ? "none" : "flex" }}>
                                <Image style={styles.chevron} source={IconChevronUp} />
                            </View>
                        </View>
                        <View style={styles.funcList}>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={styles.funcList1} source={Clock} />
                                <Text style={styles.funcList1Text}>
                                    {item.message && item.message.attributes &&
                                        item.message.attributes.appointment && item.message.attributes.appointment.timeslots ? new Date(item.message.attributes.appointment.timeslots[0].startTime).getHours() + ":" + new Date(item.message.attributes.appointment.timeslots[0].startTime).getMinutes()
                                        + ":" + new Date(item.message.attributes.appointment.timeslots[0].startTime).getSeconds() : 0
                                    }
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={styles.videoIcon} source={VideoCall} />
                                <Text style={styles.funcList1Text}>
                                    {item.message && item.message.attributes && item.message.attributes.appointment && item.message.attributes.appointment.timeslots ? item.message.attributes.appointment.timeslots[0].duration + "m" : "0m"}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                <Image style={styles.funcList1} source={AttachedLink} />
                                <Text style={styles.funcList1Text}>
                                    {item.files ? item.files.length : 0}
                                </Text>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>
                {this.state.openClose ?
                    <View style={[styles.boxDetail]}>
                        <View style={styles.detailArrow}>
                            {item.sender.indexOf("Dr") > -1 ?
                                <DetailArrowCell
                                    labelText={metaConstants.consulHistoryDoctorsChatLabel}
                                    hideArrow={false}
                                    MessageSign={true}
                                    onPress={() => {
                                        this.props.dispatchEvent(events.MyDocConsultationHistoryChatHistoryClick)
                                        this.setState({
                                            w: 350,
                                            h: 0,
                                            openClose: false
                                        });
                                        this.props.gotoWithParams(pageKeys.MY_DOC_CHAT_SCREEN, {
                                            chathistory: true,
                                            episodeId: item.id
                                        });
                                    }}
                                /> :
                                <DetailArrowCell
                                    labelText={metaConstants.consulHistoryConciergeChatLabel}
                                    hideArrow={false}
                                    MessageSign={true}
                                    onPress={() => {
                                        this.props.dispatchEvent(events.MyDocConsultationHistoryChatHistoryClick)
                                        this.goToChat(item);
                                    }} />
                            }

                        </View>
                        {item.files && item.files.length ?
                            <View style={styles.attach}>
                                <View style={styles.attachTitle}>
                                    <Image style={styles.attachTitleImage} source={AttachedLink} />
                                    <Text style={styles.attachTitleText}>
                                        {metaConstants.consulHistoryAttachmentsLabel}
                                    </Text>
                                </View>
                                <View style={styles.attachList}>
                                    {
                                        item.files.map((x) => {
                                            const types = x.category.toLowerCase();
                                            let title;
                                            let img;
                                            let event;
                                            if (types === "emc") {
                                                title = metaConstants.consulHistoryMedicalCertificateLabel;
                                                img = MedicationCertificate;
                                                event = events.MyDocConsultationHistoryMedicalCertificateClick
                                            }
                                            else if (types === "prescription") {
                                                title = metaConstants.consulHistoryPrescriptionLabel;
                                                img = Prescription;
                                                event = events.MyDocConsultationHistoryPrescriptionClick
                                            }
                                            else if (types === "invoice") {
                                                title = metaConstants.consulHistoryRecieptLabel;
                                                img = Receipt;
                                                event = events.MyDocConsultationHistoryInvoiceClick
                                            }
                                            else if (types === "referral") {
                                                title = metaConstants.consulHistoryReferralLetterLabel;
                                                img = ReferralLetter;
                                                event = events.MyDocConsultationHistoryReferralClick
                                            }
                                            else if (types === "casenotes") {
                                                title = metaConstants.consulHistoryCaseNotesLabel;
                                                img = CaseNote;
                                                event = events.MyDocConsultationHistoryCaseNotesClick
                                            }
                                            else if (types === "document") {
                                                title = metaConstants.consulHistoryOtherDocumentsLabel;
                                                img = Bitmap;
                                                event = events.MyDocConsultationHistoryDocumentClick
                                            }
                                            else if (types === "image") {
                                                title = metaConstants.consulHistoryOtherImagesLabel;
                                                img = Bitmap;
                                                event = events.MyDocConsultationHistoryImageClick
                                            } else {
                                                return;
                                            }
                                            return (
                                                <View style={styles.listDetail}>
                                                    <TouchableOpacity onPress={() => {
                                                        // console.log("item click:", x)
                                                        this.props.dispatchEvent(event)
                                                        this.goFile(x);
                                                    }}>
                                                        <Image
                                                            style={styles.badgeImage}
                                                            source={img}
                                                            resizeMode="contain"
                                                        />
                                                        <Text style={{ fontWeight: "600" }}>
                                                            {title}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })
                                    }
                                </View>
                            </View> : null
                        }
                    </View> : null
                }
            </View>
        );
    }
}
