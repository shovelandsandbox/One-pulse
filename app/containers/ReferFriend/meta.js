import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

const {
    INVITE_FRIEND_SCREEN,
    ELEMENT_KEY_INVITE_FRIEND_DESC_TEXT_1,
    ELEMENT_KEY_INVITE_FRIEND_DESC_TEXT_2,
    ELEMENT_KEY_INVITE_FRIEND_BTN_TEXT,
    ELEMENT_KEY_INVITE_FRIEND_SKIP
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
    value ? value.label : defaultValue;

const getScreenContext = () => {
    let screenElement = helpers.findScreen(INVITE_FRIEND_SCREEN);
    return screenElement.context;
}

const getImage = () => {
    let screenElement = helpers.findScreen(INVITE_FRIEND_SCREEN);
    return screenElement.image;
}
const getScreenMode = () => {
    let screenElement = helpers.findScreen(INVITE_FRIEND_SCREEN);
    return screenElement.screenMode;
}

const showDescription = () => {
    let screenElement = helpers.findScreen(INVITE_FRIEND_SCREEN);
    return screenElement.showDescription;
}

const initializeScreenMeta = () => {
    return {
        descriptionText1: fetchLabel(
            helpers.findElement(INVITE_FRIEND_SCREEN, ELEMENT_KEY_INVITE_FRIEND_DESC_TEXT_1),
            "descriptionText1"
        ),
        descriptionText2: fetchLabel(
            helpers.findElement(INVITE_FRIEND_SCREEN, ELEMENT_KEY_INVITE_FRIEND_DESC_TEXT_2),
            "descriptionText2"
        ),
        inviteBtnText: fetchLabel(
            helpers.findElement(INVITE_FRIEND_SCREEN, ELEMENT_KEY_INVITE_FRIEND_BTN_TEXT),
            "inviteBtnText"
        ),
        skip: fetchLabel(
            helpers.findElement(INVITE_FRIEND_SCREEN, ELEMENT_KEY_INVITE_FRIEND_SKIP),
            "Skip"
        ),
    }
}
export default {
    initializeScreenMeta,
    getScreenContext,
    getImage,
    getScreenMode,
    showDescription
};
