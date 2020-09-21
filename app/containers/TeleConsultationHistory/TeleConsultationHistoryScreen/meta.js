import { CoreConfig, metaHelpers, CoreConstants } from "@pru-rt-internal/pulse-common";
const {
    TALKTOADOCTOR,
} = CoreConfig;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen = metaHelpers.findBackendErrorMessageByScreen;

const {
    CONSULTATION_HISTORY_TITLE,
    CONSUL_HISTORY_CONSUL_DATE,
    CONSUL_HISTORY_PATIENT_NOTE,
    CONSUL_HISTORY_DIAGNOSIS,
    CONSUL_HISTORY_DOCTORS_CHAT,
    CONSUL_HISTORY_CONCIERGE_CHAT,
    CONSUL_HISTORY_ATTACHMENTS,
    CONSUL_HISTORY_MEDICAL_CERTIFICATE,
    CONSUL_HISTORY_PRESCRIPTION,
    CONSUL_HISTORY_RECIEPT,
    CONSUL_HISTORY_REFERRAL_LETTER,
    CONSUL_HISTORY_CASE_NOTES,
    CONSUL_HISTORY_OTHER_DOCUMENTS,
    CONSUL_HISTORY_OTHER_IMAGES,
    CONSUL_HISTORY_FOLLOW_UP,
    CONSUL_HISTORY_SPECIALIST,
    CONSUL_HISTORY_MYDOC_REFERRAL,
    CONSUL_HISTORY_ALLIED_HEALTH,
    CONSUL_HISTORY_PRESENTING_COMPLAINTS
} = CoreConstants;

const initializeScreenMeta = () => {

    const consultationHistoryLabel = findElement(TALKTOADOCTOR, CONSULTATION_HISTORY_TITLE).label;
    const consulHistoryConsulDateLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_CONSUL_DATE).label;
    const consulHistoryPatientNoteLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_PATIENT_NOTE).label;
    const consulHistoryDiagnosisLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_DIAGNOSIS).label;
    const consulHistoryDoctorsChatLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_DOCTORS_CHAT).label;
    const consulHistoryConciergeChatLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_CONCIERGE_CHAT).label;
    const consulHistoryAttachmentsLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_ATTACHMENTS).label;
    const consulHistoryMedicalCertificateLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_MEDICAL_CERTIFICATE).label;
    const consulHistoryPrescriptionLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_PRESCRIPTION).label;
    const consulHistoryRecieptLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_RECIEPT).label;
    const consulHistoryReferralLetterLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_REFERRAL_LETTER).label;
    const consulHistoryCaseNotesLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_CASE_NOTES).label;
    const consulHistoryOtherDocumentsLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_OTHER_DOCUMENTS).label;
    const consulHistoryOtherImagesLabel = findElement(TALKTOADOCTOR, CONSUL_HISTORY_OTHER_IMAGES).label;
    const consulHistoryFollowUp = findElement(TALKTOADOCTOR, CONSUL_HISTORY_FOLLOW_UP).label;
    const consulHistorySpecialist = findElement(TALKTOADOCTOR, CONSUL_HISTORY_SPECIALIST).label;
    const consulHistoryMydocReferral = findElement(TALKTOADOCTOR, CONSUL_HISTORY_MYDOC_REFERRAL).label;
    const consulHistoryAlliedHealth = findElement(TALKTOADOCTOR, CONSUL_HISTORY_ALLIED_HEALTH).label;
    const consulHistoryPresentingComplaints = findElement(TALKTOADOCTOR, CONSUL_HISTORY_PRESENTING_COMPLAINTS).label;
    return {
        consultationHistoryLabel,
        consulHistoryConsulDateLabel,
        consulHistoryPatientNoteLabel,
        consulHistoryDiagnosisLabel,
        consulHistoryDoctorsChatLabel,
        consulHistoryConciergeChatLabel,
        consulHistoryAttachmentsLabel,
        consulHistoryMedicalCertificateLabel,
        consulHistoryPrescriptionLabel,
        consulHistoryRecieptLabel,
        consulHistoryReferralLetterLabel,
        consulHistoryCaseNotesLabel,
        consulHistoryOtherDocumentsLabel,
        consulHistoryOtherImagesLabel,
        consulHistoryFollowUp,
        consulHistorySpecialist,
        consulHistoryMydocReferral,
        consulHistoryAlliedHealth,
        consulHistoryPresentingComplaints
    };
}

export default MetaConstants = {
    findElement,
    findCommon,
    findErrorMessage,
    findCommonErrorMessages,
    findBackendErrorMessage,
    findBackendErrorMessageByScreen,
    initializeScreenMeta
}