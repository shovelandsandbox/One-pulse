import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";

import {
    OPEN_SOCIAL_REFERRAL_MODAL,
    CLOSE_SOCIAL_REFERRAL_MODAL,
    SOCIAL_REFERRAL_CONTEXT,
    SOCIAL_REFERRAL_TYPE_IDENTIFIER,
    SOCIAL_REFERRAL_ENABLE_INVITE_DONE_MODAL,
    SOCIAL_REFERRAL_DISABLE_INVITE_DONE_MODAL
} from '../actions/Types.js'

const initialState = {
    socailShareReferral: false,
    socialShareReferralContext: 'invite',
    socialReferralType: "",
    socialReferralIdentifier: "",
};

const socialReferralReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SOCIAL_REFERRAL_MODAL: {
            return { ...state, socailShareReferral: true };
        }
        case CLOSE_SOCIAL_REFERRAL_MODAL: {
            return { ...state, socailShareReferral: false };
        }
        case SOCIAL_REFERRAL_CONTEXT: {
            return { ...state, socialShareReferralContext: action.payload };
        }
        case SOCIAL_REFERRAL_TYPE_IDENTIFIER: {
            return { ...state, socialReferralType: action.payload.type, socialReferralIdentifier: action.payload.identifier };
        }
        case SOCIAL_REFERRAL_ENABLE_INVITE_DONE_MODAL: {
            return { ...state, referralEnableInviteDone: true };
        }
        case SOCIAL_REFERRAL_DISABLE_INVITE_DONE_MODAL: {
            return { ...state, referralEnableInviteDone: false };
        }
        default:
            return { ...state };
    }
};

export default socialReferralReducer;
