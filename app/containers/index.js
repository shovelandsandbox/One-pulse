/* eslint-disable */
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { createStackNavigator, TabNavigator } from "react-navigation";
import { BACK, BABYLON_LOGO_BLUE } from "../config/images";
import EmailOpt from "./ForgotPassword/sendOtpToEmail";
import {
  colors,
  CoreComponents,
  metaHelpers,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";
import MainTab from "./Navigation/MainTab";
import App from "../App";
import TermsAndConditionsComponent from "../components/TermsConditions/TermsAndConditionsComponent";
import ManageProfile from "./ManageProfile";
import ProfileRequests from "./ProfileRequests";
import { Platform } from "react-native";
import ProfileConnect from "./Connect/ProfileConnect";
import AddProfile from "./Connect/AddProfile";
import ChangeLanguage from "./ChangeLanguage";
import ChangeCalender from "../containers/Calender";
import Account from "./Account";
import NewAccount from "./Account/account";
import ChangePassword from "./ChangePassword/ChangePassword";
import Profile from "./Profile";
import newProfile from "./Profile/Profile";
import ProfileSearch from "./ProfileSearch";
import Settings from "./Settings";
import Aboutus from "./Aboutus";
import NewAboutus from "./Aboutus/NewAboutus";
import NewTermsandConditions from "./Aboutus/NewTermsandConditions";
import NewPrivacy from "./Aboutus/NewPrivacy";
import NewFeedback from "./Feedback";
import NewChangeLanguage from "./ChangeLanguage/NewChangeLanguage";
import NewPassScreen from "./NewPassword";
import ContactList from "./Connect/ContactsList";
import TermsAndConditions from "./Aboutus/Termsandconditions";
import Privacy from "./Aboutus/Privacy";
import Common from "./Aboutus/Common";
import HelpScreen from "./HelpScreen/HelpScreen";
import Feedback from "./Feedback";
import Notification from "./Notification";
import SentOptScreen from "./ForgotPassword/sentOpt";
import ResetPassWordSuc from "./ForgotPassword/success";
import NotificationRequest from "./NotificationPermissionRequest";
import NewRegister from "./Register";
import PruWebview from "../components/PruWebview";
import PruPdfview from "../components/PruPdfview";
import Header from "../components/Header/Header";
import Validation from "../containers/Validation";
import Security from "../containers/Security";
import HomePage from "../containers/HomePage";
import HealthPermissionRequest from "../containers/HealthPermissionRequest";
import Custumize from "../containers/Custumize";
import PulseHealthDetail from "../containers/PulseHealth/PulseHealthDetail";
import CheckSymptoms from "../containers/Babylon/CheckSymptoms";
import ChatConversation from "../containers/Babylon/ChatConversation";
import ChatReport from "../containers/Babylon/ChatReport";
import NavBabylon from "../containers/Babylon/NavBabylon";
import NavBabylon_s from "../containers/Babylon/NavBabylon_s";
import ChatReportDetail from "../containers/Babylon/ChatReportDetail";
import ChatSuggestion from "../containers/Babylon/ChatSuggestion";
import ChatHome from "./Babylon/ChatHome";
import { Header as ChatHeader } from "../components/ChatComponent/Header";
import ChatQuickstart from "./Babylon/ChatQuickstart";
import ChatHistory from "./Babylon/ChatHistory";
import FullAssessment from "./HealthCheckAssessment/FullAssessment"; //3D
import DiseaseDetails from "./HealthCheckAssessment/DiseaseDetails"; //3D
import Nutrition from "./HealthCheckAssessment/Nutrition";
import OrgansDetails from "./HealthCheckAssessment/OrgansDetails";
import NewCommon from "./Aboutus/NewCommon";
import HealthCheckTab from "./Navigation/HealthCheckTab";
import MoreLogin from "./MoreLogin";
import BMIReport from "../containers/BMI";
import WrinkleIndex from "../containers/WrinkleIndex";
import PrivacyNotice from "../components/TermsConditions/privacyNotice";
import TNCNPrivacyContainer from "./Aboutus/TNCNPrivacyContainer";

import myPolicyScreens from "../mypolicy/configs/screenNames";
import GenericContainer from "../framework/AppContext";
import FitFamily from "../features/fitFamily/screens";
import SocialInvite from "../features/socialInvite";
import WearablesList from "../features/fitnessTrackers/screens/wearablesList";
import WearablesStatistics from "../features/fitnessTrackers/screens/WearablesStatistics";
import WearablesContainer from "../features/fitnessTrackers/screens/WearablesContainer";
import ViewAllComments from "../features/likesAndComments/screens/ViewAllComments";
import Vitals from "../features/ppgVitals/screens/VitalsContainer";
import ProductCatalog from "./ProductCatalog";
import ConsentManagement from "../features/consentManagement/screens/MarketingConsent";
import PulsePersonalised from "../features/consentManagement/screens/PulsePersonalised";
import { CustomerConnectScreenConfig } from "../features/customerConnect";
import featureScreens from "../features/screens";
import PruShopTermsPrivacy from "./Aboutus/PruShopTermsPrivacy";
import ChatBot from "../features/chatBot/screens/ChatScreen";
import SubscriptionCatalog from "./SubscriptionCatalog";
import TimeoutMsg from "../features/TimeoutMsg";

import WelcomeToPulseSubscription from "../containers/PulsePlusSubscription/WelcomeToPulseSubscription";
import TryPremiumSubscription from "../containers/PulsePlusSubscription/TryPremiumSubscription";

import { CoreServices } from "@pru-rt-internal/pulse-common";
import * as R from "ramda";

const { NavigationService } = CoreServices;
const featureScreensConfig = R.keys(featureScreens).reduce((acc, curr) => {
  acc[curr] = {
    screen: featureScreens[curr],
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  };
  return acc;
}, {});

//Start: MyDoc Screens
import {
  DoctorTnC,
  DocRegister,
  DoctorHeader,
  StartConsultaion,
  SelectAudioVideo,
  EmergencyQuestions,
  MedicalProfile,
  PaymentMethodWebview,
  PaymentMethod,
  Payment,
  PreConsultationQuestions,
  DocRobot,
  DocPaySuc,
  AppointConfirmation,
  DoctorChatScreen,
  DoctorProfile,
  ConsultationFeedback,
  MyDocWizardRegn,
  MyDocWizardRegnSuccess,
  MyDocGiftVoucher,
  MyDocCampaignForm,
} from "./TeleConsultation";
//End: MyDoc Screens
//Start: Consultation History Screens
import {
  AllMyFilesScreen,
  ConsultationHistoryScreen,
  TeleConsultationSummaryScreen,
} from "./TeleConsultationHistory";
//End: Consultation History Screens
import { ImagePicker } from "../screens";
//mypolicy/
import UpgradeAccount from "../mypolicy/screens/Profile/UpgradeAccount";
import {
  MyPolicyRider,
  MyPolicyMain,
  MyPolicyInvestment,
  MyPolicyDetail,
  UpdateContactInfo,
  PolicyPdfViewer,
} from "../mypolicy/screens/MyPolicy";
import ReferAFriend from "./ReferAFriend";
import Hospital from "../containers/Hospital";
import NavigatorMap from "../containers/NavigatorMap";
import SearchMapCategoryList from "../containers/NavigatorMap/searchMapCategoryList";
import HospitalSpecialityFilterList from "../containers/HospitalSpecialityFilterList";
import HospitalFilterOptions from "../containers/HospitalFilterOptions";
import HospitalDetail from "../containers/HospitalDetail";

import {
  NotificationCentre,
  Rewards,
  VouchersAndExperience,
  ActionPlans,
  ActionPlanDetails,
  ActionPlanHabits,
  ActionPlanChangeHabit,
  Auth,
  PruPayment,
  VoucherDetails,
  AIMEDengueAlert,
  VideoSales,
  PruWizardScreen,
  WellnessPlans,
  FAQ,
  Challenges,
  EarnBadges,
  CCAJourney,
  IntroductionScreen,
  CCASplashScreen,
  BasicInformation,
  QuestionsScreen,
  ContinueAssessment,
  CompletionScreen,
  AssessmentResult,
  AssessmentDetail,
  AssessmentHistory,
  QRScreen,
  ConsultationList,
  OrderHistoryScreen,
  CartScreen,
  PaymentConfirmationScreen,
  PaymentBuyMedicine,
  CoronaChatBot,
  HalodocTnCScreen,
  HalodocPatientRegistrationScreen,
  HalodocSpecializationScreen,
  HalodocDoctorListScreen,
  HalodocDoctorInfoScreen,
  HalodocDoctorSearchScreen,
  HaloDocPaymentScreen,
  ConsultationPaymentScreen,
  HalodocPatientWaitingScreen,
  HalodocVoiceCallScreen,
  HalodocVideoCallScreen,
  HaloDocConsultation,
  HaloDocConsultaionHistory,
  ConsultationHistoryList,
  ConsultationHistoryChat,
  AllMyFiles,
  VaccinationCalendar,
  AirComposition,
  BrezometerWelcomeScreen,
  BrezometerIntroScreen,
  ContactInfoScreen,
  HealthTipsScreen,
} from "../features";

import {
  ProductDengueBriefing,
  ProductDengueIndex,
  AIMERegister,
} from "../features/index";

import HealthChannel from "../containers/HealthChannel";
import InsaanSchedule from "../features/insaan/screens/InsaanSchedule";
import PrayerTimeConventions from "../features/insaan/screens/PrayerTimeConventions";
import SelectState from "../features/insaan/screens/SelectState";
import SelectZone from "../features/insaan/screens/SelectZone";

// import { ProductRuntimeJourneysNavigationConfig } from "@pru-rt-internal/product-journeys";
// import { ClaimJourneysNavigationConfig } from "@pru-rt-internal/claim-journeys";
// import { CancelJourneysNavigationConfig } from "@pru-rt-internal/cancel-journey";

import { WellnessPlanScreenConfig } from "../features/wellnessPlans";
import { DocOnCallScreenConfig } from "../features/DocOnCall";
import { PulseFoodScreenConfig } from "../features/PulseFood";

import AffinityGroupScreen from "../features/affinity-groups/screens";
import AffinityGroupPostScreen from "../features/affinity-groups/screens/affinity-group-post";
import AffinityGroupWallScreen from "../features/affinity-groups/screens/affinity-group-wall";
import CreatePostScreen from "../features/affinity-groups/screens/create-post-screen";
import NotificationScreen from "../features/affinity-groups/screens/notification-screen";

import PruWizardCongratulations from "../features/pru-wizard/screens/congratulations-babylon";
import AddToVideoChat from "../features/videoSales/screens/AddToVideoChat";
import { CollectSocialRegEmailScreenConfigs } from "../features/collect-social-registration-email";
import FoodSdk from "../features/foodSdk";
import { PulseTvScreenConfigs } from "../features/communityEvents";
import EyeDetectionResult from "../features/faceDetection/screens/Result";
import EyeDetectionResultNew from "../features/faceDetection/screens/ResultNew";
import EyeDetectionGallery from "../features/faceDetection/screens/Gallery";
import ReferFriendDemo from "./ReferFriend";
import AgentReferralCode from "./AgentReferralCode";
import RewardsLookAround from "./RewardsLookAround";
import { ExerciseBuddyScreenConfig } from "../features/exerciseBuddy";
import { RewardsScreenConfig } from "../features/rewards/configs/RewardsScreenConfig";
import FoodSearchScreenConfig from "../features/FoodSearch/navigation";
import FaceBlenderScreenConfig from "../features/FaceBlender/navigation";

const {
  withBackHandler,
  FingerprintPreferences,
  TrackActivityDetails,
  OpenTokVideoCall,
} = CoreComponents;
const { pageKeys, SCREEN_KEY_PROFILE_LIST } = CoreConfig;

const KEY_PROFILE_TAB = "profilestab";
const KEY_REQUEST_TAB = "requeststab";

const ManageProfileTab = TabNavigator(
  {
    ManageProfile: {
      screen: ManageProfile,
      navigationOptions: () => {
        return {
          tabBarLabel: metaHelpers.findElement(
            SCREEN_KEY_PROFILE_LIST,
            KEY_PROFILE_TAB
          ).label,
        };
      },
    },
    Request: {
      screen: ProfileRequests,
      navigationOptions: () => {
        return {
          tabBarLabel: metaHelpers.findElement(
            SCREEN_KEY_PROFILE_LIST,
            KEY_REQUEST_TAB
          ).label,
        };
      },
    },
  },
  {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarOptions: {
      indicatorStyle: {
        opacity: 1,
        backgroundColor: "#efefef",
        height: 7,
        padding: 0,
      },
      activeTintColor: colors.nevada,
      showIcon: false,
      // showLabel: true,
      upperCaseLabel: false,
      inactiveTintColor: "#a8a8a8", // Color of tab when not pressed
      labelStyle: {
        fontSize: 21.7,
        // lineHeight: 28,
        marginTop: 0,
        paddingTop: 0,
        color: colors.nevada,
        fontFamily: Platform.OS == "ios" ? "PruSansNormal-Demi" : "pruSansBold",
      },
      tabStyle: {
        height: 40,
        padding: 4,
      },
      style: {
        // borderBottomColor: '#29000000',
        // borderBottomWidth: 2,
        marginTop: 0,
        paddingTop: 0,
        height: 50,
        backgroundColor: colors.white, // Makes Android tab bar white instead of standard blue
      },
    },
    tabBarPosition: "top",
    lazy: true,
    swipeEnabled: false,
  }
);

const RootStack = createStackNavigator({
  App: {
    screen: App,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  [pageKeys.PULSE_REGISTRATION]: {
    screen: Auth.Register,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  WebView: {
    screen: withBackHandler(PruWebview, null, null, null, false),
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  PdfView: {
    screen: PruPdfview,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  NewLoginComponent: {
    screen: Auth.ConventionalRegister,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  RegisterWithMobile: {
    screen: Auth.RegisterWithMobile,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: Auth.Login,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  [pageKeys.PULSE_SEND_OTP_EMAIL]: {
    screen: EmailOpt,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  SentOpt: {
    screen: SentOptScreen,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  ViewAllComments: {
    screen: ViewAllComments,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ConsentManagement: {
    screen: withBackHandler(ConsentManagement),
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  PulsePersonalised: {
    screen: PulsePersonalised,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ResetPassWordSuc: {
    screen: ResetPassWordSuc,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  MainTermsAndConditions: {
    screen: TermsAndConditionsComponent,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  PrivacyNotice: {
    screen: PrivacyNotice,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  MainTab: {
    screen: MainTab,
    navigationOptions: {
      header: null,
    },
  },
  ManageProfile: {
    screen: withBackHandler(ManageProfileTab, null, null, true),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  ProfileConnect: {
    screen: withBackHandler(ProfileConnect),
  },
  AddProfile: {
    screen: withBackHandler(AddProfile),
  },
  ChangeLanguage: {
    screen: withBackHandler(ChangeLanguage),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.CHANGE_CALANDER]: {
    screen: ChangeCalender,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  Account: {
    screen: withBackHandler(Account),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  AccountTab: {
    screen: NewAccount,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  ChangePassword: {
    screen: withBackHandler(ChangePassword),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  Profile: {
    screen: withBackHandler(Profile),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  Vitals: {
    screen: Vitals,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  WearablesList: {
    screen: WearablesList,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  WearablesContainer: {
    screen: WearablesContainer,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  WearablesStatistics: {
    screen: WearablesStatistics,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },

  [pageKeys.NEWPROFILE]: {
    screen: newProfile,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  ProfileSearch: {
    screen: withBackHandler(ProfileSearch),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  Settings: {
    screen: withBackHandler(Settings),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  FingerprintPreferences: {
    screen: withBackHandler(FingerprintPreferences),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  Aboutus: {
    screen: withBackHandler(Aboutus),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.PULSE_ABOUT_US]: {
    screen: withBackHandler(NewAboutus),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.PULSE_TNC]: {
    screen: withBackHandler(NewTermsandConditions),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.PULSE_NEW_PRIVACY]: {
    screen: withBackHandler(NewPrivacy),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.PULSE_ABOUT_US]: {
    screen: withBackHandler(NewAboutus),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.PULSE_TNC]: {
    screen: withBackHandler(NewTermsandConditions),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.PULSE_NEW_PRIVACY]: {
    screen: withBackHandler(NewPrivacy),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.PULSE_TNC_DETAIL]: {
    screen: NewCommon,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  [pageKeys.PULSE_FEEDBACK]: {
    screen: NewFeedback,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.PULSE_CHANGE_LANGUAGE]: {
    screen: NewChangeLanguage,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  NewPass: {
    screen: NewPassScreen,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  ContactList: {
    screen: withBackHandler(ContactList),
  },
  TrackActivityDetails: {
    screen: withBackHandler(TrackActivityDetails),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  AboutTerms: {
    screen: withBackHandler(TermsAndConditions),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  Privacy: {
    screen: withBackHandler(Privacy),
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
  TimeoutMsg: {
    screen: withBackHandler(TimeoutMsg),
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
  Common: {
    //screen: withBackHandler(Common),
    screen: Common,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  HelpScreen: {
    screen: withBackHandler(HelpScreen),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  Feedback: {
    screen: withBackHandler(Feedback),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  Notification: {
    screen: withBackHandler(Notification),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.OPENTOK_VIDEO_CALL]: {
    screen: OpenTokVideoCall,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
  [VideoSales.screenNames.INITIATE_CALL_SCREEN]: {
    screen: VideoSales.screens[VideoSales.screenNames.INITIATE_CALL_SCREEN],
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [VideoSales.screenNames.TWILIO_VIDEO_CALL]: {
    screen: VideoSales.screens[VideoSales.screenNames.TWILIO_VIDEO_CALL],
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  AddToVideoChat: {
    screen: AddToVideoChat,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [VideoSales.screenNames.MAIN_SCREEN]: {
    screen: VideoSales.screens[VideoSales.screenNames.MAIN_SCREEN],
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [VideoSales.screenNames.CHAT_CONTACTS]: {
    screen: VideoSales.screens[VideoSales.screenNames.CHAT_CONTACTS],
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [VideoSales.screenNames.CHAT]: {
    screen: VideoSales.screens[VideoSales.screenNames.CHAT],
    navigationOptions: {
      header: null,
    },
  },
  [VideoSales.screenNames.GEN_PAYMENT_LINK]: {
    screen: VideoSales.screens[VideoSales.screenNames.GEN_PAYMENT_LINK],
    navigationOptions: {
      header: null,
    },
  },
  [VideoSales.screenNames.PAYMENT_VIEW]: {
    screen: VideoSales.screens[VideoSales.screenNames.PAYMENT_VIEW],
    navigationOptions: {
      header: null,
    },
  },
  NotificationRequest: {
    screen: NotificationRequest,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
  NewRegister: {
    screen: NewRegister,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
  Validation: {
    screen: Validation,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
      mode: "modal",
    },
  },
  [pageKeys.PULSE_SECURITY]: {
    screen: withBackHandler(Security),
    navigationOptions: {
      header: null,
      tabBarVisible: true,
    },
  },
  [pageKeys.REFER_A_FRIEND]: {
    screen: withBackHandler(ReferAFriend),
    navigationOptions: {
      header: null,
      tabBarVisible: true,
    },
  },

  ImagePicker: {
    screen: ImagePicker,
    navigationOptions: {
      header: null,
      tabBarVisible: true,
    },
  },
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
    },
  },
  FitFamily: {
    screen: FitFamily,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  [pageKeys.BABYLON_REGISTRATION]: {
    screen: CheckSymptoms,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.BABYLON_CHAT_QUICK_START]: {
    screen: ChatQuickstart,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  [pageKeys.BABYLON_CHAT_SCREEN]: {
    //screen: ChatConversation,
    screen: withBackHandler(ChatConversation, ChatHeader, null, false),
    navigationOptions: {
      header: null, // this will hide the header
    },
  },
  [pageKeys.BABYLON_CHAT_SCREEN1]: {
    screen: NavBabylon,
    navigationOptions: {
      header: null, // this will hide the header
    },
  },
  [pageKeys.BABYLON_CHAT_SCREEN2]: {
    screen: NavBabylon_s,
    navigationOptions: {
      header: null, // this will hide the header
    },
  },
  ChatSuggestion: {
    screen: ChatSuggestion,
    navigationOptions: {
      header: null, // this will hide the header
    },
  },
  ChatReport: {
    screen: withBackHandler(ChatReport, ChatHeader, null, false),
    navigationOptions: {
      header: null, // this will hide the header
    },
  },
  ChatReportDetail: {
    screen: ChatReportDetail,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  HealthPermissionRequest: {
    screen: HealthPermissionRequest,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.PULSE_CUSTOMIZE]: {
    screen: withBackHandler(Custumize),
    navigationOptions: {
      header: null,
    },
  },
  PulseHealthDetail: {
    screen: PulseHealthDetail,
    navigationOptions: {
      // header: null
    },
  },
  [pageKeys.BABYLON_SYMPTOM_CHECKER]: {
    screen: ChatHome,
    navigationOptions: {
      header: null,
    },
  },
  ChatHistory: {
    screen: ChatHistory,
    // screen: withBackHandler(ChatHistory, ChatHeader, { leftIconType: "close" }),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  ChatConversation: {
    screen: withBackHandler(ChatConversation, ChatHeader, null, false),
    // screen: ChatConversation,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },

  HealthCheckTab: {
    screen: HealthCheckTab,
    navigationOptions: ({ navigation }) => {
      // title: "header",
      // header: null
      return {
        headerRight: (
          <Image
            source={BABYLON_LOGO_BLUE}
            resizeMode={"contain"}
            style={{
              marginRight: 15,
              marginTop: -20,
              alignSelf: "center",
            }}
          />
        ),
        headerLeft: (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={
                Platform.OS == "ios"
                  ? {
                    width: 42,
                    height: 42,
                    // backgroundColor: '#a43',
                  }
                  : {
                    width: 42,
                    height: 42,
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: '#a43',
                  }
              }
              onPress={() => {
                NavigationService.navigate("MainTab");
              }}
            >
              <Image
                source={BACK}
                style={{
                  width: 22,
                  height: 22,
                  marginLeft: 12,
                  alignSelf: "center",
                }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
        ),
      };
    },
  },
  DiseaseDetails: {
    screen: withBackHandler(DiseaseDetails),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  Nutrition: {
    screen: Nutrition,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  OrganDetails: {
    screen: withBackHandler(OrgansDetails, ChatHeader),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  [pageKeys.PULSE_MORE_LOGIN]: {
    screen: MoreLogin,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  EyeDetectionResult: {
    screen: EyeDetectionResult,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  EyeDetectionResultNew: {
    screen: EyeDetectionResultNew,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  EyeDetectionGallery: {
    screen: EyeDetectionGallery,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  [pageKeys.PULSE_BMI_DETAIL]: {
    screen: withBackHandler(BMIReport),
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.PROFILE_UPGRADE_ACCOUNT_SCREEN]: {
    screen: UpgradeAccount,
    navigationOptions: {
      header: null,
    },
  },

  [pageKeys.MY_POLICY_DETAIL_SCREEN]: {
    screen: MyPolicyDetail,
    navigationOptions: {
      header: null,
    },
  },
  PolicyPdfViewer: {
    screen: PolicyPdfViewer,
    navigationOptions: {
      header: null,
    },
  },
  [myPolicyScreens.UPDATE_INFO_SCREEN]: {
    screen: UpdateContactInfo,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.MY_POLICY_MAIN_SCREEN]: {
    screen: MyPolicyMain, // ProductJourney, //MyPolicyMain
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.MY_POLICY_RIDER_SCREEN]: {
    screen: MyPolicyRider,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.MY_POLICY_INVESTMENT_SCREEN]: {
    screen: MyPolicyInvestment,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.PULSE_WRINKLE_INDEX]: {
    screen: withBackHandler(WrinkleIndex),
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.TNC_PRIVACY_CONTAINER]: {
    screen: TNCNPrivacyContainer,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  //Start: MyDocScreens
  [pageKeys.DOC_SERVICE_TNC]: {
    screen: DoctorTnC,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
      gesturesEnabled: false,
    },
  },
  [pageKeys.DOC_SERVICE_INTRO]: {
    screen: withBackHandler(DocRobot, DoctorHeader, {
      backRouteName: "PulseHealth",
    }),
    navigationOptions: {
      header: null,
    },
  },
  MyDocWizardRegn: {
    screen: MyDocWizardRegn,
    navigationOptions: {
      header: null,
    },
  },
  MyDocWizardRegnSuccess: {
    screen: MyDocWizardRegnSuccess,
    navigationOptions: {
      header: null,
    },
  },
  MyDocGiftVoucher: {
    screen: MyDocGiftVoucher,
    navigationOptions: {
      header: null,
    },
  },
  MyDocCampaignForm: {
    screen: MyDocCampaignForm,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.DOC_SERVICE_REGISTER]: {
    screen: withBackHandler(DocRegister, DoctorHeader, {
      backRouteName: "PulseHealth",
    }),
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.DOC_SERVICE_START_CONSULTATION]: {
    screen: StartConsultaion,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.DOC_SERVICE_AUDIO_VIDEO]: {
    screen: SelectAudioVideo,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.DOC_SERVICE_DOC_ROBOT]: {
    screen: DocRobot,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.DOC_SERVICE_LANDING]: {
    screen: withBackHandler(EmergencyQuestions, DoctorHeader, {
      backRouteName: "PulseHealth",
    }),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  [pageKeys.MYDOC_MEDICAL_PROFILE]: {
    screen: withBackHandler(MedicalProfile, DoctorHeader),
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [pageKeys.DOC_SERVICE_PAYMENT_SUCCESS]: {
    screen: DocPaySuc,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.DOC_SERVICE_PRE_CONSULTATION_QUESTIONS]: {
    screen: withBackHandler(PreConsultationQuestions, DoctorHeader, {
      backRouteName: "PulseHealth",
    }),
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [pageKeys.DOC_SERVICE_APPOINTMENT]: {
    screen: AppointConfirmation,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.MYDOC_CONSULTATION_HISTORY_HOME]: {
    screen: withBackHandler(TeleConsultationSummaryScreen, DoctorHeader),
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  [pageKeys.MYDOC_CONSULTATION_FILES]: {
    screen: withBackHandler(AllMyFilesScreen, DoctorHeader),
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  [pageKeys.MYDOC_CONSULTATION_HISTORY]: {
    //ConsultationHistory
    screen: withBackHandler(ConsultationHistoryScreen, DoctorHeader),
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  [pageKeys.GO_PAYMENT_METHOD_PAGE]: {
    screen: PruPayment,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [pageKeys.GO_PAYMENT_METHOD_WEBVIEW_PAGE]: {
    screen: PaymentMethodWebview,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [pageKeys.MY_DOC_CHAT_SCREEN]: {
    screen: DoctorChatScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [pageKeys.DOCTOR_PROFILE]: {
    screen: withBackHandler(DoctorProfile, DoctorHeader),
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  [pageKeys.DOC_SERVICE_FEEDBACK]: {
    screen: withBackHandler(ConsultationFeedback, DoctorHeader, {
      backRouteName: "PulseHealth",
    }),
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  //End: MyDocScreens
  [pageKeys.NAVIGATOR_MAIN_SCREEN]: {
    screen: NavigatorMap,
    navigationOptions: {
      header: null,
    },
  },
  SearchMapCategoryList: {
    screen: SearchMapCategoryList,
    navigationOptions: {
      header: null,
    },
  },
  [pageKeys.REWARDS_CENTER_SCREEN]: {
    screen: Rewards,
    navigationOptions: {
      header: null,
    },
  },
  VoucherDetails: {
    screen: VoucherDetails,
    navigationOptions: {
      header: null,
    },
  },
  FAQ: {
    screen: FAQ,
    navigationOptions: {
      header: null,
    },
  },
  EarnBadges: {
    screen: EarnBadges,
    navigationOptions: {
      header: null,
    },
  },
  QRScreen: {
    screen: withBackHandler(QRScreen),
    navigationOptions: {
      header: null,
    },
  },
  Hospital: {
    screen: Hospital,
    navigationOptions: {
      header: null,
    },
  },
  HospitalSpecialityFilterList: {
    screen: HospitalSpecialityFilterList,
    navigationOptions: {
      header: null,
    },
  },
  HospitalFilterOptions: {
    screen: HospitalFilterOptions,
    navigationOptions: {
      header: null,
    },
  },
  HospitalDetail: {
    screen: HospitalDetail,
    navigationOptions: {
      header: null,
    },
  },
  NotificationCentre: {
    screen: NotificationCentre,
    navigationOptions: {
      header: null,
    },
  },
  RewardCentre: {
    screen: Rewards,
    navigationOptions: {
      header: null,
    },
  },
  GenericContainer: {
    screen: (props) => <GenericContainer {...props} />,
    navigationOptions: {
      header: null,
    },
  },
  // ...ProductRuntimeJourneysNavigationConfig
  [pageKeys.HEALTH_CHANNEL]: {
    screen: HealthChannel,
    navigationOptions: {
      header: null,
    },
  },
  AIMEDengueAlert: {
    screen: AIMEDengueAlert,
    navigationOptions: {
      header: null,
    },
  },
  ProductDengueBriefing: {
    screen: ProductDengueBriefing,
    navigationOptions: {
      header: null,
    },
  },
  ProductDengueIndex: {
    screen: ProductDengueIndex,
    navigationOptions: {
      header: null,
    },
  },
  AIMERegister: {
    screen: AIMERegister,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

  //INSAAN

  InsaanSchedule: {
    screen: InsaanSchedule,
    navigationOptions: {
      header: null,
    },
  },

  SelectState: {
    screen: SelectState,
    navigationOptions: {
      header: null,
    },
  },
  SelectZone: {
    screen: SelectZone,
    navigationOptions: {
      header: null,
    },
  },

  PrayerTimeConventions: {
    screen: PrayerTimeConventions,
    navigationOptions: {
      header: null,
    },
  },
  ...DocOnCallScreenConfig,
  SocialInvite: {
    screen: SocialInvite,
    navigationOptions: {
      header: null,
    },
  },
  PruWizardScreen: {
    screen: PruWizardScreen,
    navigationOptions: {
      header: null,
    },
  },
  PruWizardCongratulations: {
    screen: PruWizardCongratulations,
    navigationOptions: {
      header: null,
    },
  },
  AffinityGroupScreen: {
    screen: AffinityGroupScreen,
    navigationOptions: {
      header: null,
    },
  },
  PRODUCT_JOURNEY_CATALOG: {
    screen: ProductCatalog,
    navigationOptions: {
      header: null,
    },
  },
  AffinityGroupWallScreen: {
    screen: AffinityGroupWallScreen,
    navigationOptions: {
      header: null,
    },
  },
  AffinityGroupPostScreen: {
    screen: AffinityGroupPostScreen,
    navigationOptions: {
      header: null,
    },
  },
  CreatePostScreen: {
    screen: CreatePostScreen,
    navigationOptions: {
      header: null,
    },
  },
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: {
      header: null,
    },
  },
  ReferFriend: {
    screen: ReferFriendDemo,
    navigationOptions: {
      header: null,
    },
  },
  //CCA Journey

  CCAJourney: {
    screen: CCAJourney,
    navigationOptions: {
      header: null,
    },
  },
  IntroductionScreen: {
    screen: IntroductionScreen,
    navigationOptions: {
      header: null,
    },
  },
  CCASplashScreen: {
    screen: CCASplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  BasicInformation: {
    screen: BasicInformation,
    navigationOptions: {
      header: null,
    },
  },
  QuestionsScreen: {
    screen: QuestionsScreen,
    navigationOptions: {
      header: null,
    },
  },
  ContinueAssessment: {
    screen: ContinueAssessment,
    navigationOptions: {
      header: null,
    },
  },
  CompletionScreen: {
    screen: CompletionScreen,
    navigationOptions: {
      header: null,
    },
  },
  AssessmentResult: {
    screen: AssessmentResult,
    navigationOptions: {
      header: null,
    },
  },
  AssessmentDetail: {
    screen: AssessmentDetail,
    navigationOptions: {
      header: null,
    },
  },
  AssessmentHistory: {
    screen: AssessmentHistory,
    navigationOptions: {
      header: null,
    },
  },
  AgentReferralCode: {
    screen: AgentReferralCode,
    navigationOptions: {
      header: null,
    },
  },
  RewardsLookAround: {
    screen: RewardsLookAround,
    navigationOptions: {
      header: null,
    },
  },
  VaccinationHome: {
    screen: VaccinationCalendar.VaccinationHome,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  VaccineTable: {
    screen: VaccinationCalendar.VaccineTable,
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  },
  PruShopTermsandPrivacy: {
    screen: withBackHandler(PruShopTermsPrivacy),
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  ConsultationList: {
    screen: ConsultationList,
    navigationOptions: {
      header: null,
    },
  },
  OrderHistoryScreen: {
    screen: OrderHistoryScreen,
    navigationOptions: {
      header: null,
    },
  },
  CartScreen: {
    screen: CartScreen,
    navigationOptions: {
      header: null,
    },
  },
  PaymentConfirmationScreen: {
    screen: PaymentConfirmationScreen,
    navigationOptions: {
      header: null,
    },
  },
  PaymentBuyMedicine: {
    screen: PaymentBuyMedicine,
    navigationOptions: {
      header: null,
    },
  },
  CoronaChatBot: {
    screen: CoronaChatBot,
    navigationOptions: {
      header: null,
    },
  },

  //HaloDoc
  HalodocTnCScreen: {
    screen: HalodocTnCScreen,
    navigationOptions: {
      header: null,
    },
  },
  HalodocPatientRegistrationScreen: {
    screen: HalodocPatientRegistrationScreen,
    navigationOptions: {
      header: null,
    },
  },
  HalodocSpecializationScreen: {
    screen: HalodocSpecializationScreen,
    navigationOptions: {
      header: null,
    },
  },
  HalodocDoctorListScreen: {
    screen: HalodocDoctorListScreen,
    navigationOptions: {
      header: null,
    },
  },
  HalodocDoctorInfoScreen: {
    screen: HalodocDoctorInfoScreen,
    navigationOptions: {
      header: null,
    },
  },
  HalodocDoctorSearchScreen: {
    screen: HalodocDoctorSearchScreen,
    navigationOptions: {
      header: null,
    },
  },
  HaloDocPaymentScreen: {
    screen: HaloDocPaymentScreen,
    navigationOptions: {
      header: null,
    },
  },
  ConsultationPaymentScreen: {
    screen: ConsultationPaymentScreen,
    navigationOptions: {
      header: null,
    },
  },
  HalodocPatientWaitingScreen: {
    screen: HalodocPatientWaitingScreen,
    navigationOptions: {
      header: null,
    },
  },
  HalodocVoiceCallScreen: {
    screen: HalodocVoiceCallScreen,
    navigationOptions: {
      header: null,
    },
  },
  HalodocVideoCallScreen: {
    screen: HalodocVideoCallScreen,
    navigationOptions: {
      header: null,
    },
  },
  HaloDocConsultation: {
    screen: HaloDocConsultation,
    navigationOptions: {
      header: null,
    },
  },
  //consultation history
  HaloDocConsultaionHistory: {
    screen: HaloDocConsultaionHistory,
    navigationOptions: {
      header: null,
    },
  },
  ConsultationHistoryList: {
    screen: ConsultationHistoryList,
    navigationOptions: {
      header: null,
    },
  },
  ConsultationHistoryChat: {
    screen: ConsultationHistoryChat,
    navigationOptions: {
      header: null,
    },
  },
  AllMyFiles: {
    screen: AllMyFiles,
    navigationOptions: {
      header: null,
    },
  },
  ChatBot: {
    screen: ChatBot,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  MySubscription: {
    screen: SubscriptionCatalog,
    navigationOptions: {
      header: null,
    },
  },
  TryPremiumSubscription: {
    screen: TryPremiumSubscription,
    navigationOptions: {
      header: null,
    },
  },
  WelcomeToPulseSubscription: {
    screen: WelcomeToPulseSubscription,
    navigationOptions: {
      header: null,
    },
  },
  //Breezometer
  AirComposition: {
    screen: AirComposition,
    navigationOptions: {
      header: null,
    },
  },
  BrezometerWelcomeScreen: {
    screen: BrezometerWelcomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  BrezometerIntroScreen: {
    screen: BrezometerIntroScreen,
    navigationOptions: {
      header: null,
    },
  },
  ContactInfoScreen: {
    screen: ContactInfoScreen,
    navigationOptions: {
      header: null,
    },
  },
  HealthTipsScreen: {
    screen: HealthTipsScreen,
    navigationOptions: {
      header: null,
    },
  },

  ...Challenges,
  // ...ProductRuntimeJourneysNavigationConfig,
  // ...ClaimJourneysNavigationConfig,
  ...WellnessPlanScreenConfig,
  ...FoodSdk.screens,
  // ...CancelJourneysNavigationConfig,
  ...featureScreensConfig,
  ...PulseTvScreenConfigs,
  ...CollectSocialRegEmailScreenConfigs,
  ...ExerciseBuddyScreenConfig,
  ...PulseFoodScreenConfig,
  ...RewardsScreenConfig,
  ...CustomerConnectScreenConfig,
  ...FoodSearchScreenConfig,
  ...FaceBlenderScreenConfig
});

export default RootStack;
