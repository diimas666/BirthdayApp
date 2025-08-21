// /screens/NotificationsScreen.jsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SectionList,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
  formatDistanceToNowStrict,
  isToday,
  parseISO,
  subWeeks,
} from 'date-fns';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { avatarByKey } from '../store/birthdaysSlice';

const TAB_HEIGHT = 88;

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

  // Возьмём людей из стора и найдём у кого др сегодня — это раздел "New"
  const people = useSelector((s) => s.birthdays.list);

  const sections = useMemo(() => {
    // “New” — все, у кого ДР сегодня
    const todayItems = people
      .filter((p) => {
        const d = parseISO(p.birthDate);
        const now = new Date();
        // сравниваем только МЕСЯЦ-ДЕНЬ
        return d.getDate() === now.getDate() && d.getMonth() === now.getMonth();
      })
      .map((p) => ({
        id: `new-${p.id}`,
        avatar: avatarByKey(p.avatarKey),
        title: `Send ${p.name} a gift today is ${getAge(
          p.birthDate
        )}rd birthday`,
        timeLabel: '13 hours ago', // можешь подставлять своё
        isNew: true,
      }));

    // “Earlier” — примеры (заглушки), чтобы показать верстку
    const earlier = [
      {
        id: 'e1',
        avatar: avatarByKey(people[1]?.avatarKey || 'a2'),
        title: 'Birthday gift sent to Akintewe Sola',
        time: subWeeks(new Date(), 2),
      },
      {
        id: 'e2',
        avatar: avatarByKey(people[2]?.avatarKey || 'a3'),
        title: 'Birthday gift sent to Henry Paul',
        time: subWeeks(new Date(), 4),
      },
      {
        id: 'e3',
        avatar: avatarByKey(people[2]?.avatarKey || 'a3'),
        title: 'Birthday gift sent to Henry Paul',
        time: subWeeks(new Date(), 4),
      },
      {
        id: 'e4',
        avatar: avatarByKey(people[0]?.avatarKey || 'a1'),
        title: 'Grand Ma 78th birthday',
        time: subWeeks(new Date(), 6),
      },
    ].map((x) => ({
      ...x,
      timeLabel: formatDistanceToNowStrict(x.time, { addSuffix: true }),
      isNew: false,
    }));

    const data = [];
    if (todayItems.length) {
      data.push({ title: 'New', data: todayItems });
    }
    data.push({ title: 'Earlier', data: earlier });
    return data;
  }, [people]);

  const renderItem = ({ item }) => (
    <Pressable
      style={[styles.card, item.isNew && styles.cardNew]}
      android_ripple={{ color: '#eadcff' }}
    >
      {/* Аватар */}
      <View style={styles.avatarWrap}>
        <Image source={item.avatar} style={styles.avatar} />
      </View>

      {/* Текст */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.time}>{item.timeLabel}</Text>
      </View>

      {/* Иконки справа */}
      <View style={styles.rightIcons}>
        <MaterialCommunityIcons name="gift-outline" size={18} color="#5b2d86" />
      </View>
    </Pressable>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionLabel}>{section.title}</Text>
  );

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable style={styles.topBtn}>
          <Ionicons name="chevron-back" size={22} color="#5b2d86" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Pressable style={styles.topBtn}>
          <Ionicons name="ellipsis-vertical" size={18} color="#5b2d86" />
        </Pressable>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + TAB_HEIGHT + 24,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

/* ——— helpers ——— */

function getAge(birthISO) {
  const d = parseISO(birthISO);
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}

/* ——— styles ——— */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f7eefc' },

  topBar: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1b0f2b' },
  topBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#f1e6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionLabel: {
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '700',
    color: '#5b2d86',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 14,
    borderWidth: 1,
    borderColor: '#eadcff',
  },
  cardNew: {
    backgroundColor: '#f1e6ff',
  },

  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3d4ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatar: { width: 44, height: 44, borderRadius: 12 },

  title: { color: '#2b1050', fontSize: 16, fontWeight: '700' },
  time: { marginTop: 6, color: '#7b66a7', fontSize: 12, fontWeight: '600' },

  rightIcons: {
    marginLeft: 10,
    width: 26,
    alignItems: 'center',
  },
});
