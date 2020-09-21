import {
  metaHelpers as helpers,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";
import screenNames from "./configs/screenNames";

const {
  VIDEO_SALES,
  INITIATE_VIDEO_CALL,
  SUCCESSFULLY_DOWNLOADED,
  DOWNLOAD_FAILED,
  EXIT_CHAT,
  EXIT_YES,
  EXIT_NO,
  NEED_ACCESS_TO,
  CAMERA_PERMISSION,
  MICROPHONE_PERMISSION,
  ALL_PERMISSION,
  ALL_PERMISSION_CANCEL,
  ALL_PERMISSION_OK,
  INCORRECT_EMAIL,
  CUSTOMER_EMAIL_ID,
  SEARCH_BUTTON,
  CLICK_TO_DISSMISS,
  VIDEO_SALE_EMAIL,
  VIDEO_SALE_NAME,
  VIDEO_SALE_DOB,
  VIDEO_SALE_PHONE,
  BOOK_CONSULT_DESC,
  SPEAK_TO_AGENT,
  BOOK_BUTTON,
  PREVIOUS_CHAT_AGENT,
  OPEN_BUTTON,
  EXPLORE_ALL_OPTION,
  VIEW_INSURANCE,
  MULTI_CRISIS,
  GRANT_ACCESS,
  GRANTED,
  NOT_GRANTED,
  MINIMIZE_VIDEO_CALL,
  TECH_GLITCH,
  NO_PARTICIPANTS,
  SHARING_SCREEN,
  CONNECTING,
  UPLOAD_PDF_IMAGE,
  DOCUMENT_TYPE,
  INITIATE_CONFERENCE,
  CHAT,
  SELECT_CLIENT,
  CALL_LOGS,
  CALL_HISTORY,
  DURATION,
  SEC,
  VIDEO_AND,
  DOCUMENT_PDF,
  OPEN_CAMERA,
  IMAGE_DOC,
  UPLOAD_FOR,
  PROD_NAME,
  SELECT_PROD,
  DELETE_MSG,
} = CoreConfig;

const KEYS = {
  ACCESS_DEVICE: "ACCESS_DEVICE",
  CAMERA_PERMISSION: "CAMERA_PERMISSION",
  AND: "AND",
  MIRCROPHONE_PERMISSION: "MIRCROPHONE_PERMISSION",
  PROCEED: "PROCEED",
  GROUP_VIDEO_CALL: "groupVideoCall",
};

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const screenMeta = () => {
  return {
    deviceAccess: fetchLabel(
      helpers.findElement(screenNames.TWILIO_VIDEO_CALL, KEYS.ACCESS_DEVICE),
      "Please provide access"
    ),
    cameraPermission: fetchLabel(
      helpers.findElement(
        screenNames.TWILIO_VIDEO_CALL,
        KEYS.CAMERA_PERMISSION
      ),
      "Camera"
    ),
    and: fetchLabel(
      helpers.findElement(screenNames.TWILIO_VIDEO_CALL, KEYS.AND),
      "And"
    ),
    microphonePermission: fetchLabel(
      helpers.findElement(
        screenNames.TWILIO_VIDEO_CALL,
        KEYS.MIRCROPHONE_PERMISSION
      ),
      "Microphone"
    ),
    proceed: fetchLabel(
      helpers.findElement(screenNames.TWILIO_VIDEO_CALL, KEYS.PROCEED),
      "Proceed"
    ),
    initiate_video_call: fetchLabel(
      helpers.findElement(VIDEO_SALES, INITIATE_VIDEO_CALL),
      "Initiate Video Call"
    ),
    successfully_downloaded: fetchLabel(
      helpers.findElement(VIDEO_SALES, SUCCESSFULLY_DOWNLOADED),
      "Successfully downloaded"
    ),
    download_failed: fetchLabel(
      helpers.findElement(VIDEO_SALES, DOWNLOAD_FAILED),
      "Download failed"
    ),
    exit_chat_desc: fetchLabel(
      helpers.findElement(VIDEO_SALES, EXIT_CHAT),
      "Do you want to exit from Chat window ?"
    ),
    delete_chat_message: fetchLabel(
      helpers.findElement(VIDEO_SALES, DELETE_MSG),
      "Do you want to delete this message ?"
    ),
    exit_yes: fetchLabel(helpers.findElement(VIDEO_SALES, EXIT_YES), "Yes"),

    exit_no: fetchLabel(helpers.findElement(VIDEO_SALES, EXIT_NO), "No"),

    need_access_to: fetchLabel(
      helpers.findElement(VIDEO_SALES, NEED_ACCESS_TO),
      "Need access to"
    ),

    camera: fetchLabel(
      helpers.findElement(VIDEO_SALES, CAMERA_PERMISSION),
      "Camera"
    ),

    microphone: fetchLabel(
      helpers.findElement(VIDEO_SALES, MICROPHONE_PERMISSION),
      "Microphone"
    ),

    all_permission_desc: fetchLabel(
      helpers.findElement(VIDEO_SALES, ALL_PERMISSION),
      "Please grant access from settings"
    ),

    all_permission_ok: fetchLabel(
      helpers.findElement(VIDEO_SALES, ALL_PERMISSION_OK),
      "ok"
    ),

    all_permission_cancel: fetchLabel(
      helpers.findElement(VIDEO_SALES, ALL_PERMISSION_CANCEL),
      "Cancel"
    ),

    incorrect_email: fetchLabel(
      helpers.findElement(VIDEO_SALES, INCORRECT_EMAIL),
      "Incorrect email format"
    ),

    customer_email_id: fetchLabel(
      helpers.findElement(VIDEO_SALES, CUSTOMER_EMAIL_ID),
      "Customer Email Id"
    ),

    search_button: fetchLabel(
      helpers.findElement(VIDEO_SALES, SEARCH_BUTTON),
      "Search"
    ),

    click_to_dissmiss: fetchLabel(
      helpers.findElement(VIDEO_SALES, CLICK_TO_DISSMISS),
      "Click to dismiss"
    ),

    email: fetchLabel(
      helpers.findElement(VIDEO_SALES, VIDEO_SALE_EMAIL),
      "Email:"
    ),

    name: fetchLabel(
      helpers.findElement(VIDEO_SALES, VIDEO_SALE_NAME),
      "Name:"
    ),

    dob: fetchLabel(helpers.findElement(VIDEO_SALES, VIDEO_SALE_DOB), "DOB:"),
    phone: fetchLabel(
      helpers.findElement(VIDEO_SALES, VIDEO_SALE_PHONE),
      "Phone Number:"
    ),

    book_consult_desc: fetchLabel(
      helpers.findElement(VIDEO_SALES, BOOK_CONSULT_DESC),
      "Book a Virtual Insurance Consultation"
    ),

    speak_to_agent: fetchLabel(
      helpers.findElement(VIDEO_SALES, SPEAK_TO_AGENT),
      "From you home, speak to an agent today"
    ),

    book_button_text: fetchLabel(
      helpers.findElement(VIDEO_SALES, BOOK_BUTTON),
      "Book"
    ),
    previous_chat_agent: fetchLabel(
      helpers.findElement(VIDEO_SALES, PREVIOUS_CHAT_AGENT),
      "See your previous conversations with Prudential Agents"
    ),
    open_button_text: fetchLabel(
      helpers.findElement(VIDEO_SALES, OPEN_BUTTON),
      "Open"
    ),

    explore_all_option: fetchLabel(
      helpers.findElement(VIDEO_SALES, EXPLORE_ALL_OPTION),
      "Explore all the options available for you"
    ),

    view_insurance_cat: fetchLabel(
      helpers.findElement(VIDEO_SALES, VIEW_INSURANCE),
      "View Insurance Catalog"
    ),
    total_multi_crisis: fetchLabel(
      helpers.findElement(VIDEO_SALES, MULTI_CRISIS),
      "Total Multi Crisis Care"
    ),
    grant_access: fetchLabel(
      helpers.findElement(VIDEO_SALES, GRANT_ACCESS),
      "Grant Access"
    ),
    granted: fetchLabel(helpers.findElement(VIDEO_SALES, GRANTED), "- Granted"),
    not_granted: fetchLabel(
      helpers.findElement(VIDEO_SALES, NOT_GRANTED),
      "- Not Granted"
    ),
    minimize_video_call: fetchLabel(
      helpers.findElement(VIDEO_SALES, MINIMIZE_VIDEO_CALL),
      "Do you want to minimize the video call ?"
    ),
    technical_glitch: fetchLabel(
      helpers.findElement(VIDEO_SALES, TECH_GLITCH),
      "We are experiencing a techinical glitch, please disconnect now and connect later"
    ),

    no_participants: fetchLabel(
      helpers.findElement(VIDEO_SALES, NO_PARTICIPANTS),
      "No Participants Connected"
    ),
    sharing_screen: fetchLabel(
      helpers.findElement(VIDEO_SALES, SHARING_SCREEN),
      "Sharing Screen"
    ),
    connecting: fetchLabel(
      helpers.findElement(VIDEO_SALES, CONNECTING),
      "Connecting ..."
    ),

    upload_pdf_image: fetchLabel(
      helpers.findElement(VIDEO_SALES, UPLOAD_PDF_IMAGE),
      "Please upload pdf/image"
    ),

    document_type: fetchLabel(
      helpers.findElement(VIDEO_SALES, DOCUMENT_TYPE),
      "Document (PDF/JPG/PNG)"
    ),
    document_pdf: fetchLabel(
      helpers.findElement(VIDEO_SALES, DOCUMENT_PDF),
      "Document (PDF)"
    ),
    open_camera: fetchLabel(
      helpers.findElement(VIDEO_SALES, OPEN_CAMERA),
      "Open Camera"
    ),
    image_doc: fetchLabel(
      helpers.findElement(VIDEO_SALES, IMAGE_DOC),
      "Image (JPG/PNG)"
    ),
    upladDocFor: fetchLabel(
      helpers.findElement(VIDEO_SALES, UPLOAD_FOR),
      "Upload Document for"
    ),
    productName: fetchLabel(
      helpers.findElement(VIDEO_SALES, PROD_NAME),
      "(Product Name)"
    ),
    selectProduct: fetchLabel(
      helpers.findElement(VIDEO_SALES, SELECT_PROD),
      "Select Product"
    ),
    initiate_conference: fetchLabel(
      helpers.findElement(VIDEO_SALES, INITIATE_CONFERENCE),
      "Initiate Conference"
    ),
    chat: fetchLabel(
      helpers.findElement(VIDEO_SALES, CHAT),
      "Initiate Conference"
    ),

    select_client: fetchLabel(
      helpers.findElement(VIDEO_SALES, SELECT_CLIENT),
      "Select Client"
    ),
    call_logs: fetchLabel(
      helpers.findElement(VIDEO_SALES, CALL_LOGS),
      "Call Logs"
    ),
    call_history: fetchLabel(
      helpers.findElement(VIDEO_SALES, CALL_HISTORY),
      "Chat History"
    ),
    duration: fetchLabel(
      helpers.findElement(VIDEO_SALES, DURATION),
      "Duration:"
    ),
    sec: fetchLabel(helpers.findElement(VIDEO_SALES, SEC), "sec"),
    video_and: fetchLabel(helpers.findElement(VIDEO_SALES, VIDEO_AND), "and"),
    groupVideoCall: fetchLabel(
      helpers.findElement(VIDEO_SALES, KEYS.GROUP_VIDEO_CALL),
      "groupVideoCall"
    ),
  };
};

export default { screenMeta };
