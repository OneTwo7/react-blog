import { NotificationManager } from 'react-notifications';

export const showSuccessMessage = (message) => {
  NotificationManager.success(message);
};

export const showErrorMessage = (message) => {
  NotificationManager.error(message);
};

export const showReason = (error) => {
  if (error.response) {
    NotificationManager.error(error.response.data.reason);
  } else {
    NotificationManager.error(error.toString());
  }
};
