// screens/SettingsScreen.jsx
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { persistLanguage } from '../i18n';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('settings'),
      headerBackTitle: t('back'),
      headerBackTitleVisible: true,
    });
  }, [navigation, i18n.language, t]);

  const changeLang = async (lang) => {
    await i18n.changeLanguage(lang);
    await persistLanguage(lang);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('lang')}</Text>

        {/* 🇺🇦 Кнопка */}
        <Pressable
          style={[
            styles.langBtn,
            i18n.language === 'ua' && styles.activeBtn, // подсветка
          ]}
          onPress={() => changeLang('ua')}
        >
          <Text
            style={[
              styles.langText,
              i18n.language === 'ua' && styles.activeText,
            ]}
          >
            Українська
          </Text>
        </Pressable>

        {/* 🇬🇧 Кнопка */}
        <Pressable
          style={[styles.langBtn, i18n.language === 'en' && styles.activeBtn]}
          onPress={() => changeLang('en')}
        >
          <Text
            style={[
              styles.langText,
              i18n.language === 'en' && styles.activeText,
            ]}
          >
            English
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5e8f7ff' },
  container: {
    padding: 24,
    backgroundColor: '#fff',
    margin: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5b2d86',
    marginBottom: 20,
  },
  langBtn: {
    padding: 16,
    backgroundColor: '#f3e6ff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  langText: { color: '#3a1c5c', fontWeight: '600' },

  // 🔥 Активная кнопка
  activeBtn: {
    borderColor: '#5b2d86',
    backgroundColor: '#e7d4ff',
  },
  activeText: {
    color: '#2b0d4d',
    fontWeight: '700',
  },
});
