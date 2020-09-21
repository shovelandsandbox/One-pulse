
import AppConfig from "./../../../../config/AppConfig";
import moment from "moment";
export const appleHealthData = (appleData, steps, id, syncTime) => {
  const data = {
    wearable: {
      id: id,
      wearableType: {
        type: "applehealth",
      },
    },
    summaryMetrics: [
      {
        name: "Step Count",
        value: steps,
        unit: "STEPS",
        iconUrl: `${AppConfig.getPruHttpUrl()}/cms/e234eea2-7e45-42da-93f1-1da95247edb2?namespace=VN`,
      },
      {
        name: "Calories",
        value: appleData.calories,
        unit: "KCAL",
        iconUrl: `${AppConfig.getPruHttpUrl()}/cms/cbb96b48-f69b-4da1-a850-762ebb89d93d?namespace=VN`,
      },
    ],
    syncTime: moment(new Date(syncTime)),
    activities: [
      {
        type: {
          name: "Cycling",
          iconUrl: `${AppConfig.getPruHttpUrl()}/cms/b4079bfc-375f-4ece-984e-23efc368cdcc?namespace=VN`,
        },
        metrics: [
          {
            name: "distance",
            value: appleData.distanceCycling,
            unit: "Metre",
            iconUrl: `${AppConfig.getPruHttpUrl()}/cms/e234eea2-7e45-42da-93f1-1da95247edb2?namespace=VN`,
          },
        ],
        defaultMetric: {
          name: "distance",
          value: appleData.distanceCycling,
          unit: "Metre",
          iconUrl: `${AppConfig.getPruHttpUrl()}/cms/e234eea2-7e45-42da-93f1-1da95247edb2?namespace=VN`,
        },
        startTime: "",
        endTime: "",
      },
      {
        type: {
          name: "Swimming",
          iconUrl: `${AppConfig.getPruHttpUrl()}/cms/cb3265e6-7c7e-4676-b113-af48daa4796a?namespace=VN`,
        },
        metrics: [
          {
            name: "distance",
            value: appleData.swimmingDistance,
            unit: "Metre",
            iconUrl: `${AppConfig.getPruHttpUrl()}/cms/e234eea2-7e45-42da-93f1-1da95247edb2?namespace=VN`,
          },
        ],
        defaultMetric: {
          name: "distance",
          value: appleData.swimmingDistance,
          unit: "Metre",
          iconUrl: `${AppConfig.getPruHttpUrl()}/cms/e234eea2-7e45-42da-93f1-1da95247edb2?namespace=VN`,
        },
        startTime: "",
        endTime: "",
      },
    ],
  };
  return data;
};
