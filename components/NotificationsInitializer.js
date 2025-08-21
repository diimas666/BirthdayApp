// src/components/NotificationsInitializer.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { initBirthdayNotifications } from '../utils/notifications';

// чтобы уведомления показывались, даже когда приложение открыто
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsInitializer() {
  const birthdays = useSelector((s) => s.birthdays.list);

  useEffect(() => {
    // инициализация один раз при старте (внутри есть дневной троттлинг)
    initBirthdayNotifications(birthdays);
  }, []); // не ставим birthdays в зависимости, иначе будет перезапуск при каждом изменении

  return null;
}
