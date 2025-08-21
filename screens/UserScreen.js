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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

import { getAge } from '../utils/birthdays';
import { avatarByKey } from '../store/birthdaysSlice';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf5ff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={22} color="#5b2d86" />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={20} color="#5b2d86" />
          </Pressable>
        </View>

        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Image source={avatarSrc} style={styles.avatar} />
          </View>
        </View>

        {/* Name + age */}
        <Text style={styles.name}>{base.name}</Text>
        <Text style={styles.ageText}>{age} Years</Text>
        <Text style={styles.today}>Birthday Today</Text>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <ActionIcon
            icon={<Ionicons name="call-outline" size={22} color="#4b256f" />}
          />
          <ActionIcon
            icon={<Ionicons name="logo-whatsapp" size={22} color="#4b256f" />}
          />
          <ActionIcon
            icon={<Ionicons name="logo-facebook" size={22} color="#4b256f" />}
          />
          <ActionIcon
            icon={
              <MaterialCommunityIcons
                name="gift-outline"
                size={22}
                color="#4b256f"
              />
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
          rightIcon={<Ionicons name="send-outline" size={18} color="#4b256f" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

function ActionIcon({ icon }) {
  return <Pressable style={styles.actionBtn}>{icon}</Pressable>;
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
