import rewardScreenNames from "../features/rewards/configs/screenNames";
import rewardActionNames from "../features/rewards/configs/actionNames";
import { updateProfile } from "../features/pru-wizard/actions";

/* Sample Payload
{
    "code": "TeleConsultation",
    "name": "Free Teleconsulation",
    "description": "Free Doctor teleconsultation",
    "discountType": "Free",
    "expiry": "2020-05-31T18:35:14.794+0530",
    "category": "Health",
    "type": "VOUCHER",
}
*/
export const updateCustomerWallet = (
    { code, name, description, discountType, expiry, category, type }
) => {
    return {
        context: rewardScreenNames.REWARD_SERVICE_SUMMARY,
        type: rewardActionNames.updateCustomerWallet,
        payload: {
            code, name, description, discountType, expiry, category, type
        }
    }
}

export const getCustomerWallet = () => {
    return {
        context: rewardScreenNames.REWARD_SERVICE_SUMMARY,
        type: rewardActionNames.getCustomerWalletDetail
    }
}

export const updateProfileInReducer = updateProfile;

export const updateCustomerDetails = () => ({
    context: "COMMON_UPDATE_CUSTOMER",
    type: "UPDATE_FULL_FROM_STATE",
    payload: {}
})
