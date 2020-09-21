import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";
const {
    CHATBOT_ASSESSMENT,
    CHATBOT_ASSESSMENT_PROD_URL,
    CHATBOT_ASSESSMENT_STAGE_URL
} = CoreConfig;
const fetchLabel = (value, defaultValue) =>
    value ? value.url : defaultValue;

const initializeChatbotAssessmentScreenMeta = () => {
    return {
        prodUrl: fetchLabel(
            helpers.findElement(CHATBOT_ASSESSMENT, CHATBOT_ASSESSMENT_PROD_URL),
            "prodUrl"
        ),
        stageUrl: fetchLabel(
            helpers.findElement(CHATBOT_ASSESSMENT, CHATBOT_ASSESSMENT_STAGE_URL),
            "stageUrl"
        )
    };
};

export default {
    initializeChatbotAssessmentScreenMeta,
};
