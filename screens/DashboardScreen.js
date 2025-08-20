import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Search from '../components/Search';
import ListOfTime from '../components/ListOfTime';
import { useState, useMemo } from 'react';
import { getRange } from '../utils/getRange';
import { isWithinInterval, parseISO, format } from 'date-fns';
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const formatDate = (date) => {
  const year = 2000; // любой год
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
    2,
    '0'
  )}`;
};
export const allBirthdays = [
  {
    id: 1,
    name: 'Grand Pops',
    birthDate: formatDate(today), // Сегодня
    avatar: require('../assets/images/avatar1.png'),
  },
  {
    id: 2,
    name: 'Nimnomiobong Ntatam',
    birthDate: formatDate(tomorrow), // Завтра
    avatar: require('../assets/images/avatar2.png'),
  },
  {
    id: 3,
    name: 'Chisom Anizor',
    birthDate: '2001-04-18',
    avatar: require('../assets/images/avatar3.png'),
  },
];

const getAge = (birthDateStr) => {
  const birthDate = parseISO(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const DashboardScreen = () => {
  const [period, setPeriod] = useState('today');
  const { start, end } = useMemo(() => getRange(period), [period]);

  const filteredBirthdays = useMemo(() => {
    return allBirthdays.filter((person) => {
      const date = parseISO(person.birthDate);
      const birthdayThisYear = new Date(
        new Date().getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      return isWithinInterval(birthdayThisYear, { start, end });
    });
  }, [start, end]);

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
      <View style={{ marginBottom: 20 }}>
        <ListOfTime value={period} onChange={setPeriod} />
      </View>

      {filteredBirthdays.length > 0 && (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {filteredBirthdays.map((person) => {
              const age = getAge(person.birthDate);
              const birthDateFormatted = format(
                parseISO(person.birthDate),
                'MMMM, yyyy'
              );
              return (
                <View key={person.id} style={styles.birthdayCardHorizontal}>
                  <Image source={person.avatar} style={styles.avatar} />
                  <Text style={styles.name}>{person.name}</Text>
                  <Text style={styles.dateText}>{birthDateFormatted}</Text>
                  <Text style={styles.age}>{age} Today</Text>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}

      {filteredBirthdays.length > 1 && (
        <>
          <Text style={styles.upcomingTitle}>Upcoming birthdays</Text>
          {filteredBirthdays.slice(1).map((person) => (
            <View key={person.id} style={styles.upcomingItem}>
              <Image source={person.avatar} style={styles.smallAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{person.name}</Text>
                <Text style={styles.date}>
                  {format(parseISO(person.birthDate), 'dd MMMM')}
                </Text>
              </View>
              <Text style={styles.age}>{getAge(person.birthDate)} yrs</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e8f7ff',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 77,
    marginBottom: 20,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  contentText: {
    fontWeight: '600',
    fontSize: 14,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  age: {
    fontSize: 14,
    color: '#666',
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
  },
  smallAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 12,
  },
  date: {
    fontSize: 13,
    color: '#999',
  },
  birthdayCardHorizontal: {
    backgroundColor: '#f07bd8',
    borderRadius: 16,

    width: 380,
    height: 175,
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 4,
  },
});
