import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";
const {
    HALODOC_SERVICE,
    HALODOC_TERMS_TITLE,
    TALKTOADOCTOR,
    TALKTOADOCTOR_WHENEVER,
    TALKTOADOCTOR_APPEARSONCALL,
    TALKTOADOCTOR_TC,
    TALKTOADOCTOR_IAGREE,
    HALODOC_TERMS_AND_CONDITIONS,
    HEALTHDASHBOARD,
    HALODOC,
    HALODOC_BY_CLICKING_BELOW_PART,
    HALODOC_PRIVACY_POLICY_NOTICE,
    HALODOC_TNC,
    NEW_PRIVACYNOTICE,
    HALODOC_CONFIRM_PROFILE,
    HALODOC_CONFIRM_PROFILE_MESSAGE,
    HALODOC_BY_CLICKING_BELOW,
    HALODOC_ACCEPT,
    HALODOC_DOC,
    HALODOC_CONNECTING,
    SCREEN_KEY_TELECONSULTATION_PAYMENT_SUMMARY,
    TELECONSULTATION_PAYMENT_AUTO_APPLIED_DISCOUNT,
    TELECONSULTATION_PAYMENT_COUPON_DISCOUNT,
    TELECONSULTATION_PAYMENT_SUMMARY_TITLE,
    TELECONSULTATION_PAYMENT_APPLY_COUPON_ERROR_MSG,
    TELECONSULTATION_PAYMENT_REMOVE_COUPON_ERROR_MSG,
    TELECONSULTATION_PAYMENT_EMPTY_COUPON_ERROR_MSG,
    TELECONSULTATION_PAYMENT_REMOVE_COUPON,
    TELECONSULTATION_PAYMENT_APPLY_COUPON_PLACEHOLDER,
    TELECONSULTATION_PAYMENT_APPLY_COUPON,
    TELECONSULTATION_PAYMENT_SESSION_FEE,
    TELECONSULTATION_PAYMENT_TOTAL_SAVINGS,
    TELECONSULTATION_PAYMENT_TOTAL_AMOUNT,
    TELECONSULTATION_PAYMENT_METHOD_TITLE,
    TELECONSULTATION_PAYMENT_CARD_DISCOUNT_DISCLAIMER,

    TELECONSULTATION_PAYMENT_PAID_CONSULTATION_PROCEED_BUTTON,
    TELECONSULTATION_PAYMENT_FREE_CONSULTATION_PROCEED_BUTTON,
    HALODOC_WAITING_FOR_DOC,
    HALODOC_CONFIRMATION,
    HALODOC_DOC_ACCEPTED_REQ,
    HALODOC_SEC,
    HALODOC_USER_CANCEL_TITLE,
    HALODOC_USER_CANCEL_DESC,
    HALODOC_EMPTY_CHAT_TEXT,

    NEW_PRPFILE,
    SCREEN_KEY_MANAGE_PROFILE,
    REWARDPHONE,
    HALODOC_YEARS,
    HALODOC_YEAR,
    HALODOC_DR,
    HALODOC_RP,
    HALODOC_NOT_AVAILABLE,
    HALODOC_ACTIVE,
    HALODOC_SORRY_MSG,
    HALODOC_SEARCH_FOR_RESULTS,
    HALODOC_VIDEO,
    HALODOC_AUDIO,
    HALODOC_DOCTOR_JOINCALL,
    HALODOC_DOCTOR_JOINED_CHAT,
    HALODOC_LIKES,
    HALODOC_EXPERIENCE,
    HALODOC_GRADUATED_FROM,
    HALODOC_PRACTICE_PLACE,
    HALODOC_CONSULTATION_FEES,
    HALODOC_PAYMENT,
    HALODOC_REQUEST,
    HALODOC_MAKE_REQUEST,
    HALODOC_CANCEL,
    HALODOC_PROCEED,
    HALODOC_BOOK_APP,
    HALODOC_MIN_ALERT,
    HALODOC_SEARCH_BY,
    HALODOC_SEARCH,
    HALODOC_RECENT,
    HALODOC_UNVERIFIED,
    HALODOC_CATEGORIES_WITH,
    HALODOC_DOCTORS_WITH_NAME,
    HALODOC_DOCTORS_CAT,
    HALODOC_SPECIALITY_CAT,
    REWARDPHONE_ENTERCODETOCONTINUE,
    HALODOC_DOC_OTP,
    HALODOC_XX,
    HALODOC_VERIFY_IDENTITY,
    HALODOC_CODE_RECEIVED,
    HALODOC_CODE_RESEND,
    HALODOC_MALE,
    HALODOC_FEMALE,
    HALODOC_GENDER,
    HALODOC_EMAIL,
    HALODOC_LASTNAME,
    HALODOC_SURNAME,
    HALODOC_VERIFIED,
    HALODOC_FIRST_NAME,
    HALODOC_ALPHABET_VALID,
    HALODOC_PHONE_NUMBER,
    HALODOC_GENDER_REQUIRED,
    HALODOC_IS_REQUIRED,
    HALODOC_NAME,
    HALODOC_TRANSPARENT,
    HALODOC_PRIVACY_POLICY,
    HALODOC_SERVICE_HEIGHT,
    HALODOC_SERVICE_WEIGHT,
    HALODOC_VERIFY_PHONE,
    NEW_PRPFILE_DONE,
    KEY_CAMERA_PERMISSION,
    HALODOC_VERIFY_NOW,
    HALODOC_DOB,
    HALODOC_ENTER_OTP,
    HALODOC_RESEND_OTP,
    HALODOC_PHONE,
    HALODOC_COUNTRY_CODE,
    HALODOC_PRIVACY_POLICY_TITLE,
    CONFIRM_PRIVACY,
    HALODOC_VERIFY,
    HALODOC_DEVICE_ACCESS,
    HALODOC_INVALID_URL,
    HALODOC_CAMERA,
    HALODOC_AND,
    HALODOC_BEFORE_PROCEED,
    HALODOC_0K,
    HALODOC_GRANT_ACCESS,
    HALODOC_SWITCH_VIDEO,
    HALODOC_DOC_JOINED,
    HALODOC_MODAL_CLOSED,
    HALODOC_GALLERY,
    HALODOC_PERMISSION_REQUIRED,
    HALODOC_PERMISSION_DESC,
    HALODOC_PERMISSION_GRANTED,
    HALODOC_PERMISSION_NOT_GRANTED,
    HALODOC_COULDNOT_CONFIRM,
    HALODOC_CREDITDEBIT,
    HALODOC_DISCLAIMER,
    HALODOC_MICROPHONE,
    HALODOC_GENERIC_ERROR,
    HALODOC_ERROR,
    HALODOC_OTPERROR,
    HALODOC_FAILED_CONSULTATION_DETAILS,
    HALODOC_FAILED_ROOM_DETAILS,
    COMMON_KEY_PRIVACY

} = CoreConfig;
const fetchLabel = (value, defaultValue) =>
    value ? value.label : defaultValue;

