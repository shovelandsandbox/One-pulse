import screenNames from "./configs/screenNames";

import CollectSocialRegnEmail from "./screens/CollectEmail";

export const CollectSocialRegEmailScreenConfigs = {
    [screenNames.COLLECT_SOCIAL_REGN_EMAIL]: {
        screen: CollectSocialRegnEmail,
        navigationOptions: {
            header: null
        }
    }
}