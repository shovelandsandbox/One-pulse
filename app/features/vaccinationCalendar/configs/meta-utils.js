import { safeMetaLabelFinder } from "../../../utils/meta-utils";

export const metaFinderVaccinationCalendar = key => {
  return safeMetaLabelFinder("VaccinationCalendar", key);
};

export const metaLabelOrNilVaccinationCalendar = key => {
  const metaString = safeMetaLabelFinder("VaccinationCalendar", key);
  return metaString !== key ? metaString : null;
};
