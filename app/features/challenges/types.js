import { shape, number, string, arrayOf, oneOf, bool } from "prop-types";

//customer
export const customer = shape({
  id: string,
  firstName: string,
  surName: string,
});

//audit detail
export const auditDetail = shape({
  createTime: string,
  updateTime: string,
});

export const document = shape({
  id: string,
  contentType: oneOf(["image/jpg", "application/pdf", "video/mp4"]),
  url: string.isRequired,
});

//group
export const groupIcon = shape({
  id: string,
  url: string,
});

export const activity = shape({
  type: {
    name: oneOf(["Summary"]),
  },
  metrics: arrayOf(
    shape({
      unit: oneOf(["STEPS"]),
      value: string,
      name: oneOf(["Steps"]),
    })
  ),
});

export const groupActivity = shape({
  startTime: string,
  endTime: string,
  criteria: {
    activities: arrayOf(activity),
  },
});

export const group = shape({
  id: string,
  name: string,
  description: string,
  createdBy: shape({
    id: string,
  }),
  status: oneOf(["ACTIVE", "INACTIVE"]),
  classfication: string,
  icon: groupIcon,
  auditDetail: auditDetail,
  attributes: shape({
    totalMetricCount: string,
    todayMetricCount: string,
    membersCount: string,
  }),
  groupActivity,
  joined: bool,
});

//main redux keys
export const allChallenges = arrayOf(group);

export const myChallenges = arrayOf(group);
