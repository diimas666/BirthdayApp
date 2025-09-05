import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Pressable
          style={styles.langBtn}
          onPress={() => i18n.changeLanguage('ua')}
        >
          <Text style={styles.langText}>Українська</Text>
        </Pressable>

        <Pressable
          style={styles.langBtn}
          onPress={() => i18n.changeLanguage('en')}
        >
          <Text style={styles.langText}>English</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

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
  langText: {
    color: '#3a1c5c',
    fontWeight: '600',
  },
});
