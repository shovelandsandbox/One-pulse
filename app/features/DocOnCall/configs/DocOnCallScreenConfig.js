import screenNames from "./ScreenNames";
import DocOnCallTC from "../screens/DocOnCallTC";
import DocOnCallDetil from "../screens/DocOnCallDetil";
import StartConsultaion from "../screens/StartConsultaion";
import SelectAudioVideo from "../screens/SelectAudioVideo/SelectAudioVideo";
import DocGetStarted from "../screens/DocGetStarted";
import ConsultationStatus from "../screens/ConsultationStatus";
import ConsultationFeedback from "../screens/ConsultationFeedback";
import PaymentStatus from "../screens/Payment/PaymentStatus";
import ConsulationHistory from "../screens/Consultation History/index";
import ConsulationDetail from "../screens/Consultation History/ConsulationDetail";
import PdfViewer from "../screens/Consultation History/PdfViewer";
import ConsulationFilter from "../screens/Consultation History/ConsulationFilter";
import DocSymptomInput from "../screens/DocSymptomInput";

export const DocOnCallScreenConfig = {
  [screenNames.DOC_INTRO_TERMS_CONDITION]: {
    screen: DocOnCallTC,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
      gesturesEnabled: false
    }
  },
  [screenNames.DOC_REGISTRATION_SCREEN]: {
    screen: DocOnCallDetil,
    navigationOptions: {
      header: null
    }
  },
  [screenNames.StartConsultaion]: {
    screen: StartConsultaion,
    navigationOptions: {
      header: null
    }
  },
  [screenNames.DOC_SERVICE_LANDING_SCREEN]: {
    screen: SelectAudioVideo,
    navigationOptions: {
      header: null
    }
  },
  [screenNames.DOC_GET_STARTED]: {
    screen: DocGetStarted,
    navigationOptions: {
      header: null
    }
  },
  [screenNames.DOC_CONSULTATION_STATUS]: {
    screen: ConsultationStatus,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [screenNames.DOC_SERVICE_FEEDBACK]: {
    screen: ConsultationFeedback,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [screenNames.DOC_SERVICE_PAYMENT_STATUS]: {
    screen: PaymentStatus,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [screenNames.DOC_CONSULTATION_HISTORY]: {
    screen: ConsulationHistory,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [screenNames.DOC_SYMPTOM_INPUT]: {
    screen: DocSymptomInput,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [screenNames.DOC_CONSULTATION_DETAIL]: {
    screen: ConsulationDetail,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [screenNames.DOC_CONSULTATION_HISTORY_PDF]: {
    screen: PdfViewer,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [screenNames.DOC_CONSULTATION_FILTER]: {
    screen: ConsulationFilter,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
};
