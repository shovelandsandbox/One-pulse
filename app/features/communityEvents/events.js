export const eventNames = {
    createCommunityEventScreen: "createCommunityEventScreen",
    communityEventsLandingScreen: "communityEventsLandingScreen",
    communityEventViewer: "communityEventViewer",
    communityEventStreamer: "communityEventStreamer",
    startEventStream: "startEventStream",
};

export default {
    [eventNames.createCommunityEventScreen]: {
        platform: attributes => ({
            type: "ScreenEvent",
            name: "pulse.community.events.createEvent",
            tags: ["community", "events", "createEvent"],
            attributes,
        }),
        firebase: "CreateCommunityEvent",
    },
    [eventNames.communityEventsLandingScreen]: {
        platform: attributes => ({
            type: "ScreenEvent",
            name: "pulse.community.events.landing",
            tags: ["community", "events", "landing"],
            attributes,
        }),
        firebase: "CommunityEventsLanding",
    },
    [eventNames.communityEventViewer]: {
        platform: attributes => ({
            type: "ScreenEvent",
            name: "pulse.community.events.viewer",
            tags: ["community", "events", "viewer"],
            attributes,
        }),
        firebase: "CommunityEventViewer",
    },
    [eventNames.communityEventStreamer]: {
        platform: attributes => ({
            type: "ScreenEvent",
            name: "pulse.community.events.streamer",
            tags: ["community", "events", "streamer"],
            attributes,
        }),
        firebase: "CommunityEventStreamer",
    },
    [eventNames.startEventStream]: {
        platform: attributes => ({
            id: "platform.pulseTV.group.notification",
            type: "Pulse",
            name: "platform.pulseTV.group.notification",
            attributes,
        }),
    }
};
