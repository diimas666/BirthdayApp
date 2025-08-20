// DashboardScreen.jsx
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Search from '../components/Search';
import ListOfTime from '../components/ListOfTime';
import BirthdayCard from '../components/BirthdayCard';
import UpcomingBirthdayItem from '../components/UpcomingBirthdayItem';
import { useMemo, useState } from 'react';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { getRange } from '../utils/getRange';

// Мокаем людей с РЕАЛЬНЫМИ годами:
const allBirthdays = [
  {
    id: 1,
    name: 'Grand Pops',
    birthDate: '1940-03-27',
    avatar: require('../assets/images/avatar1.png'),
  },
  {
    id: 2,
    name: 'Nimnomiobong Ntatam',
    birthDate: '2002-04-02',
    avatar: require('../assets/images/avatar2.png'),
  },
  {
    id: 3,
    name: 'Chisom Anizor',
    birthDate: '2001-04-18',
    avatar: require('../assets/images/avatar3.png'),
  },
  {
    id: 3,
    name: 'Dima Tihtey',
    birthDate: '2001-08-20',
    avatar: require('../assets/images/avatar1.png'),
  },
];

const DashboardScreen = () => {
  const [period, setPeriod] = useState('today');
  const { start, end } = useMemo(() => getRange(period), [period]);

  // фильтруем по текущему году (месяц/день)
  const filtered = useMemo(() => {
    const y = new Date().getFullYear();
    return allBirthdays
      .filter((p) => {
        const d = parseISO(p.birthDate);
        const thisYear = new Date(y, d.getMonth(), d.getDate());
        return isWithinInterval(thisYear, { start, end });
      })
      .sort((a, b) => {
        const da = parseISO(a.birthDate),
          db = parseISO(b.birthDate);
        const aMD = new Date(2000, da.getMonth(), da.getDate());
        const bMD = new Date(2000, db.getMonth(), db.getDate());
        return aMD - bMD; // внутри периода — по календарю
      });
  }, [start, end]);

  const primary = filtered[0] ?? null;
  const upcoming = filtered.slice(1);

  const headerLabel = useMemo(() => {
    // пример для 'today' — 27.March Sunday
    return format(start, 'dd.MMMM EEEE');
  }, [start]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.nameText}>Hi Benjamin,</Text>
          <Text style={styles.contentText}>Here are today’s update:</Text>
        </View>
        <Image
          source={require('../assets/images/profile.png')}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </View>

      <Search />

      <View style={{ marginBottom: 16 }}>
        <ListOfTime value={period} onChange={setPeriod} />
      </View>

      <Text style={styles.sectionDate}>{headerLabel}</Text>

      {/* Большая карта: если есть именинник — person, иначе пустая */}
      <BirthdayCard
        person={primary}
        dateLabel={period === 'today' ? 'Today' : ''}
      />

      {!!upcoming.length && (
        <>
          <Text style={styles.upcomingTitle}>Upcoming birthdays</Text>
          {upcoming.map((p) => (
            <UpcomingBirthdayItem key={p.id} person={p} />
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5e8f7ff', paddingHorizontal: 24 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 77,
    marginBottom: 20,
  },
  nameText: { fontWeight: 'bold', fontSize: 18, marginBottom: 2 },
  contentText: { fontWeight: '600', fontSize: 14 },
  sectionDate: { marginBottom: 12, opacity: 0.8 },
  upcomingTitle: { marginTop: 8, marginBottom: 12, fontWeight: '700' },
});
