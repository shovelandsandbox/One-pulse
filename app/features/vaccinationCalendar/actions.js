import screens from "./configs/screenNames";
import actions from "./configs/actionNames";

import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

const context = screens.VACCINATION_CALENDAR;



export const goToScreens = (params, screen) => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: screen,
  payload: {
    params,
  },
});

export const updateChildren = ({ name, dob }) => ({
  context,
  type: actions.updateCustomer,
  payload: {
    children: [
      {
        name,
        dob,
      },
    ],
  },
});

export const updateSpouse = ({ name, dob }) => ({
  context,
  type: actions.updateCustomer,
  payload: {
    spouse: [
      {
        name,
        dob,
      },
    ],
  },
});

export const getVaccinationsDetails = ({
  id,
  dateOfBirth,
  enableNavigation,
}) => ({
  context,
  type: actions.getVaccinationDetails,
  payload: {
    customerId: id,
    dateOfBirth,
    enableNavigation,
  },
});

export const createVaccinationsDetails = ({ id, dateOfBirth }) => ({
  context,
  type: actions.createVaccinationDetails,
  payload: {
    dateOfBirth,
    appliedTo: {
      id,
    },
  },
});

export const updateVaccinationSchedule = ({ body }) => ({
  context,
  type: actions.updateVaccinationDetails,
  payload: {
    body,
  },
});
