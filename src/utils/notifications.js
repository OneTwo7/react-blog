import { NotificationManager } from 'react-notifications';

export const showSuccessMessage = (message) => {
  NotificationManager.success(message);
};

export const showErrorMessage = (message) => {
  NotificationManager.error(message);
};

export const showReason = (error) => {
  const { response } = error;
  if (response && response.data && response.data.reason) {
    NotificationManager.error(response.data.reason);
  } else {
    NotificationManager.error(error.toString());
  }
};
