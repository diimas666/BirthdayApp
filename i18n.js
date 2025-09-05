// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import ua from './locales/ua.json';

const resources = { en: { translation: en }, ua: { translation: ua } };

// Берём язык системы: 'uk', 'ru', 'en' и т.д. Приведём 'uk' -> 'ua'
const sys = Localization.getLocales?.()[0]?.languageCode || 'en';
const initialLng = sys === 'uk' ? 'ua' : sys; // маппинг под твой ключ 'ua'

i18n.use(initReactI18next).init({
  resources,
  lng: resources[initialLng] ? initialLng : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
