import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export const notifyError = (message) => NotificationManager.error(message, 'Ошибка', 3000);

export const notifyWarning = (message) => NotificationManager.warning(message, 'Ошибка', 3000);

export const notifySuccess = (message) => NotificationManager.success(message, 'Внимание', 3000);

export const notifyInfo = (message) => NotificationManager.info(message, 'Внимание', 3000);

export const NotifyBlock = () => (<NotificationContainer />);