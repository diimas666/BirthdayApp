// src/utils/notifications.js
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseISO, isAfter } from 'date-fns';

/** Канал для Android (звук/приоритет) — создать один раз */
export async function setupAndroidChannel() {
  try {
    await Notifications.setNotificationChannelAsync('birthdays', {
      name: 'Birthdays',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: true,
      vibrationPattern: [0, 250, 250, 250],
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  } catch (e) {
    console.log('setupAndroidChannel error', e);
  }
}

/** Запросить разрешения (iOS/Android) */
export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/** Посчитать ближайшую дату ДР (в этом или следующем году), 10:00 локального времени */
export function getNextBirthdayDate(birthDateISO, hour = 10, minute = 0) {
  const birthDate = parseISO(birthDateISO); // "YYYY-MM-DD"
  const now = new Date();

  let trigger = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
    hour,
    minute,
    0,
    0
  );

  // если в этом году уже прошло — переносим на следующий
  if (!isAfter(trigger, now)) {
    trigger.setFullYear(trigger.getFullYear() + 1);
  }
  return trigger;
}

/** Запланировать уведомление на ближайший день рождения */
export async function scheduleBirthdayNotification(person) {
  try {
    const triggerDate = getNextBirthdayDate(person.birthDate, 10, 0);

    // На Android канал должен быть создан заранее
    await setupAndroidChannel();

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `🎉 Сегодня день рождения у ${person.name}!`,
        body: person.phone
          ? `Позвони: ${person.phone}`
          : `Не забудь поздравить 🎂`,
        sound: true,
      },
      // Для iOS/Android можно просто передать Date — сработает по времени
      trigger: triggerDate,
      // Если захочешь — можно использовать повторяющиеся по времени триггеры,
      // но ежегодного repeat нет, поэтому пере-планируем каждый год вручную.
    });

    return id; // пригодится, если захочешь отменять
  } catch (e) {
    console.log('scheduleBirthdayNotification error', e);
    return null;
  }
}

/**
 * Инициализация уведомлений на старте.
 *  - Делает requestPermissions
 *  - Пробегает по всем людям и планирует уведомления на ближайшие ДР
 *  - Чтобы не плодить дубли, делаем это максимум 1 раз в день (метка в AsyncStorage)
 */
const LAST_INIT_KEY = '@notifications:lastInitDate';

export async function initBirthdayNotifications(birthdays) {
  const granted = await requestNotificationPermissions();
  if (!granted) {
    console.log('Notifications not granted');
    return;
  }

  await setupAndroidChannel();

  // Защита: инициализируем не чаще 1 раза в сутки
  try {
    const today = new Date().toDateString();
    const last = await AsyncStorage.getItem(LAST_INIT_KEY);
    if (last === today) {
      // уже делали сегодня — пропускаем
      return;
    }

    // Планируем для всех существующих
    for (const p of birthdays) {
      await scheduleBirthdayNotification({
        name: p.name,
        phone: p.phone,
        birthDate: p.birthDate,
      });
    }

    await AsyncStorage.setItem(LAST_INIT_KEY, today);
  } catch (e) {
    console.log('initBirthdayNotifications error', e);
  }
}
