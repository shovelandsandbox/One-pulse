export const eventNames = {
    callLogs: "callLogs",
    searchForUser: "searchForUser",
    searchForUserSuccess: "searchForUserSuccess",
    searchForUserFailure: "searchForUserFailure",
    initiateChat: "initiateChat",
    initiateChatSuccess: "initiateChatSuccess",
    initiateChatFailure: "initiateChatFailure",
    accessChatHistory:"accessChatHistory",
    InitiateCallScreen:"InitiateCallScreen",
    initiateCall: "initiateCall",
    initiateCallSuccess: "initiateCallSuccess",
    initiateCallFailure: "initiateCallFailure",
    intitiateCallFromHistory : "intitiateCallFromHistory",
    switchFromVideoToChat:"switchFromVideoToChat",
    paymentLinkClick: "paymentLinkClick",
    generatePaymentLink: "generatePaymentLink",
    uploadDocument:"uploadDocument",
    uploadDocumentSuccess:"uploadDocumentSuccess",
    uploadDocumentFailure:"uploadDocumentFailure",
    documentSentBack : "documentSentBack",
    downloadDocument:"downloadDocument",
    addSignature:"addSignature",
    videoCallStart: "videoCallStart",
    videoCallEnd : "videoCallEnd",
    userChatExit: "userChatExit",
    minimizeVideoCall:"minimizeVideoCall",
    muteCall:"muteCall",
    switchCamera:"switchCamera",
    screenShareEnd:"screenShareEnd",
    screenShareStart:"screenShareStart",
    videoTrackDisabled:"videoTrackDisabled",
    videoTrackEnabled:"videoTrackEnabled",
    AudioTrackDisabled:"AudioTrackDisabled",
    AudioTrackEnabled:"AudioTrackEnabled",
    addPeople:"addPeople"
  };
  
  export default {
    [eventNames.callLogs]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.callLogs",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_callLogs",
    },
    [eventNames.contactsGroup]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.contactsGroup",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_contactsGroup",
    },
    [eventNames.accessChatHistory]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.accessChatHistory",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_accessChatHistory",
    },
    [eventNames.searchForUser]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.searchForUser",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_searchForUser",
    },
    [eventNames.searchForUserSuccess]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.searchForUserSuccess",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_searchForUserSuccess",
    },
    [eventNames.searchForUserFailure]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.searchForUserFailure",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_searchForUserFailure",
    },
    [eventNames.InitiateCallScreen]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.InitiateCallScreen",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_InitiateCallScreen",
    },
    [eventNames.initiateChat]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.initiateChat",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_initiateChat",
    },
    [eventNames.initiateChatSuccess]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.initiateChatSuccess",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_initiateChatSuccess",
    },
    [eventNames.initiateChatFailure]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.initiateChatFailure",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_initiateChatFailure",
    },
    [eventNames.initiateCall]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.initiateCall",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_initiateCall",
    },
    [eventNames.initiateCallFailure]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.initiateCallFailure",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_initiateCallFailure",
    },
    [eventNames.initiateCallSuccess]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.initiateCallSuccess",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_initiateCallSuccess",
    },
    [eventNames.intitiateCallFromHistory]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.intitiateCallFromHistory",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_intitiateCallFromHistory",
    },
    [eventNames.switchFromVideoToChat]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.switchFromVideoToChat",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_switchFromVideoToChat",
    },
    [eventNames.paymentLinkClick]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.paymentLinkClick",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_paymentLinkClick",
    },
    [eventNames.generatePaymentLink]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.generatePaymentLink",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_generatePaymentLink",
    },
    [eventNames.uploadDocument]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.uploadDocument",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_uploadDocument",
    },
    [eventNames.uploadDocumentSuccess]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.uploadDocumentSuccess",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_uploadDocumentSuccess",
    },
    [eventNames.uploadDocumentFailure]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.uploadDocumentFailure",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_uploadDocumentFailure",
    },
    [eventNames.downloadDocument]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.downloadDocument",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_downloadDocument",
    },
    [eventNames.documentSentBack]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.documentSentBack",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_documentSentBack",
    },
    [eventNames.addSignature]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.addSignature",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_addSignature",
    },
    [eventNames.videoCallStart]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.videoCallStart",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_videoCallStart",
    },
    [eventNames.videoCallEnd]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.videoCallEnd",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_videoCallEnd",
    },
    [eventNames.userChatExit]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.userChatExit",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_userChatExit",
    },
    [eventNames.minimizeVideoCall]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.minimizeVideoCall",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_minimizeVideoCall",
    },
    [eventNames.muteCall]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.muteCall",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_muteCall",
    },
    [eventNames.switchCamera]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.switchCamera",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_switchCamera",
    },
    [eventNames.screenShareEnd]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.screenShareEnd",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_screenShareEnd",
    },
    [eventNames.screenShareStart]: {
      platform: attributes => ({
        type: "ActivityEvent",
        name: "pulse.videoSales.screenShareStart",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_screenShareStart",
    },
    [eventNames.videoTrackDisabled]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.videoTrackDisabled",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_videoTrackDisabled",
    },
    [eventNames.videoTrackEnabled]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.videoTrackEnabled",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_videoTrackEnabled",
    },
    [eventNames.AudioTrackDisabled]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.AudioTrackDisabled",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_AudioTrackDisabled",
    },
    [eventNames.AudioTrackEnabled]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.AudioTrackEnabled",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_AudioTrackEnabled",
    },    
    [eventNames.addPeople]: {
      platform: attributes => ({
        type: "ClickEvent",
        name: "pulse.videoSales.addPeople",
        tags: ["videoSales"],
        attributes,
      }),
      firebase: "videoSales_addPeople",
    },
  };
  