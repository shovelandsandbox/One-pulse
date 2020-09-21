import { path } from "ramda";
export const VaccinationSelector = {
  getMergedList: (children = [], spouse = []) => {
    const childList = children.map(item => {
      return { ...item, relation: "Child" };
    });
    const spouseList = spouse.map(item => {
      return { ...item, relation: "Spouse" };
    });
    const finalList = [...childList, ...spouseList, {}];
    return finalList;
  },
  getVaccineDetailsByUserId: (schedules = [], id) => {
    const index = schedules.findIndex(
      el => path(["appliedTo", "id"], el) === id
    );
    return index !== -1 ? schedules[index] : null;
  },
  getSelectedProfile: (profiles = [], id) => {
    const index = profiles.findIndex(el => path(["id"], el) === id);
    return index !== -1 ? profiles[index] : null;
  },
  setAlarmAndReturnUpdatePayload: (
    vaccinationSchedule,
    vaccine,
    date,
    reminder
  ) => {
    const vcSchedule = path(["vaccinationSchedule"], vaccinationSchedule);
    const vaccinesList = path(["vaccinations"], vcSchedule);
    const index = vaccinesList.findIndex(
      el =>
        el.name === vaccine.name &&
        el.plannedSchedule === vaccine.plannedSchedule
    );
    if (index !== -1) {
      const tempVaccine = vaccinesList[index];
      if (reminder) {
        vaccinesList[index] = {
          ...tempVaccine,
          plannedDate: date,
          reminder: reminder,
        };
      } else {
        delete tempVaccine["reminder"];
        delete tempVaccine["plannedDate"];
        vaccinesList[index] = tempVaccine;
      }
      vcSchedule.vaccinations = vaccinesList;
      vaccinationSchedule.vaccinationSchedule = vcSchedule;
      return vaccinationSchedule;
    }
    return null;
  },
  getDropDownList: (children = [], spouse = []) => {
    const childList = children.map(item => {
      return { ...item, relation: "Child" };
    });
    const spouseList = spouse.map(item => {
      return { ...item, relation: "Spouse" };
    });
    const finalList = [...childList, ...spouseList];
    return finalList;
  },
};
