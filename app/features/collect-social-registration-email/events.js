import screenNames from "./configs/screenNames";

export const eventNames = {
    collectSocialEmailScreen: "collectSocialEmailScreen",
};

export default {
    [eventNames.collectSocialEmailScreen]: {
        platform: attributes => ({
            type: "ScreenEvent",
            name: "pulse.socialLogin.noEmail.collectEmail",
            tags: ["SocialLoginWithoutEmail"],
            attributes,
        }),
        firebase: screenNames.COLLECT_SOCIAL_REGN_EMAIL,
    },
};
