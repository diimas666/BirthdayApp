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
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { getAge } from '../utils/birthdays';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function UserScreen({ route }) {
  const navigation = useNavigation();
  const person = route?.params?.person;
  if (!person) return null;

  const age = getAge(person.birthDate);
  const birthDateFull = format(parseISO(person.birthDate), 'dd MMMM, yyyy');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf5ff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.iconBtn,
              pressed && { opacity: 0.6 },
            ]}
          >
            <Ionicons name="chevron-back" size={22} color="#5b2d86" />
          </Pressable>

          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.iconBtn,
              pressed && { opacity: 0.6 },
            ]}
          >
            <Ionicons name="heart-outline" size={20} color="#5b2d86" />
          </Pressable>
        </View>

        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Image source={person.avatar} style={styles.avatar} />
          </View>
        </View>

        {/* Name + age + subtitle */}
        <View style={styles.centerBlock}>
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.ageText}>{age} Years</Text>
          <Text style={styles.today}>Birthday Today</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <ActionIcon label="" onPress={() => {}}>
            <Ionicons name="call-outline" size={22} color="#4b256f" />
          </ActionIcon>
          <ActionIcon label="" onPress={() => {}}>
            <Ionicons name="logo-whatsapp" size={22} color="#4b256f" />
          </ActionIcon>
          <ActionIcon label="" onPress={() => {}}>
            <Ionicons name="logo-facebook" size={22} color="#4b256f" />
          </ActionIcon>
          <ActionIcon label="" onPress={() => {}}>
            <MaterialCommunityIcons
              name="gift-outline"
              size={22}
              color="#4b256f"
            />
          </ActionIcon>
        </View>

        {/* Info cards */}
        <InfoRow
          leftIcon={
            <MaterialCommunityIcons
              name="cake-variant-outline"
              size={20}
              color="#4b256f"
            />
          }
          title="Birthday"
          value={birthDateFull}
        />

        {/* Если у тебя нет телефона — либо спрячь, либо поставь мок */}
        <InfoRow
          leftIcon={<Ionicons name="call-outline" size={20} color="#4b256f" />}
          title="+234 815 123 0000"
          subtitle="Mobile"
        />

        <InfoRow
          leftIcon={<Ionicons name="wifi-outline" size={20} color="#4b256f" />}
          title="Share Birthday"
          subtitle="Tell family and friends"
          rightIcon={<Ionicons name="send-outline" size={18} color="#4b256f" />}
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionIcon({ children, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
    >
      {children}
      {label ? <Text style={styles.actionLabel}>{label}</Text> : null}
    </Pressable>
  );
}

function InfoRow({ leftIcon, title, value, subtitle, rightIcon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.infoRow, pressed && { opacity: 0.8 }]}
    >
      <View style={styles.infoLeftIcon}>{leftIcon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoTitle}>{title}</Text>
        {subtitle ? <Text style={styles.infoSubtitle}>{subtitle}</Text> : null}
      </View>
      {value ? <Text style={styles.infoValue}>{value}</Text> : null}
      {rightIcon ? <View style={{ marginLeft: 8 }}>{rightIcon}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  topBar: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#f1e6ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e3d4ff',
  },

  avatarWrap: { alignItems: 'center', marginTop: 24, marginBottom: 12 },
  avatarCircle: {
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: '#e9ddb7', // бледный беж как на макете
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 140, height: 140, borderRadius: 80 },

  centerBlock: { alignItems: 'center', marginTop: 8, marginBottom: 16 },
  name: { fontSize: 26, fontWeight: '800', color: '#1b0f2b' },
  ageText: { fontSize: 16, color: '#4b256f', marginTop: 6 },
  today: { fontSize: 14, color: '#7a5aa6', marginTop: 2 },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
    marginTop: 10,
    marginBottom: 18,
  },
  actionBtn: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3d4ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionLabel: { marginTop: 6, fontSize: 12, color: '#512a7f' },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e6ff',
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e7d9ff',
  },
  infoLeftIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3d4ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTitle: { fontWeight: '700', color: '#3a1c5c' },
  infoSubtitle: { color: '#7b66a7', marginTop: 2 },
  infoValue: { color: '#3a1c5c', fontWeight: '600' },
});
