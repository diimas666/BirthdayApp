// DashboardScreen.jsx
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Search from '../components/Search';
import ListOfTime from '../components/ListOfTime';
import BirthdayCard from '../components/BirthdayCard';
import UpcomingBirthdayItem from '../components/UpcomingBirthdayItem';
import { useMemo, useState, useCallback } from 'react';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { getRange } from '../utils/getRange';

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
    id: 4,
    name: 'Dima Tihtey',
    birthDate: '2001-08-20',
    avatar: require('../assets/images/avatar1.png'),
  },
];

const DashboardScreen = () => {
  const [period, setPeriod] = useState('today');
  const { start, end } = useMemo(() => getRange(period), [period]);

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
        return aMD - bMD;
      });
  }, [start, end]);

  const primary = filtered[0] ?? null;
  const upcoming = filtered.slice(1);
  const headerLabel = useMemo(() => format(start, 'dd.MMMM EEEE'), [start]);

  const renderItem = useCallback(
    ({ item }) => <UpcomingBirthdayItem person={item} />,
    []
  );

  return (
    <FlatList
      style={styles.container}
      data={upcoming} // данные только для "Upcoming"
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
      ListHeaderComponent={
        <View>
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

          <BirthdayCard
            person={primary}
            dateLabel={period === 'today' ? 'Today' : ''}
          />

          {upcoming.length > 0 && (
            <Text style={styles.upcomingTitle}>Upcoming birthdays</Text>
          )}
        </View>
      }
      ListEmptyComponent={
        <View style={{ paddingVertical: 24 }}>
          {/* Если нет upcoming — можно показать плейсхолдер */}
          <Text style={{ opacity: 0.7, textAlign: 'center' }}>
            No upcoming birthdays in this period
          </Text>
        </View>
      }
    />
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
  upcomingTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontWeight: '600',
    fontSize: 18,
  },
});
