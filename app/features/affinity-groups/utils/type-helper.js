export const NOTIFICATION_TYPE = Object.freeze({
  LIKE: "like",
  COMMENT: "comment",
  POST: "post",
});

export const getAttributesBasedOnType = type => {
  return Object.keys(NOTIFICATION_TYPE).reduce((acc, key) => {
    let count = 0;
    const value = NOTIFICATION_TYPE[key];
    if (type && type === value) {
      count = 1;
    }
    acc[value] = count;
    return acc;
  }, {});
};
