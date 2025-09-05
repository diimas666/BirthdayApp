// /screens/UserScreen.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  Animated,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux'; // <— добавили
import { avatarByKey, removeBirthday } from '../store/birthdaysSlice'; // <— импорт экшена
import { useRef } from 'react';
import { getAge } from '../utils/birthdays';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch(); // <—
  // поддерживаем оба способа навигации:
  // navigate('UserScreen', { id })   <-- рекомендуемый
  // navigate('UserScreen', { person })  <-- старый вариант
  const passedPerson = route.params?.person || null;
  const id = route.params?.id ?? passedPerson?.id;

  // берём свежие данные из стора по id
  const fromStore = useSelector((s) =>
    id ? s.birthdays.list.find((p) => p.id === id) : null
  );

  // что показывать: приоритет у стора, иначе то, что пришло в params
  const base = fromStore || passedPerson;

  if (!base) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>Person not found</Text>
      </SafeAreaView>
    );
  }

  // гарантируем источник аватара
  const avatarSrc = base.avatar ?? avatarByKey(base.avatarKey);

  const age = getAge(base.birthDate);
  const birthDateFull = format(parseISO(base.birthDate), 'dd MMMM, yyyy');
  // анимация прозрачности
  const opacity = useRef(new Animated.Value(1)).current;

  const confirmAndDelete = () => {
    Alert.alert(
      'Удалить человека?',
      `«${base.name}» будет удалён безвозвратно.`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            // 1) плавно скрываем
            Animated.timing(opacity, {
              toValue: 0,
              duration: 220,
              useNativeDriver: true,
            }).start(() => {
              // 2) удаляем из стора
              if (base.id) dispatch(removeBirthday(base.id));
              // 3) уходим назад
              navigation.goBack();
            });
          },
        },
      ]
    );
  };
  // нормализуем номер: оставляем цифры и плюс в начале
  const normalizePhone = (raw) => {
    if (!raw) return '';
    const cleaned = String(raw)
      .trim()
      .replace(/[^\d+]/g, '');
    // WhatsApp лучше без "+" → удалим его
    const wa = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
    return { tel: cleaned, wa };
  };

  const openCall = (phone) => {
    if (!phone)
      return Alert.alert('Нет номера', 'У этого контакта нет телефона');
    const { tel } = normalizePhone(phone);
    Linking.openURL(`tel:${tel}`);
  };

  const openWhatsApp = async (phone) => {
    if (!phone)
      return Alert.alert(
        'Нет номера',
        'Добавьте номер, чтобы написать в WhatsApp'
      );
    const { wa } = normalizePhone(phone);
    const url = `whatsapp://send?phone=${wa}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) return Linking.openURL(url);
    Alert.alert(
      'WhatsApp не установлен',
      'Установите WhatsApp и попробуйте снова'
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf5ff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            android_ripple={{ color: '#e6d9ff' }}
          >
            <Ionicons name="chevron-back" size={22} color="#5b2d86" />
          </Pressable>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Pressable
              onPress={confirmAndDelete}
              style={({ pressed }) => [
                styles.iconBtn,
                pressed && styles.pressed,
              ]}
              android_ripple={{ color: '#e6d9ff' }}
            >
              <Ionicons name="trash" size={20} color="#5b2d86" />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.iconBtn,
                pressed && styles.pressed,
              ]}
              android_ripple={{ color: '#e6d9ff' }}
            >
              <Ionicons name="heart-outline" size={20} color="#5b2d86" />
            </Pressable>
          </View>
        </View>

        {/* Avatar */}
        <Animated.View style={{ width: '100%', alignItems: 'center', opacity }}>
          <Animated.View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Image source={avatarSrc} style={styles.avatar} />
            </View>
          </Animated.View>

          {/* Name + age */}
          <Text style={styles.name}>{base.name}</Text>
          <Text style={styles.ageText}>{age} Years</Text>
          <Text style={styles.today}>Birthday Today</Text>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <ActionIcon
              icon={<Ionicons name="call-outline" size={22} color="#4b256f" />}
              onPress={() => openCall(base.phone)}
            />
            <ActionIcon
              icon={<Ionicons name="logo-whatsapp" size={22} color="#4b256f" />}
              onPress={() => openWhatsApp(base.phone)}
            />
            <ActionIcon
              icon={<Ionicons name="logo-facebook" size={22} color="#4b256f" />}
              onPress={() => Linking.openURL('https://facebook.com')}
            />
            <ActionIcon
              icon={
                <MaterialCommunityIcons
                  name="gift-outline"
                  size={22}
                  color="#4b256f"
                />
              }
              onPress={() =>
                Linking.openURL('https://google.com/search?q=gift+ideas')
              }
            />
          </View>

          {/* Info cards */}
          <InfoRow
            icon={
              <MaterialCommunityIcons
                name="cake-variant-outline"
                size={20}
                color="#4b256f"
              />
            }
            title="Birthday"
            value={birthDateFull}
          />
          <InfoRow
            icon={<Ionicons name="call-outline" size={20} color="#4b256f" />}
            title={base.phone || 'No phone'}
            subtitle={base.phone ? 'Mobile' : undefined}
          />
          <InfoRow
            icon={<Ionicons name="wifi-outline" size={20} color="#4b256f" />}
            title="Share Birthday"
            subtitle="Tell family and friends"
            rightIcon={
              <Ionicons name="send-outline" size={18} color="#4b256f" />
            }
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

function ActionIcon({ icon, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.actionBtn}>
      {icon}
    </Pressable>
  );
}

function InfoRow({ icon, title, value, subtitle, rightIcon }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoTitle}>{title}</Text>
        {subtitle && <Text style={styles.infoSubtitle}>{subtitle}</Text>}
      </View>
      {value && <Text style={styles.infoValue}>{value}</Text>}
      {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingBottom: 32, alignItems: 'center' },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#f1e6ff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // <— важно для рипла (Android)
    borderWidth: 1, // (необязательно) чтобы рипл было лучше видно
    borderColor: '#e3d4ff',
  },
  pressed: {
    opacity: 0.6, // <— iOS / общий feedback
  },
  avatarWrap: { marginTop: 20, marginBottom: 12 },
  avatarCircle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: '#e9ddb7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  name: { fontSize: 26, fontWeight: '800', color: '#1b0f2b' },
  ageText: { fontSize: 16, color: '#4b256f', marginTop: 6 },
  today: { fontSize: 14, color: '#7a5aa6', marginTop: 2 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
    marginBottom: 18,
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e3d4ff',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e6ff',
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
    width: '100%',
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e3d4ff',
  },
  infoTitle: { fontWeight: '700', color: '#3a1c5c' },
  infoSubtitle: { color: '#7b66a7', fontSize: 12, marginTop: 2 },
  infoValue: { color: '#3a1c5c', fontWeight: '600' },
});
