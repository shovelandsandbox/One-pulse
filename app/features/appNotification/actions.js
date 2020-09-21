import actionNames from "./configs/actionNames";

const addNotification = ({ notification, type }) => ({
  type: actionNames.addNotification,
  payload: { notification, type },
});

const removeNotification = () => ({
  type: actionNames.removeNotification,
});

export { addNotification, removeNotification };
