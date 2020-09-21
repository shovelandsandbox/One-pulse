export const eventNames = {
    dadPageOnLoad: "dadPageOnLoad",
    dadPageBackArrowClick: "dadPageBackArrowClick",
    dadPageCameraIconClick: "dadPageCameraIconClick",
    dadPageTakePhotoClick: "dadPageTakePhotoClick",
    dadPagePhotoLibraryClick: "dadPagePhotoLibraryClick",
    dadPageCancelClick: "dadPageCancelClick",
    dadPageNextClick: "dadPageNextClick",
    mumPageOnLoad: "mumPageOnLoad",
    mumPageBackArrowClick: "mumPageBackArrowClick",
    mumPageCameraIconClick: "mumPageCameraIconClick",
    mumPageTakePhotoClick: "mumPageTakePhotoClick",
    mumPagePhotoLibraryClick: "mumPagePhotoLibraryClick",
    mumPageCancelClick: "mumPageCancelClick",
    mumPageNextClick: "mumPageNextClick",

    makeNewBabyOnLoad: "makeNewBabyOnLoad",
    makeNewBabyCrossButtonClick: "makeNewBabyCrossButtonClick",
    makeNewBabyButtonClick: "makeNewBabyButtonClick",
    makeNewBabyShareClick: "makeNewBabyShareClick",

    customizeYourBabyOnLoad: "customizeYourBabyOnLoad",
    customizeYourBabyCrossButtonClick: "customizeYourBabyCrossButtonClick",
    customizeYourBabyMeetYourBabyClick: "customizeYourBabyMeetYourBabyClick",
    customizeYourBabyGenderSelected: "customizeYourBabyGenderSelected",
    customizeYourBabySkinColorSelected: "customizeYourBabySkinColorSelected",
};

export default {
    [eventNames.dadPageOnLoad]: {
        platform: {
            type: "ScreenEvent",
            name: "pulse.FaceBlender.dadPageOnLoad",
            tags: ["FaceBlender_dadPageOnLoad"],
        },
    },
    [eventNames.dadPageBackArrowClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.dadPageBackArrowClick",
            tags: ["FaceBlender_dadPageBackArrowClick"],
        },
    },
    [eventNames.dadPageCameraIconClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.dadPageCameraIconClick",
            tags: ["FaceBlender_dadPageCameraIconClick"],
        },
    },
    [eventNames.dadPageTakePhotoClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.dadPageTakePhotoClick",
            tags: ["FaceBlender_dadPageTakePhotoClick"],
        },
    },
    [eventNames.dadPagePhotoLibraryClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.dadPagePhotoLibraryClick",
            tags: ["FaceBlender_dadPagePhotoLibraryClick"],
        },
    },
    [eventNames.dadPageCancelClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.dadPageCancelClick",
            tags: ["FaceBlender_dadPageCancelClick"],
        },
    },
    [eventNames.dadPageNextClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.dadPageNextClick",
            tags: ["FaceBlender_dadPageNextClick"],
        },
    },

    [eventNames.mumPageOnLoad]: {
        platform: {
            type: "ScreenEvent",
            name: "pulse.FaceBlender.mumPageOnLoad",
            tags: ["FaceBlender_mumPageOnLoad"],
        },
    },
    [eventNames.mumPageBackArrowClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.mumPageBackArrowClick",
            tags: ["FaceBlender_mumPageBackArrowClick"],
        },
    },
    [eventNames.mumPageCameraIconClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.mumPageCameraIconClick",
            tags: ["FaceBlender_mumPageCameraIconClick"],
        },
    },
    [eventNames.mumPageTakePhotoClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.mumPageTakePhotoClick",
            tags: ["FaceBlender_mumPageTakePhotoClick"],
        },
    },
    [eventNames.mumPagePhotoLibraryClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.mumPagePhotoLibraryClick",
            tags: ["FaceBlender_mumPagePhotoLibraryClick"],
        },
    },
    [eventNames.mumPageCancelClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.mumPageCancelClick",
            tags: ["FaceBlender_mumPageCancelClick"],
        },
    },
    [eventNames.mumPageNextClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.mumPageNextClick",
            tags: ["FaceBlender_mumPageNextClick"],
        },
    },
    [eventNames.makeNewBabyOnLoad]: {
        platform: {
            type: "ScreenEvent",
            name: "pulse.FaceBlender.makeNewBabyOnLoad",
            tags: ["FaceBlender_makeNewBabyOnLoad"],
        },
    },
    [eventNames.makeNewBabyCrossButtonClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.makeNewBabyCrossButtonClick",
            tags: ["FaceBlender_makeNewBabyCrossButtonClick"],
        },
    },
    [eventNames.makeNewBabyButtonClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.makeNewBabyButtonClick",
            tags: ["FaceBlender_makeNewBabyButtonClick"],
        },
    },
    [eventNames.makeNewBabyShareClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.makeNewBabyShareClick",
            tags: ["FaceBlender_makeNewBabyShareClick"],
        },
    },

    [eventNames.customizeYourBabyOnLoad]: {
        platform: {
            type: "ScreenEvent",
            name: "pulse.FaceBlender.customizeYourBabyOnLoad",
            tags: ["FaceBlender_customizeYourBabyOnLoad"],
        },
    },
    [eventNames.customizeYourBabyCrossButtonClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.customizeYourBabyCrossButtonClick",
            tags: ["FaceBlender_customizeYourBabyCrossButtonClick"],
        },
    },
    [eventNames.customizeYourBabyMeetYourBabyClick]: {
        platform: {
            type: "ClickEvent",
            name: "pulse.FaceBlender.customizeYourBabyMeetYourBabyClick",
            tags: ["FaceBlender_customizeYourBabyMeetYourBabyClick"],
        },
    },
    [eventNames.customizeYourBabyGenderSelected]: {
        platform: attributes => ({
            type: "ClickEvent",
            name: "pulse.FaceBlender.customizeYourBabyGenderSelected",
            tags: ["FaceBlender_customizeYourBabyGenderSelected"],
            attributes,
        }),
    },
    [eventNames.customizeYourBabySkinColorSelected]: {
        platform: attributes => ({
            type: "ClickEvent",
            name: "pulse.FaceBlender.customizeYourBabySkinColorSelected",
            tags: ["FaceBlender_customizeYourBabySkinColorSelected"],
            attributes,
        }),
    },

};
