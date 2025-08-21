// /components/UpcomingBirthdayItem.js
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { format, parseISO } from 'date-fns';
import { getAge } from '../utils/birthdays';
import ArrowSvg from '../assets/images/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
export default function UpcomingBirthdayItem({ person }) {
  const navigation = useNavigation();
  return (
    <Pressable
      android_ripple={{ color: '#eadcff' }}
      style={({ pressed }) => [
        styles.item,
        pressed && { opacity: 0.7 }, // уменьшаем прозрачность при нажатии
      ]}
      onPress={() => {
        navigation.navigate('UserScreen', { person });
      }}
    >
      <ArrowSvg width={24} height={24} style={styles.arrow_link} />
      <Image source={person.avatar} style={styles.smallAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{person.name}</Text>
        <View style={styles.dateRow}>
          <Text style={styles.dateDay}>
            {format(parseISO(person.birthDate), 'dd')}
          </Text>
          <Text style={styles.dateMonth}>
            {format(parseISO(person.birthDate), 'MMMM')}
          </Text>
        </View>
      </View>
      <Text style={styles.age}>{getAge(person.birthDate)} yrs</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  arrow_link: {
    position: 'absolute',
    right: 10,
  },
  dateRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },

  dateDay: { fontSize: 20, fontWeight: '700', color: '#000' }, // большое число
  dateMonth: { fontSize: 14, opacity: 0.8, color: '#333' }, // месяц поменьше

  item: {
    position: 'relative',
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
  age: { fontWeight: '700', fontSize: 16, marginRight: 20 },
});
