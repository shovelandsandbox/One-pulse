import screenNames from "../configs/screen-names";
const { homePageScreen, healthPageScreen } = screenNames;

export const eventNames = {
  //end of communities - this must be moved out to their respective directories
  launchHealthArticles: "launchHealthArticles",
  launchMyPolicy: "launchMyPolicy",
  launchPruShop: "launchPruShop",
  launchFriendReferral: "launchFriendReferral",
  launchHealthAssessment: "launchHealthAssessment",
  launchCheckSymptoms: "launchCheckSymptoms",
  launchWellnessGoals: "launchWellnessGoals",
  launchFindHospital: "launchFindHospital",
  launchCheckBmi: "launchCheckBmi",
  launchMyHealth: "launchMyHealth",
  launchMyCommunities: "launchMyCommunities",
  launchMyContent: "launchMyContent",
};

export default {
  [eventNames.launchHealthArticles]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.home.launchHealthArticles",
      tags: ["launchHealthArticles"],
      attributes: {
        action: "launchHealthArticles",
        screen: homePageScreen,
      },
    },
    firebase: "home_page_screen_launch_healthArticles",
  },
  [eventNames.launchMyPolicy]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.home.launchMyPolicy",
      tags: ["launchMyPolicy"],
      attributes: {
        action: "launchMyPolicy",
        screen: homePageScreen,
      },
    },
    firebase: "home_page_screen_launch_myPolicy",
  },
  [eventNames.launchPruShop]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.home.launchPruShop",
      tags: ["launchPruShop"],
      attributes: {
        action: "launchPruShop",
        screen: homePageScreen,
      },
    },
    firebase: "home_page_screen_launch_pruShop",
  },
  [eventNames.launchFriendReferral]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.home.launchFriendReferral",
      tags: ["launchFriendReferral"],
      attributes: {
        action: "launchFriendReferral",
        screen: homePageScreen,
      },
    },
    firebase: "home_page_screen_launch_friendReferral",
  },
  [eventNames.launchHealthAssessment]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.health.launchHealthAssessment",
      tags: ["launchHealthAssessment"],
      attributes: {
        action: "launchHealthAssessment",
        screen: healthPageScreen,
      },
    },
    firebase: "health_page_screen_launch_healthAssessment",
  },
  [eventNames.launchCheckSymptoms]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.health.launchCheckSymptoms",
      tags: ["launchCheckSymptoms"],
      attributes: {
        action: "launchCheckSymptoms",
        screen: healthPageScreen,
      },
    },
    firebase: "health_page_screen_launch_checkSymptoms",
  },
  [eventNames.launchWellnessGoals]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.health.launchWellnessGoals",
      tags: ["launchWellnessGoals"],
      attributes: {
        action: "launchWellnessGoals",
        screen: healthPageScreen,
      },
    },
    firebase: "health_page_screen_launch_wellnessGoals",
  },
  [eventNames.launchFindHospital]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.health.launchFindHospital",
      tags: ["launchFindHospital"],
      attributes: {
        action: "launchFindHospital",
        screen: healthPageScreen,
      },
    },
    firebase: "health_page_screen_launch_findHospitalt",
  },
  [eventNames.launchCheckBmi]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.health.launchCheckBmi",
      tags: ["launchCheckBmi"],
      attributes: {
        action: "launchCheckBmi",
        screen: healthPageScreen,
      },
    },
    firebase: "health_page_screen_launch_checkBmi",
  },
  [eventNames.launchMyContent]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.home.launchMyContent",
      tags: ["launchMyContent"],
      attributes: {
        action: "launchMyContent",
        screen: homePageScreen,
      },
    },
    firebase: "home_page_screen_launch_myContent",
  },
  [eventNames.launchMyCommunities]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.home.launchMyCommunities",
      tags: ["launchMyCommunities"],
      attributes: {
        action: "launchMyCommunities",
        screen: homePageScreen,
      },
    },
    firebase: "home_page_screen_launch_myCommunities",
  },
  [eventNames.launchMyHealth]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.home.launchMyHealth",
      tags: ["launchMyHealth"],
      attributes: {
        action: "launchMyHealth",
        screen: homePageScreen,
      },
    },
    firebase: "home_page_screen_launch_myHealth",
  },
};

