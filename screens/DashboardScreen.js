// /screens/DashboardScreen.jsx
import React, { useMemo, useState, useCallback, useTransition } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { useSelector } from 'react-redux';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import Search from '../components/Search';
import ListOfTime from '../components/ListOfTime';
import BirthdayCard from '../components/BirthdayCard';
import UpcomingBirthdayItem from '../components/UpcomingBirthdayItem';
import { getRange } from '../utils/getRange';
import { avatarByKey } from '../store/birthdaysSlice';
import { useNavigation } from '@react-navigation/native';

const TAB_HEIGHT = 88; // у тебя такой же в tabBarStyle

export default function DashboardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets(); // <— safe area
  const [period, setPeriod] = useState('today');
  const { start, end } = useMemo(() => getRange(period), [period]);
  const navigate = useNavigation();
  const list = useSelector((s) => s.birthdays.list);

  const normalized = useMemo(
    () => list.map((p) => ({ ...p, avatar: avatarByKey(p.avatarKey) })),
    [list]
  );

  const filtered = useMemo(() => {
    const y = new Date().getFullYear();
    return normalized
      .filter((p) => {
        const d = parseISO(p.birthDate);
        const thisYear = new Date(y, d.getMonth(), d.getDate());
        return isWithinInterval(thisYear, { start, end });
      })
      .sort((a, b) => {
        const da = parseISO(a.birthDate),
          db = parseISO(b.birthDate);
        return (
          new Date(2000, da.getMonth(), da.getDate()) -
          new Date(2000, db.getMonth(), db.getDate())
        );
      });
  }, [normalized, start, end]);

  const primary = filtered[0] ?? null;
  const upcoming = filtered.slice(1);
  const headerLabel = useMemo(() => format(start, 'dd.MMMM EEEE'), [start]);

  const renderItem = useCallback(
    ({ item }) => <UpcomingBirthdayItem person={item} />,
    []
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FlatList
        data={upcoming}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        // главное: учитываем safe-area сверху и высоту таб-бара снизу
        contentContainerStyle={{
          paddingTop: 12, // небольшой внутренний отступ
          paddingBottom: insets.bottom + TAB_HEIGHT + 24, // чтобы последний айтем не прятался
          paddingHorizontal: 24,
        }}
        ListHeaderComponent={
          <View>
            <View style={[styles.header, { paddingTop: 8 }]}>
              <View>
                <Text style={styles.nameText}>Hi Benjamin,</Text>
                <Text style={styles.contentText}>Here are today’s update:</Text>
              </View>
              <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
              >
                <Pressable
                  onPress={() => navigate.navigate('SettingsScreen')}
                  style={({ pressed }) => [
                    styles.iconBtn,
                    pressed && styles.pressed,
                  ]}
                  android_ripple={{ color: '#e6d9ff' }}
                >
                  <Ionicons name="settings" size={30} color="#5b2d86" />
                </Pressable>
                <Image
                  source={require('../assets/images/profile.png')}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </View>
            </View>

            <Search />

            <View style={{ marginBottom: 16 }}>
              <ListOfTime value={period} onChange={setPeriod} />
            </View>

            <Text style={styles.sectionDate}>{headerLabel}</Text>

            <BirthdayCard
              person={primary}
              dateLabel={period === 'today' ? 'Today' : ''}
            />

            {upcoming.length > 0 && (
              <Text style={styles.upcomingTitle}>{t('Upcomingbirthdays')}</Text>
            )}
          </View>
        }
        // дополнительная «прокладка», если нет элементов
        ListEmptyComponent={
          <View style={{ paddingVertical: 24 }}>
            <Text style={{ opacity: 0.7, textAlign: 'center' }}>
              {t('noupcoming')}
            </Text>
          </View>
        }
        // страховочный футер-спейсер (на случай динамики таб-бара)
        ListFooterComponent={<View style={{ height: 8 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5e8f7ff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // УБРАЛИ жесткий marginTop: 77 — он ломал safe-area
    marginBottom: 20,
  },
  nameText: { fontWeight: 'bold', fontSize: 18, marginBottom: 2 },
  contentText: { fontWeight: '600', fontSize: 14 },
  sectionDate: { marginBottom: 12, opacity: 0.8 },
  upcomingTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontWeight: '600',
    fontSize: 18,
  },
  iconBtn: {
    width: 45,
    height: 45,
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
});
