// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import ua from './locales/ua.json';

export const LANG_STORAGE_KEY = 'appLang';

const resources = { en: { translation: en }, ua: { translation: ua } };

// язык системы (например 'uk' → маппим на 'ua')
const sys = Localization.getLocales?.()[0]?.languageCode || 'en';
const initialLng = sys === 'uk' ? 'ua' : sys;

i18n.use(initReactI18next).init({
  resources,
  lng: resources[initialLng] ? initialLng : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// вспомогалки для сохранения/загрузки языка
export async function loadStoredLanguage() {
  try {
    const saved = await AsyncStorage.getItem(LANG_STORAGE_KEY);
    if (saved && resources[saved]) {
      await i18n.changeLanguage(saved);
    }
  } catch {}
}

export async function persistLanguage(lang) {
  try {
    await AsyncStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {}
}

export default i18n;
