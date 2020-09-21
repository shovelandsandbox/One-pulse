/* eslint-disable */
import {
  CoreConfig,
  CoreActionTypes,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
const {
  pageKeys,
  HOMEINSAN,
  HOMEINSAN_FAJR,
  HOMEINSAN_TSHA,
  HOMEINSAN_MAGHRIB,
  HOMEINSAN_ASR,
  HOMEINSAN_SUNRISE,
  HOMEINSAN_JUM,
  HOMEINSAN_DHUHR
} = CoreConfig;
import {
  INSAAN_ICON_BEFORE_SUNRISE,
  INSAAN_ICON_SUNRISE,
  INSAAN_ICON_NOON,
  INSAAN_ICON_AFTERNOON,
  INSAAN_ICON_SUNSET,
  INSAAN_ICON_NIGHT,
  INSAAN_CARD_TYPE_BEFORE_SUNRISE,
  INSAAN_CARD_TYPE_SUNRISE,
  INSAAN_CARD_TYPE_NOON,
  INSAAN_CARD_TYPE_AFTERNOON,
  INSAAN_CARD_TYPE_SUNSET,
  INSAAN_CARD_TYPE_NIGHT,
} from "../../../config/images";

export const INSAAN_TYPE_BEFORE_SUNRISE = "beforeSunrise";
export const INSAAN_TYPE_SUNRISE = "sunrise";
export const INSAAN_TYPE_NOON = "noon";
export const INSAAN_TYPE_AFTERNOON = "afternoon";
export const INSAAN_TYPE_SUNSET = "sunset";
export const INSAAN_TYPE_NIGHT = "night";

export const AvailableTypes = [
  INSAAN_TYPE_BEFORE_SUNRISE,
  INSAAN_TYPE_SUNRISE,
  INSAAN_TYPE_NOON,
  INSAAN_TYPE_AFTERNOON,
  INSAAN_TYPE_SUNSET,
  INSAAN_TYPE_NIGHT
];

export const validate = type => {
  if (!AvailableTypes.includes(type)) {
    console.error(
      `\n- - - -\nInssan Card Type Exception\n\nAttempt to set type: ${type} which was invalid.\n\nAvailable types:\n\n${AvailableTypes}\n\n- - - -\n`
    );
    return false;
  }
  return true;
};

export const displayNameForType = type => {
  switch (type) {
    case INSAAN_TYPE_BEFORE_SUNRISE:
      // return metaHelpers.findElement(HOMEINSAN, HOMEINSAN_FAJR).label
      return "Subuh";
    // "Fajr";
    case INSAAN_TYPE_SUNRISE:
      // return metaHelpers.findElement(HOMEINSAN, HOMEINSAN_SUNRISE).label
      return "Syuruk";
    // return "Sunrise";
    case INSAAN_TYPE_NOON:
      // return metaHelpers.findElement(HOMEINSAN, HOMEINSAN_DHUHR).label
      return "Zuhur";
    // return "Dhuhr";
    case INSAAN_TYPE_AFTERNOON:
      // return metaHelpers.findElement(HOMEINSAN, HOMEINSAN_ASR).label
      return "Asar";
    // return "Asr";
    case INSAAN_TYPE_SUNSET:
      // return metaHelpers.findElement(HOMEINSAN, HOMEINSAN_MAGHRIB).label
      return "Maghrib";
    // return "Maghrib";
    case INSAAN_TYPE_NIGHT:
      // return metaHelpers.findElement(HOMEINSAN, HOMEINSAN_TSHA).label
      return "Isyak";
    // return "Isha'a";
    default:
      return null;
  }
};

export const iconForType = type => {
  switch (type) {
    case INSAAN_TYPE_BEFORE_SUNRISE:
      return INSAAN_ICON_BEFORE_SUNRISE;
    case INSAAN_TYPE_SUNRISE:
      return INSAAN_ICON_SUNRISE;
    case INSAAN_TYPE_NOON:
      return INSAAN_ICON_NOON;
    case INSAAN_TYPE_AFTERNOON:
      return INSAAN_ICON_AFTERNOON;
    case INSAAN_TYPE_SUNSET:
      return INSAAN_ICON_SUNSET;
    case INSAAN_TYPE_NIGHT:
      return INSAAN_ICON_NIGHT;
    default:
      return null;
  }
}
export const imageForType = type => {
  switch (type) {
    case INSAAN_TYPE_BEFORE_SUNRISE:
      return INSAAN_CARD_TYPE_BEFORE_SUNRISE;
    case INSAAN_TYPE_SUNRISE:
      return INSAAN_CARD_TYPE_SUNRISE
    case INSAAN_TYPE_NOON:
      return INSAAN_CARD_TYPE_NOON
    case INSAAN_TYPE_AFTERNOON:
      return INSAAN_CARD_TYPE_AFTERNOON
    case INSAAN_TYPE_SUNSET:
      return INSAAN_CARD_TYPE_SUNSET
    case INSAAN_TYPE_NIGHT:
      return INSAAN_CARD_TYPE_NIGHT
    default:
      return null;
  }
};
