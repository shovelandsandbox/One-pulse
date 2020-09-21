import {
  CoreConfig,
  metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

const {
  CCA_CHINESE_ASSESSMENT,
  CCA_CHINESE_ASSESSMENT_TITLE,
  CCA_CHINESE_ASSESSMENT_DESCRIPTION,
  CCA_HOME,
  CCA_ASSESS_HISTORY,
  CCA_LAST_DONE,
  CCA_LAST_ASSESSMENT,
  CCA_REDO_ASSESSMENT,
  CCA_HI_MSG,
  CCA_UNCOMPLETE_MSG,
  CCA_LEAVE,
  CCA_CONTINUE,
  CCA_HELLO,
  CCA_SKIP,
  CCA_START_ASSESSMENT,
  CCA_BASIC_INFO,
  CCA_BASIC_INFO_DESCREPTION,
  CCA_CHANGE,
  CCA_ADD,
  CCA_GENDER,
  CCA_MALE,
  CCA_FEMALE,
  CCA_DOB,
  CCA_CITY,
  CCA_SMOKING_HABIT,
  CCA_SMOKE_OPTION_ONE,
  CCA_SMOKE_OPTION_TWO,
  CCA_SMOKE_OPTION_THREE,
  CCA_DRINK_HABIT,
  CCA_DRINK_OPTION_ONE,
  CCA_DRINK_OPTION_TWO,
  CCA_EXERCISE_HABIT,
  CCA_EXERCISE_OPTION_ONE,
  CCA_EXERCISE_OPTION_TWO,
  CCA_NEXT,
  CCA_EXP_LAST_FEW_MONTHS,
  CCA_GREAT,
  CCA_COMPLETE_ASSESSMENT,
  CCA_ASSESS_RESULT,
  CCA_CONST_SUMMERY,
  CCA_RESULT,
  CCA_DETAIL_INFO,
  CCA_ASSESS_DATE,
  CCA_MEDIUM_TXT,
  CCA_VIEW_MORE,
  CCA_PCA,
  CCA_L,
  CCA_H,
  CCA_M,
  CCA_NO,
  CCA_PREVIOUS,
  CCA_YEARS,
  CCA_ALMOST_THERE,
  CCA_VIEW_RESULT1,
  CCA_VIEW_RESULT,
  CCA_INTRO_TXT,
  CCA_INTRO_FIRST,
  CCA_INTRO_SECOND,
  CCA_SPLASH_FIRST,
  CCA_SPLASH_SECOND,
  CCA_SPLASH_THIRD,
  CCA_SPLASH_START,
  CCA_REQUIRED_INFO,
  CCA_COMPLETION_TEXT,
  CCA_COMPLETION_TEXT2,
  CCA_BACK,
  CCA_HISTORY,
  CCA_SHARE,
  CCA_DONE,
  CCA_SELECT,
  CCA_CLICK_TO_STRT,
  CCA_JOIN,
  CCA_AGE_REQUIRED,
  CCA_HISTORY_ASSESSMENT,
  CCA_TIMES,
  CCA_AGO,
  CCA_IN_LAST,
  CCA_YEAR,
  CCA_MONTH,
  CCA_MONTHS,
  CCA_DAY,
  CCA_DAYS,
  CCA_YESTERDAY,
  CCA_TODAY,
  CCA_MOTIVATION_TXT,
  CCA_COMPLETION_FIRST_TEXT,
  CCA_COMPLETION_SECOND_TEXT,
  CCA_INTRO_TEXT,
  CCA_NOTCOMPLETE,
  CCA_CONST_TEST_TXT,
  CCA_GO_AWAY,
  CCA_CARRY_OUT,
  CCA_NAME,
  CCA_ENTR_NAME,
  CCA_SHARE_IT,
  CCA_ANALYSIS_TXT,
  CCA_CAMERA,
  CCA_GALLERY,
  CCA_COME_ON
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
  value.label ? value.label : defaultValue;

const initializeCCAScreenMeta = () => {
  return {
    CompletionScreenTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_COMPLETION_TEXT),
      "CompletionScreenTxt"
    ),
    CompletionScreenSecondTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_COMPLETION_TEXT2),
      "CompletionScreenSecondTxt"
    ),
    IntroductionInfoTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_INTRO_TXT),
      "IntroductionInfoTxt"
    ),
    IntroFirst: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_INTRO_FIRST),
      "IntroFirst"
    ),
    IntroSecond: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_INTRO_SECOND),
      "IntroSecond"
    ),
    SplashFirst: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SPLASH_FIRST),
      "SplashFirst"
    ),
    SplashSecond: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SPLASH_SECOND),
      "SplashSecond"
    ),
    SplashThird: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SPLASH_THIRD),
      "SplashThird"
    ),
    SplashButtonStart: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SPLASH_START),
      "SplashButtonStart"
    ),
    RequiredInfo: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_REQUIRED_INFO),
      "RequiredInfo"
    ),
    chineseAssessmentTitle: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CHINESE_ASSESSMENT_TITLE),
      "chineseAssessmentTitle"
    ),
    chineseAssessmentTileDescription: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CHINESE_ASSESSMENT_DESCRIPTION),
      "chineseAssessmentTileDescription"
    ),
    Home: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_HOME),
      "Home"
    ),
    AssessmentHistory: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_ASSESS_HISTORY),
      "AssessmentHistory"
    ),
    LastDone: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_LAST_DONE),
      "Last"
    ),
    LastAssessment: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_LAST_ASSESSMENT),
      "LastAssessment"
    ),
    RedoAssessment: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_REDO_ASSESSMENT),
      "RedoAssessment"
    ),
    HiMsg: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_HI_MSG),
      "HiMsg"
    ),
    AssessmentUncompletMsg: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_UNCOMPLETE_MSG),
      "AssessmentUncompletMsg"
    ),
    Leave: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_LEAVE),
      "Leave"
    ),
    Continue: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CONTINUE),
      "Continue"
    ),
    Hello: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_HELLO),
      "Hello"
    ),
    Skip: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SKIP),
      "Skip"
    ),
    StartAssessment: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_START_ASSESSMENT),
      "StartAssessment"
    ),
    BasicInfo: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_BASIC_INFO),
      "BasicInfo"
    ),
    BasicInfoDesc: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_BASIC_INFO_DESCREPTION),
      "BasicInfoDesc"
    ),
    Change: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CHANGE),
      "Change"
    ),
    Add: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_ADD),
      "Add"
    ),
    Gender: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT,CCA_GENDER),
      "Gender"
    ),
    Male: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_MALE),
      "Male"
    ),
    Female: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_FEMALE),
      "Female"
    ),
    Dob: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_DOB),
      "Dob"
    ),
    City: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CITY),
      "City"
    ),
    SmokingHabit: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SMOKING_HABIT),
      "SmokingHabit"
    ),
    SmokingHabitFirstOption: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SMOKE_OPTION_ONE),
      "SmokingHabitFirstOption"
    ),
    SmokingHabitSecondOption: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT,CCA_SMOKE_OPTION_TWO),
      "SmokingHabitSecondOption"
    ),
    SmokingHabitThirdOption: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SMOKE_OPTION_THREE),
      "SmokingHabitThirdOption"
    ),
    DrinkHabit: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_DRINK_HABIT),
      "DrinkHabit"
    ),
    Usually: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_DRINK_OPTION_ONE),
      "Usually"
    ),
    Occasionally: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_DRINK_OPTION_TWO),
      "Occasionally"
    ),
    ExerciseHabit: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_EXERCISE_HABIT),
      "ExerciseHabit"
    ),
    ExcerciseFirstOption: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_EXERCISE_OPTION_ONE),
      "ExcerciseFirstOption"
    ),
    ExcerciseSecondOption: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_EXERCISE_OPTION_TWO),
      "ExcerciseSecondOption"
    ),
    Next: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_NEXT),
      "Next"
    ),
    ExperienceInLastFewMonths: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_EXP_LAST_FEW_MONTHS),
      "ExperienceInLastFewMonths"
    ),
    Great: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_GREAT),
      "Great"
    ),
    CompleteAssessment: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_COMPLETE_ASSESSMENT),
      "CompleteAssessment"
    ),
    AssessmentResult: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_ASSESS_RESULT),
      "AssessmentResult"
    ),
    ConstSummary: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CONST_SUMMERY),
      "ConstSummary"
    ),
    Result: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_RESULT),
    "Result"
    ),
    DetailInfo: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_DETAIL_INFO),
      "DetailInfo"
    ),
    AssessmentDate: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_ASSESS_DATE),
      "AssessmentDate"
    ),
    MediumTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_MEDIUM_TXT),
      "MediumTxt"
    ),
    ViewMore: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_VIEW_MORE),
      "ViewMore"
    ),
    PcaLifeTaiwan: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_PCA),
      "PcaLifeTaiwan"
    ),
    L: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_L),
      "L"
    ),
    M: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_M),
      "M"
    ),
    H: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_H),
      "H"
    ),
    No: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_NO),
      "No"
    ),
    previous: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_PREVIOUS),
      "previous"
    ),
    Years: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_YEARS),
      "Years"
    ),
    almostThere: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_ALMOST_THERE),
      "almostThere"
    ),
    ResultView: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_VIEW_RESULT1),
      "ResultView"
    ),
    viewResult: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_VIEW_RESULT),
      "viewResult"
    ),
    Back: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_BACK),
      "Back"
    ),
    History: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_HISTORY),
      "History"
    ),
    Share: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SHARE),
      "Share"
    ),
    Done: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_DONE),
      "Done"
    ),
    Select: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SELECT),
      "Select"
    ),
    ClickToStart: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CLICK_TO_STRT),
      "ClickToStart"
    ),
    join: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_JOIN),
      "join"
    ),
    ageRequired: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_AGE_REQUIRED),
      "ageRequired"
    ),
    historyAssessment: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_HISTORY_ASSESSMENT),
      "historyAssessment"
    ),
    times: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_TIMES),
      "times"
    ),
    ago: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_AGO),
      "ago"
    ),
    InLast: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_IN_LAST),
      "InLast"
    ),
    year: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_YEAR),
      "year"
    ),
    month: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_MONTH),
      "month"
    ),
    months: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_MONTHS),
      "months"
    ),
    day: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_DAY),
      "day"
    ),
    days: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_DAYS),
      "days"
    ),
    yesterday: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_YESTERDAY),
      "yesterday"
    ),
    Today: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_TODAY),
      "Today"
    ),
    MotivateTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_MOTIVATION_TXT),
      "MotivateTxt"
    ),
    CompScreenTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_COMPLETION_FIRST_TEXT),
      "CompScreenTxt"
    ),
    CompScreenTxt2: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_COMPLETION_SECOND_TEXT),
      "CompScreenTxt2"
    ),
    introTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_INTRO_TEXT),
      "introTxt"
    ),
    NotComplete: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_NOTCOMPLETE),
      "NotComplete"
    ),
    constTestTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CONST_TEST_TXT),
      "constTestTxt"
    ),
    goAway: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_GO_AWAY),
      "goAway"
    ),
    EnterName: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_ENTR_NAME),
      "EnterName"
    ),
    shareIt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_SHARE_IT),
      "shareIt"
    ),
    AnalysisTxt: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_ANALYSIS_TXT),
      "AnalysisTxt"
    ),
    carryOut: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CARRY_OUT),
      "carryOut"
    ),
    ccaName: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_NAME),
      "ccaName"
    ),
    camera: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_CAMERA),
      "camera"
    ),
    gallery: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_GALLERY),
      "gallery"
    ),
    ComeOn: fetchLabel(
      helpers.findElement(CCA_CHINESE_ASSESSMENT, CCA_COME_ON),
      "ComeOn"
    ),
  };
};

export default {
  initializeCCAScreenMeta,
};
