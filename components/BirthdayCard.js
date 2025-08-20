// /components/BirthdayCard.js
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { getAge } from '../utils/birthdays';
import Balls from '../assets/images/balls.svg';
// свг иконки
import WhatsAppIcon from '../assets/images/whatsapp.svg';
import GiftIcon from '../assets/images/gift.svg';
import MessengerIcon from '../assets/images/messenger.svg';

export default function BirthdayCard({ person, dateLabel = 'Today' }) {
  if (!person) {
    // Пустое состояние
    return (
      <ImageBackground
        source={require('../assets/images/card.jpg')}
        style={styles.card}
        imageStyle={styles.bg}
      >
        <View style={styles.center}>
          <Balls width={80} height={80} />
          <Text style={styles.title}>Today Birthdays</Text>
          <Text style={styles.subtitle}>No birthday today.</Text>
        </View>
      </ImageBackground>
    );
  }

  const age = getAge(person.birthDate);
  const monthYear = format(parseISO(person.birthDate), 'MMMM, yyyy');

  return (
    <ImageBackground
      source={require('../assets/images/card.jpg')}
      style={styles.card}
      imageStyle={styles.bg}
    >
      <Image source={person.avatar} style={styles.avatar} />
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.dateText}>{monthYear}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.age}>{age}</Text>
          <Text style={styles.today}>{dateLabel}</Text>
        </View>
      </View>
      {/* тут потом добавишь иконки WhatsApp / Gift / Messenger */}
      <View style={styles.actionsRow}>
        <Pressable
          style={styles.containerIcon}
          onPress={() => console.log('WhatsApp')}
        >
          <WhatsAppIcon width={42} height={42} />
          <Text style={styles.textIcon}>Whatsapp</Text>
        </Pressable>

        <Pressable
          style={styles.containerIcon}
          onPress={() => console.log('Gift')}
        >
          <GiftIcon width={62} height={62} />
          <Text style={styles.textIcon}>Send a Gift</Text>
        </Pressable>

        <Pressable
          style={styles.containerIcon}
          onPress={() => console.log('Messenger')}
        >
          <MessengerIcon width={42} height={42} />
          <Text style={styles.textIcon}>Messenger</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textIcon: {
    color: 'white',
    fontSize: 10,
  },
  containerIcon: {
    textAlign: 'center',

    alignItems: 'center',
  },
  card: {
    width: 370,
    aspectRatio: 350 / 200, // как в макете
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bg: { borderRadius: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },

  title: { color: 'white', fontSize: 20, fontWeight: '700' },
  subtitle: { color: 'white', fontSize: 14, opacity: 0.9 },
  avatar: { width: 65, height: 65, borderRadius: 20, marginBottom: 4 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 23, color: 'white', fontWeight: '600', marginBottom: 4 },
  dateText: { fontSize: 16, color: 'white' },
  age: { fontSize: 30, color: 'white', fontWeight: 'bold', lineHeight: 32 },
  today: { color: 'white', fontSize: 16 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 15,
  },
});
