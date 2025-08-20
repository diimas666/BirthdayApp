// /components/UpcomingBirthdayItem.js
import { View, Text, StyleSheet, Image } from 'react-native';
import { format, parseISO } from 'date-fns';
import { getAge } from '../utils/birthdays';

export default function UpcomingBirthdayItem({ person }) {
  return (
    <View style={styles.item}>
      <Image source={person.avatar} style={styles.smallAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.date}>
          {format(parseISO(person.birthDate), 'dd MMMM')}
        </Text>
      </View>
      <Text style={styles.age}>{getAge(person.birthDate)} yrs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f4d9ff',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  smallAvatar: { width: 52, height: 52, borderRadius: 16 },
  name: { fontWeight: '600', fontSize: 16 },
  date: { opacity: 0.8 },
  age: { fontWeight: '700', fontSize: 16 },
});