const talkToDoctorMeta = () => {
    return {
        docEmptyText: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_EMPTY_CHAT_TEXT),
            "docEmptyText"
        ),
        couldNotConfirm: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_COULDNOT_CONFIRM),
            "couldNotConfirm"
        ),
        sessionFee: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, TELECONSULTATION_PAYMENT_SESSION_FEE),
            "sessionFee"
        ),
        creditOrDebit: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_CREDITDEBIT),
            "creditOrDebit"
        ),
        getDiscount: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DISCLAIMER),
            "getDiscount"
        ),




        permRequired: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PERMISSION_REQUIRED),
            "permRequired"
        ),
        permDesc: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PERMISSION_DESC),
            "permDesc"
        ),
        permGranted: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PERMISSION_GRANTED),
            "permGranted"
        ),
        permNotGranted: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PERMISSION_NOT_GRANTED),
            "permNotGranted"
        ),





        deviceAccess: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DEVICE_ACCESS),
            "deviceAccess"
        ),
        invalidUrl: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_INVALID_URL),
            "invalidUrl"
        ),
        Camera: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_CAMERA),
            "Camera"
        ),
        And: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_AND),
            "and"
        ),
        MicroPhone: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_MICROPHONE),
            "MicroPhone"
        ),
        BeforeProceed: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_BEFORE_PROCEED),
            "BeforeProceed"
        ),
        OK: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_0K),
            "OK"
        ),
        grantAccess: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_GRANT_ACCESS),
            "grantAccess"
        ),
        switchToVideo: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SWITCH_VIDEO),
            "switchToVideo"
        ),
        DocJoined: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DOC_JOINED),
            "DocJoined"
        ),
        ModalClosed: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_MODAL_CLOSED),
            "ModalClosed"
        ),
        Gallery: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_GALLERY),
            "Gallery"
        ),

        PulsePrivacyNotice: fetchLabel(
            helpers.findCommon(COMMON_KEY_PRIVACY),
            "PulsePrivacyNotice"
        ),




        consent: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_ACCEPT), ""),
        version: "1.1",
        org: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_DOC), ""),
        privacy: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_ACCEPT), ""),
        title: fetchLabel(helpers.findScreen(HALODOC_SERVICE, HALODOC_TERMS_TITLE), ""),
        title_privacy: fetchLabel(helpers.findScreen(HALODOC_SERVICE, HALODOC_PRIVACY_POLICY_TITLE), ""),
        TERMS_AND_CONDITIONS_HOLODOC_HEADING: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC), ""),
        PRIVACYNOTICE_HALODOC: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_TNC), ""),
        ConfirmProfile: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_CONFIRM_PROFILE), ""),
        ConfirmProfileMessage: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_CONFIRM_PROFILE_MESSAGE), ""),
        Whenever: fetchLabel(helpers.findElement(HALODOC_SERVICE, TALKTOADOCTOR_WHENEVER), ""),
        appearsoncall: fetchLabel(helpers.findElement(HALODOC_SERVICE, TALKTOADOCTOR_APPEARSONCALL), ""),
        ByClickingBelowHalodoc: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_BY_CLICKING_BELOW), ""),
        TermsConditions: fetchLabel(helpers.findElement(HALODOC_SERVICE, TALKTOADOCTOR_TC), ""),
        ByClickingBelowHalodocPart: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_BY_CLICKING_BELOW_PART), ""),
        PrivacyNotice: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_PRIVACY_POLICY_NOTICE), ""),
        IAgree: fetchLabel(helpers.findElement(HALODOC_SERVICE, TALKTOADOCTOR_IAGREE), ""),
        privacyHaloDoc: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_PRIVACY_POLICY), ""),
        termsHaloDoc: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_TERMS_AND_CONDITIONS), ""),
        Connecting: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_CONNECTING), ""),
        promoCodeErrorMsg: fetchLabel(helpers.findElement(HALODOC_SERVICE, TELECONSULTATION_PAYMENT_APPLY_COUPON_ERROR_MSG), ""),
        emptyPromoCodeErrorMsg: fetchLabel(helpers.findElement(HALODOC_SERVICE, TELECONSULTATION_PAYMENT_EMPTY_COUPON_ERROR_MSG), ""),
        removeCodeFailureMsg: fetchLabel(helpers.findElement(HALODOC_SERVICE, TELECONSULTATION_PAYMENT_REMOVE_COUPON_ERROR_MSG), ""),
        removeText: fetchLabel(helpers.findElement(HALODOC_SERVICE, TELECONSULTATION_PAYMENT_REMOVE_COUPON), ""),

        applyText: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_APPLY_COUPON
        ), ""),
        applyPlaceholderText: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_APPLY_COUPON_PLACEHOLDER
        ), ""),
        couponDiscount: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_COUPON_DISCOUNT
        ), ""),
        AutoApplied: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_AUTO_APPLIED_DISCOUNT
        ), ""),
        totalSaving: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_TOTAL_SAVINGS
        ), ""),
        totalAmount: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_TOTAL_AMOUNT
        ), ""),
        paymentSummery: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_METHOD_TITLE
        ), ""),
        payAndContinueBtn: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_PAID_CONSULTATION_PROCEED_BUTTON
        ), ""),

        ProceedBtn: fetchLabel(helpers.findElement(
            HALODOC_SERVICE,
            TELECONSULTATION_PAYMENT_FREE_CONSULTATION_PROCEED_BUTTON
        ), ""),


        secondsText: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_SEC), ""),
        cancelTile: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_USER_CANCEL_TITLE), ""),
        cancelDesc: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_USER_CANCEL_DESC), ""),
        waitingForDoc: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_WAITING_FOR_DOC), ""),
        DocConfirmation: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_CONFIRMATION), ""),
        requestedDoc: fetchLabel(helpers.findElement(HALODOC_SERVICE, HALODOC_DOC_ACCEPTED_REQ), ""),

        Years: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_YEARS),
            "Years"
        ),
        Year: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_YEAR),
            "Year"
        ),
        Dr: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DR),
            "Dr"
        ),
        Rp: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_RP),
            "Rp"
        ),
        Not_Available: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_NOT_AVAILABLE),
            "Not_Available"
        ),
        Active: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_ACTIVE),
            "Active"
        ),
        Done: fetchLabel(
            helpers.findElement(NEW_PRPFILE, NEW_PRPFILE_DONE),
            "Done"
        ),
        Sorry_Msg: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SORRY_MSG),
            "Sorry_Msg"
        ),
        Search_Result: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SEARCH_FOR_RESULTS),
            "Search_Result"
        ),
        Camera_Permission: fetchLabel(
            helpers.findElement(SCREEN_KEY_MANAGE_PROFILE, KEY_CAMERA_PERMISSION),
            "Camera_Permission"
        ),
        Doc_Join_Chat: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DOCTOR_JOINED_CHAT),
            "Doc_Join_Chat"
        ),
        Doc_Join_Call: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DOCTOR_JOINCALL),
            "Doc_Join_Call"
        ),
        Doc_Video: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_VIDEO),
            "Doc_Video"
        ),
        Doc_Audio: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_AUDIO),
            "Doc_Audio"
        ),
        Request: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_REQUEST),
            "Request"
        ),
        Make_Request: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_MAKE_REQUEST),
            "Make_Request"
        ),
        Cancel: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_CANCEL),
            "Cancel"
        ),
        Proceed: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PROCEED),
            "Proceed"
        ),
        Graduated_From: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_GRADUATED_FROM),
            "Graduated_From"
        ),
        Practice_Place: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PRACTICE_PLACE),
            "Practice_Place"
        ),
        Payment: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PAYMENT),
            "Payment"
        ),
        Consultation_Fees: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_CONSULTATION_FEES),
            "Consultation_Fees"
        ),
        Doc_Likes: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_LIKES),
            "Doc_Likes"
        ),
        Doc_Experience: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_EXPERIENCE),
            "Doc_Experience"
        ),
        Book_Appointment: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_BOOK_APP),
            "Book_Appointment"
        ),
        Min_Char_Required: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_MIN_ALERT),
            "Min_Char_Required"
        ),
        Search_By: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SEARCH_BY),
            "Search_By"
        ),
        Search: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SEARCH),
            "Search"
        ),
        Doc_Catergory: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DOCTORS_CAT),
            "Doc_Catergory"
        ),
        Doc_Speciality: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SPECIALITY_CAT),
            "Doc_Speciality"
        ),
        Categories_With: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_CATEGORIES_WITH),
            "Categories_With"
        ),
        Doc_With_Name: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DOCTORS_WITH_NAME),
            "Doc_With_Name"
        ),
        Recent: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_RECENT),
            "Recent"
        ),
        HaloDocOTP: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DOC_OTP),
            "HaloDocOTP"
        ),
        HaloDocXX: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_XX),
            "HaloDocXX"
        ),
        HaloDocXX: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_XX),
            "HaloDocXX"
        ),
        HaloDocVerifyIdentity: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_VERIFY_IDENTITY),
            "HaloDocVerifyIdentity"
        ),
        Enter_Code: fetchLabel(
            helpers.findElement(REWARDPHONE, REWARDPHONE_ENTERCODETOCONTINUE),
            "Enter_Code"
        ),
        Code_Not_Received: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_CODE_RECEIVED),
            "Code_Not_Received"
        ),
        Code_Resend: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_CODE_RESEND),
            "Code_Resend"
        ),
        Transparent: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_TRANSPARENT),
            "Transparent"
        ),
        Male: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_MALE),
            "Male"
        ),
        Female: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_FEMALE),
            "Female"
        ),
        Gender: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_GENDER),
            "Gender"
        ),
        Gender_Required: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_GENDER_REQUIRED),
            "Gender_Required"
        ),
        Verify_Phone: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_VERIFY_PHONE),
            "Verify_Phone"
        ),
        Email: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_EMAIL),
            "Email"
        ),
        SurName: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SURNAME),
            "SurName"
        ),
        LastName: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_LASTNAME),
            "LastName"
        ),
        Name: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_NAME),
            "Name"
        ),
        Unverified: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_UNVERIFIED),
            "Unverified"
        ),
        Verified: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_VERIFIED),
            "Verified"
        ),
        VerifyNow: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_VERIFY_NOW),
            "Verified"
        ),
        isRequired: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_IS_REQUIRED),
            "isRequired"
        ),
        First_Name: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_FIRST_NAME),
            "First_Name"
        ),
        Sur_Name: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SURNAME),
            "Sur_Name"
        ),
        Alphabet_Valid: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_ALPHABET_VALID),
            "Alphabet_Valid"
        ),
        Height: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SERVICE_HEIGHT),
            "Height"
        ),
        Weight: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_SERVICE_WEIGHT),
            "Weight"
        ),
        Phone_Number: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PHONE_NUMBER),
            "Phone_Number"
        ),
        DOB: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_DOB),
            "DOB"
        ),
        Enter_Otp: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_ENTER_OTP),
            "Enter Otp"
        ),
        Resend_Otp: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_RESEND_OTP),
            "Resend Otp"
        ),
        Phone: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_PHONE),
            "Phone"
        ),
        CountryCode: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_COUNTRY_CODE),
            "Country Code"
        ),
        Verify: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_VERIFY),
            "Verify"
        ),
        Confirm_Privacy: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, CONFIRM_PRIVACY),
            ""
        ),
        Generic_Error: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_GENERIC_ERROR),
            "Verify"
        ),
        Error: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_ERROR),
            ""
        ),
        OTPError: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_OTPERROR),
            ""
        ),
        ConsultationDetailsFailed: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_FAILED_CONSULTATION_DETAILS),
            ""
        ),
        RoomDetailsFailed: fetchLabel(
            helpers.findElement(HALODOC_SERVICE, HALODOC_FAILED_ROOM_DETAILS),
            ""
        ),
    };
};

export default {
    talkToDoctorMeta
};
