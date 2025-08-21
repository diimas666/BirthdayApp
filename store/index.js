// src/store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import birthdaysReducer from './birthdaysSlice';

// Хранилище под React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

// redux-persist: оборачивает редьюсер, чтобы состояние сохранялось в AsyncStorage
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// 1) Собираем корневой редьюсер (пока один слайс, но масштабируется легко)
const rootReducer = combineReducers({
  birthdays: birthdaysReducer,
});

// 2) Конфиг для redux-persist: что и куда сохранять
const persistConfig = {
  key: 'root', // ключ корня в AsyncStorage, под которым лежит JSON состояния
  storage: AsyncStorage, // драйвер хранения (для RN — этот пакет)
  whitelist: ['birthdays'], // какие ветки state сохраняем (только birthdays)
  // blacklist: []        // наоборот — список веток, которые НЕ сохраняем
};

// 3) Обернули корневой редьюсер «персистом»
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4) Создаём store
export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefault) {
    return getDefault({
      // Redux Toolkit по умолчанию проверяет «сериализуемость» экшенов/стейта.
      // У redux-persist есть служебные экшены с нестандартными полями — их игнорируем,
      // чтобы не ловить ворнинги.
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

// 5) persistor — управлялка процессом сохранения/восстановления
export const persistor = persistStore(store);
