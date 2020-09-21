import {  CoreConfig } from "@pru-rt-internal/pulse-common";

const {
  HOMECHALLENGES_STEPS,
  HOMECHALLENGES_KM,
  HOMECHALLENGES_YARDS
} = CoreConfig;

import {CHALLENGES_END_STEP, CYCLING_ICON, SWIMMING_ICON} from "../../config/images"

export const metricUnitHelper = {
    cycling : {distance: HOMECHALLENGES_KM},
    swimming: {distance:HOMECHALLENGES_YARDS},
    walking: {steps:HOMECHALLENGES_STEPS},
    running: {steps:HOMECHALLENGES_STEPS},
}

export const metricImageHelper = {
    cycling: CYCLING_ICON,
    swimming: SWIMMING_ICON,
    walking: CHALLENGES_END_STEP,
    running: CHALLENGES_END_STEP
}