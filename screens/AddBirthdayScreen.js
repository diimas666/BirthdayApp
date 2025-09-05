// /screens/AddBirthdayScreen.jsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { scheduleBirthdayNotification } from '../utils/notifications';
import { useTranslation } from 'react-i18next';

import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addBirthday, AVATAR_KEYS } from '../store/birthdaysSlice';

export default function AddBirthdayScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [androidPickerVisible, setAndroidPickerVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setVisible(true);
    }, [])
  );

  const goBackToDashboardTab = () => {
    setVisible(false);
    navigation.navigate('Home'); // ⚠️ важно — имя Tab
  };

  const validate = () => {
    if (!name.trim()) return t('errors.enterName');
    if (phone && !/^[0-9+\-\s()]{5,}$/.test(phone))
      return t('errors.checkPhone');
    return null;
  };

  const onSave = async () => {
    const err = validate();
    if (err) return alert(err);

    const payload = {
      name,
      phone,
      birthDate: date.toISOString().slice(0, 10),
      avatarKey: AVATAR_KEYS[Math.floor(Math.random() * AVATAR_KEYS.length)],
    };

    dispatch(addBirthday(payload));
    await scheduleBirthdayNotification(payload);

    setName('');
    setPhone('');
    setDate(new Date(2000, 0, 1));
    goBackToDashboardTab();
  };

  return (
    <View style={styles.stubScreen}>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={goBackToDashboardTab}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.backdrop}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ width: '100%' }}
            >
              <View style={styles.card}>
                <Text style={styles.title}>{t('addBirthday.title')}</Text>

                <View style={{ gap: 12 }}>
                  <TextInput
                    placeholder={t('addBirthday.fullName')}
                    placeholderTextColor="#6E2588"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    returnKeyType="next"
                  />

                  <TextInput
                    placeholder={t('addBirthday.phone')}
                    placeholderTextColor="#6E2588"
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.input}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                  />

                  <View>
                    <Text style={styles.label}>
                      {t('addBirthday.birthDate')}
                    </Text>

                    {Platform.OS === 'ios' ? (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={(_, d) => d && setDate(d)}
                        maximumDate={new Date()}
                      />
                    ) : (
                      <>
                        <Pressable
                          onPress={() => setAndroidPickerVisible(true)}
                          style={({ pressed }) => [
                            styles.pickBtn,
                            pressed && { opacity: 0.9 },
                          ]}
                        >
                          <Text style={styles.pickBtnText}>
                            {date.toDateString()} (
                            {t('addBirthday.tapToChange')})
                          </Text>
                        </Pressable>

                        {androidPickerVisible && (
                          <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(_, d) => d && setDate(d)}
                            maximumDate={new Date()}
                          />
                        )}
                      </>
                    )}
                  </View>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    onPress={goBackToDashboardTab}
                    style={({ pressed }) => [
                      styles.cancelBtn,
                      pressed && { opacity: 0.85 },
                    ]}
                  >
                    <Text style={styles.cancelText}>{t('common.cancel')}</Text>
                  </Pressable>

                  <Pressable
                    onPress={onSave}
                    style={({ pressed }) => [
                      styles.saveBtn,
                      pressed && { opacity: 0.95 },
                    ]}
                  >
                    <LinearGradient
                      colors={['#6157FF', '#EE49FD']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.saveGradient}
                    >
                      <Text style={styles.saveText}>{t('common.save')}</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  stubScreen: {
    flex: 1,
    backgroundColor: '#f5e8f7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#e7d9ff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1b0f2b',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EE49FD',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#1b0f2b',
    backgroundColor: '#fff',
  },
  label: { fontWeight: '700', color: '#3a1c5c', marginBottom: 6, marginTop: 4 },
  pickBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#f1e6ff',
    borderWidth: 1,
    borderColor: '#e3d4ff',
  },
  pickBtnText: { color: '#512a7f', fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 18 },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#f1e6ff',
    borderWidth: 1,
    borderColor: '#e3d4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: { color: '#5b2d86', fontWeight: '700' },
  saveBtn: { flex: 1, height: 48, borderRadius: 16, overflow: 'hidden' },
  saveGradient: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: { color: '#fff', fontWeight: '800' },
});
