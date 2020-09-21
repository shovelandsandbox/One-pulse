import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";
const {
    CONSULTATION_HISTORY,
    HALODOC_CONSULTATION_HISTORY_MEDICAL_TILE,
    HALODOC_CONSULTATION_HISTORY_MEDICAL_DESC,
    HALODOC_CONSULTATION_HISTORY_TITLE,
    HALODOC_CONSULTATION_HISTORY_LOAD_MORE,
    HALODOC_CONSULTATION_HISTORY_NO_CONVERSATION,
    HALODOC_CONSULTATION_HISTORY_PLEASE,
    HALODOC_CONSULTATION_HISTORY_RETRY,
    HALODOC_CONSULTATION_HISTORY_ALL_MY_FILES,
    HALODOC_CONSULTATION_HISTORY_RECIEVED,
    HALODOC_CONSULTATION_HISTORY_DATE,
    HALODOC_CONSULTATION_HISTORY_PATIENT_NOTE,
    HALODOC_CONSULTATION_HISTORY_DIAGNOSIS,
    HALODOC_CONSULTATION_HISTORY_MODEL_CLOSE,
    HALODOC_CONSULTATION_HISTORY_CHAT,
    HALODOC_CONSULTATION_HISTORY_ATTACHMENT,
    HALODOC_CONSULTATION_HISTORY_RECIEPT,
    HALODOC_CONSULTATION_HISTORY_PRESCRIPTION,
    HALODOC_CONSULTATION_HISTORY_NOTE,
    HALODOC_CONSULTATION_HISTORY_FOLLOW_UP,
    HALODOC_CONSULTATION_HISTORY_REFERRAL,
    HaloDoc_STARTED,
    HaloDoc_CLOSED,
    HaloDoc_COMPLETED,
    HaloDoc_REQUESTED,
    HALODOC_SERVICE


} = CoreConfig;
const fetchLabel = (value, defaultValue) =>
    value ? value.label : defaultValue;
const consultationHistoryMeta = () => {
    return {
        medicalTileText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_MEDICAL_TILE),
            "medicalTileText"
        ),
        medicalDescText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_MEDICAL_DESC),
            "medicalDescText"
        ),
        title: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_TITLE),
            "title"
        ),
        loadMore: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_LOAD_MORE),
            "loadMore"
        ),
        allMyFiles: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_ALL_MY_FILES),
            "allMyFiles"
        ),
        recieved: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_RECIEVED),
            "recieved"
        ),
        pleaseText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_PLEASE),
            "pleaseText"
        ),
        retryText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_RETRY),
            "retryText"
        ),
        noConversationText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_NO_CONVERSATION),
            "noConversationText"
        ),
        dateText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_DATE),
            "dateText"
        ),
        patientNoteText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_PATIENT_NOTE),
            "patientNoteText"
        ),
        diadnosisText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_DIAGNOSIS),
            "diadnosisText"
        ),
        modalCloseText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_MODEL_CLOSE),
            "modalCloseText"
        ),
        chatText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_CHAT),
            "chatText"
        ),
        attachmentText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_ATTACHMENT),
            "attachmentText"
        ),
        recieptText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_RECIEPT),
            "recieptText"
        ),
        prescriptionText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_PRESCRIPTION),
            "prescriptionText"
        ),
        noteText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_NOTE),
            "noteText"
        ),
        followUpText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_FOLLOW_UP),
            "followUpText"
        ),
        referralText: fetchLabel(
            helpers.findElement(CONSULTATION_HISTORY, HALODOC_CONSULTATION_HISTORY_REFERRAL),
            "referralText"
        ),

        HaloDocstarted: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HaloDoc_STARTED),
            "HaloDocstarted"
        ),
        HaloDocclosed: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HaloDoc_CLOSED),
            "HaloDocclosed"
        ),
        HaloDoccompleted: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HaloDoc_COMPLETED),
            "HaloDoccompleted"
        ),
        HaloDocrequested: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HaloDoc_REQUESTED),
            "HaloDocrequested"
        ),

    }
}

export default {
    consultationHistoryMeta
};