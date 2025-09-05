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
      headerBackTitleVisible: true, // поставь false, если нужен только chevron
    });
  }, [navigation, i18n.language, t]);

  const changeLang = async (lang) => {
    await i18n.changeLanguage(lang);
    await persistLanguage(lang);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('settings')}</Text>

        <Pressable style={styles.langBtn} onPress={() => changeLang('ua')}>
          <Text style={styles.langText}>Українська</Text>
        </Pressable>

        <Pressable style={styles.langBtn} onPress={() => changeLang('en')}>
          <Text style={styles.langText}>English</Text>
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
  },
  langText: { color: '#3a1c5c', fontWeight: '600' },
});
